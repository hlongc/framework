const fs = require('fs')
const EventEmitter = require('events')

// flags?: string;
// encoding?: BufferEncoding;
// fd?: number;
// mode?: number;
// autoClose?: boolean;
// emitClose?: boolean;
// start?: number;
// end?: number;
// highWaterMark?: number;

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'r' // 以什么模式进行文件操作
    this.encoding = options.encoding || 'buffer' // 读出来的格式
    this.mode = options.mode || 0x666 // 以哪种权限读 666代表只有读写，但是没有执行的权限
    this.autoClose = options.autoClose || true
    this.emitClose = options.emitClose || true
    this.start = options.start || 0 // 从文件哪个位置开始读取
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.position = 0
    // 调用时就默认打开文件
    this.open()
    // 监听 data订阅事件，
    this.on('newListener', type => {
      if (type === 'data') { // data订阅时才开始读取文件
        this.read()
      }
    })
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit('error', err)
      }
      this.fd = fd // 保存文件描述符
      this.emit('open', fd) // 打开完成以后开始读取文件
    })
  }
  read() {
    // 因为事件都是同步监听的，但是执行的时候是异步的
    // 而且有可能是setTimeout(() => { rs.on('open') })
    if (typeof this.fd !== 'number') { // 说明此时还没打开文件，那么保存一下，等文件打开了才开始读
      return this.once('open', this.read)
    }
    const buffer = Buffer.alloc(this.highWaterMark)
    // 有可能最后一次不足highWaterMark个，那么就取两者的最小值
    const count = this.end ? Math.min(this.end - this.position + 1, this.highWaterMark) : this.highWaterMark
    // 文件描述符 读到哪个buffer里面 从buffer哪个位置开始写入 读多少 从文件哪个位置开始读
    fs.read(this.fd, buffer, 0, count, this.position, (err, bytesRead, buff) => {
      if (bytesRead) { // 如果当前读出了长度，那么改变偏移量
        this.position += bytesRead
        // 读取出来多少个就发射多少个
        this.emit('data', buffer.slice(0, bytesRead))
        this.read()
      } else { // 读取完成
        this.emit('end')
        this.close()
      }
    })
  }
  close() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
}

module.exports = ReadStream