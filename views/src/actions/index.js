import axios from 'axios';

import { BASE_URL, DASHBOARD_BASE_URL } from '../../../config';
import {
  CLIENT_NAME_CHANGE,
  CAMPAIGN_NAME_CHANGE,
  CLIENT_DATA_FETCHING,
  SET_CLIENT_DATA,
  SET_CAMPAIGN_DATA,
  CAMPAIGN_DATA_FETCHING,
  UPDATE_URL
} from './types';

export const clientNameChange = text => ({
  type: CLIENT_NAME_CHANGE,
  payload: text
});

export const campaignNameChange = text => ({
  type: CAMPAIGN_NAME_CHANGE,
  payload: text
});

export const getClientData = () => async dispatch => {
  dispatch({
    type: CLIENT_DATA_FETCHING
  });
    try {
      let { data } = await axios.get(`${BASE_URL}api/clients`);
      dispatch({
        type: SET_CLIENT_DATA,
        payload: data
      });
    } catch (err) {
      console.log(err);
    }
};

export const getCampaignData = clientId => async dispatch => {
  dispatch({
    type: CAMPAIGN_DATA_FETCHING
  });
  try {
    let { data } = await axios.get(`${BASE_URL}api/campaigns/${clientId}`);
    dispatch({
      type: SET_CAMPAIGN_DATA,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const generateUrl = (clientId, campaignId) => {
  const url = `${DASHBOARD_BASE_URL}${clientId}${campaignId ? `/${campaignId}/insights/grid` : ''}`;
  return ({
    type: UPDATE_URL,
    payload: url
  });
};
