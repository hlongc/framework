const EventEmitter = require('./package/Events')

const e = new EventEmitter()

e.on('newListener', type => {
  process.nextTick(() => {
    e.emit(type)
  })
})

e.once('sleep', () => {
  console.log('睡觉1')
})

e.once('sleep', () => {
  console.log('睡觉2')
})

e.once('sleep', () => {
  console.log('睡觉3')
})

e.once('sleep', () => {
  console.log('睡觉4')
})
