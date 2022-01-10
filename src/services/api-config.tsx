import axios from 'axios';
import {BASE_URL} from './urls';
import {setupCache} from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 0 * 60 * 1000,
});

const Axios = axios.create({
  adapter: cache.adapter,
  baseURL: BASE_URL,
  timeout: 30000,
});

export default Axios;
