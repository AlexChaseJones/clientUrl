import { combineReducers } from 'redux';
import clientUrl from './clientUrlReducer';
import user from './userReducer';

export default combineReducers({
  user,
  clientUrl
});
