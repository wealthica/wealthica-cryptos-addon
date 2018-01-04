<template>
  <ul>
    <CoinItem
      v-for="coin in coins"
      :key="coin.Id"
      :coin="coin"
    />
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
