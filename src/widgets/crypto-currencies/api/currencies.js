export default {
  getPreferredCurrency(addon, cb) {
    addon.requestAPI('users/me', {
      success: response => cb(response.preferences.currency.toUpperCase()),
      error: () => cb('USD')
    });
  }
}
