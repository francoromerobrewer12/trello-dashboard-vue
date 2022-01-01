<template>
  <div class="editPanel-container">
    <div class="editPanel">
      <i @click="closeEditPanel" class="fas fa-times"></i>
      <h2>Edit Your Task</h2>

      <h3>Title:</h3>
      <input
        type="text"
        v-model="inputChanges.newTitle"
        :placeholder="todo.title"
      />

      <h3>State:</h3>
      <div class="state-wrapp">
        <div class="form-group">
          <input
            type="radio"
            id="completed"
            v-model="inputChanges.newCompleted"
            value="complete"
          />
          <label for="completed">Complete</label>
        </div>
        <div class="form-group">
          <input
            type="radio"
            id="incompleted"
            v-model="inputChanges.newCompleted"
            value="incomplete"
          />
          <label for="incomplete">Incomplete</label>
        </div>
      </div>

      <h3>Type:</h3>
      <div class="type-wrap">
        <div class="form-group">
          <input
            type="radio"
            id="todos"
            v-model="inputChanges.newType"
            value="todos"
          />
          <label for="todos">Tasks</label>
        </div>
        <div class="form-group">
          <input
            type="radio"
            id="inProgress"
            v-model="inputChanges.newType"
            value="inProgress"
          />
          <label for="inProgress">Progress</label>
        </div>
        <div class="form-group">
          <input
            type="radio"
            id="inReview"
            v-model="inputChanges.newType"
            value="inReview"
          />
          <label for="inReview">Review</label>
        </div>
        <div class="form-group">
          <input
            type="radio"
            id="complete-task"
            v-model="inputChanges.newType"
            value="completed"
          />
          <label for="complete-task">Complete</label>
        </div>
      </div>

      <button @click="updateTodo(todo.id, inputChanges)">SAVE CHANGES</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPanel",
  data() {
    return {
      beforeEditTodoContent: null,
      inputChanges: {
        newTitle: "",
        newCompleted: "",
        newType: "",
      },
    };
  },
  props: {
    todo: {
      type: Object,
    },
  },
  methods: {
    closeEditPanel() {
      this.$store.commit("turnOffEditMode");
    },
    updateTodo(id) {
      this.$store.commit("updatingTodo", {
        ...this.inputChanges,
        id,
        beforeEditContent: this.beforeEditTodoContent,
      });
    },
  },
  created() {
    this.beforeEditTodoContent = this.$props.todo;
  },
};
</script>

<style scoped>
.editPanel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.editPanel {
  width: 400px;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  text-align: left;
  padding: 32px;
}

.fa-times {
  float: right;
  cursor: pointer;
}

h2 {
  color: #41b883;
  text-transform: uppercase;
}

input[type="text"] {
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
}

input[type="text"]:focus {
  outline-color: #41b883;
}

.state-wrapp {
  width: 100%;
  display: flex;
  margin-bottom: 32px;
}

.state-wrapp .form-group:nth-child(2) {
  margin-left: 32px;
}

.type-wrap {
  width: 260px;
  height: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

button {
  padding: 12px;
  border: none;
  background-color: #41b883;
  letter-spacing: 1px;
  color: white;
  cursor: pointer;
}
</style>
