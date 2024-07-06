package com.bsh.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bsh.server.dto.Todo;
import com.bsh.server.service.TodoService;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "*")
public class TodoController {
    
    @Autowired
    TodoService todoService;
    
    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            List<Todo> todoList = todoService.list();
            
            return new ResponseEntity<>(todoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{no}")
    public ResponseEntity<?> getOne(@PathVariable("no") Integer no) {
        try {
            Todo todo = todoService.select(no);

            return new ResponseEntity<>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Todo todo) {
        try {
            Todo newTodo = todoService.insert(todo);

            if (newTodo != null) {
                return new ResponseEntity<>(newTodo, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Todo todo) {
        try {
            int result = todoService.update(todo);

            if (result > 0) {
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/all")
    public ResponseEntity<?> updateAll() {
        try {
            int result = todoService.updateAll();

            if (result > 0) {
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{no}")
    public ResponseEntity<?> destroy(@PathVariable("no") Integer no) {
        try {
            int result = todoService.delete(no);

            if (result > 0) {
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/all")
    public ResponseEntity<?> destroyAll() {
        try {
            int result = todoService.deleteAll();

            if (result > 0) {
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
