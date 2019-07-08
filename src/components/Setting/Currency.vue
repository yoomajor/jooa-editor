<template>
  <div class="settingCurrency">
    <div class="currencyList">
      <p class="innerTitle">기본 통화</p>
      <span
        class="item checkbox radio"
        v-for="(item, index) in currencyInfos"
        :key="index">
        <input
          type="radio"
          v-model="defaultCurrency"
          :id="item.c"
          :value="item.c">
        <label :for="item.c">
          {{ item.n }} <span class="small">(<i v-html="item.e"></i>)</span>
        </label>
      </span>
    </div>
    <div>
      <button
        type="button"
        class="btn btnApply"
        @click="setCurrency">
        적용
      </button>
    </div>
  </div>
</template>

<script>
import CURRENCY from '@/common/currency'

export default {
  name: 'SetCurrency',
  data () {
    return {
      currencyInfos: {},
      defaultCurrency: ''
    }
  },
  created: function () {
    this.currencyInfos = this._.cloneDeep(this.$store.state.currency.info)
    this.defaultCurrency = this._.cloneDeep(this.$store.state.currency.default)
  },
  methods: {
    // commit lang data to $store
    setCurrency: function () {
      this.$store.commit('setCurrency', this.defaultCurrency)
    }
  }
}
</script>
