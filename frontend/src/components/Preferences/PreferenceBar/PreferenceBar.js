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
    // creates token field for preference inputs. renders existing preferences
    var tf = new Tokenfield({
      el: document.querySelector('.preferenceBarInput'),
      setItems: this.createTokens()
    });

    // action caller: add preference to store
    tf.on('addToken', (err, token) => {
      this.props.addPreference(token.name)
    })

    // action caller: delete preference from store
    tf.on('removeToken', (err, token) => {
      this.props.deletePreference(token.name)
    })
  }


  render() {

    return (
      <div className="col-xs-12 ">
        <input className="preferenceBarInput form-control"
               type= "text"
               placeholder="The conversation gets better with more info!"/>
      </div>
    );
  }
}

// grab current preferences from redux state
const mapStateToProps = (state) => {
    return {
      preferences: state.preferences
    }
}

// dispatch actions
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
