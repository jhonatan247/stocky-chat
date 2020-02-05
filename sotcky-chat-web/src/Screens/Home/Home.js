import React, { useEffect, Component, useContext } from 'react';
import * as st from './Home.styles';
import { ChatRooms } from './ChatRooms/ChatRooms';
import { TypeZone } from './TypeZone/TypeZone';
import { navigate } from '@reach/router';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      chatRooms: [],
      messages: [],
      socketURL: 'http://localhost:3001/',
      chatRoomsURL: 'http://localhost:3000/api/chat-rooms/',
      response: false,
      globalState: {},
      token: null,
      previousSelectedChatRoomIds: [],
      selectedChatRoom: {},
      socket: null
    };
  }
  async componentDidMount() {
    const token = this.verifySessionAndGetToken();
    await this.getFirstChatRooms(token);

    const { socketURL } = this.state;
    const socket = socketIOClient(socketURL);
    socket.on('chat-room-created', data => {
      if (data.success) {
        this.state.chatRooms.push(data);
        this.setState({ chatRooms: this.state.chatRooms });
      }
    });

    this.setState({ socket });
  }
  verifySessionAndGetToken() {
    let authorization = localStorage.getItem('authorization');
    console.log(authorization);
    if (!authorization || authorization == '') {
      setTimeout(() => {
        navigate('/login');
      }, 0);
    }
    this.setState({ token: authorization });
    return authorization;
  }
  async getFirstChatRooms(token) {
    const {
      data: { chatRooms }
    } = await Axios({
      method: 'get',
      url: this.state.chatRoomsURL,
      headers: {
        Authorization: token
      }
    });
    this.setState({ chatRooms });
  }

  CloseCurrentSession() {
    localStorage.removeItem('authorization');
    navigate('/login');
  }
  onSelelectChatRoom(chatRoom) {
    const isAlreadySelected = false;
    this.state.previousSelectedChatRoomIds.forEach(id => {
      if (id == chatRoom.id) {
        isAlreadySelected = true;
      }
    });
    if (!isAlreadySelected) {
      const self = this;
      this.state.socket.on(`message-sended-to-${chatRoom.id}`, data => {
        if (data.success && data.chatRoom == self.state.selectedChatRoom.id) {
          this.state.messages.push(data);
          this.setState({ messages: this.state.messages });
        }
      });
    }
    this.setState({ selectedChatRoom: chatRoom });
    this.GetMessageList(chatRoom);
  }
  onSendMessage(message) {
    this.state.socket.emit('send-message', {
      token: this.state.token,
      message: message,
      chatRoomId: this.state.selectedChatRoom.id
    });
  }

  async GetMessageList(selectedChatRoom) {
    const {
      data: { messages }
    } = await Axios({
      method: 'get',
      url: this.state.chatRoomsURL + selectedChatRoom.id,
      headers: {
        Authorization: this.state.token
      }
    });
    this.setState({ messages });
  }

  render() {
    console.log(this.state);
    const { chatRooms, messages, selectedChatRoom } = this.state;
    return (
      <st.MainHomeContainer>
        <st.SignOutButton onClick={() => this.CloseCurrentSession()}>
          {' '}
          SignOut{' '}
        </st.SignOutButton>
        <ChatRooms
          chatRooms={chatRooms}
          onCreateChatRoom={name => {
            alert(name);
            this.state.socket.emit('create-chat-room', {
              token: this.state.token,
              name: name
            });
          }}
          onSelelectChatRoom={item => this.onSelelectChatRoom(item)}
        />
        <TypeZone
          messages={messages}
          selectedChatRoom={selectedChatRoom}
          onSendMessage={message => this.onSendMessage(message)}
        />
      </st.MainHomeContainer>
    );
  }
}
