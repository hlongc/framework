import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

const Hello: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    console.log('hello render');
  }, []);

  const handleClick = () => {
    history.push('/world/4568');
  };

  return (
    <div>
      <p>我是hello哦</p>
      <Button onClick={handleClick}>我要去world页面</Button>
    </div>
  );
};

export default Hello;
