<template>
  <div class="glide__track">
    <div v-for="(page, index) in pages" class="glide__slide">
      <CoinPage
        :key="index"
        :coins="page"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CoinPage from './CoinPage';

const NUM_COINS = 6;
const PER_PAGE = 3;

export default {
  components: { CoinPage },
  computed: {
    ...mapGetters({
      coins: 'topCoins',
    }),
    pages () {
      return _.chunk(this.coins, PER_PAGE);
    }
  },
  created () {
    this.$store.dispatch('getTopCoins', NUM_COINS);
  }
}
</script>
