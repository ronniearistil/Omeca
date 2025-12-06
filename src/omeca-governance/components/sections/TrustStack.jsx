import React, { useContext } from "react";
import { Container, Typography, Grid, Paper, Box, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { Flare, AutorenewRounded, VerifiedRounded } from "@mui/icons-material";
import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../../../shared/layouts/theme/theme.js";

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
    // transition: { type: "spring", stiffness: 60, damping: 20 } 
    transition: { type: "spring", stiffness: 80, damping: 20 }

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
          p: { xs: 3, lg: 4 },
          // borderRadius: 6,
          borderRadius: 4,
          // background: isDark 
          //   ? "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" 
          //   : "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
          background: isDark
  ? "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))"
  : "linear-gradient(145deg, #FFFFFF, #F7F9FC)",
backdropFilter: "blur(14px)",

          border: `1px solid ${palette.textDim}15`,
          backdropFilter: "blur(12px)",
          // transition: "all 0.4s ease-out",
          transition: "all 0.28s cubic-bezier(0.24, 0.74, 0.32, 1)",
          
          // "&:hover": {
          //   transform: "translateY(-6px)",
          //   borderColor: `${color}40`,
          //   boxShadow: isDark 
          //       ? `0 20px 60px -10px ${color}10`
          //       : `0 20px 60px -10px ${color}20`,
          // }
          "&:hover": {
  transform: "translateY(-4px)",
  borderColor: `${color}35`,
  boxShadow: isDark
    ? `0 24px 48px -12px ${color}15`
    : `0 24px 48px -12px ${color}25`,
}

        }}
      >
        {/* Content Top Section */}
        <Box>
            {/* Header Row */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
                <Box sx={{ 
                    // p: 1.5, borderRadius: 3, 
                    // bgcolor: `${color}10`,
                    //  color: color,
                    p: 1.5,
borderRadius: 3,
bgcolor: `${color}12`,
color: color,
boxShadow: isDark
  ? `inset 0 0 0 1px ${color}30`
  : `inset 0 0 0 1px ${color}25`,

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
                // fontSize: { xs: "1.5rem", lg: "1.75rem" } 
                fontSize: { xs: "1.55rem", lg: "1.85rem" },
letterSpacing: "-0.02em",

            }}>
                {title}
            </Typography>
            
            <Typography variant="subtitle2" fontWeight={700} sx={{ 
                color: color, 
                mb: 3, 
                textTransform: "uppercase", 
                // fontSize: "0.75rem", 
                // letterSpacing: 1 
                fontSize: "0.7rem",
letterSpacing: "0.06em",
opacity: 0.95,

            }}>
                {subtitle}
            </Typography>
        </Box>

        {/* Description Section - MARKETING SAFE COPY */}
        <Box sx={{ mt: "auto" }}> {/* Pushes text to bottom to align baselines if needed */}
            <Typography variant="body1" sx={{ 
                color: palette.textDim, 
                lineHeight: 1.7, 
                // fontSize: { xs: "0.95rem", lg: "1.05rem" },
                // maxWidth: "100%" 
                fontSize: { xs: "0.96rem", lg: "1.06rem" },
lineHeight: 1.65,
letterSpacing: "-0.01em",

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
  
  // const stackData = [
  //   {
  //     layer: "L1 CORE",
  //     title: "Operational Control",
  //     subtitle: "The Data Moat",
  //     body: "Unified financial visibility that legacy ERPs cannot deliver. Omeca becomes the single source of truth for cash and spend, ensuring you steer the business on live data, not last month’s spreadsheets.",
  //     icon: <Flare />,
  //     color: colors.successGreen,
  //   },
  //   {
  //     layer: "L2 LEDGER",
  //     title: "Continuous Close",
  //     subtitle: "The Logic Moat",
  //     body: "The books that close themselves. We replace manual reconciliation with an autonomous engine that keeps your subledgers aligned in real-time, eliminating the month-end fire drill forever.",
  //     icon: <AutorenewRounded />,
  //     color: colors.accent,
  //   },
  //   {
  //     layer: "L3 GOVERNANCE",
  //     title: "Verifiable Trust",
  //     subtitle: "The Credibility Moat",
  //     body: "Turn compliance into a competitive asset. Every transaction is automatically verified and audit-ready upon creation, creating a level of institutional trust that defines the modern enterprise.",
  //     icon: <VerifiedRounded />,
  //     color: colors.lucraGold,
  //   },
  // ];

  const stackData = [
  {
    layer: "L1 CORE",
    title: "Operational Integrity",
    subtitle: "Verified Real Time Inputs",
    body: "Omeca verifies every financial and operational event the moment it happens. This creates a single, trusted stream of truth that legacy ERP architecture was never designed to maintain.",
    icon: <Flare />,
    color: colors.successGreen,
  },
  {
    layer: "L2 LEDGER",
    title: "Continuous Close",
    subtitle: "Always Aligned Books",
    body: "Omeca keeps the ledger correct throughout the month through deterministic accounting logic. Reconciliation becomes automatic, and the month end close becomes a confirmation rather than a chase.",
    icon: <AutorenewRounded />,
    color: colors.accent,
  },
  {
    layer: "L3 GOVERNANCE",
    title: "Autonomous Governance",
    subtitle: "Enforced Financial Control",
    body: "Every transaction carries its own explanation and evidence, enabling real time governance that prevents errors before they happen. Controls are enforced automatically, creating complete institutional trust.",
    icon: <VerifiedRounded />,
    color: colors.lucraGold,
  },
];


  return (
    <Box sx={{ 
        // py: { xs: 4, md: 6 }, 
        py: { xs: 6, md: 10 },
          backgroundColor: mode === 'dark' ? '#121926' : '#F8FAFC',
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
                    mb: { xs: 4, md: 6 }, 
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
                       Three continuous layers that keep every financial event correct by design. 
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