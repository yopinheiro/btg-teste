// src/components/TaskFilters.jsx
import React from "react";
import { TextField, Button, Grid } from "@mui/material";

const TaskFilters = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Pesquisar Tarefa"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="space-between">
        <Button
          sx={{ fontSize: "12px", mr: "4px" }}
          variant="contained"
          onClick={() => setFilter("all")}
        >
          Todas
        </Button>
        <Button
          sx={{ fontSize: "12px", mr: "4px" }}
          color="success"
          variant="contained"
          onClick={() => setFilter("completed")}
        >
          Concluídas
        </Button>
        <Button
          sx={{ fontSize: "12px", mr: "4px" }}
          color="inherit"
          variant="contained"
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskFilters;
