import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as selectors from './store/selectors';
import * as actions from './store/actions';

import * as firebaseTodos from './firebase/firebaseTodos';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.todosObserver = null;
  }

  componentDidMount(){
    this.todosObserver = firebaseTodos.todosObserver;
  }

  componentWillUnmount() {
    this.todosObserver = firebaseTodos.todosUnsub;
  }

  handleKeyDown(e, i) {
    const { todos } = this.props;

    // Enter to create a new entry OR down key when at the end of the list
    // Ctrl + Enter will complete the currently selected to-do
    if (e.key === 'Enter' || (e.keyCode === 40 && i === todos.length-1)) {
      e.preventDefault();
      if(e.ctrlKey){
        this.toggleTodoCompleteAtIndex(i);
      } else {
        this.createTodoAtIndex(e, i);
      }
    }
    // Backspace, delete an empty todo
    // Ctrl + backspace will delete todos with text
    else if (e.key === 'Backspace' && (todos[i].content ==='' || e.ctrlKey)) {
      e.preventDefault();
      this.removeTodoAtIndex(i);
    }
        // Down key, navigate down in the list
        else if (e.keyCode === 40 && i < todos.length-1) {
      setTimeout(() => {
        document.forms[0].elements[i + 1].focus();
      }, 0);
    }
    // Up key, navigate up in the list
    else if (e.keyCode === 38 && i > 0) {
      // By preventing default in the input field, the cursor should
      // "stick" to the end of the line when navigating up and down
      e.preventDefault();
      setTimeout(() => {
        document.forms[0].elements[i - 1].focus();
      }, 0);
    }
    this.setState({ state: this.state });
  }

  handleOnChange(e, i) {
    this.props.update(i, e.target.value);
    this.setState({ state: this.state });
  }

  createTodoAtIndex(e, i) {
    this.props.create(i);
    this.setState({ state: this.state });
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  removeTodoAtIndex(i) {
    this.props.deleteTodo(i);
    if(i - 1 >= 0) {
      setTimeout(() => {
        document.forms[0].elements[i - 1].focus();
      }, 0);
    }
  }

  toggleTodoCompleteAtIndex(i) {
    this.props.toggleComplete(i);
    this.setState({ state: this.state });
  }

  toggleTodoArchiveAtIndex(i) {
    this.props.archive(i);
    this.setState({ state: this.state });
  }

  render(){
    const { todos } = this.props;

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
                      onChange={e => this.handleOnChange(e, i)}
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
          <input type="button" value="Archive Complete" onClick={this.submitForm} />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: selectors.getTodos(state)
});

const mapDispatchToProps = dispatch => ({
  create: bindActionCreators(actions.create, dispatch),
  update: bindActionCreators(actions.update, dispatch),
  toggleComplete: bindActionCreators(actions.toggleComplete, dispatch),
  deleteTodo: bindActionCreators(actions.deleteTodo, dispatch),
  archive: bindActionCreators(actions.archive, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps) (App);