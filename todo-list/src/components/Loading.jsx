// src/components/Loading.jsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ label }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <CircularProgress />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default Loading;
