<template>
  <div class="editor">
    <!-- module list -->
    <draggable
      class="moduleList"
      :list="moduleList"
      :group="{ name: 'modules', pull: 'clone', put: false }"
      :sort="false"
    >
      <div
        class="item"
        v-for="(mods, index) in moduleList"
        :key="index"
      >
        {{ mods.name }}
      </div>
    </draggable>
    <!-- //module list -->
    <!-- article preview -->
    <div class="preview">
      <draggable
        class="article"
        :list="article"
        :animation="200"
        group="modules"
        handle=".handleMods .move"
        @change="onChange"
        @add="onAdd"
        :move="onMove"
      >
        <transition-group type="transition">
          <div
            class="mods"
            v-for="(mods, index) in article"
            :key="index"
             @mouseenter="onMouseEnter"
             @mouseleave="onMouseLeave"
             @click="onClick"
          >
            <div v-html="mods.html" contenteditable="true"></div>
            <div class="handleMods">
              <button type="button" class="move"></button>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <!-- //article preview -->
  </div>
</template>

<script>
import draggable from "vuedraggable"
let moduleId = 0
export default {
  name: 'Editor',
  display: "Clone",
  order: 2,
  components: {
    draggable
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
        { name: "text-1", html: "text1 <strong>strong</strong> and something text<br>break.." },
        { name: "text-2", html: "text2 <strong>strong</strong><br>break.." },
        { name: "img-1", html: "<img src='https://assets3.thrillist.com/v1/image/2743357/size/gn-gift_guide_variable_c.jpg' alt='' />" },
        { name: "img-2", html: "<img src='https://assets3.thrillist.com/v1/image/2743357/size/gn-gift_guide_variable_c.jpg' alt='' />" }
      ]
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
    onChange: function (e) {
      let event = Object.keys(e)[0]
      let eventData = e[event]
      switch (event) {
        case "added":
          console.log('added')
          break
        case "moved":
          let target = document.querySelectorAll('.article .mods')[eventData.newIndex]
          this.addRemoveClass(target, "active")
          break
        case "removed":
          console.log('removed')
          break
      }
    },
    onAdd: function (e) {
      // console.log(event)
    },
    onMove: function (e) {
      // console.log(e)
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
    min-height: 100px;
    background-color: #fff;
  }
  .mods {
    border: 1px dashed transparent;
    &:hover {
      @include mods-hover;
    }
    &.hover {
      .handleMods {
        display: block;
        .move {
          @include mods-hover;
        }
      }
    }
    &.active {
      @include mods-active;
      .handleMods {
        display: block;
        .move {
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
    .move {
      width: 30px;
      height: 30px;
      cursor: move;
      background: #999 url('~@/assets/img/ico_move.png') 50% 50% / 20px no-repeat;
    }
  }
}
</style>

