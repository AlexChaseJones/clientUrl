import {
  USER_LOGIN_FETCHING,
	USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  error: null,
  fetching: false,
  loggedIn: false,
  user: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        fetching: false,
        loggedIn: true
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    case USER_LOGIN_FETCHING:
      return {
        ...state,
        error: null,
        fetching: true
      };
    default:
      return state;
	}
}
