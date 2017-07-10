import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import static files
import './App.css';

// Import Actions
import {updateUserList} from '../../actions/userActions';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// Import components
import Login from '../Login/Login';
import Home from '../Home/Home';
import Room from '../Room/Room';

// Import Socket API
import { socket } from '../../API/socket';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  // Fire off update user list action when socket is mounted in App
  componentDidMount(){
    // updates user reducer on socket event
    socket.on('update userList', (userArray) => {
      this.props.updateUserList(userArray);
    })
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
    updateUserList: (userArray) => {
        dispatch(updateUserList(userArray))
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
