import styled from 'styled-components';

export const Messages = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;
