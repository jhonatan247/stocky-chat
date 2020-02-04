import React, { useState } from 'react';
import { Input } from 'antd';
import * as st from './Login.styles';

export const Login = () => {
  const [LoginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });
  return (
    <st.MainLoginContainer>
      <st.LoginBox>
        <st.Title>
          {' '}
          Sign in to <st.MarkText> Stocky Chat</st.MarkText>{' '}
        </st.Title>

        <Input
          onChange={e =>
            setLoginCredentials({ ...LoginCredentials, email: e.target.value })
          }
          placeholder='Email'
        />

        <Input
          onChange={e =>
            setLoginCredentials({
              ...LoginCredentials,
              password: e.target.value
            })
          }
          type='password'
          placeholder='Password'
        />
        <st.LoginButton>Login</st.LoginButton>
      </st.LoginBox>
    </st.MainLoginContainer>
  );
};
