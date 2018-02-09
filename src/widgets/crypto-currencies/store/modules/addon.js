import { WealthicaAddon } from '../../../../../src/common/wealthica-addon';
import * as types from '../mutation-types';

// initial state
const state = {
  addon: null,
  addonData: {}
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
};

// actions
const actions = {
  initAddon ({ commit }) {
    let addon = new WealthicaAddon({
      scope: 'wealthica/wealthica-cryptos-addon/widgets/crypto-currencies',
      init (data) {
        commit(types.UPDATE_ADDON_DATA, { data: data })
      },
      update (data) {
        commit(types.UPDATE_ADDON_DATA, { data: data })
      },
      reload () {
        // Trigger app reload here
      },
    });
    commit(types.INIT_ADDON, { addon: addon });
  }
};

// mutations
const mutations = {
  [types.INIT_ADDON] (state, { addon }) {
    state.addon = addon;
  },
  [types.UPDATE_ADDON_DATA] (state, { data }) {
    state.addonData = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
