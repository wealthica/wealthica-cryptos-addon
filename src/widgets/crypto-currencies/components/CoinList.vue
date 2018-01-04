<template>
  <table class="list">
    <tbody>
      <CoinItem
        v-for="coin in coins"
        :key="coin.Id"
        :coin="coin"
      />
    </tbody>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import CoinItem from './CoinItem';

export default {
  components: { CoinItem },
  computed: {
    ...mapGetters({
      coins: 'topCoins'
    })
  },
  created () {
    this.$store.dispatch('getTopCoins')
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.list {
  width: 100%;
  min-height: 137px;
}

</style>
