import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import FCB from './FCB'

const rootReducer = combineReducers({
  FCB,
});

export default rootReducer;
