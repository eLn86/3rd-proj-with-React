import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './Login.css';

import LoginBtn from './LoginBtn/LoginBtn';
import Footer from '../Partials/Footer/Footer';

/**
 * Login
 */
export class Login extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="title row"> teaTime
        </div>
        <div className="subtitle row"> live video chat that keeps getting better
        </div>
        <div className="login row">
          <LoginBtn/>
        </div>
        <Footer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
