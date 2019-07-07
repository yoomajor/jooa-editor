<template>
  <div class="editor">
    <!-- module list -->
    <div class="moduleList">
      <div class="tabs">
        <button
          v-for="(button, index) in moduleTab"
          :key="index"
          :data-module_type="button.type"
          :class="{ active: button.type === moduleType, tab: true }"
          @click="onTabClick($event, 'moduleType', 'module_type')">
          {{ button.label }}
        </button>
      </div>
      <draggable
        class="list"
        :list="moduleList"
        :group="{ name: 'moduleGroup', pull: 'clone', put: false }"
        :sort="false"
        :clone="onClone">
        <div
          class="item"
          v-for="(module, index) in moduleList"
          :key="`module${index}`"
          :data-mods_name="module.name">
          {{ module.moduleName }}
        </div>
      </draggable>
    </div>
    <!-- //module list -->
    <!-- content -->
    <div class="preview"
      @click="onDocumentClick">
      <div id="article" class="article">

      <draggable
        :class="{ modsWrap: true}"
        :list="content"
        :animation="200"
        :options="{draggable: '.mods'}"
        @choose="onChoose"
        @unchoose="onUnChoose"
        group="moduleGroup"
        handle=".handleMods .handleMove">
        <div
          class="mods"
          v-for="(module, index) in content"
          :key="module.id"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
          @click="onModuleClick($event, index, module)">
          <Module
            @updateValue="updateValue"
            :state="editMode.state"
            :data="module.dataSet"
            :styles="module.setting.style"
            :unitStyles="module.setting.unitStyle"
            :functions="module.setting.function"
            :mIdx="index"
            :type="module.type">
          </Module>
          <div class="handleMods">
            <button type="button" class="handle handleMove" title="이동"></button>
            <button type="button" class="handle handleDel" @click="onRemove($event, index)" title="삭제"></button>
          </div>
        </div>
      </draggable>

      </div>
    </div>
    <!-- //content -->
    <!-- setting module -->
    <div class="setting">
      <SettingModule>
      </SettingModule>
    </div>
    <!-- //setting module -->
  </div>
</template>

<script>
import modules from "./Modules"
import draggable from "vuedraggable"
import Module from "./Module.vue"
import SettingModule from "./SettingModule.vue"

const MODULE_DATA = Object.values(modules)
let moduleId = 0

