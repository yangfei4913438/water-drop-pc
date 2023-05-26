import { gql } from '@apollo/client';

export interface UserType {
  /** 用户id */
  id: string;
  /** 用户头像 */
  avatar: string;
  /** 用户昵称 */
  name: string;
  /** 用户描述 */
  desc: string;
  /** 用户登录手机号 */
  tel: string;
  /** 用户登录账号 */
  account: string;
}

// 使用jwt获取用户数据
export const userProfile = gql`
  query getProfile {
    profile {
      id
      name
      desc
      avatar
      tel
      account
    }
  }
`;
