<template>
  <div>
    <div class="innerItem">
      <p class="innerTitle">사용 언어</p>
      <span
        class="item checkbox"
        v-for="(item, index) in langInfos"
        :class="{active: isDefault(item.c)}"
        :key="index">
        <input
          type="checkbox"
          v-model="item.u"
          :id="item.c"
          :value="item.c"
          @click="checkLang"
          >
        <label :for="item.c">
          {{ item.n }}
        </label>
      </span>
    </div>
    <div class="innerItem">
      <p class="innerTitle">기본 언어</p>
      <select
        v-model="defaultLang">
        <option
          v-for="(item, index) in usableInfos"
          :key="index"
          :value="item.c"
        >
          {{ item.n }}
        </option>
      </select>
      <span v-for="(item, index) in usableInfos" :key="index">{{ item.n }} </span> / {{ defaultLang }}
    </div>
    <div>
      <button
        type="button"
        class="btn btnApply"
        @click="setUsableLang">
        적용
      </button>
    </div>
  </div>
</template>

<script>
import LANG from '@/common/lang'

export default {
  name: 'SetLang',
  data () {
    return {
      langInfos: {},
      usableInfos: {},
      defaultLang: ''
    }
  },
  watch: {
    langInfos: {
      handler: function (val, oldVal) {
        this.usableInfos = val.filter(x => {
          return x.u
        })
      },
      deep: true
    },
    defaultLang: function (val) {
      // console.log(val)
    }
  },
  created: function () {
    this.langInfos = this._.cloneDeep(this.$store.state.langData.info)
    this.defaultLang = this._.cloneDeep(this.$store.state.langData.default)
  },
  methods: {
    // commit lang data to $store
    setUsableLang: function () {
      this.$store.commit('setLang', this.usableInfos)
    },
    isDefault: function (code) {
      return (code === this.defaultLang)
    },
    checkLang: function (e) {
      if (!e.target.checked && e.target.value === this.defaultLang) {
        e.preventDefault()
        alert ("기본 언어는 해제할 수 없습니다")
      }
    }
  }
}
</script>
