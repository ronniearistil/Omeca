// import React, { useState, useMemo, useContext } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Paper,
//   Grid,
//   Tooltip,
//   CssBaseline,
// } from "@mui/material";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import { motion } from "framer-motion";
// 
// import {
//   Gavel as GovernanceIcon,
//   Sync as LedgerIcon,
//   Calculate as CoreIcon,
//   Brightness4,
//   Brightness7,
// } from "@mui/icons-material";
// 
// // ---------------------------------------------------------------------
// //  COLORS (same as before but cleaned)
// // ---------------------------------------------------------------------
// const colors = {
//   accent: "#00E5BE",
//   lucraGold: "#D4AF37",
//   successGreen: "#2ECC40",
// 
//   dark: {
//     bgTop: "#0F1521",
//     bgGradA: "#1C2433",
//     bgGradB: "#0B0F17",
//     card: "#1C2736",
//     textPrimary: "#F0F3F7",
//     textDim: "rgba(255,255,255,0.70)",
//   },
//   light: {
//     bgTop: "#F8FAFC",
//     bgGradA: "#E7F5F1",
//     bgGradB: "#DCEEEE",
//     card: "#FFFFFF",
//     textPrimary: "#1F2937",
//     textDim: "rgba(0,0,0,0.65)",
//   },
// };
// 
// // ---------------------------------------------------------------------
// const ColorModeContext = React.createContext({
//   toggleColorMode: () => {},
//   mode: "dark",
// });
// 
// // ---------------------------------------------------------------------
// const GradientText = styled(Typography)(() => ({
//   background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   fontWeight: 900,
// }));
// 
// const CardWrapper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 14,
//   background:
//     theme.palette.mode === "dark" ? colors.dark.card : colors.light.card,
//   border: `1px solid ${theme.palette.divider}`,
//   cursor: "pointer",
//   transition: "all .25s ease",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   "&:hover": {
//     transform: "translateY(-4px)",
//     borderColor: colors.accent,
//     boxShadow: "0 12px 26px rgba(0,0,0,0.25)",
//   },
// }));
// 
// // ---------------------------------------------------------------------
// // DASHBOARDS (unchanged)
// // ---------------------------------------------------------------------
// import OmecaGovernancePage from "./OmecaGovernancePage";
// import OmecaOperationalControlPage from "./OmecaCorePage";
// import OmecaReconciliationPage from "./OmecaLedgerPage";
// 
// const DASHBOARDS = [
//   {
//     id: "core",
//     layer: "L1",
//     name: "Omeca Core",
//     tagline: "Operational Control",
//     desc: "Real-time spend integrity, margin signals, and liquidity insights.",
//     icon: CoreIcon,
//     color: colors.successGreen,
//     component: OmecaOperationalControlPage,
//   },
//   {
//     id: "ledger",
//     layer: "L2",
//     name: "Omeca Ledger",
//     tagline: "Continuous Close",
//     desc: "Live reconciliation, subledger alignment, and posting consistency.",
//     icon: LedgerIcon,
//     color: colors.accent,
//     component: OmecaReconciliationPage,
//   },
//   {
//     id: "governance",
//     layer: "L3",
//     name: "Omeca Governance",
//     tagline: "Trust & Assurance",
//     desc: "Immutable proofs, explainable assurance, and full audit lineage.",
//     icon: GovernanceIcon,
//     color: colors.lucraGold,
//     component: OmecaGovernancePage,
//   },
// ];
// 
// // ---------------------------------------------------------------------
// // TRUST STACK HOME (clean layout, perfect mobile flow)
// // ---------------------------------------------------------------------
// const TrustStackHome = ({ setPage, mode }) => (
//   <Box
//     sx={{
//       minHeight: "100vh",
//       background: `linear-gradient(135deg, ${colors[mode].bgGradA}, ${colors[mode].bgGradB})`,
//       color: colors[mode].textPrimary,
//       py: { xs: 6, md: 10 },
//       px: { xs: 2, sm: 4, md: 6 },
//       display: "flex",
//       justifyContent: "center",
//     }}
//   >
//     <Box sx={{ maxWidth: 1200, width: "100%" }}>
// 
//       {/* Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.45 }}
//       >
//         <GradientText variant="h3" sx={{ textAlign: "center" }}>
//           The Omeca Trust Stack
//         </GradientText>
// 
//         <Typography
//           variant="h6"
//           sx={{
//             mt: 2,
//             maxWidth: 760,
//             mx: "auto",
//             textAlign: "center",
//             color: colors[mode].textDim,
//             lineHeight: 1.55,
//             fontWeight: 500,
//           }}
//         >
//           Explore an interactive prototype of Omeca’s three layers —  
//           Operational Control, Continuous Close, and Trust Assurance.
//         </Typography>
//       </motion.div>
// 
//       {/* Top Buttons */}
//       <Box
//         sx={{
//           mt: 5,
//           mb: 6,
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 1.5,
//         }}
//       >
//         {DASHBOARDS.map((d) => (
//           <Button
//             key={d.id}
//             variant="contained"
//             startIcon={<d.icon />}
//             onClick={() => setPage(d.id)}
//             sx={{
//               bgcolor: d.color,
//               color: "#0F1521",
//               borderRadius: 10,
//               textTransform: "none",
//               fontWeight: 800,
//               px: 3,
//               "&:hover": { opacity: 0.9, bgcolor: d.color },
//             }}
//           >
//             {d.layer}: {d.name}
//           </Button>
//         ))}
//       </Box>
// 
//       {/* Cards */}
//       <Grid container spacing={4}>
//         {DASHBOARDS.map((d, i) => (
//           <Grid key={d.id} item xs={12} sm={6} md={4}>
//             <motion.div
//               initial={{ opacity: 0, y: 14 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.08 }}
//             >
//               <CardWrapper onClick={() => setPage(d.id)}>
//                 {/* Icon Row */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                     mb: 2,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 44,
//                       height: 44,
//                       borderRadius: "50%",
//                       background: `${d.color}22`,
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <d.icon sx={{ color: d.color, fontSize: 26 }} />
//                   </Box>
// 
//                   <Box>
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         fontWeight: 700,
//                         letterSpacing: 0.5,
//                         color: d.color,
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       {d.layer} • {d.tagline}
//                     </Typography>
// 
//                     <Typography variant="h6" sx={{ fontWeight: 900 }}>
//                       {d.name}
//                     </Typography>
//                   </Box>
//                 </Box>
// 
//                 {/* Description */}
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: colors[mode].textDim,
//                     mb: 3,
//                     lineHeight: 1.55,
//                     minHeight: 64,
//                   }}
//                 >
//                   {d.desc}
//                 </Typography>
// 
//                 {/* CTA */}
//                 <Button
//                   variant="contained"
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setPage(d.id);
//                   }}
//                   sx={{
//                     mt: "auto",
//                     bgcolor: d.color,
//                     color: "#0F1521",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     "&:hover": { opacity: 0.9, bgcolor: d.color },
//                   }}
//                 >
//                   Open {d.layer} Dashboard
//                 </Button>
//               </CardWrapper>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   </Box>
// );
// 
// // ---------------------------------------------------------------------
// // MAIN ROUTER WRAPPER
// // ---------------------------------------------------------------------
// const OmecaTrustStackPreview = () => {
//   const [page, setPage] = useState("home");
//   const [mode, setMode] = useState("dark");
// 
//   const colorMode = useMemo(
//     () => ({
//       mode,
//       toggleColorMode: () =>
//         setMode((m) => (m === "light" ? "dark" : "light")),
//     }),
//     [mode]
//   );
// 
//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//           primary: { main: colors.accent },
//           background: {
//             default: colors[mode].bgTop,
//             paper: colors[mode].card,
//           },
//           text: {
//             primary: colors[mode].textPrimary,
//             secondary: colors[mode].textDim,
//           },
//           divider: colors[mode].textDim + "22",
//         },
//         typography: {
//           fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI"',
//         },
//       }),
//     [mode]
//   );
// 
//   const ActiveComponent =
//     DASHBOARDS.find((x) => x.id === page)?.component ?? null;
// 
//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
// 
//         {/* Theme Toggle */}
//         <Tooltip title="Toggle dark/light mode">
//           <IconButton
//             onClick={colorMode.toggleColorMode}
//             sx={{ position: "fixed", top: 16, right: 16, zIndex: 2000 }}
//           >
//             {mode === "dark" ? (
//               <Brightness7 sx={{ color: colors.lucraGold }} />
//             ) : (
//               <Brightness4 sx={{ color: colors.accent }} />
//             )}
//           </IconButton>
//         </Tooltip>
// 
//         {/* Back Button */}
//         {page !== "home" && (
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             style={{
//               position: "fixed",
//               top: 16,
//               left: 16,
//               zIndex: 2000,
//             }}
//           >
//             <Button
//               variant="contained"
//               onClick={() => setPage("home")}
//               sx={{
//                 bgcolor: colors.accent,
//                 color: "#0F1521",
//                 textTransform: "none",
//                 fontWeight: 700,
//               }}
//             >
//               Back to Trust Stack
//             </Button>
//           </motion.div>
//         )}
// 
//         {/* Router */}
//         <Box>
//           {ActiveComponent ? (
//             <ActiveComponent setPage={setPage} />
//           ) : (
//             <TrustStackHome setPage={setPage} mode={mode} />
//           )}
//         </Box>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };
// 
// export default OmecaTrustStackPreview;


import React, { useState, useMemo, useContext } from "react";
import { Box, Typography, Button, IconButton, Paper, Grid, Tooltip, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Gavel as GovernanceIcon, Sync as LedgerIcon, Calculate as CoreIcon, Brightness4, Brightness7, ArrowBack } from "@mui/icons-material";

// --- DASHBOARD IMPORTS (Keeping original structure) ---
import OmecaGovernancePage from "./OmecaGovernancePage";
import OmecaOperationalControlPage from "./OmecaCorePage";
import OmecaReconciliationPage from "./OmecaLedgerPage";

// --- COLORS ---
const colors = {
  accent: "#00E5BE",
  lucraGold: "#D4AF37",
  successGreen: "#2ECC40",
  dark: { bgTop: "#0F1521", card: "#1C2736", textPrimary: "#F0F3F7", textDim: "rgba(255,255,255,0.70)" },
  light: { bgTop: "#F8FAFC", card: "#FFFFFF", textPrimary: "#1F2937", textDim: "rgba(0,0,0,0.65)" },
};

const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: "dark" });

