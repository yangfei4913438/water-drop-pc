import { RouteProps } from 'react-router-dom';
import Login from '@/pages/login';
import Home from '@/pages/home';
import Page404 from '@/pages/page404';

type routeProps = RouteProps & { title: string };

export const routesList: routeProps[] = [
  {
    path: '/login',
    element: <Login />,
    title: '登录',
  },
  {
    path: '/',
    element: <Home />,
    title: '首页',
  },
  {
    path: '*', // 这里的*要放在最后，用于匹配异常路由
    element: <Page404 />,
    title: '404',
  },
];
