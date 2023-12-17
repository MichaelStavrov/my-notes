import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useAuth } from '@/context/AuthProvider';
import styles from './SignIn.module.scss';

const SignIn: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Button
      onClick={() => {
        auth.signIn({ name: 'name' }, () => {
          navigate(state?.from);
        });
      }}
    >
      SignIn
    </Button>
  );
};

export default SignIn;
