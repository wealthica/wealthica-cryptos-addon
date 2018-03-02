import cryptoAPI from '../../api/crypto';
import * as types from '../mutation-types';
import * as constants from '../../constants';
import async from 'async';
import moment from 'moment';
import frcaLocale from 'moment/locale/fr-ca';

// initial state
const state = {
  allCoins: [],
  activeCoins: [],
  activeCoinSymbols: [],
  updateTime: '',
  prices: {},
};

// getters
const getters = {
  allCoins: state => state.allCoins,
  activeCoins: state => state.activeCoins,
  activeCoinSymbols: state => state.activeCoinSymbols,
  updateTime: state => state.updateTime,
  prices: state => state.prices,
};

// actions
const actions = {
  getCoinsList ({ dispatch, commit, rootGetters, getters }) {
    return new Promise((resolve, reject) => {
      cryptoAPI.getCoinList({
        success (coins) {
          commit(types.RECEIVE_COINS_LIST, { coins });
          commit(types.SET_UPDATE_TIME, { momentLocale: rootGetters.momentLocale });

          if (getters.activeCoinSymbols.length) {
            let activeCoins = coins.filter(x => getters.activeCoinSymbols.indexOf(x.Symbol) > -1);
            commit(types.UPDATE_ACTIVE_COINS, { activeCoins });
          } else {
            dispatch('setDefaultActiveCoins');
          }

          resolve(coins);
        },
        error (err) {
          reject(err);
        }
      });
    });
  },

  updateActiveCoinSymbols ({ dispatch, commit, rootGetters, getters }, symbols=[]) {
    let activeCoins;
    if (!symbols.length) return dispatch('setDefaultActiveCoins');

    activeCoins = getters.allCoins.filter(x => symbols.indexOf(x.Symbol) > -1);
    commit(types.UPDATE_ACTIVE_COIN_SYMBOLS, { symbols });
    commit(types.UPDATE_ACTIVE_COINS, { activeCoins });
  },

  setDefaultActiveCoins ({ commit, getters }) {
    // Defaults to 2 pages
    let activeCoins = getters.allCoins.slice(0, constants.COINS_PER_PAGE * 2);
    let symbols = activeCoins.map(x => x.Symbol);
    commit(types.UPDATE_ACTIVE_COIN_SYMBOLS, { symbols });
    commit(types.UPDATE_ACTIVE_COINS, { activeCoins });
  },

  getActiveCoinPrices ({ dispatch, commit, rootGetters, getters }) {
    async.waterfall([

    // Get preferred currency
    (cb) => {
      if (rootGetters.preferredCurrency) return cb(null, rootGetters.preferredCurrency);

      dispatch('getPreferredCurrency', null, { root: true }).then((currency) => {
        cb(null, currency);
      });
    },

    (currency, cb) => {
      let coinsToGet = getters.activeCoinSymbols.filter(symbol => {
        return _.isEmpty(getters.prices[symbol]);
      });

      cryptoAPI.getCoinPrice({
        coins: coinsToGet,
        currencies: [currency],
        success (prices) { cb(null, prices) },
        error (err) { cb(err) }
      });
    },

  ], (err, prices) => {
      if (err) return commit(types.UPDATE_COIN_PRICES, { prices: {} });

      commit(types.UPDATE_COIN_PRICES, { prices });
      commit(types.SET_UPDATE_TIME, { momentLocale: rootGetters.momentLocale });
    });
  }
};

// mutations
const mutations = {
  [types.UPDATE_COIN_PRICES] (state, { prices }) {
    state.prices = _.extend({}, state.prices, prices);
  },

  [types.UPDATE_ACTIVE_COINS] (state, { activeCoins }) {
    state.activeCoins = activeCoins;
  },

  [types.UPDATE_ACTIVE_COIN_SYMBOLS] (state, { symbols }) {
    state.activeCoinSymbols = symbols;
  },

  [types.RECEIVE_COINS_LIST] (state, { coins }) {
    state.allCoins = coins.sort((a, b) => {
      return a.SortOrder - b.SortOrder;
    });
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
