import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import components

// Import static files

// Import Socket Client

export class Test extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }



  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {

  const video = document.querySelector('video');
  const toggle = document.querySelector('.togglebtn');

  /*
  * CONSTRAINTS: specify type of media to request
  * properties can either be boolean or be objects for more specificity
  * e.g. mandatory or optional, width, height, quality etc.
  */
  const constraints = {
    audio: false,
    video: {
        frameRate: {
          max: 10
        }
    }
  }

  // success: if video received, append to html element
  this.handleSuccess = (stream) => {
    window.stream = stream;
    video.srcObject = stream;
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

  render() {

    return (
      <div className="container-fluid">
        <video id="gum-local" autoplay=''/>
      </div>
    );
  }
}

// grab current preferences from redux state
const mapStateToProps = (state) => {
    return {
  }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
