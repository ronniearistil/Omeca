// // src/omeca-governance/components/pages/OmecaTrustStackPreview.jsx
// 
// import React, { useState, useContext, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Grid,
//   Container,
//   AppBar,
//   Toolbar,
//   Chip,
//   useMediaQuery,
//   Stack
// } from "@mui/material";
// import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
// import {
//   Gavel as GovernanceIcon,
//   Sync as LedgerIcon,
//   Calculate as CoreIcon,
//   ArrowBack,
//   ArrowForward,
//   Bolt,
//   Security,
//   AllInclusive
// } from "@mui/icons-material";
// 
// // --- GLOBAL IMPORTS ---
// import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
// import { colors } from "../../../shared/layouts/theme/theme.js";
// import ThemeToggleButton from "../../../shared/layouts/ThemeToggleButton.jsx";
// import BackHomeButton from "../../../shared/ui/BackHomeButton.jsx";
// 
// // --- DASHBOARD IMPORTS (Keep your existing paths) ---
// import OmecaGovernancePage from "./OmecaGovernancePage";
// import OmecaOperationalControlPage from "./OmecaCorePage";
// import OmecaReconciliationPage from "./OmecaLedgerPage";
// 
// // --- VISUAL ASSETS (Matching Landing/Pricing) ---
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
// // --- SPOTLIGHT CARD (Interactive) ---
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
//           borderRadius: 5,
//           border: "1px solid",
//           borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
//           bgcolor: isDark ? "rgba(10,10,12,0.6)" : "rgba(255,255,255,0.6)",
//           backdropFilter: "blur(12px)",
//           overflow: "hidden",
//           transition: "transform 0.2s",
//           "&:hover": { transform: "translateY(-4px)" }
//         }}
//       >
//         <motion.div
//           style={{
//             pointerEvents: "none",
//             position: "absolute", inset: 0, zIndex: 1,
//             background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${color}15, transparent 80%)`,
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
// // --- DATA MODEL (Updated to match Deck) ---
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
//     color: "#34d399", // Mint Green
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
// // --- SELECTION VIEW (The "Home" of this section) ---
// const SelectionView = ({ setPage }) => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === "dark";
//   const palette = colors[mode];
// 
//   return (
//     <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 10 }, pb: 12 }}>
//       
//       {/* HEADER */}
//       <Box sx={{ mb: 10, textAlign: "center", maxWidth: 700, mx: "auto" }}>
//         <Chip 
//           label="INTERACTIVE PREVIEW" 
//           icon={<Bolt sx={{ fontSize: '14px !important', color: colors.lucraGold }} />}
//           sx={{ 
//             mb: 3, fontWeight: 700, fontSize: "0.7rem", letterSpacing: 1,
//             bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
//             color: palette.textDim, 
//             border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
//             pl: 0.5
//           }} 
//         />
//         <Typography variant="h2" fontWeight={800} sx={{ 
//           fontSize: { xs: "2.5rem", md: "4rem" }, 
//           letterSpacing: "-0.03em",
//           lineHeight: 1.1,
//           mb: 3,
//           color: palette.textPrimary
//         }}>
//           The <span style={{ color: colors.accent }}>Trust Stack.</span>
//         </Typography>
//         <Typography variant="h6" sx={{ color: palette.textDim, fontWeight: 400, lineHeight: 1.6 }}>
//            Interact with the three layers of the Self-Driving Cognitive ERP. 
//            Select a module below to launch the live dashboard.
//         </Typography>
//       </Box>
// 
//       {/* CARDS GRID */}
//       <Grid container spacing={4}>
//         {DASHBOARDS.map((d, i) => (
//           <Grid item xs={12} md={4} key={d.id}>
//             <SpotlightCard color={d.color} onClick={() => setPage(d.id)} delay={i * 0.1}>
//               
//               {/* Card Header */}
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
//                 <Box
//                   sx={{
//                     p: 1.5, borderRadius: 3,
//                     bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
//                     color: d.color
//                   }}
//                 >
//                   <d.icon />
//                 </Box>
//                 <Chip
//                   label={d.layer}
//                   size="small"
//                   sx={{
//                     fontWeight: 700, fontSize: "0.65rem", letterSpacing: 0.5,
//                     bgcolor: `${d.color}15`, color: d.color,
//                   }}
//                 />
//               </Box>
// 
//               <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: palette.textPrimary }}>
//                 {d.name}
//               </Typography>
//               
//               <Typography variant="caption" sx={{ 
//                 fontFamily: '"JetBrains Mono", monospace', 
//                 color: palette.textDim, display: 'block', mb: 2 
//               }}>
//                 {d.tagline}
//               </Typography>
// 
//               <Typography variant="body2" sx={{ color: palette.textDim, flexGrow: 1, mb: 4, lineHeight: 1.6 }}>
//                 {d.desc}
//               </Typography>
// 
//               {/* Action */}
//               <Box sx={{ display: "flex", alignItems: "center", color: d.color, fontWeight: 700, fontSize: '0.9rem' }}>
//                 Launch Dashboard <ArrowForward sx={{ ml: 1, fontSize: 18 }} />
//               </Box>
// 
//             </SpotlightCard>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };
// 
// // --- MAIN COMPONENT ---
// const OmecaTrustStackPreview = ({ setPage: setAppPage }) => {
//   const [internalPage, setInternalPage] = useState("home");
//   const { mode } = useContext(ColorModeContext);
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
//       {/* COMPONENT NAVBAR */}
//       <AppBar 
//         position="sticky" 
//         elevation={0}
//         sx={{
//           bgcolor: isDark ? "rgba(11,15,23,0.8)" : "rgba(255,255,255,0.8)",
//           backdropFilter: "blur(20px)",
//           borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
//           zIndex: 1100
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             {internalPage !== "home" ? (
//               <Button
//                 startIcon={<ArrowBack />}
//                 onClick={() => setInternalPage("home")}
//                 sx={{ 
//                     color: palette.textDim, 
//                     textTransform: 'none', fontWeight: 600,
//                     "&:hover": { color: palette.textPrimary, bgcolor: 'transparent' } 
//                 }}
//               >
//                 Back to Stack
//               </Button>
//             ) : (
//               // If on "Home" of preview, allow exit to main site
//               <BackHomeButton
//                 label="Exit Preview"
//                 sx={{ color: palette.textDim, opacity: 0.8 }}
//               />
//             )}
//           </Box>
// 
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             {internalPage !== "home" && (
//               <Chip 
//                 label={DASHBOARDS.find((d) => d.id === internalPage)?.name}
//                 size="small"
//                 sx={{ 
//                     display: { xs: "none", sm: "flex" },
//                     fontWeight: 700, bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
//                     color: palette.textPrimary 
//                 }}
//               />
//             )}
//             <ThemeToggleButton />
//           </Box>
//         </Toolbar>
//       </AppBar>
// 
//       {/* DYNAMIC CONTENT AREA */}
//       <Box sx={{ position: "relative", zIndex: 1 }}>
//         <AnimatePresence mode="wait">
//           {ActiveComponent ? (
//             <motion.div
//               key="dashboard"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               style={{ minHeight: "80vh" }}
//             >
//               {/* Pass setPage so dashboard can navigate if needed */}
//               <ActiveComponent setPage={setInternalPage} />
//             </motion.div>
//           ) : (
//             <motion.div 
//               key="home" 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               exit={{ opacity: 0 }}
//             >
//               <SelectionView setPage={setInternalPage} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </Box>
// 
//     </Box>
//   );
// };
// 
// export default OmecaTrustStackPreview;

import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Chip,
  Stack,
} from "@mui/material";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Gavel as GovernanceIcon,
  Sync as LedgerIcon,
  Calculate as CoreIcon,
  ArrowBack,
  ArrowForward,
  Bolt,
  InfoOutlined
} from "@mui/icons-material";

// --- GLOBAL IMPORTS ---
import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../../../shared/layouts/theme/theme.js";
import ThemeToggleButton from "../../../shared/layouts/ThemeToggleButton.jsx";
import BackHomeButton from "../../../shared/ui/BackHomeButton.jsx";

// --- DASHBOARD IMPORTS ---
import OmecaGovernancePage from "./OmecaGovernancePage";
import OmecaOperationalControlPage from "./OmecaCorePage";
import OmecaReconciliationPage from "./OmecaLedgerPage";
import { auth } from "../../../lib/firebase.js";


// ✅ LIVE ENGINE DASHBOARD
import LiveEngineDashboard from "../../../omeca-core/components/ui/LiveEngineDashboard";

// --- VISUAL ASSETS ---
const NoiseOverlay = () => (
  <Box
    sx={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0, opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const GridBackground = ({ isDark }) => (
  <Box
    sx={{
      position: "absolute", top: 0, left: 0, right: 0, height: "100%",
      overflow: "hidden", zIndex: 0,
      maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
    }}
  >
    <Box
      sx={{
        width: "100%", height: "100%",
        backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
        linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </Box>
);

// --- INTERACTIVE CARD COMPONENT ---
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
      style={{ height: "100%", cursor: 'pointer' }}
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
            boxShadow: `0 10px 40px -10px ${color}20`
          }
        }}
      >
        <motion.div
          style={{
            pointerEvents: "none",
            position: "absolute", inset: 0, zIndex: 1,
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
    tagline: "Real-Time Integrity",
    desc: "Own the verified data stream across cash, spend, and forecast operations.",
    icon: CoreIcon,
    color: colors.accent,
    component: OmecaOperationalControlPage
  },
  {
    id: "ledger",
    layer: "L2: LEDGER",
    name: "Continuous Close",
    tagline: "Auto-Reconciliation",
    desc: "Automate every GAAP/IFRS posting rule. Books that close themselves.",
    icon: LedgerIcon,
    color: "#34d399",
    component: OmecaReconciliationPage
  },
  {
    id: "governance",
    layer: "L3: GOVERNANCE",
    name: "Verifiable Trust",
    tagline: "Immutable Proof",
    desc: "Record the 'why' behind every transaction as immutable, audit-ready proof.",
    icon: GovernanceIcon,
    color: colors.lucraGold,
    component: OmecaGovernancePage
  }
];

// --- SELECTION VIEW ---
const SelectionView = ({ setPage }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  const palette = colors[mode];

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 }, pb: 12 }}>
      
      {/* HEADER */}
      <Box sx={{ mb: 6, textAlign: "left" }}>
        <Chip 
          label="LIVE ENVIRONMENT" 
          icon={<Bolt sx={{ fontSize: '14px !important', color: colors.lucraGold }} />}
          sx={{ 
            mb: 2, fontWeight: 700, fontSize: "0.65rem", letterSpacing: 1,
            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
            color: palette.textDim, 
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            pl: 0.5
          }} 
        />
        <Typography variant="h2" fontWeight={800} sx={{ 
          fontSize: { xs: "2rem", md: "3rem" }, 
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          mb: 1,
          color: palette.textPrimary
        }}>
          The <span style={{ color: colors.accent }}>Trust Stack.</span>
        </Typography>
        <Typography variant="h6" sx={{ color: palette.textDim, fontWeight: 400, fontSize: '1rem', maxWidth: 600 }}>
           Real-time visibility into the autonomous engine.
        </Typography>
      </Box>

      {/* TOP SECTION: ENGINE DASHBOARD */}
      {/* <Box sx={{ mb: 8 }}>
        <Typography variant="overline" sx={{ color: palette.textDim, fontWeight: 700, letterSpacing: 2, mb: 2, display: 'block' }}>
          SYSTEM STATUS
        </Typography>
        <LiveEngineDashboard />
      </Box> */}
  {/* TOP SECTION: ENGINE DASHBOARD (Protected) */}
<Box
  sx={{ mb: 8 }}
  onClick={() => {
    if (!window?.auth?.currentUser) {
      window.location.href = "/partner-login";
    }
  }}
  style={{ cursor: "pointer" }}
>
  <Typography variant="overline" sx={{ color: palette.textDim, fontWeight: 700, letterSpacing: 2, mb: 2, display: 'block' }}>
    SYSTEM STATUS
  </Typography>

  <LiveEngineDashboard />
</Box>


      {/* BOTTOM SECTION: AVAILABLE MODULES */}
      <Box>
        <Typography variant="overline" sx={{ color: palette.textDim, fontWeight: 700, letterSpacing: 2, mb: 3, display: 'block' }}>
          AVAILABLE MODULES
        </Typography>
        
        {/* Grid Layout for Modules: 3 Columns on Desktop */}
      {/* Grid Layout for Modules: 3 Columns on Desktop */}
<Grid container spacing={4}>
  {DASHBOARDS.map((d, i) => (
    <Grid item xs={12} md={4} key={d.id}>
      <SpotlightCard
        color={d.color}
        delay={i * 0.1}
        onClick={() => {
          // Protect module entry
          if (!window?.auth?.currentUser) {
            window.location.href = "/partner-login";
            return;
          }
          setPage(d.id);
        }}
      >

        {/* Module Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
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

        {/* Name */}
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: palette.textPrimary, mb: 0.5 }}
        >
          {d.name}
        </Typography>

        {/* Tagline */}
        <Typography
          variant="caption"
          sx={{
            fontFamily: "monospace",
            color: palette.textDim,
            display: "block",
            mb: 2,
          }}
        >
          {d.tagline}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: palette.textDim,
            mb: 4,
            minHeight: "3em",
          }}
        >
          {d.desc}
        </Typography>

        {/* Action Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: d.color,
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
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

// --- WRAPPER COMPONENT ---
const OmecaTrustStackPreview = ({ setPage: setAppPage }) => {
  const [internalPage, setInternalPage] = useState("home");
  
  // Safety check for Theme Context
  const themeContext = useContext(ColorModeContext);
  
  if (!themeContext) {
    return <Box sx={{ p: 4, color: 'white', bgcolor: '#000' }}>Error: Theme Context Missing</Box>;
  }

  const { mode } = themeContext;
  const isDark = mode === "dark";
  const palette = colors[mode];

  const ActiveComponent = DASHBOARDS.find((x) => x.id === internalPage)?.component;

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: palette.bgTop, 
      color: palette.textPrimary,
      position: 'relative',
      overflowX: 'hidden' 
    }}>
      <NoiseOverlay />
      <GridBackground isDark={isDark} />

      {/* NAVBAR */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: isDark ? "rgba(11,15,23,0.8)" : "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, zIndex: 1100 }}>
        <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {internalPage !== "home" ? (
              <Button startIcon={<ArrowBack />} onClick={() => setInternalPage("home")} sx={{ color: palette.textDim, textTransform: 'none', fontWeight: 600, "&:hover": { color: palette.textPrimary, bgcolor: 'transparent' } }}>
                Back to Stack
              </Button>
            ) : (
              <BackHomeButton label="Exit Preview" sx={{ color: palette.textDim, opacity: 0.8 }} />
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
            <motion.div key="dashboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ minHeight: "80vh" }}>
              <ActiveComponent setPage={setInternalPage} />
            </motion.div>
          ) : (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SelectionView setPage={setInternalPage} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default OmecaTrustStackPreview;