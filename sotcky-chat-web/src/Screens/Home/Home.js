import React from 'react';
import * as st from './Home.styles';
import { ChatRooms } from './ChatRooms/ChatRooms';

export const Home = () => {
  return (
    <st.MainHomeContainer>
      <ChatRooms />
    </st.MainHomeContainer>
  );
};
