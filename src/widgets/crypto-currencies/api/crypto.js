import axios from 'axios';
import async from 'async';

export default {
  getCoinList ({ success, error }) {
    axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(response => success(Object.values(response.data.Data)))
      .catch(err => error(err));
  },

  getCoinPrice ({ coins, currencies, success, error }) {
    axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins.join(',')}&tsyms=${currencies.join(',')}`)
      .then(response => success(response.data))
      .catch(err => error(err));
  },

  getCoinPriceEOD ({ coins, currencies, timestamp, success, error }) {
    async.map(coins, (coin, callback) => {
      axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coin}&tsyms=${currencies.join(',')}&ts=${timestamp}`)
        .then(response => callback(null, response.data))
        .catch(err => callback(err));
    }, (err, results) => {
      if (err) return error(err);

      let prices = results.reduce((result, price) => {
        return Object.assign(result, price);
      }, {});

      success(prices);
    })
  }
}
