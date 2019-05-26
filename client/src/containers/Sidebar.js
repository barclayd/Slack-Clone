import React, { Component } from 'react';
import decode from 'jwt-decode';
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
      teams, team,
    } = this.props;

    const { modalVisible } = this.state;

    const { handleAddChannelClick } = this;

    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      ({ username } = user.username);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    return (
      <>
        <Teams
          teams={teams}
        />
        <Channels
          teamName={team.name}
          username={username}
          channels={team.channels}
          teamId={team.id}
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

export default Sidebar;
