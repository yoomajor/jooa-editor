<template>
  <div class="editor">
    <!-- module list -->
    <div class="moduleList">
      <div class="tabs">
        <button
          v-for="(button, index) in moduleTab"
          :key="index"
          :data-module_type="button.type"
          :class="{ active: button.type === moduleType, btn: true }"
          @click="onTabClick($event, 'moduleType', 'module_type')">
          {{ button.label }}
        </button>
      </div>
      <draggable
        class="list"
        :list="moduleList"
        :group="{ name: 'modules', pull: 'clone', put: false }"
        :sort="false">
        <div
          class="item"
          v-for="(mods, index) in moduleList"
          :data-mods_name="mods.name"
          :key="index">
          {{ mods.moduleName }}
        </div>
      </draggable>
    </div>
    <!-- //module list -->
    <!-- article preview -->
    <div class="preview"
      @click="onPrevClick"
    >
      <div class="article">
        <draggable
          class="modsWrap"
          :list="article"
          :animation="200"
          :options="{draggable: '.mods'}"
          group="modules"
          handle=".handleMods .btnMove"
          @change="onChange">
          <div
            class="mods"
            v-for="(mods, index) in article"
            :key="index"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
            @click="onModuleClick($event, index)">
            <!-- <RenderModule /> -->
            <component :is="'RenderModule'"></component>
<!--             
            <div
              class="inner"
              v-html="mods.html">
            </div> -->
            <div class="handleMods">
              <button type="button" class="btn btnMove" title="이동"></button>
              <button type="button" class="btn btnDel" @click="onRemove(index)" title="삭제"></button>
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <!-- //article preview -->
    <SettingModule></SettingModule>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import modules from "./Modules"
import RenderModule from "./RenderModule.vue"
import SettingModule from "./SettingModule.vue"

const MODULE_DATA = Object.values(modules)

export default {
  name: 'Editor',
  display: "Clone",
  order: 2,
  components: {
    draggable,
    RenderModule,
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
      article: []
    }
  },
  watch: {
    article: function (data) {
      this.$store.commit('renderdata/setRenderData', this.article)
    },
    moduleType: function (type) {
      this.moduleList = MODULE_DATA.filter(mods => {
        if (mods.type === type) {
          return mods
        }
      })
    }
  },
  created: function () {
    this.getModules(this.moduleType)
    this.getData()
  },
  methods: {
    log: function (e) {
    },
    getModules: function (type) {
      this.moduleList = MODULE_DATA.filter(mods => {
        if (mods.type === type) {
          return mods
        }
      })
    },
    // GET api data
    getData: function () {
      this.$http({
        method: 'GET',
        url: '/article'
      }).then((res) => { // data mapping
        this.article = res.data.module
      }).then( () => { // article + module setting init
        let target = document.querySelectorAll('.article .mods')[0]
        this.addRemoveClass(target, "active")
        this.setModuleData(0)
      }).catch((ex) => {
        console.error('error:', ex)
      })
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
    onPrevClick: function (e) {
      let target = document.querySelectorAll('.article .mods')[0]
      if (e.target.className === 'preview') {
        this.addRemoveClass(target, 'active', 'remove')
      }
    },
    onChange: function (e) {
      let event = Object.keys(e)[0]
      let eventData = e[event]
      let target = document.querySelectorAll('.article .mods')[eventData.newIndex]
      // added or moved
      if (event !== "removed") {
        this.addRemoveClass(target, "active")
        this.setModuleData(eventData.newIndex)
      }
    },
    onRemove: function (index) {
      if (this.article.length <= 1) {
        alert("최소 하나의 모듈이 있어야 합니다")
      } else {
        this.article.splice(index, 1)
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
      this.setModuleData(index)
    },
    onTabClick: function (e, dataType, targetType) {
      let type = e.target.dataset[targetType]
      this[dataType] = type
    },
    setModuleData: function (index) {
      this.$store.commit('moduledata/moduleData', this.article[index])
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/editor.scss";
</style>
