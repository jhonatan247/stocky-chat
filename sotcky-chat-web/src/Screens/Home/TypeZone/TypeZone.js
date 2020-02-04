import React, { useState, useContext, useEffect } from 'react';
import Context from '../../../GlobalState/Context';
import * as st from './TypeZone.styles';
import { Input } from 'antd';
import Axios from 'axios';
import socketIOClient from 'socket.io-client';

export const TypeZone = () => {
  const { state, actions } = useContext(Context);
  const [MessageList, setMessageList] = useState([]);
  const [endpoint_socket] = useState('http://192.168.0.14:3001/');

  const [Message, setMessage] = useState('');
  const [endpoint_list] = useState('http://192.168.0.14:3000/api/chat-rooms/');
  const [localSocket, setLocalSocket] = useState();

  useEffect(() => GetMessageList().then(res => console.log(res.data)), []);

  useEffect(() => {
    let socket = socketIOClient(endpoint_socket);
    setLocalSocket(socket);
    socket.on(`message-created-on-${state.room.id}`, data => {
      GetNewItem(data);
    });
  }, [MessageList]);

  const GetNewItem = data => {
    GetMessageList().then(res => setMessageList(res.data.chatRooms));
  };

  const GetMessageList = () =>
    Axios({
      method: 'get',
      url: endpoint_list + state.room.id,
      headers: {
        Authorization: state.token
      }
    });

  const CheckSend = id => id === 13 && SendMessage();

  const SendMessage = () => {};

  return (
    <st.MainTypeZoneContainer>
      <st.TitleBar>
        <st.Name> {state.room.name || ''} </st.Name>
      </st.TitleBar>

      {state.room.name && (
        <st.TextTypeContainer onKeyDown={e => CheckSend(e.keyCode)}>
          <Input
            onChange={e => setMessage(e.target.value)}
            placeholder='Write a message'
          />
        </st.TextTypeContainer>
      )}
    </st.MainTypeZoneContainer>
  );
};
