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
  }


   renderUserList = () => {
     return this.props.users.map((user, index) => {
       return (
        <div key={index}>
          <div className="col-md-6">{user.name}</div>
          <div className="col-md-6">{user.socketId}</div>
        </div>
       )
     })

   }


  componentDidMount() {
    // Join global channel
    socket.emit('enter global room');


  }

  render() {
    console.log(this.props.users);
    return (

      <div className="row container-fluid lobbyContainer">

      <div className= "col-sm-12 footerContainer">
        <Header/>
      </div>

        <div className= "col-md-12 componentContainer">

          <div className="userList">
            <div> User List </div>
            {this.renderUserList()}
          </div>

          <div className= "col-sm-12 preferenceContainer">
            <div className= "col-sm-12 preferenceBar">
              <PreferenceBar/>
            </div>

            <div className= "col-sm-12 preferenceTrending">
              <PreferenceTrending/>
            </div>
          </div>


          <div className= "col-sm-12 startBtnCol">
            <div className= "col-sm-4 col-sm-offset-4 startBtnContainer">
              <StartBtn/>
            </div>
          </div>

        </div>

        <div className= "col-sm-12 footerContainer">
          <Footer/>
        </div>

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
