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


import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Grid,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Chip,
  useMediaQuery
} from "@mui/material";
import { createTheme, ThemeProvider, styled, alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gavel as GovernanceIcon,
  Sync as LedgerIcon,
  Calculate as CoreIcon,
  Brightness4,
  Brightness7,
  ArrowBack,
  ArrowForward
} from "@mui/icons-material";

// --- DASHBOARD IMPORTS (Preserved) ---
import OmecaGovernancePage from "./OmecaGovernancePage";
import OmecaOperationalControlPage from "./OmecaCorePage";
import OmecaReconciliationPage from "./OmecaLedgerPage";

// --- DESIGN TOKENS ---
const tokens = {
  accent: "#00E5BE",
  lucraGold: "#D4AF37",
  success: "#2ECC40",
  gradients: {
    text: "linear-gradient(135deg, #00E5BE 0%, #D4AF37 100%)",
    cardDark: "linear-gradient(145deg, rgba(28,39,54,0.6) 0%, rgba(28,39,54,0.3) 100%)",
    cardLight: "linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
  }
};

// --- STYLED COMPONENTS ---

const GlassCard = styled(motion.div)(({ theme }) => ({
  height: "100%",
  background: theme.palette.mode === "dark" ? tokens.gradients.cardDark : tokens.gradients.cardLight,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: 24,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: theme.palette.mode === "dark" 
    ? "0 8px 32px 0 rgba(0, 0, 0, 0.3)" 
    : "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  transition: "border-color 0.3s ease",
  "&:hover": {
    border: `1px solid ${alpha(tokens.accent, 0.5)}`,
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: tokens.gradients.text,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  width: "fit-content",
}));

const NavGlass = styled(AppBar)(({ theme }) => ({
  background: alpha(theme.palette.background.default, 0.7),
  backdropFilter: "blur(12px)",
  boxShadow: "none",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
  zIndex: 1200,
}));

// --- DATA MODEL ---
const DASHBOARDS = [
  {
    id: "core",
    layer: "Layer 1",
    name: "Omeca Core",
    tagline: "Operational Control",
    desc: "Real-time spend integrity and margin signals. The verified data stream.",
    icon: CoreIcon,
    color: tokens.success,
    component: OmecaOperationalControlPage,
  },
  {
    id: "ledger",
    layer: "Layer 2",
    name: "Omeca Ledger",
    tagline: "Continuous Close",
    desc: "Automated reconciliation and subledger alignment. Books that close themselves.",
    icon: LedgerIcon,
    color: tokens.accent,
    component: OmecaReconciliationPage,
  },
  {
    id: "governance",
    layer: "Layer 3",
    name: "Omeca Governance",
    tagline: "Verifiable Trust",
    desc: "Immutable proofs and explainable compliance for every AI-driven transaction.",
    icon: GovernanceIcon,
    color: tokens.lucraGold,
    component: OmecaGovernancePage,
  },
];

// --- SUB-COMPONENTS ---

const SelectionView = ({ setPage }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 8 }, pb: 10 }}>
      <Box sx={{ mb: 8, textAlign: { xs: "left", md: "center" }, display: "flex", flexDirection: "column", alignItems: { xs: "flex-start", md: "center" } }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <GradientText variant={isMobile ? "h3" : "h2"} fontWeight={800} gutterBottom>
            The Trust Stack
          </GradientText>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Typography variant={isMobile ? "body1" : "h5"} color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.6 }}>
            Interact with the three layers of the Self-Driving Cognitive ERP. 
            Select a module to enter the dashboard.
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={3}>
        {DASHBOARDS.map((d, i) => (
          <Grid item xs={12} md={4} key={d.id}>
            <GlassCard
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              onClick={() => setPage(d.id)}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: "12px", 
                  bgcolor: alpha(d.color, 0.15), 
                  color: d.color 
                }}>
                  <d.icon fontSize="medium" />
                </Box>
                <Chip 
                  label={d.layer} 
                  size="small" 
                  sx={{ 
                    fontWeight: 700, 
                    bgcolor: alpha(d.color, 0.1), 
                    color: d.color,
                    border: `1px solid ${alpha(d.color, 0.2)}`
                  }} 
                />
              </Box>

              <Typography variant="h5" fontWeight={700} gutterBottom>
                {d.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 4, lineHeight: 1.7 }}>
                {d.desc}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", color: d.color, fontWeight: 600 }}>
                <Typography variant="button" sx={{ mr: 1 }}>Launch</Typography>
                <ArrowForward fontSize="small" />
              </Box>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const OmecaTrustStackPreview = ({ setPage: setAppPage }) => {
  const [internalPage, setInternalPage] = useState("home");
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: tokens.accent },
      background: { 
        default: mode === 'dark' ? "#0F1521" : "#F3F6F9", 
        paper: mode === 'dark' ? "#1C2736" : "#FFFFFF" 
      },
      text: { 
        primary: mode === 'dark' ? "#F0F3F7" : "#1F2937", 
        secondary: mode === 'dark' ? alpha("#fff", 0.6) : alpha("#000", 0.6) 
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 12 },
        },
      },
    },
  }), [mode]);

  const ActiveComponent = DASHBOARDS.find((x) => x.id === internalPage)?.component;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* STICKY GLASS HEADER */}
      <NavGlass position="sticky">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {internalPage !== "home" ? (
              <Button 
                startIcon={<ArrowBack />} 
                onClick={() => setInternalPage("home")}
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                Back to Stack
              </Button>
            ) : (
              <Button 
                startIcon={<ArrowBack />} 
                onClick={() => setAppPage && setAppPage("home")}
                color="inherit"
                sx={{ opacity: 0.7 }}
              >
                Exit
              </Button>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {internalPage !== "home" && (
               <Typography variant="subtitle2" sx={{ display: { xs: 'none', sm: 'block' }, color: "text.secondary", mr: 2 }}>
                 {DASHBOARDS.find(d => d.id === internalPage)?.name}
               </Typography>
            )}
            <IconButton 
              onClick={() => setMode((prev) => (prev === "light" ? "dark" : "light"))}
              sx={{ 
                bgcolor: alpha(theme.palette.text.primary, 0.05), 
                backdropFilter: "blur(4px)",
                "&:hover": { bgcolor: alpha(theme.palette.text.primary, 0.1) }
              }}
            >
              {mode === "dark" ? <Brightness7 sx={{ color: tokens.lucraGold }} /> : <Brightness4 sx={{ color: tokens.accent }} />}
            </IconButton>
          </Box>
        </Toolbar>
      </NavGlass>

      {/* CONTENT AREA */}
      <Box sx={{ minHeight: "100vh", position: "relative" }}>
        {/* Ambient Background Glows */}
        <Box sx={{ 
          position: "fixed", 
          top: -100, 
          left: "20%", 
          width: "40vw", 
          height: "40vw", 
          bgcolor: tokens.accent, 
          opacity: mode === 'dark' ? 0.07 : 0.04, 
          filter: "blur(120px)", 
          borderRadius: "50%", 
          zIndex: -1 
        }} />
        <Box sx={{ 
          position: "fixed", 
          bottom: -100, 
          right: "10%", 
          width: "30vw", 
          height: "30vw", 
          bgcolor: tokens.lucraGold, 
          opacity: mode === 'dark' ? 0.05 : 0.03, 
          filter: "blur(100px)", 
          borderRadius: "50%", 
          zIndex: -1 
        }} />

        {/* Page Transitions */}
        <AnimatePresence mode="wait">
          {ActiveComponent ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ minHeight: "90vh" }}
            >
              <ActiveComponent setPage={setInternalPage} />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SelectionView setPage={setInternalPage} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};

export default OmecaTrustStackPreview;