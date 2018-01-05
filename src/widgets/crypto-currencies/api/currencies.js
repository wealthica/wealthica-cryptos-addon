import Addon from '../addon';

let addon = new Addon();

export default {
  getPreferredCurrency(cb) {
    addon.requestAPI('users/me', {
      success: response => cb(response.preferences.currency.toUpperCase()),
      error: () => cb('USD')
    });
  }
}
