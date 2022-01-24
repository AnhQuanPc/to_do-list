import React, { PureComponent } from 'react';

// Components
import Header from './components/Header'
import TodoList from './components/ListToDo'
import Footer from './components/Footer'

// Css

import './css/style.css'

const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)

const filterByStatus = (todos = [], status = '', id = '') => {
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id)
    default:
      return todos
  }
}
class App extends PureComponent {
  state = {
    todosList: [{
      id: 1,
      text: 'todo 1',
      isCompleted: true
    }, 
    {
      id: 2,
      text: 'todo 2',
      isCompleted: false
    },
],
    isCheckedAll: false,
    status: 'ALL'
  }

  componentWillMount() {
    this.setState({
      isCheckedAll: !isNotCheckedAll(this.state.todosList)
    })
  }

  addTodo = (todo = {}) => {
    this.setState(preState => ({
      todosList: [...preState.todosList, todo]
    }))
  }

  markCompleted = (id = '') => {
    const { todosList } = this.state
    const updatedList = todosList.map(todo => todo.id === id ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo)
    this.setState(preState => ({
      todosList: updatedList,
      isCheckedAll: !isNotCheckedAll(updatedList)
    }))
  }

  checkAllTodos = () => {
    const { todosList, isCheckedAll } = this.state
    this.setState(preState => ({
      todosList: todosList.map(todo => ({ ...todo, isCompleted: !isCheckedAll })),
      isCheckedAll: !preState.isCheckedAll
    }))
  }

  setStatusFilter = (status = '') => {
    this.setState({
      status
    })
  }

  clearCompleted = () => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'ACTIVE')
    })
  }

  removeTodo = (id = '') => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'REMOVE', id)
    })
  }

  render() {
    const { todosList, isCheckedAll, status } = this.state
    return (
      <div className="todoapp">
        <Header
          addTodo={this.addTodo}
          isCheckedAll={isCheckedAll}
        />
        <TodoList
          todosList={filterByStatus(todosList, status)}
          markCompleted={this.markCompleted}
          isCheckedAll={isCheckedAll}
          checkAllTodos={this.checkAllTodos}
          removeTodo={this.removeTodo}
        />
        <Footer
          setStatusFilter={this.setStatusFilter}
          status={status}
          clearCompleted={this.clearCompleted}
          numOfTodos={todosList.length}
          numOfTodosLeft={filterByStatus(todosList, 'ACTIVE').length}
        />
      </div>
    );
  }
}

export default App;