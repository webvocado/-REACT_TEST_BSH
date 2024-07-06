import React from 'react'

const TodoItem = ({ todo, onToggle, onRemove }) => {
    let {no, name, status} = todo
    status = status == 1 ? true : false

    return (
        <li className='todoItem' key={no}>
            <div className="item">
                <input type="checkbox" id={no} 
                       checked={status} 
                       onChange={ () => onToggle(todo) } />  
                <label htmlFor={no}></label>
                <span>{name}</span>
            </div>
            <div className='item'>
                <button className='btn' onClick={ () => onRemove(no)}>삭제</button>
            </div>
        </li>
    )
}

export default TodoItem