import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { socket } from '../../API/socket';

// Child components
import Header from '../Partials/Header/Header';
import Footer from '../Partials/Footer/Footer';
import PreferenceBar from '../Preferences/PreferenceBar/PreferenceBar';
import PreferenceTrending from '../Preferences/PreferenceTrending/PreferenceTrending';
import StartBtn from './StartBtn/StartBtn';

// Animation
import { CSSTransitionGroup } from 'react-transition-group'

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
      <CSSTransitionGroup transitionName = "homeAni"
                          transitionAppear = {true}
                          transitionAppearTimeout = {500}>
        <div className='mainBox'>
          <Header/>
          <div className="container lobbyContainer">
            <div className= "row componentContainer">
              <div className= "col-xs-12 preferenceContainer">
                <div className="col-xs-12 prefBarLabel">What Do You Like?</div>
                {/* PreferenceBar */}
                <PreferenceBar/>
                <div className="col-xs-12 trendingLabel">What's Popular</div>
                {/* Trending Display */}
                <PreferenceTrending trendingPreferences= {this.state.trendingPreferences}/>
              </div>
              <StartBtn/>
            </div>
          </div>
          <Footer/>
        </div>
      </CSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

export default connect(mapStateToProps)(Home);
