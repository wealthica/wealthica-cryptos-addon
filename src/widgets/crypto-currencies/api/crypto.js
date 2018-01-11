import axios from 'axios';
import async from 'async';

export default {
  getCoinList ({ success, error }) {
    axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(response => success(Object.values(response.data.Data)))
      .catch(err => error(err));
  },

  getCoinPrice ({ coins, currencies, success, error }) {
    axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins.join(',')}&tsyms=${currencies.join(',')}`)
      .then(response => success(response.data['RAW']))
      .catch(err => error(err));
  }
}
