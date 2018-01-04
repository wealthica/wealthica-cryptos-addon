<template>
  <li>
    {{ coin.Symbol }} - {{ coin.CoinName }} ({{ coin.prices[currency] }} {{ currency }})
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    coin: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currency: 'preferredCurrency'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

li {
  text-decoration: underline;
}

</style>
