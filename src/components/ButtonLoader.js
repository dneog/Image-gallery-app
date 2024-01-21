import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ButtonLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: "center", padding: '2.6px' }}>
      <CircularProgress size={22}  color="inherit" className='text-center' />
    </Box>
  );
}