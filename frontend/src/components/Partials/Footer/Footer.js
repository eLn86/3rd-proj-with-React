import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './Footer.css';

/**
 * Login
 */
export class Footer extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (
      <div className="row footerRow">
          <div className="col-md-6 footer">
            <h5 className="footer-content-left">
              teaTime <span className='hearts'> &hearts;</span> Team Bukit Timah Hills,
              All rights reserved 2017.</h5>
            <a className="footer-content-right" href="#">
              <i className="fa fa-github" aria-hidden="true"></i>  Git Hub
            </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
