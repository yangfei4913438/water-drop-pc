// 首页
export const homePath = '/';

// 登录页
export const loginPath = '/login';

// 个人页面
export const minePath = '/mine';

// 合法的路由列表
export const routePaths = [homePath, loginPath, minePath];

// 合法的路由类型
export type RouteType = typeof homePath | typeof loginPath | typeof minePath;
