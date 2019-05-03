import React from 'react';
import { Grid } from 'semantic-ui-react';

import TeamSidebar from '../components/TeamSidebar';
import TeamHeader from '../components/TeamHeader';
import MessageInput from '../components/MessageInput';

export default () => (
  <>
    <Grid>
      <Grid.Column width={5}>
        <TeamSidebar
          teamName="Team Cardiff"
          userName="Dan"
          channelNames={['General', 'Random']}
          usersToDirectMessage={['Slackbot', 'Dan', 'Kingsley']}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        <TeamHeader />
        <MessageInput />
      </Grid.Column>
    </Grid>
  </>
);
