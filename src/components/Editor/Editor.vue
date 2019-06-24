<template>
  <div class="editor">
    <!-- module list -->
    <div class="moduleList">
      <div class="moduleTab">
        <button
          v-for="(button, index) in moduleTab"
          :key="index"
          :data-module_type="button.type"
          :class="{ active: button.type === moduleType, btn: true }"
          @click="onTabClick">
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
    <div class="preview">
      <div class="article">
        <draggable
          class="modsWrap"
          :list="article"
          :animation="200"
          :options="{draggable: '.mods'}"
          group="modules"
          handle=".handleMods .btnMove"
          @change="onChange"
          :move="onMove">
          <div
            class="mods"
            v-for="(mods, index) in article"
            :key="index"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
            @click="onClick">
            <div v-html="mods.html"></div>
            <div class="handleMods">
              <button type="button" class="btn btnMove" title="이동"></button>
              <button type="button" class="btn btnDel" @click="onRemove(index)" title="삭제"></button>
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <!-- //article preview -->
  </div>
</template>

<script>
import draggable from "vuedraggable"
import modules from "./Modules"

const MODULE_DATA = Object.values(modules)

export default {
  name: 'Editor',
  display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data () {
    return {
      moduleTab: [
        {type: "standard", label: "기본형"},
        {type: "function", label: "기능형"}
      ],
      moduleType: "standard",
      moduleList: [],
      article: [],
      isEmpty: false
    }
  },
  watch: {
    article: function (data) {
      this.$store.commit('editormoduledata/setModuleData', this.article)
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
    getData: function () {
      this.$http({
        method: 'GET',
        url: '/article'
      }).then((res) => {
        this.article = res.data.module
      }).catch((ex) => {
        console.error('error:', ex)
      })
    },
    /**
     * 특정 엘리먼트에 클래스명을 추가하고 인접 엘리먼트들에 클래스명을 삭제
     * @param target 클래스 추가할 대상, DOM object
     * @param classname 추가/삭제할 클래스명, string
     * TODO : store 등록
     */
    addRemoveClass: function (target, classname) {
      [...target.parentElement.children].forEach(el => el.classList.remove(classname))
      target.classList.add(classname)
    },
    onChange: function (e) {
      let event = Object.keys(e)[0]
      let eventData = e[event]
      switch (event) {
        case "added":
          // this.onAdd(eventData.newIndex, eventData.element.name)
          break
        case "moved":
          let target = document.querySelectorAll('.article .mods')[eventData.newIndex]
          this.addRemoveClass(target, "active")
          break
        case "removed":
          break
      }
    },
    onAdd: function (index, moduleName) {
    },
    onMove: function (e) {
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
    onClick: function (e) {
      let target = e.currentTarget
      this.addRemoveClass(target, "active")
    },
    onTabClick: function (e) {
      let type = e.target.dataset.module_type
      this.moduleType = type
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/editor.scss";
</style>

