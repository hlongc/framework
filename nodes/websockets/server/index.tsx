const IO = require('socket.io')()

IO.on('connection', socket => {
  socket.on('message', message => {
    socket.emit('message', message)
  })
})

IO.listen(3333)