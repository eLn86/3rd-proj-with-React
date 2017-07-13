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
    backgroundColor: "#232222",
    border: "2px solid #E26A6A",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px'
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
      socket.emit('explicit leave', true);
      e.preventDefault();
    axios.get('/logout')
    .then(function (response) {
      // console.log(response);

      e.preventDefault();
      window.location.href = '/';
    })
    .catch(function (error) {
      // console.log(error);
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
      <nav className="navbar navbar-default navbar-inverse">
        <div className="container-fluid">

          <div className="navbar-header">
            <a className="navbar-brand" id="teaTimeHeader" href="/">
             teaTime<span className='hearts'> &hearts;</span></a>

            {/* This is the modal section */}

            <Modal isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal} style={modalStyles} contentLabel="logoutModal">\

                <div className="headingContainer">

                  <h1 className= "modalHeading">Confirm Logout?</h1>
                </div>

                <button className= "btn btn-default cnfmBtn" onClick={this.logout}>Confirm</button>
                <button className="btn btn-default cnclBtn" onClick={this.closeModal}>Cancel</button>
            </Modal>


            {/* This is the modal section */}

          </div>
          <ul className="nav navbar-nav navbar-right">
            <li id="welcome">
              <span>Hello, </span>
              <img id="welcomeImg" src={this.props.user[0].profile.picture}/>
              <span>{this.props.user[0].profile.name + '!'}</span>
            </li>
            <li><a href="#" onClick={this.openModal}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
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
