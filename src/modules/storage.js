import createProject from './project';
import createTodo from './todo';

let projects = [];

export function loadProjectsFromStorage() {
  const data = localStorage.getItem('todo-projects');
  if (data) {
    try {
      const raw = JSON.parse(data);
      projects = raw.map(p => {
        const proj = createProject(p.name);
        p.todos.forEach(t => proj.addTodo(createTodo(t.title, t.description, t.dueDate, t.priority)));
        return proj;
      });
    } catch {
      projects = [createProject('Default')];
    }
  } else {
    const defaultProject = createProject('Default');
    defaultProject.addTodo(createTodo('Sample', 'A starter task', new Date().toISOString(), 'medium'));
    projects.push(defaultProject);
    saveProjectsToStorage();
  }
}

export function saveProjectsToStorage() {
  localStorage.setItem('todo-projects', JSON.stringify(projects));
}

export function getProjects() {
  return projects;
}

export function addProject(project) {
  projects.push(project);
  saveProjectsToStorage();
}
