import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { socket } from '../../../API/socket';

import './PreferenceTrending.css'

export class PreferenceTrending extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)
    this.state = {
      trendingPreferences: this.props.trendingPreferences,
      trendingPreferenceComponent: []

    }
  }

  renderTrendingPreferences = () => {
    console.log(this.state.trendingPreferences);
  };


  componentDidMount(){


  }

  componentDidUpdate(prevprops, prevstate){
    if(prevprops.trendingPreferences != this.props.trendingPreferences){
      this.setState({
        trendingPreferences: this.props.trendingPreferences,
      })
    }

  }




  render() {

    return (

      <div className='col-md-12'>
        <div className='trending'>{this.state.trendingPreferences[0]}</div>
        <div className='trending'>{this.state.trendingPreferences[1]}</div>
        <div className='trending'>{this.state.trendingPreferences[2]}</div>
        <div className='trending'>{this.state.trendingPreferences[3]}</div>
        <div className='trending'>{this.state.trendingPreferences[4]}</div>
        <div className='trending'>{this.state.trendingPreferences[5]}</div>
        <div className='trending'>{this.state.trendingPreferences[6]}</div>
        <div className='trending'>{this.state.trendingPreferences[7]}</div>
        <div className='trending'>{this.state.trendingPreferences[8]}</div>
        <div className='trending'>{this.state.trendingPreferences[9]}</div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // nothing to see here...
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceTrending);
