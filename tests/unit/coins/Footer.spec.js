import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Polyglot from "vue-polyglot";

import Footer from "@/widgets/cryptocurrencies/components/coins/Footer.vue";
import locales from "@/widgets/cryptocurrencies/locales";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Polyglot, {
  defaultLanguage: "en",
  languagesAvailable: ["en", "fr"]
});
localVue.locales(locales);

describe("coins/Footer.vue", () => {
  it("renders update time", () => {
    const store = new Vuex.Store({
      modules: {
        coins: {
          getters: {
            updateTime: () => "test update time"
          }
        }
      }
    });
    const wrapper = shallowMount(Footer, { store, localVue });

    expect(wrapper.text()).toMatch("test update time");
  });
});
