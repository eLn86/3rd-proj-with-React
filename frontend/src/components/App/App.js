import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Login from '../Login/Login';
import Home from '../Home/Home';
import Room from '../Room/Room';

import io from 'socket.io-client';

const socket = io('/');

socket.on('show client', (id) => {
  console.log('This is from server, socket is connected well.');
  console.log(id);
})

const msg = 'hello world';
setInterval(() => {
  socket.emit('show connection', msg);
}, 10000);

socket.on('update userList', (arr) => {
  console.log(arr);
})


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/room" component={Room}/>
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
