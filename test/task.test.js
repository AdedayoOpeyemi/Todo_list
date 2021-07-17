import Task from '../src/task';

const newtask = new Task('shopping', 'Testing new task', new Date('2012-12-12'), 'high');

// Testing for instance of class
it('It should create a new object when called with new', () => {
  expect(newtask).toBeInstanceOf(Task);
});

// Testing the typeof
it('It should create a new object when called with new', () => {
  expect(newtask && typeof newtask === 'object').toBe(true);
});

// Testing the constructor methods
it('The task name should be shopping', () => {
  expect(newtask.name).toBe('shopping');
});

// Testing the name method
it('The task name should change ', () => {
  newtask.setName('driving');
  expect(newtask.name).toBe('driving');
});

it('The task name should not be shopping', () => {
  newtask.setName('driving');
  expect(newtask.name).not.toBe('shopping');
});

// testing the description method
it('The task description should not be "Testing new task"', () => {
  newtask.setDescription('This is a new description');
  expect(newtask.description).not.toBe('Testing new task');
});

it('The task description should be "No description given"', () => {
  const testtask = new Task('shopping', undefined, new Date('2012-12-12'), 'high');
  expect(testtask.description).toBe('No description given');
});

it('The task description should be "This is a new description"', () => {
  newtask.setDescription('This is a new description');
  expect(newtask.description).toBe('This is a new description');
});

// Testing the dueDate method
it('The task dueDate to be 2012-12-12', () => {
  expect(newtask.dueDate).toEqual(new Date('2012-12-12'));
});

it('The task dueDate to not be 2012-12-12', () => {
  newtask.dueDate = new Date('2013-10-10');
  expect(newtask.dueDate).not.toEqual(new Date('2012-12-12'));
});

it('The task dueDate to be 2013-10-10', () => {
  newtask.dueDate = new Date('2013-10-10');
  expect(newtask.dueDate).toEqual(new Date('2013-10-10'));
});

// Testing the priority methods
it('The task priority should be high', () => {
  expect(newtask.priority).toBe('high');
});

it('The task priority should be high', () => {
  newtask.priority = 'medium';
  expect(newtask.priority).not.toBe('high');
});

it('The task priority should change to low', () => {
  newtask.priority = 'low';
  expect(newtask.priority).toBe('low');
});

// Testing the updateTask method
it('The task priority should change to low', () => {
  const testingDate = new Date('2012-06-10');
  newtask.updateTask('study', 'Study for my exams', new Date('2012-06-10'), 'high');
  expect(newtask).toEqual({
    name: 'study',
    description: 'Study for my exams',
    dueDate: testingDate,
    priority: 'high',
    completed: false,
  });
});

it('The task priority should change to low', () => {
  newtask.toggleCompletion(true);
  expect(newtask.completed).toBe(true);
});

it('The task priority should change to low', () => {
  newtask.toggleCompletion(false);
  expect(newtask.completed).toBe(false);
});

it('The task priority should change to low', () => {
  newtask.toggleCompletion(false);
  expect(newtask.completedTask()).toEqual(undefined);
});

it('The task priority should change to low', () => {
  newtask.toggleCompletion(true);
  expect(newtask.completedTask()).toEqual('checked');
});
