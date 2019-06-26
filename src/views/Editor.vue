<template>
  <div class="container">
    <SetContent />
    <EditArticle />
  </div>
</template>

<script>
import EditArticle from '@/components/Editor/Editor.vue'
import SetContent from '@/components/Content/Setting.vue'

export default {
  name: 'Editor',
  components: {
    EditArticle,
    SetContent
  }
}
</script>
