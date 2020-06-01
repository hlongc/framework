#!/Users/haizhi/.nvm/versions/node/v13.0.1/bin/node


// #! /usr/bin/env node 

let program = require('commander')

let configs = {
  '-p,--port <val>': 'set http-server port',
  '-d,--directory': 'set http-server directory'
}

Object.entries(configs).forEach(([key, value]) => {
  program.option(key, value)
})

program.on('--help', () => {
  console.log('example')
  console.log(' $ hlc-server -p 3000')
})

let options = program.parse(process.argv)

// console.log(defaultConfig)
const Server = require('../static-server')

const defaultConfig = {
  port: 8888,
  dir: process.cwd(),
  ...options
}

const server = new Server(defaultConfig)
server.start()