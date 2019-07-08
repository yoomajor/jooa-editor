<template>
  <div id="app">
    <div id="menu">
      <Menu />
    </div>
    <div id="container">
      <Header id="header" />
      <router-view id="content" />
    </div>
  </div>
</template>

<script>
import Menu from '@/views/Menu.vue'
import Header from '@/views/Header.vue'

export default {
  components: {
    Menu,
    Header
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: row;
  height: 100%;
}
#menu {
  display: flex;
  flex-basis: 200px;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  border-right: 1px solid $color-lgrey;
  background-color: $color-white;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  z-index: 999;
}
#container {
  display: flex;
  flex: 1;
  flex-direction: column;
}
#header {
  padding: 20px 30px;
  border-bottom: 1px solid $color-lgrey;
  background-color: $color-white;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
#content {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 30px;
}
</style>
