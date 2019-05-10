import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
  color: #958993;
  margin: 20px;
`;

export default ({ channelName }) => (
  <HeaderWrapper>
    <Header textAlign="center">
      #
      {channelName}
    </Header>
  </HeaderWrapper>
);
