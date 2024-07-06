import React from 'react'

const TodoInput = ( { onSubmit, input, onChange } ) => {
  return (
    <div>
        <form onSubmit={onSubmit} className='form'>
            <input type="text" placeholder='할 일을 입력해주세요'
                   className='input' value={input} onChange={onChange} />
            <button type='submit' className='btn'>추가</button>
        </form>
    </div>
  )
}

export default TodoInput