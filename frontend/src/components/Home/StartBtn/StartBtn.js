import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './StartBtn.css';


/**
 * Login
 */
export class StartBtn extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (

        <div className="container-fluid startButton">
          <button type="button" className="btn btn-danger startButton">Start Button</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(StartBtn);
