import Project from './projects';
import isToday from 'date-fns/isToday';
import isThisWeek from 'date-fns/isThisWeek';
import isThisMonth from 'date-fns/isThisMonth';
import parseISO from 'date-fns/parseISO';

export default class TodoList {
  constructor() {
    this.projects = [];
  }

  addProject(newProject) {
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

  allTasks() {
    const tasks = []
    this.getProjects().forEach((project)  => {
      project.getTasks().forEach(task => tasks.push(task))
    })
    return tasks
  }

  todayTasks() {
    return this.allTasks().filter((task) => isToday(parseISO(task.dueDate)));
  }

  currentWeekTasks() {
    return this.allTasks().filter((task) => isThisWeek(parseISO(task.dueDate)));
  }

  currentMonthTasks() {
    return this.allTasks().filter((task) => isThisMonth(parseISO(task.dueDate)));
  }

}