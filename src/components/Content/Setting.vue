<template>
  <div class="contentSetting">
    <select
      v-model="selectLang">
      <option
        v-for="(item, index) in langList"
        :key="index"
        :value="item.c"
      >
        {{ item.n }}
      </option>
    </select>
    <button
      type="button"
      @click="loadData">
      불러오기
    </button>
  </div>
</template>

<script>
export default {
  name: 'SetContent',
  data () {
    return {
      langList: [],
      selectLang: ''
    }
  },
  computed: {
    usableLang () {
      return this.$store.state.langData.usable
    }
  },
  watch: {
    usableLang (data) {
      this.langList = data
    },
    selectLang (data) {
      
    }
  },
  created: function () {
    this.langList = this.$store.state.langData.usable
    this.selectLang = this.$store.state.langData.default
  },
  methods: {
    loadData: function () {
      console.log(this.selectLang)
      this.$store.commit('setcontent/selectedLang', this.selectLang)
    }
  }
}
</script>
