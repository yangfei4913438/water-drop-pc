import { Button, Result } from 'antd';
import React from 'react';

import styles from '@/styles/page404.module.scss';

const Page404 = () => {
  return (
    <section className={styles.container}>
      <Result
        status='404'
        title='404'
        subTitle='很抱歉，您要访问的页面不存在。'
        extra={
          <Button type='primary' href='/'>
            返回首页
          </Button>
        }
      />
    </section>
  );
};

export default Page404;
