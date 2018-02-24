import cryptoAPI from '../../api/crypto';
import * as types from '../mutation-types';
import async from 'async';
import moment from 'moment';
import frcaLocale from 'moment/locale/fr-ca';

// initial state
const state = {
  top: [],
  updateTime: '',
};

// getters
const getters = {
  topCoins: state => state.top,
  updateTime: state => state.updateTime
};

// actions
const actions = {
  getTopCoins ({ dispatch, commit, rootGetters }, numCoins) {
    async.waterfall([

      // Get top coins list & preferred currency
      (callback) => {
        async.parallel({
          topCoins (cb) {
            cryptoAPI.getCoinList({
              success (coins) {
                console.log('getCoinList success, addon config:', rootGetters.config);

                let top = coins.sort((a, b) => {
                  return a.SortOrder - b.SortOrder;
                }).slice(0, numCoins);

                top.forEach(coin => {
                  coin.prices = {};
                });

                // Commit so widget can display the coins right away without
                // having to wait for exchange rates to be available.
                commit(types.RECEIVE_TOP_COIN_LIST, { coins: top, rootGetters });

                cb(null, top);
              },
              error (err) {
                cb(err);
              }
            });
          },
          preferredCurrency (cb) {
            dispatch('getPreferredCurrency', null, { root: true }).then((currency) => {
              cb(null, currency);
            });
          }
        }, (err, data) => {
          callback(err, data);
        });
      },

      // Get exchange rates at the start & end of dashboard period
      (data, callback) => {
        cryptoAPI.getCoinPrice({
          coins: data.topCoins.map(x => x.Symbol),
          currencies: [data.preferredCurrency],
          success (prices) {
            data.topCoins.forEach(coin => {
              coin.prices = prices[coin.Symbol];
            });

            commit(types.RECEIVE_TOP_COIN_LIST, { coins: data.topCoins, rootGetters });
            callback(null, prices);
          },
          error (err) {
            callback(err);
          }
        });
      }
    ], (err, data) => {
      if (err) commit(types.RECEIVE_TOP_COIN_LIST, { coins: [], rootGetters });
    });
  }
};

// mutations
const mutations = {
  [types.RECEIVE_TOP_COIN_LIST] (state, { coins, rootGetters }) {
    state.top = coins;

    moment.locale(rootGetters.momentLocale, frcaLocale);
    state.updateTime = moment().calendar();
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
