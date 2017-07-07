import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Tokenfield module
import Tokenfield from 'tokenfield';

import './PreferenceBar.css';

export class PreferenceBar extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)



  }


  


  render() {

    return (
      <div>
        <input type="text" className="tokenfield" placeholder="Input Preferences"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceBar);
