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
          <div className="col-md-6 footerLeftCol">
            <h5 className="footer-content">Teatime, All rights reserved 2017</h5>
          </div>
          <div className="col-md-6 footerRightCol">
            <h5 className="footer-content">Terms and conditions</h5>
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
