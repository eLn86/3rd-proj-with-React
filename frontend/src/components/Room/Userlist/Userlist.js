// Import React, Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Peer from 'peerjs';

// Import Static Files
import './Userlist.css';

// Import Socket API
import { socket } from '../../../API/socket';

export class Userlist extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.userIndex = 0;
    this.peerIndex = 0;
    this.state = {
      userList: [],
      peers: []
    }
  }

  // When start button is clicked, this function is triggered
  /*
  ** Function: createPeer()
  ** Parameters: None
  ** Purpose: Create a new peer and emit the peer id to socket in the backend
  */
  // createPeer = () => {
  //   var peer = new Peer({key: 'z2urygfkdibe29'});
  //   console.log('this is the peer', peer);
  //
  //   peer.on('open', function(id) {
  //     socket.emit('add peer', id);
  //   });
  // }

  componentDidMount() {
    //this.createPeer();

    socket.on('update userList', (userList) => {
      // Updating userlist in state.
      this.setState({
        userList: userList
      })
    });

    socket.on('get peers', (roomUserList, peersIdList) => {
      this.setState({
        peers: roomUserList
      })
    });
  }

  renderPeerIdList = () => {
    return this.state.peers.map((el) => {
      return (
        <div className="peerDiv"
             key={this.peerIndex++}>
          <div className="row peerRow">
            <div className="col-md-6 peerName">Peer Name: {el.name}</div>
            <div className="col-md-6 peerID">Peer ID: {el.peerID}</div>
          </div>

        </div>
      )
    })
  }

  drawUserList = () => {
    return this.state.userList.map((e) => {
      return (
        <div className="userListComponent"
             key={this.userIndex++}>
          <img src={e.picture} className="userPic"/>
          <div className="userName">{e.name}</div>
        </div>
      )
    })
  };



  render() {
    return (
      <div id="userListGrid">
        {this.drawUserList()}
        {this.renderPeerIdList()}
      </div>
    );
  }
}

// grab current peer from redux state
const mapStateToProps = (state) => {
  return {}
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);
