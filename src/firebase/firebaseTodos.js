import db from "./firebaseInit";
import store from "../Store/store";
import { updateTodos } from "../Store/actions";
import * as selectors from "../Store/selectors.js";

let todos = db.collection("todos");

export const doUpdateTodo = (todo) => {
  let localTodos = selectors.getTodos(store.getState());
  let myTodo = localTodos.find((localTodo) => localTodo.id === todo.id);
  //compare position and batch upstream

  return todos.doc(todo.id).update({
    content: todo.content,
    isCompleted: todo.isCompleted,
    isArchived: todo.isArchived,
    position: todo.position,
  });
};

export const doCreateTodo = (todo) => {
  return todos.add({
    content: todo.content,
    isCompleted: todo.isCompleted,
    isArchived: todo.isArchived,
    position: todo.position,
  });
};

export const doDeleteTodo = (id) => {
  return todos.doc(id).delete();
};

export const todosObserver = todos.onSnapshot(
  (collectionSnapshot) => {
    let todoList = [];
    collectionSnapshot.forEach((doc) => {
      todoList.push({ ...doc.data(), id: doc.id });
    });

    store.dispatch(updateTodos(todoList));
  },
  (error) => {
    console.log("Firebase error: " + error.message);
  }
);

export const todosUnsub = todos.onSnapshot(() => {});
