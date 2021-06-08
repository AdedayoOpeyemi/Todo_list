import Project from './projects';

export default class TodoList {
  constructor() {
    this.projects = [];
  }

  addProject(newProject) {
    if (this.projects.indexOf(newProject) > 0) return;
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