export default {
  getPreferredCurrency(addon, { success }) {
    addon.request({
      method: 'GET',
      endpoint: 'users/me',
      success: response => success(response.preferences.currency.toUpperCase()),
      error: () => success('USD')
    });
  }
}
