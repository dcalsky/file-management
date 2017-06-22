import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import FCB from './FCB'
import Block from './Block'

const rootReducer = combineReducers({
  FCB,
  Block
});

export default rootReducer;
