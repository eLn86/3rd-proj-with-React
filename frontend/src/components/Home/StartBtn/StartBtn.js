import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Peer from 'peerjs';

// Import Static files
import './StartBtn.css';

<<<<<<< HEAD
=======

>>>>>>> 3af6467d16fab661368fb05cebd3ddc2f45355f8
// Import API
import { getUser } from '../../../API/userAPI';

// Import Actions
import { addPeerIdToUser } from '../../../actions/userActions';

// Import Socket Client
import {socket} from '../../../API/socket';
<<<<<<< HEAD
=======

>>>>>>> 3af6467d16fab661368fb05cebd3ddc2f45355f8

/**
 * Login
 */
export class StartBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.state = {
    }
  }

<<<<<<< HEAD
=======

>>>>>>> 3af6467d16fab661368fb05cebd3ddc2f45355f8
  onClick = (e) => {
    socket.emit('join room', 'coffee');
  };

  componentDidMount() {
    socket.on('get roomInfo', (roomName) => {
      window.location.href = '/room/' + roomName;
    })
  }

<<<<<<< HEAD
=======

>>>>>>> 3af6467d16fab661368fb05cebd3ddc2f45355f8
  render() {

    return (

        <div className="container-fluid startButton">
          <button type="button"
                  className="btn btn-danger startButton"
                  onClick={this.onClick}>
                  Start Button
          </button>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
    return {
      users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPeerIdToUser: (peerId) => {
        dispatch(addPeerIdToUser(peerId))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartBtn);
