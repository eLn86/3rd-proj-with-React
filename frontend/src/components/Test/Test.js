import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Peer from 'peerjs';

// Import components

// Import Socket Client

export class Test extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.state = {
      localStream: {}
    }
  }



  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {
    console.log('this is the peer', this.props.peer);
    const peer = this.props.peer;
    //this.sendStreams();

    // each time peer receives a call, answer the call, and stream the video
    // peer.on('call', (call) => {
    //   // Answer the call, providing our mediaStream
    //   call.answer(this.state.localStream);
    //
    //   call.on('stream', (stream) => {
    //     testee.srcObject = stream;
    //   });

    //});

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

  // sendStreams = () => {
  //   const streamList = ['n2yotocb84obt9', 'uc0r4ssbd7mygb9'];
  //   const peer = this.props.peer;
  //
  //   streamList.forEach((id) => {
  //     // send localStream to each available peer in room
  //     var outCall = peer.call(id, this.state.localStream);
  //
  //   })
  //
  // }

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
