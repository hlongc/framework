
class LazyHuman {
  constructor(name) {
    this.name = name
    this.taskList = []
    console.log(`I am ${name}`)
    this.next()
  }
  eat(name) {
    const haveMeal = () => {
      console.log(`eat ${name}`)
      this.next()
    }
    this.taskList.push(haveMeal)
    this.next()
    return this
  }
  sleep(duration, first = false) {
    const sleepping = () => {
      setTimeout(() => {
        console.log(`sleep ${duration}s`)
        this.next()
      }, duration * 1000)
    }
    if (first) {
      this.taskList.unshift(sleepping)
    } else {
      this.taskList.push(sleepping)
    }
    this.next()
    return this
  }
  sleepFirst(duration) {
    return this.sleep(duration, true)
  }
  next() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const task = this.taskList.shift()
      task && task()
    })
  }
}

function LazyMan(name) {
  return new LazyHuman(name)
}

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');