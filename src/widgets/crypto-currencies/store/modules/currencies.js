import currenciesAPI from '../../api/currencies';
import * as types from '../mutation-types';

// initial state
const state = {
  preferred: ''
};

// getters
const getters = {
  preferredCurrency: state => state.preferred
};

// actions
const actions = {
  getPreferredCurrency ({ commit }) {
    return new Promise((resolve, reject) => {
      currenciesAPI.getPreferredCurrency(currency => {
        commit(types.RECEIVE_PREFERRED_CURRENCY, { currency: currency });
        resolve(currency);
      });
    });
  }
};

// mutations
const mutations = {
  [types.RECEIVE_PREFERRED_CURRENCY] (state, { currency }) {
    state.preferred = currency;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
