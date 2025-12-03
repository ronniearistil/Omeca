// import React, { useContext } from 'react';
// import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
// import { motion } from 'framer-motion';
// 
// // --- FIXED THEME PATHS ---
// import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
// import { colors } from '../../../shared/layouts/theme/theme.js';
// 
// const OmecaDeveloperIntegration = () => { 
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const steps = [
//         { n: 1, title: 'Install the SDK', body: 'Add our lightweight SDK to your project with a single command.' },
//         { n: 2, title: 'Replace Core Hooks', body: 'Update your existing finance logic hooks with our simple wrappers.' },
//         { n: 3, title: 'Start Tracking', body: 'Immediately see usage analytics, costs, and performance metrics in your dashboard.' },
//     ];
// 
//     const codeSnippet = `
// const omeca = new OmecaSDK({
//   apiKey: "OMECA_PK_...", // Updated API Key Prefix
// });
// 
// // BEFORE Omeca:
// // const cost = calculate_usage(data);
// // update_spreadsheet(cost);
// 
// // WITH Omeca:
// const ledgerEntry = omeca.track({
//   accountId: "user-123",
//   event: "model.inference",
//   units: 4200, // tokens or compute
//   value: 0.05, // USD per unit
// });
// 
// if (ledgerEntry.marginAlert) {
//   send_critical_alert(ledgerEntry.marginAlert);
// }
//     `.trim();
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
//             <motion.div
//                 initial={{ opacity: 0, y: 15 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true, amount: 0.5 }}
//             >
//                 <Typography
//                     variant="h4"
//                     fontWeight={900}
//                     color={currentColors.textPrimary}
//                     sx={{ mb: 1, textAlign: 'center' }}
//                 >
//                     Drop in the Ledger. <span style={{ color: colors.accent }}>Start Reconciling Profit.</span>
//                 </Typography>
// 
//                 <Typography
//                     sx={{ color: currentColors.textDim, mb: 6, textAlign: 'center' }}
//                 >
//                     Get started in minutes with our straightforward API. Replace your existing calls with minimal code changes.
//                 </Typography>
//             </motion.div>
// 
//             <Grid container spacing={4}>
//                 <Grid item xs={12} md={6}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//                         {steps.map((step, index) => (
//                             <motion.div
//                                 key={step.n}
//                                 initial={{ opacity: 0, x: -50 }}
//                                 whileInView={{ opacity: 1, x: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 viewport={{ once: true, amount: 0.8 }}
//                             >
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                     <Box
//                                         sx={{
//                                             width: 28,
//                                             height: 28,
//                                             borderRadius: '50%',
//                                             bgcolor: colors.lucraGold,
//                                             color: currentColors.card,
//                                             display: 'grid',
//                                             placeItems: 'center',
//                                             fontWeight: 800,
//                                             mr: 2
//                                         }}
//                                     >
//                                         {step.n}
//                                     </Box>
//                                     <Typography
//                                         variant="h6"
//                                         fontWeight={800}
//                                         color={currentColors.textPrimary}
//                                     >
//                                         {step.title}
//                                     </Typography>
//                                 </Box>
//                                 <Typography
//                                     variant="body2"
//                                     sx={{ ml: 6, color: currentColors.textDim }}
//                                 >
//                                     {step.body}
//                                 </Typography>
//                             </motion.div>
//                         ))}
// 
//                         <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//                             <Button
//                                 variant="contained"
//                                 size="large"
//                                 sx={{
//                                     bgcolor: colors.accent,
//                                     color: currentColors.bgTop,
//                                     fontWeight: 800,
//                                     '&:hover': { bgcolor: colors.accentHover }
//                                 }}
//                             >
//                                 Get the SDK →
//                             </Button>
//                             <Button
//                                 variant="outlined"
//                                 size="large"
//                                 sx={{
//                                     borderColor: colors.accent,
//                                     color: colors.accent,
//                                     fontWeight: 700,
//                                     '&:hover': { bgcolor: `${colors.accent}14` }
//                                 }}
//                             >
//                                 View Docs →
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Grid>
// 
//                 {/* Code Block */}
//                 <Grid item xs={12} md={6}>
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true, amount: 0.3 }}
//                     >
//                         <Paper
//                             sx={{
//                                 bgcolor: colors.dark.bgTop,
//                                 color: 'white',
//                                 p: 2,
//                                 borderRadius: 2,
//                                 border: `1px solid ${colors.accent}44`,
//                                 height: '100%'
//                             }}
//                         >
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     justifyContent: 'space-between',
//                                     alignItems: 'center',
//                                     mb: 1,
//                                     borderBottom: '1px solid #333'
//                                 }}
//                             >
//                                 <Typography variant="caption" sx={{ color: colors.accent }}>
//                                     Code Comparison
//                                 </Typography>
//                                 <Button size="small" sx={{ color: colors.accent }}>
//                                     Copy
//                                 </Button>
//                             </Box>
// 
//                             <Box
//                                 component="pre"
//                                 sx={{
//                                     overflowX: 'auto',
//                                     bgcolor: colors.dark.bgTop,
//                                     borderRadius: 1,
//                                     p: 1,
//                                     color: '#C8C8C8'
//                                 }}
//                             >
//                                 <Typography
//                                     component="code"
//                                     sx={{
//                                         fontSize: '0.85rem',
//                                         lineHeight: 1.5,
//                                         fontFamily: 'monospace'
//                                     }}
//                                 >
//                                     {codeSnippet}
//                                 </Typography>
//                             </Box>
//                         </Paper>
//                     </motion.div>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };
// 
// export default OmecaDeveloperIntegration;

