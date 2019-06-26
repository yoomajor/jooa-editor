<template>
  <div class="about">
    <SetContent />
    <h1>asdf</h1>
  </div>
</template>

<script>
import SetContent from '@/components/Content/Setting.vue'

export default {
  components: {
    SetContent
  },
  data () {
    return {
      label: {
        ko: '안녕',
        en: 'hello',
        zh: 'Nihao'
      }
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
h1 {
  font-size: 30px;
}
</style>

