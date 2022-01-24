
import React from "react";

const ToDO = (props) => {
    const { todo, markCompleted, removeTodo } = props
    return (
        <li className={`${todo.isCompleted ? 'completed' : ''}`}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => markCompleted(todo.id)}
                />
                <label>{todo.text}</label>
                <button className="destroy" onClick={() => removeTodo(todo.id)}></button>
            </div>
        </li >
    );
}

export default ToDO;