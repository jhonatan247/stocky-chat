import React, { useState, useContext, useEffect } from 'react';
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

  useEffect(() => {
    let currentSessionPassword = localStorage.getItem('currentSessionPassword');
    let currentSessionEmail = localStorage.getItem('currentSessionEmail');
    currentSessionPassword &&
      LogIn(currentSessionEmail, currentSessionPassword);
  }, []);

  const LogIn = (l_email, l_password) => {
    Axios.post(endpoint_login, {
      email: l_email,
      password: l_password
    })
      .then(res => {
        if (res.data.success) {
          actions({
            type: 'setState',
            payload: { ...state, token: res.data.token }
          });
          navigate('/');
        } else {
          alert('Failed to log in, try again');
        }
      })
      .then(() => {
        localStorage.setItem('currentSessionEmail', LoginCredentials.email);
        localStorage.setItem(
          'currentSessionPassword',
          LoginCredentials.password
        );
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
        <st.LoginButton
          onClick={() =>
            LogIn(LoginCredentials.email, LoginCredentials.password)
          }
        >
          Login
        </st.LoginButton>
      </st.LoginBox>
    </st.MainLoginContainer>
  );
};
