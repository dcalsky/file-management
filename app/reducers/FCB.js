'use strict'

import im from 'immutable'

import {ADD, REMOVE, ENTER, BACK} from '../actions/FCB'

export default function FCB(state, action) {
  const imState = im.Map(state)
  const path = imState.get('path')
  switch (action.type) {
    case BACK:
      if (state.items[path[path.length - 1]].type === 'file') {
        path.pop()
      }
      path.pop()
      return {
        ...state,
        currentFCB: path[path.length - 1],
        path
      }
    case ADD:
      const items = imState.get('items'),
        parentFCB = items[action.parentId],
        parentFCBChildren = parentFCB.children

      const result = parentFCBChildren.find((item) => {
        return item.name === action.name
      })
      if (result) return state

      const newFCB = {
        name: action.name,
        id: state.items.length,
        type: action.FCBType,
        children: [],
        size: 0,
        createTime: new Date()
      }

      //add new FCB index to its parent
      parentFCBChildren.push({
        name: newFCB.name,
        id: newFCB.id
      })
      // add new FCB to FCBS
      items.push(newFCB)
      return imState.set('items', items).toJS()
    case REMOVE:
      return imState.set('items', imState.get('items').splice(action.id, action.id + 1))
    case ENTER:
      const fcb = state.items[action.id]
      if (state.items[path[path.length - 1]].type === 'file') {
        path[path.length - 1] = action.id
      }
      if (path[path.length - 1] !== action.id) {
        path.push(action.id)
      }
      return {
        ...state,
        currentFCB: action.id,
        path
      }
    default:
      return {
        currentFCB: 0,
        path: [0],
        items: [{
          id: 0,
          size: 0,
          type: 'dir',
          children: [],
          name: '',
          createTime: new Date()
        }]
      }
  }
}
