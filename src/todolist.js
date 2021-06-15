import Project from './projects';

export default class TodoList {
  constructor() {
    this.projects = [];
  }

  addProject(newProject) {
    console.log(this.projects.indexOf(newProject))
    if (this.projects.indexOf(newProject) < 0) 
    {  this.projects.push(newProject);
      return
    };
    
  }

  deleteProject(projectName) {
    const indexOfProject = this.projects.findIndex((project) => project.name == projectName);
    this.projects.splice(indexOfProject, 1);
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

  alreadyExists(projectName) {
    return this.projects.some((project) => project.getName() === projectName);
  }


}