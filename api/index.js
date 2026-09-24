import storeHandler from '../netlify/functions/api.mjs';

export default {
  async fetch(request) {
    const forwarded=request.headers.get('x-forwarded-for')||request.headers.get('x-real-ip')||'unknown';
    return storeHandler(request,{ip:forwarded.split(',')[0].trim()});
  }
};
