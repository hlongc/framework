Function.prototype.call = function(context, ...args) {
  context = context || global || window;
  if (['string', 'number', 'boolean'].includes(typeof context)) {
    context = new context.constructor(context);
  }
  const fn = Symbol();
  context[fn] = this;
  const ret = context[fn](...args);
  delete context[fn];
  return ret;
};

Function.prototype.apply = function(context, args) {
  context = context || global || window;
  if (['string', 'number', 'boolean'].includes(typeof context)) {
    context = new context.constructor(context);
  }
  const fn = Symbol();
  context[fn] = this;
  const ret = context[fn](...args);
  delete context[fn];
  return ret;
};

Object.create = function(prototype) {
  function F() {}
  F.prototype = prototype;
  return new F();
};

Function.prototype.bind = function(Othis, ...outerArgs) {
  const F = this;
  function fBound(...innerArgs) {
    return F.call(this instanceof F ? this : Othis, ...outerArgs, ...innerArgs);
  }
  fBound.prototype = Object.create(F.prototype);
  return fBound;
};

function _new(Clazz, ...args) {
  const obj = Object.create(Clazz.prototype);
  const ret = Clazz.call(obj, ...args);
  return (typeof ret === 'object' && ret !== null) || typeof ret === 'function'
    ? ret
    : obj;
}

function _instanceOf(ins, Clazz) {
  let proto = ins.__proto__;
  let prototype = Clazz.prototype;
  while (true) {
    if (proto === null) return false;
    if (prototype === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}

const obj = { name: 'hlc' };
const obj1 = { name: 'hlongc' };
const obj2 = { name: 'hulongchao' };

function foo(age) {
  console.log(this.name, age);
}

foo.call(obj, 24);
foo.apply(obj, [24]);
foo
  .bind(obj)
  .bind(obj1)
  .bind(obj2)(24);

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.print = function() {
  console.log(this.x, this.y);
};

const P = Point.bind(obj, 2);
const point = new P(3);
point.print();
console.log(point instanceof P);
console.log(point instanceof Point);
console.log(_instanceOf(point, P));
console.log(_instanceOf(point, Point));

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const isPromise = val => {
  if ((typeof val === 'object' && val !== null) || typeof val === 'function') {
    if (typeof val.then === 'function' && typeof val.catch === 'function') {
      return true;
    }
  } else {
    return false;
  }
};

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    throw new Error('循环引用');
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let call;
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (call) return;
            call = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (call) return;
            call = true;
            reject(r);
          }
        );
      } else {
        if (call) return;
        call = true;
        resolve(x);
      }
    } catch (e) {
      if (call) return;
      call = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.rejectCallbacks = [];
    this.resolveCallbacks = [];

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.rejectCallbacks.forEach(fn => fn());
      }
    };
    const resolve = value => {
      if (isPromise(value)) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.resolveCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  static resolve(value) {
    return new Promise(resolve => resolve(value));
  }
  static reject(reason) {
    return new Promise((_resolve, reject) => reject(reason));
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(promises)) {
        promises.forEach(item => {
          if (isPromise(item)) {
            item.then(resolve, reject);
          } else {
            resolve(item);
          }
        });
      } else {
        throw new Error(`${promises} cannot iterater`);
      }
    });
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(promises)) {
        const ret = [];
        let i = 0;
        const processData = (item, index) => {
          ret[index] = item;
          if (++i === promises.length) {
            return resolve(ret);
          }
        };
        promises.forEach((cur, index) => {
          if (isPromise(cur)) {
            cur.then(data => processData(data, index), reject);
          } else {
            processData(cur, index);
          }
        });
      } else {
        throw new Error(`${promises} cannot iterater`);
      }
    });
  }
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : r => r;
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : e => {
            throw e;
          };
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onfulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === PENDING) {
        this.resolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onfulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.rejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onrejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
  catch(cb) {
    return this.then(null, cb);
  }
  finally(cb) {
    return this.then(
      r => Promise.resolve(cb()).then(() => r),
      e =>
        Promise.resolve(cb()).then(() => {
          throw e;
        })
    );
  }
}

Promise.resolve(123)
  .finally(() => {
    console.log('finally');
  })
  .then(x => {
    console.log(x);
  });

const sleep = s => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`sleep ${s}`);
    }, s);
  });
};

Promise.race([sleep(2000), 3, 4]).then(data => {
  console.log(data);
});

Promise.all([sleep(1000), 3, 4]).then(data => {
  console.log(data);
});
console.log('xixiix')
