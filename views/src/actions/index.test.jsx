import * as actions from './index';
import * as types from './types';
import { DASHBOARD_BASE_URL } from '../../../config';

describe('actions', () => {
  it('should create an action to change the client name input', () => {
    const payload = 'ClientName';
    const expectedAction = {
      type: types.CLIENT_NAME_CHANGE,
      payload
    };
    expect(actions.clientNameChange(payload)).toEqual(expectedAction);
  });

  it('should create an action to change the campaign name input', () => {
    const payload = 'CampaignName';
    const expectedAction = {
      type: types.CAMPAIGN_NAME_CHANGE,
      payload
    };
    expect(actions.campaignNameChange(payload)).toEqual(expectedAction);
  });

  describe('creating a url', () => {
    it('should create an action if only a client is specified', () => {
      const clientId = '12345';
      const payload = `${DASHBOARD_BASE_URL}${clientId}`;
      const expectedAction = {
        type: types.UPDATE_URL,
        payload
      };
      expect(actions.generateUrl(clientId)).toEqual(expectedAction);
    });

    it('should create an action if a client and campaign is specified', () => {
      const clientId = '12345';
      const campaignId = '67890';
      const payload = `${DASHBOARD_BASE_URL}${clientId}${campaignId ?
        `/${campaignId}/insights/grid` : ''}`;
      const expectedAction = {
        type: types.UPDATE_URL,
        payload
      };
      expect(actions.generateUrl(clientId, campaignId)).toEqual(expectedAction);
    });
  });
});
