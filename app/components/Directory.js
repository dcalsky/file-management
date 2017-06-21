/**
 * Created by Dcalsky on 2017/6/20.
 */

import React, {Component} from 'react'
import './Directory.scss'

export default class Directory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDir: null,
      currentFile: null
    }
  }
  selectDirectory(id) {
    console.log(id)
    this.props.enter(id)
  }
  selectFile(id) {
    this.setState({
      currentFile: id
    })
  }
  render() {
    const { name, size, currentDir, items, path } = this.props.FCB
    const FCB = this.props.FCB.items[currentDir]
    const currentItems = FCB.children.map((FCB) => {
      return items[FCB.id]
    })
    return (
      <div className="dir">
        <ul>
          {
            currentDir !== 0 ?
              <li onClick={this.props.back}>
                <i className="fa fa-folder" aria-hidden="true" /><span>..</span>
              </li>
              :
              null
          }
          {currentItems.map((item) => {
            if (item.type === 'file') {
              return (
                <li key={item.id} onClick={this.selectFile.bind(this, item.id)} className={this.state.currentFile === item.id ? 'active' : ''}>
                  <i className="fa fa-file" aria-hidden="true" /><span>{item.name}</span>
                </li>
              )
            } else {
              return (
                <li key={item.id} onClick={this.selectDirectory.bind(this, item.id)}>
                  <i className="fa fa-folder" aria-hidden="true" /><span>{item.name}</span>
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}
