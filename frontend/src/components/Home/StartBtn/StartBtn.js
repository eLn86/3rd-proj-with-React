import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Static files
import './StartBtn.css';


// Import API
import { getUser } from '../../../API/userAPI';

// Import Actions
import { addPeerIdToUser } from '../../../actions/userActions';
import { addRoom } from '../../../actions/socketActions';

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



  onClick = (e) => {
    // Fire the latest preference to Socket in backend.
    socket.emit('join room', 'coffee');
    // Fire the latest preference to MongoDB in backend.
    /* need code here */
  };

  componentDidMount() {
    socket.on('get roomInfo', (roomName) => {
      // need to store roomName into redux.
      this.props.storeRoomName(roomName);
      // Redirection
      window.location.href = '/room/' + roomName;
    })
  }


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
      roomName: state.rooms
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPeerIdToUser: (peerId) => {
        dispatch(addPeerIdToUser(peerId))
      },
    storeRoomName: (roonName) => {
      dispatch(addRoom(roonName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartBtn);
