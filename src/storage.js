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
}

