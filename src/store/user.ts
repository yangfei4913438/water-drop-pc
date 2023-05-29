import { atom } from 'jotai';
import { UserType } from '@/graphql/user';

/** 用户信息默认值 */
export const userInfoDefault: UserType = {
  id: '',
  name: '',
  avatar: '',
  desc: '',
  tel: '',
  userType: 'admin',
  disabled: false,
};

/** 用户信息的数据原子对象 */
export const userInfoAtom = atom<UserType>(userInfoDefault);
