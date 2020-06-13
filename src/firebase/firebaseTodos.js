import db from './firebaseInit';
import store from '../store/store';
import { updateTodos } from '../store/actions';

let todos = db.collection('todos');

export const todosObserver = todos.onSnapshot(collectionSnapshot => {
    let todoList = [];
    collectionSnapshot.forEach(doc => {
        console.log(doc.data());
        todoList.push(doc.data());
    })

    store.dispatch(updateTodos(todoList));
},error => {console.log("Firebase error: " + error.message);});

export const todosUnsub = todos.onSnapshot(() => {});