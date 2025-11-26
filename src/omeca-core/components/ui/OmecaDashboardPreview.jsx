// import React, { useContext } from 'react';
// import { Box, Paper, Typography, Grid, Button } from '@mui/material';
// import { motion } from 'framer-motion';
// import TrendingUp from '@mui/icons-material/TrendingUp';
// 
// // --- FIXED THEME IMPORTS ---
// import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
// import { colors } from '../../../shared/layouts/theme/theme.js';
// 
// // Helper component nested inside DashboardPreview.jsx
// const SimpleGraphLine = ({ color, points }) => (
//   <svg viewBox="0 0 100 20" style={{ width: '100%', height: '50px' }}>
//     <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
//   </svg>
// );
// 
// 
// const DashboardPreview = () => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
//     
//     const statItems = [
//         { label: 'Validated Events', value: '45.2M', trend: '+12%', color: colors.accent },
//         { label: 'Forecast Margin', value: '$1.4M', trend: '+18%', color: colors.accent },
//         { label: 'Reconciliation Lag', value: '3.5s', trend: '-0.2s', color: colors.lucraGold },
//         { label: 'Profit Alert Count', value: '7', trend: 'Critical', color: colors.lucraGold },
//     ];
// 
//     return (
//         <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.1 }}>
//             <Paper elevation={0} sx={{
//                 bgcolor: currentColors.card, p: 3, borderRadius: 3, border: `1px solid ${colors.accent}44`, maxWidth: '1200px', mx: 'auto', mt: 6,
//                 boxShadow: mode === 'dark' ? `0 0 30px rgba(0, 0, 0, 0.4), 0 0 10px ${colors.accent}22` : '0 4px 20px rgba(0,0,0,0.1)',
//                 color: currentColors.textPrimary,
//             }}>
//                 {/* Tabs */}
//                 <Box sx={{ display: 'flex', borderBottom: `1px solid ${currentColors.textDim}22`, mb: 3 }}>
//                     {['Overview', 'Ledger', 'Reconciliation', 'Alerts'].map((tab) => (
//                         <Button key={tab} sx={{ color: tab === 'Overview' ? colors.accent : currentColors.textDim, borderBottom: tab === 'Overview' ? '2px solid' : 'none', borderColor: colors.accent, borderRadius: 0, textTransform: 'none', fontWeight: tab === 'Overview' ? 700 : 400, mr: 3, py: 1, }}>
//                             {tab}
//                         </Button>
//                     ))}
//                 </Box>
//                 {/* Stats Grid */}
//                 <Grid container spacing={3}>
//                     {statItems.map((item, index) => (
//                         <Grid item xs={6} md={3} key={index}>
//                             <Box sx={{ pr: index < 3 ? 3 : 0, borderRight: index < 3 && mode === 'dark' ? `1px solid ${colors.dark.textDim}22` : 'none' }}>
//                                 <Typography variant="body2" color={currentColors.textDim}>{item.label}</Typography>
//                                 <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, color: item.color }}>{item.value}</Typography>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
//                                     <TrendingUp sx={{ fontSize: 16, color: item.color }} />
//                                     <Typography variant="caption" sx={{ ml: 0.5, color: item.color, fontWeight: 500 }}>{item.trend}</Typography>
//                                 </Box>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 {/* Simulated Graph */}
//                 <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${currentColors.textDim}22` }}>
//                     <Typography variant="h6" fontWeight={500} gutterBottom>Usage vs. Revenue Trend</Typography>
//                     <SimpleGraphLine color={colors.lucraGold} points="0,18 10,12 20,8 30,10 40,6 50,4 60,6 70,8 80,10 90,12 100,15" />
//                     <SimpleGraphLine color={colors.accent} points="0,15 10,10 20,13 30,16 40,14 50,11 60,9 70,12 80,14 90,17 100,19" />
//                 </Box>
//             </Paper>
//         </motion.div>
//     );
// };
// 
// export default DashboardPreview;

// src/components/ui/OmecaDashboardPreview.jsx

// src/components/ui/OmecaHomepagePreview.jsx
import React, { useContext, useState, useEffect } from "react";
import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../../../shared/layouts/theme/theme.js";
import { motion } from "framer-motion";

const OmecaHomepagePreview = ({ onExplore }) => {
  const { mode } = useContext(ColorModeContext);
  const palette = colors[mode];

  // --- LIVE METRICS (simulated) ---
  const [totalSpend, setTotalSpend] = useState(11.28);
  const [unaudited, setUnaudited] = useState(2.4);
  const [efficiency, setEfficiency] = useState(89.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSpend((v) => +(v + (Math.random() - 0.5) * 0.05).toFixed(2));
      setUnaudited((v) =>
        Math.max(0, +(v + (Math.random() - 0.5) * 0.3).toFixed(1))
      );
      setEfficiency((v) =>
        Math.max(70, Math.min(99, +(v + (Math.random() - 0.5) * 1.1).toFixed(1)))
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Formatters
  const fMoney = (v) => `$${v}M`;
  const fPercent = (v) => `${v}%`;

  const metrics = [
    {
      label: "Total Machine Spend",
      value: fMoney(totalSpend),
      trend: "+12.5% vs Last Period",
      color: colors.accent,
    },
    {
      label: "Unaudited Machine Spend",
      value: fPercent(unaudited),
      trend: "-4.2% Cost Overrun",
      color: colors.errorRed,
    },
    {
      label: "Mandated Assurance Score",
      value: "99.8%",
      trend: "+12.5% vs Last Period",
      color: colors.successGreen,
    },
    {
      label: "Efficiency Signals",
      value: fPercent(efficiency),
      trend: "+12.5% vs Last Period",
      color: colors.accent,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Paper
        elevation={0}
        sx={{
          // px: { xs: 2.5, md: 6 },
          // py: { xs: 3, md: 5 },
          px: { xs: 2, sm: 3, md: 5 },
py: { xs: 2.5, sm: 3.5, md: 5 },

          borderRadius: 3,
          background: palette.card,
          border: `1px solid ${palette.textDim}22`,
        }}
      >
        {/* HEADLINE */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 900,
            // mb: 4,
            mb: { xs: 3, md: 4 },
            color: palette.textPrimary,
          }}
        >
          Live Snapshot from the{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 900,
            }}
          >
            Omeca Trust Stack
          </span>
        </Typography>

        {/* METRICS */}
        <Grid container spacing={3} justifyContent="center">
          {metrics.map((m, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Box
                sx={{
                  // p: 2.5,
                  // borderRadius: 2,
                  // textAlign: "center",
                  // background: `${m.color}08`,
                  // border: `1px solid ${m.color}55`,
                  p: { xs: 2, sm: 2.5 },
borderRadius: 2.5,
textAlign: "center",
background: `${m.color}0D`,
border: `1px solid ${m.color}30`,
backdropFilter: "blur(6px)",

                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {m.label}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{ mt: 1, mb: 0.5, fontWeight: 900, color: m.color }}
                >
                  {m.value}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: m.color }}
                >
                  {m.trend}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        {/* <Box sx={{ textAlign: "center", mt: 4 }}> */}
        <Box sx={{ textAlign: "center", mt: { xs: 3, md: 4 } }}>

          <Button
            variant="text"
            onClick={onExplore}
            sx={{
              fontWeight: 800,
              fontSize: "1rem",
              color: colors.accent,
              textTransform: "none",
            }}
          >
            Explore Omeca Trust Stack →
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default OmecaHomepagePreview;
