import React, { FC } from 'react';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { Field, FormType } from '../../types';
import styles from './AuthForm.module.scss';

interface AuthFormProps<T> {
  currentForm: FormType;
  fields: Field[];
  onFinish: (values: T) => void;
  onFinishFailed: (errorInfo: ValidateErrorEntity<T>) => void;
}

const AuthForm = <T,>({
  currentForm,
  fields,
  onFinish,
  onFinishFailed,
}: AuthFormProps<T>) => {
  const isSignUpForm = currentForm === 'signup';

  return (
    <>
      <Typography.Title>
        {isSignUpForm ? 'Регистрация' : 'Вход'}
      </Typography.Title>
      <Form
        className={styles.form}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {fields.map((field) => (
          <Form.Item {...field}>
            {field.name === 'password' ? <Input.Password /> : <Input />}
          </Form.Item>
        ))}
        <Flex justify='center'>
          <Form.Item style={{ width: '100%', maxWidth: 240 }}>
            <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
              {isSignUpForm ? 'Регистрация' : 'Войти'}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};

export default AuthForm;
