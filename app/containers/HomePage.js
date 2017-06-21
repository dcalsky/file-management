import React, { Component } from 'react';
import Preview from '../components/Preview'
import Directory from '../components/Directory'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FCBActions from '../actions/FCB';
import './home.scss';

class HomePage extends Component {
  constructor() {
    super()
  }
  addDirectory() {
    this.props.add('ccc', 0, 'dir')
  }
  render() {
    const {FCB} = this.props
    return (
      <div id="home">
        <Directory {...this.props} />
        <Preview  />
        <div className="tools">
          <i className="fa fa-plus" aria-hidden="true" onClick={this.addDirectory.bind(this)}/>
          <span>100MB/1024MB</span>
          <i className="fa fa-minus" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    FCB: state.FCB,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FCBActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
