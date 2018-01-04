import axios from "axios";

export default {
  getCoinList (cb) {
    axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(response => cb(null, Object.values(response.data.Data)))
      .catch(error => cb(error));
  },

  getCoinPrice (coins, currencies, cb) {
    axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins.join(',')}&tsyms=${currencies.join(',')}`)
      .then(response => cb(null, response.data))
      .catch(error => cb(error));
  }
}
