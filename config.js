/* eslint-disable quotes */
export const BASE_URL = 'http://localhost:3000/';
export const VISTAR_LOGIN_CREDENTIALS = {
  email: process.env.VISTAR_EMAIL,
  password: process.env.VISTAR_PASSWORD
};
export const DASHBOARD_BASE_URL = 'https://campaigns.intersection.com/#/app/';

export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "clienturl.firebaseapp.com",
  databaseURL: "https://clienturl.firebaseio.com",
  projectId: "clienturl",
  storageBucket: "clienturl.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID
};
