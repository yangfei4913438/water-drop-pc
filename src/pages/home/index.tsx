import React, { FC } from 'react';
import useProjectRoute from '@/hooks/useProjectRoute';
import { minePath } from '@/consts/routes';

const Home: FC = () => {
  const { goToRoute } = useProjectRoute();

  return (
    <div className='home'>
      <p>this is Home Page</p>
      <button type='button' onClick={() => goToRoute(minePath)}>
        去个人中心
      </button>
    </div>
  );
};

export default Home;
