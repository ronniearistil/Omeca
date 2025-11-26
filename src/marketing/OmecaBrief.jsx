// Libraries: React 18+, @mui/material ^5, framer-motion ^10, @mui/icons-material ^5

import React, { useState, useMemo, useContext, useEffect, useRef } from 'react';
import {
    ThemeProvider, createTheme, Box, Typography, Button, IconButton, Paper, Grid,
    List, ListItem, ListItemText, Popover, Divider, useTheme, LinearProgress, Stack,
    AppBar, Toolbar, Container, Link, Chip, ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import ListIcon from '@mui/icons-material/List';
import HubIcon from '@mui/icons-material/Hub';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GavelIcon from '@mui/icons-material/Gavel';
import SyncIcon from '@mui/icons-material/Sync';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SchemaIcon from '@mui/icons-material/Schema';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import RouteIcon from '@mui/icons-material/Route';
import LanIcon from '@mui/icons-material/Lan';
import TimelineIcon from '@mui/icons-material/Timeline';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InsightsIcon from '@mui/icons-material/Insights';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SecurityIcon from '@mui/icons-material/Security';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import OmecaFlowDiagram from "../shared/layouts/OmecaFlowDiagram.jsx";


// -----------------------------------------------------------------------------
// Export-to-PDF (stub)
// -----------------------------------------------------------------------------
const exportDeckAsPDF = async (slides, ThemeWrapper, mode) => {
    alert(
        'PDF export is simulated here. In production, render each slide with html2canvas and compose a PDF with jsPDF.'
    );
};

// -----------------------------------------------------------------------------
// Theme & Branding
// -----------------------------------------------------------------------------
export const colors = {
    // Omeca brand
    omecaCyan: '#00E5BE',
    deepBlue: '#0A192F',
    silver: '#DDE2EB',
    lucraGold: '#D4AF37',
    successGreen: '#2ECC40',
    errorRed: '#FF4136',

    dark: {
        bgTop: '#0B1528',
        bgGrad: '#0F1F3A',
        card: '#172A45',
        textDim: 'rgba(255,255,255,0.72)',
        textPrimary: '#F5F8FF',
    },
    light: {
        bgTop: '#F7F9FC',
        bgGrad: '#E8F2FF',
        card: '#FFFFFF',
        textDim: 'rgba(0,0,0,0.65)',
        textPrimary: '#0B1A2E',
    },
};

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: { main: colors.omecaCyan },
        secondary: { main: colors.lucraGold },
        error: { main: colors.errorRed },
        success: { main: colors.successGreen },
        background: {
            default: colors[mode].bgTop,
            paper: colors[mode].card,
        },
        text: {
            primary: colors[mode].textPrimary,
            secondary: colors[mode].textDim,
        },
        divider: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    },
    typography: {
        fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif',
        h1: { fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', fontSize: '4.5rem' },
        h2: { fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.01em', fontSize: '3.2rem' },
        h3: { fontWeight: 800, letterSpacing: '-0.01em', fontSize: '2.2rem' },
        h4: { fontWeight: 700, fontSize: '1.6rem' },
        h5: { fontWeight: 700, fontSize: '1.25rem' },
        h6: { fontWeight: 600, fontSize: '1.05rem' },
        body1: { fontSize: '1rem', lineHeight: 1.6 },
        body2: { fontSize: '0.92rem', lineHeight: 1.5 },
        button: { textTransform: 'none', fontWeight: 700 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: { color: colors.deepBlue, borderRadius: 12 },
                outlined: { borderRadius: 12 },
            },
        },
        MuiPaper: {
            styleOverrides: { outlined: { backgroundColor: 'transparent', borderRadius: 14 } },
        },
        MuiChip: {
            styleOverrides: { root: { fontWeight: 700 } },
        },
    },
});

const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(90deg, ${colors.omecaCyan}, ${colors.lucraGold})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline',
    fontWeight: 'inherit',
}));

export const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'dark' });

const ThemeWrapper = ({ children }) => {
    const [mode, setMode] = useState('dark');
    const colorMode = useMemo(
        () => ({ mode, toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')) }),
        [mode]
    );
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return (
        <ColorModeContext.Provider value={{ ...colorMode, mode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

// -----------------------------------------------------------------------------
// Header (AppBar) with Logo + CTA + Theme Toggle
// -----------------------------------------------------------------------------
const OmecaLogo = () => {
    const theme = useTheme();
    return (
        <Link href="#" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" fill={theme.palette.mode === 'dark' ? colors.dark.card : colors.light.card} stroke={colors.omecaCyan} strokeWidth="5" />
                <path d="M30 65 L50 35 L70 65" stroke={colors.lucraGold} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M40 55 L60 55" stroke={colors.omecaCyan} strokeWidth="6" strokeLinecap="round" />
            </svg>
            <Typography variant="h5" sx={{ ml: 1.25, fontWeight: 900, color: 'text.primary', letterSpacing: '-0.5px' }}>
                Omeca
            </Typography>
        </Link>
    );
};

const ThemeToggleButton = () => {
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    return (
        <IconButton onClick={toggleColorMode} color="inherit" sx={{ ml: 1 }}>
            {mode === 'dark' ? <WbSunnyRoundedIcon /> : <NightsStayRoundedIcon />}
        </IconButton>
    );
};

const AppHeader = () => (
    <AppBar
        position="fixed"
        elevation={0}
        sx={{
            bgcolor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            borderBottom: 1,
            borderColor: 'divider',
            py: 0.5,
        }}
    >
<Container maxWidth={false} sx={{ px: { xs: 3, md: 6 }, maxWidth: "1600px", mx: "auto" }}>
            <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 } }}>
                <OmecaLogo />
                <Box sx={{ flexGrow: 1 }} />
                <Button href="#" variant="outlined" color="inherit" sx={{ mr: 1.5 }}>
                    Product Overview
                </Button>
                <ThemeToggleButton />
                <Button href="#" variant="contained" sx={{ ml: 1.5 }}>
                    Request Access
                </Button>
            </Toolbar>
        </Container>
    </AppBar>
);

// -----------------------------------------------------------------------------
// Motion Variants
// -----------------------------------------------------------------------------
const slideContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.15 } } };
const fadeInUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 110, damping: 18 } } };
const listContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.25 } } };

// -----------------------------------------------------------------------------
// Slide Titles
// -----------------------------------------------------------------------------
// const slideTitles = [
//     // 'Always-Ready Books: The Cognitive ERP',
//     "Omeca | The Cognitive ERP",
//     'The $116B Crisis in Investor Trust',
//     'Introducing Omeca: The System of Trust',
//     'How It Works (Flow)',
//     'The Financial Intelligence Moat',
//     'Example Scenario: Revenue Accrual',
//     'MVP & Success Metrics',
//     'Roadmap (18 Months)',
//     'From a $562M Beachhead to Market Leadership',
//     'Business Model & Pricing',
//     'A Credible Path to Market Leadership',
//     'Traction & Validation',
//     'Team',
//     'The Ask & Use of Funds',
//     'Closing: Make Finance Continuous',
// ];
const slideTitles = [
  "Omeca | The Cognitive ERP",
  "The $100B Market Trust Gap",
  "The Control Crisis in ERP",
  "Where We Win First",
  "The Omeca Trust Stack",
  "How It Works (Flow)",
  "The Financial Intelligence Moat",
  "Live Example: The Continuous Close",
  "What We’ve Built + What’s Next",
  "18-Month Roadmap",
  "Market Opportunity",
  "Market Validation: What AI ERPs Have Proven",   // ← NEW SLIDE 1
  "Slide Tiers",
  "Omeca’s Leap Beyond Automation",               // ← NEW SLIDE 2
  "Moat: Trust Architecture",
  "Business Model & Pricing",
  "Financial Path to Leadership",
  "Traction & Validation",
  "Team",
  "The Ask & Use of Funds",
  "Closing: Make Finance Continuous",
];

// -----------------------------------------------------------------------------
// Slide Layout
// -----------------------------------------------------------------------------
const SlideLayout = ({ children, slideNumber, kicker }) => {
    const { mode } = useContext(ColorModeContext);
    const theme = useTheme();
    const backgroundStyle = {
        background: `linear-gradient(135deg, ${colors[mode].bgGrad} 0%, ${colors[mode].bgTop} 100%)`,
        minHeight: '100vh',
        boxSizing: 'border-box',
        color: theme.palette.text.primary,
        padding: '2rem 1rem 5rem 1rem',
        [theme.breakpoints.up('sm')]: { padding: '2rem 2rem 5rem 2rem' },
        [theme.breakpoints.up('md')]: { paddingTop: '8rem', paddingBottom: '6rem' },
    };
    return (
        <motion.div style={backgroundStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
                <motion.div variants={slideContainer} initial="hidden" animate="show" style={{ width: '100%' }}>
                    {kicker && (
                        <Chip label={kicker} variant="outlined" sx={{ mb: 2, borderColor: colors.omecaCyan, color: 'text.secondary', fontWeight: 700 }} />
                    )}
                    {children}
                </motion.div>
            </Container>

            <Box
                sx={{
                    position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9,
                    width: '100%', height: 50, backgroundColor: colors[mode].bgTop,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'space-between' },
                    px: { xs: 1, md: 4 }
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
                    {slideTitles[slideNumber]}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {slideNumber + 1}/{slideTitles.length}
                </Typography>
            </Box>
        </motion.div>
    );
};

// Slide 1 — Executive Overview (Updated Messaging and Structure)
const Slide1_Title = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isDark = mode === "dark";

  const pillars = [
    {
      title: "Real-Time Control",
      icon: <WorkHistoryIcon />,
      text: "Unified visibility of cash, spend, and project forecasts.",
    },
    {
      title: "Continuous Close",
      icon: <VerifiedUserIcon />,
      text: "Automates reconciliation to keep financial records live and accurate.",
    },
    {
      title: "Verifiable Trust",
      icon: <HubIcon />,
      text: "Immutable, audit-ready proof for every financial event.",
    },
  ];

  return (
    <SlideLayout slideNumber={0} kicker="Executive Overview">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        {/* === Brand Headline === */}
        <motion.div variants={fadeInUp}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              lineHeight: 1.05,
              fontSize: "clamp(4rem, 11vw, 8.5rem)",
              letterSpacing: "-0.02em",
              mb: 1.5,
            }}
          >
            <GradientText variant="inherit">Omeca</GradientText>
          </Typography>
        </motion.div>

        {/* === Tagline / Vision Statement === */}
        <motion.div variants={fadeInUp}>
          <Typography
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
              color: theme.palette.text.primary,
              opacity: 0.95,
              maxWidth: 1000,
              mx: "auto",
              lineHeight: 1.15,
              mb: 1.5, // Reduced margin to fit one-liner right below
            }}
          >
            The <GradientText variant="inherit">Self-Driving Cognitive ERP</GradientText>
          </Typography>
        </motion.div>

        {/* === One-Liner (New Addition) === */}
        <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
          <Typography
            component="p"
            align="center"
            sx={{
              fontWeight: 500,
              fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
              color: theme.palette.text.secondary,
              opacity: 0.85,
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.3,
              mb: 4, // Added bottom margin to separate from pillars
            }}
          >
Moving finance from static recording to continuous control.         
 </Typography>
        </motion.div>

        {/* === Feature Trio === */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            maxWidth: 1100,
            mx: "auto",
          }}
        >
          {pillars.map((p, i) => (
            <Grid key={p.title} item xs={12} sm={6} md={4}>
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <Paper
                  sx={{
                    p: 3.5,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.03)",
                    border: `1px solid ${theme.palette.divider}`,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isDark
                        ? "0 6px 14px rgba(0,0,0,0.4)"
                        : "0 6px 14px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box sx={{ mb: 1.5 }}>
                    {React.cloneElement(p.icon, {
                      sx: {
                        fontSize: 44,
                        color: colors.omecaCyan,
                        textShadow: "0 0 8px rgba(0,229,190,0.7)",
                      },
                    })}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 0.75,
                      color: "text.primary",
                    }}
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      px: 1,
                      flexGrow: 1,
                      lineHeight: 1.5,
                    }}
                  >
                    {p.text}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SlideLayout>
  );
};

// // Slide 2 — The Problem (Final Messaging Alignment)
// const Slide2_Problem = () => {
//   const { mode } = useContext(ColorModeContext);
//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//   const isDark = mode === "dark";
// 
//   return (
//     <SlideLayout slideNumber={1} kicker="The Problem">
//       <Box sx={{ pt: "8vh" }}>
//         <motion.div
//           variants={fadeInUp}
//           style={{ textAlign: "center", marginBottom: "5vh" }}
//         >
//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 900,
//               fontSize: { xs: "2.3rem", md: "3.2rem" },
//               lineHeight: 1.15,
//               letterSpacing: "-0.01em",
//               mb: 1.5,
//             }}
//           >
//             The <GradientText variant="inherit">Control Crisis</GradientText> in ERP
//           </Typography>
// 
//           {/* <Typography
//             variant="h6"
//             sx={{
//               color: theme.palette.text.secondary,
//               maxWidth: 780,
//               mx: "auto",
//               lineHeight: 1.5,
//               fontSize: { xs: "1.05rem", md: "1.15rem" },
//               opacity: 0.95,
//             }}
//           >
//             Global enterprises lose <strong>$1.3 trillion</strong> each year to
//             manual finance operations. Legacy ERPs still run on delayed data,
//             leaving teams blind between execution and financial truth.
//           </Typography> */}
//           <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
//   The global ERP and finance-automation market exceeds $200 B (Gartner 2024; PwC 2023). 
//   Omeca’s serviceable segment—organizations modernizing financial cores—totals roughly $60 B. 
//   Capturing 1 % yields $1 B in ARR potential.
// </Typography>
// 
//         </motion.div>
// 
//         <Grid
//           container
//           spacing={4}
//           justifyContent="center"
//           alignItems="stretch"
//           sx={{ mb: 6, px: { xs: 1.5, md: 2 } }}
//         >
//           {[
//             {
//               title: "Lagging Data",
//               metric: "Weeks Behind",
//               text: "Finance leaders steer on outdated numbers.",
//             },
//             {
//               title: "Manual Drag",
//               metric: "40 %+ Lost Time",
//               text: "Close cycles waste days chasing reconciliation.",
//             },
//           ].map((card, i) => (
//             <Grid item xs={12} md={5.5} key={card.title}>
//               <motion.div
//                 variants={fadeInUp}
//                 transition={{ delay: 0.2 + i * 0.15 }}
//               >
//                 <Paper
//                   sx={{
//                     p: 3.5,
//                     textAlign: "center",
//                     height: "100%",
//                     borderRadius: 3,
//                     border: `1px solid ${colors.errorRed}66`,
//                     backgroundColor: isDark
//                       ? "rgba(255,65,54,0.08)"
//                       : "rgba(255,65,54,0.06)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{ fontWeight: 800, mb: 0.75, color: theme.palette.text.primary }}
//                   >
//                     {card.title}
//                   </Typography>
//                   <Typography
//                     variant="h4"
//                     sx={{ color: colors.errorRed, fontWeight: 900, mb: 1 }}
//                   >
//                     {card.metric}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       lineHeight: 1.55,
//                       maxWidth: 340,
//                       mx: "auto",
//                     }}
//                   >
//                     {card.text}
//                   </Typography>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
// 
//         <motion.div variants={fadeInUp} style={{ textAlign: "center" }}>
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 900,
//               color: colors.lucraGold,
//               lineHeight: 1.4,
//               fontSize: { xs: "1.25rem", md: "1.55rem" },
//             }}
//           >
//             The Integration Fallacy:{" "}
//             <GradientText>Flow ≠ Reconciliation</GradientText>
//           </Typography>
// 
//           <Typography
//             variant="h6"
//             sx={{
//               color: theme.palette.text.secondary,
//               mt: 1.2,
//               fontWeight: 400,
//             }}
//           >
//             Moving data faster didn’t fix control. ERPs still can’t prove accuracy in real time.
//           </Typography>
// 
//           <Typography
//             variant="caption"
//             sx={{
//               color: theme.palette.text.disabled,
//               mt: 1.5,
//               display: "block",
//             }}
//           >
//             Sources: PwC • APQC • EY • Hackett Group 2024
//           </Typography>
//         </motion.div>
//       </Box>
//     </SlideLayout>
//   );
// };

