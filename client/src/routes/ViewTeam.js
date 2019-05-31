import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Layout } from '../components/MainLayout';
import Sidebar from '../containers/Sidebar';
import Header from '../components/Header';
import MessageContainer from '../containers/MessageContainer';
import SendMessage from '../components/SendMessage';
import { meQuery } from '../graphql/team';

const ViewTeam = ({
  data: { loading, me },
  match: {
    params: { teamId, channelId },
  },
}) => {
  if (loading) {
    return null;
  }

  const { username, teams } = me;

  // check if logged in user has any teams
  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  // check if teamId in query string in an integer
  if (!parseInt(teamId, 10) && teamId) {
    return <Redirect to="/view-team" />;
  }
  // check if channeldId in query string in an integer
  if (!parseInt(channelId, 10) && channelId) {
    return <Redirect to={`/view-team/${teamId}`} />;
  }

  const identifySelected = (item, arr) =>
    (parseInt(item, 10)
      ? arr.filter(a => parseInt(a.id, 10) === parseInt(item, 10))[0]
      : arr[0]);

  const team = identifySelected(teamId, teams);
  // check if teamId in query string in valid
  if (!team) {
    return <Redirect to="/view-team" />;
  }
  const channel = identifySelected(channelId, team.channels);
  // check if channel in query string in valid
  if (!channel) {
    return <Redirect to={`/view-team/${teamId}`} />;
  }
  return (
    <Layout>
      <Sidebar
        allTeams={teams}
        team={team}
        username={username}
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name[0].toUpperCase(),
        }))}
      />
      <Header channelName={channel.name} />
      <MessageContainer channelId={parseInt(channel.id, 10)} />
      <SendMessage
        channelName={channel.name}
        channelId={parseInt(channel.id, 10)}
      />
    </Layout>
  );
};

export default graphql(meQuery, {
  options: {
    fetchPolicy: 'network-only',
  },
})(ViewTeam);
