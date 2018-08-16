import Vue from 'vue';
import { mapGetters } from 'vuex';
import App from './components/coins/App.vue';
import store from './store';

Vue.config.productionTip = false;

// Polyglot
import Polyglot from 'vue-polyglot';
import locales from './locales';
Vue.use(Polyglot, {
  defaultLanguage: 'en',
  languagesAvailable: ['en', 'fr']
});
Vue.locales(locales);

// Numeral
import Numeral from './plugins/numeral';
Vue.use(Numeral);

new Vue({
  el: '#app',
  store,
  computed: {
    ...mapGetters({
      language: 'language'
    })
  },
  watch: {
    language (lang) {
      this.$polyglot.setLang({ lang });
      this.$numeral.setLanguage(lang);
    }
  },
  render: h => h(App)
});
