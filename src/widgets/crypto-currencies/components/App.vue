<template>
  <div id="app">
    <CoinList />
    <div class='divider'></div>
    <Footer />
  </div>
</template>

<script>
import CoinList from './CoinList.vue'
import Footer from './Footer.vue'
export default {
  components: { CoinList, Footer }
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
  padding-top: 30px;
}

.divider {
  height: 1px;
  background-color: $lighter-gray-color;
  margin-bottom: 10px;
}

</style>
