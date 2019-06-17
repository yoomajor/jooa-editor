<template>
  <div class="editor">
    <div class="moduleList">
      <ModuleList />
    </div>
    <div class="preview">
      <Preview />
    </div>
  </div>
</template>

<script>
import ModuleList from '@/components/Editor/ModuleList.vue'
import Preview from '@/components/Editor/Preview.vue'

export default {
  name: 'Editor',
  components: {
    ModuleList,
    Preview
  }
}
</script>

<style lang="scss" scoped>
.editor {
  display: flex;
  .moduleList {
    width: 360px;
    border-right: 1px solid #ddd;
  }
  .preview {
    flex: 1;
  }
}
</style>

