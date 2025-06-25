import './style.css';
import { initApp } from './dom';
import { loadProjectsFromStorage } from './modules/storage';

document.addEventListener('DOMContentLoaded', () => {
  loadProjectsFromStorage();
  initApp();
});
