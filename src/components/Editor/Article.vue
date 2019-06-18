<template>
  <div id="article" class="article">
    <div v-for="mods in modsList"
        :key="mods.id"
        :data-type="mods.type"
        class="mods">
      {{ mods.startY }}
    </div>
    <p v-if="!modsList.length">구성된 콘텐츠가 없습니다</p>
  </div>
</template>

<script>
const modsData = [
  {
    id: 0,
    type: 'text-1'
  },
  {
    id: 1,
    type: 'text-2'
  },
  {
    id: 2,
    type: 'text-3'
  }
]

export default {
  name: 'Article',
  data () {
    return {
      modsList: []
    }
  },
  methods: {
    /**
     * 모듈배열을 인자로 받아 콘텐츠 구성에 필요한 데이터로 재가공하여 모델에 맵핑한다
     */
    /*
    modsMap: function (mods) {
      let modsInfos = []
      let isMods = (mods !== undefined) && (mods.length > 0)
      if (isMods) {
        mods.forEach(function (obj, idx) {
          let startY = obj.offsetTop,
              endY = startY + obj.offsetHeight,
              avrY = startY + obj.offsetHeight/2,
              type = obj.dataset.type

          modsInfos.push({
            id: idx,
            startY: startY,
            endY: endY,
            avrY: avrY,
            type: type
          })
        })
        this.modsList = modsInfos
      }
    }
  },
  mounted: function () {
    let modules = article.querySelectorAll('.article .mods')
    const modsArr = Array.prototype.slice.call(modules)
    this.modsMap(modsArr)
  }
  */
 },
 created () {
   this.modsList.concat(modsData)
   console.log(this.modsList)
 }
}
</script>

<style lang="scss" scoped>
.preview {
  padding-left: 30px;
  background-color: red;
  .article {
    max-width: 375px;
    min-height: 100px;
    background-color: #fff;
  }
}
</style>
