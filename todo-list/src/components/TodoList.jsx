// src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';
import List from '@mui/material/List';

const TodoList = ({ tasks = [], onDelete, onToggle }) => {
  if (!Array.isArray(tasks)) {
    console.error('Tasks should be an array');
    return null;
  }

  return (
    <List>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </List>
  );
};

export default TodoList;
