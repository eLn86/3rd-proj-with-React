import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import components
import Header from '../Partials/Header/Header';

// Import static files
import './Room.css';

// Import Socket Client
import io from 'socket.io-client';
const socket = io('/');

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

            <div className="input-group chatInput row">
              <input id="btn-input" type="text" className="form-control input" placeholder="Type your message here..." />
                <span className="input-group-btn">
                  <button className="btn btn-warning" id="btn-chat">Send</button>
                </span>
            </div>

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
