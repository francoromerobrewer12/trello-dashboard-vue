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
};

const mutations = {
  setTodos: (state, todos) => (state.tasks.todos = todos),
  addTodo(state, title) {
    const res = {
      id: state.tasks.todos.length + 1,
      title,
      completed: false,
    };
    state.tasks.todos.push(res);
  },
  removeTodo: (state, payload) =>
    (state.tasks[payload.col] = state.tasks[payload.col].filter(
      todo => todo.id !== payload.id
    )),
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
