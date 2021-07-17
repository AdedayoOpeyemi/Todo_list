import Storage from '../src/storage';

beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(() => '{"projects":[{"name":"GENERAL TASKS","tasks":[{"name":"Welcome to Tikky","description":"Thanks for trying out the App, I hope it helps you to achieve your task planning and monitoring goals","dueDate":"2021-06-06","priority":"low","completed":false}]},{"name":"TEST PROJECT","tasks":[]}]}'),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock;
});

it('Expect setItem to have been called once', () => {
  const testTodo = { testTodo: 'testTodo' };
  Storage.saveTodoList(testTodo);
  expect(localStorage.setItem).toHaveBeenCalled();
});

it('Expect getItem to have been called once', () => {
  Storage.getTodoList();
  expect(localStorage.getItem).toHaveBeenCalled();
});

it('Expect getItem and setItem to have been called once eac', () => {
  expect.assertions(2);
  Storage.deleteProject('projectName');
  expect(localStorage.getItem).toHaveBeenCalled();
  expect(localStorage.setItem).toHaveBeenCalled();
});

it('Expect getItem and setItem to have been called once each on getProject', () => {
  Storage.getProject('projectName');
  expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledTimes(0);
});

it('Expect getItem and setItem to have been called on allTaskThisMonth', () => {
  const tasks = Storage.allTaskThisWeek();
  expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  expect(Array.isArray(Storage.allTaskThisMonth())).toBe(true);
});

it('Expect getItem and setItem to have been called on allTaskThisMonth', () => {
  expect.assertions(3);
  const tasks = Storage.allTaskThisMonth();
  expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  expect(Array.isArray(Storage.allTaskThisMonth())).toBe(true);
});

it('Expect allTaskThisMonth to return Array', () => {
  expect(Array.isArray(Storage.allTaskThisMonth())).toBe(true);
});

it('Expect allTask() to return Array', () => {
  expect(Array.isArray(Storage.allTask())).toBe(true);
});
