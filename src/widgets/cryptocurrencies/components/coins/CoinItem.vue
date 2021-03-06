<template>
  <tr class="item">
    <td class="item__currency-cell">
      <div class="item__currency" :title="coin.CoinName">
        <div class="item__currency-image">
          <img :src="coin.LogoUrl" height="24" />
        </div>
        <div class="item__currency-symbol">
          {{ symbol }}
        </div>
      </div>
    </td>

    <td class="item__price-cell">
      <div class="item__price">
        {{ formatPrice(endPrice) }}
      </div>
    </td>

    <td
      :class="{
        'item__change-cell': true,
        green: change && change > 0,
        red: change && change < 0
      }"
    >
      <div class="item__change">
        <div
          class="item__change-icon"
          :class="{
            up: change && change > 0,
            down: change && change < 0
          }"
        >
          <img src="../../assets/img/arrow.svg" height="5" class="item__change-icon-image" />
        </div>
        <div class="item__change-number">
          {{ $num(change, "0.00%") }}
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
import SVGInjector from "svg-injector";
import * as _ from "lodash";

export default {
  props: {
    symbol: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      coin: {}
    };
  },

  computed: {
    ...mapGetters({
      currency: "preferredCurrency",
      coins: "activeCoins",
      prices: "prices"
    }),
    flagUrl() {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      return require(`../../assets/img/flag_${this.currency.toLowerCase()}.svg`);
    },
    endPrice() {
      return this.prices[this.symbol] ? this.prices[this.symbol][this.currency].PRICE : null;
    },
    change() {
      return this.prices[this.symbol]
        ? this.prices[this.symbol][this.currency].CHANGEPCT24HOUR / 100
        : null;
    }
  },

  watch: {
    coins(val) {
      this.updateCoin(val);
    }
  },

  created() {
    this.updateCoin(this.coins);
  },

  updated() {
    this.injectSVG();
  },

  methods: {
    formatPrice(value, format = "0,0.0[000000]") {
      return this.$num(value, value > 1 ? "0,0.00" : format);
    },

    updateCoin(coins = []) {
      const { symbol } = this;
      if (coins.length) {
        const coin = coins.find(x => x.Symbol === symbol);
        coin.LogoUrl = `https://www.cryptocompare.com${coin.ImageUrl}`;
        this.coin = _.extend({}, this.coin, coin);
      }
    },
    injectSVG() {
      SVGInjector(this.$el.getElementsByClassName("item__change-icon-image"));
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";
@import "~breakpoint-sass/stylesheets/breakpoint";

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
    white-space: nowrap;

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

      &.down {
        transform: rotate(180deg);
      }

      @include breakpoint(0 250px) {
        margin-right: 2px;
      }

      &-image {
        display: none;

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
      white-space: nowrap;
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
