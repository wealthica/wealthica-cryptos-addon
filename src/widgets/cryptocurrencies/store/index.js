import Vue from "vue";
import Vuex from "vuex";
import addon from "./modules/addon";
import coins from "./modules/coins";
import currencies from "./modules/currencies";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { addon, coins, currencies }
});
