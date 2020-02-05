import React, { useContext } from 'react';
import * as st from './ChatRoomsList.style';
import Context from '../../../../GlobalState/Context';

export const ChatRoomsList = props => {
  const { state, actions } = useContext(Context);

  const SetChatRoom = item => {
    props.onSelelectChatRoom(item);
  };

  return props.chats.map((item, index) => (
    <st.ListItemContainer key={index} onClick={() => SetChatRoom(item)}>
      <st.Name> {item.name} </st.Name>
    </st.ListItemContainer>
  ));
};
