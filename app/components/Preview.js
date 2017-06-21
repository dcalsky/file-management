/**
 * Created by Dcalsky on 2017/6/20.
 */

import React, {Component} from 'react'
import file from '../static/file.png'
import folder from '../static/folder.png'
import './Preview.scss'

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      content: null
    }
  }
  toggleEditFileMode = () => {
    this.setState({
      editMode: !this.state.editMode,
      content: null
    })
  }
  saveFile = () => {

  }
  editFile = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  renderEditMode = () => {
    return (
      <div className="preview" style={{padding: 0}}>
        <textarea className="editor" onChange={this.editFile}/>
        <div className="group">
          <button onClick={this.toggleEditFileMode}>放弃</button>
          <button>保存</button>
        </div>
      </div>
    )
  }
  render() {
    const {path, items, currentFCB} = this.props.FCB
    const FCB = items[currentFCB]
    const pathFCBS = path.map((id) => {
      return items[id]
    })
    if (this.state.editMode) {
      return this.renderEditMode()
    }
    return(
      <div className="preview" style={{padding: 20}}>
        <p className="path">
          <i className="fa fa-home"/>
          {pathFCBS.map((fcb) => {
            return (
              <span key={fcb.id}>{fcb.name}/</span>
            )
          })}
        </p>
        <p className="time">
          Created: {FCB.createTime.getTime()}
        </p>
        <div className="img">
          <img src={FCB.type === 'file' ? file : folder} alt=""/>
        </div>
        <div className="info">
          <p>Name: {FCB.name || 'Root'}</p>
          <p>Type: {FCB.type === 'file' ? '文件' : '文件夹'}</p>
          <p>Size: {FCB.size}</p>
          {
            FCB.type === 'dir' ?
              <p>Children count: {FCB.children.length}</p>
              :
              null
          }

        </div>
        {
          FCB.type === 'file' ?
            <div className="action">
              <button onClick={this.toggleEditFileMode}>编辑文件</button>
            </div>
            :
            null
        }

      </div>
    )
  }
}
