import styled from 'styled-components';

export const MainChatRoomsContainer = styled.div`
  grid-column: 2/5;
  grid-row: 2/12;
  background: rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: scroll;
`;

export const TitleBar = styled.div`
  padding: 1em;
  background: #323232;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const SearchChatRoom = styled.div`
  width: 100%;
  padding: 1em;
`;

export const Sparator = styled.hr`
  width: 90%;
  background: rgba(0, 0, 0, 0.2);
  margin: 1em 0;
`;

export const CreateNewRoomButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 8%;
`;

export const CreateNewRoomButton = styled.div`
  width: 20%;
  height: 2rem;
  background: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  padding: 1em;
  position: fixed;

  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export const ChatRoomsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5em;
`;
