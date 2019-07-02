<template>
  <div class="inner"
    :style="styles">
    <div
      class="module"
      :data-mods="itemData.mods"
      :data-lang="$store.state.setcontent.lang">
      <div
        class="column"
        v-for="(item, index) in itemData.column"
        :key="index">
        <!-- standard module case -->
        <div v-if="type === 'standard'" class="standardModule">
          <ckeditor v-if="item.type === 'text'" class="standardText" contenteditable="true" type="inline"
            v-model="item.value[selectedLang]"
            :config="config"
            @blur="updateValue($event, index, mIdx)"
            @drop="onDrop">
          </ckeditor>
          <div v-if="item.type === 'image'" class="standardImage">
            <img v-if="item.value" :src="item.value" alt="" />
            <label v-else class="uploadImg">Upload image<input type="file"></label>
          </div>
        </div>
        <!-- //standard module case -->
        <!-- function module case -->
        <div v-else-if="type === 'function'" class="valueModule" @focusout="updateValue($event, index, mIdx)">
          <div v-if="itemData.mods === 'input'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <input type="text" class="input" placeholder="text here" :data-required="functions.isRequired" disabled>
          </div>
          <div v-if="itemData.mods === 'textarea'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <textarea type="text" class="input textarea" placeholder="text here" :data-required="functions.isRequired" disabled></textarea>
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
    'styles',
    'functions',
    'mIdx',
    'type',
    'state'
  ],
  data () {
    return {
      itemData: {},
      itemStyle: {},
      itemFunction: {},
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
    data: {
      deep: true,
      handler: function (data) {
        this.itemData = this._.cloneDeep(this.data)
      }
    },
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
        this.$emit('updateValue', updateData)
      }
    },
    onDrop: function (e, data, dropRange) {
      if (dropRange.domTarget.contentEditable) {
        data.stop()
      }
    },
    setStyle: function (itemData) {
      let style = itemData.style
      console.log(style)
    }
  }
}
</script>
