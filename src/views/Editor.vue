<template>
  <div class="container">
    <div class="innerBox settingBar">
      <SetContent />
      <ApplyContent />
    </div>
    <EditContent class="contentEditor" />
  </div>
</template>

<script>
import SetContent from '@/components/Content/Setting.vue'
import EditContent from '@/components/Editor/Index.vue'
import ApplyContent from '@/components/Content/Apply.vue'

export default {
  name: 'Editor',
  components: {
    SetContent,
    EditContent,
    ApplyContent
  }
}
</script>

<style lang="scss" scoped>
.settingBar {
  margin-bottom: 15px;
}
.contentEditor {
  height: 100%;
}
</style>
