// src/layouts/AppLayout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';

export default function AppLayout({ children }) {
  // Drop your Navbar/Footer here when ready
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* <Navbar /> */}
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 2, md: 4 } }}>
        {children}
      </Container>
      {/* <Footer /> */}
    </Box>
  );
}
