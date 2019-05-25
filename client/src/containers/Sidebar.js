import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import decode from 'jwt-decode';
import Teams from '../components/Teams';
import Channels from '../components/Channels';

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) {
    return null;
  }

  const team = currentTeamId
    ? allTeams.filter(t => t.id === parseInt(currentTeamId, 10))[0]
    : allTeams[0];

  let username = '';
  try {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    ({ username } = user.username);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  return loading ? null : (
    <>
      <Teams
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name[0].toUpperCase(),
        }))}
      />
      <Channels
        teamName={team.name}
        username={username}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 1, name: 'Bob' }]}
      />
    </>
  );
};

const allTeams = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeams)(Sidebar);
