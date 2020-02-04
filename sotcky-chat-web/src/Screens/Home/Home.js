import React from 'react';
import * as st from './Home.styles';
import { ChatRooms } from './ChatRooms/ChatRooms';
import { TypeZone } from './TypeZone/TypeZone';

export const Home = () => {
  return (
    <st.MainHomeContainer>
      <ChatRooms />
      <TypeZone />
    </st.MainHomeContainer>
  );
};
