import { combineReducers } from 'redux';

import { reducer as authReducer } from './auth';
import { reducer as crudReducer } from './crud';
import { reducer as settingsReducer } from './settings';
import { reducer as notifyReducer } from './notify';

import * as actionTypes from './auth/types';

// Combine all reducers.

const appReducer = combineReducers({
  auth: authReducer,
  notify: notifyReducer,
  crud: crudReducer,
  settings: settingsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
