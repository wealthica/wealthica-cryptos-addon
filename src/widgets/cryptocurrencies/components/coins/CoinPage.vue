<template>
  <div class="list__wrapper">
    <table class="list">
      <thead v-if="symbols.length">
        <tr>
          <th />
          <th class="price-header">
            {{ $t("price_currency", null, { currency: currency }) }}
          </th>
          <th class="change-header">
            {{ $t("24h_change") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <CoinItem v-for="symbol in symbols" :key="symbol" :symbol="symbol" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CoinItem from "./CoinItem.vue";

export default {
  components: { CoinItem },
  props: {
    symbols: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currency: "preferredCurrency"
    })
  }
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";

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

.price-header {
  text-align: right;
  padding-right: 10px;
}

.change-header {
  text-align: right;
}
</style>
