import cryptoAPI from '../../api/crypto';
import * as types from '../mutation-types';
import moment from 'moment';
import async from 'async';

// initial state
const state = {
  top: []
};

// getters
const getters = {
  topCoins: state => state.top
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
                let top = coins.sort((a, b) => {
                  return a.SortOrder - b.SortOrder;
                }).slice(0, numCoins);

                top.forEach(coin => {
                  coin.prices = { from: {}, to: {} };
                });

                // Commit so widget can display the coins right away without
                // having to wait for exchange rates to be available.
                commit(types.RECEIVE_TOP_COIN_LIST, { coins: top });
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
        async.parallel({
          startRates (cb) {
            cryptoAPI.getCoinPriceEOD({
              coins: data.topCoins.map(x => x.Symbol),
              currencies: [data.preferredCurrency],
              timestamp: moment(rootGetters.dateFilter.from, 'YYYY-MM-DD').unix(),
              success (prices) {
                data.topCoins.forEach(coin => {
                  coin.prices = coin.prices || {};
                  coin.prices.from = prices[coin.Symbol];
                });

                commit(types.RECEIVE_TOP_COIN_LIST, { coins: data.topCoins });
                cb(null, prices);
              },
              error (err) {
                cb(err);
              }
            });
          },
          endRates (cb) {
            cryptoAPI.getCoinPrice({
              coins: data.topCoins.map(x => x.Symbol),
              currencies: [data.preferredCurrency],
              success (prices) {
                data.topCoins.forEach(coin => {
                  coin.prices = coin.prices || {};
                  coin.prices.to = prices[coin.Symbol];
                });

                commit(types.RECEIVE_TOP_COIN_LIST, { coins: data.topCoins });
                cb(null, prices);
              },
              error (err) {
                cb(err);
              }
            });
          }
        }, (err, results) => {
          callback(err, data);
        });
      }
    ], (err, data) => {
      if (err) commit(types.RECEIVE_TOP_COIN_LIST, { coins: [] });
    });
  }
};

// mutations
const mutations = {
  [types.RECEIVE_TOP_COIN_LIST] (state, { coins }) {
    state.top = coins;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
