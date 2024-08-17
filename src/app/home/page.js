import React from 'react';
import { Button, Typography, Paper } from '@mui/material';

const TestTheme = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Primary Color Heading
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        Secondary Color Text
      </Typography>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="outlined" color="secondary" sx={{ marginLeft: 2 }}>
        Secondary Button
      </Button>
    </Paper>
  );
};

export default TestTheme;
