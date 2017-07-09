import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Children Components
import StartScreenHeader from '../Partials/StartScreenHeader/StartScreenHeader';
import Footer from '../Partials/Footer/Footer';
import LoginBtn from './LoginBtn/LoginBtn';

import './Login.css';


/**
 * Login
 */
export class Login extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (
      <div className="container-fluid login">
        <StartScreenHeader/>
        <LoginBtn/>
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
