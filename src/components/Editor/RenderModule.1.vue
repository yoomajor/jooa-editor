<template>
  <div class="inner">
    <div
      class="module"
      :data-mods="itemData.mods"
      :data-lang="$store.state.setcontent.lang">
      <div
        class="column"
        v-for="(column, index) in itemData.editColumn"
        :key="columnKey(index)">
        <div v-if="column.type === 'text'" v-html="textValueByLang(column.value, index)" @focusout="textValueUpdate($event, index)" contenteditable="true"></div>
        <div v-if="column.type === 'image'">
          <img v-if="column.value" :src="column.value" alt="" />
          <label v-else class="uploadImg">Upload image<input type="file"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RenderModule',
  props: [
    'data',
    'id'
  ],
  data () {
    return {
      itemData: {},
      test: {}
    }
  },
  computed: {
    selectedLang () {
      return this.$store.state.setcontent.lang
    }
  },
  watch: {
    selectedLang (data) {
      this.renderDOM(data)
      console.log(this.itemData.editColumn)
    }
  },
  created: function () {
    const lang = this.$store.state.setcontent.lang
    this.renderDOM(lang)
  },
  methods: {
    columnKey: function (index) {
      const id = this.id
      let mods = this.itemData.mods
      let key = `KEY_COLUMN_${id}_${mods}_${index}`
      return key
    },
    renderDOM: function (lang) {
      let isEmptyObject = Object.keys(this.itemData).length === 0
      if (isEmptyObject) {
        this.itemData = this.$_.clone(this.data)
      }
      this.itemData.editColumn = this.$_.clone(this.data.column)
    },
    contenteditable: function (isText) {
      return isText === 'text'
    },
    textValueUpdate: function (e, index) {
      const value = e.target.innerHTML
      const lang = this.$store.state.setcontent.lang
      // this.itemData.column[index].value[lang] = e.target.innerHTML
      console.log(`${this.itemData.column[index].value[lang]} / ${this.itemData.editColumn[index].value[lang]} / ${value}`)
    },
    textValueByLang: function (info, index) {
      const lang = this.$store.state.setcontent.lang
      return this.itemData.column[index].value[lang]
      // this.itemData.column[index].value[lang]
    }
  }
}
</script>
