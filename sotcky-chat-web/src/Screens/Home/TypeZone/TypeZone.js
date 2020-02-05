import React, { useState, useContext, useEffect } from 'react';
import Context from '../../../GlobalState/Context';
import * as st from './TypeZone.styles';
import { Input } from 'antd';
import Axios from 'axios';
import socketIOClient from 'socket.io-client';

export const TypeZone = props => {
  const { state } = useContext(Context);
  const [MessageList, setMessageList] = useState([]);
  const [SelectedChatRoom, setSelectedChatRoom] = useState([]);

  const [Message, setMessage] = useState('');
  const ENTER_KEYWORD = 13;

  useEffect(() => {
    if (props.messages) {
      setMessageList(props.messages);
    } else {
      setMessageList([]);
    }
  }, [props.messages]);

  useEffect(() => {
    if (props.selectedChatRoom) {
      setSelectedChatRoom(props.selectedChatRoom);
    } else {
      setSelectedChatRoom({});
    }
  }, [props.messages]);

  const CheckSend = id => id === ENTER_KEYWORD && SendMessage();

  const SendMessage = () => {
    setMessage('');
    props.onSendMessage(Message);
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
            self={message.owner === SelectedChatRoom.id ? true : false}
          >
            <st.MessageUserName>{message.account.name}</st.MessageUserName>
            <st.MessageText>{message.message}</st.MessageText>
          </st.SingleMessage>
        ))}
      </st.MessagesContainer>

      {SelectedChatRoom && SelectedChatRoom.name && (
        <st.TextTypeContainer onKeyDown={e => CheckSend(e.keyCode)}>
          <Input
            value={Message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write a message"
          />
        </st.TextTypeContainer>
      )}
    </st.MainTypeZoneContainer>
  );
};
