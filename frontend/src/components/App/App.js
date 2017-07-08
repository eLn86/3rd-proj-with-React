import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Login from '../Login/Login';
import Home from '../Home/Home'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sockets: {}
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
        </Switch>
      </Router>
    );
  }
}

// <Route exact path="/home" component={Home}/>
// <Route exact path="/room/:id" component={Room}/>
// <Route exact path="/exit" component={Exit}/>
// <Route exact path="/profile" component={Profile}/>
// <Route exact path="/logout" component={Logout}/>

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
