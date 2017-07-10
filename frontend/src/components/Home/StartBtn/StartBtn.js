import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './StartBtn.css';

// Import Socket API
import { socket } from '../../../API/socket';

/**
 * Login
 */
export class StartBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  onClick = (e) => {
    socket.emit('join room', 'coffee');
  };

  componentDidMount() {
    socket.on('get roomInfo', (roomName) => {
      window.location.href = '/room/' + roomName;
    })
  }

  render() {

    return (

        <div className="container-fluid startButton">
          <button type="button"
                  className="btn btn-danger startButton"
                  onClick={this.onClick}>
                  Start Button
          </button>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nothing to see here...
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartBtn);
