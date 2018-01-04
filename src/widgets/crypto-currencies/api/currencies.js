import Addon from '../addon';

let addon = new Addon();
const getWealthicaAPI = (endpoint, { query, success, error }) => {
  addon.channel.call({
    method: 'request',
    params: {
      method: 'GET',
      endpoint,
      query,
    },
    success,
    error,
  });
}

export default {
  getPreferredCurrency(cb) {
    getWealthicaAPI('users/me', {
      success: response => cb(response.preferences.currency.toUpperCase()),
      error: () => cb('USD')
    });
  }
}
