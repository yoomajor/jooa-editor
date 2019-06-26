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
      console.log(data)
    }
  },
  created: function () {
    this.langList = this.$store.state.langData.usable
    this.selectLang = this.$store.state.langData.default
  }
}
</script>
