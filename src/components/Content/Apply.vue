<template>
  <div class="contentApply">
    <button type="button" class="btn"
      @click="applyContent">
      SAVE
    </button>
    <div>
      <p>---- json data  ----</p>
      {{ renderData }}
    </div>
    <div v-html="renderHtml" class="renderbox"></div>
  </div>
</template>

<script>
import moduleFunctions from "@/components/Editor/ModuleFunction"
import regExp from '@/common/regExp'

export default {
  name: 'ApplyContent',
  data () {
    return {
      renderData: '',
      renderHtml: ''
    }
  },
  computed: {
    moduleData () {
      return this.$store.state.content.modules
    }
  },
  watch: {
  },
  created: function () {
    console.log()
  },
  methods: {
    applyContent: function () {
      this.renderData = this._.cloneDeep(this.moduleData)
      
      const article = document.getElementById('article').cloneNode(true)
      const handles = article.querySelectorAll('.handleMods')
      const contenteditable = article.querySelectorAll('[contenteditable]')
      const quantity = article.querySelectorAll('.inputQuantity')
      const fileUpload = article.querySelectorAll('.uploadImg')
      
      handles.forEach(x => x.parentNode.removeChild(x))
      contenteditable.forEach(x => x.removeAttribute('contentEditable'))
      quantity.forEach(x => x.setAttribute('value', x.dataset.min))
      fileUpload.forEach(x => x.remove())

      
      this.renderHtml = new XMLSerializer().serializeToString(article)
    }
  }
}
</script>

<style lang="scss" scoped>
.renderbox {
  max-width: 375px;
  margin: 0 auto;
}
</style>

