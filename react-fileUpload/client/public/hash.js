self.importScripts('https://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.js')
// 监听主线程发送的事件
self.onmessage = async function(event) {
  const { partList } = event.data
  // 因为spark只能对ArrayBuffer进行hash计算，所以下面会将File读出为Buffer
  const spark = new self.SparkMD5.ArrayBuffer()
  let percent = 0
  let perSize = 100 / partList.length
  const buffers = await Promise.all(partList.map(part => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(part.chunk)
      reader.onload = function(e) {
        percent += perSize
        self.postMessage({ percent: percent.toFixed(2) }) // 每读完一个分片，就像主线程汇报一下进度
        resolve(e.target.result)
      }
    })
  }))
  // spark根据每个buffer来计算hash
  buffers.forEach(buffer => spark.append(buffer))
  self.postMessage({ percent: 100, hash: spark.end() })
  self.close() // 关闭webWorker
}