// Slide 2 — The Problem (Final Messaging Alignment with Motion)
const Slide2_Problem = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isDark = mode === "dark";

  return (
    <SlideLayout slideNumber={1} kicker="The Problem">
      <Box sx={{ pt: "8vh" }}>
        <motion.div
          variants={fadeInUp}
          style={{ textAlign: "center", marginBottom: "5vh" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.3rem", md: "3.2rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              mb: 1.5,
            }}
          >
            The <GradientText variant="inherit">Control Crisis</GradientText> in ERP
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 780,
              mx: "auto",
              lineHeight: 1.5,
              fontSize: { xs: "1.05rem", md: "1.15rem" },
              opacity: 0.95,
            }}
          >
            Delayed data creates a massive gap in financial control.
          </Typography>
        </motion.div>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{ mb: 6, px: { xs: 1.5, md: 2 } }}
        >
          {[
            {
              title: "Lagging Data",
              metric: "Weeks Behind",
              text: "Finance leaders steer on outdated numbers.",
            },
            {
              title: "Manual Drag",
              metric: "40%+ Lost Time",
              text: "Close cycles waste days chasing reconciliation.",
            },
          ].map((card, i) => (
            <Grid item xs={12} md={5.5} key={card.title}>
              {/* === MOTION ADDED HERE for the cards === */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <Paper
                  sx={{
                    p: 3.5,
                    textAlign: "center",
                    height: "100%",
                    borderRadius: 3,
                    border: `1px solid ${colors.errorRed}66`,
                    backgroundColor: isDark
                      ? "rgba(255,65,54,0.08)"
                      : "rgba(255,65,54,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, mb: 0.75, color: theme.palette.text.primary }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: colors.errorRed, fontWeight: 900, mb: 1 }}
                  >
                    {card.metric}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.55,
                      maxWidth: 340,
                      mx: "auto",
                    }}
                  >
                    {card.text}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* === MOTION ADDED HERE for the conclusion === */}
        <motion.div variants={fadeInUp} transition={{ delay: 0.5 }} style={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color: colors.lucraGold,
              lineHeight: 1.4,
              fontSize: { xs: "1.25rem", md: "1.55rem" },
            }}
          >
            The Integration Fallacy:{" "}
            <GradientText>Flow ≠ Reconciliation</GradientText>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              mt: 1.2,
              fontWeight: 400,
            }}
          >
            Moving data faster didn’t fix control. ERPs still can’t prove accuracy in real time.
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.disabled,
              mt: 1.5,
              display: "block",
            }}
          >
            Sources: PwC • APQC • EY • Hackett Group 2024
          </Typography>
        </motion.div>
      </Box>
    </SlideLayout>
  );
};

// Slide 4 — Solution Intro (Messaging Aligned with PowerPoint)
// const Slide4_SolutionIntro = () => {
//   const { mode } = useContext(ColorModeContext);
//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//   const isDark = mode === "dark";
// 
//   return (
//     <SlideLayout slideNumber={2} kicker="Our Solution">
//       <Box sx={{ pt: "6vh", textAlign: "center" }}>
//         {/* === HEADLINE === */}
//         <motion.div variants={fadeInUp}>
//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 900,
//               fontSize: { xs: "2.4rem", md: "3.4rem" },
//               lineHeight: 1.15,
//               mb: 3,
//               color: theme.palette.text.primary,
//             }}
//           >
//             The <GradientText variant="inherit">Omeca Trust Stack</GradientText>
//           </Typography>
//         </motion.div>
// 
//         {/* === SUBHEADLINE === */}
//         <motion.div variants={fadeInUp}>
//           <Typography
//             variant="h6"
//             sx={{
//               color: theme.palette.text.secondary,
//               maxWidth: 880,
//               mx: "auto",
//               mb: 6,
//               lineHeight: 1.6,
//               fontWeight: 400,
//               fontSize: { xs: "1.05rem", md: "1.2rem" },
//             }}
//           >
//             Omeca unifies operational and financial truth through three connected layers that run, reconcile, and prove themselves in real time.
//           </Typography>
//         </motion.div>
// 
//         {/* === THREE LAYERS === */}
//         <Grid
//           container
//           spacing={4}
//           justifyContent="center"
//           alignItems="stretch"
//           sx={{ mb: 4, px: { xs: 1, md: 2 } }}
//         >
//           {[
//             {
//               icon: <VisibilityIcon />,
//               title: "L1: Omeca Core",
//               text: "Real-time control of spend, cash, and forecast.",
//               color: colors.omecaCyan,
//             },
//             {
//               icon: <PlaylistAddCheckIcon />,
//               title: "L2: Omeca Ledger",
//               text: "Continuous reconciliation that closes books automatically.",
//               color: colors.lucraGold,
//             },
//             {
//               icon: <GavelIcon />,
//               title: "L3: Omeca Governance",
//               text: "Immutable proof and explainable compliance for every transaction.",
//               color: colors.successGreen,
//             },
//           ].map((p, i) => (
//             <Grid key={p.title} item xs={12} md={4}>
//               <motion.div variants={fadeInUp} transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}>
//                 <Paper
//                   sx={{
//                     p: 3.5,
//                     minHeight: 280,
//                     height: "100%",
//                     borderRadius: 3,
//                     textAlign: "center",
//                     border: `1px solid ${p.color}44`,
//                     backgroundColor: isDark
//                       ? "rgba(255,255,255,0.04)"
//                       : "rgba(0,0,0,0.03)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "flex-start",
//                     alignItems: "center",
//                     transition: "all 0.25s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: isDark
//                         ? "0 6px 14px rgba(0,0,0,0.35)"
//                         : "0 6px 14px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   {React.cloneElement(p.icon, {
//                     sx: {
//                       fontSize: 44,
//                       color: p.color,
//                       mb: 1.5,
//                       textShadow: `0 0 8px ${p.color}99`,
//                     },
//                   })}
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 800,
//                       mb: 1,
//                       color: theme.palette.text.primary,
//                     }}
//                   >
//                     {p.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                       lineHeight: 1.55,
//                       maxWidth: 340,
//                       mx: "auto",
//                     }}
//                   >
//                     {p.text}
//                   </Typography>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
// 
//         {/* === CLOSING STATEMENT === */}
//         <motion.div variants={fadeInUp}>
//           <Typography variant="h5" sx={{ fontWeight: 700, mt: 4 }}>
//             From a <GradientText>System of Record</GradientText> to a <GradientText>System of Trust.</GradientText>
//           </Typography>
//         </motion.div>
//       </Box>
//     </SlideLayout>
//   );
// };
// Slide 4 — Solution Intro (Messaging Aligned with PowerPoint)
const Slide4_SolutionIntro = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isDark = mode === "dark";

  return (
    <SlideLayout slideNumber={2} kicker="Our Solution">
      <Box sx={{ pt: "6vh", textAlign: "center" }}>
        {/* === HEADLINE === */}
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.4rem", md: "3.4rem" },
              lineHeight: 1.15,
              mb: 3,
              color: theme.palette.text.primary,
            }}
          >
            The <GradientText variant="inherit">Omeca Trust Stack</GradientText>
          </Typography>
        </motion.div>

        {/* === SUBHEADLINE === */}
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 880,
              mx: "auto",
              mb: 6,
              lineHeight: 1.6,
              fontWeight: 400,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
            }}
          >
            Omeca unifies operational and financial truth through three connected layers that run, reconcile, and prove themselves in real time.
          </Typography>
        </motion.div>

        {/* === THREE LAYERS (Pillars from PDF source 4, 5, 6) === */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{ mb: 4, px: { xs: 1, md: 2 } }}
        >
          {[
            {
              icon: <VisibilityIcon />,
              title: "L1: Omeca Core",
              text: "Real-time control of spend, cash, and forecast.",
              color: colors.omecaCyan,
            },
            {
              icon: <PlaylistAddCheckIcon />,
              title: "L2: Omeca Ledger",
              text: "Continuous reconciliation that closes books automatically.",
              color: colors.lucraGold,
            },
            {
              icon: <GavelIcon />,
              title: "L3: Omeca Governance",
              text: "Immutable proof and explainable compliance for every transaction.",
              color: colors.successGreen,
            },
          ].map((p, i) => (
            <Grid key={p.title} item xs={12} md={4}>
              <motion.div variants={fadeInUp} transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}>
                <Paper
                  sx={{
                    p: 3.5,
                    minHeight: 280,
                    height: "100%",
                    borderRadius: 3,
                    textAlign: "center",
                    border: `1px solid ${p.color}44`,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: isDark
                        ? "0 6px 14px rgba(0,0,0,0.35)"
                        : "0 6px 14px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {React.cloneElement(p.icon, {
                    sx: {
                      fontSize: 44,
                      color: p.color,
                      mb: 1.5,
                      textShadow: `0 0 8px ${p.color}99`,
                    },
                  })}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.55,
                      maxWidth: 340,
                      mx: "auto",
                    }}
                  >
                    {p.text}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* === CLOSING STATEMENT === */}
        <motion.div variants={fadeInUp}>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4 }}>
            From a <GradientText>System of Record</GradientText> to a <GradientText>System of Trust.</GradientText>
          </Typography>
        </motion.div>
      </Box>
    </SlideLayout>
  );
};

// Slide 5 — How It Works (Messaging-only update)
const Slide5_HowItWorks = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isDark = mode === 'dark';

  return (
    <SlideLayout slideNumber={3} kicker="How It Works">
      <Box sx={{ pt: "5vh", textAlign: "center" }}>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 1000,
              fontSize: { xs: "2.5rem", sm: "3.4rem" },
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              mb: 3,
              textAlign: "center",
            }}
          >
            From <GradientText variant="inherit">Chaos</GradientText>
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", margin: "0 8px", color: colors.omecaCyan, fontWeight: 900 }}
            >
              →
            </motion.span>
            <GradientText variant="inherit">Truth</GradientText>
          </Typography>

          {/* concise, aligned message */}
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontWeight: 400,
              color: theme.palette.text.secondary,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              maxWidth: 860,
              mx: "auto",
              lineHeight: 1.6,
              opacity: 0.95,
            }}
          >
            Omeca replaces legacy ERPs with a continuous core of financial truth.
          </Typography>
        </motion.div>

        {/* keep your existing diagram component */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ marginTop: "4vh" }}
        >
          <OmecaFlowDiagram theme={theme} isDark={isDark} colors={colors} />
        </motion.div>
      </Box>
    </SlideLayout>
  );
};



// // Slide 6 — Financial Intelligence Moat (Revised Narrative)
// const Slide6_Moat = () => {
//     const { mode } = useContext(ColorModeContext);
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//     const isDark = mode === "dark";
//     const gradientBorder = "linear-gradient(145deg, rgba(0,229,190,0.3), rgba(212,175,55,0.3))";
// 
//     return (
//         <SlideLayout slideNumber={4} kicker="Financial Intelligence Moat">
//             <Box component={motion.div} variants={fadeInUp} initial="hidden" animate="show" sx={{ pt: "6vh", pb: "4vh", textAlign: "center" }}>
//                 <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2.5rem", md: "3.2rem" }, lineHeight: 1.15, mb: 2, color: theme.palette.text.primary }}>
//                     The <GradientText variant="inherit">Financial Intelligence Moat</GradientText>
//                 </Typography>
//                 <Typography variant="h6" sx={{ color: theme.palette.text.secondary, maxWidth: 860, mx: "auto", mb: 7, lineHeight: 1.55, fontWeight: 400 }}>
//                     Omeca sits above fragmented finance systems as a real-time intelligence layer — validating data, enforcing policy, and posting only compliant, audit-ready entries to the ERP.
//                 </Typography>
//                 <Grid container direction="column" alignItems="center" justifyContent="center" spacing={5} sx={{ position: "relative" }}>
//                     <Grid item>
//                         <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
//                             <Paper sx={{ p: { xs: 2, md: 3 }, px: { xs: 3, md: 5 }, borderRadius: 3, border: `1px solid ${colors.omecaCyan}55`, backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", boxShadow: isDark ? "0 0 24px rgba(0,229,190,0.25)" : "0 0 20px rgba(0,229,190,0.15)" }}>
//                                 <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: colors.omecaCyan }}>Financial Systems</Typography>
//                                 <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.95rem", md: "1rem" } }}>Billing · FP&A · Compliance · RevOps</Typography>
//                             </Paper>
//                         </motion.div>
//                     </Grid>
//                     <motion.div animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ fontSize: "2rem", color: "#00E5BE", margin: "12px 0" }}>↓</motion.div>
//                     <Grid item>
//                         <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
//                             <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: `1px solid transparent`, backgroundColor: isDark ? "rgba(212,175,55,0.08)" : "rgba(212,175,55,0.1)", backgroundImage: gradientBorder, boxShadow: isDark ? "0 0 28px rgba(212,175,55,0.25)" : "0 0 24px rgba(212,175,55,0.15)" }}>
//                                 <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: colors.lucraGold }}>Omeca Core — Continuous Close Logic</Typography>
//                                 <Grid container justifyContent="center" spacing={3} sx={{ maxWidth: 800, mx: "auto" }}>
//                                     {[
//                                         { icon: <HubIcon />, label: "Validation & Policy Engine" },
//                                         { icon: <AutoGraphIcon />, label: "Continuous Reconciliation" },
//                                         { icon: <VerifiedUserIcon />, label: "Exception Review & Approval Ledger" },
//                                         { icon: <AccountTreeIcon />, label: "Immutable Audit Graph" },
//                                     ].map((item, i) => (
//                                         <Grid key={i} item xs={6} sm={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                                             {React.cloneElement(item.icon, { sx: { fontSize: 36, color: colors.lucraGold, mb: 0.5 } })}
//                                             <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.85rem" }}>{item.label}</Typography>
//                                         </Grid>
//                                     ))}
//                                 </Grid>
//                             </Paper>
//                         </motion.div>
//                     </Grid>
//                     <motion.div animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ fontSize: "2rem", color: "#00E5BE", margin: "12px 0" }}>↓</motion.div>
//                     <Grid item>
//                         <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
//                             <Paper sx={{ p: { xs: 2.5, md: 3 }, px: { xs: 3, md: 5 }, borderRadius: 3, border: `1px solid ${colors.omecaCyan}33`, backgroundColor: isDark ? "rgba(0,229,190,0.08)" : "rgba(0,229,190,0.06)" }}>
//                                 <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: colors.omecaCyan }}>ERP / System of Record</Typography>
//                                 <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.95rem", md: "1rem" } }}>NetSuite · Workday · SAP</Typography>
//                             </Paper>
//                         </motion.div>
//                     </Grid>
//                 </Grid>
//                 <Typography variant="subtitle1" sx={{ mt: 7, color: theme.palette.text.secondary, fontWeight: 500, maxWidth: 700, mx: "auto", lineHeight: 1.6, px: 2 }}>
//                     Unlike middleware (which is a System of Record), <strong style={{ color: colors.omecaCyan }}>Omeca enforces financial logic</strong> — not just data movement — creating the first System of <GradientText variant="inherit">Continuous Trust.</GradientText>
//                 </Typography>
//             </Box>
//         </SlideLayout>
//     );
// };
// Slide 6 — Financial Intelligence Moat (Final Messaging)
// Slide 6 — Financial Intelligence Core (Replaces System of Record)
const Slide6_Moat = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isDark = mode === "dark";
  const gradientBorder =
    "linear-gradient(145deg, rgba(0,229,190,0.3), rgba(212,175,55,0.3))";

  return (
    <SlideLayout slideNumber={4} kicker="Financial Intelligence Core">
      <Box
        component={motion.div}
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        sx={{ pt: "6vh", pb: "4vh", textAlign: "center" }}
      >
        {/* === Headline === */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.5rem", md: "3.2rem" },
            lineHeight: 1.15,
            mb: 2,
            color: theme.palette.text.primary,
          }}
        >
          The <GradientText variant="inherit">Financial Intelligence Core</GradientText>
        </Typography>

        {/* === Core Message === */}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 860,
            mx: "auto",
            mb: 7,
            lineHeight: 1.55,
            fontWeight: 400,
          }}
        >
          Omeca replaces the legacy system of record. It becomes the continuous core where financial truth is created, validated, and stored — while legacy ERPs consume verified outcomes.
        </Typography>

        {/* === Architectural Logic (keep current layout for now) === */}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={5}
          sx={{ position: "relative" }}
        >
          {/* External Systems */}
          <Grid item>
            <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
              <Paper
                sx={{
                  p: { xs: 2, md: 3 },
                  px: { xs: 3, md: 5 },
                  borderRadius: 3,
                  border: `1px solid ${colors.omecaCyan}55`,
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.02)",
                  boxShadow: isDark
                    ? "0 0 24px rgba(0,229,190,0.25)"
                    : "0 0 20px rgba(0,229,190,0.15)",
                }}
              >
                {/* <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, mb: 1, color: colors.omecaCyan }}
                >
                  Connected Systems
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                  }}
                >
                  NetSuite · Workday · SAP · Billing · FP&A
                </Typography> */}
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: colors.omecaCyan }}>
  Legacy and External Inputs
</Typography>
<Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.95rem", md: "1rem" } }}>
  Billing · FP&A · RevOps · Ops
