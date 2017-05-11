import {
  CLIENT_NAME_CHANGE,
  CAMPAIGN_NAME_CHANGE,
  SET_CLIENT_DATA,
  CLIENT_DATA_FETCHING,
  SET_CAMPAIGN_DATA,
  CAMPAIGN_DATA_FETCHING,
  UPDATE_URL
} from '../actions/types';

const INITIAL_STATE = {
  clientName: '',
  campaignName: '',
  clientData: {},
  campaignData: {},
  clientFetching: true,
  campaignFetching: false,
  noClientMatch: true,
  url: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLIENT_NAME_CHANGE:
      return {
        ...state,
        noClientMatch: true,
        campaignName: '',
        url: '',
        clientName: action.payload
      };
    case CAMPAIGN_NAME_CHANGE:
      return {
        ...state,
        url: '',
        campaignName: action.payload
      };
    case SET_CLIENT_DATA:
      return {
        ...state,
        clientData: action.payload,
        clientFetching: false
      };
    case CLIENT_DATA_FETCHING:
      return {
        ...state,
        clientFetching: true
      };
    case SET_CAMPAIGN_DATA:
      return {
        ...state,
        campaignFetching: false,
        campaignData: action.payload
      };
    case CAMPAIGN_DATA_FETCHING:
      return {
        ...state,
        noClientMatch: false,
        campaignFetching: true
      };
    case UPDATE_URL:
      return {
        ...state,
        url: action.payload
      };
    default:
      return state;
  }
}
