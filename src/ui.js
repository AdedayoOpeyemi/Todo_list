import { Modal } from 'bootstrap';
import Storage from './storage';

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
    document.querySelector('.named-project').innerHTML = '';
  }

  static clearTaskList() {
    document.querySelector('.active-project-title').innerHTML = '';
    document.querySelector('.active-project-tasks').innerHTML = '';
  }

  static loadProjects() {
    Storage.getTodoList()
      .getProjects()
      .forEach((project) => {
        UI.createProject(project.name);
      });
    UI.projectTasks();
    UI.deleteProject();
  }

  static projectTasks() {
    document.querySelectorAll('.named-project-list').forEach((project) => {
      project.addEventListener('click', (e) => {
        UI.loadTask(e.target.innerText);
      });
    });
  }

  static setMinDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0 so need to add 1 to make it 1!
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    document.getElementById('duedate').setAttribute('min', today);
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
    `;
    UI.clearProjectForm();
  }

  static loadTask(projectName) {
    UI.clearTaskList();
    document.querySelector('#add-task').style.display = 'block';
    const projectTitle = document.querySelector('.active-project-title');
    projectTitle.innerHTML = `<h5>${projectName}</h5>`;
    Storage.getTodoList()
      .getProject(projectName)
      .getTasks().forEach((task) => {
        UI.addTask(task);
      });
    UI.collapsible();
    UI.clearTaskForm();
    UI.deleteTask();
    UI.editTask();
    UI.completeTask();
  }

  static checked(value) {
    if (value.completed === true) {
      return 'checked';
    }
    return 'collapsible';
  }

  static createTask(task) {
    return `
    <div class='d-flex flex-column task-body mb-3'>
      <div class='d-flex align-items-center task-defaults ${UI.checked(task)}'>
        
        <div class="d-flex justify-content-between w-100" > 
        
          <div class="expand d-flex flex-row flex-grow-1">
          
            <div class="d-flex align-items-center">
              <i class="fas fa-landmark me-3"></i><span>${task.name}</span>
            </div>
            
            
          </div>
          <div class="d-flex align-items-center">
            <span class="m-3">priority: ${task.priority}</span>
            <i class="fas fa-edit edit-task ms-3"></i>
            <i class="far fa-trash-alt ms-3 delete-task"></i>
            <span class="ms-3">${task.dueDate}</span>
            <input class="ms-5 completed" type="checkbox" id="completed" name="completed" value="completed" ${task.completedTask()}>
          </div>
      
        </div>
      </div>
      <div class="content">
        <div class="card card-body">
          ${task.description}
        </div>
      </div>
    </div>
  `;
  }

  static collapsible() {
    const coll = document.getElementsByClassName('expand');

    for (let i = 0; i < coll.length; i += 1) {
      coll[i].addEventListener('click', function () {
        this.parentElement.parentElement.classList.toggle('active');
        const content = this.parentElement.parentElement.nextElementSibling;
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      });
    }
  }

  static editTask() {
    const editTaskIcon = document.querySelectorAll('.edit-task');

    for (let i = 0; i < editTaskIcon.length; i += 1) {
      editTaskIcon[i].addEventListener('click', function () {
        const taskTE = this.parentElement.previousElementSibling.children[0].children[1].innerText;
        const taskEditForm = new Modal(document.getElementById('exampleModal'), {
          keyboard: false,
        });
        const projectOfTask = document.querySelector('.active-project-title h5').innerText;
        const task = Storage.getTask(projectOfTask, taskTE);

        document.querySelector('#title').placeholder = task.name;
        document.querySelector('#title').value = task.name;
        document.querySelector('#task-description').value = task.description;
        document.querySelector('#duedate').value = task.dueDate;
        document.querySelector('#task-priority').value = task.priority;

        taskEditForm.show();
      });
    }
  }

  static deleteTask() {
    const deleteTaskIcon = document.querySelectorAll('.delete-task');

    for (let i = 0; i < deleteTaskIcon.length; i += 1) {
      deleteTaskIcon[i].addEventListener('click', function () {
        const taskTD = this.parentElement.previousElementSibling.children[0].children[1].innerText;
        const projectOfTask = document.querySelector('.active-project-title h5').innerText;
        Storage.deleteTask(projectOfTask, taskTD);
        this.closest('.task-body').remove();
      });
    }
  }

  static completeTask() {
    const taskCheckbox = document.querySelectorAll('.completed');

    for (let i = 0; i < taskCheckbox.length; i += 1) {
      taskCheckbox[i].addEventListener('change', function () {
        const taskTC = this.parentElement.previousElementSibling.children[0].children[1].innerText;
        const projectOfTask = document.querySelector('.active-project-title h5').innerText;
        Storage.changeTaskCompletion(projectOfTask, taskTC, this.checked);
        UI.loadTask(projectOfTask);
      });
    }
  }

  static loadTimelyList() {

  }

  static createSpecialTask(task) {
    return `
    <div class='d-flex flex-column task-body mb-3'>
      <div class='d-flex align-items-center task-defaults ${UI.checked(task)}'>
        
        <div class="d-flex justify-content-between w-100" > 
        
          <div class="expand d-flex flex-row flex-grow-1">
          
            <div class="d-flex align-items-center">
              <i class="fas fa-landmark me-3"></i><span>${task.name}</span>
            </div>
            
            
          </div>
          <div class="d-flex align-items-center">
            <span class="m-3">priority: ${task.priority}</span>
            <i class="fas fa-edit edit-task ms-3"></i>
            <i class="far fa-trash-alt ms-3 delete-task"></i>
            <span class="ms-3">${task.dueDate}</span>
            <input class="ms-5 completed" type="checkbox" id="completed" name="completed" value="completed" ${task.completedTask()} disabled>
          </div>
      
        </div>
      </div>
      <div class="content">
        <div class="card card-body">
          ${task.description}
        </div>
      </div>
    </div>
  `;
  }

  static addSpecialTask(task) {
    const taskList = document.querySelector('.active-project-tasks');
    taskList.innerHTML += UI.createSpecialTask(task);
  }

  static loadTodayTasks() {
    document.querySelector('#add-task').style.display = 'none';
    UI.clearTaskList();
    document.querySelector('.active-project-title').innerHTML = '<h5>Today\'s tasks</h5>';
    Storage.allTaskToday().forEach((task) => {
      UI.addSpecialTask(task);
    });

    UI.collapsible();
  }

  static loadThisWeekTasks() {
    document.querySelector('#add-task').style.display = 'none';
    UI.clearTaskList();
    document.querySelector('.active-project-title').innerHTML = '<h5>This Week tasks</h5>';
    Storage.allTaskThisWeek().forEach((task) => {
      UI.addSpecialTask(task);
    });

    UI.collapsible();
  }

  static loadThisMonthTasks() {
    document.querySelector('#add-task').style.display = 'none';
    UI.clearTaskList();
    document.querySelector('.active-project-title').innerHTML = '<h5>This Month tasks</h5>';
    Storage.allTaskThisMonth().forEach((task) => {
      UI.addSpecialTask(task);
    });

    UI.collapsible();
  }

  static addTask(task) {
    const taskList = document.querySelector('.active-project-tasks');
    taskList.innerHTML += UI.createTask(task);
  }

  static deleteProject() {
    const deleteIcon = document.getElementsByClassName('delete-project');

    for (let i = 0; i < deleteIcon.length; i += 1) {
      deleteIcon[i].addEventListener('click', function () {
        const projectToDelete = this.parentElement.previousElementSibling.children[1].innerText;
        const projectTasks = document.querySelector('.active-project-title h5').innerText;

        Storage.deleteProject(projectToDelete);
        if (projectTasks === projectToDelete) {
          UI.clearTaskList();
        }
        document.querySelector('#add-task').style.display = 'none';
        document.querySelector('.active-project-title').innerHTML = '<h5>Select a Project to view the tasks in it</h5>';
        UI.clearProjectList();
        UI.loadProjects();
      });
    }
  }

  static errorMessageProject(xyz) {
    const error = document.getElementById('projectError');
    if (Storage.getProject(xyz) !== -1) {
      // Changing content and color of content
      error.textContent = 'A Project with that name already exists';
      error.style.color = 'red';
    }
  }

  static errorMessageTask(project, taskName) {
    const error = document.getElementById('taskError');
    if (Storage.getTask(project, taskName) !== undefined) {
      error.textContent = 'A task within this project already has that name ';
      error.style.color = 'red';
    }
  }
}
