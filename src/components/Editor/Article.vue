<template>
  <div class="page">
    <div id="article" class="article">
      <div contenteditable="true"
        v-for="mods in modsList"
        :key="`mods-${mods.id}`"
        :data-mods="mods.type"
        :class="mods.class"
        v-html="mods.html"
      ></div>
    </div>
    <p>{{ modsState }}</p>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: [
    'dragState'
  ],
  data () {
    return {
      modsList: [],
      modsState: {
        drag: null
      }
    }
  },
  methods: {
    getData: function () {
      this.$http({
        method: 'GET',
        url: 'article'
      }).then((res) => {
        this.setContent(res.data)
      }).then(() => {
        let modules = document.querySelectorAll('.article .mods')
        this.setModsEditable(modules)
      }).catch((ex) => {
        console.error('error:', ex)
      })
    },
    /**
     * 넘어온 모듈배열 데이터를 렌더링한다
     */
    setContent: function (data) {
      const content = data.content
      let modsData = content.mods.map((obj) => {
        obj.class = obj.class.join(" ")
        return obj
      })
      this.modsList = modsData
    },
    /**
     * 렌더링된 각 모듈별 정보 분류
     * 콘텐츠 모듈단위로 편집에 필요한 상태 정보 추가
     * 모듈 추가/수정/삭제 등이 이루어질 때 이 데이터로 접근하고
     * 서버통신시에는 삭제한다
     */
    setModsEditable: function (data) {
      const modsArr = Array.prototype.slice.call(data)
      modsArr.forEach((obj, idx) => {
        let startY = Math.round(obj.offsetTop),
            endY = Math.round(startY + obj.offsetHeight),
            avrY = Math.round(startY + obj.offsetHeight/2)
        let editInfo = {
          startY: startY,
          endY: endY,
          avrY: avrY,
        }
        this.modsList[idx].editInfo = editInfo
      })
      console.log(this.modsList)
    }
  },
  mounted: function () {
    this.getData()
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
