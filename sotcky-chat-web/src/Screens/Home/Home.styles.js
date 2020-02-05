import styled from 'styled-components';

export const MainHomeContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-row-gap: 1em;
`;

export const SignOutButton = styled.div`
  grid-column: 11/12;
  grid-row: 1/2;
  width: 100%;
  padding: 0.5em;
  background: orange;
  color: white;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-top: 0.4em;
  cursor: pointer;
`;
