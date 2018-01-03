<template>
  <div id="app">
    <TodoList/>
    <ul>
      <li>Outsider</li>
    </ul>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  components: {
  TodoList
  }
}
</script>

<style lang="scss">
@import './variables.scss';

*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  margin: 0 auto;
  line-height: 1.4;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $vue-blue;
}

h1 {
  text-align: center;
}
</style>