</Typography>

              </Paper>
            </motion.div>
          </Grid>

          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: "2rem",
              color: "#00E5BE",
              margin: "12px 0",
            }}
          >
            ↓
          </motion.div>

          {/* Omeca Core */}
          <Grid item>
            <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: `1px solid transparent`,
                  backgroundColor: isDark
                    ? "rgba(212,175,55,0.08)"
                    : "rgba(212,175,55,0.1)",
                  backgroundImage: gradientBorder,
                  boxShadow: isDark
                    ? "0 0 28px rgba(212,175,55,0.25)"
                    : "0 0 24px rgba(212,175,55,0.15)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    color: colors.lucraGold,
                  }}
                >
                  Omeca Core Continuous Financial Truth
                </Typography>

                <Grid
                  container
                  justifyContent="center"
                  spacing={3}
                  sx={{ maxWidth: 800, mx: "auto" }}
                >
                  {[
                    { icon: <HubIcon />, label: "Validation & Policy Logic" },
                    { icon: <AutoGraphIcon />, label: "Real-Time Reconciliation" },
                    { icon: <VerifiedUserIcon />, label: "Assurance & Proof Layer" },
                    { icon: <AccountTreeIcon />, label: "Immutable Ledger Graph" },
                  ].map((item, i) => (
                    <Grid
                      key={i}
                      item
                      xs={6}
                      sm={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        sx: {
                          fontSize: 36,
                          color: colors.lucraGold,
                          mb: 0.5,
                        },
                      })}
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 600,
                          fontSize: "0.85rem",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* === Closing === */}
        <Typography
          variant="subtitle1"
          sx={{
            mt: 7,
            color: theme.palette.text.secondary,
            fontWeight: 500,
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.6,
            px: 2,
          }}
        >
         Omeca is the core of continuous financial truth.
        </Typography>
      </Box>
    </SlideLayout>
  );
};


// // ... (Slides 7, 8, and 9 remain unchanged from the original Omeca deck)
// const Slide7_ExampleScenario = () => {
//     const { mode } = useContext(ColorModeContext);
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//     const isDark = mode === "dark";
// 
//     const [activeStep, setActiveStep] = useState(-1);
//     const [isComplete, setIsComplete] = useState(false);
// 
//     const initialKpis = [
//         { kpi: "10 Days", label: "Avg. Close Time" },
//         { kpi: "100%", label: "Manual Reconciliations" },
//         { kpi: "100%", label: "Transactions to Review" },
//         { kpi: "0%", label: "Evidence Attached" },
//     ];
//     const [kpis, setKpis] = useState(initialKpis);
// 
//     const steps = [
//         { label: "Detect source event", hint: "Invoice, contract start, or change in plan", color: colors.omecaCyan },
//         { label: "Reconcile subledger to GL", hint: "Billing agrees with ERP balances", color: colors.omecaCyan, kpiUpdate: { index: 1, value: "↓ 70%" } },
//         { label: "Stage journal entry", hint: "Accrual or deferral with attached evidence", color: colors.lucraGold, kpiUpdate: { index: 3, value: "100%" } },
//         { label: "Controller approves", hint: "Exception-only human review", color: colors.lucraGold, kpiUpdate: { index: 2, value: "< 5%" } },
//         { label: "Post to ERP & anchor", hint: "Immutable trail ready for audit", color: colors.successGreen, kpiUpdate: { index: 0, value: "< 2 Days" } },
//     ];
// 
//     const intervalRef = useRef(null);
// 
//     const startSimulation = () => {
//         setActiveStep(0);
//         setIsComplete(false);
//         setKpis(initialKpis);
// 
//         intervalRef.current = setInterval(() => {
//             setActiveStep(prev => {
//                 const nextStep = prev + 1;
// 
//                 if (steps[prev] && steps[prev].kpiUpdate) {
//                     const { index, value } = steps[prev].kpiUpdate;
//                     setKpis(current => current.map((k, i) => (i === index ? { ...k, kpi: value } : k)));
//                 }
// 
//                 if (nextStep >= steps.length) {
//                     clearInterval(intervalRef.current);
//                     setIsComplete(true);
//                     return prev;
//                 }
//                 return nextStep;
//             });
//         }, 1200);
//     };
// 
//     const resetSimulation = () => {
//         clearInterval(intervalRef.current);
//         setActiveStep(-1);
//         setIsComplete(false);
//         setKpis(initialKpis);
//     };
// 
//     useEffect(() => () => clearInterval(intervalRef.current), []);
// 
//     return (
//         <SlideLayout slideNumber={5} kicker="Live Prototype: The Continuous Close">
//             <Box sx={{ textAlign: "center" }}>
//                 <motion.div variants={fadeInUp}>
//                     <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: "2.4rem", md: "3.4rem" }, lineHeight: 1.15 }}>
//                         Watch the <GradientText component="span" sx={{ fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit" }}>Month-End Close</GradientText> Run Itself
//                     </Typography>
//                     <Typography variant="h6" sx={{ color: theme.palette.text.secondary, maxWidth: 800, mx: "auto", mb: 4 }}>
//                         Instead of a 10-day manual scramble, Omeca turns the close into a real-time, automated background process. Press Start to see it in action.
//                     </Typography>
//                 </motion.div>
//                 <Button variant="contained" size="large" onClick={activeStep === -1 ? startSimulation : resetSimulation} sx={{ mb: 4 }}>
//                     {activeStep === -1 ? "► Start Simulation" : "■ Reset"}
//                 </Button>
//                 <Box sx={{ display: "flex", justifyContent: "center", alignItems: { xs: "stretch", md: "center" }, gap: { xs: 2, md: 2 }, flexDirection: { xs: "column", md: "row" }, minHeight: 120 }}>
//                     {steps.map((step, i) => {
//                         const isStepActive = i === activeStep;
//                         const isStepComplete = (isComplete || i < activeStep) && activeStep !== -1;
//                         const isStepUpcoming = i > activeStep && activeStep !== -1;
// 
//                         return (
//                             <React.Fragment key={i}>
//                                 <motion.div animate={{ opacity: isStepUpcoming ? 0.4 : 1, scale: isStepActive ? 1.05 : 1 }} transition={{ duration: 0.3 }} style={{ flex: 1 }}>
//                                     <Paper sx={{ px: 2.5, py: 2, height: "100%", borderRadius: 3, border: isStepActive ? `2px solid ${step.color}` : `1px solid ${step.color}44`, boxShadow: isStepActive ? `0 0 16px ${step.color}88` : "none", transition: "border 0.3s, box-shadow 0.3s" }}>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                             {isStepComplete ? (
//                                                 <CheckCircleOutlineRoundedIcon sx={{ color: colors.successGreen }} />
//                                             ) : (
//                                                 <motion.span animate={{ boxShadow: isStepActive ? [`0 0 0px ${step.color}`, `0 0 12px ${step.color}`, `0 0 0px ${step.color}`] : `0 0 0px ${step.color}` }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: step.color, display: "inline-block" }} />
//                                             )}
//                                             <Typography sx={{ fontWeight: 800 }}>{step.label}</Typography>
//                                         </Box>
//                                         <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.75 }}>{step.hint}</Typography>
//                                     </Paper>
//                                 </motion.div>
//                                 {i < steps.length - 1 && (
//                                     <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
//                                         <motion.div style={{ width: 32, height: 2, borderRadius: 1, backgroundColor: `${colors.silver}55` }} animate={{ backgroundColor: isStepComplete ? colors.successGreen : `${colors.silver}55` }} transition={{ delay: 0.3 }} />
//                                     </Box>
//                                 )}
//                             </React.Fragment>
//                         );
//                     })}
//                 </Box>
//                 <Box sx={{ mt: 4 }}>
//                     <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Real-Time KPIs</Typography>
//                     <Grid container spacing={2} justifyContent="center">
//                         {kpis.map((item, i) => (
//                             <Grid key={i} item xs={6} md={3}>
//                                 <motion.div key={item.kpi} initial={{ opacity: 0.8, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                                     <Paper sx={{ p: 2, borderRadius: 3, backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.7)" }}>
//                                         <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main" }}>{item.kpi}</Typography>
//                                         <Typography variant="body2" color="text.secondary">{item.label}</Typography>
//                                     </Paper>
//                                 </motion.div>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//             </Box>
//         </SlideLayout>
//     );
// };

// Slide 7 — Example Scenario: The Continuous Close
const Slide7_ExampleScenario = () => {
    const { mode } = useContext(ColorModeContext);
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    const isDark = mode === "dark";

    const [activeStep, setActiveStep] = useState(-1);
    const [isComplete, setIsComplete] = useState(false);

    const initialKpis = [
        { kpi: "10 Days", label: "Avg. Close Time" },
        { kpi: "100%", label: "Manual Reconciliations" },
        { kpi: "100%", label: "Transactions to Review" },
        { kpi: "0%", label: "Evidence Attached" },
    ];
    const [kpis, setKpis] = useState(initialKpis);

    const steps = [
        { label: "Detect Source Event", hint: "Invoice, contract start, or change in plan", color: colors.omecaCyan },
        { label: "Reconcile Subledger", hint: "Billing aligns instantly with balances", color: colors.omecaCyan, kpiUpdate: { index: 1, value: "↓ 70%" } },
        { label: "Stage Journal Entry", hint: "Accrual or deferral with evidence attached", color: colors.lucraGold, kpiUpdate: { index: 3, value: "100%" } },
        { label: "Controller Approves", hint: "Exception-only human review", color: colors.lucraGold, kpiUpdate: { index: 2, value: "< 5%" } },
        { label: "Anchor and Post", hint: "Immutable record — audit ready", color: colors.successGreen, kpiUpdate: { index: 0, value: "< 2 Days" } },
    ];

    const intervalRef = useRef(null);

    const startSimulation = () => {
        setActiveStep(0);
        setIsComplete(false);
        setKpis(initialKpis);

        intervalRef.current = setInterval(() => {
            setActiveStep(prev => {
                const nextStep = prev + 1;
                if (steps[prev] && steps[prev].kpiUpdate) {
                    const { index, value } = steps[prev].kpiUpdate;
                    setKpis(current => current.map((k, i) => (i === index ? { ...k, kpi: value } : k)));
                }
                if (nextStep >= steps.length) {
                    clearInterval(intervalRef.current);
                    setIsComplete(true);
                    return prev;
                }
                return nextStep;
            });
        }, 1200);
    };

    const resetSimulation = () => {
        clearInterval(intervalRef.current);
        setActiveStep(-1);
        setIsComplete(false);
        setKpis(initialKpis);
    };

    useEffect(() => () => clearInterval(intervalRef.current), []);

    return (
        <SlideLayout slideNumber={5} kicker="Live Prototype: The Continuous Close">
            <Box sx={{ textAlign: "center" }}>
                <motion.div variants={fadeInUp}>
                    {/* <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 2,
                            fontSize: { xs: "2.4rem", md: "3.4rem" },
                            lineHeight: 1.15,
                        }}
                    >
                        The <GradientText component="span">Close</GradientText> That Runs Itself
                    </Typography> */}
                    <Typography
  variant="h2"
  sx={{
    fontWeight: 900,
    mb: 2,
    fontSize: { xs: "2.4rem", md: "3.4rem" },
    lineHeight: 1.15,
    letterSpacing: "-0.01em",
  }}
>
  The{" "}
  <GradientText
    component="span"
    sx={{
      fontSize: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit",
      display: "inline",
    }}
  >
    Close
  </GradientText>{" "}
  That Runs Itself
</Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            maxWidth: 800,
                            mx: "auto",
                            mb: 4,
                            lineHeight: 1.55,
                        }}
                    >
                        {/* Omeca transforms the month-end close from a ten-day manual cycle into a
                        continuous, self-driven process. Each transaction reconciles, validates, and
                        anchors itself in real time — eliminating batching, rework, and lag. */}
                        Omeca turns the month-end close into a continuous self-driven process where every transaction reconciles and proves itself in real time.
                    </Typography>
                </motion.div>

                <Button
                    variant="contained"
                    size="large"
                    onClick={activeStep === -1 ? startSimulation : resetSimulation}
                    sx={{ mb: 4 }}
                >
                    {activeStep === -1 ? "► Start Simulation" : "■ Reset"}
                </Button>

                {/* === Steps Visualization === */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: { xs: "stretch", md: "center" },
                        gap: { xs: 2, md: 2 },
                        flexDirection: { xs: "column", md: "row" },
                        minHeight: 120,
                    }}
                >
                    {steps.map((step, i) => {
                        const isStepActive = i === activeStep;
                        const isStepComplete = (isComplete || i < activeStep) && activeStep !== -1;
                        const isStepUpcoming = i > activeStep && activeStep !== -1;

                        return (
                            <React.Fragment key={i}>
                                <motion.div
                                    animate={{
                                        opacity: isStepUpcoming ? 0.4 : 1,
                                        scale: isStepActive ? 1.05 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{ flex: 1 }}
                                >
                                    <Paper
                                        sx={{
                                            px: 2.5,
                                            py: 2,
                                            height: "100%",
                                            borderRadius: 3,
                                            border: isStepActive
                                                ? `2px solid ${step.color}`
                                                : `1px solid ${step.color}44`,
                                            boxShadow: isStepActive
                                                ? `0 0 16px ${step.color}88`
                                                : "none",
                                            transition: "border 0.3s, box-shadow 0.3s",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            {isStepComplete ? (
                                                <CheckCircleOutlineRoundedIcon
                                                    sx={{ color: colors.successGreen }}
                                                />
                                            ) : (
                                                <motion.span
                                                    animate={{
                                                        boxShadow: isStepActive
                                                            ? [
                                                                  `0 0 0px ${step.color}`,
                                                                  `0 0 12px ${step.color}`,
                                                                  `0 0 0px ${step.color}`,
                                                              ]
                                                            : `0 0 0px ${step.color}`,
                                                    }}
                                                    transition={{
                                                        duration: 1.2,
                                                        repeat: Infinity,
                                                    }}
                                                    style={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: "50%",
                                                        backgroundColor: step.color,
                                                        display: "inline-block",
                                                    }}
                                                />
                                            )}
                                            <Typography sx={{ fontWeight: 800 }}>
                                                {step.label}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "text.secondary", mt: 0.75 }}
                                        >
                                            {step.hint}
                                        </Typography>
                                    </Paper>
                                </motion.div>

                                {i < steps.length - 1 && (
                                    <Box
                                        sx={{
                                            display: { xs: "none", md: "flex" },
                                            alignItems: "center",
                                        }}
                                    >
                                        <motion.div
                                            style={{
                                                width: 32,
                                                height: 2,
                                                borderRadius: 1,
                                                backgroundColor: `${colors.silver}55`,
                                            }}
                                            animate={{
                                                backgroundColor: isStepComplete
                                                    ? colors.successGreen
                                                    : `${colors.silver}55`,
                                            }}
                                            transition={{ delay: 0.3 }}
                                        />
                                    </Box>
                                )}
                            </React.Fragment>
                        );
                    })}
                </Box>

                {/* === KPIs === */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        Real-Time KPIs
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        {kpis.map((item, i) => (
                            <Grid key={i} item xs={6} md={3}>
                                <motion.div
                                    key={item.kpi}
                                    initial={{ opacity: 0.8, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Paper
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            backgroundColor: isDark
                                                ? "rgba(0,0,0,0.2)"
                                                : "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 900,
                                                color: "primary.main",
                                            }}
                                        >
                                            {item.kpi}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.label}
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </SlideLayout>
    );
};

// const Slide8_MVP = () => {
//     const { mode } = useContext(ColorModeContext);
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//     const isDark = mode === "dark";
// 
//     const builtStack = [
//         { icon: <HubIcon />, title: "Connectors & Ingestion", text: "Read-only APIs for NetSuite, Adaptive, Workiva." },
//         { icon: <AccountTreeIcon />, title: "Unified Data Model", text: "Maps disparate schemas to a single Chart of Accounts." },
//         { icon: <PlaylistAddCheckIcon />, title: "Validation Engine", text: "Rule-based checks for period, COA, and completeness." },
//         { icon: <AnalyticsIcon />, title: "Close Graph & AIQ", text: "Live dashboard of reconciliation status and exception queue." },
//         { icon: <SecurityIcon />, title: "Immutable Audit Ledger", text: "SHA-anchored evidence chain for compliance." },
//     ];
//     const nextSteps = ["ERP Write-Back (NetSuite Journal Posting)", "ML-Driven Anomaly Detection & Risk Scoring", "Cross-Entity Policy Engine (Multi-Subsidiary)", "Continuous Audit Readiness Dashboard"];
// 
//     return (
//         <SlideLayout slideNumber={6} kicker="Product: Foundation & Future">
//             <Grid container spacing={5} alignItems="stretch" justifyContent="center" sx={{ pt: { xs: "2vh", md: "4vh" }, px: { xs: 2, md: 4 } }}>
//                 <Grid item xs={12} md={6}>
//                     <motion.div variants={fadeInUp}>
//                         <Typography variant="h2" sx={{ fontWeight: 900, mb: 1.5, fontSize: { xs: "2rem", md: "2.6rem" }, color: theme.palette.text.primary }}>What We’ve Built</Typography>
//                         <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 3, fontSize: { xs: "1rem", md: "1.15rem" }, maxWidth: 600, lineHeight: 1.55 }}>
//                             Our MVP establishes the <strong>Continuous Close Visibility Layer</strong> — providing a single, real-time financial truth before automation expands.
//                         </Typography>
//                         <Stack spacing={2.2}>
//                             {builtStack.map((item, i) => (
//                                 <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>
//                                     <Paper sx={{ p: 2.2, display: "flex", alignItems: "center", gap: 2, borderLeft: `4px solid ${colors.omecaCyan}`, borderRadius: 2, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.4)" : "0 4px 10px rgba(0,0,0,0.08)", transition: "all 0.3s ease", "&:hover": { transform: "translateY(-2px)", boxShadow: isDark ? "0 6px 18px rgba(0,0,0,0.55)" : "0 6px 18px rgba(0,0,0,0.12)" } }}>
//                                         {React.cloneElement(item.icon, { sx: { color: colors.omecaCyan, fontSize: 32 } })}
//                                         <Box>
//                                             <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary }}>{item.title}</Typography>
//                                             <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.95rem" }}>{item.text}</Typography>
//                                         </Box>
//                                     </Paper>
//                                 </motion.div>
//                             ))}
//                         </Stack>
//                     </motion.div>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <motion.div variants={fadeInUp}>
//                         <Paper sx={{ p: 3.5, borderRadius: 3, borderLeft: `4px solid ${colors.lucraGold}`, backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                             <Box>
//                                 <Typography variant="h2" sx={{ fontWeight: 900, mb: 1.5, fontSize: { xs: "2rem", md: "2.4rem" }, color: theme.palette.text.primary }}>What’s Next</Typography>
//                                 <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 3, fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 1.55 }}>
//                                     Phase 2 extends from <strong>visibility → proactive control</strong>, enabling real-time posting and predictive reconciliation.
//                                 </Typography>
//                                 <List dense>
//                                     {nextSteps.map((text) => (
//                                         <ListItem key={text} sx={{ px: 0, py: 0.5 }}>
//                                             <ListItemIcon sx={{ minWidth: 32 }}><AutoGraphIcon sx={{ color: colors.lucraGold }} /></ListItemIcon>
//                                             <ListItemText primary={text} primaryTypographyProps={{ fontSize: "1rem", color: theme.palette.text.primary }} />
//                                         </ListItem>
//                                     ))}
//                                 </List>
//                             </Box>
//                             <Divider sx={{ my: 3 }} />
//                             <Box>
//                                 <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, color: theme.palette.text.primary }}>Phase 1 Success Metrics</Typography>
//                                 <List dense>
//                                     {["↓ 60%+ in manual reconciliations", "↓ 40%+ in time-to-close", "Zero data integrity exceptions"].map((text) => (
//                                         <ListItem key={text} sx={{ px: 0, py: 0.4 }}>
//                                             <ListItemText primary={text} primaryTypographyProps={{ fontSize: "1rem", color: theme.palette.text.secondary }} />
//                                         </ListItem>
//                                     ))}
//                                 </List>
//                             </Box>
//                         </Paper>
//                     </motion.div>
//                 </Grid>
//             </Grid>
//         </SlideLayout>
//     );
// };
// Slide 8 — MVP & Results (Trimmed Presentation Version)
const Slide8_MVP = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isDark = mode === "dark";

  const builtStack = [
    { icon: <HubIcon />, title: "Event Ingestion", text: "Connects to billing, FP&A, and operational systems." },
    { icon: <AccountTreeIcon />, title: "Unified Data Model", text: "Normalizes every transaction into a shared financial graph." },
    { icon: <SecurityIcon />, title: "Audit Core", text: "Anchors evidence in an immutable ledger of record." },
  ];

  const nextSteps = [
    "Real-time posting and reconciliation",
    "Predictive variance control",
    "Continuous assurance and audit readiness",
  ];

  const metrics = [
    { value: "↓ 60%", label: "Manual Work" },
    { value: "↓ 40%", label: "Close Time" },
    { value: "0", label: "Integrity Exceptions" },
  ];

  return (
    <SlideLayout slideNumber={6} kicker="Product: Foundation and Traction">
      <Grid
        container
        spacing={5}
        alignItems="stretch"
        justifyContent="center"
        sx={{ pt: { xs: "2vh", md: "4vh" }, px: { xs: 2, md: 4 } }}
      >
        {/* === Left Column — What We’ve Built === */}
        <Grid item xs={12} md={6}>
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 1.5,
                fontSize: { xs: "2rem", md: "2.6rem" },
                color: theme.palette.text.primary,
              }}
            >
              What We’ve Built
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                mb: 3,
                fontSize: { xs: "1rem", md: "1.15rem" },
                maxWidth: 600,
                lineHeight: 1.5,
              }}
            >
              Omeca’s core is live. The system captures, reconciles, and verifies
              financial truth continuously across connected systems.
            </Typography>

            <Stack spacing={2.2}>
              {builtStack.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  <Paper
                    sx={{
                      p: 2.2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      borderLeft: `4px solid ${colors.omecaCyan}`,
                      borderRadius: 2,
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      sx: { color: colors.omecaCyan, fontSize: 32 },
                    })}
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.95rem" }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </Grid>

        {/* === Right Column — What’s Next & Results === */}
        <Grid item xs={12} md={6}>
          <motion.div variants={fadeInUp}>
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 3,
                borderLeft: `4px solid ${colors.lucraGold}`,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.02)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 1.5,
                    fontSize: { xs: "2rem", md: "2.4rem" },
                    color: theme.palette.text.primary,
                  }}
                >
                  What’s Next
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 3,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    lineHeight: 1.5,
                  }}
                >
                  Phase 2 advances from visibility to control with
                  predictive reconciliation and autonomous assurance.
                </Typography>

                <List dense>
                  {nextSteps.map((text) => (
                    <ListItem key={text} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AutoGraphIcon sx={{ color: colors.lucraGold }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: "1rem",
                          color: theme.palette.text.primary,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* === Metrics Section === */}
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    color: theme.palette.text.primary,
                  }}
                >
                  Phase 1 Results
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {metrics.map((m, i) => (
                    <Grid key={i} item xs={4}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 900,
                          color: colors.omecaCyan,
                        }}
                      >
                        {m.value}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {m.label}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </SlideLayout>
  );
};

