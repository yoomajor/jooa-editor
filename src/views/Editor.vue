<template>
  <div class="editor" @drop="handleDrop">
    <div class="moduleList" @dragstart="dragStart">
      <ModuleList />
    </div>
    <div class="preview" @dragover.prevent="dragOver" @dragenter="dragEnter" @dragleave="dragLeave">
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
      let mods = e.target
      let mods_type = mods.dataset.type

      this.isDragging = true

      clone = document.querySelector(`.copy [data-mods=${mods_type}]`).cloneNode()
      clone.classList.add('clone')
      e.dataTransfer.setData('data', clone)
      
    },
    dragEnter: function(e) {
      const article = document.querySelector('.article')
      if (this.isDragging){
        article.appendChild(clone)
      }
    },
    dragOver: function (e) {
      //console.log(e.pageY)
    },
    dragLeave: function (e) {
      if (e.target === e.currentTarget) {
        document.querySelector('.clone').remove()
      }
    },
    handleDrop: function(e) {
      e.preventDefault()
      document.querySelector('.clone').classList.remove('clone')
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

