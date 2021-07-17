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

  updateTask(name, description, duedate, priority) {
    this.description = description;
    this.dueDate = duedate;
    this.priority = priority;
    this.name = name;
  }

  completedTask() {
    if (this.completed === true) {
      return 'checked';
    }
  }

  toggleCompletion(newStatus) {
    this.completed = newStatus;
  }
}