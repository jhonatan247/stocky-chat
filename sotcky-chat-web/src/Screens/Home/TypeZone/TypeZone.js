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

  useEffect(() => {
    state.room.id &&
      GetMessageList().then(res => {
        console.log(res.data.messages);
        setMessageList(res.data.messages);
      });
  }, [state.room.id]);

  useEffect(() => {
    if (state.room.id) {
      alert('HEHEHE');
      let socket = socketIOClient(endpoint_socket);
      setLocalSocket(socket);
      socket.on('pepe', data => {
        alert('ACTUALIZANDO');
        GetNewItem(data);
      });
    }
  }, [MessageList]);

  const GetNewItem = () => {
    console.log('HHHHHHHH');
    GetMessageList().then(res => {
      console.log('AFTER SUBSCRIBE => ', res.data);
      setMessageList(res.data.messages);
    });
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

  const SendMessage = () => {
    setMessage('');
    localSocket.emit('send-message', {
      token: state.token,
      message: Message,
      chatRoomId: state.room.id
    });
  };

  return (
    <st.MainTypeZoneContainer>
      <st.TitleBar>
        <st.Name> {state.room.name || ''} </st.Name>
      </st.TitleBar>

      <st.MessagesContainer>
        {MessageList.map((message, index) => (
          <st.SingleMessage
            key={index}
            self={message.owner === state.room.id ? true : false}
          >
            <st.MessageUserName>{message.account.name}</st.MessageUserName>
            <st.MessageText>{message.message}</st.MessageText>
          </st.SingleMessage>
        ))}
      </st.MessagesContainer>

      {state.room.name && (
        <st.TextTypeContainer onKeyDown={e => CheckSend(e.keyCode)}>
          <Input
            value={Message}
            onChange={e => setMessage(e.target.value)}
            placeholder='Write a message'
          />
        </st.TextTypeContainer>
      )}
    </st.MainTypeZoneContainer>
  );
};
