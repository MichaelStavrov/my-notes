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
  loginIsExist?: boolean;
  invalidAuthData?: boolean;
}

const AuthForm = <T,>({
  currentForm,
  fields,
  onFinish,
  onFinishFailed,
  loginIsExist,
  invalidAuthData,
}: AuthFormProps<T>) => {
  const isSignUpForm = currentForm === 'signup';

  return (
    <>
      <Typography.Title>
        {isSignUpForm ? 'Регистрация' : 'Вход'}
      </Typography.Title>
      {loginIsExist && (
        <span className='dangerColor'>Такой логин уже занят</span>
      )}
      {invalidAuthData && (
        <span className='dangerColor'>Неверные логин и/или пароль</span>
      )}
      <Form
        className={styles.form}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {fields.map((field) => (
          <Form.Item key={field.label} {...field}>
            {['password', 'confirmPassword'].includes(field.name) ? (
              <Input.Password />
            ) : (
              <Input />
            )}
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
