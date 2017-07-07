import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './PreferenceBar.css';

import { addPreference } from '../../../actions/preferenceActions';

// Tokenfield module
import Tokenfield from 'tokenfield';

export class PreferenceBar extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.state = {
      preferences: []
    }
  }

  componentDidMount(){

    // Init tokenfield object (tf)
    var tf = new Tokenfield({
      el: document.querySelector('.preferenceBarInput')
    });

    // EVENT LISTENERS
    tf.on('addToken', (err, token) => {
      this.props.addPreference(token.name);
      console.log(this.props.preferences);
    })

  

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
      preferences: state.preferences
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPreference: (preference) => {
      dispatch(addPreference(preference))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceBar);
