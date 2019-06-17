<template>
  <div class="article">
    <div class="something">이미 들어가있는 어떤것</div>
  </div>
</template>

<script>
export default {
  name: 'Article'
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
  .something {
    border: 1px solid transparent;
  }
}
</style>
