import React, { Component } from 'react';
import Preview from '../components/Preview'
import Directory from '../components/Directory'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FCBActions from '../actions/FCB';
import * as BlockActions from '../actions/Block';
import './home.scss';

class HomePage extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      dialogShow: false,
      FCBName: null,
      FCBType: 'file'
    }
  }
  createFCB = () => {
    const { items, currentFCB, path } = this.props.FCB
    let FCB = items[currentFCB]
    if (FCB.type === 'file') {
      FCB = items[path[path.length - 2]]
    }
    this.props.add(this.state.FCBName, FCB.id, this.state.FCBType)
  }
  changeFCBName = (e) => {
    this.setState({
      FCBName: e.target.value
    })
  }
  changeFCBType = (e) => {
    this.setState({
      FCBType: e.target.value
    })
  }
  toggleDialog = () => {
    this.setState({
      dialogShow: !this.state.dialogShow
    })
  }
  render() {
    const {FCB, Block} = this.props
    return (
      <div id="home">
        <Directory {...this.props} />
        <Preview  {...this.props}/>
        <div className="new-file" style={{display: this.state.dialogShow ? 'block' : 'none'}}>
          <div className="group">
            <input onChange={this.changeFCBName} type="text" placeholder="请输入名称..."/>
            <select onChange={this.changeFCBType}>
              <option value="file">文件</option>
              <option value="dir">文件夹</option>
            </select>
          </div>

          <div className="group">
            <button onClick={this.createFCB}>确认</button>
            <button onClick={this.toggleDialog}>返回</button>
          </div>

        </div>
        <div className="tools">
          <i className="fa fa-plus" aria-hidden="true" onClick={this.toggleDialog}/>
          <span>{(Block.occupied / 1024).toFixed(2)}MB / {(Block.total / 1024).toFixed(2)}MB</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    FCB: state.FCB,
    Block: state.Block
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...FCBActions,
    ...BlockActions
  }
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
