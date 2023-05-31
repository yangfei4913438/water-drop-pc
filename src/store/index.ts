import { useAtom } from 'jotai';
import { useCallback } from 'react';

import { userInfoAtom, userInfoDefault } from '@/store/user';

/**
 * 状态管理的入口hook
 * 所有的数据管理，都是通过这个hook来处理
 * */
const useStore = () => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  /** userInfo重置为默认值 */
  const resetUserInfo = useCallback(() => {
    setUserInfo(userInfoDefault);
  }, [setUserInfo]);

  /** 将外部用到的对象返回 */
  return {
    userInfo,
    setUserInfo,
    resetUserInfo,
  };
};

export default useStore;
