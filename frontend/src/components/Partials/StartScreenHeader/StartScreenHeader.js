import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import brandLogo from './images/logoWithText.png';
import './StartScreenHeader.css';


/**
 * Login
 */
export class StartScreenHeader extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (
      <div className="row startScreenHeaderRow">
          <div className="col-md-12 startScreenHeaderCol">
            <img className="brand-image-with-text" src={brandLogo}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(StartScreenHeader);
