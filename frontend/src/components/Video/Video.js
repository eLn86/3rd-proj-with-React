import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Peer from 'peerjs';
// Import Socket API
import { socket } from '../../API/socket';

import './Video.css';

// Import components

export class Video extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.peerIndex = 0;

    this.state = {
      peers: [],
      streamList: [],
      video: {},
      streamReady: false
    }

    // Compatability
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  }

  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {
    const video = document.querySelector('.local'); // for my own stream
    const testee = document.querySelector('.peer1'); // for peer stream

    // HTML element array: [screen2, screen3, screen4]
    const peerScreens = document.querySelectorAll('.peer');

    /*
    * CONSTRAINTS: specify type of media to request
    * properties can either be boolean or be objects for more specificity
    * e.g. mandatory or optional, width, height, quality etc.
    */
    const constraints = {
      audio: false,
      video: {
          width: 300,
          height: 300
      }
    }

    this.updateStreamList = () => {

      const streamList = this.state.peers.filter((peerUser) => {
        return peerUser.peerID !== peer.id;
      })

      this.setState({
        streamList: streamList
      })
    }

    // Init Peer Object
    var peer = new Peer({key: 'z2urygfkdibe29'});

    peer.on('open', (id) => {
      socket.emit('add peer', id);
    });

    // Peers Received
    socket.on('get peers', (peers) => {

      this.setState({
        peers: peers
      })

      this.updateStreamList();

      // if video is ready, send out to each available peer
      if (this.state.streamReady) {
        console.log('my video stream to be sent out: ', this.state.video);

        this.state.streamList.forEach((peerUser) => {
          let call = peer.call(peerUser.peerID, this.state.video);
        })
      }

      peer.on('call', (remoteCall) => {
        remoteCall.answer(this.state.video);

        remoteCall.on('stream', (remoteStream) => {
          // Show stream in some video/canvas element.
          console.log('this is the other stream', remoteStream);
          testee.srcObject = remoteStream;
        });
      })

    }) // end of socket on get peers 

      // success: if video received, append to html element
      this.handleSuccess = (stream) => {
        video.srcObject = stream;

        this.setState({
          video: stream,
          streamReady: true
        })
      }
      // failure: if video failed, log error
      this.handleError = (error) => {
          throw error.name;
      }

      // Get User Media (this has to be put below the this.handleSuccess and this.handleError)
      navigator.mediaDevices.getUserMedia(constraints)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

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
      // });


  renderPeersList = () => {

    return this.state.peers.map((el) => {
      return (
        <div className="peerDiv"
             key={this.peerIndex++}>
            <div className="col-md-3 peerName">
              <ul>
                <li>Peer Name: {el.name}</li>
                <li>Peer ID: {el.peerID}</li>
              </ul>
            </div>
        </div>
      )
    })
  }


  render() {

    return (
      <div className="container-fluid">
        <div className="row peerRow">
          {this.renderPeersList()}
        </div>

        <div className="row peerFirstRow">
          <div className="col-md-6 self">
            <video className="local" autoPlay='true'/>
          </div>
          <div className="col-md-6 peer1div">
            <video className="peer peer1" autoPlay='true'/>
          </div>
          <div className="col-md-6 peer2div">
            <video className="peer peer2" autoPlay='true'/>
          </div>
          <div className="col-md-6 peer3div">
            <video className="peer peer3" autoPlay='true'/>
          </div>
        </div>
      </div>
    );
  }
}

// grab current preferences from redux state
const mapStateToProps = (state) => {
  return {}
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
