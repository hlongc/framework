const EventEmitter = require('./package/Events')
// const EventEmitter = require('events')

const event = new EventEmitter()

event.on('newListener', type => {
  console.log(type)
})

const fn = data => {
  console.log('嗨喽', data)
}

event.on('greet', fn)
// event.off('greet', fn)

event.on('greet', data => {
  console.log('嗨喽1', data)
})

const cb = data => {
  console.log('嗨喽 once', data)
}
event.once('greet', cb)
event.off('greet', cb)

event.emit('greet', { success: true })
