import React, { ChangeEvent, useState, useEffect } from 'react'
import { Row, Col, Input, Button, message, Progress, Table } from 'antd'
import { http } from './utils.js'

const DEFUALTE_SIZE = 1024 * 1024 * 100 // 100MB

interface Part {
  chunk: Blob;
  size: number; // 该块总的大小
  filename?: string; // 属于哪个文件
  chunkname?: string;
  loaded?: number; // 已发送的大小
  percent?: number; // 当前块的上传进度
  xhr?: XMLHttpRequest; // 当前块的xhr请求
}

interface Uploaded {
  size: number;
  chunkname: string;
}

enum UPLOAD_STATUS {
  INIT,
  UPLOADING,
  PAUSE,
  COMPLETE
}

export default function Upload() {
  const [currentFile, setCurrentFile] = useState<File>()
  const [url, setUrl] = useState<string>('') // 图片的文件预览
  const [chunks, setChunks] = useState<Part[]>([]) // 保存切片
  const [hashName, setHashName] = useState<string>('') // 当前文件的hash名称
  const [status, setStatus] = useState<UPLOAD_STATUS>(UPLOAD_STATUS.INIT)
  // 文件预览
  useEffect(() => {
    if (currentFile && currentFile.type.split('/')[0] === 'image') {
      const url = window.URL.createObjectURL(currentFile)
      setUrl(url)
      return () => window.URL.revokeObjectURL(url)
    }
  }, [currentFile])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file: File = event.target.files![0]
    setCurrentFile(file)
  }
  // 判断当前文件是否有效
  function isValidFile(file: File):Boolean {
    const type = file!.type
    const validTypes = ['image/jpg', 'image/png', 'image/jpeg', 'video/mp4']
    if (!validTypes.includes(type)) {
      message.warning('文件类型不合法')
      return false
    }
    if (currentFile!.size > 1024 * 1024 * 1024 * 2) {
      message.warning('文件大小不得超过2G')
      return false
    }
    return true
  }
  // 按照一定的大小进行分片
  function createPartList(file: any) {
    const list: Part[] = []
    let current = 0
    while (current < file.size) {
      const chunk = file.slice(current, current + DEFUALTE_SIZE)
      list.push({
        chunk,
        size: chunk.size,
        loaded: 0,
        percent: 0
      })
      current += DEFUALTE_SIZE
    }
    return list
  }
  async function calculateHash(partList: Part[]) {
    return new Promise(resolve => {
      // 开启webworker来计算文件hash，避免文件太大占用主线程，导致页面假死
      const worker: Worker = new Worker('/hash.js')
      worker.postMessage({ partList })
      worker.onmessage = function(event: MessageEvent) {
        const { percent, hash } = event.data
        console.log(percent)
        if (hash) {
          console.log(hash)
          resolve(hash)
        }
      }
    })
  }
  // 每个chunk创建一个请求
  function createChunkRequest(chunks: Part[], complete: Uploaded[], hashname: string) {
    // 过滤掉不需要再次上传的chunk
    const tmp = chunks.filter((part: Part) => {
      const file = complete.find((item: Uploaded) => item.chunkname === part.chunkname)
      // 如果之前没有上传过该chunk，那么要继续上传
      if (!file) {
        return true
      }
      // 之前上传了该chunk，但是没上传完毕
      if (file.size < part.size) {
        part.loaded = file.size
        part.percent = Number(((file.size / part.size) * 100).toFixed(2))
        return true
      }
      return false
    })
    setChunks(tmp)
    return tmp.map((part: Part) => {
      return http({
        method: 'post',
        url: `/upload/${part.filename}/${part.chunkname}/${part.loaded}`,
        headers: { 'Content-Type': 'application/octet-stream' },
        setXHR: (xhr: XMLHttpRequest) => part.xhr = xhr,
        onprogress: (e: ProgressEvent) => {
          part.percent = Number((((part.loaded! + e.loaded) / part.size) * 100).toFixed(2))
          setChunks([...chunks])
        },
        data: part.chunk.slice(part.loaded)
      })
    })
  }
  // 暂停上传
  function handlePause() {
    setStatus(UPLOAD_STATUS.PAUSE)
    chunks.forEach(chunk => chunk.xhr!.abort())
  }
  // 重新上传
  function handleResume() {
    uploadChunks(chunks, hashName)
  }
  async function uploadChunks(partList: Part[], hashname: string) {
    // 先确认之前是否有上传过该文件
    const { success, neepUpload, complete } = await http({
      url: `/validate/${hashname}`
    })
    if (success && !neepUpload) {
      return message.success('秒传成功')
    }
    const chunksHttp = createChunkRequest(partList, complete, hashname)
    // 发送每个分片
    setStatus(UPLOAD_STATUS.UPLOADING)
    await Promise.all(chunksHttp)
    // 发送合并分片请求
    await http({ url: `/merge/${hashname}` })
    message.success('上传成功')
    setStatus(UPLOAD_STATUS.COMPLETE)
  }
  async function upload() {
    if (!currentFile) {
      return message.error('当前未选择文件')
    }
    if (!isValidFile(currentFile!)) {
      return
    }
    // 把大文件切割成小片
    const partList: Part[] = createPartList(currentFile)
    // 切片以后计算hash
    const fileHash = await calculateHash(partList)
    const lastDotIndex = currentFile!.name.lastIndexOf('.')
    const extname = currentFile!.name.slice(lastDotIndex)
    const hashname = fileHash + extname
    setHashName(hashname)
    setStatus(UPLOAD_STATUS.INIT)
    partList.forEach((part: Part, index: number) => {
      part.chunkname = hashname + '-' + index
      part.filename = hashname
    })
    await uploadChunks(partList, hashname)
    
    // const fd = new FormData()
    // fd.append('chunk', currentFile!)
    // fd.append('filename', currentFile!.name)
    // try {
    //   const res = await http({
    //     url: '/upload',
    //     method: 'post',
    //     data: fd
    //   })
    //   if (res.success) {
    //     message.success('文件上传成功')
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }
  const columns = [
    {
      title: 'chunks',
      dataIndex: 'chunkname',
      key: 'chunkname',
      width: '25%'
    },
    {
      title: '上传进度',
      dataIndex: 'percent',
      width: '70%',
      render: (value: number) => {
        return <Progress percent={value} />
      }
    }
  ]
  return (
    <div>
      <Row>
        <Col span={12}>
          <Input type='file' style={{ width: 300 }} onChange={handleChange} />
          <br />
          <Button type='primary' onClick={upload}>上传文件</Button>
          <Button type='primary' danger onClick={handlePause}>暂停</Button>
          <Button type='primary' onClick={handleResume}>继续上传</Button>
        </Col>
        <Col span={12}>
          { url ? <img src={url} style={{ width: 100 }} /> : null }
        </Col>
      </Row>
      {
        status !== UPLOAD_STATUS.INIT ? <Table
          columns={columns}
          dataSource={chunks}
        /> : null
      }
    </div>
  )
}