// // MelucraDashboardPreview.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { Box, Grid, Typography } from '@mui/material';
// import GavelIcon from '@mui/icons-material/Gavel';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { motion } from 'framer-motion';
// 
// // ✅ Import the shared theme + color context from your real dashboard
// import { colors, ColorModeContext } from "./OmecaGovernanceDashboardPage.jsx";
// 
// // --- Motion variant (same as dashboard) ---
// const fadeInUp = {
//   hidden: { y: 20, opacity: 0 },
//   show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
// };
// 
// // --- Reuse MetricCard logic locally (no cross-file import issues) ---
// const MetricCard = ({ title, value, unit, icon: Icon, color, isGrowing = true }) => {
//   const { mode } = useContext(ColorModeContext);
//   const primaryTextColor = colors[mode].textPrimary;
//   const growthColor = isGrowing ? colors.successGreen : colors.errorRed;
// 
//   return (
//     <motion.div variants={fadeInUp} style={{ height: '100%' }}>
//       <Box
//         sx={{
//           p: 3,
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           borderLeft: `4px solid ${color}`,
//           backgroundColor: colors[mode].card,
//           borderRadius: 2,
//           transition: 'transform 0.3s, box-shadow 0.3s',
//           '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="body1" sx={{ color, fontWeight: 700 }}>
//             {title}
//           </Typography>
//           <Icon sx={{ color, opacity: 0.7 }} />
//         </Box>
//         <Typography variant="h4" sx={{ fontWeight: 800, color: primaryTextColor }}>
//           {value}
//           <Typography component="span" variant="h6" sx={{ fontWeight: 500, ml: 1, color }}>
//             {unit}
//           </Typography>
//         </Typography>
//         <Typography variant="caption" color={growthColor} sx={{ mt: 1 }}>
//           {isGrowing ? '+12.5% vs. Last Period' : '-4.2% Cost Overrun'}
//         </Typography>
//       </Box>
//     </motion.div>
//   );
// };
// 
// // --- Main Preview Component ---
// const MelucraDashboardPreview = () => {
//   const { mode } = useContext(ColorModeContext);
//   const [totalSpend, setTotalSpend] = useState(4.2);
//   const [unauditedSpend, setUnauditedSpend] = useState(0.02);
//   const [efficiency, setEfficiency] = useState(87.0);
// 
//   // Live metric updates every few seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTotalSpend(prev => +(prev + Math.random() * 0.03).toFixed(2));
//       setUnauditedSpend(prev =>
//         Math.max(0, Math.min(0.15, +(prev + (Math.random() - 0.5) * 0.01).toFixed(3)))
//       );
//       setEfficiency(prev =>
//         Math.max(70, Math.min(95, +(prev + (Math.random() - 0.5) * 0.5).toFixed(1)))
//       );
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);
// 
//   return (
//     <Box
//       sx={{
//         py: { xs: 4, md: 5 },
//         mx: 'auto',
//         maxWidth: 1100,
//         textAlign: 'center',
//         background: `linear-gradient(135deg, ${colors[mode].bgGradA}, ${colors[mode].bgGradB})`,
//         borderRadius: 3,
//         p: { xs: 2, md: 4 },
//         mt: 3,
//       }}
//     >
//       <Typography
//         variant="h5"
//         fontWeight={900}
//         sx={{
//           mb: 3,
//           color: colors[mode].textPrimary,
//         }}
//       >
//         Live Snapshot from the{' '}
//         <span
//           style={{
//             background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//           }}
//         >
//           Melucra Audit Core
//         </span>
//       </Typography>
// 
//       {/* Metric Grid */}
//       <motion.div
//         variants={{ show: { transition: { staggerChildren: 0.1 } } }}
//         initial="hidden"
//         animate="show"
//       >
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <MetricCard
//               title="Total Machine Spend (USD)"
//               value={totalSpend.toFixed(2)}
//               unit="M $"
//               icon={MonetizationOnIcon}
//               color={colors.lucraGold}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <MetricCard
//               title="Unaudited Machine Spend"
//               value={(unauditedSpend * 100).toFixed(1)}
//               unit="%"
//               icon={GavelIcon}
//               color={unauditedSpend > 0.03 ? colors.errorRed : colors.successGreen}
//               isGrowing={unauditedSpend > 0.03}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <MetricCard
//               title="Mandated Assurance Score"
//               value="99.8"
//               unit="%"
//               icon={GavelIcon}
//               color={colors.accent}
//               isGrowing
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <MetricCard
//               title="Efficiency Signals"
//               value={efficiency.toFixed(1)}
//               unit="%"
//               icon={TrendingUpIcon}
//               color={colors.lucraGold}
//               isGrowing
//             />
//           </Grid>
//         </Grid>
//       </motion.div>
// 
// {/* Footer */}
// <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
//   <Typography
//     variant="caption"
//     sx={{
//       display: 'block',
//       color: colors[mode].textDim,
//     }}
//   >
//     Metrics updating live every few seconds — powered by the Melucra prototype engine.
//   </Typography>
// 
//   <Typography
//     component="a"
//     href="/meldashboard"
//     target="_blank"
//     rel="noopener noreferrer"
//     sx={{
//       fontSize: '0.85rem',
//       color: colors.accent,
//       textDecoration: 'none',
//       fontWeight: 600,
//       mt: 0.5,
//       '&:hover': { textDecoration: 'underline', opacity: 0.85 },
//     }}
//   >
//     → View Full Prototype
//   </Typography>
// </Box>
// 
//     </Box>
//   );
// };
// 
// export default MelucraDashboardPreview;


