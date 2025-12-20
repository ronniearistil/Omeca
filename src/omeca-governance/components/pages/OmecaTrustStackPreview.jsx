// import React, { useState, useContext } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Container,
//   AppBar,
//   Toolbar,
//   Chip,
//   Stack,
// } from "@mui/material";
// import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
// import {
//   Gavel as GovernanceIcon,
//   Sync as LedgerIcon,
//   Calculate as CoreIcon,
//   ArrowBack,
//   ArrowForward,
//   Bolt,
//   InfoOutlined
// } from "@mui/icons-material";
// 
// // --- GLOBAL IMPORTS ---
// import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
// import { colors } from "../../../shared/layouts/theme/theme.js";
// import ThemeToggleButton from "../../../shared/layouts/ThemeToggleButton.jsx";
// import BackHomeButton from "../../../shared/ui/BackHomeButton.jsx";
// 
// // --- DASHBOARD IMPORTS ---
// import OmecaGovernancePage from "./OmecaGovernancePage";
// import OmecaOperationalControlPage from "./OmecaCorePage";
// import OmecaReconciliationPage from "./OmecaLedgerPage";
// import { auth } from "../../../lib/firebase.js";
// 
// 
// // ✅ LIVE ENGINE DASHBOARD
// import LiveEngineDashboard from "../../../omeca-core/components/ui/LiveEngineDashboard";
// 
// // --- VISUAL ASSETS ---
// const NoiseOverlay = () => (
//   <Box
//     sx={{
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       pointerEvents: "none", zIndex: 0, opacity: 0.03,
//       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//     }}
//   />
// );
// 
// const GridBackground = ({ isDark }) => (
//   <Box
//     sx={{
//       position: "absolute", top: 0, left: 0, right: 0, height: "100%",
//       overflow: "hidden", zIndex: 0,
//       maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
//     }}
//   >
//     <Box
//       sx={{
//         width: "100%", height: "100%",
//         backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
//         linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
//         backgroundSize: "60px 60px",
//       }}
//     />
//   </Box>
// );
// 
// // --- INTERACTIVE CARD COMPONENT ---
// const SpotlightCard = ({ children, color, onClick, delay = 0 }) => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === "dark";
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
// 
//   function handleMouseMove({ currentTarget, clientX, clientY }) {
//     const { left, top } = currentTarget.getBoundingClientRect();
//     mouseX.set(clientX - left);
//     mouseY.set(clientY - top);
//   }
// 
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.5 }}
//       onMouseMove={handleMouseMove}
//       onClick={onClick}
//       style={{ height: "100%", cursor: 'pointer' }}
//     >
//       <Box
//         sx={{
//           height: "100%",
//           position: "relative",
//           borderRadius: 4,
//           border: "1px solid",
//           borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
//           bgcolor: isDark ? "rgba(10,10,12,0.6)" : "rgba(255,255,255,0.6)",
//           backdropFilter: "blur(12px)",
//           overflow: "hidden",
//           transition: "all 0.3s ease",
//           "&:hover": { 
//             transform: "translateY(-4px)",
//             borderColor: `${color}40`,
//             boxShadow: `0 10px 40px -10px ${color}20`
//           }
//         }}
//       >
//         <motion.div
//           style={{
//             pointerEvents: "none",
//             position: "absolute", inset: 0, zIndex: 1,
//             background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}10, transparent 80%)`,
//           }}
//         />
//         <Box sx={{ p: 4, position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
//           {children}
//         </Box>
//       </Box>
//     </motion.div>
//   );
// };
// 
// const DASHBOARDS = [
//   {
//     id: "core",
//     layer: "L1: CORE",
//     name: "Operational Control",
//     tagline: "Real-Time Integrity",
//     desc: "Own the verified data stream across cash, spend, and forecast operations.",
//     icon: CoreIcon,
//     color: colors.accent,
//     component: OmecaOperationalControlPage
//   },
//   {
//     id: "ledger",
//     layer: "L2: LEDGER",
//     name: "Continuous Close",
//     tagline: "Auto-Reconciliation",
//     desc: "Automate every GAAP/IFRS posting rule. Books that close themselves.",
//     icon: LedgerIcon,
//     color: "#34d399",
//     component: OmecaReconciliationPage
//   },
//   {
//     id: "governance",
//     layer: "L3: GOVERNANCE",
//     name: "Verifiable Trust",
//     tagline: "Immutable Proof",
//     desc: "Record the 'why' behind every transaction as immutable, audit-ready proof.",
//     icon: GovernanceIcon,
//     color: colors.lucraGold,
//     component: OmecaGovernancePage
//   }
// ];
// 
// // --- SELECTION VIEW ---
// const SelectionView = ({ setPage }) => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === "dark";
//   const palette = colors[mode];
// 
//   return (
//     <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 12 }}>
//       
//       {/* HEADER */}
//       <Box sx={{ mb: 6, textAlign: "left" }}>
//         <Chip 
//           label="LIVE ENVIRONMENT" 
//           icon={<Bolt sx={{ fontSize: '14px !important', color: colors.lucraGold }} />}
//           sx={{ 
//             mb: 2, fontWeight: 700, fontSize: "0.65rem", letterSpacing: 1,
//             bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
//             color: palette.textDim, 
//             border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
//             pl: 0.5
//           }} 
//         />
//         <Typography variant="h2" fontWeight={800} sx={{ 
//           fontSize: { xs: "2rem", md: "3rem" }, 
//           letterSpacing: "-0.03em",
//           lineHeight: 1.1,
//           mb: 1,
//           color: palette.textPrimary
//         }}>
//           The <span style={{ color: colors.accent }}>Trust Stack.</span>
//         </Typography>
//         <Typography variant="h6" sx={{ color: palette.textDim, fontWeight: 400, fontSize: '1rem', maxWidth: 600 }}>
//            Real-time visibility into the autonomous engine.
//         </Typography>
//       </Box>
// 
//       {/* TOP SECTION: ENGINE DASHBOARD */}
//       {/* <Box sx={{ mb: 8 }}>
//         <Typography variant="overline" sx={{ color: palette.textDim, fontWeight: 700, letterSpacing: 2, mb: 2, display: 'block' }}>
//           SYSTEM STATUS
//         </Typography>
//         <LiveEngineDashboard />
//       </Box> */}
//   {/* TOP SECTION: ENGINE DASHBOARD (Protected) */}
// <Box
//   sx={{ mb: 8 }}
//   // onClick={() => {
//   //   if (!window?.auth?.currentUser) {
//   //     window.location.href = "/partner-login";
//   //   }
//   // }}
//   onClick={() => {
//   if (!auth.currentUser) 
//     {
//     window.location.href = "/partner-login";
//     return;
//   }
//   setPage("core");  // OPEN LIVE ENGINE DASHBOARD
// }}
// 
//   style={{ cursor: "pointer" }}
// >
//   <Typography variant="overline" sx={{ color: palette.textDim, fontWeight: 700, letterSpacing: 2, mb: 2, display: 'block' }}>
//     SYSTEM STATUS
//   </Typography>
// 
//   <LiveEngineDashboard />
// </Box>
// 
// 
//       {/* BOTTOM SECTION: AVAILABLE MODULES */}
//       <Box>
//         <Typography variant="overline" sx={{ color: palette.textDim, fontWeight: 700, letterSpacing: 2, mb: 3, display: 'block' }}>
//           AVAILABLE MODULES
//         </Typography>
//         
//         {/* Grid Layout for Modules: 3 Columns on Desktop */}
//       {/* Grid Layout for Modules: 3 Columns on Desktop */}
// <Grid container spacing={4}>
//   {DASHBOARDS.map((d, i) => (
//     <Grid item xs={12} md={4} key={d.id}>
//       <SpotlightCard
//         color={d.color}
//         delay={i * 0.1}
//         // onClick={() => {
//         //   // Protect module entry
//         //   if (!window?.auth?.currentUser) {
//         //     window.location.href = "/partner-login";
//         //     return;
//         //   }
//         //   setPage(d.id);
//         // }}
//         onClick={() => {
//   if (!auth.currentUser) {
//     window.location.href = "/partner-login";
//     return;
//   }
//   setPage(d.id);  // OPEN THE MODULE
// }}
// 
//       >
// 
//         {/* Module Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             mb: 3,
//           }}
//         >
//           <Box
//             sx={{
//               p: 1.5,
//               borderRadius: 3,
//               bgcolor: `${d.color}15`,
//               color: d.color,
//             }}
//           >
//             <d.icon fontSize="large" />
//           </Box>
// 
//           <Chip
//             label={d.layer}
//             size="small"
//             sx={{
//               fontWeight: 700,
//               fontSize: "0.6rem",
//               bgcolor: "transparent",
//               color: d.color,
//               border: `1px solid ${d.color}40`,
//             }}
//           />
//         </Box>
// 
//         {/* Name */}
//         <Typography
//           variant="h5"
//           fontWeight={700}
//           sx={{ color: palette.textPrimary, mb: 0.5 }}
//         >
//           {d.name}
//         </Typography>
// 
//         {/* Tagline */}
//         <Typography
//           variant="caption"
//           sx={{
//             fontFamily: "monospace",
//             color: palette.textDim,
//             display: "block",
//             mb: 2,
//           }}
//         >
//           {d.tagline}
//         </Typography>
// 
//         {/* Description */}
//         <Typography
//           variant="body2"
//           sx={{
//             color: palette.textDim,
//             mb: 4,
//             minHeight: "3em",
//           }}
//         >
//           {d.desc}
//         </Typography>
// 
//         {/* Action Button */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             color: d.color,
//             fontWeight: 700,
//             fontSize: "0.9rem",
//           }}
//         >
//           Enter Module <ArrowForward sx={{ ml: 1, fontSize: 18 }} />
//         </Box>
// 
//       </SpotlightCard>
//     </Grid>
//   ))}
// </Grid>
//       </Box>
// 
//     </Container>
//   );
// };
// 
// // --- WRAPPER COMPONENT ---
// const OmecaTrustStackPreview = ({ setPage: setAppPage }) => {
// 
//   const [internalPage, setInternalPage] = useState("home");
//   
//   // Safety check for Theme Context
//   const themeContext = useContext(ColorModeContext);
//   
//   if (!themeContext) {
//     return <Box sx={{ p: 4, color: 'white', bgcolor: '#000' }}>Error: Theme Context Missing</Box>;
//   }
// 
//   const { mode } = themeContext;
//   const isDark = mode === "dark";
//   const palette = colors[mode];
// 
//   const ActiveComponent = DASHBOARDS.find((x) => x.id === internalPage)?.component;
// 
//   return (
//     <Box sx={{ 
//       minHeight: "100vh", 
//       bgcolor: palette.bgTop, 
//       color: palette.textPrimary,
//       position: 'relative',
//       overflowX: 'hidden' 
//     }}>
//       <NoiseOverlay />
//       <GridBackground isDark={isDark} />
// 
//       {/* NAVBAR */}
//       <AppBar position="sticky" elevation={0} sx={{ bgcolor: isDark ? "rgba(11,15,23,0.8)" : "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, zIndex: 1100 }}>
//         <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             {internalPage !== "home" ? (
//               <Button startIcon={<ArrowBack />} onClick={() => setInternalPage("home")} sx={{ color: palette.textDim, textTransform: 'none', fontWeight: 600, "&:hover": { color: palette.textPrimary, bgcolor: 'transparent' } }}>
//                 Back to Stack
//               </Button>
//             ) : (
//               <BackHomeButton label="Exit Preview" sx={{ color: palette.textDim, opacity: 0.8 }} />
//             )}
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <ThemeToggleButton />
//           </Box>
//         </Toolbar>
//       </AppBar>
// 
//       {/* CONTENT */}
//       <Box sx={{ position: "relative", zIndex: 1 }}>
//         <AnimatePresence mode="wait">
//           {ActiveComponent ? (
//             <motion.div key="dashboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ minHeight: "80vh" }}>
//               <ActiveComponent setPage={setInternalPage} />
//             </motion.div>
//           ) : (
//             <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//               <SelectionView setPage={setInternalPage} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </Box>
//     </Box>
//   );
// };
// 
// export default OmecaTrustStackPreview;


