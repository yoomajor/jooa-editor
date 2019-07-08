<template>
  <div id="app">
    <div id="nav">
      <router-link to="/editor">Editor</router-link>
    </div>
    <!-- GLOBAL SETTING  -->
    <SetLang />
    <SetCurrency />
    <!-- // GLOBAL SETTING -->
    <router-view/>
  </div>
</template>

<script>
import SetLang from './views/SetLang.vue'
import SetCurrency from './views/SetCurrency.vue'
export default {
  components: {
    SetLang,
    SetCurrency
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
