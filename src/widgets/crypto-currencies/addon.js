import WealthicaAddon from '../../../../wealthica-addon-core/src';

let instance = null;

export default class Addon {
  constructor () {
    if (!instance) {
      instance = new WealthicaAddon({
        scope: 'wealthica-cryptos-addon/widgets/crypto-currencies'
      });
    }

    return instance;
  }
}
