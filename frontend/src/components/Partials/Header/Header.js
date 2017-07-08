import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './Header.css';


/**
 * Header
 */
export class Header extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (
      <nav className="navbar navbar-inverse row">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Tea Time</a>
          </div>
          <ul className="nav navbar-nav">
            <li><a href="#">Preferences</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
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
