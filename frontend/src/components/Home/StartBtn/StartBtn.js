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

import axios from 'axios';


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

    socket.emit('join room', this.props.preferences);
    socket.emit('getIDFromSocket');
  }


  componentDidMount() {
    socket.on('get roomInfo', (roomName) => {
      // need to store roomName into redux.
      this.props.storeRoomName(roomName);
      // Redirection
      window.location.href = '/room/' + roomName;
    })

    // get id and update preferences in backend
    socket.on('getID', (id) => {
      axios.put('/user', {
        id: id,
        preferences: this.props.preferences
      })
        .then( (response) => {
          console.log('successful post', response);
        })
        .catch((error)=> {
          throw error;
       });
    });
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
      roomName: state.rooms,
      preferences: state.preferences
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
