import { gql } from '@apollo/client';

// 发送短信
export const sendCodeMsg = gql`
  mutation getCodeMsg($tel: String!) {
    codeMessage(tel: $tel)
  }
`;

// 校验短信
export const checkCodeMsg = gql`
  mutation login($tel: String!, $code: String!) {
    smsLogin(tel: $tel, code: $code) {
      id
      account
      password
      tel
      name
      desc
      avatar
    }
  }
`;