// --- CARD STYLES ---
const CardWrapper = styled(Paper)(({ theme, active }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  background: theme.palette.mode === "dark" ? colors.dark.card : colors.light.card,
  border: `1px solid ${active ? colors.accent : theme.palette.divider}`,
  cursor: "pointer",
  height: "100%",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": { transform: "translateY(-6px)", borderColor: colors.accent, boxShadow: "0 12px 30px rgba(0,0,0,0.2)" },
}));

const DASHBOARDS = [
  {
    id: "core",
    layer: "L1",
    name: "Omeca Core",
    tagline: "Operational Control",
    desc: "Real-time spend integrity and margin signals. The verified data stream.", // [cite: 72, 80]
    icon: CoreIcon,
    color: colors.successGreen,
    component: OmecaOperationalControlPage,
  },
  {
    id: "ledger",
    layer: "L2",
    name: "Omeca Ledger",
    tagline: "Continuous Close",
    desc: "Automated reconciliation and subledger alignment. Books that close themselves.", // [cite: 74, 82]
    icon: LedgerIcon,
    color: colors.accent,
    component: OmecaReconciliationPage,
  },
  {
    id: "governance",
    layer: "L3",
    name: "Omeca Governance",
    tagline: "Verifiable Trust",
    desc: "Immutable proofs and explainable compliance for every AI-driven transaction.", // [cite: 75, 86]
    icon: GovernanceIcon,
    color: colors.lucraGold,
    component: OmecaGovernancePage,
  },
];

