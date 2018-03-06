<template>
  <div id="app">
    <div class="coins__lists-holder">
      <List
        :coins="activeCoins"
        :isActive="true"
        :maxReached="maxReached"
        :minReached="minReached"
        @remove="remove"
      />

      <List
        :coins="allCoins"
        :activeCoins="activeCoins"
        :isActive="false"
        :maxReached="maxReached"
        @add="add"
      />
    </div>
    <div class="footer">
      <div class="footer__left">
        <div class="save-status">{{ saveStatus }}</div>
      </div>
      <div class="footer__right">
        <div class="btn--save" :class="{'loading disabled': saving}" @click="saveConfig">{{ $t('save') }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as constants from '../../constants';
import List from './List';

export default {
  components: { List },
  data () {
    return {
      activeCoins: [],
      maxReached: false,
      minReached: false,
      saving: false,
      saveStatus: '',
      statusTimer: null
    }
  },
  computed: {
    ...mapGetters(['activeCoinSymbols', 'allCoins']),
  },
  watch: {
    activeCoinSymbols (val) {
      console.log('watch activeCoinSymbols', val);
      this.activeCoins = val.slice();
    }
  },
  methods: {
    add (symbol) {
      this.minReached = false;

      if (this.activeCoins.length >= constants.MAX_ACTIVE_COINS)
        return this.maxReached = true;

      this.activeCoins.push(symbol);
    },
    remove (symbol) {
      this.maxReached = false;

      if (this.activeCoins.length <= constants.MIN_ACTIVE_COINS)
        return this.minReached = true;

      this.activeCoins = this.activeCoins.filter(x => x !== symbol);
    },
    saveConfig () {

      this.saving = true;
      this.saveStatus = '';
      clearTimeout(this.statusTimer);
      let newData = { coins: this.activeCoins };
      console.log('saving', newData);
      this.$store.dispatch('updateData', newData).then((response) => {
        console.log('saving done', response);
        this.saving = false;
        this.saveStatus = this.$t('saved_successfully');
        this.scheduleStatusReset();
      }).catch(() => {
        console.log('saving failed');
        this.saving = false;
        this.saveStatus = this.$t('error_happened');
        this.scheduleStatusReset();
      });
    },
    scheduleStatusReset () {
      clearTimeout(this.statusTimer);
      this.statusTimer = setTimeout(() => {
        this.saveStatus = '';
      }, 5000);
    }
  },
  created () {
    this.$store.dispatch('initAddon');
    this.$store.dispatch('getCoinsList');
  },
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';

@keyframes button-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

html {
  font-size: 15px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  min-width: 0;
  font-size: 15px;
  line-height: 1.4285em;
  color: $dark-text-color;
  margin: 0;
  padding: 0;

  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 300px;
}

.coins__lists-holder {
  display: flex;
  align-items: flex-start;
}

.btn--save {
  display: inline-flex;
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: $purple;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  outline: 0;
  border: 0;
  border-radius: 3px;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  font-size: .9333rem;
  text-transform: none;
  min-width: 60px;

  &:hover {
    background-color: lighten($purple, 10%) !important;
  }

  &:active {
    background-color: darken($purple, 10%) !important;
  }

  &--disabled, &.disabled, &[disabled] {
    pointer-events: none !important;
    opacity: 0.5 !important;
  }

  &--loading, &.loading {
    position: relative;
    cursor: default;
    text-shadow: none !important;
    color: transparent !important;
    opacity: 1;
    pointer-events: auto;
    transition: all 0s linear, opacity 0.1s ease;

    &:before {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      margin: -0.63333333em 0em 0em -0.63333333em;
      width: 1.26666667em;
      height: 1.26666667em;
      border-radius: 500rem;
      border: 0.2em solid rgba(0, 0, 0, 0.15);
    }

    &:after {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      margin: -0.63333333em 0em 0em -0.63333333em;
      width: 1.26666667em;
      height: 1.26666667em;
      animation: button-spin 0.6s linear;
      animation-iteration-count: infinite;
      border-radius: 500rem;
      border-color: #FFFFFF transparent transparent;
      border-style: solid;
      border-width: 0.2em;
      box-shadow: 0px 0px 0px 1px transparent;
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__left, &__right {
    display: flex;
    align-items: center;
  }

  &__right {
    margin-left: 25px;
  }
}

</style>
