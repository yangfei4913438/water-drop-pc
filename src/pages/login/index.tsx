import { useNavigate } from 'react-router-dom';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useMutation, useQuery } from '@apollo/client';

import { checkCodeMsg, sendCodeMsg } from '@/graphql/sms';

import styles from '@/styles/login.module.scss';
import { AUTH_TOKEN } from '@/consts/cache';
import { UserFieldType, userProfile } from '@/graphql/user';

interface FormType {
  mobile: string;
  captcha: string;
  autoLogin: boolean;
}

const Login = () => {
  const [send] = useMutation(sendCodeMsg);
  const [check] = useMutation(checkCodeMsg);
  const navigate = useNavigate();

  // 如果已经存在有效的JWT, 就直接跳转首页，无需等待登陆页渲染
  useQuery<{ profile: UserFieldType }>(userProfile, {
    // 只处理请求成功的情况
    onCompleted: ({ profile }) => {
      // 处理拿到的用户数据
      console.log('profile:', profile);
      // 处理完用户数据，路由跳转首页
      navigate('/');
    },
  });

  const handleGetCaptcha = async (mobile: string) => {
    console.log('tel:', mobile);
    await send({ variables: { tel: mobile } })
      .then(async ({ data: { codeMessage } }) => {
        console.log('res:', codeMessage);
        await message.success(`获取验证码成功！验证码为：${codeMessage}`);
      })
      .catch(async (err) => {
        // 后台返回的异常代码
        console.error('错误码:', err.graphQLErrors[0].extensions.code);
        await message.error(`获取验证码失败: ${err.message}`);
      });
  };

  const handleUserLogin = async (formData: FormType) => {
    console.log('formData:', formData);
    check({ variables: { tel: formData.mobile, code: formData.captcha } })
      .then(async ({ data: { smsLogin } }) => {
        // 处理返回的用户数据
        if (formData.autoLogin) {
          // 只有自动登录，才会保存登录信息
          localStorage.setItem(AUTH_TOKEN, smsLogin.token);
        }
        await message.success('登录成功', 2).then(() => {
          console.log('路由跳转首页');
          // 路由跳转首页
          navigate('/');
        });
      })
      .catch(async (err) => {
        // 后台返回的异常代码
        console.error('错误码:', err.graphQLErrors[0].extensions.code);
        await message.error(`登录失败：${err.message}`);
      });
  };

  return (
    <div className={styles.container}>
      <LoginFormPage
        onFinish={handleUserLogin}
        backgroundImageUrl='https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'
        logo='https://yangfei-assets.oss-cn-shanghai.aliyuncs.com/images/henglogo@2x.png'
      >
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className='prefixIcon' />,
            }}
            name='mobile'
            placeholder='手机号'
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className='prefixIcon' />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder='请输入验证码'
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            phoneName='mobile' // 可以拿到手机号输入框中的输入内容
            name='captcha'
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={handleGetCaptcha}
          />
        </>

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name='autoLogin'>
            自动登录
          </ProFormCheckbox>
          <button
            type='button'
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </button>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
