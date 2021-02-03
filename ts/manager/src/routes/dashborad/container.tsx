import React, { MouseEvent } from 'react';
import { Button } from 'antd';
import { useParams } from 'react-router';
import './style.less';

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
];

interface Person {
  [keys: string]: string;
}

type ClonePerson<T> = {
  [K in keyof T]: number;
};

type Partial<T> = {
  [K in keyof T]?: T[K];
};

const ming: Person = {
  height: '170cm',
  weight: '65kg'
};

const p: ClonePerson<Person> = {
  height: 123,
  weight: 456
};

const pickSingleValue = <T extends object, U extends keyof T>(
  obj: T,
  key: U
): T[U] => {
  return obj[key];
};
console.log(pickSingleValue(ming, 'height'));

const Dashboard: React.FC = () => {
  const handleClick = (event: MouseEvent): void => {
    console.log(event.target);
  };
  console.log(useParams());
  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        你好啊
      </Button>
    </div>
    // <ul className='images-container'>
    //   {
    //     images.map(item => {
    //       return <li key={item}>
    //         <img src={require(`./images/${item}`)} />
    //       </li>
    //     })
    //   }
    // </ul>
    // <div className="flex-container">
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    // </div>
  );
};

export default Dashboard;
