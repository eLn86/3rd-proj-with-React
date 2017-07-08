import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import '../../../bootstrap-social.css';

import './LoginBtn.css';


/**
 * Login
 */
export class LoginBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  facebookLogin = (e) => {
    e.preventDefault();
    window.location.href = "/auth/facebook";
  }

  render() {

    return (
      <div className="row loginBtnRow">
          <div className="col-md-12 loginBtnCol">
            <div className="facebookButton">
              <a className="btn btn-social btn-facebook" onClick= {this.facebookLogin}>
              <span className="fa fa-facebook"></span>
                Sign in with Facebook
              </a>
            </div>
          </div>
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
