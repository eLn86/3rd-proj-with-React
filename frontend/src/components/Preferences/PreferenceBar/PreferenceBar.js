import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './PreferenceBar.css';

import { addPreference, deletePreference } from '../../../actions/preferenceActions';

// Tokenfield module
import Tokenfield from 'tokenfield';

export class PreferenceBar extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.state = {
    }

  }

  // create preferences in the correct format to render in tokenfield
  createTokens = () => {
    return this.props.preferences.map((preference, index) => {
      return {id: index, name: preference}
    })
  }

  componentDidMount(){

    var tf = new Tokenfield({
      el: document.querySelector('.preferenceBarInput'),
      setItems: this.createTokens()
    });

    tf.on('addToken', (err, token) => {
      this.props.addPreference(token.name)
    })

    tf.on('removeToken', (err, token) => {
      this.props.deletePreference(token.name)
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
      },
    deletePreference: (preference) => {
        dispatch(deletePreference(preference))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceBar);
