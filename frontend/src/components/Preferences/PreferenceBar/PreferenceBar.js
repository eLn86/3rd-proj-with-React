import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './PreferenceBar.css';

// Tokenfield module
import Tokenfield from 'tokenfield';

export class PreferenceBar extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  componentDidMount(){

    var tf = new Tokenfield({
      el: document.querySelector('.preferenceBarInput')
    });

  }


  render() {

    return (
      <div>
        <input className="preferenceBarInput form-control" type= "text"/>
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
