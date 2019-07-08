<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/setting">Global Setting</router-link>
    <!-- <router-link to="/editor">Category</router-link>
    <router-link to="/editor">Contents</router-link> -->
    <router-link to="/editor">Editor</router-link>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  created: function () {
  }
}
</script>

<style lang="scss" scoped>
a {
  display: block;
  position: relative;
  font-weight: 700;
  padding: 15px;
  border-bottom: 1px solid $color-lgrey2;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
  }
  &:hover:before {
    background-color: $color-lgrey;
  }
}
.router-link-exact-active {
  color: $color-primary;
  &:before,
  &:hover:before {
    background-color: $color-primary;
  }
}
</style>
