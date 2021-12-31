<template>
  <div class="tasks-area">
    <h2>State of every task in this Project</h2>
    <div class="todos">
      <div class="tasks-container">
        <h3>TASKS</h3>
        <Container
          group-name="trello"
          @drag-start="handleDragStart('todos', $event)"
          @drop="handleDrop('todos', $event)"
          :get-child-payload="getChildPayload"
        >
          <Draggable v-for="todo in todos.tasks.todos" :key="todo.id">
            <Todo :todo="todo" col="todos" />
          </Draggable>
        </Container>
      </div>
      <div class="inProgress-container">
        <h3>IN PROGRESS</h3>
        <Container
          group-name="trello"
          @drag-start="handleDragStart('inProgress', $event)"
          @drop="handleDrop('inProgress', $event)"
          :get-child-payload="getChildPayload"
        >
          <Draggable v-for="todo in todos.tasks.inProgress" :key="todo.id">
            <Todo :todo="todo" col="inProgress" />
          </Draggable>
        </Container>
      </div>
      <div class="inReview-container">
        <h3>IN REVIEW</h3>
        <Container
          group-name="trello"
          @drag-start="handleDragStart('inReview', $event)"
          @drop="handleDrop('inReview', $event)"
          :get-child-payload="getChildPayload"
        >
          <Draggable v-for="todo in todos.tasks.inReview" :key="todo.id">
            <Todo :todo="todo" col="inReview" />
          </Draggable>
        </Container>
      </div>
      <div class="completed-container">
        <h3>COMPLETED</h3>
        <Container
          group-name="trello"
          @drag-start="handleDragStart('completed', $event)"
          @drop="handleDrop('completed', $event)"
          :get-child-payload="getChildPayload"
        >
          <Draggable v-for="todo in todos.tasks.completed" :key="todo.id">
            <Todo :todo="todo" col="completed" />
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { Draggable, Container } from "vue-smooth-dnd";

import Todo from "../components/Todo.vue";

export default {
  name: "Todos",
  components: { Todo, Draggable, Container },
  data() {
    return {
      draggingTodo: {
        column: "",
        index: -1,
        todoContent: {},
      },
    };
  },
  computed: {
    ...mapState(["todos"]),
  },
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo"]),

    //Drag and Drop methods that remove and add dragged item to the corresponding column
    handleDragStart(col, dragResult) {
      //col is the column from which the item is being dragged
      //dragResult is the event triggered when the drag starts
      const { payload, isSource } = dragResult;
      if (isSource) {
        //Saves the dragged item inside the Todos data
        this.draggingTodo = {
          column: col,
          index: payload.index,
          todoContent: {
            ...this.$store.state.todos.tasks[col][payload.index],
          },
        };
      }
    },
    handleDrop(col, dropResult) {
      const { addedIndex, removedIndex } = dropResult;

      if (col === this.draggingTodo.column && removedIndex === addedIndex) {
        return;
      }

      if (removedIndex !== null) {
        this.$store.commit("deleteTodoFromColumn", { col, removedIndex });
      }

      if (addedIndex !== null) {
        const draggedItem = this.draggingTodo.todoContent;
        this.$store.commit("addTodoToColumn", { col, addedIndex, draggedItem });
      }
    },

    //getChildPayload puts an object with the index of the element that is
    //being dragged inside the payload propperty of the dragResult
    getChildPayload(index) {
      return {
        index,
      };
    },
  },

  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.tasks-area {
  margin-top: 64px;
}
.todos {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-top: 64px;
}

h3 {
  text-align: center;
}

h2 {
  text-align: center;
}

.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
