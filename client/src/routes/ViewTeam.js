import React from 'react';
import { Messages, Layout } from '../components/MainLayout';
import Sidebar from '../containers/Sidebar';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';

const ViewTeam = ({ match: { params } }) => (
  <Layout>
    <Sidebar currentTeamId={params.teamId} />
    <Header channelName={params.channelId} />
    <Messages>
      <ul>
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName={params.channelId} />
  </Layout>
);

export default ViewTeam;
