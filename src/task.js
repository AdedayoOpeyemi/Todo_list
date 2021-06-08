export default class Task {
  constructor(name, description = 'No description given', dueDate) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
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

  toggleCompletion(task) {
    task.completed = !task.completed;
  }

}