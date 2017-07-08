import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Children Components
import Header from '../Partials/Header/Header';
import Footer from '../Partials/Footer/Footer';


import PreferenceBar from '../Preferences/PreferenceBar/PreferenceBar';
import PreferenceTrending from '../Preferences/PreferenceTrending/PreferenceTrending';
import StartBtn from './StartBtn/StartBtn';

import './Home.css';

//const io = require('socket.io-client');
//const socket = io();


/**
 * Login
 */
export class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
  }

  // componentDidMount() {
  //   socket.emit('msg', {ref: 'hello'});
  //   socket.on('hello', (data) => {
  //     console.log(data);
  //   })
  // }

  render() {

    return (

      <div className="row container-fluid">


        <Header/>

        <div className= "col-md-12 componentContainer">

          <div className= "col-sm-12 preferenceContainer">
            <PreferenceBar/>
          </div>

          <div className= "col-sm-12 preferenceTrendingContainer">
            <PreferenceTrending/>
          </div>

          <div className= "col-sm-12 startBtnContainer">
            <StartBtn/>
          </div>

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
