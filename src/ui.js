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
    document.querySelector(".named-project").innerHTML = "";
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
    UI.projectTasks();
    UI.deleteProject();
    // UI.initAddProjectButtons();
  }

  static projectTasks() {
    document.querySelectorAll('.named-project-list').forEach(project => {
      project.addEventListener('click', (e) => {
        UI.loadTask(e.target.innerText);
      })
    });
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
    const projectListDiv = document.querySelector('.named-project');
    projectListDiv.innerHTML += `
      <div class='d-flex align-items-center'>
         
        <button class="d-flex justify-content-between w-100 project-button"> 
        <div class="named-project-list">
        <i class="fas fa-landmark me-3"></i><span>${name}</span>
        </div>
        <div class="">
        <i class="far fa-trash-alt delete-project"></i>
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
    UI.deleteTask();
  
  }



  static createTask(task) {
    return `
    <div class='d-flex flex-column task-body mb-3' >
      <div class='d-flex align-items-center collapsible'>
        
        <div class="d-flex justify-content-between w-100"  > 
        
          <div class="expand d-flex flex-row flex-grow-1">
          
            <div class="">
              <i class="fas fa-landmark me-3"></i><span>${task.name}</span>
            </div>
            
            
          </div>
          <div>
            <span class="m-3">priority: ${task.priority}</span>
            <i class="fas fa-edit edit-task ms-3"></i>
            <i class="far fa-trash-alt ms-3 delete-task"></i>
            <span class="ms-3">${task.dueDate}</span>
            <input class="ms-5 completed" type="checkbox" id="completed" name="completed" value="completed">
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
    const coll = document.getElementsByClassName("expand");

    for (var i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.parentElement.parentElement.classList.toggle("active");
        var content = this.parentElement.parentElement.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  static editTask() { 
    const editTaskIcon =  document.querySelectorAll('.edit-task')

    for (var i=0; i < editTaskIcon.length; i++) {
      editTaskIcon[i].addEventListener("click", function() {
        var taskToEdit = this.parentElement.previousElementSibling.children[0].children[1].innerText;
        console.log(taskToEdit)
        // Storage.deleteProject(projectToDelete);
        // UI.clearProjectList();
        // UI.loadProjects();
      })
    }
  }


  static deleteTask() { 
    const deleteTaskIcon =  document.querySelectorAll('.delete-task')

    for (var i=0; i < deleteTaskIcon.length; i++) {
      deleteTaskIcon[i].addEventListener("click", function() {
        var taskToDelete = this.parentElement.previousElementSibling.children[0].children[1].innerText;
        console.log(taskToDelete)

        const projectOfTask = document.querySelector('.active-project-title h5').innerText
        console.log(projectOfTask)
        Storage.deleteTask(projectOfTask, taskToDelete);
    this.closest(".task-body").remove()
        // Storage.deleteProject(projectToDelete);
        // UI.clearProjectList();
        // UI.loadProjects();
      })
    }
  }


  static completeTask() {
    const deleteTaskIcon =  document.querySelectorAll('.delete-task')

    for (var i=0; i < deleteTaskIcon.length; i++) {
      editTaskIcon[i].addEventListener("click", function() {
        var taskToEdit = this.parentElement.previousElementSibling.children[0].children[1].innerText;
        console.log(taskToDelete)

        const projectOfTask = projectTitle = document.querySelector('.active-project-title')

        // Storage.deleteProject(projectToDelete);
        // UI.clearProjectList();
        // UI.loadProjects();
      })
    }
  }  
  static loadTimelyList() {

  }

  static removeProject(project) {

  }


  static addTask(task) {
    const taskList = document.querySelector('.active-project-tasks');
    taskList.innerHTML += UI.createTask(task)
  }

  static deleteProject() {
    const deleteIcon = document.getElementsByClassName('delete-project')
    

    for (var i=0; i < deleteIcon.length; i++) {
      deleteIcon[i].addEventListener("click", function() {
        var projectToDelete = this.parentElement.previousElementSibling.children[1].innerText;
        const projectTasks = document.querySelector('.active-project-title');
        console.log(projectToDelete)
        Storage.deleteProject(projectToDelete);
        if (projectTasks == projectToDelete) {
          UI.clearTaskList();
        }
        UI.clearTaskList();
        UI.clearProjectList();
        UI.loadProjects();
      })
    }
  }
  
  static removeTask() {

  }


}


    