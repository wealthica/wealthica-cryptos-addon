/* eslint-disable no-param-reassign */
import numeral from "numeral";
import "numeral/locales/fr-ca";

let vm;

export default {
  install(Vue) {
    if (!vm) {
      vm = new Vue({
        methods: {
          setLanguage(language) {
            numeral.locale(language === "fr" ? "fr-ca" : "en");
          },

          _format(value, format = "0,0") {
            return numeral(value).format(format);
          }
        }
      });

      Vue.prototype.$numeral = vm;
    }

    Vue.mixin({
      methods: {
        $num(value, format) {
          return this.$numeral._format(value, format);
        }
      }
    });
  }
};
