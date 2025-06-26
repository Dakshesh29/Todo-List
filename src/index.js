import './style.css';
import { loadProjectsFromStorage } from './modules/storage';
import { initApp } from './dom';

loadProjectsFromStorage();
initApp();
