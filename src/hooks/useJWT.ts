import { useQuery } from '@apollo/client';
import { userProfile, UserType } from '@/graphql/user';
import useStore from '@/store';
import { homePath, loginPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

// 检查JWT是否过期
const useJWT = () => {
  const { goToRoute, isLoginPage } = useProjectRoute();
  const { setUserInfo } = useStore();

  const { loading } = useQuery<{ profile: UserType }>(userProfile, {
    // 只处理请求失败的情况
    onError: ({ graphQLErrors }) => {
      // 如果未授权，返回登录页面，如果已经是登陆页就不用管了
      if (graphQLErrors[0].message === 'Unauthorized' && !isLoginPage) {
        goToRoute(loginPath);
      }
    },
    // 请求成功后更新用户数据，如果当前页是登陆页，还需要跳转到首页
    onCompleted: ({ profile }) => {
      // 处理拿到的用户数据
      setUserInfo(profile);
      // 登陆页,就直接跳转首页
      if (isLoginPage) {
        // 处理完用户数据，路由跳转首页
        goToRoute(homePath);
      }
    },
  });

  return { loading };
};

export default useJWT;
