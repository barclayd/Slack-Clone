import React from 'react';
import {
  Messages,
  Layout,
} from '../components/MainLayout';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';


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
    <Header channelName="general" />
    <Messages>
      <ul>
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </Layout>
);
