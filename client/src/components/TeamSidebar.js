import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';

const TeamSidebar = ({
  teamName,
  userName,
  channelNames,
  usersToDirectMessage,
}) => (
  <Grid>
    <GridColumn style={{ backgroundColor: '#4e3a4c', color: '#fff' }}>
      <Grid.Row>
        <h4>{teamName}</h4>
        <h4>{userName}</h4>
      </Grid.Row>
      <Grid.Row>
        <h2>Channels</h2>
        {channelNames.map(channel => (
          <h4>{channel}</h4>
        ))}
      </Grid.Row>
      <Grid.Row>
        <h2>Direct Messages</h2>
        {usersToDirectMessage.map(person => (
          <h4>{person}</h4>
        ))}
      </Grid.Row>
    </GridColumn>
  </Grid>
);

export default TeamSidebar;