import React, { useState, useMemo, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Grid,
  Tooltip,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { motion } from "framer-motion";

import {
  Gavel as GovernanceIcon,
  Sync as LedgerIcon,
  Calculate as CoreIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

// ---------------------------------------------------------------------
//  COLORS (same as before but cleaned)
// ---------------------------------------------------------------------
const colors = {
  accent: "#00E5BE",
  lucraGold: "#D4AF37",
  successGreen: "#2ECC40",

  dark: {
    bgTop: "#0F1521",
    bgGradA: "#1C2433",
    bgGradB: "#0B0F17",
    card: "#1C2736",
    textPrimary: "#F0F3F7",
    textDim: "rgba(255,255,255,0.70)",
  },
  light: {
    bgTop: "#F8FAFC",
    bgGradA: "#E7F5F1",
    bgGradB: "#DCEEEE",
    card: "#FFFFFF",
    textPrimary: "#1F2937",
    textDim: "rgba(0,0,0,0.65)",
  },
};

// ---------------------------------------------------------------------
const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "dark",
});

// ---------------------------------------------------------------------
const GradientText = styled(Typography)(() => ({
  background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 900,
}));

const CardWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 14,
  background:
    theme.palette.mode === "dark" ? colors.dark.card : colors.light.card,
  border: `1px solid ${theme.palette.divider}`,
  cursor: "pointer",
  transition: "all .25s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-4px)",
    borderColor: colors.accent,
    boxShadow: "0 12px 26px rgba(0,0,0,0.25)",
  },
}));

// ---------------------------------------------------------------------
// DASHBOARDS (unchanged)
// ---------------------------------------------------------------------
import OmecaGovernancePage from "./OmecaGovernancePage";
import OmecaOperationalControlPage from "./OmecaCorePage";
import OmecaReconciliationPage from "./OmecaLedgerPage";

const DASHBOARDS = [
  {
    id: "core",
    layer: "L1",
    name: "Omeca Core",
    tagline: "Operational Control",
    desc: "Real-time spend integrity, margin signals, and liquidity insights.",
    icon: CoreIcon,
    color: colors.successGreen,
    component: OmecaOperationalControlPage,
  },
  {
    id: "ledger",
    layer: "L2",
    name: "Omeca Ledger",
    tagline: "Continuous Close",
    desc: "Live reconciliation, subledger alignment, and posting consistency.",
    icon: LedgerIcon,
    color: colors.accent,
    component: OmecaReconciliationPage,
  },
  {
    id: "governance",
    layer: "L3",
    name: "Omeca Governance",
    tagline: "Trust & Assurance",
    desc: "Immutable proofs, explainable assurance, and full audit lineage.",
    icon: GovernanceIcon,
    color: colors.lucraGold,
    component: OmecaGovernancePage,
  },
];

