<template>
  <div class="todo">
    {{ todo.title }}
    <i @click="deleteTodo(todo.type, todo.id)" class="fas fa-trash-alt"></i>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteTodo(col, id) {
      this.$store.commit("removeTodo", { col, id });
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
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
</style>
