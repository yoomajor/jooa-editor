<template>
  <div class="inner"
    :style="styles"
    :class="inActivate(styles.inActivate)">
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
          <!-- text -->
          <ckeditor v-if="item.type === 'text'" class="standardText" contenteditable="true" type="inline"
            v-model="item.value[selectedLang]"
            :config="config"
            @blur="updateValue($event, index, mIdx)"
            @drop="onDrop">
          </ckeditor>
          <!-- //text -->
          <!-- image -->
          <div v-if="item.type === 'image'" class="standardImage">
            <img v-if="item.value" :src="item.value" alt="" />
            <label v-else class="uploadImg">Upload image<input type="file"></label>
          </div>
          <!-- //image -->
          <!-- button -->
          <div v-if="item.type === 'button'" class="buttonModule">
            <a v-if="functions.typeValue === 'link'"
              class="btn btnFull"
              target="_blank"
              :href="functions.url"
              :style="buttonStyle(functions.style)"
              contenteditable>
              LINK
            </a>
            <button v-if="functions.typeValue === 'submit'" class="btn btnFull" type="submit" contenteditable>
              SUBMIT

            </button>
          </div>
          <!-- //button -->
        </div>
        <!-- //standard module case -->
        <!-- function module case -->
        <div v-else-if="type === 'function'" class="valueModule">
          <!-- input -->
          <div v-if="itemData.mods === 'input'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <input type="text" class="input" placeholder="text here" :required="functions.isRequired">
          </div>
          <!-- //input -->
          <!-- textarea -->
          <div v-if="itemData.mods === 'textarea'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <textarea type="text" class="input textarea" placeholder="text here" :required="functions.isRequired"></textarea>
          </div>
          <!-- //textarea -->
          <!-- quantity -->
          <div v-if="itemData.mods === 'quantity'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <div class="quantity">
              <button type="button" class="btnQuantity" data-quantity="minus" disabled>-</button>
              <input type="text" class="inputQuantity" :data-min="functions.min.vol" :data-max="functions.max.vol" :value="functions.min.vol" :required="functions.isRequired" :placeholder="`${functions.min.vol} ~ ${functions.max.vol}`">
              <button type="button" class="btnQuantity" data-quantity="plus" disabled>+</button>
            </div>
          </div>
          <!-- //quantity -->
          <!-- radio -->
          <div v-if="itemData.mods === 'radio'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <div
              v-for="(option, index) in functions.item"
              :key="index"
              class="listItem checkbox radio">
              <input type="radio" :name="`option_${mIdx}`" :id="`option_${mIdx}_${index}`" :value="option.itemValue" v-model="functions.optionValue" :required="functions.isRequired">
              <label :for="`option_${mIdx}_${index}`">{{ option.label[selectedLang] }}</label>
            </div>
          </div>
          <!-- //radio -->
          <!-- checkbox -->
          <div v-if="itemData.mods === 'checkbox'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <div
              v-for="(option, index) in functions.item"
              :key="index"
              class="listItem checkbox">
              <input type="checkbox" :name="`option_${mIdx}`" :id="`option_${mIdx}_${index}`" :value="option.itemValue" v-model="functions.optionValue" :required="functions.isRequired">
              <label :for="`option_${mIdx}_${index}`">{{ option.label[selectedLang] }}</label>
            </div>
          </div>
          <!-- //checkbox -->
          <!-- select -->
          <div v-if="itemData.mods === 'select'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <select class="input"
              v-model="functions.optionValue"
              :required="functions.isRequired">
              <option value="" disabled>{{ item.value[selectedLang] }}</option>
              <option
                v-for="(option, index) in functions.item"
                :key="index"
                :name="`option_${mIdx}`"
                :id="`option_${mIdx}_${index}`"
                :value="option.itemValue" readonly>
                {{ option.label[selectedLang] }}
              </option>
            </select>
          </div>
          <!-- //select -->
          <!-- datetime -->
          <div v-if="itemData.mods === 'datetime'">
            <datetime v-model="functions.value"></datetime>
          </div>
          <!-- //datetime -->
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
    selectedLang: function () {
      this.renderModule()
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
      let value = function () {
        if (e.target === undefined) { // is Editor?
          e.sourceElement.querySelectorAll("br[data-cke-filler='true']").forEach(x => x.remove())
          const isEmpty = e.sourceElement.innerText.length === 1 && e.sourceElement.childNodes.length
          return isEmpty ? '' : e.sourceElement.innerHTML
        }
      }
      let updateData = {
        value: value(),
        mIdx: mIdx,
        cIdx: cIdx
      }
      this.$emit('updateValue', updateData)
    },
    onDrop: function (e, data, dropRange) {
      if (dropRange.domTarget.contentEditable) {
        data.stop()
      }
    },
    buttonStyle: function (style) {
      let result = ''
      style.forEach(x => {
        result += `${x.key}: ${x.value}; `
      })
      return result
    },
    inActivate: function (arr) {
      return arr.join(' ')
    }
  }
}
</script>
