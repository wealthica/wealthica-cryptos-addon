import WealthicaAddon from '../../../../wealthica-addon-core/src';

let instance = null;

export default class Addon {
  constructor () {
    if (!instance) {
      instance = new WealthicaAddon({
        scope: 'wealthica-cryptos-addon/widgets/crypto-currencies'
      });
    }

    this.instance = instance;
  }

  requestAPI (endpoint, { query, success, error }) {
    this.instance.channel.call({
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
}
