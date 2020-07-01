import React from 'react'
import './style.less'

const images = [
  'WechatIMG337.jpeg',
  'WechatIMG338.jpeg',
  'WechatIMG339.jpeg',
  'WechatIMG340.jpeg',
  'WechatIMG341.jpeg',
  'WechatIMG342.jpeg',
  'WechatIMG343.jpeg',
  'WechatIMG344.jpeg',
  'WechatIMG345.jpeg'
]

const Dashboard: React.FC = () => {
  
  return (
    // <ul className='images-container'>
    //   {
    //     images.map(item => {
    //       return <li key={item}>
    //         <img src={require(`./images/${item}`)} />
    //       </li>
    //     })
    //   }
    // </ul>
    <div className='flex-container'>
      <div></div>
      <div></div>
      <div></div>
      {/* <div></div>
      <div></div> */}
    </div>
  )
}

export default Dashboard