import React from 'react';
import {
  Header,
  Input,
  Messages,
  Layout,
} from '../components/MainLayout';
import Teams from '../components/Teams';
import Channels from '../components/Channels';

export default () => (
  <Layout>
    <Teams
      teams={[{ id: 1, letter: 'D' }, { id: 2, letter: 'B' }]}
    />
    <Channels
      teamName="TeamName"
      username="Username"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'slackbot' }, { id: 1, name: 'Bob' }]}
    />
    <Header className="header">Header</Header>
    <Messages className="messages">
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <Input />
  </Layout>
);
