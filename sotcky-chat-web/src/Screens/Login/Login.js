import React, { useState, useContext } from 'react';
import { Input } from 'antd';
import * as st from './Login.styles';
import Axios from 'axios';
import Context from '../../GlobalState/Context';
import { navigate } from '@reach/router';

export const Login = () => {
  const { state, actions } = useContext(Context);
  const [LoginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });
  const [endpoint_login] = useState('http://192.168.0.14:3000/api/auth/login/');

  const LogIn = () => {
    Axios.post(endpoint_login, {
      email: LoginCredentials.email,
      password: LoginCredentials.password
    }).then(res => {
      if (res.data.success) {
        actions({
          type: 'setState',
          payload: { ...state, token: res.data.token }
        });
        navigate('/');
      } else {
        alert('Failed to log in, try again');
      }
    });
  };

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
        <st.LoginButton onClick={LogIn}>Login</st.LoginButton>
      </st.LoginBox>
    </st.MainLoginContainer>
  );
};
