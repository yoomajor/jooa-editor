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
            <div style="font-size:20px;">
            {{item.active}}
            </div>
            <div v-if="item.active !== undefined" class="checkbox">
              <input type="checkbox" :id="`${item.option}_${moduleInfo.id}`" :value="item.active" v-model="item.active" @change="activeStyle(item, index)">
              <label :for="`${item.option}_${moduleInfo.id}`">{{ item.moduleName }}</label>
            </div>
            <div v-else class="label">{{ item.moduleName }}</div>
            <!-- //사용 여부 -->
            <div v-if="item.settingInfo">
              <div v-for="(set, idx) in item.settingInfo"
                :key="idx">
                <div class="label innerLabel">{{ set.label }}</div>
                <!-- style :: color -->
                <div
                  v-if="set.option === 'color'"
                  class="colorPreset"
                  :style="{ backgroundColor: settingColor(settingModuleData.style[set.key], set.key, 'style') }">
                  <input type="text"
                    class="btnColorPicker"
                    v-model="settingModuleData.style[set.key]"
                    @click="colorPicker" />
                  <sketch-picker
                    style="display: none"
                    v-model="settingModuleData.style[set.key]" />
                </div>
                <!-- //style :: color -->
                <!-- style :: unitColor -->
                <div
                  v-if="set.option === 'unitColor'"
                  class="colorPreset"
                  :style="{ backgroundColor: settingColor(settingModuleData.unitStyle[set.key], set.key, 'unitStyle') }">
                  <input type="text"
                    class="btnColorPicker"
                    v-model="settingModuleData.unitStyle[set.key]"
                    @click="colorPicker" />
                  <sketch-picker
                    style="display: none"
                    v-model="settingModuleData.unitStyle[set.key]" />
                </div>
                <!-- //style :: unitColor -->
                <!-- style :: border module -->
                <div v-if="item.option === 'border' && set.option ==='style'">
                  <div class="checkbox radio">
                    <input type="radio" id="borderunit_solid" name="borderunit" value="solid" v-model="settingModuleData.unitStyle[set.key]">
                    <label for="borderunit_solid">solid</label>
                  </div>
                  <div class="checkbox radio">
                    <input type="radio" id="borderunit_dashed" name="borderunit" value="dashed" v-model="settingModuleData.unitStyle[set.key]">
                    <label for="borderunit_dashed">dashed</label>
                  </div>
                </div>
                <!-- style :: border module -->
                <!-- style :: image -->
                <div v-if="set.option === 'image'"
                  class="upload">
                  <input type="text"
                    class="input"
                    placeholder="upload image"
                    v-model="settingModuleData.style.backgroundImage"
                    readonly>
                  <input type="file" :id="`upload_${moduleInfo.id}`" @change="uploadImage($event, set)">
                  <label :for="`upload_${moduleInfo.id}`"></label>
                  <button type="button" class="btnRemove" @click="removeImage($event, set)">remove option</button>
                </div>
                <!-- //style :: image -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- //setting style -->
      <!-- setting function -->
      <div v-else-if="settingType === 'function'" class="listBox">
        <div v-if="$store.state.content.isFunction">
          <div v-for="(item, index) in settingList"
            :key="index">
            <!-- common :: data required -->
            <div v-if="settingModuleData.function.isRequired !== undefined"
              class="item">
              <div class="unit checkbox">
                <input type="checkbox" id="isRequired" v-model="settingModuleData.function.isRequired"><label for="isRequired">필수입력</label>
              </div>
            </div>
            <!-- //common :: data required -->
            <!-- common :: data label -->
            <div v-if="settingModuleData.function.isRequired !== undefined"
              class="item">
              <div class="unit">
                <div
                  v-for="(set, idx) in item.settingInfo"
                  :key="idx">
                  <div class="label">{{ set.label }}</div>
                  <input type="text" class="input"
                    v-model="settingModuleInfo.column[0].value[selectedLang]"
                    @input="updateLabel" />
                </div>
              </div>
            </div>
            <!-- //common :: data label -->
            <!-- function :: quantity -->
            <div v-if="settingModuleInfo.mods === 'quantity'">
              <div class="item">
                <div class="unit hasColumn">
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
              </div>
              <div class="item">
                <div class="unit">
                  <div class="checkbox label">
                    <input type="checkbox" :id="`price_${moduleInfo.id}`" @change="isPrice(settingModuleData.function.price.isPrice)" v-model="settingModuleData.function.price.isPrice">
                    <label :for="`price_${moduleInfo.id}`">price</label>
                  </div>
                  <input v-if="settingModuleData.function.price.isPrice" type="text" class="input" @input="setPrice" v-model="settingModuleData.function.price.value">
                </div>
              </div>
            </div>
            <!-- //function :: quantity -->
            <!-- function :: radio -->
            <div v-if="settingModuleInfo.mods === 'radio'"
              class="item">
              <div class="unit itemList">
                <div class="label">{{ settingModuleData.function.label }}</div>
                <div v-for="(item, idx) in settingModuleData.function.item"
                  class="listItem checkbox radio"
                  :key="idx">

                  <!-- label로 들어가는 값 -->
                  <input type="text" class="input" :data-id="`option_${moduleInfo.id}_${idx}`" v-model="item.label[selectedLang]">
                  <!-- 실제 폼으로 전달받을 값 -->
                  <input type="text" class="input input2" v-model="item.itemValue">
                  <!-- 가격이 있으면 증감될 값 -->
                  <input v-if="$store.state.content.isPrice" type="text" class="input" @input="itemPrice($event, idx)" v-model="item.itemPrice">

                  <button type="button" class="btnRemove" @click="removeOption(idx)">remove option</button>
                </div>
                <button type="button" class="btn btnFull" @click="addOption(settingModuleData.function.item.length)">Add option</button>
              </div>
            </div>
            <!-- //function :: radio -->
            <!-- function :: checkbox -->
            <div v-if="settingModuleInfo.mods === 'checkbox'"  class="item">
              <div class="unit itemList">
                <div class="label">{{ settingModuleData.function.label }}</div>
                <div v-for="(item, idx) in settingModuleData.function.item"
                  :key="idx"
                  class="listItem checkbox">

                  <!-- label로 들어가는 값 -->
                  <input type="text" class="input" :data-id="`option_${moduleInfo.id}_${idx}`" v-model="item.label[selectedLang]">
                  <!-- 실제 폼으로 전달받을 값 -->
                  <input type="text" class="input input2" v-model="item.itemValue">
                  <!-- 가격이 있으면 증감될 값 -->
                  <input v-if="$store.state.content.isPrice" type="text" class="input" @input="itemPrice($event, idx)" v-model="item.itemPrice">

                  <button type="button" class="btnRemove" @click="removeOption(idx)">remove option</button>
                </div>
                <button type="button" class="btn btnFull" @click="addOption(settingModuleData.function.item.length)">Add option</button>
              </div>
            </div>
            <!-- //function :: checkbox -->
            <!-- function :: select -->
            <div v-if="settingModuleInfo.mods === 'select'" class="item">
              <div  class="unit itemList">
                <div class="label">{{ settingModuleData.function.label }}</div>
                <div v-for="(item, idx) in settingModuleData.function.item"
                  :key="idx"
                  class="listItem checkbox radio">

                  <!-- option으로 들어가는값 -->
                  <input type="text" class="input" :data-id="`option_${moduleInfo.id}_${idx}`" v-model="item.label[selectedLang]">
                  <!-- 실제 폼으로 전달받을값 -->
                  <input type="text" class="input input2" v-model="item.itemValue">

                  <button type="button" class="btnRemove" @click="removeOption(idx)">remove option</button>
                </div>
                <button type="button" class="btn btnFull" @click="addOption(settingModuleData.function.item.length)">Add option</button>
              </div>
            </div>
            <!-- //function :: select -->
            <!-- function :: button -->
            <div v-if="settingModuleInfo.mods === 'button'">
              <div class="item">
                <div class="unit itemList">
                  <div class="listItem">
                    <div
                      class="checkbox radio"
                      v-for="(item, idx) in settingModuleData.function.type"
                      :key="idx">
                      <input type="radio" :name="`option_${moduleInfo.id}`" :id="`option_${moduleInfo.id}_${idx}`" :value="item.action" v-model="settingModuleData.function.typeValue">
                      <label :for="`option_${moduleInfo.id}_${idx}`">{{ item.name }}</label>
                    </div>
                  </div>
                  <!-- link url input -->
                  <div class="listItem">
                    <input type="url" class="input" placeholder="url link" v-model="settingModuleData.function.url" :disabled="settingModuleData.function.typeValue !== 'link'" />
                  </div>
                </div>
              </div>
              <div class="item">
                <!-- button color -->
                <div class="unit itemList">
                  <div
                    class="listItem"
                    v-for="(itemStyle, idx) in settingModuleData.function.style"
                    :key="idx">
                    <div class="label">{{ itemStyle.label }}</div>
                    <div
                      class="colorPreset"
                      :style="{ backgroundColor: settingBtnColor(itemStyle.value, idx) }">
                      <input type="text"
                        class="btnColorPicker"
                        v-model="settingModuleData.function.style[idx].value"
                        @click="colorPicker" />
                      <sketch-picker
                        style="display: none"
                        v-model="settingModuleData.function.style[idx].value" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //function :: button -->
            <!-- function :: date time -->
            <div v-if="settingModuleInfo.mods === 'datetime'" class="item">
              <div class="unit itemList">
                <div
                  class="listItem"
                  v-for="(itemStyle, idx) in settingModuleData.function.style"
                  :key="idx">
                  <div class="label">{{ itemStyle.label }}</div>
                  <div
                    class="colorPreset"
                    :style="{ backgroundColor: settingBtnColor(itemStyle.value, idx) }">
                    <input type="text"
                      class="btnColorPicker"
                      v-model="settingModuleData.function.style[idx].value"
                      @click="colorPicker" />
                    <sketch-picker
                      style="display: none"
                      v-model="settingModuleData.function.style[idx].value" />
                  </div>
                </div>
              </div>
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
import settings from './ModuleSetting'
import sketch from 'vue-color/src/components/Sketch.vue'
import regExp from '@/common/regExp'

