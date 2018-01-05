import WealthicaAddon from '../../../../../../wealthica-addon-core/src';
import * as types from '../mutation-types';

// initial state
const state = {
  addon: null
};

// getters
const getters = {
  addon: state => state.addon
};

// actions
const actions = {
  initAddon ({ commit }) {
    let addon = new Addon({
      scope: 'wealthica-cryptos-addon/widgets/crypto-currencies',
      init (trans, options) {
        commit(types.UPDATE_ADDON_DATA, { data: options })
      },
      postMessageObserver: function(origin, message) {
        // Put debug call here
      },
      gotMessageObserver: function(origin, message) {
        // Put debug call here
      },
      update: function(trans, options) {
        commit(types.UPDATE_ADDON_DATA, { data: options })
      },
      reload: function(trans, options) {
        // Trigger app reload here
      },
      vent_trigger: function(trans, options) {
        // Propagate event here (options.eventName, options.eventParams)
      }
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

class Addon {
  constructor (options={}) {
    this.addon = new WealthicaAddon(options);
  }

  requestAPI (endpoint, { query, success, error }) {
    this.addon.channel.call({
      method: 'request',
      params: {
        method: 'GET',
        endpoint,
        query,
      },
      success,
      error,
    });
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
