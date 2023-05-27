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

// 查询用户
export const findUser = gql`
  query findUser($id: String!) {
    find(id: $id) {
      id
      name
      desc
      avatar
      tel
      account
    }
  }
`;

// 创建用户
export const createUser = gql`
  mutation createUser($params: UserInput!) {
    create(params: $params)
  }
`;

// 更新用户
export const updateUser = gql`
  mutation updateUser($id: String!, $params: UserInput!) {
    update(id: $id, params: $params)
  }
`;

// 删除用户
export const removeUser = gql`
  mutation removeUser($id: String!) {
    remove(id: $id)
  }
`;
