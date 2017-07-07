import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Children Components
import Footer from '../Partials/Footer/Footer';
import Header from '../Partials/Header/Header';

import PreferenceBar from '../Preferences/PreferenceBar/PreferenceBar';
import PreferenceTrending from '../Preferences/PreferenceTrending/PreferenceTrending';
import StartBtn from './StartBtn/StartBtn';

import './Home.css';


/**
 * Login
 */
export class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  render() {

    return (
      <div className="container-fluid login">
        <Header />

        <div className= "col-md-12 preferenceContainer">
          <div className= "col-md-12 preferenceContainer">
            <PreferenceBar/>
          </div>
          <div className= "col-md-12 preferenceContainer">
            <PreferenceTrending/>
          </div>
        </div>

        <div className= "col-md-12 startBtnContainer">
          <StartBtn/>
        </div>

        <Footer/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
