/**
 * Created by Dcalsky on 2017/6/20.
 */

import React, {Component} from 'react'
import './Directory.scss'

export default class Directory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    }
  }
  selectDirectory(id) {
    this.setState({
      selected: id
    })
    this.props.enter(id)
  }
  selectFile(id) {
    this.setState({
      selected: id
    })
    this.props.enter(id)
  }
  render() {
    const { currentFCB, items, path } = this.props.FCB
    const FCB = items[currentFCB]
    let children = FCB.children
    let currentDir = currentFCB
    if (FCB.type === 'file') {
      const parentFCB = items[path[path.length - 2]]
      currentDir = parentFCB.id
      children = parentFCB.children
    }
    const currentItems = children.map((FCB) => {
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
                <li key={item.id} onClick={this.selectFile.bind(this, item.id)} className={this.state.selected === item.id ? 'active' : ''}>
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
