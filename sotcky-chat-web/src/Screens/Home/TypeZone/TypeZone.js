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
  const [LocalUserId] = useState(parseInt(localStorage.getItem('userId')));

  const [Message, setMessage] = useState('');
  const ENTER_KEYWORD = 13;

  useEffect(() => {
    if (props.messages) {
      setMessageList(props.messages);
    } else {
      setMessageList([]);
    }
    console.log('USER ID => ', LocalUserId);
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
        <st.Name> {SelectedChatRoom.name || ''} </st.Name>
      </st.TitleBar>

      <st.MessagesContainer>
        {MessageList.map((message, index) =>
          message.error ? (
            <st.SingleMessage key={index} self={true}>
              <st.MessageText self={true}>{message.message}</st.MessageText>
            </st.SingleMessage>
          ) : (
            <st.SingleMessage
              key={index}
              self={message.owner === LocalUserId ? true : false}
            >
              <st.MessageUserName
                self={message.owner === LocalUserId ? true : false}
              >
                {message.account.name}
              </st.MessageUserName>
              <st.MessageText
                self={message.owner === LocalUserId ? true : false}
              >
                {message.message}
              </st.MessageText>
            </st.SingleMessage>
          )
        )}
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
