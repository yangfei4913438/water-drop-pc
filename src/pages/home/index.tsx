import React, { FC } from 'react';

import { minePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const Home: FC = () => {
  const { goToRoute } = useProjectRoute();

  return (
    <div className=''>
      <p>this is Home Page</p>
      <button type='button' onClick={() => goToRoute(minePath)}>
        去个人中心
      </button>
    </div>
  );
};

export default Home;
