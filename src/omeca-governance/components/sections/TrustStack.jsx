// 
// 
// // src/omeca-governance/components/sections/ProfitFlow.jsx
// import React, { useContext } from "react";
// import { Container, Typography, Grid, Paper, Box } from "@mui/material";
// import { motion } from "framer-motion";
// import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
// import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
// import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
// import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
// 
// // --- FIXED THEME IMPORTS ---
// import { ColorModeContext } from "../../../layouts/theme/ThemeContext.jsx";
// import { colors } from "../../../layouts/theme/theme.js";
// 
// const OmecaProfitFlow = () => { 
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
// 
//   const steps = [
//     {
//       icon: <AttachMoneyRoundedIcon sx={{ fontSize: 40, color: colors.accent }} />,
//       title: "Capture Spend",
//       description:
//         "Omeca captures every machine event in real time — compute, storage, or API costs — at atomic granularity.",
//     },
//     {
//       icon: <AccountBalanceWalletRoundedIcon sx={{ fontSize: 40, color: colors.lucraGold }} />,
//       title: "Reconcile & Validate",
//       description:
//         "Each event is validated and reconciled to ensure data integrity and audit-readiness before posting.",
//     },
//     {
//       icon: <AssessmentRoundedIcon sx={{ fontSize: 40, color: colors.successGreen }} />,
//       title: "Analyze & Forecast",
//       description:
//         "Automated anomaly detection highlights profitability risks and optimizes cost allocations.",
//     },
//     {
//       icon: <TrendingUpRoundedIcon sx={{ fontSize: 40, color: colors.accent }} />,
//       title: "Optimize Margins",
//       description:
//         "Turn insights into action — automate controls and surface real-time profitability signals for leadership.",
//     },
//   ];
// 
//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         py: { xs: 8, md: 10 },
//         textAlign: "center",
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true, amount: 0.5 }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight={900}
//           color={currentColors.textPrimary}
//           sx={{ mb: 2 }}
//         >
//           Profit Flow, <span style={{ color: colors.accent }}>Explained.</span>
//         </Typography>
//         <Typography sx={{ color: currentColors.textDim, mb: 6 }}>
//           From raw telemetry to actionable intelligence — how Omeca transforms
//           machine data into margin clarity.
//         </Typography>
//       </motion.div>
// 
//       <Grid container spacing={4}>
//         {steps.map((step, index) => (
//           <Grid key={index} item xs={12} sm={6} md={3}>
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               viewport={{ once: true, amount: 0.4 }}
//             >
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 4,
//                   borderRadius: 3,
//                   height: "100%",
//                   textAlign: "center",
//                   bgcolor: currentColors.card,
//                   color: currentColors.textPrimary,
//                   border: `1px solid ${colors.accent}22`,
//                   transition: "transform 0.3s",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: 6,
//                   },
//                 }}
//               >
//                 <Box sx={{ mb: 2 }}>{step.icon}</Box>
//                 <Typography
//                   variant="h6"
//                   fontWeight={800}
//                   sx={{ mb: 1, color: colors.accent }}
//                 >
//                   {step.title}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: currentColors.textDim,
//                     lineHeight: 1.6,
//                   }}
//                 >
//                   {step.description}
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
// export default OmecaProfitFlow;
import React, { useContext } from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
// FIX: Replaced ShieldCheck with the safer VerifiedRounded
import { Flare, AutorenewRounded, VerifiedRounded } from '@mui/icons-material';

// --- FIXED THEME IMPORTS ---
import { ColorModeContext } from "../../../layouts/theme/ThemeContext.jsx";
import { colors } from "../../../layouts/theme/theme.js";

// --- STABLE MOTION VARIANTS (Issue 2 Fix) ---
const fadeInUp = { 
    hidden: { y: 30, opacity: 0 }, 
    show: { 
        y: 0, 
        opacity: 1, 
        transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 } 
    } 
};

const TrustStackCard = ({ layer, title, body, icon, color }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];

    return (
        <Paper
            component={motion.div}
            variants={fadeInUp}
            sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                textAlign: "left",
                bgcolor: currentColors.card,
                border: `1px solid ${color}33`,
                transition: 'border-color 0.3s',
                '&:hover': {
                    borderColor: `${color}88`,
                }
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 1.5,
                p: 1,
                borderRadius: 1,
                bgcolor: `${color}10`,
                width: 'fit-content'
            }}>
                {/* Clone the icon to apply color and size consistently */}
                {React.cloneElement(icon, { sx: { color: color, fontSize: 32 } })}
                <Typography
                    variant="h6"
                    fontWeight={800}
                    ml={1.5}
                    sx={{ 
                        color: currentColors.textPrimary,
                        fontSize: '1.2rem' 
                    }}
                >
                    {layer}
                </Typography>
            </Box>
          
            <Typography variant="h6" fontWeight={900} sx={{ color: color, mb: 1 }}>
                {title}
            </Typography>
            
            <Typography variant="body2" sx={{ color: currentColors.textDim, lineHeight: 1.6, flexGrow: 1 }}>
                {body}
            </Typography>
        </Paper>
    );
};

const OmecaTrustStack = () => { 
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  // Content directly mapped from the pitch deck (L1, L2, L3)
  const stackLayers = [
    { 
      layer: 'L1: Omeca Core', 
      title: "Operational Control", 
      body: "Owns the verified data stream across cash, spend, and operations. Provides real time control of financial forecasts for immediate ROI.",
      icon: <Flare />,
      color: colors.lucraGold // Accent color for L1
    },
    { 
      layer: 'L2: Omeca Ledger', 
      title: "Continuous Close", 
      body: "A continuous subledger that automates journal entries and reconciliation. It transforms the month end scramble into a system that closes itself.",
      icon: <AutorenewRounded />,
      color: colors.accent // Main accent color for L2
    },
    { 
      layer: 'L3: Omeca Governance', 
      title: "Verifiable Trust", 
      body: "Immutable attestation and explainable compliance for every transaction. Provides the auditable trust layer for all AI driven finance.",
      // FIX: Using VerifiedRounded icon
      icon: <VerifiedRounded />,
      color: colors.successGreen // Trust/Compliance color for L3
    },
  ];

  return (
    <Container
      maxWidth="lg"
      // Apply consistent padding (Issue 5 Fix)
      sx={{ py: { xs: 10, md: 14 }, textAlign: "center" }}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          color={currentColors.textPrimary}
          sx={{ mb: 1 }}
        >
          Omeca's Architectural Moat: The Trust Stack
        </Typography>

        <Typography
          sx={{
            color: currentColors.textDim,
            mb: 8,
            maxWidth: 800,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          The Trust Stack is a new foundation for finance. It provides real time operational truth and auditable compliance for the machine economy.
        </Typography>
      </motion.div>

      <Grid container spacing={4} alignItems="stretch">
        {/* Responsive Grid Fix (Issue 5 Fix: xs=12, md=4 for 3 columns) */}
        {stackLayers.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
                <TrustStackCard {...item} />
            </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OmecaTrustStack; // Exporting the clean, new name