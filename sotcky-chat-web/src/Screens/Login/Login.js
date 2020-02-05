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
  const [authBaseURL] = useState('http://localhost:3001/api/auth');

  useEffect(() => {
    let authorization = localStorage.getItem('authorization');
    authorization && LogInWithToken(authorization);
  }, []);

  const LogInWithToken = token => {
    Axios({
      method: 'post',
      url: authBaseURL + '/login-with-token',
      headers: { Authorization: token }
    }).then(res => {
      if (res.data.success) {
        actions({
          type: 'setState',
          payload: { ...state, userData: res.data }
        });
        localStorage.setItem('userId', res.data.id);

        navigate('/');
      } else {
        localStorage.removeItem('authorization');
      }
    });
  };

  const LogIn = (l_email, l_password) => {
    Axios.post(authBaseURL + '/login', {
      email: l_email,
      password: l_password
    }).then(res => {
      if (res.data.success) {
        actions({
          type: 'setState',
          payload: { ...state, userData: res.data }
        });

        localStorage.setItem('authorization', res.data.token);
        localStorage.setItem('userId', res.data.id);
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
          placeholder="Email"
        />
        <Input
          onChange={e =>
            setLoginCredentials({
              ...LoginCredentials,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Password"
        />
        <st.LoginButton
          onClick={() =>
            LogIn(LoginCredentials.email, LoginCredentials.password)
          }
        >
          Login
        </st.LoginButton>
        <st.LoginButton onClick={() => navigate('/signup')}>
          Sign up
        </st.LoginButton>
      </st.LoginBox>
    </st.MainLoginContainer>
  );
};
