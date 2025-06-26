import { getProjects, saveProjectsToStorage, addProject } from './modules/storage';
import createTodo from './modules/todo';
import createProject from './modules/project';
import { formatDate } from './modules/utils';

let selectedIndex = 0;

export function initApp() {
  renderSidebar();
  renderProject();
}

function renderSidebar() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');

  const heading = document.createElement('h2');
  heading.textContent = 'Projects';

  const ul = document.createElement('ul');
  getProjects().forEach((project, index) => {
    const li = document.createElement('li');
    li.textContent = project.name;
    if (index === selectedIndex) li.classList.add('active');
    li.addEventListener('click', () => {
      selectedIndex = index;
      initApp();
    });
    ul.appendChild(li);
  });

  const input = document.createElement('input');
  input.placeholder = 'New project name';
  const btn = document.createElement('button');
  btn.textContent = 'Add Project';
  btn.onclick = () => {
    if (!input.value.trim()) return;
    addProject(createProject(input.value.trim()));
    input.value = '';
    selectedIndex = getProjects().length - 1;
    initApp();
  };

  sidebar.append(heading, ul, input, btn);
  app.appendChild(sidebar);
}

function renderProject() {
  const content = document.createElement('div');
  content.classList.add('content');

  const project = getProjects()[selectedIndex];

  const title = document.createElement('h2');
  title.textContent = project.name;
  content.appendChild(title);

  project.todos.forEach((todo, index) => {
    const div = document.createElement('div');
    div.classList.add('todo', todo.priority);

    div.innerHTML = `
      <strong>${todo.title}</strong> - ${formatDate(todo.dueDate)}<br/>
      <em>${todo.description}</em><br/>
      <button data-index="${index}">Delete</button>
    `;

    div.querySelector('button').onclick = () => {
      project.removeTodo(index);
      saveProjectsToStorage();
      initApp();
    };

    content.appendChild(div);
  });

  // Todo form
  const form = document.createElement('form');
  form.classList.add('todo-form');

  const titleInput = document.createElement('input');
  titleInput.placeholder = 'Title';
  titleInput.required = true;

  const descInput = document.createElement('input');
  descInput.placeholder = 'Description';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.required = true;

  const prioritySelect = document.createElement('select');
  ['low', 'medium', 'high'].forEach(level => {
    const opt = document.createElement('option');
    opt.value = level;
    opt.textContent = level;
    prioritySelect.appendChild(opt);
  });

  const submit = document.createElement('button');
  submit.textContent = 'Add Todo';
  submit.type = 'submit';

  form.append(titleInput, descInput, dateInput, prioritySelect, submit);
  form.onsubmit = e => {
    e.preventDefault();
    project.addTodo(createTodo(titleInput.value, descInput.value, dateInput.value, prioritySelect.value));
    saveProjectsToStorage();
    initApp();
  };

  content.appendChild(form);
  document.getElementById('app').appendChild(content);
}
