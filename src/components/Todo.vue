<template>
  <div @click="showIcons" class="todo">
    {{ todo.title }}
    <div class="editContainer" v-show="showIcon">
      <i @click="openEditPanel(todo)" class="fas fa-edit"></i>
      <i @click="deleteTodo(todo.type, todo.id)" class="fas fa-trash-alt"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      showIcon: false,
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showIcons() {
      this.showIcon = !this.showIcon;
    },
    deleteTodo(col, id) {
      this.$store.commit("removeTodo", { col, id });
    },
    openEditPanel(todo) {
      this.$store.commit("turnOnEditMode", { state: true, item: todo });
    },
  },
};
</script>

<style>
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 5px;
}
.fa-trash-alt {
  position: absolute;
  bottom: 6px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

.fa-edit {
  position: absolute;
  top: 6px;
  right: 6px;
  color: #fff;
  cursor: pointer;
}
</style>
