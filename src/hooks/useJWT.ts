import { useQuery } from '@apollo/client';
import { ResultType, userProfile, UserType } from '@/graphql/user';
import useStore from '@/store';
import { homePath, loginPath } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import { printGraphqlException } from '@/utils/log';
import { gqlExceptionStatus } from '@/utils/graphqlResult';

// 检查JWT是否过期
const useJWT = () => {
  const { goToRoute, isLoginPage } = useProjectRoute();
  const { setUserInfo } = useStore();

  const { loading } = useQuery<{ profile: ResultType<UserType> }>(userProfile, {
    // 只处理请求失败的情况
    onError: (err) => {
      printGraphqlException(err);
      const { code } = gqlExceptionStatus(err);
      // 如果未授权，返回登录页面，如果已经是登陆页就不用管了
      if ([401, 403].includes(code) && !isLoginPage) {
        goToRoute(loginPath);
      }
    },
    // 请求成功后更新用户数据，如果当前页是登陆页，还需要跳转到首页
    onCompleted: async ({ profile }) => {
      // 只有状态码是200, 才是正常的
      if (profile.code === 200 && profile.data) {
        // 处理拿到的用户数据
        setUserInfo(profile.data);
        // 登陆页,就直接跳转首页
        if (isLoginPage) {
          // 处理完用户数据，路由跳转首页
          goToRoute(homePath);
        }
      } else {
        console.error('获取用户信息出现异常:', profile.code, profile.message);
      }
    },
  });

  return { loading };
};

export default useJWT;
