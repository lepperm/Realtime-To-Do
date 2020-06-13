// The following framework used below was adapted from James King's excellent To-Do list tutorial found here:
// https://upmostly.com/tutorials/build-a-todo-app-in-react-using-hooks

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props); //sends to component correctly
    this.state = {
      todos:[{
        content: '',
        isCompleted: false,
        isArchived: false
      }]
    };
  }

  handleKeyDown(e, i) {
    const { todos } = this.state;
    // Enter to create a new entry OR down key when at the end of the list
    // Ctrl + Enter will complete the currently selected to-do
    if (e.key === 'Enter' || (e.keyCode === 40 && i === todos.length-1)) {
      if(e.ctrlKey){
        this.toggleTodoCompleteAtIndex(i);
      } else {
        this.createTodoAtIndex(e, i);
      }
    }
    // Backspace, delete an empty todo
    // Ctrl + backspace will delete todos with text
    if (e.key === 'Backspace' && (todos[i].content ==='' || e.ctrlKey)) {
      e.preventDefault();
      return this.removeTodoAtIndex(i);
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

  createTodoAtIndex(e, i) {
    const { todos } = this.state;
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    this.setState({todos: newTodos});
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  updateTodoAtIndex(e, i) {
    const { todos } = this.state;
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    this.setState({todos: newTodos});
  }

  removeTodoAtIndex(i) {
    const { todos } = this.state;
    if (i === 0 && todos.length === 1) return;
    let delTodos = todos.slice(0, i).concat(todos.slice(i + 1, todos.length));
    this.setState({todos: delTodos});
    if(i - 1 >= 0) {
      setTimeout(() => {
        document.forms[0].elements[i - 1].focus();
      }, 0);
    }
  }

  toggleTodoCompleteAtIndex(index) {
    const { todos } = this.state;
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    this.setState({todos: temporaryTodos});
  }

  render(){
    const { todos } = this.state;

    return (
      <div className="app">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <form className="todo-list">
            <ul>
              {todos.map((todo, i) => (
                <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
                  <div className={'checkbox'} onClick={() => this.toggleTodoCompleteAtIndex(i)}>
                    {todo.isCompleted && (
                      <span>&#x2714;</span>
                    )}
                  </div>
                  <div className="wrapper">
                    <span className='strikethrough'>&nbsp;</span>
                    <input
                      type="text"
                      value={todo.content}
                      onKeyDown={e => this.handleKeyDown(e, i)}
                      onChange={e => this.updateTodoAtIndex(e, i)}
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
}

export default App;