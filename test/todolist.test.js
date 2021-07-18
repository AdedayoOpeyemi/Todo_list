import Project from '../src/modules/projects';
import TodoList from '../src/modules/todolist';
import Task from '../src/modules/task';

const testTodo = new TodoList();

beforeEach(() => {
  testTodo.projects = [];
});

afterEach(() => {
  testTodo.projects = [];
});

it('It should create a new object when called with new', () => {
  expect(testTodo).toBeInstanceOf(TodoList);
});

it('It should create a new object when called with new', () => {
  expect(testTodo && typeof testTodo === 'object').toBe(true);
});

it('It should add a project to its list of projects', () => {
  const testProject = new Project('Jest-work');
  testTodo.addProject(testProject);
  expect(testTodo.getProjects()).toEqual(expect.arrayContaining([testProject]));
});

it('It should add a project to its list of projects', () => {
  const testProject = new Project('Jest-work');
  testTodo.addProject(testProject);
  const testAdd = testTodo.addProject(testProject);
  expect(testAdd).toBe(undefined);
});

// Testing that it returns an array
it('It should return an array', () => {
  expect(Array.isArray(testTodo.getProjects())).toBe(true);
});

it('it should return a project when the project name is passed in', () => {
  const testProject = new Project('Jest-work-project');
  testTodo.addProject(testProject);
  expect(testTodo.getProject('Jest-work-project')).toEqual(
    {
      name: 'Jest-work-project',
      tasks: [],
    },
  );
});

it('It should return true that a project with that name already exists', () => {
  const testProject = new Project('Jest-work-project');
  testTodo.addProject(testProject);
  expect(testTodo.alreadyExists('Jest-work-project')).toBe(true);
});

it('It should delete a project using the name provided', () => {
  const testProject = new Project('Jest-work-project');
  testTodo.addProject(testProject);
  expect(testTodo.alreadyExists('Jest-work-project')).toBe(true);
  testTodo.deleteProject('Jest-work-project');
  expect(testTodo.alreadyExists('Jest-work-project')).toBe(false);
});

it('It should return false that a project with that name does not exists', () => {
  const testTodoV1 = new TodoList();
  expect(testTodoV1.alreadyExists('Jest-work-project')).toBe(false);
});

it('SHould return and array of all tasks in the todolist', () => {
  expect(Array.isArray(testTodo.allTasks())).toBe(true);
});

it('Expect 0 tasks in a newly created TodoList', () => {
  expect(testTodo.allTasks()).toHaveLength(0);
});

it('Should return and array that contains added task', () => {
  const newtask = new Task('shopping', 'Testing new task', new Date('2012-12-12'), 'high');
  const newProject = new Project('Amazing-Project');
  newProject.addTask(newtask);
  testTodo.addProject(newProject);
  expect(testTodo.allTasks()).toEqual(expect.arrayContaining([newtask]));
});

it('Should return tasks for the day', () => {
  let today = new Date();
  const dd = today.getDate();
  let mm = today.getMonth() + 1;
  if (mm < 10) { mm = `0${mm}`; }
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  const newtask = new Task('shopping', 'Testing new task', new Date(today).toISOString(), 'high');
  const newProject = new Project('Amazing-Project');
  newProject.addTask(newtask);
  testTodo.addProject(newProject);
  expect(testTodo.todayTasks()).toEqual(expect.arrayContaining([newtask]));
});

it('Should return task for the week', () => {
  let today = new Date();
  const rnday = Math.floor(Math.random() * 28) + 1;
  const dd = rnday;
  let mm = today.getMonth() + 1;
  if (mm < 10) { mm = `0${mm}`; }
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  const newtask = new Task('shopping', 'Testing new task', new Date(today).toISOString(), 'high');
  const newProject = new Project('Amazing-Project');
  newProject.addTask(newtask);
  testTodo.addProject(newProject);
  expect(testTodo.currentMonthTasks()).toEqual(expect.arrayContaining([newtask]));
});
