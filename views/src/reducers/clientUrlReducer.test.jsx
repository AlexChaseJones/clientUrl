import reducer from './clientUrlReducer';
import * as types from '../actions/types';

describe('client reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual({
      clientName: '',
      campaignName: '',
      clientData: {},
      campaignData: {},
      clientFetching: true,
      campaignFetching: false,
      noClientMatch: true,
      url: ''
    });
  });

  it('should change client name, clear url and campaign name', () => {
    expect(reducer({}, {
      type: types.CLIENT_NAME_CHANGE,
      payload: 'NEW CLIENT NAME'
    })).toEqual({
      noClientMatch: true,
      campaignName: '',
      url: '',
      clientName: 'NEW CLIENT NAME'
    });
  });

  it('should change campaign name and clear url', () => {
    expect(reducer({}, {
      type: types.CAMPAIGN_NAME_CHANGE,
      payload: 'NEW CAMPAIGN NAME'
    })).toEqual({
      campaignName: 'NEW CAMPAIGN NAME',
      url: '',
    });
  });

  it('should set client data fetching to true', () => {
    expect(reducer({}, {
      type: types.CLIENT_DATA_FETCHING
    })).toEqual({
      clientFetching: true
    });
  });

  it('should set campaign data fetching to true', () => {
    expect(reducer({}, {
      type: types.CAMPAIGN_DATA_FETCHING
    })).toEqual({
      noClientMatch: false,
      campaignFetching: true
    });
  });

  it('should store the client data and set client fetching to false', () => {
    expect(reducer({}, {
      type: types.SET_CLIENT_DATA,
      payload: [{ id: 123, name: 'CLIENT NAME' }]
    })).toEqual({
      clientData: [{ id: 123, name: 'CLIENT NAME' }],
      clientFetching: false 
    });
  });

  it('should store the campaign data and set campaign fetching to false', () => {
    expect(reducer({}, {
      type: types.SET_CAMPAIGN_DATA,
      payload: [{ id: 123, name: 'CAMPAIGN NAME' }]
    })).toEqual({
      campaignData: [{ id: 123, name: 'CAMPAIGN NAME' }],
      campaignFetching: false 
    });
  });

  it('should update the url', () => {
    expect(reducer({}, {
      type: types.UPDATE_URL,
      payload: 'https://campaigns.intersection.com/12345/67890/insights/grid'
    })).toEqual({
      url: 'https://campaigns.intersection.com/12345/67890/insights/grid'
    });
  });
});
