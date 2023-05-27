import { gql } from '@apollo/client';

export interface OSSInfoType {
  accessId: string;
  host: string;
  dir: string;
  signature: string;
  policy: string;
  expire: string;
}

// 查询oss信息
export const getOSSInfo = gql`
  query getOSSInfo {
    ossInfo {
      accessId
      host
      dir
      signature
      policy
      expire
    }
  }
`;
