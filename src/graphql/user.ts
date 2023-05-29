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
  /** 用户类型 */
  userType: string;
  /** 用户是否已经被禁用 */
  disabled: boolean;
}

export interface ResultType<T> {
  code: number;
  message: string;
  data?: T;
}

// 使用jwt获取用户数据
export const userProfile = gql`
  query getProfile {
    profile {
      code
      message
      data {
        id
        name
        desc
        avatar
        tel
        userType
        disabled
      }
    }
  }
`;

// 查询用户
export const findUser = gql`
  query findUser($id: String!) {
    find(id: $id) {
      code
      message
      data {
        id
        name
        desc
        avatar
        tel
        userType
        disabled
      }
    }
  }
`;

// 创建用户
export const createUser = gql`
  mutation create($params: UserInputType!) {
    create(params: $params) {
      code
      message
      data
    }
  }
`;

// 更新用户
export const updateUser = gql`
  mutation update($id: String!, $params: UserInputType!) {
    update(id: $id, params: $params) {
      code
      message
      data
    }
  }
`;

// 删除用户
export const removeUser = gql`
  mutation delete($id: String!) {
    delete(id: $id) {
      code
      message
      data
    }
  }
`;
