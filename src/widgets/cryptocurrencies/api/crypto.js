import axios from 'axios';
import async from 'async';

export default {
  getCoinList () {
    return new Promise((resolve, reject) => {
      axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
        .then(response => resolve(Object.values(response.data.Data)))
        .catch(err => reject(err));
    });
  },

  getCoinPrice ({ coins, currencies }) {
    return new Promise((resolve, reject) => {
      axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins.join(',')}&tsyms=${currencies.join(',')}`)
        .then(response => resolve(response.data['RAW']))
        .catch(err => reject(err));
    });
  }
}
