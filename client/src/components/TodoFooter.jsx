import React from 'react'

const TodoFooter = ({ onRemoveAll, onUpateAll, todoList  }) => {
  return (
    <div className='footer'>
        <div className='item'>
            <button className='btn btn-footer' disabled={todoList.length === 0} onClick={() => onRemoveAll()}>전체삭제</button>
        </div>
        <div className='item'>
            <button className='btn btn-footer' disabled={todoList.length === 0} onClick={() => onUpateAll()}>전체완료</button>
        </div>
    </div>
  )
}

export default TodoFooter