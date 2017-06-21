'use strict'

import im from 'immutable'

import {ADD, REMOVE, ENTER, BACK} from '../actions/FCB'

export default function FCB(state, action) {
  const imState = im.Map(state)
  const path = imState.get('path')
  switch (action.type) {
    case BACK:
      path.pop()
      return {
        ...state,
        currentDir: path[path.length - 1],
        path
      }
      break
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
        size: 0
      }

      //add new FCB index to its parent
      parentFCBChildren.push({
        name: newFCB.name,
        id: newFCB.id
      })
      // add new FCB to FCBS
      items.push(newFCB)
      return imState.set('items', items).toJS()
      break
    case REMOVE:
      return imState.set('items', imState.get('items').splice(action.id, action.id + 1))
    case ENTER:
      const fcb = state.items[action.id]
      if (path[path.length - 1] !== action.id) {
        path.push(action.id)
      }
      if (fcb.type === 'file') {
        return {
          ...state,
          currentFile: action.id,
          path
        }
      } else {
        return {
          ...state,
          currentDir: action.id,
          path
        }
      }
      break
    default:
      return {
        currentDir: 0,
        currentFile: null,
        path: [0],
        items: [{
          id: 0,
          size: 0,
          type: 'dir',
          children: []
        }]
      }
  }
}
