import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Static files
import './StartBtn.css';

// Import API
import { getUser } from '../../../API/userAPI';

// Import Actions
import { addPeerIdToUser } from '../../../actions/userActions';

// Import Socket Client
import {socket} from '../../../API/socket';

/**
 * Login
 */
export class StartBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.state = {
    }
  }



  render() {

    return (

        <div className="container-fluid startButton">
          <button type="button"
                  className="btn btn-danger startButton">Start Button</button>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
    return {
      users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPeerIdToUser: (peerId) => {
        dispatch(addPeerIdToUser(peerId))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartBtn);
