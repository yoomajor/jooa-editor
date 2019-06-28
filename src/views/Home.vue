<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneDog"
        :sort="false"
        @change="log"
      >
        <div class="list-group-item" v-for="element in list1" :key="element.id">
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group"
        :list="list2"
        group="people"
        @change="log"
      >
        <div class="list-group-item" v-for="element in list2" :key="element.id" contenteditable>
          {{ element.name }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
let idGlobal = 8;
export default {
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "dog 1", id: 1 },
        { name: "dog 2", id: 2 },
        { name: "dog 3", id: 3 },
        { name: "dog 4", id: 4 }
      ],
      list2: [
        { name: "cat 5", id: 5 },
        { name: "cat 6", id: 6 },
        { name: "cat 7", id: 7 }
      ]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    cloneDog({ name }) {
      return {
        id: idGlobal++,
        name: `cat ${name}`
      };
    }
  }
};
</script>

<style scoped>
.list-group-item {
  width: 100px;
  margin: 3px;
  padding: 10px;
  border: 1px solid #000;
  background: #fff;
}
</style>
