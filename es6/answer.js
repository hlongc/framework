// 1.JavaScript 创建对象的几种方式?
const obj = {}
const obj1 = new Object()
const obj2 = Object.create(null)
const obj3 = Object.assign({})

// 2.JavaScript 继承的几种实现方式?
/**
 * 1、原型继承
 *    缺点：父类构造函数中的引用型属性会被共享
 * 2、构造函数继承
 *    缺点：需要把所有的方法写到父类的构造函数中
 * 3、组合继承
 *    缺点：父类构造函数会被执行两次
 * 4、寄生组合继承
 *    缺点：无
 * 5、ES6 extend继承
 *    缺点：无，只是语法糖
 */

// 3.说一下对this的理解。
/**
 * javascript是一个基于词语作用域的语言，词法作用域在函数定义时就确定了，和函数的位置有关系，也称为静态作用域，而this是函数执行上下文环境，是在函数执行时才确定的，是基于调用栈的，也称为动态作用域，可以通过call、apply、bind修改函数执行上下文，箭头函数没有属于自己的this，由外层决定
 */

// 4.什么是Proxy?
/**
 * Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等
 * 通过使用const proxy = new Proxy(target, handler)来申明，其中target是被代理的对象，而handler是拦截各种行为的处理函数对象
 * handler.getPrototypeOf(): Object.getPrototypeOf 方法的捕捉器。
 * handler.setPrototypeOf(): Object.setPrototypeOf 方法的捕捉器。
 * handler.isExtensible(): Object.isExtensible 方法的捕捉器。
 * handler.preventExtensions(): Object.preventExtensions 方法的捕捉器。
 * handler.getOwnPropertyDescriptor(): Object.getOwnPropertyDescriptor 方法的捕捉器。
 * handler.defineProperty(): Object.defineProperty 方法的捕捉器。
 * handler.has(): in 操作符的捕捉器。
 * handler.get(): 属性读取操作的捕捉器。
 * handler.set(): 属性设置操作的捕捉器。
 * handler.deleteProperty(): delete 操作符的捕捉器。
 * handler.ownKeys(): Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
 * handler.apply(): 函数调用操作的捕捉器。
 * handler.construct(): new 操作符的捕捉器。
 * 
 * 在vue3中也使用Proxy + Reflect来替换了Object.defineProperty()，性能提到极大提升，但是兼容性稍差
 */

// 5.事件委托是什么?
/**
 * 事件委托就是把本应该在自身进行处理的事件放到了父级进行处理，这样做的好处是减少事件绑定和事件解绑，性能提到提升，比如要监听ul下面的1000个li的点击事件，如果直接给li绑定的话，要绑定1000次，解绑1000次，性能损耗较大，但是采用事件委托，可以将点击事件绑定到父元素ul上面，然后通过event事件对象的target来判断触发的是不是li元素，如果是则处理响应逻辑。在react中应用较广，在react17中把元素的事件绑定到了根元素上面，而在react17之前把事件绑定到了document上面，通过react的事件机制实现冒泡捕获等功能。
 */

// 6.说一下你所理解的闭包
/**
 * 闭包指的一个函数能访问函数外部的作用域，即使外部函数执行完毕，被弹出执行栈，被垃圾回收，但是闭包内部所引用的外部变量仍然不会被清除，因为闭包对其保持了引用。在javascript闭包无处不在，结合作用域，试编程更加灵活。我们可以使用IIFE(立即执行函数表达式)和闭包来模拟私有方法。私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。在类库的代码中使用频繁。
 */

