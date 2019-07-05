<template>
  <div class="moduleSetting">
    <div class="tabs">
      <button
        v-for="(button, index) in settingTab"
        :key="index"
        :data-setting_type="button.type"
        :class="{ active: button.type === settingType, tab: true }"
        @click="onTabClick">
        {{ button.label }}
      </button>
    </div>
    <div v-if="$store.state.content.isActive" class="list">
      <!-- setting style -->
      <div v-if="settingType === 'style'">
        <div
          class="item"
          v-for="(item, index) in settingList"
          :key="index">
          <div class="unit">
            <!-- 사용 여부 -->
            <div v-if="item.active !== undefined" class="checkbox">
              <input type="checkbox" :id="`${item.option}_${moduleInfo.id}`" v-model="item.active" @change="activeStyle(item, index)">
              <label :for="`${item.option}_${moduleInfo.id}`">{{ item.moduleName }}</label>
            </div>
            <!-- //사용 여부 -->

            <div v-if="item.settingInfo">
              <div>
                <div v-for="(set, idx) in item.settingInfo"
                  :key="idx">
                  <div class="label innerLabel">{{ set.label }}</div>
                  <!-- style :: color -->
                  <div
                    v-if="set.option === 'color'"
                    class="colorPreset"
                    :style="{ backgroundColor: settingColor(settingModuleData.style[set.key], set.key) }">
                    <input type="text"
                      class="btnColorPicker"
                      v-model="settingModuleData.style[set.key]"
                      @click="colorPicker" />
                    <sketch-picker
                      style="display: none"
                      v-model="settingModuleData.style[set.key]" />
                  </div>
                  <!-- //style :: color -->
                  <!-- style :: image -->
                  <div v-if="set.option === 'image'"
                    class="upload">
                    <input type="text"
                      class="input"
                      v-model="set.value"
                      readonly>
                    <input type="file" :id="`upload_${moduleInfo.id}`">
                    <label :for="`upload_${moduleInfo.id}`"></label>
                  </div>
                  <!-- //style :: image -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- //setting style -->
      <!-- setting function -->
      <div v-else-if="settingType === 'function'">
        <div v-if="$store.state.content.isFunction">
          <div
            class="item"
            v-for="(item, index) in settingList"
            :key="index">
            <!-- common :: data required -->
            <div v-if="settingModuleData.function.isRequired !== undefined" class="unit">
              <div class="checkbox">
                <input type="checkbox" id="isRequired" v-model="settingModuleData.function.isRequired"><label for="isRequired">필수입력</label>
              </div>
            </div>
            <!-- //common :: data required -->
            <!-- common :: data label -->
            <div v-if="settingModuleData.function.isRequired !== undefined" class="unit">
              <div
                v-for="(set, idx) in item.settingInfo"
                :key="idx">
                <div class="label">{{ set.label }}</div>
                <div>
                  <input type="text" class="input"
                    v-model="settingModuleInfo.column[0].value[selectedLang]"
                    @input="updateLabel" />
                </div>
              </div>
            </div>
            <!-- //common :: data label -->
            <!-- function :: quantity -->
            <div
              class="unit hasColumn"
              v-if="settingModuleInfo.mods === 'quantity'">
              <div class="unitColumn">
                <div class="label">{{ settingModuleData.function.min.name }}</div>
                <input type="text" v-model="settingModuleData.function.min.vol" class="input" data-quantity='min' @input="setQuantity" @focusout="validateQuantity" />
              </div>
              <div class="unitColumn">
                <div class="label">{{ settingModuleData.function.max.name }}</div>
                <input type="text" v-model="settingModuleData.function.max.vol" class="input" data-quantity='max' @input="setQuantity" @focusout="validateQuantity" />
              </div>
              <p class="message">{{ validateQuantity() }}</p>
            </div>
            <!-- //function :: quantity -->
            <!-- function :: radio -->
            <div
              class="unit itemList"
              v-if="settingModuleInfo.mods === 'radio'">
              <div class="label">{{ settingModuleData.function.label }}</div>
              <div
                class="listItem checkbox radio"
                v-for="(item, index) in settingModuleData.function.item"
                :key="index">

                <!-- label로 들어가는 값 -->
                <input type="text" class="input" :data-id="`option_${moduleInfo.id}_${index}`" v-model="item.label[selectedLang]">
                <!-- 실제 폼으로 전달받을 값 -->
                <input type="text" class="input input2" v-model="item.itemValue">

                <button type="button" class="btnRemove" @click="removeOption(index)">remove option</button>
              </div>
              <button type="button" class="btn btnFull" @click="addOption(settingModuleData.function.item.length)">Add option</button>
            </div>
            <!-- //function :: radio -->
            <!-- function :: checkbox -->
            <div
              class="unit itemList"
              v-if="settingModuleInfo.mods === 'checkbox'">
              <div class="label">{{ settingModuleData.function.label }}</div>
              <div
                class="listItem checkbox"
                v-for="(item, index) in settingModuleData.function.item"
                :key="index">

                <!-- label로 들어가는 값 -->
                <input type="text" class="input" :data-id="`option_${moduleInfo.id}_${index}`" v-model="item.label[selectedLang]">
                <!-- 실제 폼으로 전달받을 값 -->
                <input type="text" class="input input2" v-model="item.itemValue">

                <button type="button" class="btnRemove" @click="removeOption(index)">remove option</button>
              </div>
              <button type="button" class="btn btnFull" @click="addOption(settingModuleData.function.item.length)">Add option</button>
            </div>
            <!-- //function :: checkbox -->
            <!-- function :: select -->
            <div
              class="unit itemList"
              v-if="settingModuleInfo.mods === 'select'">
              <div class="label">{{ settingModuleData.function.label }}</div>
              <div
                class="listItem checkbox radio"
                v-for="(item, index) in settingModuleData.function.item"
                :key="index">

                <!-- option으로 들어가는값 -->
                <input type="text" class="input" :data-id="`option_${moduleInfo.id}_${index}`" v-model="item.label[selectedLang]">
                <!-- 실제 폼으로 전달받을값 -->
                <input type="text" class="input input2" v-model="item.itemValue">

                <button type="button" class="btnRemove" @click="removeOption(index)">remove option</button>
              </div>
              <button type="button" class="btn btnFull" @click="addOption(settingModuleData.function.item.length)">Add option</button>
            </div>
            <!-- //function :: select -->
            <!-- function :: button -->
            <div v-if="settingModuleInfo.mods === 'button'">
              <div class="unit itemList">
                <div class="listItem">
                  <div
                    class="checkbox radio"
                    v-for="(item, index) in settingModuleData.function.type"
                    :key="index">
                    <input type="radio" :name="`option_${moduleInfo.id}`" :id="`option_${moduleInfo.id}_${index}`" :value="item.action" v-model="settingModuleData.function.typeValue">
                    <label :for="`option_${moduleInfo.id}_${index}`">{{ item.name }}</label>
                  </div>
                </div>
                <!-- link url input -->
                <div class="listItem">
                  <input type="url" class="input" placeholder="url link" v-model="settingModuleData.function.url" :disabled="settingModuleData.function.typeValue !== 'link'" />
                </div>
              </div>
              <!-- button color -->
              <div class="unit itemList">
                <div
                  class="listItem"
                  v-for="(itemStyle, index) in settingModuleData.function.style"
                  :key="index">
                  <div class="label">{{ itemStyle.label }}</div>
                  <div
                    class="colorPreset"
                    :style="{ backgroundColor: settingBtnColor(itemStyle.value, index) }">
                    <input type="text"
                      class="btnColorPicker"
                      v-model="settingModuleData.function.style[index].value"
                      @click="colorPicker" />
                    <sketch-picker
                      style="display: none"
                      v-model="settingModuleData.function.style[index].value" />
                  </div>
                </div>
              </div>
            </div>
            <!-- //function :: button -->
            <!-- function :: date time -->
            <div
              class="unit itemList"
              v-if="settingModuleInfo.mods === 'datetime'">
              <div class="label">{{ settingModuleData.function.label }}</div>
            </div>
            <!-- //function :: date time -->
          </div>
        </div>
        <div v-else class="requireMessage">기능을 지원하지 않는 모듈입니다</div>
      </div>
      <!-- //setting function -->
    </div>
    <div v-else class="requireMessage">모듈을 먼저 선택하세요</div>
  </div>
