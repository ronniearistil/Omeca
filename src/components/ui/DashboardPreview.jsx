// src/Melucra/components/ui/DashboardPreview.jsx
// 
// import React, { useContext } from 'react';
// import { Box, Paper, Typography, Grid, Button } from '@mui/material';
// import { motion } from 'framer-motion';
// import TrendingUp from '@mui/icons-material/TrendingUp';
// import { ColorModeContext } from '../theme/ThemeContext';
// import { colors } from '../theme/theme';
// 
// // Helper component nested inside DashboardPreview.jsx
// const SimpleGraphLine = ({ color, points }) => (
//   <svg viewBox="0 0 100 20" style={{ width: '100%', height: '50px' }}>
//     <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
//   </svg>
// );
// src/components/ui/DashboardPreview.jsx

import React, { useContext } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUp from '@mui/icons-material/TrendingUp';

// --- FIXED THEME IMPORTS ---
import { ColorModeContext } from '../../layouts/theme/ThemeContext.jsx';
import { colors } from '../../layouts/theme/theme.js';

// Helper component nested inside DashboardPreview.jsx
const SimpleGraphLine = ({ color, points }) => (
  <svg viewBox="0 0 100 20" style={{ width: '100%', height: '50px' }}>
    <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
  </svg>
);


const DashboardPreview = () => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];
    
    const statItems = [
        { label: 'Validated Events', value: '45.2M', trend: '+12%', color: colors.accent },
        { label: 'Forecast Margin', value: '$1.4M', trend: '+18%', color: colors.accent },
        { label: 'Reconciliation Lag', value: '3.5s', trend: '-0.2s', color: colors.lucraGold },
        { label: 'Profit Alert Count', value: '7', trend: 'Critical', color: colors.lucraGold },
    ];

    return (
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.1 }}>
            <Paper elevation={0} sx={{
                bgcolor: currentColors.card, p: 3, borderRadius: 3, border: `1px solid ${colors.accent}44`, maxWidth: '1200px', mx: 'auto', mt: 6,
                boxShadow: mode === 'dark' ? `0 0 30px rgba(0, 0, 0, 0.4), 0 0 10px ${colors.accent}22` : '0 4px 20px rgba(0,0,0,0.1)',
                color: currentColors.textPrimary,
            }}>
                {/* Tabs */}
                <Box sx={{ display: 'flex', borderBottom: `1px solid ${currentColors.textDim}22`, mb: 3 }}>
                    {['Overview', 'Ledger', 'Reconciliation', 'Alerts'].map((tab) => (
                        <Button key={tab} sx={{ color: tab === 'Overview' ? colors.accent : currentColors.textDim, borderBottom: tab === 'Overview' ? '2px solid' : 'none', borderColor: colors.accent, borderRadius: 0, textTransform: 'none', fontWeight: tab === 'Overview' ? 700 : 400, mr: 3, py: 1, }}>
                            {tab}
                        </Button>
                    ))}
                </Box>
                {/* Stats Grid */}
                <Grid container spacing={3}>
                    {statItems.map((item, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Box sx={{ pr: index < 3 ? 3 : 0, borderRight: index < 3 && mode === 'dark' ? `1px solid ${colors.dark.textDim}22` : 'none' }}>
                                <Typography variant="body2" color={currentColors.textDim}>{item.label}</Typography>
                                <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, color: item.color }}>{item.value}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <TrendingUp sx={{ fontSize: 16, color: item.color }} />
                                    <Typography variant="caption" sx={{ ml: 0.5, color: item.color, fontWeight: 500 }}>{item.trend}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {/* Simulated Graph */}
                <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${currentColors.textDim}22` }}>
                    <Typography variant="h6" fontWeight={500} gutterBottom>Usage vs. Revenue Trend</Typography>
                    <SimpleGraphLine color={colors.lucraGold} points="0,18 10,12 20,8 30,10 40,6 50,4 60,6 70,8 80,10 90,12 100,15" />
                    <SimpleGraphLine color={colors.accent} points="0,15 10,10 20,13 30,16 40,14 50,11 60,9 70,12 80,14 90,17 100,19" />
                </Box>
            </Paper>
        </motion.div>
    );
};

export default DashboardPreview;