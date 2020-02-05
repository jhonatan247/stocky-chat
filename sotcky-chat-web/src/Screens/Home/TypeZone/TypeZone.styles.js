import styled from 'styled-components';

export const MainTypeZoneContainer = styled.div`
  grid-column: 5/12;
  grid-row: 2/12;
  background: rgba(0, 0, 0, 0.4);
  position: relative;
`;

export const TitleBar = styled.div`
  height: 3.45em;
  background: #323232;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
`;

export const Name = styled.p`
  margin: 0 0 0 2em;
`;

export const TextTypeContainer = styled.div`
  width: 100%;
  padding: 1em;
  position: absolute;
  bottom: 0;
`;

export const MessagesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 78%;
  top: 12%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  padding: 2em;
  box-sizing: border-box;
`;

export const SingleMessage = styled.div`
  background: ${props => (!props.self ? 'white' : 'orange')};
  color: #323232;
  width: fit-content;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-self: ${props => (!props.self ? 'flex-start' : 'flex-end')};
  margin-bottom: 1em;
  border-radius: 5px;
  padding: 0.5em;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.3);
`;

export const MessageUserName = styled.p`
  margin: 0;
  color: ${props => (!props.self ? '#808080' : 'white')};
`;

export const MessageText = styled.p`
  color: ${props => (!props.self ? '#323232' : 'white')};
  margin: 0.5em 0 0 0;
`;
