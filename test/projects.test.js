import Project from "../src/projects";
import Task from "../src/task";

const newProject = new Project("Renovation");

beforeEach(() => {
  newProject
});

afterEach(() => {
  newProject.setTasks([])
});

// Testing for type of
it('It should create a new object when called with new', () => {
  expect(newProject && typeof newProject === 'object').toBe(true)
});

//Testing for instance of class
it('It should create a new object when called with new', () => {
  expect(newProject).toBeInstanceOf(Project)
});

//Testing the getName method
it('It should return the name of project', () => {
  expect(newProject.getName()).toBe("Renovation")
});

//Testing that it returns an array
it('It should return an array', () => {
  expect(Array.isArray(newProject.getTasks())).toBe(true)
})

//Testing that it contains a task after the task is added
it('It takes a task object', () => {
  const newtask = new Task("shopping", "Testing new task", new Date("2012-12-12"), "high")
  newProject.addTask(newtask)
  expect(newProject.getTasks()).toEqual(expect.arrayContaining([newtask]))
})

//It returns a task 
it('It takes a task object', () => {
  const newtask = new Task("driving", "Testing new task", new Date("2012-12-12"), "high")
  newProject.addTask(newtask)
  const calledTask = newProject.getTask("driving")
  expect(calledTask).toEqual(newtask)
})

//It delete tasks
it('It takes a task object', () => {
  const newtask = new Task("shopping", "Testing new task", new Date("2012-12-12"), "high")
  newProject.addTask(newtask)
  newProject.deleteTask(newtask)
  expect(newProject.getTasks()).not.toEqual(expect.arrayContaining([newtask]))
})






