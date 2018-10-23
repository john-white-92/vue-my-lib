import axios from 'axios';
import SITE_URL from '@/api/url';

const HTTP = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${SITE_URL}/`,
  // or use "cors-anywhere" lib
  // baseURL: `http://127.0.0.1:8080/${SITE_URL}/`,
});
export default HTTP;
