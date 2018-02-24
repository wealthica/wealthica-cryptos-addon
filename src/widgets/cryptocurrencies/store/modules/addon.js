import { WealthicaAddon } from '../../../../../src/common/wealthica-addon';
import * as types from '../mutation-types';
import _ from 'lodash';

// initial state
const state = {
  addon: null,
  addonData: {},
};

// getters
const getters = {
  addon: state => state.addon,
  language: state => state.addonData.language,
  momentLocale: (state, getters) => (getters.language === 'fr') ? 'fr-ca' : getters.language,
  dateFilter: state => {
    return {
      from: state.addonData.fromDate, to: state.addonData.toDate
    }
  },
  config: state => state.addonData.config,
};

// actions
const actions = {
  initAddon ({ commit }) {
    let addon = new WealthicaAddon({
      scope: 'wealthica/wealthica-cryptos-addon/widgets/cryptocurrencies',
      init (data) {
        commit(types.UPDATE_ADDON_DATA, { data: _.omit(data, ['config']) });
        commit(types.UPDATE_CONFIG, { data: data.config });
      },
      update (data) {
        commit(types.UPDATE_ADDON_DATA, { data: _.omit(data, ['config']) });
        commit(types.UPDATE_CONFIG, { data: data.config });
      },
      reload () {
        // Trigger app reload here
      },
    });

    window.myaddon = addon;
    commit(types.INIT_ADDON, { addon });
  },

  updateConfig ({ commit, getters }, data) {
    return new Promise((resolve, reject) => {
      getters.addon.saveConfig({
        data,
        success: response => {
          commit(types.UPDATE_CONFIG, { data });
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
  [types.UPDATE_ADDON_DATA] (state, { data }) {
    state.addonData = data;
  },
  [types.UPDATE_CONFIG] (state, { data }) {
    state.addonData.config = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
