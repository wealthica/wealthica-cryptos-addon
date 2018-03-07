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
  language: state => state.addonData.language || 'en',
  momentLocale: (state, getters) => (getters.language === 'fr') ? 'fr-ca' : getters.language,
  data: state => state.addonData.data || {},
};

// actions
const actions = {
  initAddon ({ commit, dispatch, getters }) {
    let updateData = (data) => {
      commit(types.UPDATE_ADDON_DATA, { data });
      dispatch('updateActiveCoinSymbols', getters.data.coins, { root: true });
    }

    let addon = new WealthicaAddon({
      scope: 'wealthica/wealthica-cryptos-addon/widgets/cryptocurrencies'
    });

    addon.on('init', updateData).on('update', updateData);

    commit(types.INIT_ADDON, { addon });
  },

  updateData ({ commit, dispatch, getters, state }, data={}) {
    return new Promise((resolve, reject) => {
      getters.addon.saveData({
        data,
        success: response => {
          let newData = _.extend({}, state.addonData, { data });
          commit(types.UPDATE_ADDON_DATA, newData);
          dispatch('updateActiveCoinSymbols', data.coins, { root: true });

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
};

export default {
  state,
  getters,
  actions,
  mutations
}
