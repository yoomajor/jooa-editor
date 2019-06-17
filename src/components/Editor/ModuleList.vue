<template>
  <div class="moduleList">
    <ul class="list">
      <li class="item" data-module="module-text1">
        <div class="handler" draggable="true" @dragstart="dragStart">text1</div>
      </li>
      <li class="item" data-module="module-text2">
        <div class="handler">text2</div>
      </li>
    </ul>
    <div class="stage" @dragover.prevent @drop="handleDrop">stage</div>
  </div>
</template>

<script>
import ModuleText1 from '@/components/Editor/Modules/ModuleText1.vue'

let dragEl = '';

export default {
  name: 'ModuleList',
  components: {
    ModuleText1
  },
  methods: {
    dragStart: (e) => {
      console.log('start')
      e.dataTransfer.setData('text/plain', '1234')
      e.dataTransfer.effectAllowed = "copy"
      console.log(e.dataTransfer)
    },
    handleDrop: (e) => {
      e.preventDefault()
      console.log('drop')
      console.log(e.dataTransfer.getData('text/plain'))
    }
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

