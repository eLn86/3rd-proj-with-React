import { addRoom } from '../../actions/socketActions';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
    }

  }

  componentDidMount() {
    // get room name from redux store

    const roomName = this.props.rooms;
    // re-join room chat channel after redirecting.
    socket.emit('join room channel', roomName)
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
    roomName: state.rooms
  }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    addRoom: (roomName) => {
        dispatch(addRoom(roomName))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
