export default {
  getPreferredCurrency(addon, cb) {
    addon.request({
      method: 'GET',
      endpoint: 'users/me',
      success: response => cb(response.preferences.currency.toUpperCase()),
      error: () => cb('USD')
    });
  }
}