export default {
  components: {
    draggable,
    Module,
    SettingModule
  },
  data () {
    return {
      moduleTab: [
        {type: "standard", label: "기본형"},
        {type: "function", label: "기능형"}
      ],
      moduleType: "standard",
      moduleList: [],
      editMode: {
        state: 'default'
      },
      content: [],
      moduleInfo: {},
      moduleStyle: {}
    }
  },
  computed: {
    selectedLang () {
      return this.$store.state.setcontent.lang
    },
    settingModuleData () {
      return this.$store.state.content.settingModuleData
    },
    settingModuleInfo () {
      return this.$store.state.content.settingModuleInfo
    }
  },
  watch: {
    moduleType: function () {
      this.getModules(this.moduleType)
    },
    selectedLang: function (data) {
      this.getModules(this.moduleType)
    },
    settingModuleData: {
      deep: true,
      handler: function (data) {
        let activeIndex = this.$store.state.content.activeModule.id
        let modules = this.content.filter(function(x) {
            return x.id === activeIndex
        })[0]
        let moduleIndex = this.content.indexOf(modules)
        let activeModule = this.content[moduleIndex]
        activeModule.setting.style = this._.cloneDeep(data.style)
        activeModule.setting.function = this._.cloneDeep(data.function)
        activeModule.setting.unitStyle = this._.cloneDeep(data.unitStyle)
      }
    },
    settingModuleInfo: {
      deep: true,
      handler: function (data) {
        let activeIndex = this.$store.state.content.activeModule.id
        let modules = this.content.filter(function(x) {
            return x.id === activeIndex
        })[0]
        let moduleIndex = this.content.indexOf(modules)
        let activeModule = this.content[moduleIndex]
        activeModule.dataSet = this._.cloneDeep(data)
      }
    },
    content: {
      deep: true,
      handler: function (data) {
        this.$store.commit('content/modules', data)
      }
    }
  },
  created: function () {
    this.getModules(this.moduleType)
    this.getData()
  },
  methods: {
    onTabClick: function (e, dataType, targetType) {
      const type = e.target.dataset[targetType]
      this[dataType] = type
    },
    getModules: function (type) {
      this.moduleList = this._.cloneDeep(MODULE_DATA.filter(mods => { return mods.type === type }))
      this.moduleList.filter(mods => { 
        mods.type === type
      })
      this.moduleList.forEach(mods => { // setting text value by language (object type)
        const column = mods.dataSet.column
        column.forEach(x => {
          if (x.hasLang) {
            x.value = { ...this.$store.state.langData.langObj }
          }
        })
        if (mods.type === 'function') {
          column.forEach(x => {
            let key = Object.keys(x.value)
            key.forEach(k => {
              x.value[k] = this.$store.state.langData.defaultLabel
            })
          })
        }
        
        // function options label required lang
        let optionItem = mods.setting.function.item
        if (mods.setting.function.hasLang) {
          optionItem.forEach((o, index) => {
            index++
            o.label = { ...this.$store.state.langData.langObj }
            o.itemValue = `value ${index}`
            let key = Object.keys(o.label)
            key.forEach(k => {
              o.label[k] = `list option ${index}`
            })
          })
        }
      })
    },
    // GET api data
    getData: function () {
      this.$http({
        method: 'GET',
        url: '/article'
      }).then((res) => { // data to store
        this.content = res.data.module.map(data => {
          return { id: moduleId++, ...data }
        })
      }).catch((ex) => {
        console.error('error:', ex)
      })
    },
    onChoose: function () {
      this.editMode.state = 'choose'
    },
    onUnChoose: function () {
      this.editMode.state = 'default'
    },
    onClone: function (data) {
      const cloneData = this._.cloneDeep(data)
      return {
        id: `new${moduleId++}`,
        ...cloneData
      }
    },
    onRemove: function (e, index) {
      e.stopPropagation()
      this.content.splice(index, 1)
    },
    /**
     * 특정 엘리먼트에 클래스명을 추가하고 인접 엘리먼트들에 클래스명을 삭제
     * @param target 클래스 추가할 대상, DOM object (* array 아님 주의)
     * @param classname 추가/삭제할 클래스명, string
     * @param classaction add or remove 단일 실행
     */
    addRemoveClass: function (target, classname, classaction) {
      if (classaction !== "add") {
        [...target.parentElement.children].forEach(el => el.classList.remove(classname))
      }
      if (classaction !== "remove") {
        target.classList.add(classname)
      }
    },
    onMouseEnter: function (e) {
      e.target.classList.add("hover")
    },
    onMouseLeave: function (e) {
      e.target.classList.remove("hover")
    },
    onModuleClick: function (e, index, data) {
      e.stopPropagation()
      let target = e.currentTarget
      let isModule = !e.target.closest('.column')
      if (e.target.closest('.mods').className.indexOf('active') === -1) {
        this.addRemoveClass(target, "active")
        this.moduleInfo = this._.cloneDeep(data)
        this.$store.commit('content/moduleInfo', this.moduleInfo)
        this.$store.commit('content/isActive', true)
        this._.isEmpty(this.moduleInfo.setting.function) ?
          this.$store.commit('content/isFunction', false) :
          this.$store.commit('content/isFunction', true)
      }
    },
    onDocumentClick: function (e) {
      if (e.target.closest('.article') === null && e.target.closest('.handleMods') === null) {
        let mods = document.querySelector('.mods')
        this.addRemoveClass(mods, 'active', 'remove')
        this.$store.commit('content/isActive', false)
      }
    },
    updateValue: function (data) {
      this.content[data.mIdx].dataSet.column[data.cIdx].value[this.selectedLang] = data.value
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/editor.scss";
</style>
