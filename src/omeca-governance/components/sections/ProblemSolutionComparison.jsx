// import React, { useContext } from "react";
// import { Container, Typography, Grid, Paper, Box } from "@mui/material";
// import { motion } from "framer-motion";
// import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
// import CancelRounded from "@mui/icons-material/CancelRounded";
// 
// // --- FIXED THEME IMPORTS ---
// import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
// import { colors } from "../../../shared/layouts/theme/theme.js";
// 
// const OmecaProblemSolutionComparison = () => { 
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
// 
//   const problems = [
//     "Legacy ERPs see invoices, not inference — blind to agent activity and compute cost.",
//     "CFOs can’t trace AI spend back to validated outcomes or unit economics.",
//     "Finance teams patch systems together with spreadsheets that break under scale.",
//     "AI adoption is accelerating faster than internal control can catch up.",
//   ];
// 
//   const solutions = [
//     "AI-native audit core that translates every agent action into immutable financial proof.",
//     "Purpose-built for the machine economy, not adapted from human workflows.",
//     "Automated reconciliation and ERP sync that turns AI spend into verified financial data.",
//     "Continuous compliance and visibility across all autonomous operations.",
//   ];
// 
//   const ComparisonCard = ({ items, isSolution }) => (
//     <Paper
//       sx={{
//         p: 4,
//         height: "100%",
//         borderRadius: 3,
//         bgcolor: isSolution ? `${colors.successGreen}10` : `${colors.errorRed}10`,
//         border: `1px solid ${
//           isSolution ? colors.successGreen : colors.errorRed
//         }44`,
//         color: currentColors.textPrimary,
//       }}
//     >
//       <Typography
//         variant="h6"
//         fontWeight={800}
//         sx={{
//           color: isSolution ? colors.successGreen : colors.errorRed,
//           mb: 2,
//         }}
//       >
//         {isSolution
//           ? "With Omeca: Auditable Control"
//           : "Without Omeca: The Compliance Gap"}
//       </Typography>
// 
//       <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
//         {items.map((item, index) => (
//           <Box
//             key={index}
//             component="li"
//             sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
//           >
//             {isSolution ? (
//               <CheckCircleOutlineRounded
//                 sx={{
//                   color: colors.successGreen,
//                   mr: 1,
//                   mt: 0.5,
//                   flexShrink: 0,
//                 }}
//               />
//             ) : (
//               <CancelRounded
//                 sx={{
//                   color: colors.errorRed,
//                   mr: 1,
//                   mt: 0.5,
//                   flexShrink: 0,
//                 }}
//               />
//             )}
// 
//             <Typography variant="body2" color={currentColors.textDim}>
//               {item}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     </Paper>
//   );
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
//           From Operational{" "}
//           <span style={{ color: colors.errorRed }}>Noise</span> to Explainable
//           Control
//         </Typography>
// 
//         <Typography
//           sx={{
//             color: currentColors.textDim,
//             mb: 6,
//             maxWidth: 700,
//             mx: "auto",
//             lineHeight: 1.6,
//           }}
//         >
//           Traditional ERPs cannot interpret autonomous activity or trace AI
//           decisions. <strong>Omeca</strong> captures machine-level data and
//           transforms it into transparent, verifiable financial records.
//         </Typography>
//       </motion.div>
// 
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <ComparisonCard items={problems} isSolution={false} />
//           </motion.div>
//         </Grid>
// 
//         <Grid item xs={12} md={6}>
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <ComparisonCard items={solutions} isSolution={true} />
//           </motion.div>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };
// 
// export default OmecaProblemSolutionComparison;


import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  ButtonBase,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import TimerOffRounded from "@mui/icons-material/TimerOffRounded";
import BrokenImageRounded from "@mui/icons-material/BrokenImageRounded";
import GppGoodRounded from "@mui/icons-material/GppGoodRounded";
import AutoModeRounded from "@mui/icons-material/AutoModeRounded";
import SyncRounded from "@mui/icons-material/SyncRounded";

// Theme imports
import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../../../shared/layouts/theme/theme.js";

