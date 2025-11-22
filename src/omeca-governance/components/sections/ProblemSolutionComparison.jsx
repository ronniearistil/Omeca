// import React, { useContext } from "react";
// import { Container, Typography, Grid, Paper, Box } from "@mui/material";
// import { motion } from "framer-motion";
// import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
// import CancelRounded from "@mui/icons-material/CancelRounded";
// 
// // --- FIXED THEME IMPORTS ---
// import { ColorModeContext } from "../../../layouts/theme/ThemeContext.jsx";
// import { colors } from "../../../layouts/theme/theme.js";
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


import React, { useContext } from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import AccessTimeFilledRounded from "@mui/icons-material/AccessTimeFilledRounded";
import AutorenewRounded from "@mui/icons-material/AutorenewRounded";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";

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

const CrisisComparisonCard = ({ icon, title, body, isCrisis }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];
    const color = isCrisis ? colors.errorRed : colors.accent;

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
                // Remove fixed heights (Issue 5 Fix)
                border: `1px solid ${color}33`,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                {/* Clone the icon to apply color and size consistently */}
                {React.cloneElement(icon, { sx: { color: color, fontSize: 30 } })}
                <Typography
                    variant="h6"
                    fontWeight={800}
                    ml={1}
                    sx={{ 
                        color: color,
                        fontSize: '1.1rem' 
                    }}
                >
                    {title}
                </Typography>
            </Box>
          
            <Typography variant="body2" sx={{ color: currentColors.textDim, lineHeight: 1.6 }}>
                {body}
            </Typography>
        </Paper>
    );
};


const OmecaControlCrisisComparison = () => { 
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  // Content mapped directly from the pitch deck (Page 2)
  const crisisPoints = [
    { 
      icon: <AccessTimeFilledRounded />, 
      title: "Lagging Data: Weeks Behind", 
      body: "Finance leaders steer on outdated numbers, creating a massive gap in financial control. Decisions are always reactive."
    },
    { 
      icon: <AutorenewRounded />, 
      title: "Manual Drag: 40% Plus Lost Time", 
      body: "Close cycles waste days chasing reconciliation. Moving data faster did not fix the lack of real time accuracy and proof."
    },
  ];

  const omecaSolution = [
    { 
      icon: <CheckCircleOutlineRounded />, 
      title: "Continuous Financial Truth", 
      body: "Omeca transforms passive record keeping into a verifiable system of autonomous control. Finance is always current, always correct."
    },
    { 
      icon: <CheckCircleOutlineRounded />, 
      title: "AI Native Audit Core", 
      body: "Every operational event is translated into immutable financial proof, providing explainable compliance across all machine activity."
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
          The <span style={{ color: colors.errorRed }}>Control Crisis</span> vs. Continuous Financial Truth
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
          Traditional ERPs cannot deliver the speed or auditability required by modern operations. Omeca provides the continuous control foundation.
        </Typography>
      </motion.div>

      <Grid container spacing={4} alignItems="stretch">
        {/* CRISIS COLUMN (Responsive Grid Fix: xs=12, md=6) */}
        <Grid item xs={12} md={6}>
            <motion.div initial="hidden" whileInView="show" transition={{ staggerChildren: 0.1 }}>
                <Typography variant="h5" fontWeight={800} sx={{ mb: 3, color: colors.errorRed, textAlign: 'left' }}>
                    The Crisis of Lagging Data
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {crisisPoints.map((item, index) => (
                        <CrisisComparisonCard key={index} {...item} isCrisis={true} />
                    ))}
                </Box>
            </motion.div>
        </Grid>

        {/* SOLUTION COLUMN (Responsive Grid Fix: xs=12, md=6) */}
        <Grid item xs={12} md={6}>
            <motion.div initial="hidden" whileInView="show" transition={{ staggerChildren: 0.1 }}>
                <Typography variant="h5" fontWeight={800} sx={{ mb: 3, color: colors.accent, textAlign: 'left' }}>
                    Omeca's Continuous Control
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {omecaSolution.map((item, index) => (
                        <CrisisComparisonCard key={index} {...item} isCrisis={false} />
                    ))}
                </Box>
            </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OmecaControlCrisisComparison;