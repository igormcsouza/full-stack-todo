import { delete_todo, fetch_todos, insert_todo, update_todo } from "../utils";
import { State, Actions, Todo } from "../TodoContext";

export const INITIAL_STATE: State = {
  todos: [],
};

export const reducer = (state: State, action: Actions): State => {
  let newState: State = {};

  switch (action.type) {
    case "POPULATE":
      fetch_todos().then((value) => (newState = value));
      return newState;

    case "ADD_TODO":
      if (state.todos) {
        const newTodo: Todo = {
          when: (+new Date()).toString(),
          task: action.payload,
          done: false,
          by: "Igor Souza",
        };

        insert_todo(newTodo);
      }

      fetch_todos().then((value) => {
        newState = value;
      });

      return newState;

    case "CHECK_TODO":
      action.payload.done = !action.payload.done;

      update_todo(action.payload);

      fetch_todos().then((value) => (newState = value));
      return newState;

    case "EDIT_TODO":
      let todo = action.payload.task;

      todo.task = action.payload.newTaskName;
      update_todo(todo);

      fetch_todos().then((value) => (newState = value));
      return newState;

    case "DELETE_TODO":
      delete_todo(action.payload);

      fetch_todos().then((value) => (newState = value));
      return newState;

    default:
      return state;
  }
};
