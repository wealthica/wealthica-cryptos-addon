<template>
  <div id="app">
    <div class="container glide">
      <div class="glide__wrapper">
        <CoinPages :pages="pages" />
      </div>

      <div class="glide__bullets" />

      <div v-if="coins.length > 0" class="divider" />

      <Footer v-if="coins.length > 0" />
    </div>
  </div>
</template>

<script>
/* global $ */
import { mapGetters } from "vuex";
import * as _ from "lodash";
import * as constants from "../../constants";
import CoinPages from "./CoinPages.vue";
import Footer from "./Footer.vue";

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-webpack-loader-syntax
import "script-loader!glide";
import "glidejs/dist/css/glide.core.css";

export default {
  components: { CoinPages, Footer },

  computed: {
    ...mapGetters({
      coins: "activeCoinSymbols"
    }),
    pages() {
      return _.chunk(this.coins, constants.COINS_PER_PAGE);
    }
  },

  watch: {
    coins(val) {
      if (val.length) this.$store.dispatch("getActiveCoinPrices");
    }
  },

  created() {
    this.$store.dispatch("initAddon");
    this.$store.dispatch("getCoinsList");
  },

  updated() {
    if (this.pages.length <= 1) return;

    this.$nextTick(() => {
      $(".glide").glide({
        type: "carousel",
        autoplay: false
      });
    });
  }
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";

html {
  font-size: 15px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: "Lato", "Helvetica Neue", Arial, Helvetica, sans-serif;
  min-width: 0;
  font-size: 15px;
  line-height: 1.4285em;
  color: $dark-text-color;
  margin: 0;
  padding: 0;

  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  padding-top: 6px;
}

.divider {
  height: 1px;
  background-color: $lighter-gray;
  margin-bottom: 10px;
}

.glide {
  &__wrapper {
    min-height: 161px;
  }

  &__bullet {
    width: 5px;
    height: 5px;
    background-color: $bullet-color;
    border: none;
    padding: 0;
    border-radius: 500rem;
    margin-right: 3px;
    outline: none;
    -webkit-appearance: none;

    &:hover {
      cursor: pointer;
    }

    &.active {
      background-color: $bullet-active-color;
    }

    &s {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
