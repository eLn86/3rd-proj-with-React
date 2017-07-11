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
      localStream: {}
    }
  }

  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {

    const video = document.querySelector('.local'); // for my own stream
    const testee = document.querySelector('.peer1'); // for peer stream
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

      // success: if video received, append to html element
      this.handleSuccess = (stream) => {
        video.srcObject = stream;

        this.setState({
          localStream: stream
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

      var peer = new Peer({key: 'z2urygfkdibe29'});
      //this.props.storePeer(peer);

      peer.on('open', function(id) {
        socket.emit('add peer', id);
      });

      socket.on('get peers', (user) => {
        this.setState({
          peers: user
        })
      });
  }

      // console.log('User Stream: ',this.state.localStream);
      // // Send stream data to all other peers in the room
      //   this.state.peerStreamData.forEach((id) => {
      //     // send localStream to each available peer in room
      //     console.log('sending stream to ', id);
      //     var outCall = peer.call(id, stream);
      //   })
//
//         //each time peer receives a call, answer the call, and stream the video
//         peer.on('call', (call) => {
//           // Answer the call, providing our mediaStream, answer() will emit the parameter, in this case 'stream'
//           call.answer(stream);
//
//           // Listener for calls, listens for 'stream' and
//           call.on('stream', (peerStream) => {
//             testee.srcObject = peerStream;
//           });
//         });
//

//    });
//  }  // close this.handleSuccess
  // close componentDidMount()



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
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
