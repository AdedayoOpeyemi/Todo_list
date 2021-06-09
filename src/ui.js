import Project from './projects';
import Storage from './storage';
import TodoList from './todolist';

export default class UI {

  static clearTaskForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#task-description').value = '';
    document.querySelector('#duedate').value = '';
  }


  static clearProjectForm() {
    document.querySelector('#new_project').value = '';
 }
  static clearProjectList() {
    
  }

  static clearTaskList() {
    document.querySelector(".active-project-title").innerHTML = "";
    

    document.querySelector(".active-project-tasks").innerHTML = "";
    
  }

  static loadHomepage() {

  }
  
  static loadProjects() {
    
    Storage.getTodoList()
      .getProjects()
      .forEach((project) => {
        if (
          project.name !== 'Inbox' &&
          project.name !== 'Today' &&
          project.name !== 'This week'
        ) {
          UI.createProject(project.name);
        }
      });

    // UI.initAddProjectButtons();
  }

  static setMinDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("duedate").setAttribute("min", today);
  }

  static createProject(name) {
    const projectListDiv = document.querySelector('.named-project-list');
    projectListDiv.innerHTML += `
      <div class='d-flex align-items-center'>
         
        <button class="d-flex justify-content-between w-100 project-button"> 
        <div>
        <i class="fas fa-landmark me-3"></i><span>${name}</span>
        </div>
        <div>
        <i class="far fa-trash-alt "></i>
        </div>
        
        </button>
        
      </div>
    `
    UI.clearProjectForm();
  }

  static loadTask(projectName) {
    UI.clearTaskList();
    console.log(typeof projectName)
    const projectTitle = document.querySelector('.active-project-title');
    const todoList = Storage.getTodoList();
    // console.log(Storage.getTodoList() instanceof TodoList);
    console.log(todoList.getProjects());
    const allProjects = todoList.getProjects();
    const activeProject = todoList.getProject(projectName);
    // console.log(activeProject[n])
    // const activeProjectTitle = document.querySelector('.active-project-tasks');
    projectTitle.innerHTML =`<h5>${projectName}</h5>`
     console.log(todoList.getProject(projectName));
    Storage.getTodoList()
    .getProject(projectName)
    .getTasks().forEach((task) => {
      {
        UI.addTask(task);
      }
    });
    UI.collapsible();
    UI.clearTaskForm();
    
    
  }



  static createTask(task) {
    return `
    <div class='d-flex flex-column task-body mb-3' >
      <div class='d-flex align-items-center collapsible'>
        
        <div class="d-flex justify-content-between w-100"  > 
        
          <div class="d-flex flex-row flex-grow-1">
          
            <div class="expand">
              <i class="fas fa-landmark me-3"></i><span>${task.name}</span>
            </div>
            
            
          </div>
          <div>
            <span class="ms-3">priority: ${task.priority}</span>
            <i class="fas fa-edit ms-3"></i>
            <i class="far fa-trash-alt ms-3"></i>
            <span class="ms-3">${task.dueDate}</span>
            <input class="ms-5" type="checkbox" id="completed" name="complted" value="completed">
          </div>
      
        </div>
      </div>
      <div class="content">
        <div class="card card-body">
          ${task.description}
        </div>
      </div>
    </div>
  `




  }

  static collapsible() {
    var coll = document.getElementsByClassName("expand");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.parentElement.parentElement.parentElement.classList.toggle("active");
        var content = this.parentElement.parentElement.parentElement.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  static editTask() {

  }
  
  static timelyList() {

  }


  static addTask(task) {
    const taskList = document.querySelector('.active-project-tasks');
    taskList.innerHTML += UI.createTask(task)
  }
}


    