// // Slide 9 — Roadmap: From Beachhead to Market Leader
// const Slide9_Roadmap = () => {
//     const { mode } = useContext(ColorModeContext);
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//     const isDark = mode === "dark";
// 
//     const roadmapPhases = [
//         {
//             phase: "1. Secure the Beachhead",
//             time: "Q1-Q2 2026",
//             items: ["Land 5+ NetSuite Design Partners", "Prove 60%+ reconciliation reduction", "Deliver Continuous Close Dashboard"],
//             outcome: "Referenceable Customers & Proven ROI",
//             color: colors.omecaCyan
//         },
//         {
//             phase: "2. Scale the Standard",
//             time: "Q3-Q4 2026",
//             items: ["Launch Policy & Validation Engine", "Add Workday & SAP Connectors", "Achieve SOC 2 Type 1 Compliance"],
//             outcome: "Enterprise-Ready & Compliant Platform",
//             color: colors.lucraGold
//         },
//         {
//             phase: "3. Deepen the Moat",
//             time: "Q1-Q2 2027",
//             items: ["Deploy ML-powered exception detection", "Automate ERP Write-Back", "Launch Immutable Audit Ledger"],
//             outcome: "Unmatched Automation & Auditability",
//             color: colors.successGreen
//         },
//         {
//             phase: "4. Own the Category",
//             time: "Q3 2027+",
//             items: ["Expand to Healthcare & Gov't", "Launch Partner & Developer APIs", "Cement market leadership"],
//             outcome: "Definitive Market Leadership",
//             color: colors.silver
//         },
//     ];
// 
//     return (
//         <SlideLayout slideNumber={8} kicker="Our 18-Month Plan">
//             <Box sx={{ textAlign: "center", mb: 6 }}>
//                 <motion.div variants={fadeInUp}>
//                     <Typography component="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.8rem", md: "3.2rem" }, lineHeight: 1.1, letterSpacing: "-0.015em", color: theme.palette.text.primary, mb: 2 }}>
//                         From <GradientText>Beachhead</GradientText> to Market Leader
//                     </Typography>
//                 </motion.div>
//                 <Typography variant="h6" sx={{ color: theme.palette.text.secondary, maxWidth: 820, mx: "auto", lineHeight: 1.55, fontSize: { xs: "1rem", md: "1.15rem" }, opacity: 0.95 }}>
//                     Our roadmap is a disciplined plan to prove value in a focused market, build a defensible moat, and establish Omeca as the indispensable trust layer for enterprise finance.
//                 </Typography>
//             </Box>
//             <Grid container spacing={4} alignItems="stretch">
//                 {roadmapPhases.map((r, i) => (
//                     <Grid key={r.phase} item xs={12} md={6}>
//                         <motion.div variants={fadeInUp} transition={{ delay: i * 0.1 }} style={{ height: '100%' }}>
//                             <Paper sx={{
//                                 p: 3.5,
//                                 height: "100%",
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 borderTop: `4px solid ${r.color}`,
//                                 borderRadius: 3,
//                                 backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
//                                 boxShadow: isDark ? "0 4px 14px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.1)",
//                                 transition: "all 0.3s ease",
//                                 "&:hover": { transform: "translateY(-3px)", boxShadow: isDark ? "0 6px 18px rgba(0,0,0,0.55)" : "0 6px 18px rgba(0,0,0,0.15)" }
//                             }}>
//                                 <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.5, color: theme.palette.text.primary }}>{r.phase}</Typography>
//                                 <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2, fontWeight: 500 }}>{r.time}</Typography>
//                                 <Stack spacing={1.5} sx={{ flexGrow: 1, my: 2 }}>
//                                     {r.items.map((item) => (
//                                         <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start' }}>
//                                             <CheckCircleOutlineRoundedIcon sx={{ color: r.color, mr: 1.5, mt: 0.5, fontSize: '1.2rem' }} />
//                                             <Typography variant="body1" sx={{ color: 'text.primary' }}>
//                                                 {item}
//                                             </Typography>
//                                         </Box>
//                                     ))}
//                                 </Stack>
//                                 <Chip label={`Outcome: ${r.outcome}`} variant="outlined" sx={{ mt: 'auto', borderColor: r.color, color: theme.palette.text.secondary, fontWeight: 600 }} />
//                             </Paper>
//                         </motion.div>
//                     </Grid>
//                 ))}
//             </Grid>
//         </SlideLayout>
//     );
// };

// Slide 9 — Roadmap: From Beachhead to Market Leader (Trimmed and Aligned)
// const Slide9_Roadmap = () => {
//   const { mode } = useContext(ColorModeContext);
//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//   const isDark = mode === "dark";
// 
// const roadmapPhases = [
//   {
//     phase: "1. Prove the Model",
//     time: "Q1–Q2 2026",
//     items: [
//       "Launch 3–5 paid design partners in project-driven finance teams",
//       "Validate Omeca Core (L1) across reconciliation and close automation use cases",
//       "Publish ROI benchmarks on speed, accuracy, and financial assurance",
//     ],
//     outcome: "Proof of value and reference design partners",
//     color: colors.omecaCyan,
//   },
//   {
//     phase: "2. Build the Channel",
//     time: "Q3–Q4 2026",
//     items: [
//       "Partner with CFO advisory and audit firms to co-market compliance visibility",
//       "Create implementation playbooks for NetSuite and Workday environments",
//       "Establish repeatable pilot-to-scale motion through trusted partners",
//     ],
//     outcome: "Credibility and repeatable distribution model",
//     color: colors.lucraGold,
//   },
//   {
//     phase: "3. Expand Enterprise Adoption",
//     time: "Q1–Q2 2027",
//     items: [
//       "Deploy Omeca Ledger (L2) for multi-entity, cross-border environments",
//       "Integrate policy and validation engine for compliance-grade automation",
//       "Achieve SOC 2 Type II certification and expand enterprise onboarding",
//     ],
//     outcome: "Enterprise-scale adoption and operational trust",
//     color: colors.successGreen,
//   },
//   {
//     phase: "4. Lead the Category",
//     time: "Q3 2027+",
//     items: [
//       "Launch developer APIs and audit integration toolkit",
//       "Expand into regulated and public-sector verticals",
//       "Establish Omeca as the category standard for continuous finance control",
//     ],
//     outcome: "Category leadership and ecosystem adoption",
//     color: colors.silver,
//   },
// ];
// 
// 
//   return (
//     <SlideLayout slideNumber={8} kicker="Go-To-Market Roadmap">
//       <Box sx={{ textAlign: "center", mb: 6 }}>
//         <motion.div variants={fadeInUp}>
// <Typography
//   variant="h2"
//   component="h1"
//   sx={{
//     fontWeight: 900,
//     fontSize: { xs: "2.5rem", md: "3.4rem" },
//     lineHeight: 1.1,
//     letterSpacing: "-0.015em",
//     color: theme.palette.text.primary,
//     mb: 2,
//   }}
// >
//   From <GradientText variant="inherit">Proof</GradientText> to Market Leadership
// </Typography>
// 
//         </motion.div>
//         <Typography
//           variant="h6"
//           sx={{
//             color: theme.palette.text.secondary,
//             maxWidth: 820,
//             mx: "auto",
//             lineHeight: 1.5,
//             fontSize: { xs: "1rem", md: "1.15rem" },
//             opacity: 0.95,
//           }}
//         >
// A disciplined path from pilot validation to enterprise adoption and category leadership.
//         </Typography>
//       </Box>
// 
//       <Grid container spacing={4} alignItems="stretch">
//         {roadmapPhases.map((r, i) => (
//           <Grid key={r.phase} item xs={12} md={6}>
//             <motion.div
//               variants={fadeInUp}
//               transition={{ delay: i * 0.1 }}
//               style={{ height: "100%" }}
//             >
//               <Paper
//                 sx={{
//                   p: 3.5,
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   borderTop: `4px solid ${r.color}`,
//                   borderRadius: 3,
//                   backgroundColor: isDark
//                     ? "rgba(255,255,255,0.03)"
//                     : "rgba(0,0,0,0.02)",
//                   boxShadow: isDark
//                     ? "0 4px 14px rgba(0,0,0,0.4)"
//                     : "0 4px 12px rgba(0,0,0,0.1)",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-3px)",
//                     boxShadow: isDark
//                       ? "0 6px 18px rgba(0,0,0,0.55)"
//                       : "0 6px 18px rgba(0,0,0,0.15)",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontWeight: 900,
//                     mb: 0.5,
//                     color: theme.palette.text.primary,
//                   }}
//                 >
//                   {r.phase}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: theme.palette.text.secondary,
//                     mb: 2,
//                     fontWeight: 500,
//                   }}
//                 >
//                   {r.time}
//                 </Typography>
// 
//                 <Stack spacing={1.5} sx={{ flexGrow: 1, my: 2 }}>
//                   {r.items.map((item) => (
//                     <Box
//                       key={item}
//                       sx={{ display: "flex", alignItems: "flex-start" }}
//                     >
//                       <CheckCircleOutlineRoundedIcon
//                         sx={{
//                           color: r.color,
//                           mr: 1.5,
//                           mt: 0.5,
//                           fontSize: "1.2rem",
//                         }}
//                       />
//                       <Typography variant="body1" sx={{ color: "text.primary" }}>
//                         {item}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Stack>
// 
//                 <Chip
//                   label={r.outcome}
//                   variant="outlined"
//                   sx={{
//                     mt: "auto",
//                     borderColor: r.color,
//                     color: theme.palette.text.secondary,
//                     fontWeight: 600,
//                   }}
//                 />
//               </Paper>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </SlideLayout>
//   );
// };

const Slide9_Roadmap = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isDark = mode === "dark";

