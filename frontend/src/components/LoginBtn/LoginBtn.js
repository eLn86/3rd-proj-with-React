import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
      <div className="row login-btn">
        hello
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
