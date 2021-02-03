import React from 'react';
import { useParams } from 'react-router-dom';

const World: React.FC = () => {
  console.log(useParams());
  return <div>world</div>;
};

export default World;
