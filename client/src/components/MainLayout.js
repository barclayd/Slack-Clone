import styled from 'styled-components';

export const Header = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

export const Input = styled.input`
  grid-column: 3;
  grid-row: 3;
`;

export const Channels = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
`;

export const Messages = styled.div`
  grid-column: 3;
  grid-row: 2;
`;

export const Teams = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362333;
`;

export const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;
