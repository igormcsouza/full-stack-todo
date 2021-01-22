import axios from "axios";

import { State, Todo } from "./TodoContext";
// const base = "http://backend:2500";
const base = "https://full-stack-todo-bknd.herokuapp.com";

export async function fetch_todos(): Promise<State> {
  let todos: State = {};

  await axios
    .get<State>(base + "/api/todo")
    .then((response) => {
      const { data } = response;
      todos = data;
    })
    .catch((e) => console.log(e));

  console.log(typeof todos.todos);
  return todos;
}

export async function insert_todo(todo: Todo) {
  await axios.post(base + "/api/todo", todo).catch((e) => console.log(e));
}

export async function update_todo(todo: Todo) {
  await axios.put(base + "/api/todo/" + todo.id).catch((e) => console.log(e));
}

export async function delete_todo(todo: Todo) {
  await axios
    .delete(base + "/api/todo/" + todo.id)
    .catch((e) => console.log(e));
}
