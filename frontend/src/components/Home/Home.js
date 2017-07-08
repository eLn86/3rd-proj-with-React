import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import components
import PreferenceBar from '../Preferences/PreferenceBar/PreferenceBar';
import PreferenceTrending from '../Preferences/PreferenceTrending/PreferenceTrending';
import StartBtn from './StartBtn/StartBtn';

// Child components
import Header from '../Partials/Header/Header';
import Footer from '../Partials/Footer/Footer';

// Import static files
import './Home.css';

//const io = require('socket.io-client');
//const socket = io();


/**
 * Login
 */
export class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.state = {
      users:this.props.users,
    }
  }

  /*
   componentDidMount() {
     console.log(this.props.users);
   }
  */

  // When state is updated, check if the users in the state is equal to the overall state in store. If not equal, set the component state to that of the store's state
   componentDidUpdate(){
     if(this.state.users != this.props.users){

       console.log(this.state.users);
       this.setState({
         users:this.props.users
       })
     }
   }

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
      users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nothing to see here...
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
