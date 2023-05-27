import React, { FC } from 'react';
import { homePath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const Mine: FC = () => {
  const { goToRoute } = useProjectRoute();

  return (
    <div className='mine'>
      <p>this is Mine Page</p>
      <button type='button' onClick={() => goToRoute(homePath)}>
        去首页
      </button>
    </div>
  );
};

export default Mine;
