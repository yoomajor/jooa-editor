<template>
  <div class="moduleList">
    <ul class="list">
      <li class="item">
        <div class="handler" data-type="text-1" draggable="true">text1</div>
      </li>
      <li class="item">
        <div class="handler" data-type="text-2" draggable="true">text2</div>
      </li>
    </ul>
  </div>
</template>

<script>
import ModuleText1 from '@/components/Editor/Modules/ModuleText1.vue'

let dragEl = '';

export default {
  name: 'ModuleList',
  components: {
    ModuleText1
  }
}
</script>

<style lang="scss" scoped>
.moduleList {
  .list {
    display: flex;
    padding: 2px;
  }
  .item {
    flex-basis: 50%;
    padding: 2px;
  }
  .handler {
    padding: 1em;
    border: 1px solid #eee;
    background-color: #fff;
    cursor: move;
  }
  .stage {
    height: 100px;
    background-color: #fff;
  }
}
</style>

