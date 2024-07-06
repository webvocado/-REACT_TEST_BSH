package com.bsh.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bsh.server.dto.Todo;
import com.bsh.server.mapper.TodoMapper;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    TodoMapper todoMapper;

    @Override
    public List<Todo> list() {
        return todoMapper.list(); 
    }

    @Override
    public Todo select(int no) {
        return todoMapper.select(no);
    }

    @Override
    public Todo insert(Todo todo) {
        todoMapper.insert(todo);
        
        int newTodoNo = todo.getNo();
        Todo newTodo = todoMapper.select(newTodoNo);

        return newTodo;
    }

    @Override
    public int update(Todo todo) {
        int result = todoMapper.update(todo);
        return result;
    }

    @Override
    public int updateAll() {
        int result = todoMapper.updateAll();
        return result;
    }

    @Override
    public int delete(int no) {
        int result = todoMapper.delete(no);
        return result;
    }
    
    @Override
    public int deleteAll() {
        int result = todoMapper.deleteAll();
        return result;
    }
    
}
