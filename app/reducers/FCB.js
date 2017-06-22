'use strict'

import im from 'immutable'

import {ADD, REMOVE, ENTER, BACK, ADD_BLOCK} from '../actions/FCB'

function getInitialState() {
  const state = JSON.parse(localStorage.getItem('FCB'))
  if (state) {
    return state
  } else {
    return {
      currentFCB: 0,
      path: [0],
      items: [{
        id: 0,
        size: 0,
        type: 'dir',
        blockId: null,
        children: [],
        name: '',
        createTime: (new Date()).toTimeString()
      }]
    }
  }
}

function saveState(state) {
  window.localStorage.setItem('FCB', JSON.stringify(state))
}

export default function FCB(state = getInitialState(), action) {
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
    case ADD: {
      let items = imState.get('items')
      const
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
        createTime: (new Date()).toTimeString()
      }

      //add new FCB index to its parent
      parentFCBChildren.push({
        name: newFCB.name,
        id: newFCB.id
      })
      // add new FCB to FCBS
      items.push(newFCB)
      const newState = imState.set('items', items).toJS()
      saveState(newState)
      return newState
    }
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
    case ADD_BLOCK: {
      let items = imState.get('items')
      items[action.FCBId].blockId = action.blockId
      const newState = {
        ...state,
        items
      }
      saveState(newState)
      return newState
    }
    default:
      return state
  }
}
