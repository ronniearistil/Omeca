// // src/Melucra/components/sections/ProfitFlow.jsx
// 
// import React, { useContext } from 'react';
// import { Container, Typography, Grid, Paper, Box } from '@mui/material';
// import { motion } from 'framer-motion';
// import SyncAltRounded from '@mui/icons-material/SyncAltRounded';
// import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
// import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
// // import { ColorModeContext } from '../theme/ThemeContext';
// // import { colors } from '../theme/theme';
// import { ColorModeContext } from "../../layouts/theme/ThemeContext.jsx";
// import { colors } from "../../layouts/theme/theme.js";
// 
// 
// const ProfitFlow = () => {
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
// 
//   const steps = [
//     { 
//       title: 'Unify Machine Work', 
//       body: 'Every model run, job, or inference becomes a trusted ledger entry.', 
//       icon: <SyncAltRounded /> 
//     },
//     { 
//       title: 'Reconcile in Real Time', 
//       body: 'AI-powered reconciliation transforms usage into value with precision.', 
//       icon: <AccountBalanceWalletRoundedIcon /> 
//     },
//     { 
//       title: 'Protect and Grow Profit', 
//       body: 'Forecast margins, trigger alerts, and automate revenue intelligence.', 
//       icon: <AttachMoneyRoundedIcon /> 
//     },
//   ];
// 
//   return (
//     <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, textAlign: 'center' }}>
//       {/* Section Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ once: true, amount: 0.5 }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight={900}
//           color={currentColors.textPrimary}
//           sx={{ mb: 1 }}
//         >
//           Machine Work → Unified Ledger → Intelligent Profit
//         </Typography>
//         <Typography sx={{ color: currentColors.textDim, mb: 6 }}>
//           Melucra powers the entire machine economy finance loop automatically.
//         </Typography>
//       </motion.div>
// 
//       {/* Steps */}
//       <Grid container spacing={4} justifyContent="center">
//         {steps.map((step, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <motion.div
//               initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               viewport={{ once: true, amount: 0.6 }}
//             >
//               <Paper
//                 sx={{
//                   p: 3,
//                   borderRadius: 2,
//                   bgcolor: currentColors.card,
//                   height: '100%',
//                   border: `1px solid ${currentColors.textDim}22`,
//                   position: 'relative',
//                 }}
//               >
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//                   <Box
//                     sx={{
//                       p: 2,
//                       borderRadius: '50%',
//                       bgcolor: `${colors.accent}1A`,
//                       color: colors.accent,
//                       border: `1px solid ${colors.accent}44`,
//                     }}
//                   >
//                     {step.icon}
//                   </Box>
//                 </Box>
//                 <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>
//                   {step.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mt: 1, color: currentColors.textDim }}>
//                   {step.body}
//                 </Typography>
//               </Paper>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };
// 
// export default ProfitFlow;

// src/components/sections/ProfitFlow.jsx
import React, { useContext } from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import { ColorModeContext } from "../../layouts/theme/ThemeContext.jsx";
import { colors } from "../../layouts/theme/theme.js";

const ProfitFlow = () => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  const steps = [
    {
      icon: <AttachMoneyRoundedIcon sx={{ fontSize: 40, color: colors.accent }} />,
      title: "Capture Spend",
      description:
        "Melucra captures every machine event in real time — compute, storage, or API costs — at atomic granularity.",
    },
    {
      icon: <AccountBalanceWalletRoundedIcon sx={{ fontSize: 40, color: colors.lucraGold }} />,
      title: "Reconcile & Validate",
      description:
        "Each event is validated and reconciled to ensure data integrity and audit-readiness before posting.",
    },
    {
      icon: <AssessmentRoundedIcon sx={{ fontSize: 40, color: colors.successGreen }} />,
      title: "Analyze & Forecast",
      description:
        "Automated anomaly detection highlights profitability risks and optimizes cost allocations.",
    },
    {
      icon: <TrendingUpRoundedIcon sx={{ fontSize: 40, color: colors.accent }} />,
      title: "Optimize Margins",
      description:
        "Turn insights into action — automate controls and surface real-time profitability signals for leadership.",
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 8, md: 10 },
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          color={currentColors.textPrimary}
          sx={{ mb: 2 }}
        >
          Profit Flow, <span style={{ color: colors.accent }}>Explained.</span>
        </Typography>
        <Typography sx={{ color: currentColors.textDim, mb: 6 }}>
          From raw telemetry to actionable intelligence — how Melucra transforms
          machine data into margin clarity.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: "100%",
                  textAlign: "center",
                  bgcolor: currentColors.card,
                  color: currentColors.textPrimary,
                  border: `1px solid ${colors.accent}22`,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{step.icon}</Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{ mb: 1, color: colors.accent }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: currentColors.textDim,
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProfitFlow;
