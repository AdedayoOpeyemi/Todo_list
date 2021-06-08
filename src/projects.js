export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  // set projectname(name) {
  //   this.name = name;
  // }

  // get name() {
  //   return this.name;
  // }

  getName() {
    return this.name;
  }

  addTask(taskObj) {
    this.tasks.push(taskObj)
  }

  deleteTask(taskObj) {
    const indexOfTask = this.tasks.findIndex((task) => task.name == taskObj.name);
    this.tasks.splice(indexOfTask, 1);
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTask(taskName) {
    return this.tasks.find((task) => task.getName() === taskName);
  }

}