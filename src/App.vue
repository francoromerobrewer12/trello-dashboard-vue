<template>
  <div id="app">
    <h1 class="todos-title">Todos</h1>
    <div class="container">
      <AddTodo />
      <Todos />
      <EditPanel v-show="editMode" />
    </div>
  </div>
</template>

<script>
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";
import EditPanel from "./components/EditPanel.vue";

export default {
  name: "App",
  data() {
    return {
      editMode: false,
    };
  },
  components: {
    Todos,
    AddTodo,
    EditPanel,
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.todos-title {
  text-align: center;
  margin-top: 32px;
}

.container {
  max-width: 1100px;
  height: 100vh;
  margin: auto;
  padding: 0 2rem;
}

.columns-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>
