import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const paddingLeft = 'padding-left: 10px';

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarHeaderList = styled.li`
  ${paddingLeft}
`;

const channel = ({ id, name }) => (
  <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>
);

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>•</Green> : 'o');

const PushLeft = styled.div`
  ${paddingLeft};
`;

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id + name}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

export default ({ teamName, username, channels, users, onAddChannelClick }) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarHeaderList>
          Channels <Icon onClick={onAddChannelClick} name="add circle" />
        </SideBarHeaderList>
        {channels.map(channel)}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarHeaderList>Direct Messages</SideBarHeaderList>
        {users.map(user)}
      </SideBarList>
    </div>
  </ChannelWrapper>
);
