import cryptoAPI from '../../api/crypto';
import * as types from '../mutation-types';
import * as constants from '../../constants';
import async from 'async';
import moment from 'moment';
import frcaLocale from 'moment/locale/fr-ca';

// initial state
const state = {
  allCoins: [],
  topCoins: [],
  updateTime: '',
};

// getters
const getters = {
  allCoins: state => state.allCoins,
  topCoins: state => state.topCoins,
  updateTime: state => state.updateTime,
};

// actions
const actions = {
  getCoinsList ({ dispatch, commit, rootGetters, getters }) {
    console.log('getCoinsList');
    return new Promise((resolve, reject) => {
      cryptoAPI.getCoinList({
        success (coins) {
          console.log('getCoinsList success', coins);
          coins.forEach(coin => {
            coin.prices = {};
          })

          // Commit so widget can display the coins right away without
          // having to wait for exchange rates to be available.
          commit(types.RECEIVE_COINS_LIST, { coins });
          commit(types.SET_UPDATE_TIME, { momentLocale: rootGetters.momentLocale });

          resolve(coins);
        },
        error (err) {
          reject(err);
        }
      });
    });
  },

  getTopCoins ({ dispatch, commit, rootGetters, getters }) {
    async.auto({

    // Get top coins list
    topCoins (cb) {
      dispatch('getCoinsList').then(() => {
        console.log('topCoins async', getters.topCoins);
        cb(null, getters.topCoins);
      }).catch(() => {
        cb(err);
      });
    },

    // Get preferred currency
    preferredCurrency (cb) {
      dispatch('getPreferredCurrency', null, { root: true }).then((currency) => {
        cb(null, currency);
      });
    },

    topCoinsPrices: ['topCoins', 'preferredCurrency', (results, cb) => {
      cryptoAPI.getCoinPrice({
        coins: results.topCoins.map(x => x.Symbol),
        currencies: [results.preferredCurrency],
        success (prices) {
          commit(types.UPDATE_TOP_COIN_PRICES, { prices });
          commit(types.SET_UPDATE_TIME, { momentLocale: rootGetters.momentLocale });

          cb(null, prices);
        },
        error (err) {
          cb(err);
        }
      });
    }],

    }, (err, results) => {
      if (err) commit(types.UPDATE_TOP_COIN_PRICES, { prices: [] });
    });
  }
};

// mutations
const mutations = {
  [types.UPDATE_TOP_COIN_PRICES] (state, { prices }) {
    state.topCoins.forEach(coin => {
      coin.prices = prices[coin.Symbol];
    });
  },

  [types.RECEIVE_COINS_LIST] (state, { coins }) {
    state.allCoins = coins.sort((a, b) => {
      return a.SortOrder - b.SortOrder;
    });

    // TODO get topcoins list from widget config if available
    let numCoins = constants.MAX_ACTIVE_COINS;
    state.topCoins = state.allCoins.slice(0, numCoins);
  },

  [types.SET_UPDATE_TIME] (state, { momentLocale }) {
    moment.locale(momentLocale, frcaLocale);
    state.updateTime = moment().calendar();
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
