import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import components
import Header from '../Partials/Header/Header';
import Chat from './Chat/Chat';
import Userlist from './Userlist/Userlist';
import Test from '../Test/Test';

// Import static files
import './Room.css';

// Import Socket Client
import {socket} from '../../API/socket';

export class Room extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.state = {
      peers: []
    }
  }



  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {
    // get room name from redux store
    console.log('hello this is the stream', window.localStream);
    const roomName = this.props.roomName;
    // re-join room chat channel after redirecting.
    socket.emit('join room channel', roomName);

    // get peer list
    socket.on('get peers', (roomUserList, peersIdList) => {
      console.log('hello the new room user list', roomUserList);
      this.setState({
        peers: roomUserList
      })
    });

  }

  render() {

    return (
      <div className="container-fluid">
        <Header/>
        <div className="row roomBody">
          <div className="col-md-2 leftCol">
            {/* UserList Grid Separated from room */}
            <Userlist/>
          </div>
          <div className="col-md-7 midCol">

            <Test/>

          </div>
          <div className="col-md-3 rightCol">
            {/* Chat Grid Separated from room */}
            <Chat/>
          </div>
        </div>

      </div>
    );
  }
}

// grab current preferences from redux state
const mapStateToProps = (state) => {
    return {
      users: state.users,
    roomName: state.rooms
  }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
