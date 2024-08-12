import React, { useState, forwardRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { InputLabel, FormControl, Grid, FormHelperText } from "@mui/material";

const AddTask = forwardRef(({ onAdd }, ref) => {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(false);
  const [descricaoError, setDescricaoError] = useState(false);
  const [tipoError, setTipoError] = useState(false);

  const handleAddTask = () => {
    const isDescricaoEmpty = descricao.trim() === "";
    const isTipoEmpty = tipo.trim() === "";

    setDescricaoError(isDescricaoEmpty);
    setTipoError(isTipoEmpty);

    if (isDescricaoEmpty || isTipoEmpty) return;

    setLoading(true);
    setTimeout(() => {
      onAdd({ descricao, tipo });
      setDescricao("");
      setTipo("");
      setLoading(false);
    }, 500); // Simula um atraso de 500ms
  };

  return (
    <Box ref={ref} sx={{ flexGrow: 1, marginBottom: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Nova Tarefa"
            variant="outlined"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            error={descricaoError}
            helperText={descricaoError ? "Descrição é obrigatória." : ""}
            sx={{ minHeight: 70 }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth error={tipoError} sx={{ minHeight: 70 }}>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Tipo" }}
            >
              <MenuItem value="">
                <em>Tipo</em>
              </MenuItem>
              <MenuItem value="pessoal">Pessoal</MenuItem>
              <MenuItem value="trabalho">Trabalho</MenuItem>
              <MenuItem value="escola">Escola</MenuItem>
              {/* Adicione mais opções conforme necessário */}
            </Select>
            {tipoError && (
              <FormHelperText>Tipo é obrigatório.</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            disabled={loading}
            sx={{ minHeight: 56, padding: '10px', margin: '0px 0px 14px 0px' }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Adicionar Tarefa"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
});

export default AddTask;
