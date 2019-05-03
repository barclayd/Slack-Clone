import React from 'react';
import { Grid } from 'semantic-ui-react';

const TeamSidebar = ({
  teamName,
  userName,
  channelNames,
  usersToDirectMessage,
}) => (
  <Grid>
    <Grid.Row>
      {teamName}
      {userName}
    </Grid.Row>
    <Grid.Row>
      Channels
      {channelNames.map(channel => (
        <p>{channel}</p>
      ))}
    </Grid.Row>
    <Grid.Row>
      Direct Messages
      {usersToDirectMessage.map(person => (
        <p>{person}</p>
      ))}
    </Grid.Row>
  </Grid>
);

export default TeamSidebar;
