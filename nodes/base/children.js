
process.on('message', msg => {
  console.log('child receive message: ' + msg)
  process.send('收到 over')
})