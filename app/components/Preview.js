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
      content: ''
    }
  }
  componentWillUpdate(props) {
    if (this.props.Block.currentBlock !== props.Block.currentBlock) {
      this.props.addBlock(props.FCB.currentFCB, props.Block.currentBlock)
    }
  }
  toggleEditFileMode = () => {
    const {items, currentFCB} = this.props.FCB
    const {blocks} = this.props.Block
    const block = blocks[items[currentFCB].blockId]
    let content = block ? block.content : ''
    if (this.state.editMode) {
      this.setState({
        content: ''
      })
    } else {
      this.setState({
        content
      })
    }
    this.setState({
      editMode: !this.state.editMode,
    })
  }
  saveFile = () => {
    this.props.save(this.state.content)
    this.toggleEditFileMode()
  }
  editFile = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  renderEditMode = () => {
    return (
      <div className="preview" style={{padding: 0}}>
        <textarea className="editor" onChange={this.editFile} value={this.state.content}/>
        <div className="group">
          <button onClick={this.toggleEditFileMode}>放弃</button>
          <button onClick={this.saveFile}>保存</button>
        </div>
      </div>
    )
  }
  render() {
    const {path, items, currentFCB} = this.props.FCB
    const {blocks} = this.props.Block
    const FCB = items[currentFCB]
    let size = 0
    if (FCB.type === 'file') {
      size = blocks[FCB.blockId] ? blocks[FCB.blockId].occupied : 0
    }
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
          Created: {FCB.createTime}
        </p>
        <div className="img">
          <img src={FCB.type === 'file' ? file : folder} alt=""/>
        </div>
        <div className="info">
          <p>Name: {FCB.name || 'Root'}</p>
          <p>Type: {FCB.type === 'file' ? '文件' : '文件夹'}</p>

          {
            FCB.type === 'dir' ?
              <p>Children count: {FCB.children.length}</p>
              :
              <p>Size: {size}</p>
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
