import React, { FC } from 'react';
import useJWT from '@/hooks/useJWT';

const Home: FC = () => {
  useJWT();

  return <div>this is Home Page</div>;
};

export default Home;
