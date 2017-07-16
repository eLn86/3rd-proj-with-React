import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import static files
import '../../../bootstrap-social.css';
import './LoginBtn.css';

// Import Action.
import { isFetching } from '../../../actions/fetchingActions';

/**
 * Login
 */
export class LoginBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  facebookLogin = (e) => {
    e.preventDefault();
    this.props.isFetching(true);
    window.location.href = '/auth/facebook';
  }

  googleLogin = (e) => {
    e.preventDefault();
    this.props.isFetching(true);
    window.location.href = '/auth/google';
  }

  twitterLogin = (e) => {
    e.preventDefault();
    this.props.isFetching(true);
    window.location.href = '/auth/twitter';
  }

  render() {

    return (
      <div className="socialBtn">
        <a className="btn-lg btn-social btn-facebook" onClick= {this.facebookLogin}>
          <span className="fa fa-facebook"></span>
          Sign in with Facebook
        </a>
        <a className="btn-lg btn-social btn-google" onClick= {this.googleLogin}>
          <span className="fa fa-google"></span>
          Sign in with Google
        </a>
        <a className="btn-lg btn-social btn-twitter" onClick= {this.twitterLogin}>
          <span className="fa fa-twitter"></span>
          Sign in with Twitter
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
    isFetching: (result) => {
      dispatch(isFetching(result))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn);
