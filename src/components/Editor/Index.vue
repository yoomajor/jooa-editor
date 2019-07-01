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

          <div v-if="module.name.indexOf('text') != -1">
          {{ module.dataSet.column[0].value.en }}
          </div>

          {{ module.moduleName }}
        </div>
      </draggable>
    </div>
    <!-- //module list -->
    <!-- content -->
    <div class="preview">
      <div class="article">

      <draggable
        class="modsWrap"
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
          @click="onModuleClick($event, index)">
          <Module
            @updateValue="updateValue"
            :state="editMode.state"
            :data="module.dataSet"
            :mIdx="index"
            :type="module.type">
          </Module>
          <div class="handleMods">
            <button type="button" class="handle handleMove" title="이동"></button>
            <button type="button" class="handle handleDel" @click="onRemove(index)" title="삭제"></button>
          </div>
        </div>
      </draggable>

      </div>
    </div>
    <!-- //content -->
    <!-- setting module -->
    <div class="setting">
      
    </div>
    <!-- //setting module -->
  </div>
</template>

<script>
import modules from "./Modules"
import draggable from "vuedraggable"
import Module from "./Module.vue"

const MODULE_DATA = Object.values(modules)
let moduleId = 0

export default {
  components: {
    draggable,
    Module
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
      content: []
    }
  },
  computed: {
    selectedLang () {
      return this.$store.state.setcontent.lang
    }
  },
  watch: {
    moduleType: function () {
      this.getModules(this.moduleType)
    },
    selectedLang: function (data) {
      console.log('asdf')
      this.getModules(this.moduleType)
    }
  },
  created: function () {
    this.getModules(this.moduleType)
    this.getData()
  },
  methods: {
    onTabClick: function (e, dataType, targetType) {
      let type = e.target.dataset[targetType]
      this[dataType] = type
    },
    getModules: function (type) {
      this.moduleList = this._.cloneDeep(MODULE_DATA.filter(mods => { return mods.type === type }))
      this.moduleList.filter(mods => { 
        mods.type === type
      })
      this.moduleList.forEach(mods => { // setting text value by language (object type)
        let column = mods.dataSet.column
        column.forEach(x => {
          if (x.type === "text") {
            x.value = { ...this.$store.state.langData.langObj }
          }
        })
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
      console.log(this.instance)
    },
    onUnChoose: function () {
      this.editMode.state = 'default'
    },
    onClone: function (data) {
      const cloneData = this._.cloneDeep(data)
      return {
        id: moduleId++,
        ...cloneData
      }
    },
    onRemove: function (index) {
      if (this.article.length <= 1) {
        alert("최소 하나의 모듈이 있어야 합니다")
      } else {
        this.article.splice(index, 1)
      }
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
    onModuleClick: function (e, index) {
      let target = e.currentTarget
      this.addRemoveClass(target, "active")
    },
    updateValue: function (data) {
      this.content[data.mIdx].dataSet.column[data.cIdx].value[this.selectedLang] = data.value
      console.log(this.content[data.mIdx].dataSet.column[data.cIdx])
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/editor.scss";
</style>
