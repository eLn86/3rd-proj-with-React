import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import './Chat.css';

// Import Socket API
import { socket } from '../../../API/socket';


export class Chat extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    // Everyting in react scope.
    this.index = 0;
    this.state = {
      msg: '',
      chatTexts: []
    }
  }

  // Helper function for auto scrolling.
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  }

 // Helper function for generating chat text in jsx.
  chatText = (msg, user) => {
    return (
      <div className="chatTextComponent"
           key={this.index++}>
        {/* Conditional Rendering: Me(right), others(left) */}
        {user.socketId !== socket.id ? (
            <div className="chatTextLeft">
              <img src={user.picture} className="userPicLeft"/>
              {user.name + ' : ' + msg}
            </div>
          ) : (
            <div className="chatTextRight">
              {msg}
              <img src={user.picture} className="userPicRight"/>
            </div>
          )}
      </div>
    )
  };

  componentDidMount() {
    this.scrollToBottom(); // auto scroll down.
    socket.on('render msg', (msg, user) => {
      // recieve realtime msg and update state.
      console.log(user);

      const newMsg = this.chatText(msg, user);

      this.setState({
        chatTexts: this.state.chatTexts.concat(newMsg)
      })
    });
  }

  componentDidUpdate() {
    this.scrollToBottom(); // auto scroll down.
  }

  onKeypress = (e) => {
    if (e.key === 'Enter' && this.state.msg !== '') {
      // If press enter, emit msg.
      socket.emit('broadcast msg', this.state.msg);
      this.setState({msg:''});
    }
  };

  onClick = (e) => {
    if (this.state.msg !== '') {
      // If click send btn, emit msg.
      socket.emit('broadcast msg', this.state.msg);
      this.setState({msg:''});
    }
  };

  onChange = (e) => {
    // Uptating state if there is change in input field.
    this.setState({msg:e.target.value});
  }

  render() {

    return (
      <div id="chatGrid">
        {/* Chat Text Grid here*/}
        <div className="chatTextWrapper">
          {this.state.chatTexts}
          {/* Auto scroll to the last */}
          <div id="messagesEnd"
               ref={(el) => this.messagesEnd = el} />
        </div>
        {/* Chat Input Group here*/}
        <div className="input-group chatInput row">
          <input id="btn-input"
                 type="text"
                 className="form-control input"
                 placeholder="Type your message here..."
                 onChange={this.onChange}
                 value={this.state.msg}
                 onKeyPress={this.onKeypress}/>
          <span className="input-group-btn">
            <button className="btn btn-warning"
                    id="btn-chat"
                    onClick={this.onClick}>
                    Send
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Chat;
