/**
 * Created by Dcalsky on 2017/6/21.
 */

import im from 'immutable'

import { SAVE } from '../actions/Block'

function findSpareBlock (blocks) {
  for (let i = 0; i < blocks.length; ++i) {
    if (!blocks[i].used) {
      return i
    }
  }
  return -1
}

function getInitialState() {
  const state = JSON.parse(localStorage.getItem('Block'))
  if (state) {
    return state
  } else {
    let initState = {
      total: 400 * 100, // 100个物理块 39MB
      occupied: 0,
      blocks: [],
      currentBlock: null
    }
    for (let i = 0; i < 100; ++i) {
      initState.blocks.push(new Block())
    }
    return initState
  }
}

function saveState(state) {
  window.localStorage.setItem('Block', JSON.stringify(state))
}

class Block {
  constructor() {
    this.size = 400 // 400 byte
    this.content = null
    this.used = false
    this.occupied = 0
  }
}

export default function block (state = getInitialState(), action) {
  const imstate = im.Map(state)
  switch (action.type) {
    case SAVE:
      const blocks = imstate.get('blocks')
      const i = findSpareBlock(blocks)
      if (i === -1) {
        alert('保存失败')
        return state
      }
      const block = blocks[i]
      block.content = action.content
      block.used = true
      block.occupied = block.content.length
      alert('保存成功')
      const newState = {
        ...state,
        blocks,
        occupied: state.occupied + block.content.length,
        currentBlock: i
      }
      saveState(newState)
      return newState
    default:
      return state
  }
}

