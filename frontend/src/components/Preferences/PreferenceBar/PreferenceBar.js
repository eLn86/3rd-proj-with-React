import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class PreferenceBar extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (
      <div/>
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
