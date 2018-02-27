<template>
  <div class="footer">
    <div class="footer__left"></div>
    <div class="footer__right">
      <div class="footer__note">
        {{ $t('update_time', null, { time: updateTime }) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      updateTime: 'updateTime'
    })
  }
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.footer {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;

  &__note {
    font-size: 0.8rem;
    color: $light-text-color;
    line-height: 1.2;
  }
}

</style>
