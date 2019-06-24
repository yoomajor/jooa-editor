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
      {{ moduleInfo }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingModule',
  data () {
    return {
      settingTab: [
        {type: "style", label: "스타일"},
        {type: "function", label: "기능"}
      ],
      settingType: "style",
      moduleInfo: {}
    }
  },
  computed: {
    getModuleData () {
      this.moduleInfo = this.$store.state.moduledata.moduleData
      console.log(this.$store.state.moduledata.moduleData)
    }
  },
  watch: {
    getModuleData (data) {
      console.log(this.moduleInfo.html)
    }
  },
  methods: {
    onTabClick: function (e, dataType, targetType) {
      let type = e.target.dataset[targetType]
      if (this.moduleInfo.type === "standard" && type === "function") {
        alert("기본형은 기능 설정을 지원하지 않습니다")
      } else {
        this[dataType] = type
      }
    }
  }
}
</script>
