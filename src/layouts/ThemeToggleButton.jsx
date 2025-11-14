// src/Melucra/components/layout/ThemeToggleButton.jsx

import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import { ColorModeContext } from './theme/ThemeContext';

const ThemeToggleButton = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <IconButton onClick={toggleColorMode} color="inherit" sx={{ 
        color: mode === 'dark' ? '#FFFFFF' : '#000000', 
        transition: 'color 0.3s' 
    }}>
      {mode === 'dark' ? <WbSunnyRoundedIcon /> : <NightsStayRoundedIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;