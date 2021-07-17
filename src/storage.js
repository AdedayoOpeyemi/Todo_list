import TodoList from './todolist.js';
import Task from './task.js';
import Project from './projects.js';

export default class Storage {
  static saveTodoList(todolist) {
    localStorage.setItem('todoList', JSON.stringify(todolist));
  }

  static getTodoList() {
    // local storage doesn't store type of data so we have to convert it

    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todoList')),
    );

    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new Project(), project)),
    );

    todoList
      .getProjects()
      .forEach((project) => project.setTasks(
        project.getTasks().map((task) => Object.assign(new Task(), task)),
      ));

    return todoList;
  }

  static addTask(project, task) {
    const todoList = Storage.getTodoList();
    todoList.getProject(project).addTask(task);
    Storage.saveTodoList(todoList);
  }

  static deleteProject(projectName) {
    const todoList = Storage.getTodoList();
    todoList.deleteProject(projectName);
    Storage.saveTodoList(todoList);
  }

  static deleteTask(project, task) {
    const todoList = Storage.getTodoList();
    todoList.getProject(project).deleteTask(task);
    Storage.saveTodoList(todoList);
  }

  static getTask(project, task) {
    const todoList = Storage.getTodoList();
    return todoList.getProject(project).getTask(task);
  }

  static updateTask(project, task, newTitle, newDescription, newDueDate, newPriority) {
    const todoList = Storage.getTodoList();
    todoList.getProject(project)
      .getTask(task).updateTask(newTitle, newDescription, newDueDate, newPriority);
    Storage.saveTodoList(todoList);
  }

  static changeTaskCompletion(project, task, status) {
    const todoList = Storage.getTodoList();
    todoList.getProject(project).getTask(task).toggleCompletion(status);
    Storage.saveTodoList(todoList);
  }

  static allTaskToday() {
    const todoList = Storage.getTodoList();
    return todoList.todayTasks();
  }

  static allTaskThisWeek() {
    const todoList = Storage.getTodoList();
    return todoList.currentWeekTasks();
  }

  static allTask() {
    const todoList = Storage.getTodoList();
    return todoList.allTasks();
  }

  static allTaskThisMonth() {
    const todoList = Storage.getTodoList();
    return todoList.currentMonthTasks();
  }

  static getProject(project) {
    const todoList = Storage.getTodoList();
    return todoList.getProject(project);
  }
}
