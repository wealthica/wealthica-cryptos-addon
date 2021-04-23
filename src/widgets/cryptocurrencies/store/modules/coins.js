import async from "async";
import moment from "moment";
import * as _ from "lodash";
import frcaLocale from "moment/locale/fr-ca";

import cryptoAPI from "../../api/crypto";
import * as types from "../mutation-types";
import * as constants from "../../constants";

// initial state
const initialState = {
  allCoins: [],
  activeCoins: [],
  activeCoinSymbols: [],
  updateTime: "",
  prices: {}
};

// getters
const moduleGetters = {
  allCoins: state => state.allCoins,
  activeCoins: state => state.activeCoins,
  activeCoinSymbols: state => state.activeCoinSymbols,
  updateTime: state => state.updateTime,
  prices: state => state.prices
};

// actions
const actions = {
  getCoinsList({ dispatch, commit, rootGetters, getters }) {
    return new Promise((resolve, reject) => {
      cryptoAPI
        .getCoinList()
        .then(coins => {
          commit(types.RECEIVE_COINS_LIST, { coins });
          commit(types.SET_UPDATE_TIME, { momentLocale: rootGetters.momentLocale });

          if (getters.activeCoinSymbols.length) {
            const activeCoins = coins.filter(x => getters.activeCoinSymbols.indexOf(x.Symbol) > -1);
            commit(types.UPDATE_ACTIVE_COINS, { activeCoins });
          } else {
            dispatch("setDefaultActiveCoins");
          }

          resolve(coins);
        })
        .catch(err => reject(err));
    });
  },

  updateActiveCoinSymbols({ dispatch, commit, getters }, symbols = []) {
    if (!symbols.length) return dispatch("setDefaultActiveCoins");

    const activeCoins = getters.allCoins.filter(x => symbols.indexOf(x.Symbol) > -1);
    commit(types.UPDATE_ACTIVE_COIN_SYMBOLS, { symbols });
    return commit(types.UPDATE_ACTIVE_COINS, { activeCoins });
  },

  setDefaultActiveCoins({ commit, getters }) {
    // Defaults to 2 pages
    const activeCoins = getters.allCoins.slice(0, constants.COINS_PER_PAGE * 2);
    const symbols = activeCoins.map(x => x.Symbol);
    commit(types.UPDATE_ACTIVE_COIN_SYMBOLS, { symbols });
    commit(types.UPDATE_ACTIVE_COINS, { activeCoins });
  },

  getActiveCoinPrices({ dispatch, commit, rootGetters, getters }) {
    async.waterfall(
      [
        // Get preferred currency
        cb => {
          if (rootGetters.preferredCurrency) return cb(null, rootGetters.preferredCurrency);

          return dispatch("getPreferredCurrency", null, { root: true }).then(currency => {
            cb(null, currency);
          });
        },

        (currency, cb) => {
          const coinsToGet = getters.activeCoinSymbols.filter(symbol =>
            _.isEmpty(getters.prices[symbol])
          );

          cryptoAPI
            .getCoinPrice({
              coins: coinsToGet,
              currencies: [currency]
            })
            .then(prices => cb(null, prices))
            .catch(err => cb(err));
        }
      ],
      (err, prices) => {
        if (err) return commit(types.UPDATE_COIN_PRICES, { prices: {} });

        commit(types.UPDATE_COIN_PRICES, { prices });
        return commit(types.SET_UPDATE_TIME, { momentLocale: rootGetters.momentLocale });
      }
    );
  }
};

// mutations
const mutations = {
  [types.UPDATE_COIN_PRICES](state, { prices }) {
    state.prices = _.extend({}, state.prices, prices);
  },

  [types.UPDATE_ACTIVE_COINS](state, { activeCoins }) {
    state.activeCoins = activeCoins;
  },

  [types.UPDATE_ACTIVE_COIN_SYMBOLS](state, { symbols }) {
    state.activeCoinSymbols = symbols;
  },

  [types.RECEIVE_COINS_LIST](state, { coins }) {
    state.allCoins = coins.sort((a, b) => a.SortOrder - b.SortOrder);
  },

  [types.SET_UPDATE_TIME](state, { momentLocale }) {
    moment.locale(momentLocale, frcaLocale);
    state.updateTime = moment().calendar();
  }
};

export default {
  state: initialState,
  getters: moduleGetters,
  actions,
  mutations
};
