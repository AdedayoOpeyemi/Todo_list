import Project from './projects';
import Storage from './storage'

export default class UI {
  
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

  static createProject(name) {
    const projectListDiv = document.querySelector('.named-project-list');
    projectListDiv.innerHTML += `
      <div class='d-flex align-items-center'>
         
        <button class="d-flex justify-content-between w-100"> 
        <div>
        <i class="far fa-calendar-minus me-3"></i><span> ${name}</span>
        </div>
        <div>
        <i class="far fa-trash-alt "></i>
        </div>
        
        </button>
        
      </div>
    `
  }

  statloadTask(project) {


  }
}