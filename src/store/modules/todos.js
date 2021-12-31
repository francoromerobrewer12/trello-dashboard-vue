import axios from "axios";

const state = {
  tasks: { todos: [], inProgress: [], inReview: [], completed: [] },
};

const getters = {};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", response.data.slice(0, 5));
  },
  async addTodo({ commit }, title) {
    const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false,
    });
    commit("newTodo", res.data);
  },
  deleteTodo({ commit }, id) {
    // await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit("removeTodo", id);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.tasks.todos = todos),
  newTodo: (state, todo) => state.tasks.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.tasks.todos = state.tasks.todos.filter(todo => todo.id !== id)),
  deleteTodoFromColumn(state, payload) {
    state.tasks[payload.col].splice(payload.removedIndex, 1);
  },
  addTodoToColumn(state, payload) {
    state.tasks[payload.col].splice(payload.addedIndex, 0, payload.draggedItem);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
