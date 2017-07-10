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
      preferences: []
    }
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
    console.log(this.state);
    console.log(this.props);
    this.setState({
      preferences: this.props.preferences
    })

    // Join global channel
    socket.emit('enter global room');


  }
/* Not sure if this is necessary */

  render() {
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
              <StartBtn preferences= {this.props.preferences}/>
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
      users: state.users,
      preferences: state.preferences
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nothing to see here...
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
