package com.bsh.server.service;

import java.util.List;

import com.bsh.server.dto.Todo;

public interface TodoService {
    
   public List<Todo> list();
   public Todo select(int no);
   public Todo insert(Todo todo);
   public int update(Todo todo);
   public int updateAll();
   public int delete(int no);
   public int deleteAll();

}
