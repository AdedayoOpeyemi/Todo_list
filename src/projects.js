class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  set name(newName) {
    this.name = newName;
  }

  get name() {
    return this.name;
  }

  addTask(taskObj) {
    this.tasks.push(taskObj)
  }

  deleteTask(taskObj) {
    const indexOfTask = this.tasks.findIndex((task) => task.name == taskObj.name);
    this.tasks.splice(indexOfTask, 1);
  }
}