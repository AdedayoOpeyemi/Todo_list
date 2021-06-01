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
      <div>
        <button class="">${name}</button>
      </div>
    `
  }

  static addProjectToUI(name) {
    
  }
}