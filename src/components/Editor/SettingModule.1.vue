<template>
  <div class="moduleSetting">
    <div class="tabs">
      <button
        v-for="(button, index) in settingTab"
        :key="index"
        :data-setting_type="button.type"
        :class="{ active: button.type === settingType, btn: true }"
        @click="onTabClick($event, 'settingType', 'setting_type')">
        {{ button.label }}
      </button>
    </div>
    <div class="list">
      <div
        v-for="(item, index) in settingList"
        :key="index"
        :data-setting="item.option"
      >
        <div class="label">{{ item.moduleName }}</div>
        <div class="value">
          <div
            class="colorBox"
            v-if="item.option === 'color'">
            <div
              class="palette">
              
            </div>
            <sketch-picker
              v-model="colors"
              @input="changeColor"
              :value="colors">
            </sketch-picker>
          </div>
        </div>
      </div>
    </div>
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
      settingTab: [
        {type: "style", label: "스타일"},
        {type: "function", label: "기능"}
      ],
      settingType: "style",
      options: {},
      settingList: [],
      moduleInfo: {},
      settingInfo: {
        style: {},
        function: {}
      },
      colors: "rgba(255, 255, 255, 1)"
    }
  },
  created: function () {
    this.getSettings(this.settingType)
    this.setSettingData(this.settingType)
  },
  computed: {
    getModuleData () {
      this.moduleInfo = this.$store.state.moduledata.moduleData
      // console.log(this.moduleInfo)
    }
  },
  watch: {
    moduleInfo: function (data) {
      console.log(data)
    }
  },
  methods: {
    getSettings: function (type) {
      this.settingList = SETTING_DATA.filter(setting => {
        if (setting.type === type) {
          return setting
        }
      })
    },
    setSettingData: function (type) {
      this.settingInfo[type] = this.settingList.map(info => {
        if (info.type === type) {
          return info
        }
      })
      console.log(this.settingInfo[type])
    },
    onTabClick: function (e, dataType, targetType) {
      let type = e.target.dataset[targetType]
      if (this.moduleInfo.type === "standard" && type === "function") {
        alert("기본형은 기능 설정을 지원하지 않습니다")
      } else {
        this[dataType] = type
        this.getSettings(type)
      }
      // this.setSettingData(this.se)
      console.log(this.moduleInfo.type, type)
    },
    changeColor: function (color) {
      // if (typeof(color))
      // return color.hex
      console.log(color)
      // return rgbaColor
      // this.moduleInfo.style.backgroundColor = rgbaColor
    }
  }
}
</script>
