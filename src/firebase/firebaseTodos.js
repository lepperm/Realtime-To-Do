import db from './firebaseInit';
import store from '../store/store';
import { updateTodos } from '../store/actions';

let todos = db.collection('todos');

export const doUpdateTodo = (todo) => {
    return todos.doc(todo.id).update({
        content: todo.content,
        isCompleted: todo.isCompleted,
        isArchived: todo.isArchived
    });
};

export const doCreateTodo = (todo) => {
    return todos.add({
        content: todo.content,
        isCompleted: todo.isCompleted,
        isArchived: todo.isArchived
    });
}

export const doDeleteTodo = (id) => {
    return todos.doc(id).delete();
};

export const todosObserver = todos.onSnapshot(collectionSnapshot => {
    let todoList = [];
    collectionSnapshot.forEach(doc => {
        todoList.push({...doc.data(), id: doc.id});
    })

    store.dispatch(updateTodos(todoList));
},error => {console.log("Firebase error: " + error.message);});

export const todosUnsub = todos.onSnapshot(() => {});