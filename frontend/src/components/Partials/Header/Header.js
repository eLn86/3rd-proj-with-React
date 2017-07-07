import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './Header.css';


/**
 * Login
 */
export class Header extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Tea Time</a>
          </div>
          <ul class="nav navbar-nav">
            <li><a href="#">Preferences</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><span class="glyphicon glyphicon-log-out"></span> Login</a></li>
          </ul>
        </div>
      </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
