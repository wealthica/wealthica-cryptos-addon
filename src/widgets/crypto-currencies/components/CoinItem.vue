<template>
  <tr class="item">
    <td class="item__flags-cell">
      <div class="item__flags">
        <div class="item__flag">
          <img v-if="swapped" :src="flagUrl" height="24" :title="currency">
          <div v-else class="item__coin-label" :title="coin.CoinName">{{ coin.Symbol }}</div>
        </div>
        <div class="item__swapper" @click="$emit('swap')">
          <img src="../assets/img/swap.svg" width="18">
        </div>
        <div class="item__flag">
          <div v-if="swapped" class="item__coin-label" :title="coin.CoinName">{{ coin.Symbol }}</div>
          <img v-else :src="flagUrl" height="24" :title="currency">
        </div>
      </div>
    </td>
    <td class="item__rate-cell">
      <div class="item__rate">{{ exchangeRate | formatExchangeRate }}</div>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';

export default {
  props: {
    coin: {
      type: Object,
      required: true
    },
    swapped: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    flagUrl () {
      return require(`../assets/img/flag_${this.currency.toLowerCase()}.svg`)
    },
    exchangeRate () {
      return this.swapped ? 1 / this.coin.prices[this.currency] : this.coin.prices[this.currency];
    },
    ...mapGetters({
      currency: 'preferredCurrency'
    })
  },
  filters: {
    formatExchangeRate (value, format='0,0.0[000000]') {
      return numeral(value).format(format);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';
@import 'breakpoint-sass/stylesheets/breakpoint';

.item {
  td {
    padding-bottom: 12px;
  }

  &__flag,
  &__swapper {
    display: flex;
    align-items: center;
  }

  &__coin-label {
    font-weight: bold;
    font-size: 0.8rem;
    background-color: $lighter-gray-color;
    border-radius: 12px;
    padding: 0 5px;
    height: 24px;
    line-height: 24px;

    @include breakpoint(0 250px) {
      height: 20px;
      line-height: 20px;
    }
  }

  &__flag {
    @include breakpoint(0 250px) {
      img {
        width: 20px;
      }
    }

    &s {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;

      &-cell {
        padding-right: 5px;
        width: 99%;
      }
    }
  }

  &__swapper {
    cursor: pointer;
    margin: 0 10px;

    &:hover {
      opacity: 0.9;
    }

    @include breakpoint(0 250px) {
      margin: 0 5px;

      img {
        width: 15px;
      }
    }
  }

  &__rate {
    font-size: 0.9333rem;
    text-align: right;
    line-height: 1;
    font-weight: bold;
  }
}

</style>
