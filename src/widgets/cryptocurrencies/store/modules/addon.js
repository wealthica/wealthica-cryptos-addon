import { WealthicaAddon } from '../../../../../src/common/wealthica-addon';
import * as types from '../mutation-types';
import _ from 'lodash';

// initial state
const state = {
  addon: null,
  addonData: {},
  config: {},
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
  config: state => state.config,
};

// actions
const actions = {
  initAddon ({ commit, dispatch, getters }) {
    let updateData = (data) => {
      commit(types.UPDATE_ADDON_DATA, { data: _.omit(data, ['config']) });
      commit(types.UPDATE_CONFIG, { data: data.config });
      dispatch('updateActiveCoinSymbols', getters.config.coins, { root: true });
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

  updateConfig ({ commit, dispatch, getters }, data) {
    return new Promise((resolve, reject) => {
      getters.addon.saveConfig({
        data,
        success: response => {
          commit(types.UPDATE_CONFIG, { data });
          dispatch('updateActiveCoinSymbols', getters.config.coins, { root: true });

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
    state.config = data || {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