// 7.说一下你所理解的ajax，如何创建一个ajax?
/**
 * Asynchronous JavaScript + XML（异步JavaScript和XML）,包括: HTML 或 XHTML,  CSS, JavaScript, DOM, XML, XSLT, 以及最重要的 XMLHttpRequest。当使用结合了这些技术的AJAX模型以后， 网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面。这使得程序能够更快地回应用户的操作。尽管X在Ajax中代表XML, 但由于JSON的许多优势，比如更加轻量以及作为Javascript的一部分，目前JSON的使用比XML更加普遍。JSON和XML都被用于在Ajax模型中打包信息。
 * 我们可以通过XMLHttpRequest来实现一个ajax
let xhr = new XMLHttpRequest();
// 请求成功回调函数
xhr.onload = e => {
    console.log('request success');
};
// 请求结束
xhr.onloadend = e => {
    console.log('request loadend');
};
// 请求出错
xhr.onerror = e => {
    console.log('request error');
};
// 请求超时
xhr.ontimeout = e => {
    console.log('request timeout');
};
// 请求回调函数.XMLHttpRequest标准又分为Level 1和Level 2,这是Level 1和的回调处理方式
// xhr.onreadystatechange = () => {
//  if (xhr.readyState !== 4) {
//  return;
//  }
//  const status = xhr.status;
//  if ((status >= 200 && status < 300) || status === 304) {
//  console.log('request success');
//  } else {
//  console.log('request error');
//  }
//  };

xhr.timeout = 0; // 设置超时时间,0表示永不超时
// 初始化请求
xhr.open('GET/POST/DELETE/...', '/url', true || false);
// 设置期望的返回数据类型 'json' 'text' 'document' ...
xhr.responseType = '';
// 设置请求头
xhr.setRequestHeader('', '');
// 发送请求
xhr.send(null || new FormData || 'a=1&b=2' || 'json字符串');
 */

// 8.说一下你所理解的同源政策?
/**
 * 同源策略是一个浏览器安全策略，非同源的页面之间不能操作DOM以及storage，那什么叫两个url同源呢，只要满足：协议、主机名、端口号相同，那么就称两个url同源，反之不同源
 * 源的更改: 满足某些限制条件的情况下，页面是可以修改它的源。脚本可以将 document.domain 的值设置为其当前域或其当前域的父域。如果将其设置为其当前域的父域，则这个较短的父域将用于后续源检查。
 例如：假设 http://store.company.com/dir/other.html 文档中的一个脚本执行以下语句：

document.domain = "company.com";

这条语句执行之后，页面将会成功地通过与 http://company.com/dir/page.html 的同源检测（假设http://company.com/dir/page.html 将其 document.domain 设置为“company.com”，以表明它希望允许这样做 - 更多有关信息，请参阅 document.domain ）。然而，company.com 不能设置 document.domain 为 othercompany.com，因为它不是 company.com 的父域。

端口号是由浏览器另行检查的。任何对document.domain的赋值操作，包括 document.domain = document.domain 都会导致端口号被重写为 null 。因此 company.com:8080 不能仅通过设置 document.domain = "company.com" 来与company.com 通信。必须在他们双方中都进行赋值，以确保端口号都为 null 。
 */

// 9.你是如何解决的跨域问题的?
/**
 * 1、开发环境中遇到跨域问题可以通过代理服务器解决，因为服务器之间不存在跨域问题，比如vue-cli和create-react-app中可以设置proxy来解决跨域
 * 2、服务器环境可以通过设置请求头来允许跨域：比如nginx: add_header Access-Control-Allow-Origin
 * 3、window.postMessage也可以解决跨域通信的问题
 * 4、jsonp也可以实现跨域，因为script脚本的src属性不受同源策略的限制，但是只支持get请求
 * 5、window.name也可以实现跨域，但是要借助一个隐藏的iframe
 * 
 * 跨域是由浏览器的同源策略引起的,值得说的是虽然浏览器禁止用户对请求返回数据的显示和操作，但浏览器确实是去请求了，如果服务器没有做限制的话会返回数据的，在调试模式的network中可以看到返回状态为200，且可看到返回数据
 * 
 * CSRF跨站请求伪造可以发起跨域攻击，利用用户已经登录，通过诱导用户点击黑客网站，对目标服务器发起攻击，因为对一个域名发起请求时，会自动携带同域下的cookie信息，可以将重要信息放到localstorage里面，这样在第三方网站发起请求时无法携带，同时可以设置cookie为samesite，只允许同域发起请求才携带
 */

