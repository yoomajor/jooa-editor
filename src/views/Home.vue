<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="moduleList"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneModule"
        :sort="false"
        @change="log"
      >
        <div class="list-group-item" v-for="(element, index) in moduleList" :key="index">
          <div v-if="element.name.indexOf('text') != -1">
          {{ element.dataSet.column[0].value.en }}
          </div>

          {{ element.moduleName }}

        </div>
        
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group"
        :list="contentModule"
        group="people"
        @change="log"
      >
        <div
          class="mods"
          v-for="(module, index) in contentModule"
          :key="module.id">

          <Module
            @updateValue="updateValue"
            :data="module.dataSet"
            :mIdx="index">
          </Module>

          <div class="handleMods">
            <button type="button" class="handle handleMove" title="이동"></button>
            <button type="button" class="handle handleDel" @click="onRemove(index)" title="삭제"></button>
          </div>
        </div>
<!-- 
        <div class="list-group-item" v-for="(element, index) in contentModule" v-html="element.name" :key="element.id" contenteditable @focusout="onFocusout($event, index)">
        </div> -->
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import modules from "../components/Editor/Modules"
import Module from "../components/Editor/Module.vue"

const MODULE_DATA = Object.values(modules)
let idGlobal = 0;
export default {
  components: {
    draggable,
    Module
  },
  data() {
    return {
      moduleType: "standard",
      moduleList: [],
      contentModule: []
    };
  },
  computed: {
    selectedLang () {
      return this.$store.state.setcontent.lang
    }
  },
  created: function () {
    this.getModules(this.moduleType)
    this.getData()
  },
  methods: {
    getModules: function (type) {
      this.moduleList = this._.cloneDeep(MODULE_DATA)

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
        this.contentModule = res.data.module.map(data => {
          return { id: idGlobal++, ...data }
        })
      }).catch((ex) => {
        console.error('error:', ex)
      })
    },
    log: function(evt) {
      window.console.log(evt);
    },
    cloneModule(data) {
      const cloneData = this._.cloneDeep(data)
      return {
        id: idGlobal++,
        ...cloneData
      };
    },
    updateValue: function (data) {
      this.contentModule[data.mIdx].dataSet.column[data.cIdx].value[this.selectedLang] = data.value
    },
  }
};
</script>

<style scoped>
.list-group-item {
  width: 100px;
  margin: 3px;
  padding: 10px;
  border: 1px solid #000;
  background: #fff;
}
</style>
