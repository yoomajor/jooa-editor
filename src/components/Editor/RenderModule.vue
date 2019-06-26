<template>
<div class="inner">
  <div
    class="module"
    :data-mods="itemData.mods">
    <div
      class="column"
      v-for="(column, index) in itemData.columnInfo"
      :key="index"
      :contenteditable="contenteditable(column.type)">
      <div
        v-if="column.type === 'text'">
        {{ column.value }}
      </div>
      <div
        v-if="column.type === 'image'">
        <img 
          v-if="column.value"
          alt=""
          :src="column.value" />
        <label
          v-else
          class="uploadImg">Upload image<input type="file"></label>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
export default {
  name: 'RenderModule',
  props: [
    'data'
  ],
  data () {
    return {
      itemData: {}
    }
  },
  computed: {
  },
  created: function () {
    this.renderDOM()
  },
  watch: {
  },
  methods: {
    renderDOM: function () {
      this.itemData.mods = this.data.mods
      this.itemData.columnInfo = this.data.column
    },
    contenteditable: function (isText) {
      return isText === 'text'
    }
  }
}
</script>
