<template>
  <div id="article" class="article">
    <div class="mods" data-type="text-2">was existed mods block</div>
    <div class="mods" data-type="text-1">was existed mods block2</div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      modsInfo: []
    }
  },
  methods: {
    modsMap: function () {
      let modules = article.querySelectorAll('.article .mods')
      /*
      this.modsInfo = modules.map(x => {
        id: x.index
      })
      console.log(this.modsInfo)
      */
     console.log(modules)
    }
  },
  mounted: function () {
    this.modsMap()
  }
}
</script>

<style lang="scss" scoped>
.preview {
  padding-left: 30px;
  background-color: red;
  .article {
    max-width: 375px;
    min-height: 100px;
    background-color: #fff;
  }
}
</style>
