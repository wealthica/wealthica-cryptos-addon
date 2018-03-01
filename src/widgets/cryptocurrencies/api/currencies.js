export default {
  getPreferredCurrency(addon, { success }) {
    addon.request({
      method: 'GET',
      endpoint: 'currencies',
      success: response => {
        let preferred = response.find(x => x.preferred);
        success(preferred._id.toUpperCase());
      },
      error: () => success('USD')
    });
  }
}
