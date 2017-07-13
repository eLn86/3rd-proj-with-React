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
    this.state = {
      userList: []
    }
  }

  componentDidMount() {
    socket.on('update userList', (userList) => {
      // Updating userlist in state.
      this.setState({
        userList: userList
      })
    });
  }

  drawUserList = () => {
    return this.state.userList.map((e) => {
      return (
        <div className="userListComponent"
             key={this.userIndex++}>
          <img src={e.picture} className="userPic"/>
          <br/>
          <div className="userName">{e.name}</div>
        </div>
      )
    })
  };

  render() {
    return (
      <div id="userListGrid">
        {this.drawUserList()}
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
