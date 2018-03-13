import { Promise } from 'es6-promise';

export default {
  getPreferredCurrency(addon) {
    return new Promise((resolve, reject) => {
      addon.request({
        method: 'GET',
        endpoint: 'currencies'
      }).then(response => {
        let preferred = response.find(x => x.preferred);
        resolve(preferred._id.toUpperCase());
      }).catch(() => resolve('USD'));
    });
  }
}
