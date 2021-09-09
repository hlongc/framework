const fs = require('fs')

/*
https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘

定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
待定回调：执行延迟到下一个循环迭代的 I/O 回调。
idle, prepare：仅系统内部使用。
轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
检测：setImmediate() 回调函数在这里执行。
关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。
在每次运行的事件循环之间，Node.js 检查它是否在等待任何异步 I/O 或计时器，如果没有的话，则完全关闭。
*/

// Promise.resolve().then(() => {
//   console.log('promise')
// })

// process.nextTick(() => {
//   console.log('nextTick')
// })

// 文件io操作处于poll阶段，此时没有check的代码，也没有timer到期的事件，所以会停留在poll阶段，文件读取成功以后，执行回调，然后往下面走是check阶段，执行setImmediate的回调，所以先打印setImmediate,再轮询到timer阶段再打印setTimeout
fs.readFile('name.txt', 'utf-8', (_err, data) => {
  console.log(data)
  setTimeout(() => {
    console.log('setTimeout')
  })
  setImmediate(() => {
    console.log('setImmediate')
  })
})