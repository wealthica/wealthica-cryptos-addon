/* eslint-disable no-new */
import Vue from "vue";
import { mapGetters } from "vuex";
import Polyglot from "vue-polyglot";
import App from "./components/coins/App.vue";
import store from "./store";

// Polyglot
import locales from "./locales";

// Numeral
import Numeral from "./plugins/numeral";

Vue.config.productionTip = false;
Vue.use(Polyglot, {
  defaultLanguage: "en",
  languagesAvailable: ["en", "fr"]
});
Vue.locales(locales);
Vue.use(Numeral);

new Vue({
  el: "#app",
  store,
  computed: {
    ...mapGetters({
      language: "language"
    })
  },
  watch: {
    language(lang) {
      this.$polyglot.setLang({ lang });
      this.$numeral.setLanguage(lang);
    }
  },
  render: h => h(App)
});
