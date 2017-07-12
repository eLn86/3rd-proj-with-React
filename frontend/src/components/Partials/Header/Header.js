import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { socket } from '../../../API/socket';
import axios from 'axios';
import { isFetching } from '../../../actions/fetchingActions';

import './Header.css';

const modalStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

/**
 * Header
 */
export class Header extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.state = {
      modalIsOpen:false
    }
  }

  logout = (e) => {
    this.props.isFetching(false);
    axios.get('/logout')
    .then((response) => {
      e.preventDefault();
      window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
      this.props.isFetching(true);
    });
  }

  openModal = () => {
  this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }


  render() {

    return (
      <nav className="navbar navbar-inverse row">
        <div className="container-fluid">

          <ul className="nav navbar-nav">
            <li><a href="#">Preferences</a></li>
          </ul>
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Tea Time</a>

            {/* This is the modal section */}

            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal} style={modalStyles} contentLabel="logoutModal">
                <h1 className= "modalHeading"ref={subtitle => this.subtitle = subtitle}>Confirm Logout?</h1>
                <button className="closeBtn" onClick={this.closeModal}>X</button>
                <button className= "cnfmBtn" onClick={this.logout}>Confirm</button>
            </Modal>

            {/* This is the modal section */}

          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#" onClick={this.openModal}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isFetching: (result) => {
      dispatch(isFetching(result))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
