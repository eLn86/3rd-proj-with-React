import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import '../../bootstrap-social.css';

import './LoginBtn.css';


/**
 * Login
 */
export class LoginBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (
      <div className="row loginBtn">

        <a className="btn btn-social btn-facebook">
        <span className="fa fa-facebook"></span>
          Sign in with Facebook
        </a>


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

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn);
