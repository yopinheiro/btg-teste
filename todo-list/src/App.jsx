// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoTable from "./components/TodoTable";
import Loading from "./components/Loading";
import AddTask from "./components/AddTask";
import TaskFilters from "./components/TaskFilters";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
  getCompletedTasksFromSessionStorage,
  saveCompletedTasksToSessionStorage,
} from "./services/storageService";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 5000); 

    return () => clearTimeout(timer); // Limpar o timer ao desmontar o componente
  }, []);

  useEffect(() => {
    if (initialLoading) return;

    const loadTasks = async () => {
      setLoading(true);
      const localTasks = await getTasksFromLocalStorage();
      const completedTasks = await getCompletedTasksFromSessionStorage();
      const allTasks = [...localTasks, ...completedTasks];
      setTasks(allTasks);
      setLoading(false);
    };

    loadTasks();
  }, [initialLoading]);

  useEffect(() => {
    if (loading) return;

    const saveTasks = async () => {
      setLoading(true);
      await saveTasksToLocalStorage(tasks.filter((task) => !task.concluida));
      await saveCompletedTasksToSessionStorage(
        tasks.filter((task) => task.concluida)
      );
      setLoading(false);
    };

    saveTasks();
  }, [tasks]);

  const handleAddTask = (task) => {
    const newTaskObject = {
      id: Date.now(),
      descricao: task.descricao,
      tipo: task.tipo,
      concluida: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
  };

  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, concluida: !task.concluida } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.concluida;
    if (filter === "pending") return !task.concluida;
    return task.descricao.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lista de Tarefas
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ marginTop: "20px" }}>
        {initialLoading ? (
          <Loading label="Aguardando dados..." />
        ) : loading ? (
          <Loading label="Carregando tarefas..." />
        ) : (
          <>
            <AddTask onAdd={handleAddTask} />
            <TaskFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filter={filter}
              setFilter={setFilter}
            />
            <TodoTable
              tasks={filteredTasks}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default App;
