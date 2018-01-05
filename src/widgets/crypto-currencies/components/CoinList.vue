<template>
  <table class="list">
    <tbody>
      <CoinItem
        v-for="coin in coins"
        :key="coin.Id"
        :coin="coin"
        :swapped="swapped"
        @swap="swap"
      />
    </tbody>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import CoinItem from './CoinItem';

export default {
  components: { CoinItem },
  data () {
    return {
      swapped: true
    }
  },
  computed: {
    ...mapGetters({
      coins: 'topCoins'
    })
  },
  methods: {
    swap () {
      this.swapped = !this.swapped;
    }
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
