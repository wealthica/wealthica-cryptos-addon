<template>
  <div class="list__wrapper">
    <table class="list">
      <thead>
        <tr>
          <th class='currency-header'>Crypto Currency</th>
          <th class='price-header'>Price ({{ currency }})</th>
          <th class='change-header'>24H Change</th>
        </tr>
      </thead>
      <tbody>
        <CoinItem
          v-for="coin in coins"
          :key="coin.Id"
          :coin="coin"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CoinItem from './CoinItem';

const NUM_COINS = 3;

export default {
  components: { CoinItem },
  computed: {
    ...mapGetters({
      coins: 'topCoins',
      currency: 'preferredCurrency'
    })
  },
  created () {
    this.$store.dispatch('getTopCoins', NUM_COINS);
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.list {
  width: 100%;
  border-spacing: 0;

  &__wrapper {
    min-height: 161px;
  }
}

th {
  white-space: nowrap;
  color: $light-gray;
  font-size: 0.6rem;
  text-transform: uppercase;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.currency-header {
  text-align: left;
  padding-right: 5px;
}

.price-header {
  text-align: right;
  padding-right: 10px;
}

.change-header {
  text-align: right;
}

</style>
