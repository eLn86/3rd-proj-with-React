// Import React, Redux
import React, { Component, PropTypes, Image} from 'react';

import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import EmojiReact from 'react-emoji-react';
import Emoji from 'react-emoji-render';

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
      blank:[],
      emojis: [],
      msg: '',
      chatTexts: []
    }
  }

  // Helper function for auto scrolling.
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  }

  // Emojis

  onReaction = (name) => {

}


onEmojiClick = (name) => {
  this.setState({
    msg: this.state.msg + ":" + name + ":"
  });
}

 // Helper function for generating chat text in jsx.
  chatText = (msg, user) => {
    const video = document.querySelector('.local'); // for my own stream
    var canvas = document.createElement('canvas');

    canvas.width = 660;
    canvas.height = 580;

    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 660, 660, 0, 0, 660, 660);

    var image = canvas.toDataURL("image/png");

    return (
      <div className="chatTextComponent"
           key={this.index++}>
        {/* Conditional Rendering: Me(right), others(left) */}
        {user.socketId !== socket.id ? (
            <div className="chatTextLeft">
              <div className= "imgContainer">
                <img src={image} className= "userPicLeft"/>
              </div>
                <div className="messageLeft">
                  <span className="userNameDisplay">{'@' + user.name}</span>
                  <br/>
                  <Emoji text={msg}/>
                </div>
            </div>
          ) : (
            <div className="chatTextRight">
              <div className= "imgContainer">
                <img src={image} className= "userPicRight"/>
              </div>
              <div className="messageRight">
                <Emoji text={msg}/>
              </div>
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



    const newMsg = this.chatText(msg, user);

    this.setState({
      chatTexts: this.state.chatTexts.concat(newMsg)
    })
      // recieve realtime msg and update state.
    //  const newMsg = this.chatText(msg, user);
    });
  }

  componentDidUpdate() {
    this.scrollToBottom(); // auto scroll down.
  }

  // When enter is pressed and the current message in state is not empty,
  // emit the message to socket io
  onKeypress = (e) => {
    if (e.key === 'Enter' && this.state.msg !== '') {
      socket.emit('take picture instruction');
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

        <div className="emojiMenu">
          <EmojiReact
            id="emojiMenu"
            reactions={this.state.blank}
            onReaction={(name) => this.onReaction(name)}
            onEmojiClick={(name) => this.onEmojiClick(name)}/>
        </div>

        <div className="row input-group chatInput">
        <span className="input-group-addon" id="basic-addon1"></span>
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
