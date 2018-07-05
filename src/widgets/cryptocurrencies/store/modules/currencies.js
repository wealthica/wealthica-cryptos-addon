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
  getPreferredCurrency ({ commit, rootGetters }) {
    return new Promise((resolve, reject) => {
      let storeCurrency = (currency) => {
        commit(types.RECEIVE_PREFERRED_CURRENCY, { currency: currency });
        resolve(currency);
      }

      rootGetters.addon.api.getCurrencies().then(currencies => {
        let preferred = currencies.find(x => x.preferred);
        storeCurrency(preferred._id.toUpperCase());
      }).catch(() => {
        storeCurrency('CAD');
      })
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
