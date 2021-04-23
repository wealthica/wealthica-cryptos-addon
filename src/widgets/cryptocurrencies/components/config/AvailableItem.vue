<template>
  <div class="coins__item">
    <div class="coins__item-action" @click="add">
      <img
        class="coins__item-action-image"
        width="14"
        height="14"
        src="../../assets/img/icon_plus.svg"
      />
    </div>
    <div class="coins__item-icon">
      <img class="coins__item-icon-image" width="20" height="20" :src="coinLogoUrl" />
    </div>
    <div class="coins__item-title">
      <div class="coins__item-name">
        {{ coin.CoinName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coin: {
      type: Object,
      required: true
    }
  },

  computed: {
    coinLogoUrl() {
      if (!this.coin.ImageUrl) return "";

      return `https://www.cryptocompare.com${this.coin.ImageUrl}`;
    }
  },

  methods: {
    add() {
      this.$emit("add", this.coin.Symbol);
    }
  }
};
</script>
