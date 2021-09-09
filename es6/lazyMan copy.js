
// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }
class Laziness {
  constructor(name, fn) {
    this.log = fn
    this.normalTask = []
    this.urgentTask = []
    this.greet(name)
    setTimeout(() => {
      this.next()
    })
  }
  greet(name) {
    this.normalTask.push(['greet', name])
    return this
  }
  eat(food) {
    this.normalTask.push(['eat', food])
    return this
  }
  sleep(duration) {
    this.normalTask.push(['sleep', duration])
    return this
  }
  sleepFirst(duration) {
    this.urgentTask.push(['sleep', duration])
    return this
  }
  next() {
    let task = this.urgentTask.shift()
    if (!task) {
      task = this.normalTask.shift()
    }
    if (!task) return
    const [op, params] = task
    switch (op) {
      case 'eat':
        this.log(`Eat ${params}.`)
        this.next()
        break
      case 'sleep':
        setTimeout(() => {
          this.log(`Wake up after ${params} seconds.`)
          this.next()
        }, params * 1000)
        break
      case 'greet':
        this.log(`Hi, I'm ${params}.`)
        this.next()
        break
    }
  }
}
/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  // your code here
  return new Laziness(name, logFn)
}

// LazyMan('Jack', console.log).eat('banana').sleep(10).eat('apple').sleep(1)

const log = (str) => {
  log.logs.push(str)
}
log.logs = []
LazyMan('Jack', log)
  .eat('banana')
  .sleep(1)
  .eat('apple')
setTimeout(() => {
  console.log(log.logs.slice())
  // expect(log.logs.slice()).toEqual([
  //   "Hi, I'm Jack.", 
  //   "Eat banana."])
  // done()
}, 0)
setTimeout(() => {
  console.log(log.logs.slice())
  // expect(log.logs.slice()).toEqual([
  //   "Hi, I'm Jack.", 
  //   "Eat banana.",
  //   "Wake up after 1 second.",
  //   "Eat apple."
  // ])
  // done()
}, 1500)