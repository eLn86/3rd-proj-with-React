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
      localStream: {},
      video: {}
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
    console.log('peer screen src object', peerScreens[0].srcObject);

    // grab user stream to cast on personal screen. for personal video, audio is off
    this.getStreamForLocal = () => {
      const constraints = {
        audio: false,
        video: {
          mandatory: {
            minAspectRatio: 1.4
          }
        }
      }

      this.handleSuccess = (stream) => {
        console.log('this is the stream', stream.getVideoTracks()[0]);
        video.srcObject = stream;
      }

      this.handleError = (error) => {
        throw error.name;
      }

      // Get User Media
      navigator.mediaDevices.getUserMedia(constraints)
      .then(this.handleSuccess)
      .catch(this.handleError);

    }

    // grab user stream for sending to peers. turn on audio
    this.getStreamForSending = () => {

      // specify video constraints
      const constraints = {
        audio: true,
        video: true
      }

      // success: if video received, append to html element
      this.handleSuccess = (stream) => {
        console.log('Other Peer ID: ', this.state.streamList);


        this.setState({
          video: stream,
          streamReady: true
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
    }


    // filter out current user from room peer list to get stream list
    this.updateStreamList = () => {
      const streamList = this.state.peers.filter((peerUser) => {
        return peerUser.peerID !== peer.id;
      })

      this.setState({
        streamList: streamList
      })
    }


    this.renderPeerVideo = (stream) => {
      for (var vid of peerScreens) {
        if (vid.srcObject === null || vid.srcObject.active === false) {
          vid.srcObject = stream;
          console.log('assigning stream');
          break;
        }
      }
    }

    this.clearPeerVideos = () => {
      for (var vid of peerScreens) {
        vid.srcObject = null;
      }
    }


    /*
    * Flow of events starts here
    */

    // Get Local Stream from Camera
    this.getStreamForLocal();
    this.getStreamForSending();


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

      console.log('this are my peers in the room after set state: ', this.state.peers);

      this.updateStreamList();

      // if video is ready, send out to each available peer
      if (this.state.streamReady) {
        console.log('my video stream to be sent out: ', this.state.video);

        console.log('streamlist', this.state.streamList);

        this.state.streamList.forEach((peerUser) => {
          let call = peer.call(peerUser.peerID, this.state.video);

          // takes place everytime user receives a call
          peer.on('call', (remoteCall) => {
            if (this.state.streamReady) {
              remoteCall.answer(this.state.video);
              console.log('a call was just answered');

              remoteCall.on('stream', (remoteStream) => {
                // Show stream in some video/canvas element.
                console.log('this is the other stream', remoteStream);
                // set all video src to null
                this.clearPeerVideos();
                // set the newly received stream to a video element
                this.renderPeerVideo(remoteStream);
              });
            }
          })
        })
      }
    }) // end of socket on get peers

  } // end of componentDidMount

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

        <div className="row videoRow">
          <div className="col-md-6 vidcol self">
            <video className="local" autoPlay='true'/>
          </div>
          <div className="col-md-6 vidcol peer1div">
            <video className="peer peer1" autoPlay='true'/>
          </div>
          <div className="col-md-6 vidcol peer2div">
            <video className="peer peer2" autoPlay='true'/>
          </div>
          <div className="col-md-6 vidcol peer3div">
            <video className="peer peer3" autoPlay='true'/>
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
