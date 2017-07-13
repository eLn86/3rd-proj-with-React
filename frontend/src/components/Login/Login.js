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
      <div className="loginpage">
       { this.props.isFetching[0] ? (
          <div className="fetcherWrapper">
            {/* This is Wait! Screen*/}
            <i className="fa fa-spinner fa-5x fa-spin spinner" aria-hidden="true"></i>
            <div className="fetching">Preparing your tea...</div>
          </div>
        ) : (
          <div className="flexWrapper">
          {/* This is Login Screen*/}
          <div className="flexBody">
             <div className="title row"> teaTime</div>
             <div className="subtitle row"> live video chat that keeps getting better</div>
             <div className="login row">
               <LoginBtn/>
             </div>
          </div>
          <Footer/>
          </div>
       )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      isFetching: state.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nothing to see here...
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
