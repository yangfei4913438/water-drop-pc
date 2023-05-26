import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { userProfile, UserType } from '@/graphql/user';

// 检查JWT是否过期
const useJWT = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useQuery<{ profile: UserType }>(userProfile, {
    // 登陆页不检查
    skip: location.pathname === '/login',
    // 只处理请求失败的情况
    onError: ({ graphQLErrors }) => {
      // 如果未授权，返回登录页面
      if (graphQLErrors[0].message === 'Unauthorized') {
        navigate('/login');
      }
    },
  });
};

export default useJWT;
