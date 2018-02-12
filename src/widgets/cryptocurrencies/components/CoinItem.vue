<template>
  <tr class="item">
    <td class="item__currency-cell">
      <div class="item__currency" :title="coin.CoinName">
        <div class="item__currency-image">
          <img :src="coinLogoUrl" height="24">
        </div>
        <div class="item__currency-symbol">
          {{ coin.Name }}
        </div>
      </div>
    </td>

    <td class="item__price-cell">
      <div class="item__price">{{ endPrice | formatPrice }}</div>
    </td>

    <td :class="{
      'item__change-cell': true,
      green: change && change > 0,
      red: change && change < 0
    }">
      <div class="item__change">
        <div class="item__change-icon">
          <img src="../assets/img/arrow.svg" height="5" :class="{
            'item__change-icon-image': true,
            up: change && change > 0,
            down: change && change < 0
          }">
        </div>
        <div class="item__change-number">{{ change | formatChangePercent }}</div>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';
import SVGInjector from 'svg-injector';

export default {
  props: {
    coin: {
      type: Object,
      required: true
    },
  },

  computed: {
    ...mapGetters({
      currency: 'preferredCurrency'
    }),
    flagUrl () {
      return require(`../assets/img/flag_${this.currency.toLowerCase()}.svg`)
    },
    coinLogoUrl () {
      return `https://www.cryptocompare.com${this.coin.ImageUrl}`
    },
    startPrice () {
      return this.coin.prices[this.currency] ? this.coin.prices[this.currency]['OPEN24HOUR'] : null;
    },
    endPrice () {
      return this.coin.prices[this.currency] ? this.coin.prices[this.currency]['PRICE'] : null;
    },
    change () {
      let result = (this.endPrice - this.startPrice) / Math.abs(this.startPrice);
      let numDecimal = 2;
      let roundingBase = Math.pow(10, numDecimal);

      return Math.round(result * roundingBase) / roundingBase;
    },
  },

  filters: {
    formatPrice (value, format='0,0.0[000000]') {
      if (value > 1) format = '0,0.00';

      return numeral(value).format(format);
    },
    formatChangePercent (value, format='0.00%') {
      return numeral(value).format(format);
    }
  },

  methods: {
    injectSVG() {
      SVGInjector(this.$el.getElementsByClassName('item__change-icon-image'));
    }
  },

  updated() {
    this.injectSVG();
  }
}
</script>

<style lang="scss">
@import '../variables.scss';
@import 'breakpoint-sass/stylesheets/breakpoint';

.item {
  td {
    padding-bottom: 12px;
    height: 33px;
  }

  &__currency {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    &-image {
      display: flex;
      align-items: center;
      margin-right: 5px;

      @include breakpoint(0 250px) {
        img {
          width: 20px;
        }
      }
    }

    &-symbol {
      font-size: 0.9333rem;
      line-height: 1;
      font-weight: bold;
      text-transform: uppercase;
    }

    &-cell {
      padding-right: 5px;
      width: 99%;
    }
  }

  &__price {
    font-size: 0.9333rem;
    text-align: right;
    line-height: 1;
    font-weight: bold;
    background-color: $lighter-gray;
    border-radius: 2px;
    padding: 5px 9px;

    &-cell {
      padding-right: 10px;
    }

    @include breakpoint(0 250px) {
      padding: 5px 5px;

      &-cell {
        padding-right: 5px;
      }
    }
  }

  &__change {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;

    &-icon {
      margin-right: 5px;
      display: flex;

      @include breakpoint(0 250px) {
        margin-right: 2px;
      }

      &-image {
        display: none;

        &.down {
          transform: rotate(180deg);
        }

        .green &,
        .red & {
          display: inline;
        }

        .green & {
          #arrow_icon {
            fill: $green;
          }
        }

        .red & {
          #arrow_icon {
            fill: $red;
          }
        }
      }
    }

    &-number {
      font-size: 0.9333rem;
      font-weight: bold;
      line-height: 1;
    }

    &-cell {
      &.green {
        color: $green;
      }

      &.red {
        color: $red;
      }
    }
  }
}

</style>
