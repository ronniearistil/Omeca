import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Box, CircularProgress } from '@mui/material';
import { auth } from '../lib/firebase.js'; // Confirmed relative path from src/auth/ to src/lib/

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for auth status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0B0F17' }}>
        <CircularProgress sx={{ color: '#00E5BE' }} />
      </Box>
    );
  }

  if (!user) {
    // Redirect unauthenticated users to login
    return <Navigate to="/partner-login" replace />;
  }

  // If user is authenticated, render the page
  return children;
};

export default ProtectedRoute;