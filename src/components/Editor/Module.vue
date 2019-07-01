<template>
  <div class="inner">
    <div
      class="module"
      :data-mods="itemData.mods"
      :data-lang="$store.state.setcontent.lang">
      <div
        class="column"
        v-for="(item, index) in itemData.column"
        :key="index">
        {{item.mods}}
        <!-- standard module case -->
        <div v-if="type === 'standard'" class="standardModule">
          <ckeditor v-if="item.type === 'text'" class="standardText" contenteditable="true" type="inline"
            v-model="item.value[selectedLang]"
            :config="config"
            @blur="updateValue($event, index, mIdx)"
            @drop="log">
          </ckeditor>
          <div v-if="item.type === 'image'" class="standardImage">
            <img v-if="item.value" :src="item.value" alt="" />
            <label v-else class="uploadImg">Upload image<input type="file"></label>
          </div>
        </div>
        <!-- //standard module case -->
        <!-- function module case -->
        <div v-else-if="type === 'function'" class="valueModule" @focusout="updateValue($event, index, mIdx)">
          <div v-if="itemData.mods === 'input'" class="formGroup">
            <input type="text" v-model="item.value[selectedLang]" class="input" placeholder="text here">
          </div>
          <div v-if="itemData.mods === 'textarea'" class="formGroup">
            <textarea type="text" v-model="item.value[selectedLang]" class="input textarea" placeholder="text here"></textarea>
          </div>
        </div>
        <!-- //function module case -->
      </div>
    </div>
  </div>
</template>

<script>
import config from "./ckeditor_config"
export default {
  props: [
    'data',
    'mIdx',
    'type',
    'state'
  ],
  data () {
    return {
      itemData: {},
      editColumn: {},
      editorValue: {},
      config: config
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
    },
    editorValue: function (){
      console.log('value changed')
    }
  },
  created: function () {
    this.renderModule()
  },
  methods: {
    renderModule: function () {
      this.itemData = this._.cloneDeep(this.data)
    },
    updateValue: function (e, cIdx, mIdx) {
      if (this.state !== 'move') {
        let value = function () {
          if (e.target === undefined) { // is Editor?
            return e.sourceElement.innerHTML
          } else {
            if (e.target.closest('.valueModule') !== null) {
              return e.target.value
            }
          }
        }
        let updateData = {
          value: value(),
          mIdx: mIdx,
          cIdx: cIdx
        }
        console.log(updateData)
        this.$emit('updateValue', updateData)
      }
    },
    onDestroy: function (e) {
      console.log(e)
    },
    log: function (e, data, dropRange) {
      if (dropRange.domTarget.contentEditable) {
        data.stop()
      }
    }
  }
}
</script>
