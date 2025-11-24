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
import { Container, Typography, Grid, Paper, Box, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { Flare, AutorenewRounded, VerifiedRounded } from "@mui/icons-material";
import { ColorModeContext } from "../../../layouts/theme/ThemeContext.jsx";
import { colors } from "../../../layouts/theme/theme.js";

// --- MOTION CONFIG ---
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVar = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 60, damping: 20 } 
  }
};

// --- SUB-COMPONENT: The Stack Card ---
const StackCard = ({ layer, title, subtitle, body, icon, color }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  const palette = colors[mode];

  return (
    // CRITICAL FIX: 'height: 100%' ensures the motion div fills the grid cell
    <motion.div variants={itemVar} style={{ height: "100%", width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          // FLEXBOX LOCK: This ensures the card stretches to fill the height of the tallest neighbor
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          
          // FLUID VISUALS
          p: { xs: 4, lg: 5 },
          borderRadius: 6,
          background: isDark 
            ? "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" 
            : "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
          border: `1px solid ${palette.textDim}15`,
          backdropFilter: "blur(12px)",
          transition: "all 0.4s ease-out",
          
          "&:hover": {
            transform: "translateY(-6px)",
            borderColor: `${color}40`,
            boxShadow: isDark 
                ? `0 20px 60px -10px ${color}10`
                : `0 20px 60px -10px ${color}20`,
          }
        }}
      >
        {/* Content Top Section */}
        <Box>
            {/* Header Row */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
                <Box sx={{ 
                    p: 1.5, borderRadius: 3, 
                    bgcolor: `${color}10`, color: color,
                    display: "flex", alignItems: "center", justifyContent: "center" 
                }}>
                    {React.cloneElement(icon, { sx: { fontSize: 32 } })}
                </Box>
                
                <Typography variant="caption" sx={{ 
                    fontFamily: "monospace", 
                    fontWeight: 700, 
                    color: palette.textDim, 
                    opacity: 0.5, 
                    letterSpacing: 2,
                    fontSize: "0.7rem",
                    pt: 1
                }}>
                    {layer}
                </Typography>
            </Box>

            <Typography variant="h4" fontWeight={800} sx={{ 
                color: palette.textPrimary, 
                mb: 1, 
                letterSpacing: "-0.02em",
                fontSize: { xs: "1.5rem", lg: "1.75rem" } 
            }}>
                {title}
            </Typography>
            
            <Typography variant="subtitle2" fontWeight={700} sx={{ 
                color: color, 
                mb: 3, 
                textTransform: "uppercase", 
                fontSize: "0.75rem", 
                letterSpacing: 1 
            }}>
                {subtitle}
            </Typography>
        </Box>

        {/* Description Section - MARKETING SAFE COPY */}
        <Box sx={{ mt: "auto" }}> {/* Pushes text to bottom to align baselines if needed */}
            <Typography variant="body1" sx={{ 
                color: palette.textDim, 
                lineHeight: 1.7, 
                fontSize: { xs: "0.95rem", lg: "1.05rem" },
                maxWidth: "100%" 
            }}>
                {body}
            </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const OmecaTrustStack = () => {
  const { mode } = useContext(ColorModeContext);
  const palette = colors[mode];
  
  // MARKETING STRATEGY: 
  // Focus on the "Moat" (The Advantage) rather than the "Machine" (The How).
  // This tells investors/customers WHY they win, without telling competitors HOW we build it.
  
  const stackData = [
    {
      layer: "L1 CORE",
      title: "Operational Control",
      subtitle: "The Data Moat",
      body: "Unified financial visibility that legacy ERPs cannot deliver. Omeca becomes the single source of truth for cash and spend, ensuring you steer the business on live data, not last month’s spreadsheets.",
      icon: <Flare />,
      color: colors.successGreen,
    },
    {
      layer: "L2 LEDGER",
      title: "Continuous Close",
      subtitle: "The Logic Moat",
      body: "The books that close themselves. We replace manual reconciliation with an autonomous engine that keeps your subledgers aligned in real-time, eliminating the month-end fire drill forever.",
      icon: <AutorenewRounded />,
      color: colors.accent,
    },
    {
      layer: "L3 GOVERNANCE",
      title: "Verifiable Trust",
      subtitle: "The Credibility Moat",
      body: "Turn compliance into a competitive asset. Every transaction is automatically verified and audit-ready upon creation, creating a level of institutional trust that defines the modern enterprise.",
      icon: <VerifiedRounded />,
      color: colors.lucraGold,
    },
  ];

  return (
    <Box sx={{ 
        py: { xs: 12, md: 16 }, 
        overflow: "hidden" 
    }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6, xl: 12 } }}>
            <motion.div
                variants={containerVar}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* Header Section */}
                <Box sx={{ 
                    textAlign: "center", 
                    mb: { xs: 8, md: 12 }, 
                    maxWidth: 900, 
                    mx: "auto" 
                }}>
                    <Typography variant="h2" fontWeight={900} sx={{ 
                        color: palette.textPrimary, 
                        mb: 3, 
                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                        letterSpacing: "-0.03em"
                    }}>
                        The <span style={{ 
                            background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>Trust Stack</span>
                    </Typography>
                    
                    <Typography variant="h5" sx={{ 
                        color: palette.textDim, 
                        fontWeight: 400, 
                        lineHeight: 1.6,
                        maxWidth: 700,
                        mx: "auto",
                        fontSize: { xs: "1.1rem", md: "1.3rem" }
                    }}>
                        Omeca creates a defensive moat by unifying data ownership, accounting logic, and regulatory proof.
                    </Typography>
                </Box>

                {/* The Grid - 'alignItems: stretch' forces equal height */}
                <Grid container spacing={4} alignItems="stretch">
                    {stackData.map((item, index) => (
                        <Grid item xs={12} md={4} key={index} sx={{ display: "flex" }}>
                            <StackCard {...item} />
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Container>
    </Box>
  );
};

export default OmecaTrustStack;