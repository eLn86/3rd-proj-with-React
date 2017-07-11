import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Peer from 'peerjs';
// Import Socket API
import { socket } from '../../API/socket';

// Import components

export class Test extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.state = {
      localStream: {}
    }
  }



  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {


    const video = document.querySelector('.local');
    const testee = document.querySelector('.peer1')

    /*
    * CONSTRAINTS: specify type of media to request
    * properties can either be boolean or be objects for more specificity
    * e.g. mandatory or optional, width, height, quality etc.
    */
    const constraints = {
      audio: false,
      video: {
        mandatory: {
          maxWidth: 640,
          maxHeight: 360
        }
      }
    }

    // success: if video received, append to html element
    this.handleSuccess = (stream) => {
      video.srcObject = stream;

      this.setState({
        localSream: stream
      })

      var peer = new Peer({key: 'z2urygfkdibe29'});
      console.log('this is the peer', peer);
      //this.props.storePeer(peer);

      peer.on('open', function(id) {
        socket.emit('add peer', id);
      });

      console.log('this is the peer', peer);

      const streamList = ['u49y1u3zmwcul3di', '0lou909xlpx2yb9'];

      streamList.forEach((id) => {
        // send localStream to each available peer in room
        console.log('sending stream to ', id);
        var outCall = peer.call(id, stream);
      })

      //each time peer receives a call, answer the call, and stream the video
      peer.on('call', (call) => {
        // Answer the call, providing our mediaStream
        call.answer(stream);

        call.on('stream', (stream) => {
          testee.srcObject = stream;
        });
      });
    }

    // failure: if video failed, log error
    this.handleError = (error) => {
      throw error.name;
    }

    // Get User Media
    navigator.mediaDevices.getUserMedia(constraints)
    .then(this.handleSuccess)
    .catch(this.handleError);

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

  sendStreams = () => {


  }

  render() {

    return (
      <div className="container-fluid">
        <div className="col-md-6">
          <video className="local" autoPlay='true'/>
        </div>
        <div className="col-md-6">
          <video className="peer1" autoPlay='true'/>
        </div>
      </div>
    );
  }
}

// grab current preferences from redux state
const mapStateToProps = (state) => {
    return {
      peer: state.peer
  }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
