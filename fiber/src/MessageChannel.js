const channel = new MessageChannel()

const port1 = channel.port1
const port2 = channel.port2

port1.onmessage = function (data) {
  console.log('port1收到消息', data)
}

port2.onmessage = function (data) {
  console.log('port2收到消息', data)
}

port1.postMessage('我是message1')
port2.postMessage('我是message2')