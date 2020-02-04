import React from 'react';
import * as st from './ChatRoomsList.style';

export const ChatRoomsList = ({ chats }) => {
  return chats.map(item => (
    <st.ListItemContainer> {item.name} </st.ListItemContainer>
  ));
};