// ---------------------------------------------------------------------
// TRUST STACK HOME (clean layout, perfect mobile flow)
// ---------------------------------------------------------------------
const TrustStackHome = ({ setPage, mode }) => (
  <Box
    sx={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colors[mode].bgGradA}, ${colors[mode].bgGradB})`,
      color: colors[mode].textPrimary,
      py: { xs: 6, md: 10 },
      px: { xs: 2, sm: 4, md: 6 },
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Box sx={{ maxWidth: 1200, width: "100%" }}>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <GradientText variant="h3" sx={{ textAlign: "center" }}>
          The Omeca Trust Stack
        </GradientText>

        <Typography
          variant="h6"
          sx={{
            mt: 2,
            maxWidth: 760,
            mx: "auto",
            textAlign: "center",
            color: colors[mode].textDim,
            lineHeight: 1.55,
            fontWeight: 500,
          }}
        >
          Explore an interactive prototype of Omeca’s three layers —  
          Operational Control, Continuous Close, and Trust Assurance.
        </Typography>
      </motion.div>

      {/* Top Buttons */}
      <Box
        sx={{
          mt: 5,
          mb: 6,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        {DASHBOARDS.map((d) => (
          <Button
            key={d.id}
            variant="contained"
            startIcon={<d.icon />}
            onClick={() => setPage(d.id)}
            sx={{
              bgcolor: d.color,
              color: "#0F1521",
              borderRadius: 10,
              textTransform: "none",
              fontWeight: 800,
              px: 3,
              "&:hover": { opacity: 0.9, bgcolor: d.color },
            }}
          >
            {d.layer}: {d.name}
          </Button>
        ))}
      </Box>

      {/* Cards */}
      <Grid container spacing={4}>
        {DASHBOARDS.map((d, i) => (
          <Grid key={d.id} item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <CardWrapper onClick={() => setPage(d.id)}>
                {/* Icon Row */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: `${d.color}22`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <d.icon sx={{ color: d.color, fontSize: 26 }} />
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        color: d.color,
                        textTransform: "uppercase",
                      }}
                    >
                      {d.layer} • {d.tagline}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      {d.name}
                    </Typography>
                  </Box>
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: colors[mode].textDim,
                    mb: 3,
                    lineHeight: 1.55,
                    minHeight: 64,
                  }}
                >
                  {d.desc}
                </Typography>

                {/* CTA */}
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPage(d.id);
                  }}
                  sx={{
                    mt: "auto",
                    bgcolor: d.color,
                    color: "#0F1521",
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { opacity: 0.9, bgcolor: d.color },
                  }}
                >
                  Open {d.layer} Dashboard
                </Button>
              </CardWrapper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

// ---------------------------------------------------------------------
// MAIN ROUTER WRAPPER
// ---------------------------------------------------------------------
const OmecaTrustStackPreview = () => {
  const [page, setPage] = useState("home");
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((m) => (m === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: colors.accent },
          background: {
            default: colors[mode].bgTop,
            paper: colors[mode].card,
          },
          text: {
            primary: colors[mode].textPrimary,
            secondary: colors[mode].textDim,
          },
          divider: colors[mode].textDim + "22",
        },
        typography: {
          fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI"',
        },
      }),
    [mode]
  );

  const ActiveComponent =
    DASHBOARDS.find((x) => x.id === page)?.component ?? null;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Theme Toggle */}
        <Tooltip title="Toggle dark/light mode">
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{ position: "fixed", top: 16, right: 16, zIndex: 2000 }}
          >
            {mode === "dark" ? (
              <Brightness7 sx={{ color: colors.lucraGold }} />
            ) : (
              <Brightness4 sx={{ color: colors.accent }} />
            )}
          </IconButton>
        </Tooltip>

        {/* Back Button */}
        {page !== "home" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 2000,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setPage("home")}
              sx={{
                bgcolor: colors.accent,
                color: "#0F1521",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Back to Trust Stack
            </Button>
          </motion.div>
        )}

        {/* Router */}
        <Box>
          {ActiveComponent ? (
            <ActiveComponent setPage={setPage} />
          ) : (
            <TrustStackHome setPage={setPage} mode={mode} />
          )}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default OmecaTrustStackPreview;
