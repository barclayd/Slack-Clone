import React, { Component } from 'react';
import decode from 'jwt-decode';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import AddChannelModal from '../components/AddChannelModal';
import AddPeopleModal from '../components/AddPeopleModal';

class Sidebar extends Component {
  state = {
    addChannelModalVisible: false,
    addPeopleModalVisible: false,
  };

  handleAddChannelClick = () => {
    this.setState(prevState => ({
      ...prevState,
      addChannelModalVisible: !prevState.addChannelModalVisible,
    }));
  };

  handleAddUsersClick = () => {
    this.setState(prevState => ({
      ...prevState,
      addPeopleModalVisible: !prevState.addPeopleModalVisible,
    }));
  };

  render() {
    const {
      teams, team,
    } = this.props;

    const { addChannelModalVisible, addPeopleModalVisible } = this.state;

    const { handleAddChannelClick, handleAddUsersClick } = this;

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
          onAddUsersClick={handleAddUsersClick}
        />
        <AddChannelModal
          teamId={parseInt(team.id, 10)}
          toggle={handleAddChannelClick}
          open={addChannelModalVisible}
          key="sidebar-add-channel-modal"
        />
        <AddPeopleModal
          teamId={parseInt(team.id, 10)}
          toggle={handleAddUsersClick}
          open={addPeopleModalVisible}
          key="sidebar-add-people-modal"
        />
      </>
    );
  }
}

export default Sidebar;
