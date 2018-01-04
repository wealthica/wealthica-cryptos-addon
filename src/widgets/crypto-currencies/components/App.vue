<template>
  <div id="app">
    <CoinList />
  </div>
  <hr>
  <p>something</p>
</template>

<script>
import CoinList from './CoinList.vue'
export default {
  components: { CoinList }
}
</script>

<style lang="scss">
@import '../variables.scss';

*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  margin: 0 auto;
  line-height: 1.4;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $vue-blue;
}

h1 {
  text-align: center;
}
</style>
