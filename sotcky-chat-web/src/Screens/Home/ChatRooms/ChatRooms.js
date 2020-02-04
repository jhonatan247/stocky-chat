import React, { useState, useEffect, useContext } from 'react';
import * as st from './ChatRooms.styles';
import { Input } from 'antd';
import { ChatRoomsList } from '../Components/ChatRoomsList/ChatRoomsList';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';
import Context from '../../../GlobalState/Context';

export const ChatRooms = () => {
  const { state, actions } = useContext(Context);
  const { Search } = Input;
  const [endpoint_list] = useState('http://192.168.0.14:3000/api/chat-rooms/');
  const [localSocket, setLocalSocket] = useState();
  const [endpoint_socket] = useState('http://192.168.0.14:3001/');
  const [List, setList] = useState([]);
  const [AuxList, setAuxList] = useState([]);

  useEffect(() => {
    GetFirstChatRooms().then(res => setList(res.data.chatRooms));
  }, []);

  useEffect(() => {
    let socket = socketIOClient(endpoint_socket);
    setLocalSocket(socket);
    socket.on('chat-room-created', data => {
      GetNewItem(data);
    });
  }, [List]);

  const GetNewItem = data => {
    let aux = [];
    GetFirstChatRooms()
      .then(res => setList(res.data.chatRooms))
      .then(aux.push(data));
  };

  const GetFirstChatRooms = () =>
    Axios({
      method: 'get',
      url: endpoint_list,
      headers: {
        Authorization: state.token
      }
    });

  const CreateChatRoom = () => {
    let value = prompt('Write the name of the room');
    localSocket.emit('create-chat-room', {
      token: state.token,
      name: value
    });
  };

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
        <st.CreateNewRoomButton onClick={CreateChatRoom}>
          Create new chat room
        </st.CreateNewRoomButton>
      </st.CreateNewRoomButtonContainer>

      <st.ChatRoomsListContainer>
        <ChatRoomsList chats={List} />
      </st.ChatRoomsListContainer>
    </st.MainChatRoomsContainer>
  );
};
