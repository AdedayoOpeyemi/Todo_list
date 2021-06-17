export default class Task {
  constructor(name, description = 'No description given', dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDescription(description) {
    this.description = description;
  }

  updateTask(name, description, duedate, priority, completed) {
    this.description = description;
    this.dueDate = duedate;
    this.priority = priority;
    this.completed = completed;
    this.name = name;
  }

  completedTask() {
    if (this.completed == true) {
      return "checked"
    }
  }

  // set name(newName) {
  //   this.name = newName;
  // }

  // get name() {
  //   return this.name;
  // }

  // set description (newDescription) {
  //   this.description = newDescription;
  // }

  // get description() {
  //   return this.description;
  // }

  // set dueDate(newDueDate) {
  //   this.dueDate = newDueDate;
  // }

  // get dueDate() {
  //   return this.dueDate;
  // }

  toggleCompletion(newStatus) {
    this.completed = newStatus;
  }
}