import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';

// Import components
import Header from '../Partials/Header/Header';
import Chat from './Chat/Chat';
import Userlist from './Userlist/Userlist';
import Video from '../Video/Video';

import PreferenceBar from '../Preferences/PreferenceBar/PreferenceBar';
import PreferenceTrending from '../Preferences/PreferenceTrending/PreferenceTrending';


// Import static files
import './Room.css';

// Import Socket Client
import {socket} from '../../API/socket';
import axios from 'axios';

/* This affects the positioning of the modal. Currently set to middle of screen */

const modalStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


export class Room extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.state = {
      trendingPreferences: [],
      modalIsOpen: false,
      peers: []
    }



  }


  openModal = () => {
  this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }


  sendHome = (e) => {
    e.preventDefault();
    window.location.href = "/home";
  }

  nextRoom = (e) => {
    window.location.href= '/home';
    socket.emit('join room');
    socket.emit('getIDFromSocket');
  }

  // When Room component is mounted, create peerID for user by calling createPeer function and get the peers data from socket
  componentDidMount() {

    /* Trending Preferences */
    socket.on('send trending', (trendData) => {
      this.setState({
        trendingPreferences: trendData
      }, console.log(this.state.trendingPreferences));

    })

    /* This is the new room functionality in the modal */

    socket.on('get roomInfo', (roomName) => {

      this.props.storeRoomName(roomName);
      // Redirection
      window.location.href = '/room/' + roomName;
    })
    socket.on('getID', (id) => {
      axios.put('/user', {
        id: id,
        preferences: this.props.preferences
      })
        .then( (response) => {
          console.log('successful post', response);
        })
        .catch((error)=> {
          throw error;
       });
    });

    // get room name from redux store
    console.log('hello this is the stream', window.localStream);
    const roomName = this.props.roomName[0];
    // re-join room chat channel after redirecting.
    socket.emit('join room channel', roomName);

    // get peer list
    socket.on('get peers', (roomUserList, peersIdList) => {
      console.log('hello the new room user list', roomUserList);
      this.setState({
        peers: roomUserList
      })
    });

  }



  render() {

    return (
      <div className="container-fluid room">
        {this.props.isFetching[0] ? (
          <div className="fetcherWrapper">
            {/* This is Wait! Screen for logout*/}
            <i className="fa fa-spinner fa-5x fa-spin spinner" aria-hidden="true"></i>
            <div className="fetching">Wait...</div>
          </div>
        ) : (
          <div>
          {/* This is room screen */}
          <Header/>
          <div className="row roomBody">
            <div className="col-md-2 leftCol">
              {/* UserList Grid Separated from room */}
              <Userlist/>
            </div>
            <div className="col-md-7 midCol">
            <div>

            {/* This is the modal section */}

              <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal} style={modalStyles} contentLabel="roomExit">
                <h1 className= "modalHeading"ref={subtitle => this.subtitle = subtitle}>Where Would You Like to Go?</h1>
                <button className="closeBtn" onClick={this.closeModal}>X</button>

                <div className= "preferenceBar">

                  <div className= "preferenceText"> Edit Your Preferences </div>
                  <PreferenceBar/>

                  <div className= "preferenceTrendingBar">
                    <div className= "preferenceText"> Preferences Currently Trending </div>
                    <PreferenceTrending trendingPreferences= {this.state.trendingPreferences}/>
                  </div>

                </div>

                <form>
                  <button className= "homeBtn" onClick={this.sendHome}>Return to Lobby</button>
                  <button className= "nextBtn" onClick={this.nextRoom}>Next Room</button>
                </form>
              </Modal>

              {/* This is the modal section */}

              {/* Video Grid Separated from room */}
              <Video/>

            </div>
          </div>
          <div className="col-md-3 rightCol">
            {/* Chat Grid Separated from room */}
            <Chat/>
          </div>

          <div className="col-md-7 col-md-offset-2 utilityPanel">
            <button onClick={this.openModal}>Leave Room</button>
          </div>

          </div>
          </div>
        )}
      </div>
    );
  }
}

// grab current preferences from redux state
const mapStateToProps = (state) => {
    return {
      users: state.users,
      preferences: state.preferences,
      roomName: state.rooms,
      isFetching: state.isFetching
  }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
