import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Layout } from '../components/MainLayout';
import Sidebar from '../containers/Sidebar';
import Header from '../components/Header';
import DirectMessageContainer from '../containers/DirectMessageContainer';
import SendMessage from '../components/SendMessage';
import { meQuery } from '../graphql/team';
import { createDirectMessageMutation } from '../graphql/message';

const ViewTeam = ({
  mutate,
  data: { loading, me },
  match: {
    params: { teamId, userId },
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
  // check if channelId in query string in an integer

  const identifySelected = (item, arr) =>
    (parseInt(item, 10)
      ? arr.filter(a => parseInt(a.id, 10) === parseInt(item, 10))[0]
      : arr[0]);

  const team = identifySelected(teamId, teams);
  // check if teamId in query string in valid
  if (!team) {
    return <Redirect to="/view-team" />;
  }

  const sendMessage = async (text) => {
    await mutate({
      variables: {
        text,
        receiverId: parseInt(userId, 10),
        teamId: parseInt(teamId, 10),
      },
    });
  };

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
      <Header channelName={"Someone's user name"} />
      <DirectMessageContainer
        teamId={parseInt(teamId, 10)}
        userId={parseInt(userId, 10)}
      />
      <SendMessage onSubmit={sendMessage} placeholder={userId} />
    </Layout>
  );
};

export default compose(
  graphql(meQuery, {
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(createDirectMessageMutation),
)(ViewTeam);
