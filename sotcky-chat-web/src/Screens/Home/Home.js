import React, { useEffect } from 'react';
import * as st from './Home.styles';
import { ChatRooms } from './ChatRooms/ChatRooms';
import { TypeZone } from './TypeZone/TypeZone';
import { navigate } from '@reach/router';

export const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      let currentSessionPassword = localStorage.getItem(
        'currentSessionPassword'
      );
      if (!currentSessionPassword) {
        navigate('/login');
      }
    }, 300);
  }, []);

  const CloseCurrentSession = () => {
    localStorage.removeItem('currentSessionPassword');
    navigate('/login');
  };

  return (
    <st.MainHomeContainer>
      <st.SignOutButton onClick={() => CloseCurrentSession()}>
        {' '}
        SignOut{' '}
      </st.SignOutButton>
      <ChatRooms />
      <TypeZone />
    </st.MainHomeContainer>
  );
};
