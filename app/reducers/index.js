// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import FCB from './FCB'

const rootReducer = combineReducers({
  FCB,
  router,
});

export default rootReducer;
