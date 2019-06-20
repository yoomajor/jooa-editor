<template>
  <div class="editor">
    <!-- module list -->
    <draggable
      class="moduleList"
      :list="moduleList"
      :group="{ name: 'modules', pull: 'clone', put: false }"
      :sort="false">
      <div
        class="item"
        v-for="(mods, index) in moduleList"
        :key="index">
        {{ mods.name }}
      </div>
    </draggable>
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
          @add="onAdd"
          :move="onMove">
          <div
            class="mods"
            v-for="(mods, index) in article"
            :key="index"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
            @click="onClick">
            <div v-html="mods.html" contenteditable="true"></div>
            <div class="handleMods">
              <button type="button" class="btn btnMove" title="이동"></button>
              <button type="button" class="btn btnDel" @click="onRemove(index)" title="삭제"></button>
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <!-- //article preview -->
    <Modules />
  </div>
</template>

<script>
import draggable from "vuedraggable"
import Modules from "./Modules/Modules.vue"

let moduleId = 0
export default {
  name: 'Editor',
  display: "Clone",
  order: 2,
  components: {
    draggable,
    Modules
  },
  data () {
    return {
      moduleList: [
        { name: "text-1", html: "text here" },
        { name: "text-2", html: "text here" },
        { name: "img-1", html: "image here" },
        { name: "img-2", html: "image here" }
      ],
      article: [
        { name: "a-text-1", html: "text1 <strong>strong</strong> and some text<br>break.." },
        { name: "a-text-2", html: "text2 <strong>strong</strong><br>break<br>break<br>some <span style='color:red'>red</span> text here" },
        { name: "a-img-1", html: "<img src='https://assets3.thrillist.com/v1/image/2743357/size/gn-gift_guide_variable_c.jpg' alt='' />" },
        { name: "a-img-2", html: "<img src='https://assets3.thrillist.com/v1/image/2743357/size/gn-gift_guide_variable_c.jpg' alt='' />" }
      ],
      isEmpty: false,
    }
  },
  watch: {
    article: function (data) {
      /*
      this.isEmpty = data.length === 0
      console.log(this.isEmpty)
      */
    }
  },
  methods: {
    log: function (e) {
      // console.log(e)
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
    mapModule: function (type) {

    },
    onChange: function (e) {
      let event = Object.keys(e)[0]
      let eventData = e[event]
      console.log(event)
      switch (event) {
        case "added":
          break
        case "moved":
          let target = document.querySelectorAll('.article .mods')[eventData.newIndex]
          this.addRemoveClass(target, "active")
          break
        case "removed":
          break
      }
    },
    onAdd: function (e) {
      // console.log(event)
    },
    onMove: function (e) {
      // console.log(e)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin mods-hover {
  border: 1px dashed #999;
}
@mixin mods-active {
  border: 1px solid #3e3e3e;
}
.editor {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
}
.moduleList {
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  .item {
    position: relative;
    width: 33.33%;
    padding-top: 1em;
    padding-bottom: 1em;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #eee;
    background-color: #fff;
    cursor: move;
    &:before {
      content: "";
      display: block;
      margin-bottom: 1em;
      padding-bottom: calc(100% - 4.5em);
    }
    &:hover {
      border-color: #999;
    }
  }
}
.preview {
  flex: 1;
  padding-left: 30px;
  .article {
    max-width: 375px;
    background-color: #fff;
  }
  .noMods {
    padding: 100px 0;
    text-align: center;
  }
  .item {
    padding: 8px 30px;
    text-align: center;
    @include mods-hover;
  }
  .mods {
    border: 1px dashed transparent;
    &:hover {
      @include mods-hover;
    }
    &.hover {
      .handleMods {
        display: block;
        .btn {
          @include mods-hover;
        }
      }
    }
    &.active {
      @include mods-active;
      .handleMods {
        display: block;
        .btn {
          @include mods-active;
          background-color: #3e3e3e;
        }
      }
    }
  }
  .handleMods {
    display: none;
    position: absolute;
    top: -1px;
    left: 100%;
    background-color: #fff;
    .btn {
      display: block;
      position: relative;
      width: 30px;
      height: 30px;
      background-color: #999;
      background-position: 50% 50%;
      background-size: 66%;
      background-repeat: no-repeat;
      &:before {
        content: "";
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;
        border-top: 1px solid #fff;
        opacity: 0.3;
      }
      &:first-of-type:before {
        display: none;
      }
    }
    .btnMove {
      cursor: move;
      background-image: url('~@/assets/img/ico_move.png');
    }
    .btnDel {
      background-image: url('~@/assets/img/ico_del.png');
    }
  }
}
</style>

