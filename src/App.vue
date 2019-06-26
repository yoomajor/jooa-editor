<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/editor">Editor</router-link>
      <!-- GLOBAL SETTING :: lang -->
      <SetLang />
      <!-- // GLOBAL SETTING :: lang -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import SetLang from './views/SetLang.vue'
export default {
  components: {
    SetLang
  }
}
</script>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
