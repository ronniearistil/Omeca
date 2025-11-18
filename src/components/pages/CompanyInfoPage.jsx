// import React, { useContext } from "react";
// import { Container, Box, Grid, Typography, Button, Paper } from "@mui/material";
// import { motion } from "framer-motion";
// import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
// import PolicyRoundedIcon from "@mui/icons-material/PolicyRoundedIcon";
// 
// // Import paths remain unchanged from your setup
// import { ColorModeContext } from '../components/theme/ThemeContext.js'; 
// import { colors } from '../components/theme/theme.js'; 
// 
// const BackButton = ({ setPage, currentColors }) => (
//   <Button
//     startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
//     onClick={() => setPage('home')}
//     sx={{
//       mt: 4,
//       mb: 2,
//       color: currentColors.textDim,
//       textTransform: 'none',
//       '&:hover': { color: colors.accent }
//     }}
//   >
//     Back to Home
//   </Button>
// );
// 
// const OmecaCompanyInfoPage = ({ setPage }) => {
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
// 
//   // --- UPDATED CONTENT: Incorporating narrative from AboutUs Source ---
//   const sections = [
//     {
//       title: "Our Mission: Continuous Financial Trust",
//       content:
//         "We are building the financial operating system for the machine economy. Our mission is to eliminate the 3,000-hour scramble of the month-end close and ensure finance leaders act with real-time control, not hindsight.",
//       icon: <PolicyRoundedIcon />
//     },
//     {
//       title: "Our Story: The Trust Gap",
//       content:
//         "As finance systems leaders ourselves, we grew frustrated. Legacy ERPs are static, batch-based systems looking backward. In a world of AI-driven decisions, this creates a massive 'Trust Gap' that we set out to eliminate.",
//       icon: <PolicyRoundedIcon />
//     },
//     {
//       title: "Why Omeca? The Cognitive ERP",
//       content:
//         "Omeca is the first Cognitive ERP—a self-reconciling, trust-first system. It unifies control (Omeca Core), automates the close (Omeca Ledger), and provides verifiable proof (Omeca Governance) for every transaction.",
//       icon: <PolicyRoundedIcon />
//     }
//   ];
// 
//   return (
//     <Container
//       maxWidth="lg"
//       sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <BackButton setPage={setPage} currentColors={currentColors} />
//         <Typography
//           variant="h3"
//           fontWeight={900}
//           color={currentColors.textPrimary}
//           sx={{ mb: 2 }}
//         >
//           The Omeca Story: Rebuilding the ERP
//         </Typography>
//         <Typography
//           variant="h6"
//           color={currentColors.textDim}
//           sx={{ mb: 6 }}
//         >
//           We are defining the financial operating system for the machine economy.
//         </Typography>
//       </motion.div>
// 
//       <Grid container spacing={4}>
//         {sections.map((item, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <Paper
//               sx={{
//                 p: 3,
//                 bgcolor: currentColors.card,
//                 height: '100%',
//                 borderTop: `4px solid ${colors.lucraGold}`
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 fontWeight={700}
//                 color={currentColors.textPrimary}
//               >
//                 {item.title}
//               </Typography>
//               <Typography
//                 variant="body1"
//                 color={currentColors.textDim}
//                 sx={{ mt: 1 }}
//               >
//                 {item.content}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };
// 
// export default OmecaCompanyInfoPage;

// src/components/pages/CompanyInfoPage.jsx

import React, { useContext } from "react";
import { Container, Box, Grid, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import PolicyRounded from "@mui/icons-material/PolicyRounded";

import { ColorModeContext } from "../../layouts/theme/ThemeContext.jsx";
import { colors } from "../../layouts/theme/theme.js";

const BackButton = ({ setPage, currentColors }) => (
  <Button
    startIcon={<ArrowForwardIosRounded sx={{ transform: "rotate(180deg)" }} />}
    onClick={() => setPage("home")}
    sx={{
      mt: 4,
      mb: 2,
      color: currentColors.textDim,
      textTransform: "none",
      "&:hover": { color: colors.accent },
    }}
  >
    Back to Home
  </Button>
);

const OmecaCompanyInfoPage = ({ setPage }) => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  const sections = [
    {
      title: "Our Mission",
      content:
        "We are rebuilding the ERP from the ground up. Our mission is to create a self-driving financial system that unifies operational truth, automates the close, and delivers verifiable intelligence for every decision.",
      icon: <PolicyRounded />,
    },
    {
      title: "The Problem We Saw",
      content:
        "Legacy ERPs were designed for a world of manual inputs and monthly batches. They cannot interpret autonomous activity or keep pace with systems that operate continuously. This creates a widening trust gap between what the business is doing and what finance can verify.",
      icon: <PolicyRounded />,
    },
    {
      title: "Why We Built Omeca",
      content:
        "Omeca is the first Cognitive ERP. It captures live operational signals, maintains a continuously reconciled close, and generates verifiable proof for every action taken across the business. One system of truth, one continuous financial heartbeat.",
      icon: <PolicyRounded />,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton setPage={setPage} currentColors={currentColors} />

        <Typography
          variant="h3"
          fontWeight={900}
          color={currentColors.textPrimary}
          sx={{ mb: 2 }}
        >
          The Omeca Story
        </Typography>

        <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
          We are defining the next generation of enterprise finance with the self-driving Cognitive ERP.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {sections.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                bgcolor: currentColors.card,
                height: "100%",
                borderTop: `4px solid ${colors.lucraGold}`,
              }}
            >
              <Box sx={{ mb: 2 }}>{item.icon}</Box>

              <Typography
                variant="h6"
                fontWeight={700}
                color={currentColors.textPrimary}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body1"
                color={currentColors.textDim}
                sx={{ mt: 1 }}
              >
                {item.content}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OmecaCompanyInfoPage;
