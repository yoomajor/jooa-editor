<template>
  <div class="inner">
    <div
      class="module"
      :data-mods="data.mods"
      :data-lang="$store.state.setcontent.lang">
      <div
        class="column"
        v-for="(item, index) in data.column"
        :key="index">
        <div v-if="item.type === 'text'" v-html="item.value[selectedLang]" contenteditable="true" @focusout="onFocusout($event, index, mIdx)"></div>
        <div v-if="item.type === 'image'">
          <img v-if="item.value" :src="item.value" alt="" />
          <label v-else class="uploadImg">Upload image<input type="file"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'data',
    'mIdx'
  ],
  data () {
    return {
      itemData: {},
      editColumn: {}
    }
  },
  computed: {
    selectedLang () {
      return this.$store.state.setcontent.lang
    }
  },
  watch: {
    selectedLang: function (){
      this.renderModule()
    }
  },
  created: function () {
    this.renderModule()
  },
  methods: {
    renderModule: function () {
      let isEmptyObject = Object.keys(this.itemData).length === 0
      if (isEmptyObject) {
        this.itemData = { ...this.data }
      }
    },
    onFocusout: function (e, cIdx, mIdx) {
      let updateData = {
        value: e.target.innerHTML,
        mIdx: mIdx,
        cIdx: cIdx
      }
      this.$emit('updateValue', updateData)
    }
  }
}
</script>
