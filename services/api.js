import axios from 'axios';
import md5 from 'js-md5';

const ts = Math.floor(Date.now() / 1000);
const publicKey = process.env.PUBLIC_KEY;
const privatecKey = process.env.PRIVATE_KEY;
const hash = md5(`${ts}${privatecKey}${publicKey}`);

const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
  params: { ts, apikey: publicKey, hash, limit: 24 },
});

export default api;
