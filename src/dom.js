import { getProjects } from './modules/storage';

export function initApp() {
  renderProjects();
}

function renderProjects() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const projects = getProjects();
  projects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.textContent = project.name;
    app.appendChild(projectDiv);
  });
}
