import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// Import static files
import './App.css';

// Import components
import Login from '../Login/Login';
import Home from '../Home/Home';
import Room from '../Room/Room';
import Video from '../Video/Video';

// Import API
import { socket } from '../../API/socket';
import { setUsers, getUsers } from '../../API/userAPI';


class App extends Component {

  conditionalRender = () => {
    const checker = getUsers()[0]; // Check user login info at redux.
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={checker ? Home : Login}/>
          <Route exact path="/home" component={checker ? Home : Login}/>
          <Route exact path="/room/:id" component={checker ? Room : Login}/>
        </Switch>
      </Router>
    )
  };

  render() {
    return( <div>{ this.conditionalRender() }</div> )
  }
}


const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

export default connect(mapStateToProps)(App);
