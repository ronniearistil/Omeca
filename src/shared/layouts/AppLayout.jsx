import React from 'react';
import { Box, Container } from '@mui/material';

export default function AppLayout({ children, fullWidth = false }) {
  
  if (fullWidth) {
    // Returns a clean box with NO padding and NO max-width
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    );
  }

  // Standard layout for internal dashboard pages
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 2, md: 4 } }}>
        {children}
      </Container>
    </Box>
  );
}
