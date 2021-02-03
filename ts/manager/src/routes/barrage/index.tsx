import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { Input, Button,  } from 'antd'
import { TwitterPicker } from 'react-color'
import './style.less'

interface IBarrage {
  message: string;
  speed?: number;
  color?: string;
  fontSize?: number;
  time: number;
}

class CanvasBarrage {
  constructor(canvas: HTMLCanvasElement, video: HTMLVideoElement, barrages: IBarrage[]) {
    // 忽略对message, time属性的检查，从IBarrage生成新的类型
    const defaultOptions: Omit<Omit<IBarrage, 'message'>, 'time'> = {
      speed: 15,
      color: '#FFF',
      fontSize: 16
    }
    Object.assign(this, defaultOptions, barrages)
    // this.canvas = canvas
    // this.video = video
  }
}

const Barrage: React.FC = (props: any) => {
  const [color, setColor] = useState<string>('#FFF')
  const [showColor, toggle] = useState<boolean>(false)
  const [barrage, setBarrage] = useState<string>('')
  const canvas = useRef<HTMLCanvasElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  const barrages: IBarrage[] = [
    { message: '第一条弹幕', time: 50 },
    { message: '第二条弹幕', time: 50, color: 'yellow' },
    { message: '第三条弹幕', time: 50, speed: 8 },
  ]

  useEffect(() => {
    const canvasBarrage = new CanvasBarrage(canvas.current!, video.current!, barrages)
    console.log(canvasBarrage)
  }, [])

  const handleBarrage = (e: ChangeEvent<HTMLInputElement>) => {
    setBarrage(e.target.value)
  }

  const emitBarrage = () => {
    console.log(barrage)
    setBarrage('')
  }

  return (
      <div className="barrage-container">
        <div className="video-container">
          <canvas ref={canvas}></canvas>
          <video
            autoPlay
            ref={video}
            src="https://vdept.bdstatic.com/7a796163696c35706b713431376c764a/776c477051426958/eab654981b48640eedc61f59223c17a43c0e4458631437f39577122e505640b58386d73ee87ca04cd12813387eea0fc7.mp4?auth_key=1595525466-0-0-f155bfecad7a627800a76493a685485c" 
            width="500"
            controls>
          </video>
        </div>
        <p>
          <Input value={barrage} onChange={handleBarrage} onPressEnter={emitBarrage} placeholder="弹幕君~" />
        </p>
        <Button onClick={() => toggle(true)} style={{ backgroundColor: color }}>弹幕颜色</Button>
        {
          showColor && <TwitterPicker color={color} onChangeComplete={v => {
            toggle(false)
            setColor(v.hex)
          }} />
        }
        <Button onClick={emitBarrage}>发送弹幕</Button>
      </div>
    )
  }
      
export default Barrage