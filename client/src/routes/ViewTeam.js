import React from 'react';
import { graphql } from 'react-apollo';
import { Messages, Layout } from '../components/MainLayout';
import Sidebar from '../containers/Sidebar';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import { allTeamsQuery } from '../graphql/team';

const ViewTeam = ({
  data: { loading, allTeams },
  match: {
    params: { teamId, channelId },
  },
}) => {
  if (loading) {
    return null;
  }

  const team = !!teamId
    ? allTeams.filter(t => t.id === parseInt(teamId, 10))[0]
    : allTeams[0];

  const channel = !!channelId
    ? team.channels.filter(c => parseInt(c.id, 10) === parseInt(channelId, 10))[0]
    : team.channels[0];

  return (
    <Layout>
      <Sidebar
        allTeams={allTeams}
        team={team}
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name[0].toUpperCase(),
        }))}
      />
      <Header channelName={channel.name} />
      <Messages>
        <ul>
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </Layout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
