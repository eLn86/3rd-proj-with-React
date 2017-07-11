import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import static files
import './App.css';


import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// Import components
import Login from '../Login/Login';
import Home from '../Home/Home';
import Room from '../Room/Room';
import Video from '../Video/Video';


// Import Socket API
import { socket } from '../../API/socket';

import { setUsers, getUsers } from '../../API/userAPI';


class App extends Component {
  constructor(props) {
    super(props);
  }

  conditionalRender = () => {
    const checker = getUsers()[0];
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

    return(
      <div>
        {this.conditionalRender()}
      </div>
    )

  }
}

// <Route exact path="/home" component={Home}/>
// <Route exact path="/room/:id" component={Room}/>
// <Route exact path="/exit" component={Exit}/>
// <Route exact path="/profile" component={Profile}/>
// <Route exact path="/logout" component={Logout}/>

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
