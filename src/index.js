// import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "./styles.css";
import TodoList from './todolist';
import Storage from './storage';
import Project from './projects';
import UI from './ui';
import Task from './task';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';
// import loadHeader from './generalTemplate';


const Content = document.querySelector('#content'); 

document.querySelector('#add-task').addEventListener('click', UI.setMinDate());

document.addEventListener('onload', UI.loadProjects());

document.querySelector("#project-form").addEventListener('submit', (e) => {

e.preventDefault();
const xyz = document.querySelector('#new_project').value;
const abc = new Project(xyz);
const todo = Storage.getTodoList();
// Object.assign(todo, new TodoList);
// todo.projects.map
// Object.assign(todo.projects, abc);

// if (Storage.getTodoList().contains(abc)) {
//   addProjectPopupInput.value = '';
//   alert('Project names must be different');
//   return;
// }
todo.addProject(abc);
Storage.saveTodoList(todo);

// UI.loadProjects();
// UI.createProject(abc.name);
UI.clearProjectList();
UI.loadProjects();
// UI.clearProjectForm();

});

document.querySelectorAll('.named-project-list').forEach(project => {
  project.addEventListener('click', (e) => {
    UI.loadTask(e.target.innerText);
  })
});

document.querySelector("#task-form").addEventListener('submit', (e) => {

  e.preventDefault();
  const previousTitle = document.querySelector('#title').placeholder;
  console.log(previousTitle);
  //get the current project
  const currentProject = document.querySelector(".active-project-title h5").innerText;

  //Get  values from form
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#task-description').value;
  const duedate = document.querySelector('#duedate').value;
  const priority = document.querySelector('#task-priority').value;
  console.log(priority)

  if (previousTitle == "Add new task") {
    const newTask= new Task(title, description, duedate, priority);
  Storage.addTask(currentProject, newTask)
  console.log
  UI.loadTask(currentProject);
  console.log(isToday(parseISO(duedate)));
  }

  Storage.updateTask(currentProject, previousTitle, title, description, duedate, priority);
  UI.loadTask(currentProject);
  // console.log(currentProject)
  //Create instance of book
  
;
// const todoList = Storage.getTodoList().getProject(currentProject);
//  console.log(todoList);
  // console.log(newBook)

  //Add new instance of Book to List
  // UI.addBookToList(newBook);alright,
});

// document.querySelectorAll(e)

// function Person(first, last, age, eye) {
//   this.firstName = first;
//   this.lastName = last;
//   this.age = age;
//   this.eyeColor = eye;
// }

// const submission = document.querySelector("#add-task-button");

// submission.addEventListener("submit", function( {
//   taskTitle = document.getElementById("title")
  
// })

// document.querySelector('#todo-form').addEventListener('submit', saveTask);

// function saveTask(e){
//   e.preventDefault();
//   //get form values
//   var taskName = document.getElementById('taskName').value;
//   var dueDate = document.getElementById('dueDate').value;
//   var taskDescription = document.getElementById('description').value;
  
  
//   //create an object to store the variables
//   var tasks = {
//     name:taskName,
//     description:taskDescription,
//     dueBy: dueDate
//   }

//   console.log(tasks)
  

//   if(localStorage.getItem('task')==null){
//     var task =[]; task.push(tasks);
//     localStorage.setItem('task',JSON.stringify(task));
//     }else{
//     var myTask = localStorage.getItem('task'); myTask.push(tasks);
//     // then reset the localStorage
//     localStorage.setItem('task',JSON.stringify(myTask));
// }
// }

// document.querySelector("#todo-form").addEventListener('submit', (e) => {

//   e.preventDefault();

//   //Get  values from form
//   var taskName = document.getElementById('taskName').value;
//   var dueDate = document.getElementById('dueDate').value;
//   var taskDescription = document.getElementById('description').value;
  
  
//   //create an object to store the variables
//   var tasks = {
//     name:taskName,
//     description:taskDescription,
//     dueBy: dueDate
//   }

//   console.log(tasks)
  

//   if(localStorage.getItem('task')==null){
//     var task =[]; 
//     task.push(tasks);
//     localStorage.setItem('task',JSON.stringify(task));
//     } else {
//     var myTask =  JSON.parse(localStorage.getItem('task')); 
//     myTask.push(tasks);

//     // myTask.each((taskObj) => )
//     // then reset the localStorage
//     localStorage.setItem('task',JSON.stringify(myTask));
// };
// });


// const cleanDOM = () => {
//   appContent.innerHTML = '';
// };

// const loadHeader = () => {
 
// const testDiv = document.createElement('DIV');
// testDiv.classList.add('p-3', 'mb-2', 'text-white', 'bg-primary');
// testDiv.innerText = 'This is a test practice';
// appContent.append(testDiv);
// };

// document.addEventListener('click', () => {
//   cleanDOM();
//   loadHeader();
// });

document.getElementsByClassName('delete-project') 