import React, { FC, useLayoutEffect } from 'react';
import { useMutation } from '@apollo/client';
import useProjectRoute from '@/hooks/useProjectRoute';
import { Col, Form, message, Row } from 'antd';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { updateUser, type UserType } from '@/graphql/user';
import useStore from '@/store';
import OSSImageUpload from '@/components/OSSImageUpload';

const Mine: FC = () => {
  // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
  const [form] = Form.useForm<UserType & { avatars: { url: string }[] }>();
  const { reFresh } = useProjectRoute();
  const { userInfo } = useStore();

  useLayoutEffect(() => {
    if (userInfo.id && !form.getFieldValue('id')) {
      form.setFieldsValue({
        ...userInfo,
        // 服务器没有 avatars 属性，这个只是ui组件需要的，所以需要在前端构造一下数据。
        avatars: [
          {
            url: userInfo.avatar,
          },
        ],
      });
    }
  }, [form, userInfo]);

  // 更新用户
  const [update, { loading }] = useMutation(updateUser);

  // 响应提交按钮，参数就是所有表单选项的kv值, 不会有多余的无关属性
  const handleFinish = async (formData: UserType & { avatars: { url: string }[] }) => {
    // console.log('formData:', formData);
    update({
      variables: {
        id: userInfo.id,
        params: {
          name: formData.name, // 更新昵称
          desc: formData.desc, // 更新个人简介
          avatar: formData.avatars[0].url, // 更新个人头像
        },
      },
    })
      .then(() => {
        message.success('更新成功', 1).then(() => {
          // 刷新页面会自动更新用户数据
          reFresh();
        });
      })
      .catch((err) => {
        console.error('failed:', err);
      });
  };

  return (
    <div className='mine'>
      <ProForm
        form={form}
        onFinish={handleFinish}
        submitter={{
          submitButtonProps: {
            loading,
          },
          resetButtonProps: {
            hidden: true,
          },
        }}
      >
        <Row gutter={32}>
          <Col span={8}>
            <ProFormText name='tel' label='手机号' disabled />
            <ProFormText name='name' label='昵称' placeholder='请输入昵称' />
            <ProFormTextArea name='desc' label='简介' placeholder='请输入个人简介' />
          </Col>
          <Col>
            <Form.Item name='avatars'>
              <OSSImageUpload label='更改头像' />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </div>
  );
};

export default Mine;
