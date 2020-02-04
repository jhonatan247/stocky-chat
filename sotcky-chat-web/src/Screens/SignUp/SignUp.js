import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'antd';
import * as st from './SignUp.styles';
import Axios from 'axios';
import Context from '../../GlobalState/Context';
import { navigate } from '@reach/router';

export const SignUp = () => {
  const { state, actions } = useContext(Context);
  const [LoginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [endpoint_signup] = useState(
    'http://192.168.0.14:3000/api/auth/sign-up/'
  );
  const [endpoint_login] = useState('http://192.168.0.14:3000/api/auth/login/');

  useEffect(() => {
    let currentSessionPassword = localStorage.getItem('currentSessionPassword');
    let currentSessionEmail = localStorage.getItem('currentSessionEmail');
    currentSessionPassword &&
      LoginUser(currentSessionEmail, currentSessionPassword);
  }, []);

  const Signup = () => {
    Axios.post(endpoint_signup, {
      email: LoginCredentials.email,
      name: LoginCredentials.name,
      password: LoginCredentials.password
    })
      .then(() => LoginUser(LoginCredentials.email, LoginCredentials.password))
      .catch(err => {
        console.log(err);
        alert('Failed at user creation');
      });
  };

  const LoginUser = (l_email, l_password) =>
    Axios.post(endpoint_login, {
      email: l_email,
      password: l_password
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

  return (
    <st.MainSignUpContainer>
      <st.SignUpBox>
        <st.Title>
          {' '}
          Sign up to <st.MarkText> Stocky Chat</st.MarkText>{' '}
        </st.Title>

        <Input
          onChange={e =>
            setLoginCredentials({ ...LoginCredentials, email: e.target.value })
          }
          placeholder='Email'
        />

        <Input
          onChange={e =>
            setLoginCredentials({ ...LoginCredentials, name: e.target.value })
          }
          placeholder='Name'
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

        <st.LoginButton onClick={Signup}>Sign up</st.LoginButton>
      </st.SignUpBox>
    </st.MainSignUpContainer>
  );
};
