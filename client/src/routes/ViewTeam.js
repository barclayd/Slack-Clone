import React from 'react';

import Channels from '../components/Channels';
import Header from '../components/Header';
import Input from '../components/Input';
import Messages from '../components/Messages';
import Teams from '../components/Teams';
import AppLayout from '../components/AppLayout';

export default () => (
  <AppLayout className="app-layout">
    <Teams className="teams">Teams</Teams>
    <Channels> Channels </Channels>
    <Header className="header">Header</Header>
    <Messages className="messages">
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <Input />
  </AppLayout>
);
