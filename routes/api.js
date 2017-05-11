/* eslint-disable quote-props, quotes */
import { Client } from 'node-rest-client';
import express from 'express';
import moment from 'moment';

import { VISTAR_LOGIN_CREDENTIALS } from '../config';

const client = new Client();
const apiRouter = express.Router();

let cookie;


const defaultReportParams = {
  "groups": ["campaign"],
  "metrics": [],
  "start": "2015-01-01T00:00:00-05:00",
  "timezone": "America/New_York"
};


apiRouter.get('/clients', (req, res) => {
  client.post('https://trafficking.vistarmedia.com/session/', {
    data: VISTAR_LOGIN_CREDENTIALS, 
    headers: { 
      "Content-Type": "application/json" 
    }
  }, (data, response) => {
    cookie = response.headers['set-cookie'][0];
    client.get('https://trafficking.vistarmedia.com/client/', {
      headers: { "Content-Type": "application/json", 
      "Cookie": cookie
    }
  }, (data2) => {
      res.send(data2);
    });
  });
});

apiRouter.get('/campaigns/:clientId', (req, res) => {
  const reportParams = {
    ...defaultReportParams, 
    "end": moment(new Date(), moment.ISO_8601).format(),
    "filters": { "advertiser": [req.params.clientId] }
  };
  client.post('https://trafficking.vistarmedia.com/report', {
    "data": reportParams,
    "headers": {
      "Content-Type": "application/json",
      "Cookie": cookie
    }
  }, (data) => {
    hitLineItems(data.rows.campaign, res);
  });
});

const hitLineItems = (campaigns, res) => {
  client.get('https://trafficking.vistarmedia.com/line_item/', {
      headers: { 
        "Content-Type": "application/json", 
        "Cookie": cookie
      }
    }, (data) => {
    const campaignData = [];
    for (let i = 0; i < campaigns.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (campaigns[i] === data[j].id) {
          campaignData.push({ name: data[j].name, id: data[j].id });
          i++;
          j = 0;
        }
      }
    }
    res.send(campaignData);
  });
};

export default apiRouter;
