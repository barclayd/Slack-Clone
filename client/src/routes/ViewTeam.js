import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
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
  // check if logged in user has any teams
  if (!allTeams.length) {
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

  const identifySelected = (item, arr) => (parseInt(item, 10)
    ? arr.filter(a => parseInt(a.id, 10) === parseInt(item, 10))[0]
    : arr[0]);

  const team = identifySelected(teamId, allTeams);
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
        allTeams={allTeams}
        team={team}
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name[0].toUpperCase(),
        }))}
      />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
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
