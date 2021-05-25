// import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";
import loadHeader from './generalTemplate';

const Content = document.querySelector('#content'); 

document.addEventListener('onload', loadHeader());

function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}

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

document.querySelector("#todo-form").addEventListener('submit', (e) => {

  e.preventDefault();

  //Get  values from form
  var taskName = document.getElementById('taskName').value;
  var dueDate = document.getElementById('dueDate').value;
  var taskDescription = document.getElementById('description').value;
  
  
  //create an object to store the variables
  var tasks = {
    name:taskName,
    description:taskDescription,
    dueBy: dueDate
  }

  console.log(tasks)
  

  if(localStorage.getItem('task')==null){
    var task =[]; 
    task.push(tasks);
    localStorage.setItem('task',JSON.stringify(task));
    } else {
    var myTask =  JSON.parse(localStorage.getItem('task')); 
    myTask.push(tasks);

    // myTask.each((taskObj) => )
    // then reset the localStorage
    localStorage.setItem('task',JSON.stringify(myTask));
};
});


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



