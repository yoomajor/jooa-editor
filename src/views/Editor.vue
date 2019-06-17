<template>
  <div class="editor" @drop="handleDrop">
    <div class="moduleList" @dragstart="dragStart">
      <ModuleList />
    </div>
    <div class="preview" @dragover.prevent @dragenter="dragEnter">
      <Article />
      <div class="copy">
        <div class="module mods1" data-mods="text-1" contenteditable>text 1</div>
        <div class="module mods2" data-mods="text-2" contenteditable>text 2</div>
      </div>
      
    </div>
  </div>
</template>

<script>
import ModuleList from '@/components/Editor/ModuleList.vue'
import Article from '@/components/Editor/Article.vue'

let clone = null

export default {
  name: 'Editor',
  components: {
    ModuleList,
    Article
  },
  data () {
    return {
      isDragging: false
    }
  },
  methods: {
    dragStart: function(e) {
      //e.dataTransfer.setData('data', '1234')
      //e.dataTransfer.effectAllowed = "copy"
      let mods = e.target
      let mods_type = mods.dataset.type

      this.isDragging = true

      clone = document.querySelector(`.copy [data-mods=${mods_type}]`).cloneNode()
      clone.classList.add("clone")
      e.dataTransfer.setData('data', clone)
      
    },
    dragEnter: function(e) {
      const article = document.querySelector('.article')
      if (this.isDragging){
        article.appendChild(clone)
      }
    },
    handleDrop: function(e) {
      e.preventDefault()
      let isArticle = ( e.target.closest('.article') !== null ) ? true : false
      if (isArticle){
        console.log('is article')
      } else {
        console.log(document.querySelector(".clone").remove())
      }
    }
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
    padding-left: 60px;
    background-color: red;
  }
  .mods1 {
    border: 5px solid blue;
    background-color: #fff;
  }
  .mods2 {
    border: 5px solid green;
    background-color: #fff;
  }
  .clone {
    opacity: .5;
  }
}
</style>

