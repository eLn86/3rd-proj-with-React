// Import React, Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

// Import Static Files
import './Chat.css';

// Import Socket API
import { socket } from '../../../API/socket';


export class Chat extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    // Everything in react scope.
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
            <span className="userNameDisplay">{'@' + user.name}</span>
              <div className="messageLeft">
                {msg}
              </div>
            </div>
          ) : (
            <div className="chatTextRight">
              <div className="messageRight">
                {msg}
              </div>
              <img src={user.picture} className="userPicRight"/>
            </div>
          )}
      </div>
    )
  };

  // When component mounts, render all messages from other users including user
  // by returning conditional JSX from this.chatText function
  componentDidMount() {
    this.scrollToBottom(); // auto scroll down.
    socket.on('render msg', (msg, user) => {
      // recieve realtime msg and update state.
      const newMsg = this.chatText(msg, user);

      this.setState({
        chatTexts: this.state.chatTexts.concat(newMsg)
      })
    });
  }

  componentDidUpdate() {
    this.scrollToBottom(); // auto scroll down.
  }

  // When enter is pressed and the current message in state is not empty,
  // emit the message to socket io
  onKeypress = (e) => {
    if (e.key === 'Enter' && this.state.msg !== '') {
      // If press enter, emit msg.
      socket.emit('broadcast msg', this.state.msg);
      this.setState({msg:''});
    }
  };

  // When send button is clicked, check if current message in state is not empty,
  // if so, emit the message to socket io
  onClick = (e) => {
    if (this.state.msg !== '') {
      // If click send btn, emit msg.
      socket.emit('broadcast msg', this.state.msg);
      this.setState({msg:''});
    }
  };

  // Event listener for chat input field change
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
