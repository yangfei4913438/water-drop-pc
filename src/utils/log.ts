import { gqlExceptionStatus } from '@/utils/graphqlResult';

/**
 * 打印后台返回的异常代码
 * */
export const printGraphqlException = (err: any) => {
  printGraphqlErrorObject(err);
  console.group('Graphql错误堆栈');
  console.error(gqlExceptionStatus(err).stacktrace.join('\n'));
  console.groupEnd();
};

/**
 * 将 graphql 错误对象，转换成可读性较高的js对象
 * */
export const printGraphqlErrorObject = (err: any) => {
  console.info('Graphql错误信息:', JSON.parse(JSON.stringify(err)));
};
