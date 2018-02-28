<template>
  <div class="glide__track">
    <div v-for="(page, index) in pages" class="glide__slide">
      <CoinPage
        :key="index"
        :symbols="page"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as constants from '../../constants';
import CoinPage from './CoinPage';

export default {
  components: { CoinPage },
  computed: {
    ...mapGetters(['activeCoinSymbols']),
    pages () {
      return _.chunk(this.activeCoinSymbols, constants.COINS_PER_PAGE);
    }
  },

  watch: {
    activeCoinSymbols (val) {
      this.$store.dispatch('getActiveCoinPrices');
    }
  },

  created () {
    this.$store.dispatch('getCoinsList');
  }
}
</script>
