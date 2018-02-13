import Vue from 'vue';
import Polyglot from 'vue-polyglot';
import { mapGetters } from 'vuex';
import Config from './components/Config.vue';
import store from './store';
import locales from './locales';

Vue.config.productionTip = false;
Vue.use(Polyglot, {
  defaultLanguage: 'en',
  languagesAvailable: ['en', 'fr']
});

Vue.locales(locales);

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
    }
  },
  render: h => h(Config)
});
