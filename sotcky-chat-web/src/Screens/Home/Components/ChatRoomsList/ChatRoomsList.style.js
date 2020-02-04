import styled from 'styled-components';

export const ListItemContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  padding: 1em;
  color: #323232;
  box-shadow: inset 0 -1px 0 0 gray;
  transition: ease 250ms;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const Name = styled.p`
  color: #323232;
  margin: 0 0 0 3em;
`;
