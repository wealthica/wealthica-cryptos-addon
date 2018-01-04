import cryptoAPI from '../../api/crypto';
import * as types from '../mutation-types';

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
  getTopCoins ({ dispatch, commit }) {
    cryptoAPI.getCoinList((err, coins) => {
      if (err) return commit(types.RECEIVE_COIN_LIST, { coins: [] });

      let top = coins.sort((a, b) => {
        return a.SortOrder - b.SortOrder;
      }).slice(0, 3);

      dispatch('getPreferredCurrency', null, { root: true }).then((currency) => {
        cryptoAPI.getCoinPrice(top.map(x => x.Symbol), [currency], (err, prices) => {
          top.forEach(coin => {
            coin.prices = prices[coin.Symbol];
          });

          commit(types.RECEIVE_COIN_LIST, { coins: top });
        });
      });
    });
  }
};

// mutations
const mutations = {
  [types.RECEIVE_COIN_LIST] (state, { coins }) {
    state.top = coins;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