// =========================================
// DATA
// =========================================
const carouselData = [
  {
    id: 0,
    label: "L1 · OPERATIONS",
    crisis: {
      title: "Lagging Data",
      subtitle: "Weeks Behind",
      body:
        "Execution moves daily, but finance sees it weeks later. Leaders steer on outdated numbers.",
      icon: <TimerOffRounded />,
      accent: colors.errorRed,
    },
    solution: {
      title: "Omeca Core",
      subtitle: "Real-Time Operational Truth",
      body:
        "A unified live stream of cash, spend, and revenue — giving leaders an accurate picture of what is happening now.",
      icon: <SyncRounded />,
      accent: colors.accent,
    },
  },
  {
    id: 1,
    label: "L2 · THE CLOSE",
    crisis: {
      title: "Manual Drag",
      subtitle: "40%+ Lost Time",
      body:
        "Close cycles stall on reconciliation and hand-offs. Time wasted chasing the last 5%.",
      icon: <WarningAmberRounded />,
      accent: colors.errorRed,
    },
    solution: {
      title: "Omeca Ledger",
      subtitle: "Continuous Close",
      body:
        "A system where books stay aligned. The close runs in the background — not in a month-end scramble.",
      icon: <AutoModeRounded />,
      accent: colors.accent,
    },
  },
  {
    id: 2,
    label: "L3 · GOVERNANCE",
    crisis: {
      title: "The Integration Fallacy",
      subtitle: "Flow ≠ Control",
      body:
        "Moving data faster didn’t prove accuracy. ERPs still can’t explain why numbers can be trusted.",
      icon: <BrokenImageRounded />,
      accent: colors.errorRed,
    },
    solution: {
      title: "Omeca Governance",
      subtitle: "Verifiable Trust",
      body:
        "Every transaction carries its own explanation and evidence. Audit, AI, and regulators share one consistent truth.",
      icon: <GppGoodRounded />,
      accent: colors.accent,
    },
  },
];

// =========================================
// SHARED CARD (UPDATED)
// =========================================
const SharedCard = ({ data, currentColors, isDark }) => (
  <Paper
    component={motion.div}
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 90, damping: 18 }}
    elevation={0}
    sx={{
      // p: { xs: 2.5, md: 4 },
      p: { xs: 2, sm: 2.5, md: 4 },

      height: "100%",
      width: "100%",
      borderRadius: 4, // unified OS radius
      border: `1px solid ${currentColors.textDim}22`,

      // OS glass surface
      background: isDark
        ? "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))"
        : "linear-gradient(145deg, #FFFFFF, #F7F9FC)",
      backdropFilter: "blur(14px)",

      // OS shadow
      boxShadow: isDark
        ? "0 20px 50px -12px rgba(0,0,0,0.35)"
        : "0 20px 50px -12px rgba(0,0,0,0.1)",

      display: "flex",
      flexDirection: "column",
      gap: 2,
      borderLeft: `4px solid ${data.accent}`,
      transition: "all 0.28s cubic-bezier(0.24, 0.74, 0.32, 1)",
    }}
  >
    {/* Header Row */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          backgroundColor: `${data.accent}1A`,
          color: data.accent,
          height: "100%",
          display: "flex",
        }}
      >
        {React.cloneElement(data.icon, { fontSize: "medium" })}
      </Box>

      <Box>
        <Typography
          variant="h6"
          fontWeight={900}
          sx={{
            color: currentColors.textPrimary,
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
          }}
        >
          {data.title}
        </Typography>

        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: data.accent,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {data.subtitle}
        </Typography>
      </Box>
    </Box>

    <Typography
      variant="body1"
      sx={{
        color: currentColors.textDim,
        lineHeight: 1.6,
        fontSize: "0.95rem",
      }}
    >
      {data.body}
    </Typography>
  </Paper>
);

// =========================================
// MAIN COMPONENT (UPDATED)
// =========================================
const OmecaMarketingCarousel = () => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];
  const isDark = mode === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % carouselData.length),
      5500
    );
    return () => clearInterval(interval);
  }, []);

  const currentData = carouselData[currentIndex];

  return (
    // <Box sx={{ py: { xs: 6, md: 10 }, width: "100%" }}>
    <Box sx={{ py: { xs: 3, sm: 4, md: 6 }, width: "100%" }}>
      <Container maxWidth="xl">
        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {carouselData.map((item, idx) => {
            const active = idx === currentIndex;
            return (
              <ButtonBase
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 50,

                  // OS pill styling
                  border: `1px solid ${
                    active ? colors.accent : currentColors.textDim + "15"
                  }`,
                  backgroundColor: active
                    ? `${colors.accent}12`
                    : `${currentColors.card}08`,
                  backdropFilter: "blur(8px)",
                  boxShadow: active
                    ? `0 0 0 1px ${colors.accent}20`
                    : "none",

                  transition: "all 0.25s ease",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    letterSpacing: "0.08em",
                    fontWeight: active ? 800 : 600,
                    color: active ? colors.accent : currentColors.textDim,
                  }}
                >
                  {item.label}
                </Typography>
              </ButtonBase>
            );
          })}
        </Box>

        {/* Side-by-side cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            <Grid
              container
              // spacing={{ xs: 2, md: 3 }}
              spacing={{ xs: 1.5, sm: 2, md: 3 }}
              justifyContent="center"
              alignItems="stretch"
              sx={{
                maxWidth: "1400px",
                margin: "0 auto",
                pt: { xs: 1, md: 2 },
                pb: { xs: 1, md: 2 },
              }}
            >
              {/* Crisis Card */}
              <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                <SharedCard
                  data={currentData.crisis}
                  currentColors={currentColors}
                  isDark={isDark}
                />
              </Grid>

              {/* Solution Card */}
              <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                <SharedCard
                  data={currentData.solution}
                  currentColors={currentColors}
                  isDark={isDark}
                />
              </Grid>
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default OmecaMarketingCarousel;
