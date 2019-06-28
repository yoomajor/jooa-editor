<template>
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
      v-model="moduleList"
      :list="moduleList"
      :group="{ name: 'content', pull: 'clone', put: false }"
      :sort="false">
      <div
        class="item"
        v-for="(module, index) in moduleList"
        :key="index"
        :data-mods_name="module.name">
        {{ module.moduleName }}
      </div>
    </draggable>
  </div>
</template>

<script>
import modules from "./Modules"
import draggable from "vuedraggable"

const MODULE_DATA = Object.values(modules)

export default {
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
    }
  },
  computed: {
    moduleList: {
      get() {
        return this.$store.state.modulelist.list
      },
      set(value) {
        this.$store.commit('moduleList/setModuleList', value)
      }
    }
  },
  created: function () {
    this.getModules(this.moduleType)
  },
  methods: {
    getModules: function (type) {
      let listData = {}
      listData = MODULE_DATA.filter(mods => {
        if (mods.type === type) {
          return mods
        }
      })
      listData.forEach(mods => { // setting text value by language (object type)
        let column = mods.dataSet.column
        column.forEach(x => {
          if (x.type === "text") {
            x.value = this.$_.clone(this.$store.state.langData.langObj)
          }
        })
      })
      this.$store.commit('modulelist/setModuleList', listData)
    }
  }
}
</script>
