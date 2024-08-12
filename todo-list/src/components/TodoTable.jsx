// src/components/TodoTable.jsx

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { saveTasksToLocalStorage, saveCompletedTasksToSessionStorage } from '../services/storageService';
import EditTaskDialog from './EditTaskDialog'; // Importe o novo componente

const TodoTable = ({ tasks, onDelete, onToggle, onUpdate }) => {
  const [sortedTasks, setSortedTasks] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('descricao');
  const [editTask, setEditTask] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const sortedArray = [...tasks].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedTasks(sortedArray);

    // Salvar tarefas no localStorage e tarefas concluídas no sessionStorage
    const incompleteTasks = tasks.filter((task) => !task.concluida);
    const completedTasks = tasks.filter((task) => task.concluida);

    saveTasksToLocalStorage(incompleteTasks);
    saveCompletedTasksToSessionStorage(completedTasks);
  }, [tasks, order, orderBy]);

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setOpenEditDialog(true);
  };

  const handleEditSave = (updatedTask) => {
    onUpdate(updatedTask);
    setOpenEditDialog(false);
    setEditTask(null);
  };
  

  const handleEditCancel = () => {
    setOpenEditDialog(false);
    setEditTask(null);
  };

  const handleClickOpenDelete = (taskId) => {
    setTaskToDelete(taskId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = () => {
    onDelete(taskToDelete);
    handleCloseDelete();
  };

  const handleTaskToggle = (taskId) => {
    onToggle(taskId);
    setSnackbarOpen(true); // Exibir feedback ao concluir tarefa
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'descricao'}
                  direction={orderBy === 'descricao' ? order : 'asc'}
                  onClick={() => handleRequestSort('descricao')}
                >
                  Descrição
                </TableSortLabel>
              </TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTasks.map((task, index) => (
              <TableRow
                key={task.id}
                sx={{
                  backgroundColor: task.concluida
                    ? 'lightgreen'
                    : index % 2 === 0
                    ? '#f5f5f5'
                    : '#ffffff',
                  color: task.concluida ? '#ffffff' : '#000000',
                }}
              >
                <TableCell>{task.descricao}</TableCell>
                <TableCell>{capitalizeFirstLetter(task.tipo)}</TableCell>
                <TableCell>
                  {!task.concluida && (
                    <>
                      <IconButton onClick={() => handleTaskToggle(task.id)}>
                        {task.concluida ? <CheckIcon color="success" /> : <CheckIcon color="action" />}
                      </IconButton>
                      <IconButton onClick={() => handleEditClick(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleClickOpenDelete(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleCloseDelete}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Fechar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <EditTaskDialog
        open={openEditDialog}
        task={editTask}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Tarefa concluída com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};


export default TodoTable;
