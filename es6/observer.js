
class Observer {
  constructor(name) {
    this.name = name
  }
  handleChange(name, oldState, state) {
    console.log(`${this.name} 观察到${name}的状态从${oldState}变成了${state}`)
  }
}

class Subject {
  constructor(name) {
    this.name = name
    this.state = '睡觉'
    this.observerList = new Set // 观察者
  }
  changeState(state) {
    const oldState = this.state
    this.state = state
    this.observerList.forEach(observer => {
      observer.handleChange(this.name, oldState, state)
    })
  }
  observe(observer) {
    this.observerList.add(observer)
  }
  cancelObserve(observer) {
    console.log(`${observer.name} 取消了观测${this.name}`)
    this.observerList.delete(observer)
  }
}

const hlongc = new Observer('hlongc')
const leiqingxia = new Observer('leiqingxia')

const cat = new Subject('猫咪')
cat.observe(hlongc)
cat.observe(leiqingxia)

cat.changeState('睡醒了')
cat.cancelObserve(leiqingxia)

cat.changeState('吃饭...')