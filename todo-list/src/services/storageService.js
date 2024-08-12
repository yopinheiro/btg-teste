// src/services/storage.js

const COMPLETED_TASKS_KEY = 'completedTasks';
const TASKS_KEY = 'tasks';

/**
 * Salva tarefas concluídas no sessionStorage.
 * @param {Array} tasks - Tarefas concluídas.
 */
export const saveCompletedTasksToSessionStorage = (tasks) => {
  sessionStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(tasks));
};

/**
 * Recupera tarefas concluídas do sessionStorage.
 * @returns {Array} - Tarefas concluídas.
 */
export const getCompletedTasksFromSessionStorage = () => {
  const tasks = sessionStorage.getItem(COMPLETED_TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

/**
 * Salva todas as tarefas no localStorage.
 * @param {Array} tasks - Todas as tarefas.
 */
export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

/**
 * Recupera todas as tarefas do localStorage.
 * @returns {Array} - Todas as tarefas.
 */
export const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};