const TrustStackHome = ({ setPage, mode }) => (
  <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 10, px: 3 }}>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", maxWidth: 800 }}>
      <Typography variant="h3" fontWeight={900} gutterBottom sx={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.lucraGold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Explore the Trust Stack
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>
        Interact with the three layers of the Self-Driving Cognitive ERP.
      </Typography>
    </motion.div>

    <Grid container spacing={4} maxWidth="lg">
      {DASHBOARDS.map((d, i) => (
        <Grid item xs={12} md={4} key={d.id}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <CardWrapper onClick={() => setPage(d.id)}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${d.color}15`, width: "fit-content", mb: 3 }}>
                <d.icon sx={{ color: d.color, fontSize: 32 }} />
              </Box>
              <Typography variant="overline" sx={{ color: d.color, fontWeight: 800, letterSpacing: 1 }}>{d.layer}</Typography>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>{d.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, minHeight: 40 }}>{d.desc}</Typography>
              <Button size="small" sx={{ color: d.color, fontWeight: 700 }}>Launch Dashboard →</Button>
            </CardWrapper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const OmecaTrustStackPreview = ({ setPage: setAppPage }) => {
  const [internalPage, setInternalPage] = useState("home");
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(() => ({ mode, toggleColorMode: () => setMode((m) => (m === "light" ? "dark" : "light")) }), [mode]);
  
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: colors.accent },
      background: { default: mode === 'dark' ? colors.dark.bgTop : colors.light.bgTop, paper: mode === 'dark' ? colors.dark.card : colors.light.card },
      text: { primary: mode === 'dark' ? colors.dark.textPrimary : colors.light.textPrimary, secondary: mode === 'dark' ? colors.dark.textDim : colors.light.textDim },
      divider: mode === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    },
    typography: { fontFamily: 'Inter, sans-serif' }
  }), [mode]);

  const ActiveComponent = DASHBOARDS.find((x) => x.id === internalPage)?.component;

  // Handler to go completely back to main landing page
  const handleExit = () => setAppPage("home");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        {/* GLOBAL NAV CONTROLS */}
        <Box sx={{ position: "fixed", top: 20, left: 20, right: 20, zIndex: 1200, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
          {/* Back Button */}
          <Box sx={{ pointerEvents: "auto" }}>
             {internalPage !== "home" ? (
               <Button variant="contained" startIcon={<ArrowBack />} onClick={() => setInternalPage("home")} sx={{ bgcolor: "background.paper", color: "text.primary", fontWeight: 700, borderRadius: 8 }}>
                 Back to Stack
               </Button>
             ) : (
                <Button variant="text" startIcon={<ArrowBack />} onClick={handleExit} sx={{ color: "text.secondary", fontWeight: 700 }}>
                 Back to Homepage
               </Button>
             )}
          </Box>
          
          {/* Theme Toggle */}
          <Box sx={{ pointerEvents: "auto" }}>
             <IconButton onClick={colorMode.toggleColorMode} sx={{ bgcolor: "background.paper", boxShadow: 2 }}>
               {mode === "dark" ? <Brightness7 sx={{ color: colors.lucraGold }} /> : <Brightness4 sx={{ color: colors.accent }} />}
             </IconButton>
          </Box>
        </Box>

        {ActiveComponent ? <ActiveComponent setPage={setInternalPage} /> : <TrustStackHome setPage={setInternalPage} mode={mode} />}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default OmecaTrustStackPreview;