const roadmapPhases = [
  {
    phase: "1. Prove the Model (Quality Focus)", // Renamed for clarity
    time: "Q1–Q2 2026",
    items: [
      "Launch 3–5 paid design partners with 100% successful deployment.", // Emphasize quality
      "Validate Omeca Core (L1) across reconciliation and close automation use cases.",
      "Establish Deployment Manager role to govern implementation quality and scale process.", // New strategic item
    ],
    outcome: "Proof of value and mitigated scale-risk", // Outcome emphasizes risk management
    color: colors.omecaCyan,
  },
  {
    phase: "2. Build the Channel & Scale Deployment", // Renamed for clarity
    time: "Q3–Q4 2026",
    items: [
      "Partner with CFO advisory and audit firms to co-market compliance visibility.",
      "Grow deployment team to ensure quality keeps pace with sales volume.", // Addresses the scaling risk
      "Establish repeatable pilot-to-scale motion through trusted partners.",
    ],
    outcome: "Credibility, Scalability, and Deployment Integrity", // Outcome emphasizes integrity
    color: colors.lucraGold,
  },
  {
    phase: "3. Expand Enterprise Adoption",
    time: "Q1–Q2 2027",
    items: [
      "Deploy Omeca Ledger (L2) for multi-entity, cross-border environments.",
      "Integrate policy and validation engine for compliance-grade automation.",
      "Achieve SOC 2 Type II certification and expand enterprise onboarding.",
    ],
    outcome: "Enterprise-scale adoption and operational trust",
    color: colors.successGreen,
  },
  {
    phase: "4. Lead the Category",
    time: "Q3 2027+",
    items: [
      "Launch developer APIs and audit integration toolkit.",
      "Expand into regulated and public-sector verticals (diversify outside SaaS).", // Incorporates the diversification goal
      "Establish Omeca as the category standard for continuous finance control.",
    ],
    outcome: "Category leadership and ecosystem adoption",
    color: colors.silver,
  },
];


  return (
    <SlideLayout slideNumber={8} kicker="Go-To-Market Roadmap">
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <motion.div variants={fadeInUp}>
<Typography
  variant="h2"
  component="h1"
  sx={{
    fontWeight: 900,
    fontSize: { xs: "2.5rem", md: "3.4rem" },
    lineHeight: 1.1,
    letterSpacing: "-0.015em",
    color: theme.palette.text.primary,
    mb: 2,
  }}
>
  From <GradientText variant="inherit">Proof</GradientText> to Market Leadership
</Typography>

        </motion.div>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 820,
            mx: "auto",
            lineHeight: 1.5,
            fontSize: { xs: "1rem", md: "1.15rem" },
            opacity: 0.95,
          }}
        >
A disciplined path from pilot validation to enterprise adoption and category leadership.
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="stretch">
        {roadmapPhases.map((r, i) => (
          <Grid key={r.phase} item xs={12} md={6}>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              style={{ height: "100%" }}
            >
              <Paper
                sx={{
                  p: 3.5,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderTop: `4px solid ${r.color}`,
                  borderRadius: 3,
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.02)",
                  boxShadow: isDark
                    ? "0 4px 14px rgba(0,0,0,0.4)"
                    : "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: isDark
                      ? "0 6px 18px rgba(0,0,0,0.55)"
                      : "0 6px 18px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    mb: 0.5,
                    color: theme.palette.text.primary,
                  }}
                >
                  {r.phase}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 2,
                    fontWeight: 500,
                  }}
                >
                  {r.time}
                </Typography>

                <Stack spacing={1.5} sx={{ flexGrow: 1, my: 2 }}>
                  {r.items.map((item) => (
                    <Box
                      key={item}
                      sx={{ display: "flex", alignItems: "flex-start" }}
                    >
                      <CheckCircleOutlineRoundedIcon
                        sx={{
                          color: r.color,
                          mr: 1.5,
                          mt: 0.5,
                          fontSize: "1.2rem",
                        }}
                      />
                      <Typography variant="body1" sx={{ color: "text.primary" }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Chip
                  label={r.outcome}
                  variant="outlined"
                  sx={{
                    mt: "auto",
                    borderColor: r.color,
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </SlideLayout>
  );
};

// // Slide 10 — Market Opportunity (Revised Narrative)
// const Slide10_MarketOpportunity = () => {
//     const { mode } = useContext(ColorModeContext);
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//     const isDark = mode === "dark";
// 
//     const marketData = [
//         { title: "Serviceable Obtainable Market (SOM)", value: "$562M", desc: "We're targeting ~4,500 US NetSuite companies under intense audit and IPO scrutiny. At a $125k ACV, this is our defensible $562M beachhead.", color: colors.successGreen },
//         { title: "Serviceable Available Market (SAM)", value: "$6.3B", desc: "After establishing the NetSuite standard, we will expand to the broader mid-market and enterprise segments using Workday and SAP, who face identical challenges at a greater scale.", color: colors.omecaCyan },
//         { title: "Total Addressable Market (TAM)", value: "$25B+", desc: "Our vision is to become the indispensable trust layer for all financial operations, capturing a significant share of the global finance automation market (Source: Gartner, 2025).", color: colors.lucraGold },
//     ];
// 
//     return (
//         <SlideLayout slideNumber={8} kicker="Market Opportunity">
//             <Box sx={{ textAlign: "center", px: { xs: 2, md: 4 }, pt: "6vh" }}>
//                 <motion.div variants={fadeInUp}>
//                     <Typography component="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.6rem", md: "3.2rem" }, lineHeight: 1.15, color: theme.palette.text.primary, mb: 2 }}>
//                         From a <GradientText variant="inherit">$562M Beachhead</GradientText> to Market Leadership
//                     </Typography>
//                 </motion.div>
//                 <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 400, lineHeight: 1.6, fontSize: { xs: "1rem", md: "1.15rem" }, maxWidth: 850, mx: "auto", mb: 5 }}>
//                     We are not boiling the ocean. Our strategy is to first dominate a high-pain, high-value niche and then expand from a position of market leadership.
//                 </Typography>
//                 <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ maxWidth: 1200, mx: "auto" }}>
//                     {marketData.map((m, i) => (
//                         <Grid key={m.title} item xs={12} md={4}>
//                             <motion.div variants={fadeInUp} transition={{ delay: 0.1 * i }}>
//                                 <Paper sx={{ p: 4, height: "100%", borderRadius: 3, borderTop: `4px solid ${m.color}`, backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center", boxShadow: isDark ? "0 4px 14px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.1)", transition: "all 0.3s ease", "&:hover": { transform: "translateY(-4px)", boxShadow: isDark ? "0 6px 18px rgba(0,0,0,0.55)" : "0 6px 18px rgba(0,0,0,0.15)" } }}>
//                                     <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 800, mb: 1 }}>{m.title}</Typography>
//                                     <Typography variant="h3" sx={{ fontWeight: 900, color: m.color, mb: 1.2, fontSize: { xs: "2rem", md: "2.6rem" } }}>{m.value}</Typography>
//                                     <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize: "1rem", lineHeight: 1.6, maxWidth: 320 }}>{m.desc}</Typography>
//                                 </Paper>
//                             </motion.div>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Typography variant="caption" sx={{ display: "block", mt: 5, color: theme.palette.text.secondary, fontSize: "0.9rem" }}>
//                     Sources: Gartner, Intricately, PitchBook, Omeca Internal Model
//                 </Typography>
//             </Box>
//         </SlideLayout>
//     );
// };
// Slide 10 — Market Opportunity: Where We Win First (Refined and Balanced)
const Slide10_MarketOpportunity = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isDark = mode === "dark";
  const omecaCyan = theme.palette.primary.main;

const columns = [
  {
    title: "The Legacy Control Crisis",
    bullets: [
      "Batch systems delay financial truth",
      "Manual reconciliation drives audit exposure",
      "No real-time explainability for AI-driven finance",
    ],
  },
  {
    title: "The $500M Wedge: The Graduation Gap",
    bullets: [
      "High-growth SaaS firms adopting AI at scale",
      "Teams outgrowing QuickBooks but avoiding ERP complexity",
      "Need for accurate SaaS rev rec without heavy infrastructure",
      "Omeca delivers compliance-grade control without an ERP overhaul",
    ],
  },
  {
    title: "The $230B Total Opportunity",
    bullets: [
      "ERP market reaching $229.8B by 2032",
      "Shift from passive record-keeping to continuous control",
      "Expansion into the $131B Office of the CFO category",
      "Omeca becomes the intelligent core of enterprise finance",
    ],
  },
];


  return (
    <SlideLayout slideNumber={9} kicker="Market Opportunity">
      <Box sx={{ pt: "6vh", textAlign: "center" }}>
        {/* === Headline === */}
        <motion.div variants={fadeInUp}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.8rem", md: "3.8rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            The <GradientText variant="inherit">$230 Billion Opportunity</GradientText>
          </Typography>
        </motion.div>

        {/* === Subheadline === */}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 820,
            mx: "auto",
            mb: 5,
            lineHeight: 1.55,
            fontSize: { xs: "1rem", md: "1.15rem" },
          }}
        >
Finance is shifting to real-time control, the largest ERP market transformation in decades.        </Typography>

        {/* === Columns === */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {columns.map((col, idx) => (
            <Grid key={idx} item xs={12} md={4}>
              <motion.div
                variants={fadeInUp}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                style={{ height: "100%" }}
              >
                <Paper
                  sx={{
                    p: 3.5,
                    borderRadius: 3,
                    textAlign: "left",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.03)",
                    border: `1px solid ${omecaCyan}33`,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: isDark
                        ? "0 6px 18px rgba(0,0,0,0.55)"
                        : "0 6px 18px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 1.5,
                        color: theme.palette.text.primary,
                        lineHeight: 1.3,
                      }}
                    >
                      {col.title}
                    </Typography>

                    <List dense>
                      {col.bullets.map((b, i) => (
                        <ListItem key={i} sx={{ py: 0.4 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <span
                              style={{
                                color: omecaCyan,
                                fontSize: "1.2rem",
                                lineHeight: 1,
                              }}
                            >
                              •
                            </span>
                          </ListItemIcon>
                          <ListItemText
                            primary={b}
                            primaryTypographyProps={{
                              variant: "body2",
                              sx: { color: theme.palette.text.secondary },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      fontStyle: "italic",
                      color: theme.palette.text.secondary,
                      lineHeight: 1.4,
                    }}
                  >
                    {col.note}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* === Source Attribution === */}
{/* === Source Attribution (Cleaned Up) === */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 5,
            color: theme.palette.text.disabled,
            fontSize: "0.75rem",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Sources: Fortune Business Insights (2024), Global Market Insights (2024), Carlsquare CFO Report (2025).  
          All figures in USD; CAGR and market sizes cited per public reports.
        </Typography>
      </Box>
    </SlideLayout>
  );
};


// // Slide 10 — Market Opportunity: Where We Win First (Consistent Styling)
// const Slide10_MarketOpportunity = () => {
//   const { mode } = useContext(ColorModeContext);
//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//   const isDark = mode === "dark";
// 
//   const columns = [
//     {
//       title: "Legacy ERPs Can’t Keep Up",
//       bullets: [
//         "Batch-based systems delay financial truth",
//         "Slow, error-prone closes create risk",
//         "No real-time visibility or explainability",
//       ],
//     },
//     {
//       title: "Our Entry Point",
//       bullets: [
//         "Project-driven teams with fragmented data",
//         "CFOs seeking control without ERP overhaul",
//         "Omeca Core delivers continuous reconciliation first",
//       ],
//     },
//     {
//       title: "The Expansion Path",
//       bullets: [
//         "Starts with visibility and trust",
//         "Extends into automated posting and control",
//         "Becomes the new financial core across industries",
//       ],
//     },
//   ];
// 
//   return (
//     <SlideLayout slideNumber={9} kicker="Market Entry and Expansion">
//       <Box sx={{ pt: "6vh", textAlign: "center" }}>
//         {/* === Headline === */}
//         <motion.div variants={fadeInUp}>
//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 900,
//               fontSize: { xs: "2.5rem", md: "3.4rem" },
//               lineHeight: 1.1,
//               letterSpacing: "-0.015em",
//               color: theme.palette.text.primary,
//               mb: 2,
//             }}
//           >
//             Where{" "}
//             <GradientText
//               component="span"
//               sx={{
//                 fontSize: "inherit",
//                 fontWeight: "inherit",
//                 lineHeight: "inherit",
//                 letterSpacing: "inherit",
//                 display: "inline",
//               }}
//             >
//               We Win
//             </GradientText>{" "}
//             First
//           </Typography>
//         </motion.div>
// 
//         {/* === Subheadline === */}
//         <Typography
//           variant="h6"
//           sx={{
//             color: theme.palette.text.secondary,
//             maxWidth: 820,
//             mx: "auto",
//             mb: 5,
//             lineHeight: 1.55,
//             fontSize: { xs: "1rem", md: "1.15rem" },
//           }}
//         >
//           Omeca enters where control is most urgent and payoff is highest.
//           It replaces reconciliation work with a continuous, explainable
//           system of financial truth.
//         </Typography>
// 
//         {/* === 3-Column Grid === */}
//         <Grid container spacing={4} justifyContent="center">
//           {columns.map((col, idx) => (
//             <Grid key={idx} item xs={12} md={4}>
//               <motion.div
//                 variants={fadeInUp}
//                 transition={{ delay: idx * 0.1, duration: 0.6 }}
//               >
//                 <Paper
//                   sx={{
//                     p: 3.5,
//                     borderRadius: 3,
//                     textAlign: "left",
//                     height: "100%",
//                     backgroundColor: isDark
//                       ? "rgba(255,255,255,0.04)"
//                       : "rgba(0,0,0,0.03)",
//                     border: `1px solid ${colors.omecaCyan}33`,
//                     transition: "all 0.25s ease",
//                     "&:hover": {
//                       transform: "translateY(-3px)",
//                       boxShadow: isDark
//                         ? "0 6px 18px rgba(0,0,0,0.55)"
//                         : "0 6px 18px rgba(0,0,0,0.15)",
//                     },
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 800,
//                       mb: 1.5,
//                       color: theme.palette.text.primary,
//                       lineHeight: 1.3,
//                     }}
//                   >
//                     {col.title}
//                   </Typography>
// 
//                   <List dense>
//                     {col.bullets.map((b, i) => (
//                       <ListItem key={i} sx={{ py: 0.4 }}>
//                         <ListItemIcon sx={{ minWidth: 30 }}>
//                           <CheckCircleOutlineRoundedIcon
//                             sx={{
//                               color: colors.omecaCyan,
//                               fontSize: 18,
//                             }}
//                           />
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={b}
//                           primaryTypographyProps={{
//                             variant: "body2",
//                             sx: { color: theme.palette.text.secondary },
//                           }}
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
// 
//         {/* === Optional Bottom Caption === */}
//         <Typography
//           variant="caption"
//           sx={{
//             display: "block",
//             mt: 5,
//             color: theme.palette.text.disabled,
//           }}
//         >
//           Source: Gartner (2024); PwC (2023); Deloitte (2024) — estimated $200 B
//           total addressable market for ERP modernization and automation.
//         </Typography>
//       </Box>
//     </SlideLayout>
//   );
// };


// ... (Slide 11 Business Model remains unchanged)
// const Slide11_BusinessModel = () => {
//     const { mode } = useContext(ColorModeContext);
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//     const isDark = mode === "dark";
// 
//     const tiers = [
//         { name: "Connected Finance Pilot", price: "$25K–$50K", color: colors.lucraGold, desc: "Design-partner engagement to implement Omeca’s visibility layer and quantify ROI before full rollout.", features: ["Read-only ERP integrations (NetSuite, Adaptive, Workiva)", "Close State Dashboard setup", "Validation rule configuration", "ROI & efficiency report delivery"], icon: <AccountBalanceWalletIcon sx={{ fontSize: 36, color: colors.lucraGold, mb: 1 }} /> },
//         { name: "Enterprise Control Layer", price: "$125K+ ACV", color: colors.omecaCyan, desc: "Full SaaS platform delivering continuous close automation and enterprise-grade financial control.", features: ["Real-time validation & exception queue", "Immutable audit ledger", "Multi-entity support and custom rules", "Dedicated onboarding & success partner"], icon: <PriceCheckIcon sx={{ fontSize: 36, color: colors.omecaCyan, mb: 1 }} /> },
//     ];
// 
//     return (
//         <SlideLayout slideNumber={9} kicker="Business Model & Pricing">
//             <Box sx={{ pt: "6vh", pb: "4vh", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", px: { xs: 2, md: 4 } }}>
//                 <motion.div variants={fadeInUp}>
//                     <Typography component="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.6rem", md: "3.3rem" }, lineHeight: 1.15, letterSpacing: "-0.015em", mb: 2, color: theme.palette.text.primary }}>
//                         <Box component="span" sx={{ background: `linear-gradient(90deg, ${colors.omecaCyan}, ${colors.lucraGold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 900 }}>Pricing</Box> for Proof and Predictable Scale
//                     </Typography>
//                 </motion.div>
//                 <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 400, fontSize: { xs: "1.1rem", md: "1.25rem" }, maxWidth: 880, mx: "auto", mb: 6, lineHeight: 1.55 }}>
//                     Omeca’s pricing aligns with measurable value creation — starting with proof-of-impact pilots, then scaling predictably across entities and transactions.
//                 </Typography>
//                 <Grid container spacing={4} justifyContent="center" alignItems="stretch">
//                     {tiers.map((tier, i) => (
//                         <Grid key={tier.name} item xs={12} md={6}>
//                             <motion.div variants={fadeInUp} transition={{ delay: 0.1 * i }}>
//                                 <Paper sx={{ p: 4, height: "100%", border: `3px solid ${tier.color}`, borderRadius: 4, backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", boxShadow: isDark ? "0 4px 14px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "flex-start", transition: "all 0.3s ease", "&:hover": { transform: "translateY(-3px)", boxShadow: isDark ? "0 6px 18px rgba(0,0,0,0.55)" : "0 6px 18px rgba(0,0,0,0.15)" } }}>
//                                     {tier.icon}
//                                     <Typography variant="h5" sx={{ fontWeight: 900, color: tier.color, mb: 1 }}>{tier.name}</Typography>
//                                     <Typography variant="h4" sx={{ fontWeight: 900, color: tier.color, mb: 1.5 }}>{tier.price}</Typography>
//                                     <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2, flexGrow: 0 }}>{tier.desc}</Typography>
//                                     <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", flexGrow: 1 }}>
//                                         {tier.features.map((feature) => (
//                                             <Typography key={feature} variant="body2" sx={{ display: "flex", alignItems: "flex-start", mb: 0.8, color: theme.palette.text.primary, fontSize: "1rem" }}>
//                                                 <CheckCircleOutlineRoundedIcon sx={{ color: tier.color, fontSize: 20, mt: 0.3, mr: 1 }} />
//                                                 {feature}
//                                             </Typography>
//                                         ))}
//                                     </Box>
//                                 </Paper>
//                             </motion.div>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Box sx={{ mt: 5 }}>
//                     <Chip label="Monetization: Annual Subscription · Expansion via entities & transaction volume · Channel via ERP/GRC partners" sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", color: theme.palette.text.secondary, borderRadius: 2, px: 2, py: 1, fontWeight: 600 }} />
//                 </Box>
//             </Box>
//         </SlideLayout>
//     );
// };
const Slide11_MarketValidation = () => {
  const { mode } = useContext(ColorModeContext);

  const validations = [
    {
      label: "Automation Appetite",
      desc: "Rillet, Pilot, and Ramp proved CFOs will adopt AI-driven accounting to eliminate manual close work.",
    },
    {
      label: "Graduation Gap",
      desc: "Thousands of mid-market firms outgrow QuickBooks yet aren’t ready for NetSuite or Workday complexity.",
    },
    {
      label: "Experience = Retention",
      desc: "Rillet’s 5-star G2 rating shows onboarding excellence drives trust and retention in finance systems.",
    },
    {
      label: "AI Limits",
      desc: "Automation ERPs still rely on batch ledgers and manual reconciliation — speed without assurance.",
    },
    {
      label: "Investor Signal",
      desc: "AI finance platforms have raised over $1B+ in the past 24 months — proving category readiness.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <SlideLayout slideNumber={11} kicker="Market Validation">
      <motion.div variants={container} initial="hidden" animate="show" style={{ width: "100%" }}>
        <Box
          sx={{
            minHeight: { xs: "86vh", md: "84vh" },
            pt: { xs: "4vh", md: "6vh" },
            pb: { xs: "3vh", md: "4vh" },
            px: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <motion.div variants={item}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.6rem", sm: "3.2rem", md: "3.6rem" },
                lineHeight: 1.1,
                mb: 2,
                color: mode === "dark" ? "#FFFFFF" : "#111111",
              }}
            >
              AI ERPs Have Validated the Need for{" "}
              <GradientText variant="inherit">Real-Time Finance</GradientText>
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography
              variant="h6"
              sx={{
                color: colors[mode].textDim,
                maxWidth: 760,
                mx: "auto",
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Automation 1.0 proved that finance teams crave faster closes.  
              The next evolution demands continuous, explainable trust.
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={{ xs: 3, sm: 4 }}
            justifyContent="center"
            alignItems="stretch"
            sx={{ maxWidth: 1200, mx: "auto" }}
          >
            {validations.map((v, idx) => (
              <Grid key={v.label} item xs={12} sm={6} md={4}>
                <motion.div variants={item} whileHover={{ scale: 1.02 }}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      textAlign: "left",
                      height: "100%",
                      backgroundColor:
                        mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.03)",
                      border: `1px solid ${colors[mode].borderSubtle}`,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        boxShadow: mode === "dark"
                          ? "0 6px 14px rgba(0,0,0,0.45)"
                          : "0 6px 14px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: colors.omecaCyan,
                        fontWeight: 700,
                        mb: 0.8,
                      }}
                    >
                      {v.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors[mode].textDim,
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {v.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div variants={item}>
            <Box sx={{ mt: 5 }}>
              <Typography
                variant="h6"
                sx={{
                  color: colors[mode].textPrimary,
                  fontWeight: 500,
                  maxWidth: 760,
                  mx: "auto",
                  lineHeight: 1.5,
                }}
              >
                The market has proved automation.{" "}
                <GradientText variant="inherit">Now it demands trust.</GradientText>
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </SlideLayout>
  );
};

const Slide_Tiers = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useTheme();

  const gradientTitle = {
    background: "linear-gradient(90deg, #00E5BE, #8FFF5A)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const cardStyle = {
    p: 3.5,
    borderRadius: 4,
    height: "100%",
    backdropFilter: "blur(12px)",
    background: mode === "dark"
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    transition: "all 0.25s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 28px rgba(0,229,190,0.25)",
    },
  };

  const tiers = [
    {
      title: "Tier 1 | Legacy ERPs",
      verb: "Record",
      desc: "Static ledgers create delayed financial truth.",
    },
    {
      title: "Tier 2 | Automation ERPs",
      verb: "Accelerate",
      desc: "Faster workflows but still tied to batch accounting.",
    },
    {
      title: "Tier 3 | Omeca",
      verb: "Control",
      desc: "Real-time verification and proof in one continuous loop.",
      highlight: true,
    },
  ];

  return (
    <SlideLayout slideNumber={12} kicker="Competitive Landscape">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        {/* === Title: Cleaned up the repetition of "AThree Tiers" === */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.6rem", sm: "3.2rem", md: "3.6rem" },
            lineHeight: 1.1,
            mb: 2,
            color: mode === "dark" ? "#FFFFFF" : "#111111",
          }}
        >
          The <GradientText variant="inherit">Three Tiers</GradientText> of Financial Systems
        </Typography>

        {/* === Subtitle === */}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            mb: 5,
            maxWidth: 760,
            lineHeight: 1.4,
            fontWeight: 400,
          }}
        >
          From static recording to continuous control. Real control begins with proof.
        </Typography>

        {/* === Cards === */}
        <Grid container spacing={4} sx={{ maxWidth: 1200 }}>
          {tiers.map((t, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Paper
                  sx={{
                    ...cardStyle,
                    border:
                      t.highlight
                        ? "1px solid rgba(0,229,190,0.5)"
                        : cardStyle.border,
                    boxShadow:
                      t.highlight
                        ? "0 0 22px rgba(0,229,190,0.3)"
                        : "none",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      color: t.highlight
                        ? "#00E5BE"
                        : theme.palette.text.primary,
                    }}
                  >
                    {t.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: t.highlight
                        ? "#8FFF5A"
                        : theme.palette.text.primary,
                    }}
                  >
                    {t.verb}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      maxWidth: 320,
                      lineHeight: 1.45,
                    }}
                  >
                    {t.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* === Footer line === */}
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mt: 6,
            maxWidth: 760,
          }}
        >
          Tier 3 is the only layer that creates real control through verified truth.
        </Typography>
      </Box>
    </SlideLayout>
  );
};

const Slide12_LeapBeyondAutomation = () => {
  const { mode } = useContext(ColorModeContext);

  const comparisons = [
    {
      leftTitle: "Automation ERPs",
      leftText: "AI-driven platforms like QuickBooks, Rillet, and Pilot automate data entry and accelerate close cycles.",
      rightTitle: "Omeca Cognitive ERP",
      rightText: "Omeca eliminates reconciliation itself — every transaction posts, validates, and explains in real time.",
    },
    {
      leftTitle: "Focus on Speed",
      leftText: "Automation rules classify faster, but still rely on static ledgers and manual controls.",
      rightTitle: "Focus on Trust + Continuity",
      rightText: "Each event carries immutable provenance — continuous compliance becomes the default state.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };

  return (
    <SlideLayout slideNumber={12} kicker="Omeca Advantage">
      <motion.div variants={container} initial="hidden" animate="show">
        <Box
          sx={{
            minHeight: { xs: "86vh", md: "84vh" },
            pt: { xs: "4vh", md: "6vh" },
            pb: { xs: "3vh", md: "4vh" },
            px: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <motion.div variants={item}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.6rem", sm: "3.2rem", md: "3.6rem" },
                lineHeight: 1.1,
                mb: 2,
                color: mode === "dark" ? "#FFFFFF" : "#111111",
              }}
            >
              From{" "}
              <GradientText variant="inherit">Automated Accounting</GradientText>{" "}
              to <GradientText variant="inherit">Trusted Finance</GradientText>
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography
              variant="h6"
              sx={{
                color: colors[mode].textDim,
                maxWidth: 780,
                mx: "auto",
                mb: 5,
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Automation made finance faster. <strong>Omeca makes it trustworthy.</strong>
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={{ xs: 3, sm: 4 }}
            justifyContent="center"
            alignItems="stretch"
            sx={{ maxWidth: 1100, mx: "auto" }}
          >
            {comparisons.map((pair, idx) => (
              <Grid key={idx} item xs={12}>
                <motion.div variants={item} whileHover={{ scale: 1.01 }}>
                  <Paper
                    sx={{
                      p: { xs: 2.5, sm: 3 },
                      borderRadius: 3,
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                      alignItems: "stretch",
                      gap: { xs: 2, md: 4 },
                      border: `1px solid ${colors[mode].borderSubtle}`,
                      background:
                        mode === "dark"
                          ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))"
                          : "linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.01))",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: mode === "dark"
                          ? "0 8px 22px rgba(0,0,0,0.5)"
                          : "0 8px 22px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    {/* LEFT */}
                    <Box sx={{ flex: 1, textAlign: "left" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: colors.lucraGold, mb: 1 }}
                      >
                        {pair.leftTitle}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colors[mode].textDim, lineHeight: 1.5 }}
                      >
                        {pair.leftText}
                      </Typography>
                    </Box>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderColor: colors[mode].borderSubtle,
                        display: { xs: "none", md: "block" },
                      }}
                    />

                    {/* RIGHT */}
                    <Box sx={{ flex: 1, textAlign: "left" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, color: colors.omecaCyan, mb: 1 }}
                      >
                        {pair.rightTitle}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colors[mode].textDim, lineHeight: 1.5 }}
                      >
                        {pair.rightText}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div variants={item}>
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: colors.omecaCyan,
                  mb: 0.5,
                }}
              >
                ERP 2.0 = The Cognitive ERP
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: colors[mode].textDim,
                  maxWidth: 680,
                  mx: "auto",
                  lineHeight: 1.45,
                }}
              >
                Automation ERPs record faster — <strong>Omeca controls continuously.</strong>
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </SlideLayout>
  );
};


const Slide11_BusinessModel = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isDark = mode === "dark";

  const tiers = [
    {
      name: "Connected Finance Pilot",
      price: "$25K–$50K",
      color: colors.lucraGold,
      desc: "Proof-of-value engagement quantifying ROI through continuous visibility and control.",
      features: [
        "Read-only ERP integration setup",
        "Close visibility dashboard",
        "Validation rule configuration",
        "ROI and efficiency analysis",
      ],
      icon: (
        <AccountBalanceWalletIcon
          sx={{ fontSize: 40, color: colors.lucraGold, mb: 2 }}
        />
      ),
    },
    {
      name: "Enterprise Control Layer",
      price: "$125K+ ACV",
      color: colors.omecaCyan,
      desc: "Full SaaS deployment delivering continuous reconciliation, governance, and enterprise-scale control.",
      features: [
        "Real-time validation and exception queue",
        "Immutable audit ledger",
        "Multi-entity and policy engine",
        "Dedicated success and compliance partner",
      ],
      icon: (
        <PriceCheckIcon
          sx={{ fontSize: 40, color: colors.omecaCyan, mb: 2 }}
        />
      ),
    },
  ];

  return (
    <SlideLayout slideNumber={10} kicker="Business Model & Pricing">
      <Box
        sx={{
          pt: "6vh",
          pb: "4vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* === Headline === */}
<motion.div variants={fadeInUp}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "3.4rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            <GradientText
              component="span"
              sx={{
                fontSize: "inherit",
                fontWeight: "inherit",
                lineHeight: "inherit",
              }}
            >
              Pricing
            </GradientText>{" "}
            for Proof and Scale
          </Typography>
        </motion.div>

        {/* === Subheadline === */}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 820,
            mx: "auto",
            mb: 6,
            fontSize: { xs: "1rem", md: "1.15rem" },
            lineHeight: 1.55,
          }}
        >
          Omeca turns pilot validation into predictable recurring growth.
        </Typography>

        {/* === Pricing Tiers === */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {tiers.map((tier, i) => (
            <Grid key={tier.name} item xs={12} md={6}>
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.1 * i }}
                style={{ height: "100%" }}
              >
                <Paper
                  sx={{
                    p: 4,
                    height: "100%",
                    border: `2px solid ${tier.color}`,
                    borderRadius: 3,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.02)",
                    boxShadow: isDark
                      ? "0 4px 14px rgba(0,0,0,0.4)"
                      : "0 4px 12px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    textAlign: "left", // ensures all text aligns left
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: isDark
                        ? "0 6px 18px rgba(0,0,0,0.55)"
                        : "0 6px 18px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {tier.icon}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      color: tier.color,
                      mb: 0.5,
                    }}
                  >
                    {tier.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      color: tier.color,
                      mb: 1.5,
                    }}
                  >
                    {tier.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 2.5,
                      lineHeight: 1.5,
                      minHeight: 60,
                      textAlign: "left", // ✅ fix for awkward centering
                    }}
                  >
                    {tier.desc}
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      p: 0,
                      m: 0,
                      listStyle: "none",
                      flexGrow: 1,
                    }}
                  >
                    {tier.features.map((feature) => (
                      <Typography
                        key={feature}
                        variant="body2"
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 0.7,
                          color: theme.palette.text.primary,
                          fontSize: "0.95rem",
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            color: tier.color,
                            fontSize: 18,
                            mt: 0.25,
                            mr: 1,
                          }}
                        />
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* === Monetization Note === */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 5,
            color: theme.palette.text.disabled,
          }}
        >
          Monetization: Annual subscription · Expansion by entity and transaction
          volume · Channel partnerships with ERP and GRC providers
        </Typography>
      </Box>
    </SlideLayout>
  );
};