// 10.你所理解的JavaScript的事件循环机制是什么?
/**
 * js事件循环机制决定了如何驱动事件执行，浏览器会在内存中维护一个消息队列，每当用户触发了不同类型的事件，会把事件对应的回调函数放到消息队列里面，网络请求的回调函数也会放进消息队列，当主线程中的宏任务执行完毕，则开始从消息队列中取出一个宏任务进行执行，在执行宏任务时可能会产生微任务，比如Promise.then、MutationObserver、IntersectionObserver、queueMicrotask，所以每个宏任务也会维护一个微任务队列，在当前宏任务执行完毕即将退出当前栈时，会把当前宏任务的微任务队列全部清空，如果微任务在执行过程中又产生了微任务，那么会一直执行，直到全部执行完毕，然后退出当前宏任务，等待被垃圾回收，又从消息队列中取出一个宏任务，继续此类操作。浏览器还会单独维护一个定时器队列，等定时器触发时放到消息队列中。在vue中也使用了事件循环机制来实现异步更新采用优雅降级，Promise.then => MutationObserver => MessageChannel => setTimeout
 */

// 11.说一下对Object.defineProperty()的理解。
/**
 Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
 语法：Object.defineProperty(obj, prop, descriptor)
 obj: 要定义属性的对象。
 prop: 要定义或修改的属性的名称或 Symbol 。
 descriptor: 要定义或修改的属性描述符。

 该方法允许精确地添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到（for...in 或 Object.keys 方法），可以改变这些属性的值，也可以删除这些属性。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改（immutable）的。

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。

	        configurable	enumerable	value	  writable	get	   set
数据描述符	可以	        可以	       可以	    可以	    不可以	 不可以
存取描述符	可以	        可以	       不可以	   不可以	   可以	    可以
 */

// 12.说一下图片的懒加载和预加载的理解。
/**
 懒加载：
 一般用于图片较多的电商网站，如果一次性加载过多图片，会消耗大量流量，因为用户不一定会浏览，懒加载只会加载用户视窗内的图片，减小服务器的压力，一般把图片的src指向一个1px * 1px的透明图片，真实src可用保存在data-src里面，滚动到视窗内时，可用通过dataset取出真实src再赋值，可用采用IntersectionObserver实现，较为简便
 预加载：
 在做图片墙展示的时候用的较多，在用户看之前就完全加载完成，等到用户看时不用再加载，给用户良好的体验，因为提前加载好，等到真正加载图片时，直接从缓存中读取，不需要再发起请求，但是这种方式对服务器压力较大
 const image = new Image()
 image.src = './test.png'

 等到出现<img src="./test.png" />时不会再发出网络请求
 */

 // 13.请求服务器数据，get和post请求的区别是什么?

 /**
  * 从TCP层面来回答，还有语义以及RFC官方标准、幂等性，安全性
  * https://www.cnblogs.com/logsharing/p/8448446.html
  */

 // 14.Reflect对象创建的目的是什么?
 /**
Reflect对象其实就是为了让Object变得更简洁。
Reflect是一个无法被new的类，并且也无法像普通函数一样调用，只能使用Reflect上面的静态方法和Math一样。
1）Object对象的一些内部方法放在了Reflect上面，比如：Object.defineProperty。主要是优化了语言内部的方法。

2）修改Object方法的返回，例如：Object.definePropery（obj,name,desc）无法定义属性时报错，而Reflect.definedProperty(obj,name,desc)则会返回false。

3）让Object变成函数的行为，以前的：name in obj和delete obj[name]，可以让Reflect.has(obj,name)和Reflect.deleteProperty(obj,name)替代。

4）Reflect方法和Proxy方法一一对应。主要就是为了实现本体和代理的接口一致性，方便用户通过代理操作本体。

ES6提供了Proxy代理对象，不需要开发者自己再去写代理对象的方法，这点很方便，一些代理需求就可以使用Proxy完成，本体的操作可以通过Reflect对象调用。
  */

