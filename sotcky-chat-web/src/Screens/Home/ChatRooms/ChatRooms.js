import React, { useState } from 'react';
import * as st from './ChatRooms.styles';
import { Input } from 'antd';
import { ChatRoomsList } from '../Components/ChatRoomsList/ChatRoomsList';

export const ChatRooms = () => {
  const { Search } = Input;
  const [List, setList] = useState([
    { name: 'Hesoyam', id: '123123' },
    { name: 'la otra ekisde', id: '321321' }
  ]);

  return (
    <st.MainChatRoomsContainer>
      <st.TitleBar> Stocky - Chat </st.TitleBar>
      <st.SearchChatRoom>
        <Search
          placeholder='Search a chat room'
          onSearch={value => console.log(value)}
        />
      </st.SearchChatRoom>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <st.Sparator />
      </div>

      <st.CreateNewRoomButtonContainer>
        <st.CreateNewRoomButton>Create new chat room</st.CreateNewRoomButton>
      </st.CreateNewRoomButtonContainer>

      <st.ChatRoomsListContainer>
        <ChatRoomsList chats={List} />
      </st.ChatRoomsListContainer>
    </st.MainChatRoomsContainer>
  );
};
