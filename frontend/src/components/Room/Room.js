import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Peer from 'peerjs';

// Import components
import Header from '../Partials/Header/Header';
import Chat from './Chat/Chat';

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

  // When start button is clicked, this function is triggered
  /*
  ** Function: createPeer()
  ** Parameters: None
  ** Purpose: Create a new peer and emit the peer id to socket in the backend
  */
  createPeer = () => {

        var peer = new Peer({key: 'z2urygfkdibe29'});

        peer.on('open', function(id) {
            socket.emit('add peer', id);
          });

    }

  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {

      this.createPeer();
      socket.on('get peers', (currentUser, peersIdList) => {
        console.log('Current User: ', currentUser);
        console.log('Peers ID Array: ', peersIdList);
      })

  }


  render() {

    return (
      <div className="container-fluid">
        <Header/>
        <div className="row roomBody">
          <div className="col-md-2 leftCol">
            <ul className="userList">
              <li> username </li>
              <li> username </li>
              <li> username </li>
              <li> username </li>
              <li> username </li>
              <li> username </li>
            </ul>
          </div>
          <div className="col-md-7 midCol">

          {/* Top row with 2 video panes */}
            <div className="row videoTopRow">
              <div className="col-md-6 topLeftCol">
                <div className="topLeftVideoPane">
                </div>
              </div>
              <div className="col-md-6 topRightCol">
                <div className="topRightVideoPane">
                </div>
              </div>
            </div>

            {/* Bottom row with 2 video panes */}
            <div className="row videoBottomRow">
              <div className="col-md-6 bottomLeftCol">
                <div className="bottomRightVideoPane">
                </div>
              </div>
              <div className="col-md-6 bottomRightCol">
                <div className="bottomRightVideoPane">
                </div>
              </div>
            </div>
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
      users: state.users
    }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
