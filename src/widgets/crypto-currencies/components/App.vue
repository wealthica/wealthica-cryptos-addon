<template>
  <div id="app">
    <CoinList />
    <div v-if="coins.length > 0" class='divider'></div>
    <Footer v-if="coins.length > 0" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CoinList from './CoinList.vue'
import Footer from './Footer.vue'
export default {
  components: { CoinList, Footer },
  computed: {
    ...mapGetters({
      coins: 'topCoins'
    })
  },
  created () {
    this.$store.dispatch('initAddon')
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

html {
  font-size: 15px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
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

</style>