// 15.require 模块引入的查找方式?
/**
当 Node 遇到 require(X) 时，按下面的顺序处理。

（1）如果 X 是内置模块（比如 require('http')）

返回该模块。

不再继续执行。

（2）如果 X 以 "./" 或者 "/" 或者 "../" 开头

根据 X 所在的父模块，确定 X 的绝对路径。

将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。

X
X.js
X.json
X.node
将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。

X/package.json（main字段）
X/index.js
X/index.json
X/index.node
（3）如果 X 不带路径

根据 X 所在的父模块，确定 X 可能的安装目录。

依次在每个目录中，将 X 当成文件名或目录名加载。

（4）抛出 "not found"

参考链接：http://www.ruanyifeng.com/blog/2015/05/require.html
 */

// 16.观察者模式和发布订阅模式有什么不同?
/**
发布订阅模式其实属于广义上的观察者模式
在观察者模式中，观察者需要直接订阅目标事件。在目标发出内容改变的事件后，直接接收事件并作出响应。
而在发布订阅模式中，发布者和订阅者之间多了一个调度中心。调度中心一方面从发布者接收事件，另一方面向订阅者发布事件，订阅者需要在调度中心中订阅事件。通过调度中心实现了发布者和订阅者关系的解耦。使用发布订阅者模式更利于我们代码的可维护性。
 */

// 17.检查数据类型的方法会几种，分别是什么?
/**
1、typeof val可以检测 number string boolean symbol undefined function，但是没办法检测array object 和 null及其他引用类型
2、Array.isArray()可以检测一个值是否为数组
3、instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
4、Object.prototype.toString.call(val).slice(8, -1)
 */

// 18.对于 JSON 的了解？
/**
 JSON 是一种数据交换格式，基于文本，优于轻量，用于交换数据。

JSON 可以表示数字、布尔值、字符串、null、数组（值的有序序列），以及由这些值（或数组、对象）所组成的对象（字符串与值的映射）。

JSON 使用 JavaScript 语法，但是 JSON 格式仅仅是一个文本。文本可以被任何编程语言读取及作为数据格式传递。

回答：
JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

在项目开发中，我们使用 JSON 作为前后端数据交换的方式。在前端我们通过将一个符合 JSON 格式的数据结构序列化为 JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

因为 JSON 的语法是基于 js 的，因此很容易将 JSON 和 js 中的对象弄混，但是我们应该注意的是 JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等，因此大多数的 js 对象是不符合 JSON 对象的格式的。

在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，一个是 JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，我们可以调用这个函数将数据对象转化为 JSON 格式的字符串。

另一个函数 JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当我们从后端接收到 JSON 格式的字符串时，我们可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。
 */

// 19.进行哪些操作会造成内存泄漏?
/**
1.意外的全局变量
2.被遗忘的计时器或回调函数
3.脱离 DOM 的引用
4.闭包
回答：
第一种情况是我们由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。

第二种情况是我们设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。

第三种情况是我们获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。

第四种情况是不合理的使用闭包，从而导致某些变量一直被留在内存当中。
 */

// 20.谈谈你所理解的函数式编程。
/**
简单说，"函数式编程"是一种"编程范式"（programming paradigm），也就是如何编写程序的方法论。
它具有以下特性：闭包和高阶函数、惰性计算、递归、函数是"第一等公民"、只用"表达式"。
 */

// 实现js的节流和防抖函数，两者的区别是什么?
/**
 * 防抖：在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
 * 节流：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
 */

function debounce(fn, duration) {
  let timer
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    setTimeout(() => {
      fn.apply(this, [...arguments])
    }, duration)
  }
}

function throttle(fn, delay) {
  const lastTime = Date.now()
  return function() {
    if (Date.now() - lastTime >= delay) {
      lastTime = Date.now()
      fn.apply(this, [...arguments])
    }
  }
}