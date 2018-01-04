<template>
  <div class="footer">
    <div class="footer__left"></div>
    <div class="footer__right">
      <div class="footer__note">
        Updated Today
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../variables.scss';

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
