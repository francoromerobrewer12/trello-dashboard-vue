<template>
  <div>
    <h3>Add Todo</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Add todo.." />
        <select id="task-type" v-model="type" required>
          <option value="" disabled>Type</option>
          <option value="todos">Todos</option>
          <option value="inProgress">Progress</option>
          <option value="inReview">Review</option>
          <option value="completed">Completed</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
      type: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$store.commit("addTodo", { title: this.title, type: this.type });
      this.title = "";
      this.type = "";
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}

select {
  text-align: center;
  padding: 0 10px;
  border: 1px #41b883 solid;
}

select:focus {
  outline: none;
}
</style>
