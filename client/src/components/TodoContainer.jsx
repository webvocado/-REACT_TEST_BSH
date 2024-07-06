import React from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import { useEffect } from 'react'
import { useState } from 'react'

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')

  // 데이터 요청
  useEffect(() => {
    getList()
  }, [])

  // 목록 [GET]
  const getList = () => {
    fetch('http://127.0.0.1:8080/todos')
      .then((response) => response.json())
      .then((data) => setTodoList(data))
      .catch((error) => console.error())
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

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const url = 'http://localhost:8080/todos'

    try {
      const response = await fetch(url, init)
      console.log(response);
    } catch (error) {
      console.log(error)
    }

    const updateTodoList = todoList.map((item) => {
      return item.no == todo.no ? data : item
    })

    //정렬
    updateTodoList.sort((a, b) => {
      return a.status - b.status == 0 ? b.no - a.no : a.status - b.status
    })

    getList()
  }

  // 전체 완료
  const onUpateAll = async () => {
    const init = {
      method: 'PUT',
    };
    const url = 'http://localhost:8080/todos/all'

    try {
      const response = await fetch(url, init)
      console.log(response);
      if (response.ok) {
        console.log("전체 업데이트 성공");

      } else {
        throw new Error("Failed to update all todos");
      }
    } catch (error) {
      console.log(error)
    }

    const updatedTodoList = todoList.map(todo => {
      return { ...todo, status: 1 }
    });

    // 정렬
    updatedTodoList.sort((a, b) => {
      return a.status - b.status == 0 ? b.no - a.no : a.status - b.status
    })

    setTodoList(updatedTodoList)
  }

  // 삭제
  const onRemove = async (no) => {
    const init = {
      method: 'DELETE'
    }
    const url = `http://localhost:8080/todos/${no}`;
    try {
      const response = await fetch(url, init)
      console.log(response);
    } catch (error) {
      console.log(error)
    }

    const updateTodoList = todoList.filter((todo) => todo.no !== no)
    setTodoList(updateTodoList)
  }

  // 등록
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: input
    }

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const url = 'http://localhost:8080/todos'
    try {
      const response = await fetch(url, init)
      const newTodo = await response.json()
      getList()
    } catch (error) {
      console.log(error)
    }
    setInput('')
  }

  // input state 에 저장
  const onChange = (e) => {
    const changedInput = e.target.value;
    setInput(changedInput);
  }

  // 전체 삭제
  const onRemoveAll = async () => {
    const init = {
      method: 'DELETE'
    }
    const url = 'http://localhost:8080/todos/all'
    try {
      const response = await fetch(url, init)
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
      <TodoFooter onRemoveAll={onRemoveAll} onUpateAll={onUpateAll} />
    </div>
  )
}

export default TodoContainer