import createProject from './project';

let projects = [];

export function loadProjectsFromStorage() {
  const stored = localStorage.getItem('todo-projects');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      projects = parsed.map(p => {
        const project = createProject(p.name);
        p.todos.forEach(todo => project.addTodo(todo));
        return project;
      });
    } catch (err) {
      console.error('Failed to load from localStorage', err);
    }
  } else {
    // Create default project if none found
    const defaultProject = createProject('Default');
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
