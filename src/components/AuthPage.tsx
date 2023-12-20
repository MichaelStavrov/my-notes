import React, { useState } from 'react';
import { Button } from 'antd';
import SignIn from '@/pages/AuthPage/components/SignIn';
import SignUp from '@/pages/AuthPage/components/SignUp';
import { FormType } from '@/pages/AuthPage/types';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState<FormType>('signin');
  const isSignInForm = currentForm === 'signin';

  return (
    <div className={styles.authPage}>
      {isSignInForm ? <SignIn /> : <SignUp />}
      <Button
        type='link'
        onClick={() => setCurrentForm(isSignInForm ? 'signup' : 'signin')}
      >
        {isSignInForm ? 'Регистрация' : 'Войти'}
      </Button>
    </div>
  );
};

export default AuthPage;
