import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import axios from 'axios';

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')

  // 데이터 요청
  useEffect(() => {
    getList()
  }, [])

  // 목록 [GET]
  const getList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/todos')
      setTodoList(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // 체크 박스 토글
  const onToggle = async (todo) => {
    const data = {
      no: todo.no,
      name: todo.name,
      status: todo.status ? 0 : 1,    // 토글
      regDate: todo.regDate,
      updDate: todo.updDate
    }

    try {
      const response = await axios.put('http://localhost:8080/todos', data)
    } catch (error) {
      console.log(error)
    }

    const updateTodoList = todoList.map((item) => {
      return item.no === todo.no ? data : item
    })

    //정렬
    updateTodoList.sort((a, b) => {
      return a.status - b.status === 0 ? b.no - a.no : a.status - b.status
    })

    getList()
  }

  // 전체 완료
  const onUpateAll = async () => {
    try {
      const response = await axios.put('http://localhost:8080/todos/all')
    } catch (error) {
      console.log(error)
    }

    const updatedTodoList = todoList.map(todo => {
      return { ...todo, status: 1 }
    })

    // 정렬
    updatedTodoList.sort((a, b) => {
      return a.status - b.status === 0 ? b.no - a.no : a.status - b.status
    })

    setTodoList(updatedTodoList)
  }

  // 삭제
  const onRemove = async (no) => {
    try {
      const response = await axios.delete(`http://localhost:8080/todos/${no}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }

    const updateTodoList = todoList.filter((todo) => todo.no !== no)
    setTodoList(updateTodoList)
  }

  // 등록
  const onSubmit = async (e) => {
    e.preventDefault()

    if (input.trim() === '') {
      alert('todo를 입력하세요')
      return
    }

    const data = {
      name: input
    }

    try {
      const response = await axios.post('http://localhost:8080/todos', data)
      const newTodo = response.data
      getList()
    } catch (error) {
      console.log(error)
    }
    setInput('')
  }

  // input state 에 저장
  const onChange = (e) => {
    const changedInput = e.target.value
    setInput(changedInput)
  }

  // 전체 삭제
  const onRemoveAll = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/todos/all')
      setTodoList([])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <TodoHeader />
      <TodoInput onSubmit={onSubmit} input={input} onChange={onChange} />
      <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
      <TodoFooter onRemoveAll={onRemoveAll} onUpateAll={onUpateAll} todoList={todoList} />
    </div>
  )
}

export default TodoContainer
