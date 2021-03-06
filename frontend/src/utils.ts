import axios from "axios";

import { Todo } from "./TodoContext";

// const base = "http://backend:2500";
const base = "https://full-stack-todo-bknd.herokuapp.com";

export async function fetch_todos() {
  let data: Array<Todo> = [];

  await axios
    .get(base + "/api/todo")
    .then((response) => {
      data = response.data.todos;
    })
    .catch((e) => console.log(e));

  return data;
}

export async function insert_todo(todo: Todo) {
  await axios.post(base + "/api/todo", todo).catch((e) => console.log(e));
}

export async function update_todo(todo: Todo) {
  await axios
    .put(base + "/api/todo/" + todo._id, todo)
    .catch((e) => console.log(e));
}

export async function delete_todo(todo: Todo) {
  await axios
    .delete(base + "/api/todo/" + todo._id)
    .catch((e) => console.log(e));
}
