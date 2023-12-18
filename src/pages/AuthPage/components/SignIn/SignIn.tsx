import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useAuth } from '@/context/AuthProvider';
import AuthForm from '../AuthForm';
import { Values } from '../AuthForm/types';
import { fields } from './fields';

const SignIn: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onFinish = (values: Values) => {
    auth.signIn({ name: values.login }, () => {
      navigate(state?.from);
    });

    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<Values>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthForm currentForm='signin' {...{ fields, onFinish, onFinishFailed }} />
  );
};

export default SignIn;
