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
import CoinPage from './CoinPage';

export default {
  props: {
    pages: {
      type: Array,
      required: true
    },
  },
  components: { CoinPage },
}
</script>
