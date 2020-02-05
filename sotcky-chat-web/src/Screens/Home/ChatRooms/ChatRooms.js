import React, { useState, useEffect, useContext } from 'react';
import * as st from './ChatRooms.styles';
import { Input } from 'antd';
import { ChatRoomsList } from '../Components/ChatRoomsList/ChatRoomsList';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';
import Context from '../../../GlobalState/Context';

export const ChatRooms = props => {
  const { Search } = Input;
  const [List, setList] = useState([]);

  useEffect(() => {
    if (!props.chatRooms) {
      setList([]);
    } else {
      setList(props.chatRooms);
    }
  }, [props.chatRooms]);

  const CreateChatRoom = () => {
    let value = prompt('Write the name of the room');
    props.onCreateChatRoom(value);
  };

  return (
    <st.MainChatRoomsContainer>
      <st.TitleBar> Stocky - Chat </st.TitleBar>
      <st.SearchChatRoom>
        <Search
          placeholder="Search a chat room"
          onSearch={value => console.log(value)}
        />
      </st.SearchChatRoom>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <st.Sparator />
      </div>

      <st.CreateNewRoomButtonContainer>
        <st.CreateNewRoomButton onClick={CreateChatRoom}>
          Create new chat room
        </st.CreateNewRoomButton>
      </st.CreateNewRoomButtonContainer>

      <st.ChatRoomsListContainer>
        <ChatRoomsList
          chats={List}
          onSelelectChatRoom={props.onSelelectChatRoom}
        />
      </st.ChatRoomsListContainer>
    </st.MainChatRoomsContainer>
  );
};