const SETTING_DATA = Object.values(settings)

export default {
  name: 'SettingModule',
  components: {
    'sketch-picker': sketch
  },
  data () {
    return {
      settingTab: [
        { type: 'style', label: '스타일' },
        { type: 'function', label: '기능' }
      ],
      settingType: 'style',
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
        this._.isEmpty(data.function) ? this.settingType = 'style' : this.settingType = this.settingType
        this.getSettings(this.settingType)
      }
    }
  },
  methods: {
    getSettings: function (type) {
      this.settingList = this._.cloneDeep(SETTING_DATA.filter(setting => { return setting.type === type }))
      // 기능형 모듈 체크여부 데이터 맵핑
      if (this.settingModuleData.style && this.settingModuleData.style.inActive.length) {
        this.settingModuleData.style.inActive.forEach(x => {
          this.settingList.forEach(s => {
            if (s.active !== undefined) {
              s.active = s.option !== x
            }
          })
        })
      }
      // 특정 모듈 한정 스타일(ex.구분선) 데이터 재배열
      if (this.settingModuleData.unitStyle === undefined) {
        this.settingList = this.settingList.filter(x => !x.isUnit)
      } else {
        this.settingList = this.settingList.filter(x => !x.isUnit || x.isUnit === this.moduleInfo.name)
      }
      // 특정 모듈 한정 제외 스타일 데이터 삭제(ex. 구분선에 text color는 불필요)
      if (this.settingModuleData.exceptUnit !== undefined) {
        const exceptUnit = this.settingModuleData.exceptUnit
        this.settingList = this.settingList.filter(x => {
          return exceptUnit.indexOf(x.name) === -1
        })
      }
    },
    onTabClick: function (e) {
      let type = e.target.dataset.setting_type
      this.settingType = type
    },
    activeStyle: function (item, index) {
      if (!item.active) {
        this.settingModuleData.style.inActive.push(item.option)
      } else {
        let optionIndex = this.settingModuleData.style.inActive.indexOf(item.option)
        this.settingModuleData.style.inActive.splice(optionIndex, 1)
      }
      this.settingList[index].active = !this.settingList[index].active
      console.log(this.settingList[index].active, this.settingModuleData.style.inActive)
    },
    colorPicker: function (e) {
      e.target.closest('.colorPreset').classList.add('active')
      e.target.nextSibling.style.display = 'block'
      document.addEventListener('click', this.hideColorPicker)
    },
    hideColorPicker: function (e) {
      if (e.target.closest('.colorPreset') === null) {
        document.querySelectorAll('.colorPreset').forEach(x => {
          x.classList.remove('active')
        })
        document.querySelectorAll('.vc-sketch').forEach(x => {
          x.style.display = 'none'
        })
        document.removeEventListener('click', this.hideColorPicker)
      }
    },
    settingColor: function (c, key, dataPos) {
      if (c !== undefined) {
        let rgba = typeof (c) === 'string' ? c : `rgba(${c.rgba.r},${c.rgba.g},${c.rgba.b},${c.rgba.a})`
        this.settingModuleData[dataPos][key] = rgba
        return rgba
      }
    },
    uploadImage: function (e, dataTarget) {
      const target = e.target
      if (target.files && target.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const src = `url(${e.target.result})`
          this.$store.commit('content/uploadImg', src)
        }
        reader.readAsDataURL(target.files[0])
      }
    },
    removeImage: function (e, dataTarget) {
      this.$store.commit('content/uploadImg', '')
    },
    updateLabel: function () {
      let data = this.settingModuleInfo
      this.$store.commit('content/settingModuleInfo', data)
    },
    setQuantity: function (e) {
      const role = e.target.dataset.quantity
      this.settingModuleData.function[role].vol = Number(regExp.numberOnly(e.target.value))
    },
    setPrice: function (e) {
      this.settingModuleData.function.price.value = regExp.comma(e.target.value)
    },
    itemPrice: function (e, idx) {
      this.settingModuleData.function.item[idx].itemPrice = regExp.comma(e.target.value)
    },
    validateQuantity: function (e) {
      const min = this.settingModuleData.function.min.vol
      const max = this.settingModuleData.function.max.vol
      let message = min > max ? '최대값보다 최소값이 높습니다' : ''
      return message
    },
    isPrice: function (isPrice) {
      this.$store.commit('content/isPrice', isPrice)
    },
    addOption: function (length) {
      length++
      let newOption = this._.cloneDeep(this._.last(this.settingModuleData.function.item))
      Object.keys(newOption.label).forEach(x => {
        newOption.label[x] = `list option ${length}`
      })
      newOption.itemValue = `value ${length}`
      this.settingModuleData.function.item.push(newOption)
    },
    removeOption: function (index) {
      let isLast = this.settingModuleData.function.item.length <= 1
      if (isLast) {
        alert ('옵션을 모두 삭제할 수 없습니다.')
      } else {
        this.settingModuleData.function.item.splice(index, 1)
      }
    },
    settingBtnColor: function (c, index) {
      let rgba = typeof (c) === 'string' ? c : `rgba(${c.rgba.r},${c.rgba.g},${c.rgba.b},${c.rgba.a})`
      this.settingModuleData.function.style[index].value = rgba
      return rgba
    }
  }
}
</script>
