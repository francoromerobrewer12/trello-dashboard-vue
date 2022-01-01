import axios from "axios";

const state = {
  tasks: { todos: [], inProgress: [], inReview: [], completed: [] },
  //Displays or not the EditPanel component
  editMode: false,
  //Saves the data from the editing task
  editingTask: null,
};

const getters = {};

const actions = {
  //Gets todos from API, filters down the array to only 5 items and adds
  //type property of todos, for all this todos to be added in the first column
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const filteredResponse = response.data.slice(0, 5);
    const result = filteredResponse.map(obj => ({ ...obj, type: "todos" }));

    commit("setTodos", result);
  },
};

const mutations = {
  //Saves the todos coming from API to the state.tasks.todos
  setTodos: (state, todos) => (state.tasks.todos = todos),
  //Creates and Adds a new todo to a specific column
  addTodo(state, payload) {
    const res = {
      id: state.tasks[payload.type].length + 1,
      title: payload.title,
      type: payload.type,
      completed: false,
    };
    state.tasks[payload.type].push(res);
  },
  //Removes a specific todo from a column, not being able to see it anywhere
  removeTodo: (state, payload) => {
    state.tasks[payload.col] = state.tasks[payload.col].filter(
      todo => todo.id !== payload.id
    );
  },
  //Removes a todo from a specific column when the user starts the drag action
  deleteTodoFromColumn(state, payload) {
    state.tasks[payload.col].splice(payload.removedIndex, 1);
  },
  //Adds the dragged todo to a specific column
  addTodoToColumn(state, payload) {
    state.tasks[payload.col].splice(payload.addedIndex, 0, payload.draggedItem);
  },
  //Turns on the editMode and displays the Edit Panel
  turnOnEditMode(state, payload) {
    state.editMode = payload.state;
    state.editingTask = payload.item;
  },
  //Turns off the editMode hiding the Edit Panel
  turnOffEditMode(state) {
    state.editMode = false;
  },
  //Updates todo wwith new values
  updatingTodo(state, payload) {
    state.tasks[payload.beforeEditContent.type].map(todo => {
      if (todo.id === payload.id) {
        payload.newTitle === "" ? "" : (todo.title = payload.newTitle);
        payload.newCompleted === ""
          ? ""
          : (todo.completed = payload.newCompleted);
        payload.newType === "" ? "" : (todo.type = payload.newType);
      }
      return todo;
    });
    this.commit("turnOffEditMode");
    //when changingtype add to new column
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