import React, { useState, useEffect, createContext, useMemo } from "react";
import { Container, Typography, Box, Paper, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// 1. THEME & CONTEXT SETUP
// ==========================================

// COPY OF YOUR PROVIDED THEME (For Preview Only)
const colors = {
  // Shared colors
  accent: '#00d2e5ff',
  accentHover: '#00caa8',
  lucraGold: '#37d4bcff',
  errorRed: '#FF4136',
  successGreen: '#2ECC40',
  logoDark: '#1A334A',

  // Dark Mode specific colors
  dark: {
    bgTop: '#1A2433',
    bgGradA: '#2A344A',
    bgGradB: '#111827',
    card: '#243040',
    textDim: 'rgba(255,255,255,0.78)',
    textPrimary: '#F0F3F7',
  },

  // Light Mode specific colors
  light: {
    bgTop: '#F8F9FA',
    bgGradA: '#E6F4F1',
    bgGradB: '#D8E8E6',
    card: '#FFFFFF',
    textDim: 'rgba(0,0,0,0.65)',
    textPrimary: '#1F2937',
  }
};

const ColorModeContext = createContext({ mode: "dark" });

// ==========================================
// 2. DATA & CONFIGURATION
// ==========================================

const rawNodes = [
  {
    id: "tax",
    label: "Tax",
    logos: [
      { name: "Avalara", color: "#f97316", bg: "#fff7ed" },
      { name: "Vertex", color: "#6366f1", bg: "#eef2ff" },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    logos: [
      { name: "Salesforce", color: "#0ea5e9", bg: "#e0f2fe" },
      { name: "HubSpot", color: "#f97316", bg: "#ffedd5" },
    ],
  },
  {
    id: "warehouse",
    label: "Data",
    logos: [
      { name: "Snowflake", color: "#0ea5e9", bg: "#e0f2fe" },
      { name: "BigQuery", color: "#ea4335", bg: "#fee2e2" },
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    logos: [
      { name: "Gusto", color: "#ef4444", bg: "#fee2e2" },
      { name: "ADP", color: "#dc2626", bg: "#fecaca" },
    ],
  },
  {
    id: "fpa",
    label: "FP&A",
    logos: [
      { name: "Anaplan", color: "#2563eb", bg: "#dbeafe" },
      { name: "Cube", color: "#10b981", bg: "#d1fae5" },
    ],
  },
  {
    id: "bank",
    label: "Banking",
    logos: [
      { name: "JPMorgan", color: "#334155", bg: "#f1f5f9" },
      { name: "Mercury", color: "#3b82f6", bg: "#eff6ff" },
    ],
  },
  {
    id: "revenue",
    label: "Revenue", // NEW NODE
    logos: [
              { name: "Zuora", color: "#8b5cf6", bg: "#f5f3ff" },
      { name: "Paddle", color: "#8b5cf6", bg: "#f5f3ff" },
      { name: "ProfitWell", color: "#10b981", bg: "#ecfdf5" },
    ],
  },
  {
    id: "billing",
    label: "Billing", // NEW NODE
    logos: [
      { name: "Stripe", color: "#6366f1", bg: "#eef2ff" },
      { name: "Zuora", color: "#0ea5e9", bg: "#f0f9ff" },
    ],
  },
  {
    id: "ap",
    label: "P2P",
    logos: [
      { name: "Bill.com", color: "#ff6b35", bg: "#fff0eb" },
      { name: "Ramp", color: "#eab308", bg: "#fefce8" },
    ],
  },
];

// ==========================================
// 3. SUB-COMPONENTS
// ==========================================

const SwitchingLogo = ({ logos, mode }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalTime = 3000 + Math.random() * 1000;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [logos.length]);

  const currentLogo = logos[index];

  return (
    <Paper
      elevation={mode === 'dark' ? 4 : 2}
      sx={{
        width: 140,
        height: 50,
        position: "relative",
        overflow: "hidden",
        bgcolor: colors[mode].card,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
        zIndex: 2, // Ensure it sits above lines
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLogo.name}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1.5,
              backgroundColor: currentLogo.bg,
              color: currentLogo.color,
              fontWeight: 700,
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: currentLogo.color,
              }}
            />
            {currentLogo.name}
          </Box>
        </motion.div>
      </AnimatePresence>
    </Paper>
  );
};

// ==========================================
// 4. MAIN EXPORT
// ==========================================

const OmecaSystemMap = () => {
  // UNCOMMENT IN APP: const { mode } = useContext(ColorModeContext);
  const mode = "dark"; 
  const currentColors = colors[mode];
  const isMobile = useMediaQuery('(max-width:800px)');

  const hubGradient = `linear-gradient(135deg, ${colors.accent}, ${colors.lucraGold})`;
  const lineStroke = mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

  // --- RADIAL POSITIONING LOGIC ---
  // We want to distribute the 9 nodes in a circle.
  // Start at -90deg (12 o'clock)
  const nodes = useMemo(() => {
    const totalNodes = rawNodes.length;
    const radiusX = isMobile ? 42 : 42; // Percentage of container width
    const radiusY = isMobile ? 42 : 42; // Percentage of container height
    // Push labels slightly inward compared to the logos
    const labelInsetFactor = 0.65; // Label is at 65% of the distance to the logo

    return rawNodes.map((node, i) => {
      const angleDeg = (360 / totalNodes) * i - 90; // Start at top
      const angleRad = (angleDeg * Math.PI) / 180;

      // Calculate position of the LOGO (Outer ring)
      // 50 is the center point
      const logoLeft = 50 + radiusX * Math.cos(angleRad);
      const logoTop = 50 + radiusY * Math.sin(angleRad);

      // Calculate position of the LABEL (Inner ring - on the line)
      const labelLeft = 50 + (radiusX * labelInsetFactor) * Math.cos(angleRad);
      const labelTop = 50 + (radiusY * labelInsetFactor) * Math.sin(angleRad);

      return {
        ...node,
        logoPos: { left: `${logoLeft}%`, top: `${logoTop}%` },
        labelPos: { left: `${labelLeft}%`, top: `${labelTop}%` },
      };
    });
  }, [isMobile]);

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <Box 
      sx={{ 
        bgcolor: currentColors.bgTop, 
        minHeight: '100vh', 
        py: { xs: 8, md: 10 },
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center", position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{ 
              mb: 2, 
              color: currentColors.textPrimary,
              letterSpacing: '-0.02em',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            All continuous. <Box component="span" sx={{ color: colors.accent }}>All in one system.</Box>
          </Typography>

          <Typography
            sx={{
              color: currentColors.textDim,
              maxWidth: 720,
              mx: "auto",
              mb: 6,
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            Every financial domain unified around a single continuous truth layer.
          </Typography>
        </motion.div>

        {/* Map Container */}
        <Box
          sx={{
            position: "relative",
            mx: "auto",
            width: "100%",
            maxWidth: 1000,
            // Force a square-ish aspect ratio to keep radial perfectly round visually
            aspectRatio: "1/1", 
            maxHeight: 800,
          }}
        >
          
          {/* CENTER HUB */}
<Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 20,

    // --- TRUE CIRCLE + RESPONSIVE SCALING ---
    width: { xs: 110, sm: 150, md: 200 },
    height: { xs: 110, sm: 150, md: 200 },
  }}
>
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    animate={{
      boxShadow: [
        "0 0 0 rgba(0,0,0,0.4)",
        "0 0 60px rgba(0,0,0,0.2)"
      ]
    }}
    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
    style={{ width: "100%", height: "100%" }}
  >
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",       // <--- REAL CIRCLE
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: hubGradient,
        backdropFilter: "blur(14px)",
        boxShadow: `0 24px 48px -12px ${
          mode === "dark" ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)"
        }`,
        border: "1px solid rgba(255,255,255,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glossy overlay */}
      <Box
        sx={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 60%)",
          transform: "rotate(25deg)",
          pointerEvents: "none",
        }}
      />

      <Typography
        variant="h5"
        fontWeight={900}
        sx={{
          color: colors.logoDark,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          mb: 0.3,
          fontSize: { xs: "1rem", sm: "1.35rem", md: "1.75rem" },
        }}
      >
        OMECA
      </Typography>

      <Typography
        sx={{
          color: colors.logoDark,
          fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.65rem" },
          opacity: 0.85,
          fontWeight: 800,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Continuous Truth
      </Typography>
    </Box>
  </motion.div>
</Box>


          {/* BACKGROUND CONNECTOR LINES */}
          <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
              <defs>
                 {/* Define gradients or markers if needed */}
              </defs>
              {nodes.map((node, i) => (
                <g key={`connector-${node.id}`}>
                  {/* Line from Center to Logo */}
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2={node.logoPos.left}
                    y2={node.logoPos.top}
                    stroke={lineStroke}
                    // strokeWidth="1.5"
                    strokeWidth="1.25"
                    // strokeDasharray="5 5" 
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </g>
              ))}
            </svg>
          </Box>

          {/* NODES LAYER */}
          {nodes.map((node) => (
            <React.Fragment key={node.id}>
              
              {/* 1. LABEL (On the line) */}
              <Box
                sx={{
                  position: "absolute",
                  top: node.labelPos.top,
                  left: node.labelPos.left,
                  transform: "translate(-50%, -50%)",
                  zIndex: 15, // Above line, below logo
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 10,
                    fontWeight: 800,
                    fontSize: "0.65rem",
                    color: mode === 'dark' ? '#94a3b8' : '#64748b',
                    // The background must be opaque to "break" the line visually
                    bgcolor: colors[mode].bgTop, 
                    border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {node.label}
                </Paper>
              </Box>

              {/* 2. LOGO (End of the line) */}
              <Box
                sx={{
                  position: "absolute",
                  top: node.logoPos.top,
                  left: node.logoPos.left,
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }}
              >
                <SwitchingLogo logos={node.logos} mode={mode} />
              </Box>

            </React.Fragment>
          ))}

        </Box>
      </Container>
    </Box>
  );
};

export default OmecaSystemMap;