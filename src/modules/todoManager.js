import createTodo from './todo';
import { saveProjectsToStorage } from './storage';

export function createAndAddTodo(project, title, desc, date, priority) {
  const todo = createTodo(title, desc, date, priority);
  project.addTodo(todo);
  saveProjectsToStorage();
}

export function deleteTodo(project, index) {
  project.removeTodo(index);
  saveProjectsToStorage();
}
