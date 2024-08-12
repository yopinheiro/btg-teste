// src/components/EditTaskDialog.jsx

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const EditTaskDialog = ({ open, task, onSave, onCancel }) => {
  const [updatedTask, setUpdatedTask] = useState({ descricao: '', tipo: '' });

  useEffect(() => {
    if (task) {
      setUpdatedTask({ descricao: task.descricao, tipo: task.tipo });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      ...task,
      descricao: updatedTask.descricao,
      tipo: updatedTask.tipo,
    });
  };
  

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Editar Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          name="descricao"
          label="Descrição"
          value={updatedTask.descricao || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo</InputLabel>
          <Select
            name="tipo"
            value={updatedTask.tipo || ''}
            onChange={handleChange}
            label="Tipo"
          >
            <MenuItem value="pessoal">Pessoal</MenuItem>
            <MenuItem value="trabalho">Trabalho</MenuItem>
            <MenuItem value="escola">Escola</MenuItem>
            {/* Adicione mais opções conforme necessário */}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">Fechar</Button>
        <Button onClick={handleSave} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
