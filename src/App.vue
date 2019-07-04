<template>
  <div id="app">
    <div id="nav">
      <router-link to="/editor">Editor</router-link>
    </div>
    <!-- GLOBAL SETTING :: lang -->
    <SetLang />
    <!-- // GLOBAL SETTING :: lang -->
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
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
