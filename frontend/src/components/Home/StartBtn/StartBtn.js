import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Peer from 'peerjs';

// Import Static files
import './StartBtn.css';

// Import API
import { getUser } from '../../../API/userAPI';

// Import Actions
import { addPeerIdToUser } from '../../../actions/userActions';

// Import Socket Client
import {socket} from '../../../API/socket';

/**
 * Login
 */
export class StartBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.state = {
    }
  }

  // When start button is clicked, this function is triggered
  /*
  ** Function: createPeer()
  ** Parameters: None
  ** Purpose: Create a new peer and emit the peer id to socket in the backend
  */
  createPeer = () => {
    console.log(this.props.users);
    // var peer = new Peer({key: 'z2urygfkdibe29'});

    // peer.on('open', function(id) {
    //     socket.emit('add peer', id);
    //     this.props.addPeerIdToUser(this.props.user.id, id);
    //   });

  }
  
  render() {

    return (

        <div className="container-fluid startButton">
          <button type="button"
                  className="btn btn-danger startButton"
                  onClick={this.createPeer}>Start Button</button>
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
