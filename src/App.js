// The following framework used below was adapted from James King's excellent To-Do list tutorial found here:
// https://upmostly.com/tutorials/build-a-todo-app-in-react-using-hooks

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // useState uses two values, a "getter" and a "setter"
  // Below, "todos" is the state value, and "setTodos" is the update function
  const [todos, setTodos] = useState([
    {
      content: '',
      isCompleted: false,
    },
  ]);

  function handleKeyDown(e, i) {
    // Enter to create a new entry OR down key when at the end of the list
    // Ctrl + Enter will complete the currently selected to-do
    if (e.key === 'Enter' || (e.keyCode === 40 && i === todos.length-1)) {
      if(e.ctrlKey){
        toggleTodoCompleteAtIndex(i);
      } else {
        createTodoAtIndex(e, i);
      }
    }
    // Backspace, delete an empty todo
    // Ctrl + backspace will delete todos with text
    if (e.key === 'Backspace' && (todos[i].content ==='' || e.ctrlKey)) {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
        // Down key, navigate down in the list
    if (e.keyCode === 40 && i < todos.length-1) {
      setTimeout(() => {
        document.forms[0].elements[i + 1].focus();
      }, 0);
    }
    // Up key, navigate up in the list
    if (e.keyCode === 38 && i > 0) {
      // By preventing default in the input field, the cursor should
      // "stick" to the end of the line when navigating up and down
      e.preventDefault();
      setTimeout(() => {
        document.forms[0].elements[i - 1].focus();
      }, 0);
    }
  }

  function createTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  function updateTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }

  function removeTodoAtIndex(i) {
    if (i === 0 && todos.length === 1) return;
    let delTodos = todos.slice(0, i).concat(todos.slice(i + 1, todos.length));
    setTodos(delTodos);
    if(i - 1 >= 0) {
      setTimeout(() => {
        document.forms[0].elements[i - 1].focus();
      }, 0);
    }
  }

  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
    <div className="app">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <form className="todo-list">
          <ul>
            {todos.map((todo, i) => (
              <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
                <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                  {todo.isCompleted && (
                    <span>&#x2714;</span>
                  )}
                </div>
                <div className="wrapper">
                  <span className='strikethrough'>&nbsp;</span>
                  <input
                    type="text"
                    value={todo.content}
                    onKeyDown={e => handleKeyDown(e, i)}
                    onChange={e => updateTodoAtIndex(e, i)}
                    placeholder='...'
                  />
                </div>
              </div>
            ))}
          </ul>
        </form>
      </header>
      <footer>
        <div>Press enter to add a new to-do</div>
        <div>Press ctrl+enter to mark the to-do complete</div>
        <div>Press ctrl+backspace to delete a to-do</div>
      </footer>
    </div>
  );
}

export default App;