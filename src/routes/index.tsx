import { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { HomeOutlined, IdcardOutlined } from '@ant-design/icons';

import { homePath, minePath } from '@/consts/routes';

import Home from '@/pages/home';
import Page404 from '@/pages/page404';
import Mine from '@/pages/mine';

// 关联的参数是布局组件需要的, name 是布局组件的显示名称，也作为遍历key使用的
type routeProps = RouteProps & {
  name: string; // 布局组件的路由名称
  icon?: ReactNode; // 布局组件的路由图标
  hideInMenu?: boolean; // 是否隐藏
};

// 路由列表
export const routesList: routeProps[] = [
  {
    path: homePath,
    element: <Home />,
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    path: minePath,
    element: <Mine />,
    name: '我的',
    icon: <IdcardOutlined />,
  },
  {
    path: '*', // 这里的*要放在最后，用于匹配异常路由
    element: <Page404 />,
    name: '404',
    hideInMenu: true,
  },
];
