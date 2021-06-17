import TodoList from './todolist';
import Task from './task';
import Project from './projects';

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
      .forEach((project) =>
        project.setTasks(
          project.getTasks().map((task) => Object.assign(new Task(), task)),
        ),
      );

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
    Storage.saveTodoList(todoList)
  }

  static deleteTask(project, task) {
    const todoList = Storage.getTodoList();
    todoList.getProject(project).deleteTask(task);
    Storage.saveTodoList(todoList)
  }

  static getTask(project, task) {
    const todoList = Storage.getTodoList();
    const oldTask = todoList.getProject(project).getTask(task);
    return oldTask;
  }

  static updateTask(project, task, newTitle, newDescription, newDueDate,  newPriority) {
    const todoList = Storage.getTodoList();
    console.log(project)
    todoList.getProject(project).getTask(task).updateTask(newTitle, newDescription, newDueDate, newPriority);
    Storage.saveTodoList(todoList)
  }

}

