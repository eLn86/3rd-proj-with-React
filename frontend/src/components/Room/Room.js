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
    const roomName = this.props.roomName;
    // re-join room chat channel after redirecting.
    socket.emit('join room channel', roomName);


//   const video = document.querySelector('video');
//   const toggle = document.querySelector('.togglebtn');

//   /*
//   * CONSTRAINTS: specify type of media to request
//   * properties can either be boolean or be objects for more specificity
//   * e.g. mandatory or optional, width, height, quality etc.
//   */
//   const constraints = {
//     audio: false,
//     video: {
//         frameRate: {
//           max: 10
//         }
//     }
//   }

//   // success: if video received, append to html element
//   this.handleSuccess = (stream) => {
//     window.stream = stream;
//     video.srcObject = stream;
//   }

//   // failure: if video failed, log error
//   this.handleError = (error) => {
//     throw error.name;
//   }

//   // Get User Media
//   navigator.mediaDevices.getUserMedia(constraints)
//   .then(this.handleSuccess)
//   .catch(this.handleError);

  // // TOGGLE play and pause
  // toggle.addEventListener('click', () => {
  //   if (toggle.dataset.toggle === 'on') {
  //     // Pause the video
  //     video.pause();
  //     window.stream.getVideoTracks()[0].enabled = false;
  //     toggle.dataset.toggle = 'off'
  //   } else {
  //     // play the video
  //     video.play();
  //     window.stream.getVideoTracks()[0].enabled = true;
  //     toggle.dataset.toggle = 'on';
  //   }


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
