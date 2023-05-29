interface IGQLExceptionStatusStatus {
  // 状态码
  code: number;
  // 状态消息
  message: string;
  // 错误堆栈
  stacktrace: string[];
}

/**
 * 获取graphql异常错误的相关数据
 * */
export const gqlExceptionStatus = (err: any): IGQLExceptionStatusStatus => {
  return {
    code: err.graphQLErrors[0].extensions.originalError.statusCode,
    message: err.graphQLErrors[0].extensions.originalError.message,
    stacktrace: err.graphQLErrors[0].extensions.stacktrace,
  };
};
