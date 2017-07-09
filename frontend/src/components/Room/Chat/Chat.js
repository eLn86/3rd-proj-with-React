import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import './Chat.css';

export class Chat extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

    this.state = {
    }

  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  }

  componentDidMount() {
    this.scrollToBottom();


  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onKeypress = (e) => {
    if (e.key === 'Enter') {
      // socket here
    }
  };

  render() {

    return (
      <div id="chatGrid">
        {/* Chat Text here*/}
        <div className="chatTextWrapper">
          <div className="chatText">Test Message</div>

          {/* Auto scroll to the last */}
          <div id="messagesEnd"
               ref={(el) => this.messagesEnd = el} />
        </div>
        {/* Chat Input here*/}
        <div className="input-group chatInput row">
          <input id="btn-input"
                 type="text"
                 className="form-control input"
                 placeholder="Type your message here..."
                 onKeyPress={this.onKeypress}/>
          <span className="input-group-btn">
            <button className="btn btn-warning"
                    id="btn-chat">
                    Send
            </button>
          </span>
        </div>
      </div>
    );
  }
}

// grab current preferences from redux state
const mapStateToProps = (state) => {
    return {
    }
}

// dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
