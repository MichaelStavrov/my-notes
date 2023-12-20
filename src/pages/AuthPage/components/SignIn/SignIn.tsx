import React, { FC, useState } from 'react';
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
  const [invalidAuthData, setInvalidAuthData] = useState(false);

  const onFinish = (values: Values) => {
    auth.signIn(
      values,
      () => {
        navigate(state?.from);
      },
      () => setInvalidAuthData(true)
    );
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<Values>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthForm
      currentForm='signin'
      {...{ fields, onFinish, onFinishFailed, invalidAuthData }}
    />
  );
};

export default SignIn;
