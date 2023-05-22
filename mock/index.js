import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker/locale/zh_CN';

const typeDefs = `#graphql
  type UserType {
    """用户id"""
    id: String!
  
    """用户昵称"""
    name: String!
  
    """账号描述"""
    desc: String!
  
    """用户电话"""
    tel: String!
  
    """登录密码"""
    password: String!
  
    """登录账户"""
    account: String!
  }
  
  type Query {
    """使用id查询用户信息"""
    find(id: String!): UserType!
  }
  
  type Mutation {
    """创建用户"""
    create(params: UserInput!): Boolean!
  
    """更新用户信息"""
    update(id: String!, params: UserInput!): Boolean!
  
    """删除用户"""
    remove(id: String!): Boolean!
  }
  
  input UserInput {
    """账号昵称"""
    name: String!
  
    """账号描述"""
    desc: String
  
    """用户电话"""
    tel: String
  
    """登录密码"""
    password: String
  
    """登录账户"""
    account: String
  }
`;

const resolvers = {
  UserType: {
    id: () => faker.string.uuid(),
    name: () => faker.person.fullName(),
    tel: () => faker.phone.number('+86 186 #### ####'),
    desc: () => faker.word.words(3),
    account: () => faker.string.alpha(16),
    password: () =>
      faker.internet.password({
        length: 12,
        pattern: /[a-zA-Z0-9~!@#$%^&*]/,
      }),
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'hello',
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
