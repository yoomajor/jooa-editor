<template>
  <div class="moduleSetting">
    <div v-if="isActive">
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
      <div class="list">
        <!-- setting style -->
        <div v-if="settingType === 'style'">
          <div
            class="item"
            v-for="(item, index) in settingList"
            :key="index">
            <div
              class="unit"
              v-for="(set, idx) in item.settingInfo"
              :key="idx">
              <div class="label">{{ set.label }}</div>
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
              <div
                v-if="set.option === 'image'">
                <input type="text"
                  class="input"
                  v-model="set.value">
                <input type="file">
              </div>
              <!-- //style :: image -->
            </div>
          </div>
        </div>
        <!-- //setting style -->
        <!-- setting function -->
        <div v-else-if="settingType === 'function'">
          <div
            class="item"
            v-for="(item, index) in settingList"
            :key="index">
            <!-- common :: data required -->
            <div class="unit">
              <div class="checkbox">
                <input type="checkbox" id="isRequired" v-model="settingModuleData.function.isRequired"><label for="isRequired">필수입력</label>
              </div>
            </div>
            <!-- //common :: data required -->
            <div
              class="unit"
              v-for="(set, idx) in item.settingInfo"
              :key="idx">
              <!-- common :: data label -->
              <div class="label">{{ set.label }}</div>
              <div>
                <input type="text" class="input"
                  v-model="settingModuleInfo.column[0].value[selectedLang]"
                  @input="updateLabel" />
              </div>
              <!-- //common :: data label -->
            </div>
          </div>
        </div>
        <!-- //setting function -->


        <p>settingModuleInfo</p>
        {{ settingModuleInfo }}
        <p>settingModuleData</p>
        {{ settingModuleData }}
      </div>
    </div>
    <div v-else class="requireMessage">모듈을 먼저 선택하세요</div>
  </div>
</template>

<script>
import settings from "./ModuleSetting"
import sketch from 'vue-color/src/components/Sketch.vue'

const SETTING_DATA = Object.values(settings)

export default {
  name: 'SettingModule',
  components: {
    'sketch-picker': sketch
  },
  data () {
    return {
      isActive: false,
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
        this.isActive = true
        this.settingModuleData = this._.cloneDeep(data.setting)
        this.settingModuleInfo = this._.cloneDeep(data.dataSet)
      }
    },
    settingModuleData: {
      deep: true,
      handler: function (data) {
        this.$store.commit('content/settingModuleData', data)
      }
    }
  },
  methods: {
    getSettings: function (type) {
      this.settingList = this._.cloneDeep(SETTING_DATA.filter(setting => { return setting.type === type }))
    },
    onTabClick: function (e) {
      let type = e.target.dataset.setting_type
      if (this.$store.state.content.activeModule.type === 'standard' && type === 'function') {
        alert('기본형 모듈은 스타일 설정만 가능합니다')
      } else {
        this.settingType = type
      }
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
    checkRequired: function () {
      console.log(this.isRequired)
    }
  }
}
</script>
