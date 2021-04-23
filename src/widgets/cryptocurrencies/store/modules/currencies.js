import * as types from "../mutation-types";

// initial state
const initialState = {
  preferred: ""
};

// getters
const getters = {
  preferredCurrency: state => state.preferred
};

// actions
const actions = {
  getPreferredCurrency({ commit, rootGetters }) {
    return new Promise(resolve => {
      const storeCurrency = currency => {
        commit(types.RECEIVE_PREFERRED_CURRENCY, { currency });
        resolve(currency);
      };

      rootGetters.addon.api
        .getCurrencies()
        .then(currencies => {
          const preferred = currencies.find(x => x.preferred);
          storeCurrency(preferred._id.toUpperCase());
        })
        .catch(() => {
          storeCurrency("CAD");
        });
    });
  }
};

// mutations
const mutations = {
  [types.RECEIVE_PREFERRED_CURRENCY](state, { currency }) {
    state.preferred = currency;
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};
