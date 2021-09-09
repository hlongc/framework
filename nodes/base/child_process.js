const child_process = require('child_process')

const child = child_process.fork('./children.js')

child.on('message', msg => {
  console.log('收到child的消息: ' + msg)
})
child.send('收到请回答')