const Slide_MOTS = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const colors = {
    omecaCyan: theme.palette.primary.main,
    textPrimary: theme.palette.text.primary,
    textDim: theme.palette.text.secondary,
  };

  const layers = [
    {
      title: "L1 | Omeca Core",
      desc: "Owns the verified data stream across cash, spend, and operations.",
      outcome: "Creates a data ownership moat. All AI, analytics, and reporting tools must connect to Omeca’s clean, trusted stream.",
    },
    {
      title: "L2 | Omeca Ledger",
      desc: "Automates every GAAP and IFRS posting rule in real time.",
      outcome: "Creates a logic moat. The proprietary accounting engine eliminates manual reconciliation and is difficult to replicate.",
    },
    {
      title: "L3 | Omeca Governance",
      desc: "Records the ‘why’ behind every transaction as immutable proof.",
      outcome: "Creates a credibility moat. The cryptographic attestation layer becomes the single source of regulatory trust.",
    },
  ];

  return (
    <SlideLayout slideNumber={13} kicker="Architectural Moat">
<Box
  sx={{
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    px: 3,
  }}
>
  {/* === Title === */}
  <Typography
    variant="h3"
    sx={{
      fontWeight: 900,
      mb: 1.5,
      fontSize: { xs: "2.1rem", sm: "2.5rem", md: "2.9rem" },
      background: `linear-gradient(90deg, ${colors.omecaCyan}, ${
        mode === "dark" ? "#A7F3D0" : "#00796B"
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.015em",
      lineHeight: 1.1,
    }}
  >
    The Machine of Trust
  </Typography>

  {/* === Subheader === */}
  <Typography
    variant="h5"
    sx={{
      fontWeight: 700,
      mb: 5,
      fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
      color:
        mode === "dark"
          ? "rgba(255,255,255,0.85)"
          : "rgba(0,0,0,0.8)",
      letterSpacing: "-0.01em",
    }}
  >
    Omeca’s Architectural Moat
  </Typography>

  {/* === Subtitle / Tagline === */}
  <Typography
    variant="body1"
    sx={{
      color:
        mode === "dark"
          ? "rgba(255,255,255,0.7)"
          : "rgba(0,0,0,0.65)",
      fontWeight: 400,
      maxWidth: 640,
      mx: "auto",
      mb: 6,
      lineHeight: 1.5,
      fontSize: { xs: "1rem", sm: "1.05rem" },
    }}
  >
Competes on verification, not automation. Every verified event strengthens the system.
  </Typography>

        {/* === Layer Grid === */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{ maxWidth: 1100 }}
        >
          {layers.map((layer, i) => (
            <Grid key={i} item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  background:
                    mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.03)",
                  border: `1px solid ${theme.palette.divider}`,
                  textAlign: "left",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      mode === "dark"
                        ? "0 6px 14px rgba(0,0,0,0.4)"
                        : "0 6px 14px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: colors.omecaCyan,
                    mb: 1,
                  }}
                >
                  {layer.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: colors.textDim,
                    mb: 1.2,
                    lineHeight: 1.45,
                  }}
                >
                  {layer.desc}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: colors.textPrimary,
                    fontWeight: 600,
                    lineHeight: 1.45,
                  }}
                >
                  {layer.outcome}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* === Footer === */}
        <Typography
          variant="body1"
          sx={{
            color: colors.textDim,
            mt: 6,
            maxWidth: 700,
            mx: "auto",
          }}
        >
          <GradientText variant="inherit">The Machine of Trust</GradientText> 
          links data, logic, and proof into a compounding loop that no automation tool can replicate.
        </Typography>
      </Box>
    </SlideLayout>
  );
};


const Slide11a_FinancialPath = () => {
    const { mode } = useContext(ColorModeContext);
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    const assumptions = [
        { text: "High-value enterprise ACV ($125K+)", icon: <PriceCheckIcon /> },
        { text: "Design partner GTM (5–8 pilots)", icon: <GroupsIcon /> },
        { text: "130%+ NRR via entity expansion", icon: <AutoGraphIcon /> },
        { text: "80%+ gross margins, efficient scale", icon: <AccountBalanceWalletIcon /> },
    ];

    const forecastData = [
        { metric: "ARR", y1: "$750K", y2: "$3.5M", y3: "$10M" },
        { metric: "Customers", y1: "6", y2: "25", y3: "70+" },
        { metric: "Headcount", y1: "12", y2: "25", y3: "50" },
        { metric: "Runway", y1: "18 mo +", y2: "Series A", y3: "Growth" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    };

    return (
        <SlideLayout slideNumber={10} kicker="Financial Path">
            <motion.div variants={containerVariants} initial="hidden" animate="show">
                <Box sx={{ textAlign: "center", mb: 5, px: { xs: 2, md: 4 } }}>
                    {/* --- HERO TITLE --- */}
                    <motion.div variants={itemVariants}>
<Typography
  variant="h1"
  component="h1"
  sx={{
    fontWeight: 900,
    fontSize: { xs: "2.5rem", md: "3.4rem" },
    lineHeight: 1.1,
    mb: 2,
    letterSpacing: "-0.015em",
    color: theme.palette.text.primary,
  }}
>
  Our Path to <GradientText variant="inherit">Market Leadership</GradientText>
</Typography>

                    </motion.div>

                    {/* --- SUBHEAD --- */}
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: 820,
                                mx: "auto",
                                lineHeight: 1.6,
                                fontSize: { xs: "1rem", md: "1.15rem" },
                                opacity: 0.9,
                            }}
                        >
                            A governance-first model scaling predictably with durable enterprise margins
                            and a capital-efficient trajectory.
                        </Typography>
                    </motion.div>
                </Box>

                <Grid container spacing={5} alignItems="center">
                    {/* --- LEFT TABLE --- */}
                    <Grid item xs={12} md={7}>
                        <motion.div variants={itemVariants}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    backgroundColor:
                                        mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                                }}
                            >
                                <Grid
                                    container
                                    sx={{
                                        borderBottom: 2,
                                        borderColor: colors.lucraGold,
                                        pb: 1,
                                        mb: 1,
                                        textAlign: "center",
                                    }}
                                >
                                    <Grid item xs={3}>
                                        <Typography variant="h6" color="text.secondary">
                                            Metric
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" sx={{ color: colors.omecaCyan }}>
                                            Year 1
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" sx={{ color: colors.omecaCyan }}>
                                            Year 2
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" sx={{ color: colors.omecaCyan }}>
                                            Year 3
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {forecastData.map((row, i) => (
                                    <motion.div key={row.metric} variants={itemVariants}>
                                        <Grid
                                            container
                                            sx={{
                                                py: 1.4,
                                                borderBottom:
                                                    i < forecastData.length - 1
                                                        ? `1px solid ${theme.palette.divider}`
                                                        : "none",
                                                alignItems: "center",
                                                textAlign: "center",
                                            }}
                                        >
                                            <Grid item xs={3}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{ fontWeight: 700, textAlign: "left" }}
                                                >
                                                    {row.metric}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6">{row.y1}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6">{row.y2}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6">{row.y3}</Typography>
                                            </Grid>
                                        </Grid>
                                    </motion.div>
                                ))}
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* --- RIGHT SIDEBAR --- */}
                    <Grid item xs={12} md={5}>
                        <motion.div variants={itemVariants}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    color: colors.lucraGold,
                                    mb: 2,
                                    textAlign: "left",
                                }}
                            >
                                Core Model Drivers
                            </Typography>
                            <List>
                                {assumptions.map((item, i) => (
                                    <motion.div key={i} variants={itemVariants}>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemIcon sx={{ minWidth: 40, color: colors.omecaCyan }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{
                                                    variant: "h6",
                                                    fontWeight: 500,
                                                    fontSize: { xs: "1rem", md: "1.05rem" },
                                                }}
                                            />
                                        </ListItem>
                                    </motion.div>
                                ))}
                            </List>
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>
        </SlideLayout>
    );
};

// ... (Remaining slides 12, 13, 14, 15 remain unchanged from original Omeca deck)
const Slide12_Traction = () => {
    const { mode } = useContext(ColorModeContext);
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    const isDark = mode === "dark";

    const cards = [
        // { title: "Design Partner Interest", stat: "6+", statColor: colors.omecaCyan, desc: "Controllers, systems architects, and CFOs from mid-market to enterprise finance teams have entered pilot scoping conversations.", color: colors.omecaCyan },
        // { title: "Technical Validation", stat: "NVIDIA", statColor: colors.lucraGold, desc: "Accepted into NVIDIA Inception — confirming the technical soundness of Omeca’s architecture and AI roadmap.", color: colors.lucraGold },
        // { title: "Channel & Platform Alignment", stat: "ERP+", statColor: colors.successGreen, desc: "Active channel discussions with CFO advisory firms and ERP integration partners across NetSuite, Workday, SAP, and Workiva ecosystems.", color: colors.successGreen },
        { title: "Design Partner Outreach", stat: "5–7", statColor: colors.omecaCyan, desc: "Targeting early finance design partners for pilot validation.", color: colors.omecaCyan },
        { title: "Technical Validation", stat: "NVIDIA", statColor: colors.lucraGold, desc: "Accepted into NVIDIA Inception and supported by Google Cloud.", color: colors.lucraGold },
        { title: "Channel & Platform Alignment", stat: "Advisory+", statColor: colors.successGreen, desc: "Building partnerships with CFO networks and integrators.", color: colors.successGreen },

    ];

    return (
        <SlideLayout slideNumber={11} kicker="Traction & Validation">
            <Box sx={{ pt: "6vh", pb: "4vh", textAlign: "center" }}>
                <motion.div variants={fadeInUp}>
                    <Typography component="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.6rem", md: "3.4rem" }, lineHeight: 1.15, letterSpacing: "-0.015em", mb: 2, color: theme.palette.text.primary }}>
                        Validating the <Box component="span" sx={{ background: `linear-gradient(90deg, ${colors.omecaCyan}, ${colors.lucraGold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 900 }}>Continuous Close</Box> Thesis
                    </Typography>
                </motion.div>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 400, lineHeight: 1.55, fontSize: { xs: "1rem", md: "1.15rem" }, maxWidth: 850, mx: "auto", mb: 6 }}>
Early traction shows strong demand for a unified control layer that restores visibility and trust in financial operations.                </Typography>
                <Grid container spacing={4} alignItems="stretch" justifyContent="center">
                    {cards.map((card, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                            <motion.div variants={fadeInUp} transition={{ delay: idx * 0.1 }} whileHover={{ y: -5 }}>
                                <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${card.color}55`, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", transition: "box-shadow 0.3s ease, transform 0.3s ease", "&:hover": { boxShadow: `0 0 14px ${card.color}44`, transform: "translateY(-4px)" } }}>
                                    <Typography variant="h6" sx={{ color: card.color, fontWeight: 800, mb: 0.5 }}>{card.title}</Typography>
                                    <Typography variant="h2" sx={{ color: card.statColor, fontWeight: 900, mb: 1 }}>{card.stat}</Typography>
                                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontWeight: 400, lineHeight: 1.5, fontSize: "1rem", maxWidth: 300 }}>{card.desc}</Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 500, maxWidth: 800, mx: "auto", lineHeight: 1.6 }}>
                        The market is validating that automation without assurance is incomplete. Omeca is becoming the trust layer that makes automation auditable.
                    </Typography>
                </Box>
            </Box>
        </SlideLayout>
    );
};
const Slide13_Team = () => {
    const { mode } = useContext(ColorModeContext);
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    const isDark = mode === "dark";

    const members = [
        {
            initials: "PA",
            name: "Pony Aristil, MBA, PMP",
            role: "Founder & CEO",
            desc: "10+ years leading finance systems at Meta, Eventbrite, and Robert Half.",
            color: colors.lucraGold,
            highlight: true,
        },
        {
            initials: "CF",
            name: "Co-Founder (Enterprise GTM)",
            role: "Hiring",
            desc: "Seasoned SaaS GTM leader to scale enterprise CFO adoption.",
            color: colors.omecaCyan,
        },
        {
            initials: "AF",
            name: "Advisor (Enterprise Finance)",
            role: "Hiring",
            desc: "CFO-level advisor to shape governance and deployment models.",
            color: colors.lucraGold,
        },
        {
            initials: "AA",
            name: "Advisor (AI & Compliance)",
            role: "Hiring",
            desc: "AI expert to guide validation, explainability, and model assurance.",
            color: colors.omecaCyan,
        },
    ];

    const hires = [
        "Lead Architect",
        "Backend Engineers (x2)",
        "Security Engineer",
        "Infrastructure Engineer",
        "GRC Specialist",
    ];

    return (
        <SlideLayout slideNumber={12} kicker="Team">
            {/* === HEADER === */}
            <Box sx={{ textAlign: "center", mb: 5 }}>
                <Typography
                    component="h1"
                    sx={{
                        fontWeight: 900,
                        fontSize: "clamp(2.6rem, 6vw, 3.6rem)",
                        lineHeight: 1.15,
                        mb: 1.2,
                        color: theme.palette.text.primary,
                    }}
                >
                    The <GradientText variant="inherit">Execution Team</GradientText>
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 400,
                        maxWidth: 760,
                        mx: "auto",
                        lineHeight: 1.55,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                    }}
                >
                    purpose-built for finance systems, audit integrity, and enterprise-scale delivery
                </Typography>
            </Box>

            {/* === TEAM GRID === */}
            <Grid container spacing={4} justifyContent="center">
                {members.map((m, i) => (
                    <Grid
                        key={m.name}
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <motion.div variants={fadeInUp} whileHover={{ y: -4 }}>
                            <Paper
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                    border: m.highlight
                                        ? `2px solid ${colors.lucraGold}`
                                        : `1px solid ${colors.silver}33`,
                                    boxShadow: m.highlight
                                        ? `0 0 18px ${colors.lucraGold}33`
                                        : "0 2px 8px rgba(0,0,0,0.08)",
                                    height: "100%",
                                    minHeight: { xs: 340, md: 360 },
                                    width: 280,
                                    borderRadius: 3,
                                    transition: "all 0.3s ease",
                                    backgroundColor: isDark
                                        ? "rgba(255,255,255,0.03)"
                                        : "rgba(0,0,0,0.02)",
                                    "&:hover": {
                                        transform: "translateY(-3px)",
                                        boxShadow: m.highlight
                                            ? `0 0 22px ${colors.lucraGold}55`
                                            : "0 6px 14px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 90,
                                        height: 90,
                                        borderRadius: "50%",
                                        mx: "auto",
                                        mb: 1.5,
                                        background: m.color,
                                        display: "grid",
                                        placeItems: "center",
                                        color: colors.deepBlue,
                                        fontWeight: 900,
                                        fontSize: 28,
                                        border: `2px solid ${m.highlight ? colors.lucraGold : colors.silver
                                            }33`,
                                    }}
                                >
                                    {m.initials}
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 900,
                                        mb: 0.25,
                                        color: m.highlight ? colors.lucraGold : "text.primary",
                                    }}
                                >
                                    {m.name}
                                </Typography>
                                {m.role && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 700,
                                            color: colors.omecaCyan,
                                            mb: 0.5,
                                        }}
                                    >
                                        {m.role}
                                    </Typography>
                                )}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        lineHeight: 1.5,
                                        fontSize: { xs: "0.95rem", md: "1rem" },
                                    }}
                                >
                                    {m.desc}
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* === HIRING BLUEPRINT === */}
            <Divider sx={{ my: 5 }} />
            <Box textAlign="center">
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 900,
                        mb: 2,
                        color: theme.palette.text.primary,
                    }}
                >
                    Near-Term Hiring Blueprint
                </Typography>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{ maxWidth: 800, mx: "auto" }}
                >
                    {hires.map((role) => (
                        <Grid key={role} item xs={6} sm={4} md={3}>
                            <Chip
                                label={role}
                                variant="outlined"
                                sx={{
                                    borderColor: colors.omecaCyan,
                                    color: theme.palette.text.secondary,
                                    fontWeight: 600,
                                    borderRadius: 2,
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </SlideLayout>
    );
};

// const Slide14_Ask = () => {
//     const { mode } = useContext(ColorModeContext);
//     const useOfFunds = [
//         // { label: "Engineering & Product", value: 50, amount: "$2.5M", desc: "Expand core engineering and data infrastructure to deliver full orchestration and compliance automation." },
//         // { label: "GTM & Design Partners", value: 30, amount: "$1.5M", desc: "Accelerate adoption with targeted CFO networks, ERP integration partners, and early enterprise pilots." },
//         // { label: "Ops & Compliance", value: 20, amount: "$1.0M", desc: "Support SOC 2 readiness, legal operations, and runway for 18 months of disciplined scaling." },
//         { label: "Engineering & Product", value: 50, amount: "$1.0M", desc: "Scale Omeca Core (L1) for enterprise use, build the Omeca Ledger (L2) MVP, and strengthen architecture for SOC 2 readiness." },
//   { label: "GTM & Design Partners", value: 30, amount: "$600K", desc: "Secure 3-5 paid Design Partners, hire GTM leadership, and build the Audit & Compliance Advisory Council." },
//   { label: "Ops & Compliance", value: 20, amount: "$400K", desc: "Support legal/ops and establish a strategic capital reserve for 18 months." },
//     ];
//     const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
//     const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
// 
//     return (
//         <SlideLayout slideNumber={13} kicker="The Ask">
//             <motion.div variants={container} initial="hidden" animate="show" style={{ width: "100%" }}>
//                 <Box sx={{ minHeight: { xs: "86vh", md: "84vh" }, pt: { xs: "4vh", md: "6vh" }, pb: { xs: "3vh", md: "4vh" }, px: { xs: 2, sm: 4 }, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
//                     <motion.div variants={item}>
//                         {/* <Typography variant="h2" component="h2" sx={{ fontWeight: 900, fontSize: { xs: "2.6rem", sm: "3rem", md: "3.6rem" }, lineHeight: 1.15, mb: { xs: 2, md: 2.5 }, color: mode === "dark" ? "#FFFFFF" : "#111111", transition: "color 0.3s ease" }}>
//                             Raising a <GradientText variant="inherit">$5M Seed</GradientText> to Automate the Month-End Close Nightmare
//                         </Typography> */}
//                         <Typography
//                             variant="h2"
//                             component="h2"
//                             sx={{
//                                 fontWeight: 900,
//                                 fontSize: { xs: "2.8rem", sm: "3.4rem", md: "3.8rem" },
//                                 lineHeight: 1.1,
//                                 mb: { xs: 2, md: 2.5 },
//                                 color: mode === "dark" ? "#FFFFFF" : "#111111",
//                                 transition: "color 0.3s ease",
//                                 maxWidth: 900,
//                                 mx: "auto",
//                             }}
//                         >
//                             {/* Raising a <GradientText variant="inherit">$5M Seed</GradientText> to
//                             <br />
//                             Automate Financial Close and Assurance */}
//                             Raising a <GradientText variant="inherit">$2M Seed Extension</GradientText> to Build the Cognitive ERP
//                         </Typography>
// 
//                     </motion.div>
//                     <Grid container spacing={{ xs: 3, sm: 4, md: 5 }} alignItems="stretch" justifyContent="center" sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: { xs: 2, md: 3 } }}>
//                         <Grid item xs={12} md={7}>
//                             <motion.div variants={item}>
//                                 <Typography variant="h4" sx={{ color: colors.lucraGold, fontWeight: 800, mb: { xs: 2, md: 3 }, textAlign: "left" }}>Use of Funds</Typography>
//                                 <Stack spacing={{ xs: 2.5, sm: 3 }}>
//                                     {useOfFunds.map((fund, idx) => (
//                                         <motion.div key={fund.label} variants={item} transition={{ delay: 0.1 + idx * 0.1 }} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} style={{ borderRadius: "12px", padding: "1rem 1.2rem", backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}>
//                                             <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { sm: "center" }, mb: 0.5 }}>
//                                                 <Typography variant="h6" sx={{ color: colors.omecaCyan, fontWeight: 700, mb: { xs: 0.5, sm: 0 } }}>{fund.value}% {fund.label}</Typography>
//                                                 <Typography variant="h6" sx={{ color: colors.lucraGold, fontWeight: 700, alignSelf: { xs: "flex-start", sm: "center" } }}>{fund.amount}</Typography>
//                                             </Box>
//                                             <LinearProgress variant="determinate" value={fund.value} sx={{ height: 10, borderRadius: 4, mb: 1.5, backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", "& .MuiLinearProgress-bar": { background: `linear-gradient(90deg, ${colors.omecaCyan}, ${colors.lucraGold})` } }} />
//                                             <Typography variant="body1" sx={{ color: colors[mode].textDim, textAlign: "left", fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.5 }}>{fund.desc}</Typography>
//                                         </motion.div>
//                                     ))}
//                                 </Stack>
//                             </motion.div>
//                         </Grid>
//                         <Grid item xs={12} md={5} sx={{ mt: { xs: 4, md: 0 } }}>
//                             <motion.div variants={item} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }} style={{ background: mode === "dark" ? "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)" : "linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)", border: `2px solid ${colors.lucraGold}`, borderRadius: "18px", boxShadow: `0 8px 24px ${colors.lucraGold}22`, textAlign: "center", padding: "2.2rem 1.6rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                                 <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "3.6rem", sm: "5rem", md: "6rem" }, lineHeight: 1, mb: 1 }}><GradientText variant="inherit">$2M</GradientText></Typography>
//                                 <Typography variant="h4" sx={{ color: colors.lucraGold, fontWeight: 800 }}>Seed Round</Typography>
//                                 <Typography variant="h6" sx={{ color: colors.omecaCyan, fontWeight: 600, mt: 1 }}>18 Month Runway</Typography>
//                                 <Typography variant="body2" sx={{ color: colors[mode].textDim, mt: 1, fontWeight: 500 }}><strong>$25M SAFE Cap</strong></Typography>
//                             </motion.div>
//                         </Grid>
//                     </Grid>
//                     <motion.div variants={item}>
//                         <Box sx={{ mt: 6, textAlign: "center" }}>
//                             <Typography variant="h6" sx={{ color: colors[mode].textPrimary, fontWeight: 500, maxWidth: "780px", mx: "auto", lineHeight: 1.6 }}>
//                                 {/* This round enables the engineering depth, compliance automation, and partnerships required to establish Omeca as the system of record for financial assurance. */}
//                                 This round funds our disciplined plan to scale Omeca Core (L1) and deliver the first validated continuous-close ledger (L2) pilots.
//                             </Typography>
//                         </Box>
//                     </motion.div>
//                 </Box>
//             </motion.div>
//         </SlideLayout>
//     );
// };

const Slide14_Ask = () => {
  const { mode } = useContext(ColorModeContext);
  const useOfFunds = [
    { label: "Engineering & Product", value: 50, amount: "$2.3M", desc: "Scale Core (L1), build Ledger (L2) MVP, and strengthen SOC 2 readiness." },
    { label: "GTM & Design Partners", value: 30, amount: "$1.5M", desc: "Secure early pilots, expand GTM leadership, and launch advisory network." },
    { label: "Ops & Compliance", value: 20, amount: "$1M", desc: "Support legal and compliance ops for an 18-month runway." },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <SlideLayout slideNumber={13} kicker="The Ask">
      <motion.div variants={container} initial="hidden" animate="show" style={{ width: "100%" }}>
        <Box
          sx={{
            minHeight: { xs: "86vh", md: "84vh" },
            pt: { xs: "4vh", md: "6vh" },
            pb: { xs: "3vh", md: "4vh" },
            px: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <motion.div variants={item}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.6rem", sm: "3.2rem", md: "3.6rem" },
                lineHeight: 1.1,
                mb: 2,
                color: mode === "dark" ? "#FFFFFF" : "#111111",
              }}
            >
              Raising a <GradientText variant="inherit">$5M Seed Round</GradientText> to Build the Cognitive ERP's Trust Moat.
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 5 }}
            alignItems="stretch"
            justifyContent="center"
            sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: { xs: 2, md: 3 } }}
          >
            <Grid item xs={12} md={7}>
              <motion.div variants={item}>
                <Typography variant="h4" sx={{ color: colors.lucraGold, fontWeight: 800, mb: 3, textAlign: "left" }}>
                  Use of Funds
                </Typography>
                <Stack spacing={2.5}>
                  {useOfFunds.map((fund, idx) => (
                    <motion.div
                      key={fund.label}
                      variants={item}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        borderRadius: "12px",
                        padding: "1rem 1.2rem",
                        backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="h6" sx={{ color: colors.omecaCyan, fontWeight: 700 }}>
                          {fund.value}% {fund.label}
                        </Typography>
                        <Typography variant="h6" sx={{ color: colors.lucraGold, fontWeight: 700 }}>
                          {fund.amount}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={fund.value}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          mb: 1.2,
                          "& .MuiLinearProgress-bar": {
                            background: `linear-gradient(90deg, ${colors.omecaCyan}, ${colors.lucraGold})`,
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors[mode].textDim,
                          textAlign: "left",
                          fontSize: "0.95rem",
                          lineHeight: 1.45,
                        }}
                      >
                        {fund.desc}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={5}>
              <motion.div
                variants={item}
                whileHover={{ scale: 1.03 }}
                style={{
                  background:
                    mode === "dark"
                      ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
                      : "linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.01))",
                  border: `2px solid ${colors.lucraGold}`,
                  borderRadius: "18px",
                  boxShadow: `0 8px 24px ${colors.lucraGold}22`,
                  textAlign: "center",
                  padding: "2rem 1.4rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "3.4rem", sm: "5rem" }, mb: 1 }}>
                  <GradientText variant="inherit">$5M</GradientText>
                </Typography>
                <Typography variant="h5" sx={{ color: colors.lucraGold, fontWeight: 800 }}>
                  Seed Extension
                </Typography>
                <Typography variant="h6" sx={{ color: colors.omecaCyan, fontWeight: 600, mt: 1 }}>
                  18-Month Runway
                </Typography>
                <Typography variant="body2" sx={{ color: colors[mode].textDim, mt: 1, fontWeight: 500 }}>
                  <strong>$25M SAFE Cap</strong>
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          <motion.div variants={item}>
            <Box sx={{ mt: 5, textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  color: colors[mode].textPrimary,
                  fontWeight: 500,
                  maxWidth: 760,
                  mx: "auto",
                  lineHeight: 1.5,
                }}
              >
                This round funds the scale of Core (L1) and delivery of the first continuous-close pilots (L2).
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </SlideLayout>
  );
};

// const Slide15_Closing = () => (
//   <SlideLayout slideNumber={14} kicker="Closing">
//     <Box sx={{ textAlign: "center", maxWidth: 980, mx: "auto", py: { xs: 6, md: 8 } }}>
//       {/* === HEADLINE === */}
//       <motion.div variants={fadeInUp}>
//         <Typography
//           variant="h1"
//           sx={{
//             mb: 2,
//             fontWeight: 900,
//             fontSize: { xs: "2.8rem", sm: "3.6rem", md: "4rem" },
//             lineHeight: 1.1,
//             color: "text.primary",
//           }}
//         >
//         Make Finance Continuous
//         </Typography>
//       </motion.div>
// 
//       {/* === SUBTEXT === */}
//       <motion.div variants={fadeInUp}>
//         <Typography
//           variant="h5"
//           color="text.secondary"
//           sx={{
//             mb: 5,
//             maxWidth: 760,
//             mx: "auto",
//             lineHeight: 1.55,
//             fontSize: { xs: "1.05rem", md: "1.25rem" },
//           }}
//         >
//           Omeca transforms the close from a reactive month-end scramble
//           into a continuous, verifiable, and trusted financial process.
//         </Typography>
//       </motion.div>
// 
//       {/* === CTAS === */}
//       <motion.div variants={fadeInUp}>
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={2}
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             sx={{ px: 4, py: 1.3, fontWeight: 700 }}
//           >
//             Request Access
//           </Button>
//           <Button
//             variant="outlined"
//             color="inherit"
//             size="large"
//             sx={{ px: 4, py: 1.3 }}
//           >
//             Schedule a Deep Dive
//           </Button>
//           <Button
//             variant="contained"
//             color="secondary"
//             startIcon={<PictureAsPdfIcon />}
//             size="large"
//             sx={{ px: 4, py: 1.3 }}
//             onClick={() =>
//               exportDeckAsPDF([], ThemeWrapper, "dark")
//             }
//           >
//             Download Deck
//           </Button>
//         </Stack>
//       </motion.div>
// 
//       {/* === CLOSING LINE === */}
//       <motion.div variants={fadeInUp}>
//         <Typography
//           variant="h6"
//           sx={{
//             mt: 6,
//             fontWeight: 500,
//             color: "text.secondary",
//             opacity: 0.85,
//           }}
//         >
//           The close never stops — and neither should the confidence behind it.
//         </Typography>
//       </motion.div>
//     </Box>
//   </SlideLayout>
// );
const Slide15_Closing = () => (
  <SlideLayout slideNumber={14} kicker="Closing">
    <Box sx={{ textAlign: "center", maxWidth: 980, mx: "auto", py: { xs: 6, md: 8 } }}>
      {/* === HEADLINE (Visionary CTA) === */}
      <motion.div variants={fadeInUp}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontWeight: 900,
            fontSize: { xs: "2.8rem", sm: "3.6rem", md: "4rem" },
            lineHeight: 1.1,
            color: "text.primary",
          }}
        >
        Make Finance Continuous
        </Typography>
      </motion.div>

      {/* === SUBTEXT (Value Summary) === */}
      <motion.div variants={fadeInUp}>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            mb: 5,
            maxWidth: 760,
            mx: "auto",
            lineHeight: 1.55,
            fontSize: { xs: "1.05rem", md: "1.25rem" },
          }}
        >
          Omeca transforms the close from a reactive month-end scramble
          into a continuous, verifiable, and trusted financial process.
        </Typography>
      </motion.div>

      {/* === FUNDING ASK & CTA Buttons (Combined for action) === */}
      <motion.div variants={fadeInUp}>
        {/* Ask Reference */}
        <Typography
          variant="h4"
          sx={{
            mt: 4,
            fontWeight: 900,
            color: colors.lucraGold,
            mb: 3, // Increased bottom margin for separation
          }}
        >
          Partner with Us in the $5M Seed Extension
        </Typography>
        
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 6 }} // Add margin below CTAs
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.3, fontWeight: 700 }}
          >
            Request Access
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ px: 4, py: 1.3 }}
          >
            Schedule a Deep Dive
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PictureAsPdfIcon />}
            size="large"
            sx={{ px: 4, py: 1.3 }}
            onClick={() =>
              exportDeckAsPDF([], ThemeWrapper, "dark")
            }
          >
            Download Deck
          </Button>
        </Stack>
      </motion.div>

      {/* === CONTACT DETAILS (New/Updated Section) === */}
      <motion.div variants={fadeInUp} style={{ marginTop: '30px' }}>
         <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary" }}>
            Phone: 123-456-7890
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary" }}>
            Email: hello@reallygreatsite.com
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary" }}>
            Social Media: @reallygreatsite.com
          </Typography>
        </Stack>
      </motion.div>


      {/* === CLOSING LINE === */}
      <motion.div variants={fadeInUp}>
        <Typography
          variant="h6"
          sx={{
            mt: 6,
            fontWeight: 500,
            color: "text.secondary",
            opacity: 0.85,
          }}
        >
          The close never stops, and neither should the confidence behind it.
        </Typography>
      </motion.div>
    </Box>
  </SlideLayout>
);
// -----------------------------------------------------------------------------
// Slides Array
// -----------------------------------------------------------------------------
const slides = [
    Slide1_Title,
    Slide2_Problem,
    Slide4_SolutionIntro,
    Slide5_HowItWorks,
    Slide6_Moat,
    Slide7_ExampleScenario,
    Slide8_MVP,
    Slide9_Roadmap,
    Slide10_MarketOpportunity,
    Slide11_MarketValidation,
    Slide_Tiers,
    Slide12_LeapBeyondAutomation,
    Slide11_BusinessModel,
    Slide_MOTS,
    Slide11a_FinancialPath,
    Slide12_Traction,
    Slide13_Team,
    Slide14_Ask,
    Slide15_Closing,
];

// -----------------------------------------------------------------------------
// Main App
// -----------------------------------------------------------------------------
const PitchDeckApp = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const { mode } = useContext(ColorModeContext);
    const SlideComponent = slides[slideIndex];
    const [anchorEl, setAnchorEl] = useState(null);
    const listButtonRef = useRef(null);

    const goToNext = () => setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
    const goToPrev = () => setSlideIndex((prev) => Math.max(prev - 1, 0));
    const goToSlide = (index) => { setSlideIndex(index); setAnchorEl(null); };

    const handleListClick = (event) => setAnchorEl(event.currentTarget);
    const handleListClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? 'slide-jump-popover' : undefined;

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'ArrowRight') goToNext(); if (e.key === 'ArrowLeft') goToPrev(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <AppHeader />
            <Box sx={{ flexGrow: 1, mt: { xs: '56px', md: '64px' } }}>
                <Box id="pitch-deck-root">
                    <AnimatePresence mode="wait">
                        <Box key={slideIndex} sx={{ width: '100%', flexGrow: 1 }}>
                            <SlideComponent />
                        </Box>
                    </AnimatePresence>
                </Box>
            </Box>

            {/* Navigation */}
            <Box
                sx={{
                    position: 'fixed', bottom: { xs: 10, md: 20 }, left: 16, right: 16,
                    display: 'flex', justifyContent: 'space-between', zIndex: 10, pointerEvents: 'none'
                }}
            >
                <Button
                    onClick={goToPrev}
                    disabled={slideIndex === 0}
                    startIcon={<ArrowBackIosIcon />}
                    variant="contained"
                    sx={{ pointerEvents: 'auto', opacity: slideIndex === 0 ? 0.3 : 1, transition: 'opacity 0.3s' }}
                >
                    Previous
                </Button>
                <Button
                    onClick={goToNext}
                    disabled={slideIndex === slides.length - 1}
                    endIcon={<ArrowForwardIosIcon />}
                    variant="contained"
                    sx={{ pointerEvents: 'auto', opacity: slideIndex === slides.length - 1 ? 0.3 : 1, transition: 'opacity 0.3s' }}
                >
                    Next
                </Button>
            </Box>

            {/* Slide list popover */}
            <Box sx={{ position: 'absolute', top: { xs: 72, md: 80 }, right: 16, zIndex: 10 }}>
                <IconButton
                    ref={listButtonRef}
                    onClick={handleListClick}
                    color="inherit"
                    sx={{ backgroundColor: 'rgba(100,100,100,0.4)', '&:hover': { backgroundColor: 'rgba(100,100,100,0.6)' } }}
                >
                    <ListIcon />
                </IconButton>
                <Popover
                    id={id} open={open} anchorEl={anchorEl} onClose={handleListClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{ sx: { backgroundColor: colors[mode].card, border: `1px solid ${colors[mode].textDim}33`, maxHeight: '80vh' } }}
                >
                    <List dense sx={{ width: 320 }}>
                        {slideTitles.map((title, index) => (
                            <ListItem
                                key={index}
                                onClick={() => goToSlide(index)}
                                selected={slideIndex === index}
                                sx={{
                                    cursor: 'pointer',
                                    '&.Mui-selected': {
                                        backgroundColor: colors.omecaCyan + '22',
                                        borderLeft: `3px solid ${colors.omecaCyan}`,
                                        '& .MuiListItemText-primary': { fontWeight: 800, color: colors.omecaCyan }
                                    },
                                    '&:hover': { backgroundColor: colors[mode].bgGrad + '55' },
                                }}
                            >
                                <ListItemText primary={`${index + 1}. ${title}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Box sx={{ p: 1 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => { exportDeckAsPDF(slides, ThemeWrapper, mode); handleListClose(); }}
                        >
                            Download PDF
                        </Button>
                    </Box>
                </Popover>
            </Box>
        </Box>
    );
};

const App = () => (
    <ThemeWrapper>
        <PitchDeckApp />
    </ThemeWrapper>
);

export default App;