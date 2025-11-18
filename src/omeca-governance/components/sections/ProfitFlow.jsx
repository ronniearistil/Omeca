
// // src/components/sections/OmecaProfitFlow.jsx (Conceptual File Path & Name Change)
// import React, { useContext } from "react";
// import { Container, Typography, Grid, Paper, Box } from "@mui/material";
// import { motion } from "framer-motion";
// import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
// import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
// import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
// import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
// import { ColorModeContext } from "../../layouts/theme/ThemeContext.jsx";
// import { colors } from "../../layouts/theme/theme.js";
// 
// const OmecaProfitFlow = () => { // RENAMED COMPONENT
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
// 
//   const steps = [
//     {
//       icon: <AttachMoneyRoundedIcon sx={{ fontSize: 40, color: colors.accent }} />,
//       title: "Capture Spend",
//       description:
//         "Omeca captures every machine event in real time — compute, storage, or API costs — at atomic granularity.", // UNIFIED BRAND
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
//           From raw telemetry to actionable intelligence — how Omeca transforms // UNIFIED BRAND
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
// export default OmecaProfitFlow; // RENAMED EXPORT

// src/omeca-governance/components/sections/ProfitFlow.jsx
import React, { useContext } from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

// --- FIXED THEME IMPORTS ---
import { ColorModeContext } from "../../../layouts/theme/ThemeContext.jsx";
import { colors } from "../../../layouts/theme/theme.js";

const OmecaProfitFlow = () => { 
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  const steps = [
    {
      icon: <AttachMoneyRoundedIcon sx={{ fontSize: 40, color: colors.accent }} />,
      title: "Capture Spend",
      description:
        "Omeca captures every machine event in real time — compute, storage, or API costs — at atomic granularity.",
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
          From raw telemetry to actionable intelligence — how Omeca transforms
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

export default OmecaProfitFlow;
