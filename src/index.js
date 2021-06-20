import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import './styles.css';
import Storage from './storage';
import Project from './projects';
import UI from './ui';
import Task from './task';
import TodoList from './todolist';

document.querySelector('#add-task').addEventListener('click', UI.setMinDate());

const loadAll = () => {
  initialSetup();
  UI.loadTask("GENERAL TASKS");
  UI.loadProjects();
};

const initialSetup = () => {
  if (localStorage.getItem('todoList') === null) {
    const todoList = new TodoList();
    const general = new Project("GENERAL TASKS");
    const generalTask = new Task("Welcome to Tikky", 
    "Thanks for trying out the App, I hope it helps you to achieve your task planning and monitoring goals", 
    "2021-06-06", "low")
    general.addTask(generalTask);
    todoList.addProject(general);
    Storage.saveTodoList(todoList);
  }
}

const modalEl = document.getElementById('exampleModal');

const closeModal = () => {
  const modal = Modal.getInstance(modalEl);
  modal.hide();
  modalEl.addEventListener('hidden.bs.modal', () => {
    modal.dispose();
  }, { once: true });
};

window.addEventListener('DOMContentLoaded', loadAll);

document.querySelector('#title').addEventListener('keyup', () => {
  const error = document.getElementById('taskError');
  error.textContent = '';
});

document.querySelector('#new_project').addEventListener('keyup', () => {
  const error = document.getElementById('projectError');
  error.textContent = '';
});
document.querySelector('#project-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const proName = document.querySelector('#new_project').value;
  const xyz = proName.toUpperCase();
  const error = document.getElementById('projectError');

  if (Storage.getProject(xyz) !== undefined) {
  // Changing content and color of content
    error.textContent = 'A Project with that name already exists';
    error.style.color = 'red';
    return;
  }

  const abc = new Project(xyz);
  const todo = Storage.getTodoList();
  todo.addProject(abc);
  Storage.saveTodoList(todo);
  UI.clearProjectList();
  UI.loadProjects();
  UI.loadTask(xyz);
});

document.querySelectorAll('.named-project-list').forEach((project) => {
  project.addEventListener('click', (e) => {
    UI.loadTask(e.target.innerText);
  });
});

document.querySelector('#task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const previousTitle = document.querySelector('#title').placeholder;

  // get the current project
  const currentProject = document.querySelector('.active-project-title h5').innerText;

  // Get  values from form
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#task-description').value;
  const duedate = document.querySelector('#duedate').value;
  const priority = document.querySelector('#task-priority').value;

  if (previousTitle === 'Add new task') {
    const newTask = new Task(title, description, duedate, priority);
    const error = document.getElementById('taskError');
    if (Storage.getTask(currentProject, title) !== undefined) {
      error.textContent = 'A task within this project already has that name ';
      error.style.color = 'red';
      return;
    }
    Storage.addTask(currentProject, newTask);
    UI.loadTask(currentProject);
    closeModal();
    return;
  }
  if (previousTitle !== title) {
    const error  = document.getElementById('taskError');
    if (Storage.getTask(currentProject, title) !== undefined) {
      error.textContent = 'A task within this project already has that name ';
      error.style.color = 'red';
      return;
    }
  }

  Storage.updateTask(currentProject, previousTitle, title, description, duedate, priority);
  closeModal();
  document.querySelector('#title').placeholder = 'Add new task';
  UI.loadTask(currentProject);
});

document.querySelector('#general-tasks').addEventListener('click', () => {
  UI.loadTask("GENERAL TASKS")
});
document.querySelector('#this-day').addEventListener('click', UI.loadTodayTasks);
document.querySelector('#this-week').addEventListener('click', UI.loadThisWeekTasks);
document.querySelector('#this-month').addEventListener('click', UI.loadThisMonthTasks);
