import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import decode from 'jwt-decode';
import { allTeamsQuery } from '../graphql/team';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import AddChannelModal from '../components/AddChannelModal';

class Sidebar extends Component {
  state = {
    modalVisible: false,
  };

  handleAddChannelClick = () => {
    this.setState(prevState => ({
      ...prevState,
      modalVisible: !prevState.modalVisible,
    }));
  };

  render() {
    const {
      // eslint-disable-next-line no-shadow
      data: { loading, allTeams },
      currentTeamId,
    } = this.props;

    const { modalVisible } = this.state;

    const { handleAddChannelClick } = this;

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
          onAddChannelClick={handleAddChannelClick}
        />
        <AddChannelModal
          teamId={parseInt(team.id, 10)}
          toggle={handleAddChannelClick}
          open={modalVisible}
          key="sidebar-add-channel-modal"
        />
      </>
    );
  }
}

export default graphql(allTeamsQuery)(Sidebar);
