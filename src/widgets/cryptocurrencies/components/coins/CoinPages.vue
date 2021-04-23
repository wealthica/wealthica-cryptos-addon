<template>
  <div class="glide__track">
    <div v-for="(page, index) in pages" :key="index" class="glide__slide">
      <CoinPage :symbols="page" />
    </div>
  </div>
</template>

<script>
import CoinPage from "./CoinPage.vue";

export default {
  components: { CoinPage },
  props: {
    pages: {
      type: Array,
      required: true
    }
  }
};
</script>
