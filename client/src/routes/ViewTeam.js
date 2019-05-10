import React from 'react';
import {
  Teams,
  Channels,
  Header,
  Input,
  Messages,
  Layout,
} from '../components/MainLayout';

export default () => (
  <Layout className="app-layout">
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
  </Layout>
);
