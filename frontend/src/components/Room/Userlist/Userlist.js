// Import React, Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

// Import Static Files
import './Userlist.css';

// Import Socket API
import { socket } from '../../../API/socket';


export class Userlist extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.index = 0;
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

  drawUserList = (userList) => {
    return this.state.userList.map((e) => {
      return (
        <div className="userListComponent"
             key={this.index++}>
            {e.name}
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

export default Userlist;
