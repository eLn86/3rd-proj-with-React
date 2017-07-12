import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { socket } from '../../API/socket';

import PreferenceBar from '../Preferences/PreferenceBar/PreferenceBar';
import PreferenceTrending from '../Preferences/PreferenceTrending/PreferenceTrending';
import StartBtn from './StartBtn/StartBtn';

// Child components
import Header from '../Partials/Header/Header';
import Footer from '../Partials/Footer/Footer';

// Import static files
import './Home.css';



/**
 * Login
 */
export class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.state = {
      trendingPreferences: [],
    }
  }


  componentDidMount() {
    socket.on('send trending', (trendData) => {

      this.setState({
        trendingPreferences: trendData
      }, console.log(this.state.trendingPreferences));

    })
  }


  render() {
    return (

      <div className="container-fluid lobbyContainer">

        <Header/>

        <div className= "componentContainer">

          <div className= "col-sm-8 col-md-offset-2 preferenceContainer">
            <PreferenceBar/>
            <PreferenceTrending trendingPreferences= {this.state.trendingPreferences}/>
          </div>
          <StartBtn/>

        </div>

        <Footer/>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nothing to see here...
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