</template>

<script>
import settings from "./ModuleSetting"
import sketch from 'vue-color/src/components/Sketch.vue'
import regExp from "@/common/regExp"

const SETTING_DATA = Object.values(settings)

export default {
  name: 'SettingModule',
  components: {
    'sketch-picker': sketch
  },
  data () {
    return {
      settingTab: [
        {type: "style", label: "스타일"},
        {type: "function", label: "기능"}
      ],
      settingType: "style",
      settingList: [],
      settingModuleInfo: {},
      settingModuleData: {}
    }
  },
  created: function () {
    this.getSettings(this.settingType)
  },
  computed: {
    selectedLang () {
      return this.$store.state.setcontent.lang
    },
    moduleInfo: function () {
      return this.$store.state.content.activeModule
    }
  },
  watch: {
    settingType: function (data) {
      this.getSettings(this.settingType)
    },
    moduleInfo: {
      deep: true,
      handler: function (data) {
        this.$store.state.content.isActive = true
        this.settingModuleData = this._.cloneDeep(data.setting)
        this.settingModuleInfo = this._.cloneDeep(data.dataSet)
      }
    },
    settingModuleData: {
      deep: true,
      handler: function (data) {
        this.$store.commit('content/settingModuleData', data)
        if (this._.isEmpty(data.function)) {
          this.getSettings('style')
          this.settingType = 'style'
        }
      }
    }
  },
  methods: {
    getSettings: function (type) {
      this.settingList = this._.cloneDeep(SETTING_DATA.filter(setting => { return setting.type === type }))
    },
    onTabClick: function (e) {
      let type = e.target.dataset.setting_type
      this.settingType = type
    },
    activeStyle: function (item, index) {
      if (!item.active) {
        this.settingModuleData.style.inActivate.push(item.option)
        this.settingList[index].active = false
      } else {
        let optionIndex = this.settingModuleData.style.inActivate.indexOf(item.option)
        this.settingModuleData.style.inActivate.splice(optionIndex, 1)
        this.settingList[index].active = true
        console.log('왜..')
      }
      this.settingList[index].active != this.settingList[index].active
      console.log(this.settingList[index].active)
    },
    colorPicker: function (e) {
      e.target.closest('.colorPreset').classList.add('active')
      e.target.nextSibling.style.display = 'block'
      document.addEventListener('click', this.hideColorPicker)
    },
    hideColorPicker: function (e) {
      if ( e.target.closest('.colorPreset') === null ) {
        document.querySelectorAll('.colorPreset').forEach(x => {
          x.classList.remove('active')
        })
        document.querySelectorAll('.vc-sketch').forEach(x => {
          x.style.display = 'none'
        })
        document.removeEventListener('click', this.hideColorPicker)
      }
    },
    settingColor: function (c, key) {
      let rgba = typeof(c) === 'string' ? c : `rgba(${c.rgba.r},${c.rgba.g},${c.rgba.b},${c.rgba.a})`
      this.settingModuleData.style[key] = rgba
      return rgba
    },
    updateLabel: function () {
      let data = this.settingModuleInfo
      this.$store.commit('content/settingModuleInfo', data)
    },
    setQuantity: function (e) {
      const role = e.target.dataset.quantity
      let vol = this.settingModuleData.function[role].vol
      this.settingModuleData.function[role].vol = Number(regExp.numberOnly(e.target.value))
    },
    validateQuantity: function (e) {
      const min = this.settingModuleData.function.min.vol
      const max = this.settingModuleData.function.max.vol
      let message = min > max ? '최대값보다 최소값이 높습니다' : ''
      return message
    },
    addOption: function (length) {
      length++
      let newOption = this._.cloneDeep(this._.last(this.settingModuleData.function.item))
      Object.keys(newOption.label).forEach(x => {
        newOption.label[x] = `list option ${length}`
      })
      this.settingModuleData.function.item.push(newOption)
    },
    removeOption: function (index) {
      let isLast = this.settingModuleData.function.item.length <= 1
      isLast ? alert ('옵션을 모두 삭제할 수 없습니다.') : this.settingModuleData.function.item.splice(index, 1)
    },
    settingBtnColor: function (c, index) {
      let rgba = typeof(c) === 'string' ? c : `rgba(${c.rgba.r},${c.rgba.g},${c.rgba.b},${c.rgba.a})`
      this.settingModuleData.function.style[index].value = rgba
      return rgba
    },
  }
}
</script>
