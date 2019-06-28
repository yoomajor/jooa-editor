<template>
  <div class="container">
    <SetContent />
    <EditContent />
  </div>
</template>

<script>
import SetContent from '@/components/Content/Setting.vue'
// import EditContent from '@/components/Editor/Editor.vue'
import EditContent from '@/components/Editor/Index.vue'

export default {
  name: 'Editor',
  components: {
    SetContent,
    EditContent
  }
}
</script>
