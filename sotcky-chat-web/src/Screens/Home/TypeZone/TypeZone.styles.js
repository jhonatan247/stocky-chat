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
