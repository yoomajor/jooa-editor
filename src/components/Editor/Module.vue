<template>
  <div class="inner"
    :data-mods="itemData.mods"
    :data-lang="$store.state.setcontent.lang"
    :style="styles"
    :class="inActive(styles.inActive)">
    <div class="module">
      <div
        class="column"
        v-for="(item, index) in itemData.column"
        :key="index">
        <!-- standard module case -->
        <div v-if="type === 'standard'" class="standardModule">
          <!-- text -->
          <div v-if="item.type === 'text'" @focusout="updateValue($event, index, mIdx)" class="standardText">
            <ckeditor
              :editor="editor"
              v-model="item.value[selectedLang]"
              :config="config">
            </ckeditor>
          </div>
          <!-- //text -->
          <!-- image -->
          <div v-if="item.type === 'image'" class="standardImage">
            <img v-if="item.value" :src="item.value" alt="" />
            <label :class="{uploadImg: true, hasImg: item.value}"><span>Upload image</span><input type="file" @change="uploadImage($event, item)"></label>
          </div>
          <!-- //image -->
          <!-- embed -->
          <div v-if="item.type === 'embed'"
            :class="{standardEmbed: true, formGroup: true, isEmbed: item.value}">
            <div v-if="item.value" v-html="item.value" class="embed"></div>
            <textarea name="" class="input" placeholder="iframe code here" rows="4" :value="item.value"></textarea>
            <button type="button" class="btn btnFull" @click="btnEmbed($event, item)">{{ `${item.value ? '수정' : '적용'}` }}</button>
          </div>
          <!-- //embed -->
          <!-- button -->
          <div v-if="item.type === 'button'" class="buttonModule">
            <a v-if="functions.typeValue === 'link'"
              class="btn btnFull sizeL"
              target="_blank"
              :href="functions.url"
              :style="buttonStyle(functions.style)"
              v-html="item.value[selectedLang]"
              @blur="updateValue($event, index, mIdx)"
              contenteditable>
            </a>
            <button v-if="functions.typeValue === 'submit' || functions.typeValue ==='cart'"
              class="btn btnFull sizeL"
              :style="buttonStyle(functions.style)"
              v-html="item.value[selectedLang]"
              @blur="updateValue($event, index, mIdx)"
              type="submit" contenteditable>
            </button>
          </div>
          <!-- //button -->
          <!-- border -->
          <div v-if="item.type === 'border'" class="standardBorder">
            <div class="border"
              :style="unitStyles"
              >
            </div>
          </div>
          <!-- border -->
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
            <div v-if="functions.price.isPrice" class="price">
              <i class="icoCurrency" v-html="$store.state.currency.currencyInfo.e"></i>
              <span>{{ functions.price.value }}</span>
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
              <label :for="`option_${mIdx}_${index}`">{{ option.label[selectedLang] }} <span v-if="$store.state.content.isPrice" class="optionPrice">{{ optionPrice(option.itemPrice) }}</span></label>
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
              <label :for="`option_${mIdx}_${index}`">{{ option.label[selectedLang] }} <span v-if="$store.state.content.isPrice" class="optionPrice">{{ optionPrice(option.itemPrice) }}</span></label>
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
          <div v-if="itemData.mods === 'datetime'"
            :class="{ isRequired: functions.isRequired, formGroup: true }">
            <div class="label">{{ item.value[selectedLang] }}</div>
            <div class="multiBtn">
              <button :style="buttonStyle(functions.style)" type="button" class="btn sizeM btnColumn" contenteditable>ASAP</button>
              <button :style="buttonStyle(functions.style)" type="button" class="btn sizeM btnColumn" contenteditable>SET TIME</button>
            </div>
            <div class="datetime">
              <datetime type="date"
                v-model="functions.date"
                input-class="input dateInput"
                format="yyyy-LL-dd">
              </datetime>
              <datetime type="time"
                v-model="functions.date"
                input-class="input timeInput"
                :minute-step="30">
              </datetime>
            </div>
          </div>
          <!-- //datetime -->
        </div>
        <!-- //function module case -->
      </div>
    </div>
  </div>
</template>

<script>
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import config from './ckeditor_config'
import Datetime from 'vue-datetime/src/Datetime.vue'

export default {
  props: [
    'data',
    'styles',
    'unitStyles',
    'functions',
    'mIdx',
    'type',
    'state'
  ],
  components: {
    datetime: Datetime
  },
  data () {
    return {
      editor: InlineEditor,
      itemData: {},
      editColumn: {},
      editorValue: {},
      config: config,
      currentValue: ''
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
    updateEditorValue: function (data) {
      console.log(data)
      this.currentValue = data
    },
    updateValue: function (e, cIdx, mIdx) {
      let value = e.target.innerHTML
      let updateData = {
        value: value,
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
    inActive: function (arr) {
      if (arr !== undefined) {
        return arr.join(' ')
      }
    },
    uploadImage: function (e, dataTarget) {
      const target = e.target
      if (target.files && target.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const src = e.target.result
          dataTarget.value = src
        }
        reader.readAsDataURL(target.files[0])
      }
    },
    optionPrice: function (price) {
      const uncommaPrice = Number(String(price).replace(/[^-+.\d]/g, ''))
      return uncommaPrice === 0 ? '' : `(${price})`
    },
    btnEmbed: function (e, item) {
      e.stopPropagation()
      const value = e.target.closest('.standardEmbed').querySelector('.input').value
      item.value = value
    }
  }
}
</script>
