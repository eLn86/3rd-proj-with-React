import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Peer from 'peerjs';
// Import Socket API
import { socket } from '../../API/socket';

// Import components

export class Video extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.peerIndex = 0;
    this.state = {
      peers: [],
      peerStreamData: [],
      localStream: {},
      video: {}
    }
  }



  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {
    const video = document.querySelector('.local'); // for my own stream
    const testee = document.querySelector('.peer1'); // for peer stream
<<<<<<< HEAD
//
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


=======

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
>>>>>>> master

      var peer = new Peer({key: 'z2urygfkdibe29'});
      //this.props.storePeer(peer);

      peer.on('open', function(id) {
        socket.emit('add peer', id);
      });

      socket.on('get peers', (user, streamList) => {

        this.setState({
          peers: user,
          peerStreamData: streamList
        })

        console.log('this is my peers in the room ', this.state.peers);

        const streamList = this.state.peers.filter((peerUser) => {
          return peerUser.peerID !== peer.id;
        })

        this.setState({
          peerStreamData: streamList
        })

        console.log('peer id i am about to call::::::', this.state.peerStreamData[0].peerID);
        console.log('my video stream to be sent out: ', this.state.video);

        if (this.state.peerStreamData.length !== 0) {
          var call = peer.call(this.state.peerStreamData[0].peerID, this.state.video);
          console.log('this is the call', call);

          peer.on('call', (remoteCall) => {
            remoteCall.answer(this.state.video);

            remoteCall.on('stream', (remoteStream) => {
              // Show stream in some video/canvas element.
              console.log('this is the other stream', remoteStream);
              testee.srcObject = remoteStream;
            });

          })

          // no  log
          call.on('error', (err) => {
            console.log('there is an error', err);
          })

          // no log
          peer.on('error', (err) => {
            console.log('peer error detected', err);
          })

        }

      });

      // success: if video received, append to html element
      this.handleSuccess = (stream) => {
        video.srcObject = stream;
        console.log('Other Peer ID: ', this.state.peerStreamData);

<<<<<<< HEAD
        if (this.state.peerStreamData.length !== 0) {
          var call = peer.call(this.state.peerStreamData[0].peerID, stream);
          call.on('stream', function(remoteStream) {
            // Show stream in some video/canvas element.
            testee.srcObject = remoteStream;
          });
        }

        this.setState({
          localStream: stream
=======
        this.setState({
          video: stream
>>>>>>> master
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

      // console.log('User Stream: ',this.state.localStream);
      // // Send stream data to all other peers in the room
      //   this.state.peerStreamData.forEach((id) => {
      //     // send localStream to each available peer in room
      //     console.log('sending stream to ', id);
      //     var outCall = peer.call(id, stream);
      //   })

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
          <div className="col-md-6 selfCol">
            <video className="local" autoPlay='true'/>
          </div>
          <div className="col-md-6 firstPeer">
            <video className="peer1" autoPlay='true'/>
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
