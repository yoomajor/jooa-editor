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
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in settingList"
        :key="index"
        :data-setting="item.option"
      >
        <div class="label">{{ item.settingKey }}</div>
        <div class="value">{{ item.settingValue }}</div>
        {{ moduleData }}
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
      settingList: [],
      settingInfo: {}
    }
  },
  computed: {
    moduleData () {
      return this.$store.state.moduledata.moduleData
    }
  },
  created: function () {
    this.getSettings(this.settingType)
  },
  watch: {
    settingType: function (data) {
      // console.log(data)
    },
    moduleData: function (data) {
      this.settingInfo = data
      // console.log(data)
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
      // this.moduleData
      /*
      this.settingInfo[type] = this.settingList.map(info => {
        if (info.type === type) {
          return info
        }
      })
      */
    },
    onTabClick: function (e) {
      let type = e.target.dataset.setting_type
      this.settingType = type
    },
    changeColor: function (color) {
    }
  }
}
</script>
