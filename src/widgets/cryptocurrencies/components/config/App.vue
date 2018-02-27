<template>
  <div id="app">
    <div class="coins__lists-holder">
      <List
        :coins="activeCoins"
        :isActive="true"
        :maxReached="maxReached"
        @remove="remove"
      />

      <List
        :coins="availableCoins"
        :isActive="false"
        :maxReached="maxReached"
        @add="add"
      />
    </div>
    <div class="btn--save" @click="saveConfig">Save</div>
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
    }
  },
  computed: {
    ...mapGetters(['config', 'allCoins', 'topCoins']),
    availableCoins () {
      // TODO remove this 50 coins limit, and find a way to display all 2000+
      // coins (pagination?)
      let coins = this.allCoins.slice(0, 50);
      return coins.filter((x) => {
        return this.activeCoins.indexOf(x.Symbol) === -1;
      });
    },
  },
  watch: {
    config (val) {
      console.log('watch config', val);
      if (val.coins && val.coins.length) this.activeCoins = val.coins;
    },
    topCoins (val) {
      console.log('watch topCoins', val, this.activeCoins.length);
      // config takes priority
      if (this.activeCoins.length) return;
      if (val && val.length) this.activeCoins = val.map(x => x.Symbol);
    }
  },
  methods: {
    add (symbol) {
      if (this.activeCoins.length >= constants.MAX_ACTIVE_COINS)
        return this.maxReached = true;

      this.activeCoins.push(symbol);
    },
    remove (symbol) {
      this.maxReached = false;
      this.activeCoins = this.activeCoins.filter(x => x !== symbol);
    },
    saveConfig () {
      let newConfig = { coins: this.activeCoins };
      this.$store.dispatch('updateConfig', newConfig).then((response) => {
        console.log('saved', response);
      });
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
}

</style>
