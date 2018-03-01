import { WealthicaAddon } from '../../../../../src/common/wealthica-addon';
import * as types from '../mutation-types';
import _ from 'lodash';

// initial state
const state = {
  addon: null,
  addonStore: {},
  data: {},
};

// getters
const getters = {
  addon: state => state.addon,
  language: state => state.addonStore.language,
  momentLocale: (state, getters) => (getters.language === 'fr') ? 'fr-ca' : getters.language,
  dateFilter: state => {
    return {
      from: state.addonStore.fromDate, to: state.addonStore.toDate
    }
  },
  data: state => state.data,
};

// actions
const actions = {
  initAddon ({ commit, dispatch, getters }) {
    let updateData = (data) => {
      commit(types.UPDATE_ADDON_STORE, { data: _.omit(data, ['data']) });
      commit(types.UPDATE_DATA, { data: data.data });
      dispatch('updateActiveCoinSymbols', getters.data.coins, { root: true });
    }

    let addon = new WealthicaAddon({
      scope: 'wealthica/wealthica-cryptos-addon/widgets/cryptocurrencies',
      init: updateData,
      update: updateData,
      reload () {
        // Trigger app reload here
      },
    });

    commit(types.INIT_ADDON, { addon });
  },

  updateData ({ commit, dispatch, getters }, data) {
    return new Promise((resolve, reject) => {
      getters.addon.saveData({
        data,
        success: response => {
          commit(types.UPDATE_DATA, { data });
          dispatch('updateActiveCoinSymbols', getters.data.coins, { root: true });

          resolve(response);
        },
        error: () => {
          reject();
        }
      });
    });
  },
};

// mutations
const mutations = {
  [types.INIT_ADDON] (state, { addon }) {
    state.addon = addon;
  },
  [types.UPDATE_ADDON_STORE] (state, { data }) {
    state.addonStore = data;
  },
  [types.UPDATE_DATA] (state, { data }) {
    state.data = data || {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
