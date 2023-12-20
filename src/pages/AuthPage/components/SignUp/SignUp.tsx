import React, { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useAuth } from '@/context/AuthProvider';
import AuthForm from '../AuthForm';
import { Values } from '../AuthForm/types';
import { fields } from './fields';

const SignUp: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loginIsExist, setLoginIsExist] = useState(false);

  const onFinish = ({ login, password }: Values) => {
    auth.signUp(
      { login, password },
      () => {
        navigate(state?.from);
      },
      () => setLoginIsExist(true)
    );
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<Values>) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <AuthForm
      currentForm='signup'
      {...{ fields, onFinish, onFinishFailed, loginIsExist }}
    />
  );
};

export default SignUp;
