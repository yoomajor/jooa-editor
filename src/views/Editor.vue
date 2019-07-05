<template>
  <div class="container">
    <SetContent />
    <EditContent />
    <ApplyContent />
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
