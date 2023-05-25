import { gql } from '@apollo/client';

export interface UserFieldType {
  id: string;
  avatar: string;
  name: string;
  desc: string;
  tel: string;
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
