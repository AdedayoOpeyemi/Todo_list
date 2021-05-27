import TodoList from './todolist';
import Task from './task';

class saveTodoList {
  static saveTodoList(todolist) {
    localStorage.setItem('todoList', JSON.stringify(todolist));
  }

  static getTodoList() {
  
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todolist')),
    );

    //assign the project objects

    //assign the task objects

    return todoList;
  }
}

