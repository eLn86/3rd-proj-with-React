import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../Partials/Header/Header';
import Chat from './Chat/Chat';

import './Room.css';

export class Room extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.state = {
    }

  }


  render() {

    return (
      <div className="container-fluid">
        <Header/>
        <div className="row roomBody">
          <div className="col-md-2 leftCol">
            <ul className="userList">
              <li> username </li>
              <li> username </li>
              <li> username </li>
              <li> username </li>
              <li> username </li>
              <li> username </li>
            </ul>
          </div>
          <div className="col-md-7 midCol">
          </div>
          <div className="col-md-3 rightCol">
            {/* Chat Grid Divied from room */}
            <Chat/>
          </div>
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Room);
