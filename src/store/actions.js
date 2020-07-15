import * as types from "./actionTypes";
import {
  doCreateTodo,
  doUpdateTodo,
  doDeleteTodo,
} from "../Firebase/firebaseTodos";

export const create = (insertPosition) => ({
  type: types.CREATE,
  payload: new Promise((resolve, reject) => {
    doCreateTodo({
      content: "",
      isCompleted: false,
      isArchived: false,
      position: insertPosition,
    })
      .then(() => {
        resolve();
      })
      .catch((error) => reject(error));
  }),
});

export const update = (todo) => ({
  type: types.UPDATE,
  payload: new Promise((resolve, reject) => {
    doUpdateTodo(todo)
      .then(() => {
        resolve();
      })
      .catch((error) => reject(error));
  }),
});

export const deleteTodo = (id) => ({
  type: types.DELETE,
  payload: new Promise((resolve, reject) => {
    doDeleteTodo(id)
      .then(() => {
        resolve();
      })
      .catch((error) => reject(error));
  }),
});

export const updateTodos = (todos) => ({
  type: types.UPDATE_TODOS,
  payload: todos,
});
