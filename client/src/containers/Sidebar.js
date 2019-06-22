import React, { Component } from 'react';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import AddChannelModal from '../components/AddChannelModal';
import AddPeopleModal from '../components/AddPeopleModal';
import DirectMessageModal from '../components/DirectMessageModal';

class Sidebar extends Component {
  state = {
    addChannelModalVisible: false,
    addPeopleModalVisible: false,
    openDirectMessageModal: false,
  };

  handleAddChannelClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      ...prevState,
      addChannelModalVisible: !prevState.addChannelModalVisible,
    }));
  };

  handleDirectMessageClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      ...prevState,
      openDirectMessageModal: !prevState.openDirectMessageModal,
    }));
  };

  handleAddUsersClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      ...prevState,
      addPeopleModalVisible: !prevState.addPeopleModalVisible,
    }));
  };

  render() {
    const { teams, team, username } = this.props;

    const {
      addChannelModalVisible,
      addPeopleModalVisible,
      openDirectMessageModal,
    } = this.state;

    const {
      handleAddChannelClick,
      handleAddUsersClick,
      handleDirectMessageClick,
    } = this;

    return (
      <>
        <Teams teams={teams} />
        <Channels
          teamName={team.name}
          username={username}
          isOwner={team.admin}
          channels={team.channels}
          owner={team.admin}
          teamId={team.id}
          users={[{ id: 1, name: 'slackbot' }, { id: 1, name: 'Bob' }]}
          onAddChannelClick={handleAddChannelClick}
          onAddUsersClick={handleAddUsersClick}
          onDirectMessageClick={handleDirectMessageClick}
        />
        <AddChannelModal
          teamId={parseInt(team.id, 10)}
          toggle={handleAddChannelClick}
          open={addChannelModalVisible}
          key="sidebar-add-channel-modal"
        />
        <DirectMessageModal
          teamId={parseInt(team.id, 10)}
          toggle={handleDirectMessageClick}
          open={openDirectMessageModal}
          key="sidebar-direct-message-modal"
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
