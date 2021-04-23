<template>
  <div v-if="coin" class="coins__item">
    <div class="coins__item-action" @click="remove">
      <img
        class="coins__item-action-image"
        width="14"
        height="14"
        src="../../assets/img/icon_minus.svg"
      />
    </div>
    <div class="coins__item-icon">
      <img class="coins__item-icon-image" width="20" height="20" :src="coinLogoUrl" />
    </div>
    <div class="coins__item-title">
      <div class="coins__item-name">
        {{ coinName }}
      </div>
    </div>
    <div class="coins__item-handle">
      <img
        class="coins__item-icon-image"
        width="14"
        height="7"
        src="../../assets/img/icon_drag_handle.svg"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    symbol: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(["allCoins"]),
    coin() {
      const { symbol } = this;
      return this.allCoins.find(coin => coin.Symbol === symbol);
    },
    coinLogoUrl() {
      if (this.coin) return `https://www.cryptocompare.com${this.coin.ImageUrl}`;
      return "";
    },
    coinName() {
      if (this.coin) return this.coin.CoinName;
      return "";
    }
  },

  methods: {
    remove() {
      this.$emit("remove", this.symbol);
    }
  }
};
</script>
