import { useMemo } from 'react';
import { matchPath, type NavigateOptions, useLocation, useNavigate } from 'react-router-dom';

import { loginPath, routePaths, RouteType } from '@/consts/routes';

const useProjectRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 当前是不是登陆页
  const isLoginPage = useMemo(() => {
    const match = matchPath(loginPath, location.pathname);
    return match && match.pathname === match.pathnameBase;
  }, [location.pathname]);

  // 当前路由是不是一个404路由
  const is404Page = useMemo(
    () =>
      !routePaths.find((path) => {
        const match = matchPath(path, location.pathname);
        return match && match.pathname === match.pathnameBase;
      }),
    [location.pathname]
  );

  // 返回上个页面
  const toPrevRoute = () => navigate(-1);

  // 刷新页面
  const reFresh = () => navigate(0);

  // 跳转路由
  const goToRoute = (routePath: RouteType, options?: NavigateOptions) =>
    navigate(routePath, options);

  return {
    isLoginPage,
    is404Page,
    // 当前路由
    currentRoutePath: location.pathname,
    toPrevRoute,
    goToRoute,
    reFresh,
  };
};

export default useProjectRoute;