import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  AppBar,
  Toolbar,
  Chip,
  Grid,
} from "@mui/material";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Gavel as GovernanceIcon,
  Sync as LedgerIcon,
  Calculate as CoreIcon,
  ArrowBack,
  ArrowForward,
  Bolt
} from "@mui/icons-material";

import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../../../shared/layouts/theme/theme.js";
import ThemeToggleButton from "../../../shared/layouts/ThemeToggleButton.jsx";
import BackHomeButton from "../../../shared/ui/BackHomeButton.jsx";

// Firebase
import { auth } from "../../../lib/firebase.js";

// Dashboard pages
import OmecaGovernancePage from "./OmecaGovernancePage";
import OmecaOperationalControlPage from "./OmecaCorePage";
import OmecaReconciliationPage from "./OmecaLedgerPage";

// LIVE ENGINE
import LiveEngineDashboard from "../../../omeca-core/components/ui/LiveEngineDashboard";

// Visuals
const NoiseOverlay = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const GridBackground = ({ isDark }) => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "100%",
      overflow: "hidden",
      zIndex: 0,
      maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
    }}
  >
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
          linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </Box>
);

// Spotlight Card
const SpotlightCard = ({ children, color, onClick, delay = 0 }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{ height: "100%", cursor: "pointer" }}
    >
      <Box
        sx={{
          height: "100%",
          position: "relative",
          borderRadius: 4,
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          bgcolor: isDark ? "rgba(10,10,12,0.6)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(12px)",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            borderColor: `${color}40`,
            boxShadow: `0 10px 40px -10px ${color}20`,
          },
        }}
      >
        <motion.div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}10, transparent 80%)`,
          }}
        />
        <Box sx={{ p: 4, position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Box>
    </motion.div>
  );
};

const DASHBOARDS = [
  {
    id: "core",
    layer: "L1: CORE",
    name: "Operational Control",
    tagline: "Pre-Execution Enforcement",
    desc: "Validates agent intent at the source. Blocks policy violations before they execute.",
    icon: CoreIcon,
    color: colors.accent,
    component: OmecaOperationalControlPage,
  },
  {
    id: "ledger",
    layer: "L2: LEDGER",
    name: "Continuous Accounting",
    tagline: "Auto-Reconciliation",
    desc: "Interprets approved agent actions. Applies policy and prepares ERP-ready entries.",
    icon: LedgerIcon,
    color: "#34d399",
    component: OmecaReconciliationPage,
  },
  {
    id: "governance",
    layer: "L3: GOVERNANCE",
    name: "Audit-Grade Integrity",
    tagline: "Immutable Attestation",
    desc: "Generates hash-chained evidence for every decision. Audit-ready proof, by default.",
    icon: GovernanceIcon,
    color: colors.lucraGold,
    component: OmecaGovernancePage,
  },
];

// Selection View
const SelectionView = ({ setPage, authUser }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  const palette = colors[mode];

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 12 }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: "left" }}>
        <Chip
          label="LIVE ENVIRONMENT"
          icon={<Bolt sx={{ fontSize: "14px !important", color: colors.lucraGold }} />}
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: 1,
            bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            color: palette.textDim,
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            pl: 0.5,
          }}
        />

        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            mb: 1,
            color: palette.textPrimary,
          }}
        >
          The <span style={{ color: colors.accent }}>Trust Stack.</span>
        </Typography>

        <Typography variant="h6" sx={{ color: palette.textDim, fontWeight: 400, fontSize: "1rem", maxWidth: 600 }}>
          Real-time visibility into the autonomous engine.
        </Typography>
      </Box>

      {/* System Status */}
      <Box
        sx={{ mb: 8, cursor: "pointer" }}
        onClick={() => {
          if (!authUser) {
            window.location.href = "/partner-login";
            return;
          }
          setPage("core");
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: palette.textDim, fontWeight: 700, letterSpacing: 2, mb: 2, display: "block" }}
        >
          SYSTEM STATUS
        </Typography>

        <LiveEngineDashboard />
      </Box>

      {/* Dashboard Cards */}
      <Box>
        <Typography
          variant="overline"
          sx={{ color: palette.textDim, fontWeight: 700, letterSpacing: 2, mb: 3, display: "block" }}
        >
          AVAILABLE MODULES
        </Typography>

        <Grid container spacing={4}>
          {DASHBOARDS.map((d, i) => (
            <Grid item xs={12} md={4} key={d.id}>
              <SpotlightCard
                color={d.color}
                delay={i * 0.1}
                onClick={() => {
                  if (!authUser) {
                    window.location.href = "/partner-login";
                    return;
                  }
                  setPage(d.id);
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: `${d.color}15`,
                      color: d.color,
                    }}
                  >
                    <d.icon fontSize="large" />
                  </Box>

                  <Chip
                    label={d.layer}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.6rem",
                      bgcolor: "transparent",
                      color: d.color,
                      border: `1px solid ${d.color}40`,
                    }}
                  />
                </Box>

                <Typography variant="h5" fontWeight={700} sx={{ color: palette.textPrimary, mb: 0.5 }}>
                  {d.name}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ fontFamily: "monospace", color: palette.textDim, display: "block", mb: 2 }}
                >
                  {d.tagline}
                </Typography>

                <Typography variant="body2" sx={{ color: palette.textDim, mb: 4, minHeight: "3em" }}>
                  {d.desc}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", color: d.color, fontWeight: 700, fontSize: "0.9rem" }}>
                  Enter Module <ArrowForward sx={{ ml: 1, fontSize: 18 }} />
                </Box>
              </SpotlightCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default function OmecaTrustStackPreview() {
  const [internalPage, setInternalPage] = useState("home");

  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  const palette = colors[mode];

  // 🔥 FIX: PRODUCTION-SAFE AUTH STATE
  const [authUser, setAuthUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setAuthUser(u);
      setAuthLoaded(true);
    });
    return () => unsub();
  }, []);

  if (!authLoaded) return null;

  const ActiveComponent = DASHBOARDS.find((x) => x.id === internalPage)?.component;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: palette.bgTop,
        color: palette.textPrimary,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <NoiseOverlay />
      <GridBackground isDark={isDark} />

      {/* NAVBAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: isDark ? "rgba(11,15,23,0.8)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {internalPage !== "home" ? (
              <Button
                startIcon={<ArrowBack />}
                onClick={() => setInternalPage("home")}
                sx={{
                  color: palette.textDim,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { color: palette.textPrimary, bgcolor: "transparent" },
                }}
              >
                Back to Stack
              </Button>
            ) : (
              <BackHomeButton
                label="Exit Preview"
                sx={{ color: palette.textDim, opacity: 0.8 }}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ThemeToggleButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* CONTENT */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {ActiveComponent ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ minHeight: "80vh" }}
            >
              <ActiveComponent setPage={setInternalPage} authUser={authUser} />
            </motion.div>
          ) : (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SelectionView setPage={setInternalPage} authUser={authUser} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
