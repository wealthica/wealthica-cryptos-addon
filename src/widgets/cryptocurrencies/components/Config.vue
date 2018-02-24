<template>
  <div id="app">
    <div class="config-string">{{ newConfig }}</div>
    <br><br>
    <textarea v-model="newConfig"></textarea>
    <br><br>
    <button @click="saveConfig">Save</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      newConfig: 'abc',
    }
  },
  computed: {
    ...mapGetters(['config']),
  },
  watch: {
    config (val) {
      this.newConfig = JSON.stringify(val);
    }
  },
  methods: {
    saveConfig () {
      let newConfig = JSON.parse(this.newConfig);
      this.$store.dispatch('updateConfig', newConfig).then((response) => {
        console.log('saved', response);
      });
    }
  },
  created () {
    this.$store.dispatch('initAddon');
  },
}
</script>

<style lang="scss">
@import '../variables.scss';

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

</style>
