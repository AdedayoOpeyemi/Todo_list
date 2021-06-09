import Project from './projects';

export default class TodoList {
  constructor() {
    this.projects = [];
  }

  addProject(newProject) {
    console.log(this.projects.indexOf(newProject))
    if (this.projects.indexOf(newProject) < 0) 
    {  alert('Use a new project name')

    };
    this.projects.push(newProject);
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }


}