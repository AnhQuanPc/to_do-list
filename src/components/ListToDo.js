import React from 'react'
import ToDO from './ToDo'


const TodoList = (props) => {
    const { todosList, isCheckedAll, checkAllTodos } = props
    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" checked={isCheckedAll} />
            <label htmlFor="toggle-all" onClick={checkAllTodos}></label>
            <ul className="todo-list">
                {
                    todosList.map((todo, index) => <ToDO key={`todo${todo.id}`} {...{ todo }} {...props} index={index} />)
                }
            </ul>
        </section>
    )
}

export default TodoList