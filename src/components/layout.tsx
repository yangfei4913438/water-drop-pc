import React, { ReactNode } from 'react';
import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';

import { Link, useOutlet } from 'react-router-dom';
import useStore from '@/store';
import { routesList } from '@/routes';
import useJWT from '@/hooks/useJWT';

import styles from '@/styles/layout.module.scss';
import { homePath, loginPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import localCache from '@/core/cache';
import { LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

const menuItemRender = (item: MenuDataItem, dom: ReactNode) => (
  <Link to={item.path ?? homePath}>{dom}</Link>
);

const Layout = () => {
  // JWT校验
  useJWT();
  // 项目路由
  const { is404Page, goToRoute, reFresh } = useProjectRoute();
  // 取出子路由页面
  const outlet = useOutlet();
  // 取出用户信息
  const { userInfo } = useStore();

  const logout = () => {
    localCache.clear();
    reFresh();
  };

  return (
    <ProLayout
      className={is404Page ? styles.container404 : styles.container}
      layout='mix'
      siderWidth={220}
      avatarProps={{
        title: userInfo.name,
        src: userInfo.avatar,
        size: 'small',
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: logout,
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      logo={
        <img
          src='https://yangfei-assets.oss-cn-shanghai.aliyuncs.com/images/henglogo_2x.webp'
          alt=''
        />
      }
      title={false}
      onMenuHeaderClick={() => {
        // 点击logo, 跳转首页
        goToRoute(loginPath);
      }}
      route={{
        path: loginPath,
        routes: routesList,
      }}
      menuItemRender={menuItemRender}
    >
      <PageContainer>{outlet}</PageContainer>
    </ProLayout>
  );
};

export default Layout;