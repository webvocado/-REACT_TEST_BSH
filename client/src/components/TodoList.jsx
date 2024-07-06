import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todoList, onToggle, onRemove }) => {
    console.log(todoList)
    return (
        <ul className='todoList'>
            {todoList.map((todo) => (
                <TodoItem todo={todo} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </ul>
    )
}

export default TodoList