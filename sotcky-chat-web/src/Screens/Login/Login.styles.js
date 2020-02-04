import styled from 'styled-components';

export const MainLoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
`;

export const LoginBox = styled.div`
  padding: 2em;
  background: #404040;
  grid-column: 5/9;
  grid-row: 4/8;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Title = styled.h2`
  color: orange;
  display: flex;
  align-items: center;
`;

export const MarkText = styled.h4`
  color: white;
  padding: 0 0.4em;
  background: orange;
  margin: 0 0.4em;
`;

export const LoginButton = styled.div`
  background: orange;
  color: white;
  width: 30%;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  margin-top: 1em;
  box-shadow: 0 4px 6px #323232;
  cursor: pointer;
`;
