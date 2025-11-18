// V3

import React, { useState, useMemo, useContext, useEffect, useRef } from 'react';
import {
  ThemeProvider, createTheme, Box, Typography, Button, IconButton, Paper, Grid,
  List, ListItem, ListItemText, Popover, Divider, useTheme, LinearProgress, Stack,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ListIcon from '@mui/icons-material/List';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GavelIcon from '@mui/icons-material/Gavel';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { ListItemIcon } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import SensorsIcon from "@mui/icons-material/Sensors";


// Add these four missing icon imports
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';

// Add Download Icons

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SlideshowIcon from "@mui/icons-material/Slideshow";
// import { exportDeckAsPDF } from "utils/exportDeck";
import { exportDeckAsPDF } from "../../../utils/exportDeck.js";




// --- Color Palette and Configuration ---
export const colors = {
  accent: '#00E5BE', accentHover: '#00caa8', lucraGold: '#D4AF37', errorRed: '#FF4136', successGreen: '#2ECC40', logoDark: '#1A334A',
  dark: { bgTop: '#1A2433', bgGradA: '#2A344A', bgGradB: '#111827', card: '#243040', textDim: 'rgba(255,255,255,0.78)', textPrimary: '#F0F3F7', },
  light: { bgTop: '#F8F9FA', bgGradA: '#E6F4F1', bgGradB: '#D8E8E6', card: '#FFFFFF', textDim: 'rgba(0,0,0,0.65)', textPrimary: '#1F2937', }
};

// --- Gradient Utility ---
// const GradientText = styled(Typography)(({ theme }) => ({
//   background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline', fontWeight: theme.typography.fontWeightBold,
// }));
const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline',
  fontWeight: theme.typography.fontWeightBold,
}));

// --- Theme Utility ---
export const getDesignTokens = (mode) => ({
  palette: {
    mode, primary: { main: colors.accent }, secondary: { main: colors.lucraGold }, error: { main: colors.errorRed }, success: { main: colors.successGreen },
    background: { default: colors[mode].bgTop, paper: colors[mode].card, }, text: { primary: colors[mode].textPrimary, secondary: colors[mode].textDim, },
  },
  typography: { fontFamily: 'Roboto, sans-serif', h1: { fontSize: '4.5rem' }, h2: { fontSize: '3rem' }, h3: { fontSize: '2.5rem' }, h4: { fontSize: '1.8rem' }, h5: { fontSize: '1.4rem' }, h6: { fontSize: '1.1rem' }, body1: { fontSize: '1rem' }, body2: { fontSize: '0.875rem' }, },
  components: { MuiButton: { styleOverrides: { contained: { color: mode === 'dark' ? colors.dark.bgTop : colors.light.bgTop, }, }, }, },
});

// --- Theme Wrapper & Context ---
export const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'dark' });
const ThemeWrapper = ({ children }) => {
  const [mode, setMode] = useState('dark'); const colorMode = useMemo(() => ({ mode, toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')), }), [mode]); const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (<ColorModeContext.Provider value={{ ...colorMode, mode }}><ThemeProvider theme={theme}>{children}</ThemeProvider></ColorModeContext.Provider>);
};

// --- Framer Motion Variants ---
const slideContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2, } } };
const fadeInUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } };
const bulletItem = { hidden: { x: -20, opacity: 0 }, show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 25 } } };
const listContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4, } } };

// --- Custom Visuals (SVG Components) ---
const FlowPipeline = () => {
  const { mode } = useContext(ColorModeContext); const cardBg = colors[mode].card; const textFill = colors.accent;
  // return (<svg viewBox="0 0 100 20" className="w-full h-auto"><defs><marker id="arrowHead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><polygon points="0,0 4,2 0,4" fill={colors.accent} /></marker></defs><motion.rect x="0" y="5" width="28" height="10" rx="1" fill={cardBg} stroke={colors.lucraGold} strokeWidth="0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} /><motion.rect x="36" y="5" width="28" height="10" rx="1" fill={cardBg} stroke={colors.lucraGold} strokeWidth="0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} /><motion.rect x="72" y="5" width="28" height="10" rx="1" fill={cardBg} stroke={colors.lucraGold} strokeWidth="0.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }} /><text x="14" y="11" fill={textFill} fontSize="3.5" textAnchor="middle" fontWeight="bold">INGEST</text><text x="50" y="11" fill={textFill} fontSize="3.5" textAnchor="middle" fontWeight="bold">VALIDATE</text><text x="86" y="11" fill={textFill} fontSize="3.5" textAnchor="middle" fontWeight="bold">LEDGER</text><motion.line x1="28" y1="10" x2="36" y2="10" stroke={colors.accent} strokeWidth="1" markerEnd="url(#arrowHead)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.2 }} /><motion.line x1="64" y1="10" x2="72" y2="10" stroke={colors.accent} strokeWidth="1" markerEnd="url(#arrowHead)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.6 }} /></svg>);
  return (
    <svg viewBox="0 0 100 20" className="w-full h-auto">
      <defs>
        <marker
          id="arrowHead"
          markerWidth="4"
          markerHeight="4"
          refX="2"
          refY="2"
          orient="auto"
        >
          <polygon points="0,0 4,2 0,4" fill={colors.accent} />
        </marker>
      </defs>

      {/* Rectangles */}
      <motion.rect
        x="0"
        y="5"
        width="28"
        height="10"
        rx="1"
        fill={cardBg}
        stroke={colors.lucraGold}
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.rect
        x="36"
        y="5"
        width="28"
        height="10"
        rx="1"
        fill={cardBg}
        stroke={colors.lucraGold}
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
      <motion.rect
        x="72"
        y="5"
        width="28"
        height="10"
        rx="1"
        fill={cardBg}
        stroke={colors.lucraGold}
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      />

      {/* Text Labels */}
      <text
        x="14"
        y="11"
        fill={textFill}
        fontSize="3.5"
        textAnchor="middle"
        fontWeight="bold"
      >
        CAPTURE
      </text>

      <text
        x="50"
        y="10"
        fill={textFill}
        fontSize="3.5"
        textAnchor="middle"
        fontWeight="bold"
      >
        VALIDATE
      </text>
      <text
        x="50"
        y="14"
        fill={textFill}
        fontSize="3.5"
        textAnchor="middle"
        fontWeight="bold"
      >
        ATTEST
      </text>

      <text
        x="86"
        y="11"
        fill={textFill}
        fontSize="3.5"
        textAnchor="middle"
        fontWeight="bold"
      >
        ANCHOR
      </text>

      {/* Connecting Lines */}
      <motion.line
        x1="28"
        y1="10"
        x2="36"
        y2="10"
        stroke={colors.accent}
        strokeWidth="1"
        markerEnd="url(#arrowHead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.line
        x1="64"
        y1="10"
        x2="72"
        y2="10"
        stroke={colors.accent}
        strokeWidth="1"
        markerEnd="url(#arrowHead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      />
    </svg>
  );

};
const TAMWedgeChart = () => {
  const { mode } = useContext(ColorModeContext);
  const [selected, setSelected] = useState(null);
  const primaryTextColor = colors[mode].textPrimary;
  const handleClick = (section) => setSelected(section === selected ? null : section);

  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        maxWidth: { xs: 360, sm: 480, md: 640 },
        mx: "auto",
      }}
    >
      <svg
        viewBox="0 0 220 220"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "auto",
          cursor: "pointer",
          display: "block",
          margin: "0 auto",
        }}
      >
        <defs>
          <linearGradient id="labelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.accent} />
            <stop offset="100%" stopColor={colors.lucraGold} />
          </linearGradient>
        </defs>

        <g transform="translate(110,110)">
          {/* Outer circle */}
          <motion.circle
            r="95"
            fill="none"
            stroke={primaryTextColor}
            strokeWidth="2"
            onClick={() => handleClick("outer")}
            animate={{ scale: selected === "outer" ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <text
            x="0"
            y="-70"
            fill="url(#labelGradient)"
            fontSize="7"
            textAnchor="middle"
            fontWeight="600"
          >
            AI Governance Market (~$37B)
          </text>

          {/* Middle ring */}
          <motion.circle
            r="65"
            fill="none"
            stroke={colors.lucraGold}
            strokeWidth="2"
            onClick={() => handleClick("middle")}
            animate={{ scale: selected === "middle" ? 1.08 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <text
            x="0"
            y="5"
            fill="url(#labelGradient)"
            fontSize="7"
            textAnchor="middle"
            fontWeight="bold"
          >
            Initial SAM (~$500M)
          </text>

          {/* Wedge (Melucra slice) */}
          <motion.path
            d="M 0 -65 A 65 65 0 0 1 42 -48 L 0 0 Z"
            fill={colors.accent}
            onClick={() => handleClick("wedge")}
            animate={{ scale: selected === "wedge" ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <text
            x="15"
            y="-35"
            fill={colors.logoDark}
            fontSize="7"
            textAnchor="middle"
            fontWeight="bold"
          >
            Omeca
          </text>

          {/* Footer label */}
          <text
            x="0"
            y="105"
            fill={colors.accent}
            fontSize="8"
            textAnchor="middle"
            fontWeight="bold"
          >
            Beachhead: $10.25M
          </text>
        </g>
      </svg>
    </Box>
  );
};

const GTMFunnel = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useTheme();

  const circles = [
    { id: 1, color: colors.lucraGold, cx: 100, cy: 25 },
    { id: 2, color: colors.accent, cx: 170, cy: 95 },
    { id: 3, color: colors.successGreen, cx: 30, cy: 95 },
  ];

  const labels = [
    {
      title: "Executive Mandate",
      desc: "(CFO & Board Define the Standard)",
      titleX: 100,
      titleY: 6,
      descX: 100,
      descY: 13,
    },
    {
      title: "Proof & Validation",
      desc: "(Design Partners & Compliance)",
      titleX: 160,
      titleY: 125,
      descX: 160,
      descY: 132,
    },
    {
      title: "Scale & Amplify",
      desc: "(Firms, Channels, Enterprise Rollout)",
      titleX: 40,
      titleY: 125,
      descX: 40,
      descY: 132,
    },
  ];

  // Dynamic font scaling for mobile readability
  const getFontSize = (base) => ({
    xs: `${base * 0.8}px`,
    sm: `${base * 0.9}px`,
    md: `${base}px`,
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "95vw", sm: 420, md: 480 },
        mx: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 200 150"
        style={{
          width: "100%",
          height: "auto",
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="gtmFlywheelArrow"
            markerWidth="4"
            markerHeight="4"
            refX="3"
            refY="2"
            orient="auto"
          >
            <polygon points="0,0 4,2 0,4" fill={colors[mode].textDim} />
          </marker>
        </defs>

        {/* Arrows */}
        <motion.path
          d="M 110 30 Q 140 50, 160 85"
          stroke={colors[mode].textDim}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          markerEnd="url(#gtmFlywheelArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d="M 160 105 L 40 105"
          stroke={colors[mode].textDim}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          markerEnd="url(#gtmFlywheelArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.path
          d="M 40 85 Q 70 50, 90 30"
          stroke={colors[mode].textDim}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          markerEnd="url(#gtmFlywheelArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
        />

        {/* Circles + Numbers (static positions) */}
        {circles.map((circle) => (
          <motion.g
            key={circle.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: circle.id * 0.2 }}
          >
            <circle cx={circle.cx} cy={circle.cy} r="10" fill={circle.color} />
            <text
              x={circle.cx}
              y={circle.cy + 2}
              fontSize="5"
              textAnchor="middle"
              fill={colors.logoDark}
              fontWeight="bold"
            >
              {circle.id}
            </text>
          </motion.g>
        ))}

        {/* Titles + Descriptions (independent + responsive fonts) */}
        {labels.map((label, i) => (
          <g key={i}>
            <text
              x={label.titleX}
              y={label.titleY}
              textAnchor="middle"
              fill={theme.palette.text.primary}
              fontWeight="bold"
              style={{
                fontSize: "6px",
                letterSpacing: "0.3px",
                userSelect: "none",
              }}
            >
              {label.title}
            </text>
            <text
              x={label.descX}
              y={label.descY}
              textAnchor="middle"
              fill={theme.palette.text.secondary}
              style={{
                fontSize: "4px",
                letterSpacing: "0.2px",
                userSelect: "none",
              }}
            >
              {label.desc}
            </text>
          </g>
        ))}
      </svg>
    </Box>
  );
};

const CompetitorFunnel = () => {
  const { mode } = useContext(ColorModeContext);

  const tier1TextColor = colors.logoDark;
  const tier2TextColor = mode === 'dark' ? colors.dark.textPrimary : colors.light.textPrimary;
  // UPDATED: Use a consistent light color for the text on the red background
  const tier3TextColor = colors.dark.textPrimary; // A light color (#F0F3F7)

  return (
    <svg viewBox="0 0 100 100" className="w-full h-auto" style={{ maxWidth: '400px' }}>
      <g transform="translate(0, 5)">
        <motion.polygon points="30,5 70,5 90,35 10,35" fill={colors.accent} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} />
        <text x="50" y="15" fill={tier1TextColor} fontSize="4" textAnchor="middle" fontWeight="bold">Tier 1: MELUCRA</text>
<text x="50" y="21" fill={tier1TextColor} fontSize="3" textAnchor="middle">The Governance Layer</text>
        <polygon points="10,35 90,35 100,65 0,65" fill={mode === 'dark' ? colors.lucraGold : '#F0DBA0'} opacity="0.7" stroke={colors.lucraGold} strokeWidth="0.5" />
        <text x="50" y="48" fill={tier2TextColor} fontSize="4" fontWeight="bold" textAnchor="middle">Tier 2: FinOps / Dev Tools</text>
        <text x="50" y="54" fill={tier2TextColor} fontSize="3" textAnchor="middle">Observability, Not Auditability</text>

        <polygon points="0,65 100,65 100,95 0,95" fill={mode === 'dark' ? colors.errorRed : '#926f6cff'} opacity="0.6" stroke={colors.errorRed} strokeWidth="0.5" />
        {/* UPDATED: Applied the new high-contrast text color */}
        <text x="50" y="78" fill={tier3TextColor} fontSize="4" textAnchor="middle" fontWeight="bold">Tier 3: Legacy ERP</text>
        <text x="50" y="84" fill={tier3TextColor} fontSize="3" textAnchor="middle">Human Ledger, Batch-Based</text>
      </g>
    </svg>
  );
};

// --- Slide Titles (14 Slides) ---
// const slideTitles = ["Closing The Audit Gap", "The CFO's Audit Crisis", "The High Cost of Inaction", "The Mandated Audit Core", "Our AI-Native Architectural Moat", "A Top-Down, Compliance-Led GTM", "From a $10.25M Beachhead to a $37B Market", "A Hybrid Model for Enterprise Value", "Our Purpose-Built Moat", "Early Enterprise Validation", "A Credible Path to Scalable Growth", "Founder-Market Fit & Our Execution Plan", "The $5M Seed Round to Capture the Market", "Invest in the Mandated Future"];
const slideTitles = [
  "Closing the Audit Gap",
  "The CFO’s Audit Crisis",
  "The Mandated Audit Core",
  "Why Legacy Fails Without Melucra",
  "A Top-Down, Compliance-Led GTM",
  "From a $10.25M Beachhead to a $37B Market",
  "A Hybrid Model for Enterprise Value",
  "Our Purpose-Built Moat",
  "Early Enterprise Validation",
  "A Credible Path to Scalable Growth",
  "Founder-Market Fit & Our Execution Plan",
  "The $5M Seed Round to Capture the Market",
  "Invest in the Mandated Future"
];
// --- Slide Layout Component ---
const SlideLayout = ({ children, slideNumber, sources = [] }) => {
  const { mode } = useContext(ColorModeContext); const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]); const backgroundStyle = { background: `linear-gradient(135deg, ${colors[mode].bgGradA} 0%, ${colors[mode].bgGradB} 100%)`, minHeight: '100vh', boxSizing: 'border-box', color: theme.palette.text.primary, padding: '2rem 1rem 5rem 1rem', [theme.breakpoints.up('sm')]: { padding: '2rem 2rem 5rem 2rem' }, [theme.breakpoints.up('md')]: { padding: '3rem 4rem 6rem 4rem' }, [theme.breakpoints.up('lg')]: { padding: '4rem 6rem 6rem 6rem' }, }; const formattedSources = sources.join(' | ');
  return (<motion.div style={backgroundStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: '100vh' }}><Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: '1200px', mx: 'auto', width: '100%', mb: { xs: 10, sm: 12, md: 16 }, pb: { xs: '60px', md: '70px' } }}><motion.div variants={slideContainer} initial="hidden" animate="show" className="space-y-6">{children}</motion.div></Box><Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9, width: '100%', height: { xs: '40px', md: '50px' }, backgroundColor: colors[mode].bgTop, borderTop: `1px solid ${colors[mode].textDim}22`, display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'space-between' }, px: { xs: 1, md: 4 } }}><Box sx={{ flexGrow: 1, textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: { xs: 'none', sm: 'block' } }}><Typography variant="body2" sx={{ fontWeight: 500, color: colors[mode].textDim, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{slideTitles[slideNumber]}</Typography></Box><Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 }, ml: formattedSources ? 2 : 0 }}>{formattedSources && (<Typography variant="caption" sx={{ color: colors[mode].textDim, fontSize: { xs: '0.65rem', sm: '0.75rem' }, display: { xs: 'none', sm: 'block' } }}>Sources: {formattedSources}</Typography>)}<Typography variant="body2" sx={{ fontWeight: 700, color: colors.accent, fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>{slideNumber + 1}/{slideTitles.length}</Typography></Box></Box></motion.div>);
};


const Slide1_Opening = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <SlideLayout slideNumber={0} sources={["IDC 2024"]}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          textAlign: "center",
          px: 2,
        }}
      >
        {/* The core brand remains the hero */}
        <motion.div variants={fadeInUp}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 1000,
              lineHeight: 1.05,
              fontSize: "clamp(4rem, 12vw, 9rem)",
              letterSpacing: "-0.02em",
              mb: 4, // Increased margin for better spacing
            }}
          >
            <GradientText variant="inherit">Melucra</GradientText>
          </Typography>
        </motion.div>

        {/* UPDATED: A new, single block for the core mission and value proposition */}
        <motion.div variants={fadeInUp}>
          
          {/* Main Headline: The Big, Visionary Promise */}
          <Typography
            component="h2"
            align="center"
            sx={{
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: theme.palette.text.primary,
              opacity: 0.95,
              maxWidth: 1000,
              mx: "auto",
              lineHeight: 1.15,
              mb: 3, // Margin to separate from the sub-headline
            }}
          >
            Financial Trust for the Machine Economy.
          </Typography>

          {/* Sub-headline: The 'How' and 'Why' - Defines the category */}
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 400,
              color: theme.palette.text.secondary,
              maxWidth: 900,
              mx: "auto",
              lineHeight: 1.5,
            }}
          >
            The <strong style={{ color: theme.palette.text.primary }}>Explainability Layer is </strong> <GradientText variant="inherit"> closing the $1.3 Trillion Audit Gap </GradientText>by making every autonomous decision auditable.
          </Typography>

        </motion.div>
      </Box>
    </SlideLayout>
  );
};

// === SLIDE 1 — EXECUTIVE OVERVIEW ===
const Slide1_ExecutiveOverview = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isDark = mode === "dark";

  const features = [
    {
      title: "Always-Ready Books",
      desc: "Continuous validation keeps every ledger in sync — your close is never a fire drill.",
      icon: "🕒",
    },
    {
      title: "Trust by Design",
      desc: "Immutable audit trails and policy checks make every number verifiable at the source.",
      icon: "🔒",
    },
    {
      title: "Orchestrate, Don’t Replace",
      desc: "Omeca layers above ERP, FP&A, and billing — coordinating control, not creating another silo.",
      icon: "⚙️",
    },
  ];

  return (
    <SlideLayout slideNumber={0} kicker="Executive Overview">
      <Box sx={{ textAlign: "center", py: { xs: 4, md: 6 } }}>
        {/* --- Headline --- */}
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.4rem", md: "3.4rem" },
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Omeca:{" "}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(90deg, ${colors.omecaCyan}, ${colors.lucraGold})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 900,
              }}
            >
              The Continuous Close Control Plane
            </Box>
          </Typography>
        </motion.div>

        {/* --- Subtext --- */}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 820,
            mx: "auto",
            mb: 6,
            lineHeight: 1.55,
            fontWeight: 400,
          }}
        >
          Finance teams shouldn’t wait for the books to close. Omeca unifies ERP,
          billing, FP&A, and compliance data into one live control graph —
          keeping books always ready and audit-safe.
        </Typography>

        {/* --- Feature Boxes --- */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {features.map((f, i) => (
            <Grid key={i} item xs={12} md={4}>
              <motion.div
                variants={fadeInUp}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    minHeight: 240,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: 3,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.02)",
                    boxShadow: isDark
                      ? "0 4px 14px rgba(0,0,0,0.4)"
                      : "0 4px 10px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box sx={{ fontSize: "2rem", mb: 1 }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      maxWidth: 260,
                    }}
                  >
                    {f.desc}
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


const Slide2_ProblemSolution = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <SlideLayout
      slideNumber={1}
      sources={["Cornerstone Research 2023", "Flexera 2024", "Internal Model"]}
    >
      <Box sx={{ pt: "6vh" }}>
        {/* === UPDATED HEADLINE & SUBHEAD === */}
        <motion.div
          variants={fadeInUp}
          style={{ textAlign: "center", marginBottom: "6vh" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.3rem", md: "3.2rem" },
              lineHeight: 1.2,
              mb: 2,
              color: mode === "dark" ? "#FFFFFF" : "#111111",
              transition: "color 0.3s ease",
            }}
          >
            Why The Modern <GradientText variant="inherit">Control Stack Is Broken</GradientText>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: "900px",
              mx: "auto",
              color: colors[mode].textDim,
            }}
          >
            Integrations created data silos. AI agents created an explainability gap. The result is a $1.3 Trillion crisis in financial trust.
          </Typography>
        </motion.div>

        {/* THREE CORE BREAKDOWNS (Card 3 is updated) */}
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch" sx={{ mb: 6 }}>
          {/* CARD 1 (Unchanged) */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeInUp}>
              <Paper sx={{ p: 3, textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: 2, border: `1px solid ${colors.errorRed}88` }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  1. Broken Inputs
                  <br />
                  Machine Logs ≠ Financial Evidence
                </Typography>
                <Typography variant="h4" sx={{ color: colors.errorRed, fontWeight: 700, mt: 2 }}>
                  32% of AI spend is wasted
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* CARD 2 (Unchanged) */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeInUp}>
              <Paper sx={{ p: 3, textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: 2, border: `1px solid ${colors.errorRed}88` }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  2. Broken Controls
                  <br />
                  Retrospective Audit is Obsolete
                </Typography>
                <Typography variant="h4" sx={{ color: colors.errorRed, fontWeight: 700, mt: 2 }}>
                  3,000+ Hours Lost to Reconciliation
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* === UPDATED CARD 3 === */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeInUp}>
              <Paper sx={{ p: 3, textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: 2, border: `1px solid ${colors.errorRed}88` }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  3. The Explainability Gap
                  <br />
                  Actions Are Logged, Rationale Is Lost
                </Typography>
                <Typography variant="h4" sx={{ color: colors.errorRed, fontWeight: 700, mt: 2 }}>
                  $2.9M Average SEC Fine
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* === UPDATED SOLUTION BOX === */}
        <motion.div variants={fadeInUp}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 2,
              border: `2px solid ${colors.lucraGold}`,
              backgroundColor: mode === "dark" ? "rgba(212,175,55,0.1)" : "rgba(212,175,55,0.15)",
            }}
          >
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
              You cannot fix a machine problem with a human process.
              <Box
                component="div"
                sx={{
                  color: theme.palette.text.primary,
                  mt: 2.5,
                  pt: 2.5,
                  borderTop: `1px solid ${colors[mode].textDim}44`,
                }}
              >
                <GradientText variant="inherit">Omeca</GradientText> provides the missing{' '}
                <GradientText variant="inherit">Explainability Layer</GradientText>
                —creating an immutable record of *why* an action was taken, not just *that* it occurred.
              </Box>
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </SlideLayout>
  );
};

const Slide3_Solutions = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <SlideLayout slideNumber={2}>
      <Box sx={{ pt: "6vh", textAlign: "center" }}>
        {/* === HEADER === */}
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.3rem", sm: "2.8rem", md: "3.2rem" },
              lineHeight: 1.2,
              color: mode === "dark" ? "#FFFFFF" : "#111111",
              transition: "color 0.3s ease",
            }}
          >
            The System of Record for{" "}
            <GradientText variant="inherit">Machine Judgment</GradientText>
          </Typography>
        </motion.div>

        {/* === SUBHEAD === */}
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 400,
              maxWidth: "800px",
              mx: "auto",
              mt: 3,
              mb: 6,
            }}
          >
            We do not just log what machines do.{" "}
            <strong>We create an explainable and verifiable record of why they do it.</strong>
          </Typography>
        </motion.div>

        {/* === FLOW DIAGRAM === */}
        <motion.div variants={fadeInUp} sx={{ mb: 5 }}>
          <FlowPipeline />
          {/* FlowPipeline labels: CAPTURE CONTEXT, GENERATE EXPLANATION, ANCHOR JUDGMENT */}
        </motion.div>

        {/* === THREE PILLARS === */}
        <Grid container spacing={4}>
          {/* PILLAR 1 */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeInUp}>
              <SensorsIcon
                sx={{
                  fontSize: 40,
                  color:
                    mode === "dark"
                      ? colors.lucraGold
                      : theme.palette.primary.main,
                  mb: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: colors[mode].textPrimary,
                  fontWeight: 600,
                  mb: 0.5,
                  mt: 0.5,
                }}
              >
                <strong>Capture Context:</strong> Gathers the full decision context, including the data, model, and rules in play.
              </Typography>
            </motion.div>
          </Grid>

          {/* PILLAR 2 */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeInUp}>
              <VisibilityIcon
                sx={{
                  fontSize: 40,
                  color:
                    mode === "dark"
                      ? colors.accent
                      : theme.palette.secondary.main,
                  mb: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: colors[mode].textPrimary,
                  fontWeight: 600,
                  mb: 0.5,
                  mt: 0.5,
                }}
              >
                <strong>Generate Explanation:</strong> Translates context into a human-readable explanation, showing why each action met its compliance criteria.
              </Typography>
            </motion.div>
          </Grid>

          {/* PILLAR 3 */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeInUp}>
              <GavelIcon
                sx={{
                  fontSize: 40,
                  color:
                    mode === "dark"
                      ? colors.successGreen
                      : theme.palette.success.main,
                  mb: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: colors[mode].textPrimary,
                  fontWeight: 600,
                  mb: 0.5,
                  mt: 0.5,
                }}
              >
                <strong>Anchor Judgment:</strong> Anchors the complete and verifiable judgment, capturing what happened, why it happened, and how, as a permanent record for auditors.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </SlideLayout>
  );
};

const Slide4_WhyLegacyFails = () => {
  const { mode } = useContext(ColorModeContext);

  return (
    <SlideLayout slideNumber={3}>
      <Box sx={{ pt: "10vh" }}>
        <motion.div variants={fadeInUp}>

          {/* === HEADER === */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.3rem", md: "3.2rem" },
              lineHeight: 1.2,
              textAlign: "center",
              mb: 2,
              color: mode === "dark" ? "#FFFFFF" : "#111111",
              transition: "color 0.3s ease",
            }}
          >
            System of Record vs. <GradientText variant="inherit">System of Reason</GradientText>
          </Typography>

          {/* === SUBHEAD === */}
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: colors[mode].textDim,
              mb: 6,
            }}
          >
            Legacy systems record human actions but cannot explain machine judgment.
          </Typography>
        </motion.div>

        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="stretch"
          justifyContent="center"
        >
          {/* === LEFT BOX === */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                height: "100%",
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255,65,54,0.08)"
                    : "rgba(255,65,54,0.06)",
                border: `2px solid ${colors.errorRed}`,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: colors.errorRed,
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                The System of Record (ERPs and similar)
              </Typography>

              <List sx={{ p: 0 }}>
                {[
                  "Records the what, a log of the final transaction.",
                  "Built for human workflows, not autonomous agents.",
                  "Provides a trail of results but cannot explain the reasoning behind them.",
                ].map((text, idx) => (
                  <ListItem
                    key={idx}
                    sx={{ px: 0, py: 0.8, alignItems: "flex-start" }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: colors.errorRed,
                        fontWeight: 700,
                        mr: 1,
                      }}
                    >
                      ✕
                    </Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{ color: colors[mode].textPrimary }}
                    >
                      {text}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* === RIGHT BOX === */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                height: "100%",
                backgroundColor:
                  mode === "dark"
                    ? "rgba(46,204,64,0.08)"
                    : "rgba(46,204,64,0.06)",
                border: `2px solid ${colors.successGreen}`,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: colors.successGreen,
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                Melucra: The System of Reason
              </Typography>

              <List sx={{ p: 0 }}>
                {[
                  "Records the why, capturing full context, rules, and data behind each decision.",
                  "Built for machine scale, creating a real-time, explainable link between action and entry.",
                  "Provides a verifiable record of judgment, giving auditors the complete reasoning, not just the result.",
                ].map((text, idx) => (
                  <ListItem
                    key={idx}
                    sx={{ px: 0, py: 0.8, alignItems: "flex-start" }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: colors.successGreen,
                        fontWeight: 700,
                        mr: 1,
                      }}
                    >
                      ✓
                    </Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{ color: colors[mode].textPrimary }}
                    >
                      {text}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </SlideLayout>
  );
};

const Slide5_GTM = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <SlideLayout slideNumber={4}>
      <Box
        sx={{
          pt: "8vh",
          pb: "6vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* === BACKGROUND ACCENT === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "100%",
            background: mode === "dark"
              ? "radial-gradient(circle at top, rgba(212,175,55,0.25), transparent 60%)"
              : "radial-gradient(circle at top, rgba(212,175,55,0.15), transparent 60%)",
            zIndex: 0,
          }}
        />

        {/* === HEADER === */}
        <motion.div variants={fadeInUp} style={{ zIndex: 2 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.3rem", md: "3.2rem" },
              lineHeight: 1.2,
              textAlign: "center",
              mb: 2,
              color: mode === "dark" ? "#FFFFFF" : "#111111",
              letterSpacing: "-0.01em",
            }}
          >
            The C-Suite Mandate for a{" "}
            <GradientText variant="inherit">Top-Down GTM</GradientText>
          </Typography>
        </motion.div>

        {/* === SUBHEAD === */}
        <Box sx={{ maxWidth: 900, mx: "auto", mb: 6, zIndex: 2 }}>
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 400,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                textAlign: "center",
                lineHeight: 1.5,
                opacity: 0.95,
              }}
            >
              We are not selling a feature to Engineering.
              <br />
              We are delivering a System of Governance to the CFO and Board.
            </Typography>
          </motion.div>
        </Box>

        {/* === MAIN BODY: TEXT + VISUAL === */}
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
          sx={{ zIndex: 2 }}
        >
          {/* LEFT COLUMN: STRATEGY POINTS */}
          <Grid item xs={12} md={7}>
            <motion.ul
              variants={listContainer}
              initial="hidden"
              animate="show"
              style={{
                listStyleType: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(3.5),
              }}
            >
              {[
                {
                  title: "Lead with the Risk Owner",
                  body:
                    "This is a governance sale. We engage the CFO and Chief Compliance Officer who own the multi-million dollar risk of an unexplainable AI audit.",
                },
                {
                  title: "Design Partner Cohort",
                  body:
                    "Engage 3 to 5 strategic enterprises to build undeniable case studies and compliance artifacts for market entry in 2026.",
                },
                {
                  title: "Build the Audit Channel",
                  body:
                    "Establish programs with firms like PwC and Deloitte that can champion Omeca as the standard for auditing autonomous systems.",
                },
              ].map((item, idx) => (
                <motion.li key={idx} variants={bulletItem}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, md: 3 },
                      borderRadius: 2,
                      background:
                        mode === "dark"
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                      borderLeft: `4px solid ${
                        [colors.lucraGold, colors.accent, colors.successGreen][
                          idx
                        ]
                      }`,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "translateX(4px)" },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.body}
                    </Typography>
                  </Paper>
                </motion.li>
              ))}
            </motion.ul>
          </Grid>

          {/* RIGHT COLUMN: FUNNEL VISUAL */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "320px", sm: "400px", md: "440px" },
                mt: { xs: 4, md: 0 },
              }}
            >
              <GTMFunnel />
            </Box>
          </Grid>
        </Grid>

        {/* === SUBTLE BOTTOM GLOW === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "20%",
            background:
              mode === "dark"
                ? "radial-gradient(circle at bottom, rgba(46,204,64,0.4), transparent 70%)"
                : "radial-gradient(circle at bottom, rgba(46,204,64,0.25), transparent 70%)",
          }}
        />
      </Box>
    </SlideLayout>
  );
};

const Slide6_Beachhead = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <SlideLayout
      slideNumber={5}
      sources={["Internal Model", "Grand View Research, 2024"]}
    >
      <Box
        sx={{
          pt: { xs: "4vh", md: "6vh" },
          pb: { xs: "3vh", md: "5vh" },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* BACKGROUND ACCENT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "100%",
            background: mode === "dark"
              ? "radial-gradient(circle at top, rgba(212,175,55,0.25), transparent 70%)"
              : "radial-gradient(circle at top, rgba(212,175,55,0.15), transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* HEADER */}
        <motion.div variants={fadeInUp} style={{ zIndex: 2 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.4rem", md: "3.2rem" },
              lineHeight: 1.2,
              textAlign: "center",
              mb: { xs: 2, md: 3 },
              color: mode === "dark" ? "#FFFFFF" : "#111111",
              letterSpacing: "-0.01em",
            }}
          >
            Securing the{" "}
            <GradientText variant="inherit">Governance Beachhead</GradientText>
          </Typography>

          {/* UPDATED SUBHEAD */}
          <Typography
            variant="h6"
            sx={{
              color: colors[mode].textDim,
              fontWeight: 500,
              mb: { xs: 3, md: 4 },
              textAlign: "center",
              maxWidth: 900,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.5,
            }}
          >
            82 enterprise targets in regulated finance represent a{" "}
            <GradientText variant="inherit">$10.25M</GradientText> serviceable
            beachhead opportunity.
          </Typography>
        </motion.div>

        {/* MAIN CONTENT */}
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", maxWidth: 1200, zIndex: 2 }}
        >
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={7}>
            <motion.ul
              variants={listContainer}
              initial="hidden"
              animate="show"
              style={{
                listStyleType: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(3),
              }}
            >
              {[
                {
                  color: colors.lucraGold,
                  title: "Phase 1: Forge the Gold Standard (18 Months)",
                  text: "We will onboard 3–5 paid Design Partners to co-develop the product, build irrefutable proof, and achieve SOC 2 Type II certification — the table stakes for a System of Governance.",
                },
                {
                  color: colors.accent,
                  title: "Phase 2: Dominate the Beachhead (Y2–3)",
                  text: "Armed with compliance and undeniable case studies, we will execute a land-grab strategy to rapidly capture the remaining firms in our $10.25M beachhead market.",
                },
                {
                  color: colors.successGreen,
                  title: "Phase 3: Scale the Standard (Y4+)",
                  text: "We will leverage our reputation as the trusted standard in finance to expand into adjacent regulated markets such as Healthcare and Government.",
                },
              ].map((phase, idx) => (
                <motion.li key={idx} variants={bulletItem}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: 2,
                      background:
                        mode === "dark"
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                      borderLeft: `4px solid ${phase.color}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        background:
                          mode === "dark"
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 0.8,
                      }}
                    >
                      {phase.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                      }}
                    >
                      {phase.text}
                    </Typography>
                  </Paper>
                </motion.li>
              ))}
            </motion.ul>
          </Grid>

          {/* RIGHT COLUMN — CHART */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { xs: 2, md: 0 },
              }}
            >
              <TAMWedgeChart />
            </Box>
          </Grid>
        </Grid>

        {/* BOTTOM GLOW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "20%",
            background:
              mode === "dark"
                ? "radial-gradient(circle at bottom, rgba(46,204,64,0.4), transparent 70%)"
                : "radial-gradient(circle at bottom, rgba(46,204,64,0.25), transparent 70%)",
          }}
        />
      </Box>
    </SlideLayout>
  );
};

// --- REVISED SLIDE (Business Model - Polished Final Version) ---
const Slide7_PricingModel = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // === UPDATED TIER DEFINITIONS ===
  const tiers = [
    {
      name: 'Design Partner',
      price: '$25K–$50K Strategic Pilot',
      color: colors.lucraGold,
      desc: 'For our foundational cohort of strategic partners co-developing the governance and assurance standards for the autonomous era.',
      features: [
        'Influence Core Roadmap',
        'Co-Author Compliance Frameworks',
        'Shape the Audit Standard'
      ],
    },
    {
      name: 'Enterprise Governance',
      price: '$125K+ ACV',
      color: colors.accent,
      desc: 'The complete governance core for organizations scaling autonomous systems with compliance-grade assurance.',
      features: [
        'Unified Governance Platform',
        'Scales with Machine Activity',
        'Audit-Ready by Default'
      ],
    },
  ];

  return (
    <SlideLayout slideNumber={6}>
      <Box
        sx={{
          pt: '6vh',
          pb: '4vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* === UPDATED HEADER === */}
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.3rem', md: '3.6rem' },
              lineHeight: 1.2,
              textAlign: 'center',
              mb: 2,
              color: mode === 'dark' ? '#FFFFFF' : '#111111',
              transition: 'color 0.3s ease',
            }}
          >
            <GradientText variant="inherit">Pricing</GradientText> for Partnership and Predictable Scale
          </Typography>
        </motion.div>

        {/* === UPDATED SUBHEAD === */}
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 400,
            fontSize: { xs: '1.2rem', md: '1.6rem' },
            textAlign: 'center',
            mb: 6,
            maxWidth: '900px',
            mx: 'auto',
            mt: { xs: 2, md: 3 },
          }}
        >
          Our pricing structure is built to de-risk early adoption and align
          long-term value creation with your scale in the emerging machine
          economy.
        </Typography>

        {/* === UPDATED GRID === */}
        <motion.div variants={listContainer} initial="hidden" animate="show">
          <Grid container spacing={4} alignItems="stretch">
            {tiers.map((tier) => (
              <Grid item xs={12} md={6} key={tier.name}>
                <motion.div
                  variants={fadeInUp}
                  style={{ height: '100%' }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      bgcolor: colors[mode].card,
                      border: `4px solid ${tier.color}`,
                      borderRadius: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 0 12px ${tier.color}55`,
                      },
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ mb: 0.5, color: tier.color }}
                    >
                      {tier.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      sx={{ color: colors[mode].textPrimary, mb: 2 }}
                    >
                      {tier.price}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: colors[mode].textDim,
                        mb: 2,
                        flexGrow: 1,
                      }}
                    >
                      {tier.desc}
                    </Typography>
                    <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
                      {tier.features.map((feature) => (
                        <Typography
                          key={feature}
                          variant="h6"
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            mb: 1,
                            color: theme.palette.text.primary,
                          }}
                        >
                          <CheckCircleOutlineRoundedIcon
                            sx={{
                              color: tier.color,
                              fontSize: 20,
                              mt: 0.2,
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
        </motion.div>
      </Box>
    </SlideLayout>
  );
};

// --- REVISED SLIDE (Moat - Final Polished Version) ---
const Slide8_Moat = () => {
  const { mode } = useContext(ColorModeContext);

  // === UPDATED MATRIX DATA: Focused on strategic differentiation ===
  const matrixData = [
    { 
      feature: 'Core Architecture', 
      omeca: 'System of Reason — Captures the “Why” behind every decision', 
      comp: 'System of Record — Logs the “What” after execution' 
    },
    { 
      feature: 'Unit of Audit', 
      omeca: 'The Complete Judgment (Action + Context)', 
      comp: 'The Transaction (Action Only)' 
    },
    { 
      feature: 'Data Philosophy', 
      omeca: 'Holds Verifiable Proof — No Customer Data Stored', 
      comp: 'Full Data Custody and Retention Required' 
    },
    { 
      feature: 'Compliance Model', 
      omeca: 'Proactive and Audit-Ready by Design', 
      comp: 'Reactive and Policy-Based' 
    },
    { 
      feature: 'Operating Speed', 
      omeca: 'Real-Time — At the Moment of Judgment', 
      comp: 'Retrospective — Days or Weeks Later' 
    },
  ];

  return (
    <SlideLayout slideNumber={7}>
      <Box
        sx={{
          pt: '6vh',
          pb: '4vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* === HEADER === */}
<motion.div variants={fadeInUp}>
  <Typography
    variant="h2"
    component="h2"
    sx={{
      fontWeight: 800,
      fontSize: { xs: '2.3rem', md: '3.2rem' },
      lineHeight: 1.2,
      textAlign: 'center',
      mb: 2,
      color: mode === 'dark' ? '#FFFFFF' : '#111111',
      transition: 'color 0.3s ease',
      letterSpacing: '-0.01em',
    }}
  >
    The <GradientText variant="inherit">Explainability Moat</GradientText> by Design
  </Typography>
</motion.div>


        {/* === SUBTITLE === */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: colors[mode].textDim,
            mb: 6,
            maxWidth: '800px',
          }}
        >
          Omeca is built for machine judgment from the ground up — enabling systems
          that can explain and verify their own reasoning in real time.
        </Typography>

        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
        >
          {/* LEFT: Comparison Matrix */}
          <Grid item xs={12} md={7}>
            <motion.div variants={fadeInUp}>
              <Box sx={{ overflowX: 'auto' }}>
                <Paper
                  sx={{
                    p: { xs: 2, md: 3 },
                    bgcolor: colors[mode].card,
                    boxShadow: 3,
                    borderRadius: 3,
                    minWidth: 500,
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={4}>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                          color: colors.lucraGold,
                          fontSize: { xs: '1rem', md: '1.2rem' },
                        }}
                      >
                        Differentiator
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                          color: colors.accent,
                          fontSize: { xs: '1rem', md: '1.2rem' },
                        }}
                      >
                        Melucra
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                          color: colors.errorRed,
                          fontSize: { xs: '1rem', md: '1.2rem' },
                        }}
                      >
                        Legacy & Dev Tools
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ mb: 1 }} />

                  {matrixData.map((item, idx) => (
                    <Grid
                      container
                      key={idx}
                      spacing={2}
                      sx={{
                        alignItems: 'center',
                        py: 1.2,
                        borderBottom:
                          idx < matrixData.length - 1
                            ? `1px solid ${colors[mode].textDim}22`
                            : 'none',
                      }}
                    >
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                          }}
                        >
                          {item.feature}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: colors.accent,
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                          }}
                        >
                          {item.omeca}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: colors.errorRed,
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                          }}
                        >
                          {item.comp}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Paper>
              </Box>
            </motion.div>
          </Grid>

          {/* RIGHT: Competitor Funnel */}
          <Grid item xs={12} md={5}>
            <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
              <Box
                sx={{
                  mt: { xs: 4, md: 0 },
                  width: '100%',
                  maxWidth: '400px',
                  mx: 'auto',
                  aspectRatio: '1 / 1',
                }}
              >
                <CompetitorFunnel />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </SlideLayout>
  );
};

// --- REVISED SLIDE (Validation - Lighter Cards, No Dashes) ---
const Slide9_Validation = () => {
  const { mode } = useContext(ColorModeContext);

  // Shorter, punchier copy
  const cards = [
    { 
      title: "Executive Validation", 
      stat: "3+", 
      statColor: colors.accent, 
      desc: "Pilot scoping with C level risk and compliance leaders at multiple Fortune 500 companies, including a top five global bank. The mandate is explainable AI governance.",
      color: colors.lucraGold 
    },
    { 
      title: "Economic Validation", 
      stat: "$100K+", 
      statColor: colors.lucraGold, 
      desc: "Six figure ACV validated in buyer conversations. The value ties directly to audit exposure and explainability requirements.",
      color: colors.accent 
    },
    { 
      title: "Technical Validation", 
      stat: "NVIDIA", 
      statColor: colors.accent, 
      desc: "Accepted into NVIDIA Inception. Our AI native architecture is recognized as a credible governance core for autonomous systems.",
      color: colors.lucraGold 
    },
  ];

  return (
    <SlideLayout slideNumber={8} sources={['Grand View Research, 2024']}>
      <Box sx={{ pt: '6vh', pb: '2vh' }}>
        <motion.div variants={fadeInUp}>
          {/* HEADER */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.4rem', md: '3.6rem' },
              lineHeight: 1.2,
              textAlign: 'center',
              mb: 2,
              color: mode === 'dark' ? '#FFFFFF' : '#111111',
              transition: 'color 0.3s ease',
            }}
          >
            Validating the{' '}
            <GradientText variant="inherit">Governance Mandate</GradientText>
          </Typography>

          {/* SUBHEAD: no dash */}
          <Typography
            variant="h5"
            sx={{
              color: colors[mode].textPrimary,
              fontWeight: 400,
              textAlign: 'center',
              maxWidth: '900px',
              mx: 'auto',
            }}
          >
            Early traction shows the market is not just expanding, it is confirming the need for a purpose built{' '}
            <strong>System of Reason</strong> that brings transparency and control to autonomous decisions.
          </Typography>
        </motion.div>
      </Box>

      {/* VALIDATION CARDS */}
      <Grid container spacing={4} alignItems="stretch" sx={{ mt: 4 }}>
        {cards.map((card, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: colors[mode].card,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'center',
                  border: `1px solid ${colors[mode].textDim}22`,
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 0 12px ${card.color}44`,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: card.color, fontWeight: 700, mb: 0.5 }}
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h2"
                  sx={{ color: card.statColor, fontWeight: 900, mb: 1 }}
                >
                  {card.stat}
                </Typography>

                {/* Lighter, clamped body text */}
                <Typography
                  variant="body1"
                  sx={{
                    color: colors[mode].textDim,
                    fontWeight: 400,
                    lineHeight: 1.5,
                    fontSize: { xs: '1rem', md: '1rem' },
                    display: '-webkit-box',
                    WebkitLineClamp: { xs: 3, md: 2 },
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                  title={card.desc}
                >
                  {card.desc}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Optional closing takeaway retained, concise and no dash */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            color: colors[mode].textPrimary,
            fontWeight: 500,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Governance is becoming infrastructure. Omeca sets the standard for explainable systems at scale.
        </Typography>
      </Box>
    </SlideLayout>
  );
};

// --- REVISED SLIDE (Financial Path - Centered Viewport & Smart Motion) ---
const FinancialForecast = () => {
  const { mode } = useContext(ColorModeContext);
  const headerStyle = {
    color: colors.lucraGold,
    fontWeight: 700,
    borderBottom: `2px solid ${colors.lucraGold}`,
  };
  const cellStyle = { borderBottom: `1px solid ${colors[mode].textDim}33` };

  const forecastData = [
    { metric: 'ARR', y1: '$250K', y2: '$1.2M', y3: '$5.5M' },
    { metric: 'Customers', y1: '3–5', y2: '12', y3: '45' },
    { metric: 'Headcount', y1: '8', y2: '18', y3: '35' },
    { metric: 'Cash (EoY)', y1: '$3.5M', y2: '$1.5M', y3: '+$10M (Series A)' },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      <Box sx={{ width: '100%', overflowX: 'auto', borderRadius: 2 }}>
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            bgcolor: colors[mode].card,
            boxShadow: 3,
            minWidth: 480,
          }}
        >
          <Grid container spacing={1} sx={{ textAlign: 'center' }}>
            {['Metric', 'Year 1', 'Year 2', 'Year 3'].map((label, i) => (
              <Grid item xs={3} key={label}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Typography variant="h6" sx={headerStyle}>
                    {label}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
            {forecastData.map((row, idx) => (
              <React.Fragment key={row.metric}>
                {[row.metric, row.y1, row.y2, row.y3].map((val, i) => (
                  <Grid
                    item
                    xs={3}
                    key={`${row.metric}-${i}`}
                    sx={{
                      ...cellStyle,
                      p: 1.2,
                      textAlign: i === 0 ? 'left' : 'center',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 + i * 0.03 }}
                    >
                      <Typography fontWeight={i === 0 ? 600 : 400}>
                        {val}
                      </Typography>
                    </motion.div>
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </Paper>
      </Box>
    </motion.div>
  );
};

const Slide10_FinancialPath = () => {
  const { mode } = useContext(ColorModeContext);

  const assumptions = [
    { text: 'High-value governance ACV $125K+', icon: <MonetizationOnIcon /> },
    { text: 'Enterprise sales cycle 6–9 months', icon: <CalendarMonthIcon /> },
    { text: '130%+ NRR via machine expansion', icon: <TrendingUpIcon /> },
    { text: '80% gross margins, capital efficient', icon: <PieChartIcon /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <SlideLayout slideNumber={9} sources={['Internal Model']}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ width: '100%' }}
      >
        <Box
          sx={{
            minHeight: { xs: '86vh', md: '84vh' },
            pt: { xs: '4vh', md: '6vh' },
            pb: { xs: '2vh', md: '2vh' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* === HEADER === */}
          <motion.div variants={item}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.3rem', md: '3.2rem' },
                lineHeight: 1.2,
                mb: 2,
                color: mode === 'dark' ? '#FFFFFF' : '#111111',
              }}
            >
              A Credible Path to{' '}
              <GradientText variant="inherit">Market Leadership</GradientText>
            </Typography>
          </motion.div>

          {/* === SUBHEAD === */}
          <motion.div variants={item}>
            <Typography
              variant="h5"
              sx={{
                color: colors[mode].textDim,
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
              }}
            >
              A governance-first model that scales predictably and builds durable
              enterprise value with efficiency.
            </Typography>
          </motion.div>

          {/* === GRID SECTION === */}
          <Grid
            container
            spacing={{ xs: 3, md: 5 }}
            alignItems="flex-start"
            sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}
          >
            <Grid item xs={12} md={7}>
              <FinancialForecast />
            </Grid>

            <Grid item xs={12} md={5}>
              <motion.div variants={item}>
                <Paper
                  sx={{
                    p: { xs: 3, md: 3 },
                    bgcolor: colors[mode].card,
                    borderLeft: `3px solid ${colors.accent}`,
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: colors.accent,
                      fontWeight: 700,
                      mb: 2,
                      textAlign: 'left',
                    }}
                  >
                    Core Model Drivers
                  </Typography>
                  <List>
                    {assumptions.map((a, idx) => (
                      <motion.div
                        key={a.text}
                        variants={item}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon
                            sx={{ color: colors.accent, minWidth: '36px' }}
                          >
                            {a.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={a.text}
                            primaryTypographyProps={{
                              fontSize: '1.05rem',
                              fontWeight: 500,
                            }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* === CLOSING TAKEAWAY === */}
          <motion.div variants={item}>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  color: colors[mode].textPrimary,
                  fontWeight: 500,
                  maxWidth: '780px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                The financial foundation is designed for disciplined growth and
                enduring category leadership.
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </SlideLayout>
  );
};

const Slide11_Team = () => {
  const { mode } = useContext(ColorModeContext);
  const buildTeamRoles = [
    "Lead Architect",
    "Backend Engineers (x2)",
    "Security Engineer",
    "Infrastructure Engineer",
    "GRC Specialist",
  ];

  return (
    <SlideLayout slideNumber={10} sources={["Meta", "Eventbrite", "Robert Half"]}>
      <Box
        sx={{
          pt: { xs: "4vh", md: "6vh" },
          pb: { xs: "3vh", md: "5vh" },
          px: { xs: 2, md: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <motion.div variants={fadeInUp}>
<Typography
  variant="h2"
  component="h2"
  sx={{
    fontWeight: 800,
    fontSize: { xs: "2.3rem", md: "3.2rem" },
    lineHeight: 1.2,
    textAlign: "center",
    mb: 2,
    color: mode === "dark" ? "#FFFFFF" : "#111111",
    transition: "color 0.3s ease",
  }}
>
  The <GradientText variant="inherit">Execution Team</GradientText> Behind Melucra
</Typography>

        </motion.div>

        {/* Team Cards */}
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
          justifyContent="center"
          sx={{
            mb: { xs: 5, md: 6 },
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {[
            {
              initials: "PA",
              name: "Pony Aristil, MBA, PMP",
              role: "Founder and CEO",
              desc: "10+ years in finance systems at Meta, Eventbrite, and Robert Half.",
              border: colors.lucraGold,
              highlight: true,
              color: colors.lucraGold,
            },
            {
              initials: "CF",
              name: "Co-Founder (Enterprise GTM)",
              desc: "Seeking a proven sales leader to scale our GTM function.",
              color: colors.lucraGold,
            },
            {
              initials: "AF",
              name: "Advisor (Enterprise Finance)",
              desc: "Seeking a seasoned CFO to guide GTM and compliance scaling.",
              color: colors.accent,
            },
            {
              initials: "AA",
              name: "Advisor (AI and Compliance)",
              desc: "Seeking an AI leader to shape governance and secure adoption.",
              color: colors.lucraGold,
            },
          ].map((member, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.1 + idx * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                style={{
                  background:
                    mode === "dark"
                      ? "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.02) 100%)",
                  border: `1.8px solid ${member.highlight ? member.border : `${colors[mode].textDim}33`
                    }`,
                  borderRadius: "14px",
                  boxShadow: member.highlight
                    ? `0px 0px 18px ${colors.lucraGold}33`
                    : "0px 4px 12px rgba(0,0,0,0.08)",
                  padding: "1.6rem 1rem",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    mx: "auto",
                    mb: 2,
                    bgcolor: member.color,
                    fontWeight: 700,
                    color: "#000",
                    border: member.highlight
                      ? `2px solid ${colors.lucraGold}`
                      : `1px solid ${colors[mode].textDim}44`,
                  }}
                >
                  {member.initials}
                </Avatar>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    color: member.highlight ? colors.lucraGold : member.color,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  {member.name}
                </Typography>

                {member.role && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.lucraGold,
                      mb: 0.5,
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    }}
                  >
                    {member.role}
                  </Typography>
                )}

                <Typography
                  variant="body2"
                  sx={{
                    color: colors[mode].textDim,
                    fontSize: { xs: "0.85rem", md: "0.95rem" },
                    lineHeight: 1.5,
                    px: 1,
                  }}
                >
                  {member.desc}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            width: { xs: "70%", sm: "60%", md: "45%" },
            mb: { xs: 3, md: 4 },
            borderColor: `${colors[mode].textDim}33`,
          }}
        />

        {/* --- Founding Team Blueprint --- */}
        <motion.div
          variants={fadeInUp}
          sx={{
            textAlign: "center",
            width: "100%",
            maxWidth: 1000,
            px: { xs: 2, md: 0 },
            mt: { xs: 4, md: 5 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: colors.accent,
              fontWeight: 700,
              mb: { xs: 3, md: 4 },
            }}
          >
            Our Founding Team Blueprint
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="left"
            alignItems="stretch"
          >
            {[
              { initials: "LA", title: "Lead Architect" },
              { initials: "BE", title: "Backend Engineers (x2)" },
              { initials: "SE", title: "Security Engineer" },
              { initials: "IE", title: "Infrastructure Engineer" },
              { initials: "GS", title: "GRC Specialist" },
            ].map((role, idx) => (
              <Grid key={idx} item xs={6} sm={4} md={2.4} sx={{ display: "flex" }}>
                <motion.div
                  variants={fadeInUp}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 18px ${colors.accent}33`,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    flex: 1,
                    background:
                      mode === "dark"
                        ? "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)",
                    borderRadius: "14px",
                    padding: "1.5rem 0.8rem",
                    border: `1.5px solid ${colors[mode].textDim}33`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor: colors.accent,
                      color: "#000",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      mb: 1.5,
                    }}
                  >
                    {role.initials}
                  </Avatar>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: colors[mode].textPrimary,
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      lineHeight: 1.4,
                    }}
                  >
                    {role.title}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

      </Box>
    </SlideLayout>
  );
};

// --- REVISED SLIDE (Ask - Centered & Motion-Optimized) ---
const Slide12_Ask = () => {
  const { mode } = useContext(ColorModeContext);

  const useOfFunds = [
    {
      label: "Core Engineering & Product",
      value: 50,
      amount: "$2.5M",
      desc: "Hire the 8-person technical team from our blueprint to build and secure our SOC 2 compliant MVP.",
    },
    {
      label: "GTM & Design Partners",
      value: 30,
      amount: "$1.5M",
      desc: "Recruit a founding GTM leader and secure our initial 3–5 enterprise design partners.",
    },
    {
      label: "Runway & G&A",
      value: 20,
      amount: "$1.0M",
      desc: "Cover operational costs, legal, and establish a strategic capital reserve for 24 months.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <SlideLayout slideNumber={11}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            minHeight: { xs: "86vh", md: "84vh" },
            pt: { xs: "4vh", md: "6vh" },
            pb: { xs: "3vh", md: "4vh" },
            px: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // vertical centering
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* === HEADER === */}
          <motion.div variants={item}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.4rem", sm: "2.8rem", md: "3.4rem" },
                lineHeight: 1.2,
                mb: { xs: 2, md: 2.5 },
                color: mode === "dark" ? "#FFFFFF" : "#111111",
                transition: "color 0.3s ease",
              }}
            >
              The <GradientText variant="inherit">$5M Seed</GradientText> to Lead the Market
            </Typography>
          </motion.div>

          {/* === GRID CONTENT === */}
          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 5 }}
            alignItems="stretch"
            justifyContent="center"
            sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: { xs: 2, md: 3 } }}
          >
            {/* === USE OF FUNDS === */}
            <Grid item xs={12} md={7}>
              <motion.div variants={item}>
                <Typography
                  variant="h4"
                  sx={{
                    color: colors.lucraGold,
                    fontWeight: 700,
                    mb: { xs: 2, md: 3 },
                    textAlign: "left",
                  }}
                >
                  Use of Funds
                </Typography>

                <Stack spacing={{ xs: 2.5, sm: 3 }}>
                  {useOfFunds.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      variants={item}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                      style={{
                        borderRadius: "12px",
                        padding: "1rem 1.2rem",
                        backgroundColor:
                          mode === "dark"
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.03)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "space-between",
                          alignItems: { sm: "center" },
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.accent,
                            fontWeight: 700,
                            mb: { xs: 0.5, sm: 0 },
                          }}
                        >
                          {item.value}% {item.label}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.lucraGold,
                            fontWeight: 700,
                            alignSelf: { xs: "flex-start", sm: "center" },
                          }}
                        >
                          {item.amount}
                        </Typography>
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={item.value}
                        sx={{
                          height: 10,
                          borderRadius: 4,
                          mb: 1.5,
                          backgroundColor:
                            mode === "dark"
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.05)",
                          "& .MuiLinearProgress-bar": {
                            background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
                          },
                        }}
                      />

                      <Typography
                        variant="body1"
                        sx={{
                          color: colors[mode].textDim,
                          textAlign: "left",
                          fontSize: { xs: "0.95rem", md: "1rem" },
                          lineHeight: 1.5,
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* === SEED SUMMARY CARD === */}
            <Grid item xs={12} md={5} sx={{ mt: { xs: 4, md: 0 } }}>
              <motion.div
                variants={item}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                style={{
                  background:
                    mode === "dark"
                      ? "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)",
                  border: `2px solid ${colors.lucraGold}`,
                  borderRadius: "18px",
                  boxShadow: `0 8px 24px ${colors.lucraGold}22`,
                  textAlign: "center",
                  padding: "2.2rem 1.6rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "3.8rem", sm: "5rem", md: "6rem" },
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  <GradientText variant="inherit">$5M</GradientText>
                </Typography>

                <Typography
                  variant="h4"
                  sx={{ color: colors.lucraGold, fontWeight: 700 }}
                >
                  Seed Round
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: colors.accent,
                    fontWeight: 600,
                    mt: 1,
                  }}
                >
                  12–18 Month Runway
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: colors[mode].textDim,
                    mt: 1,
                    fontWeight: 500,
                  }}
                >
                  <strong>$25M SAFE Cap</strong>
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          {/* === CLOSING TAKEAWAY === */}
          <motion.div variants={item}>
            <Box sx={{ mt: 6, textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  color: colors[mode].textPrimary,
                  fontWeight: 500,
                  maxWidth: "780px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Our raise accelerates technical depth, design partnerships, and early leadership in the emerging governance stack.
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </SlideLayout>
  );
};

const Slide13_Closing = () => {
  const { mode } = useContext(ColorModeContext); 
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]); 
  const [hovered, setHovered] = useState(false);
  
  return (
    <SlideLayout slideNumber={12}>
      <Box 
        sx={{ 
          pt: { xs: '8vh', md: '12vh' }, 
          pb: { xs: '6vh', md: '8vh' }, 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          maxWidth: '900px', 
          mx: 'auto', 
          px: { xs: 2, md: 0 }, 
        }}
      >
        {/* === UPDATED HEADLINE: More strategic and visionary === */}
        <motion.div variants={fadeInUp}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 900, 
              fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' }, 
              lineHeight: { xs: 1.2, md: 1.15 }, 
              mb: { xs: 3, md: 4 }, 
            }}
          >
            <Box component="span" sx={{ color: theme.palette.text.primary }}>
              Invest in the <GradientText variant="inherit">Mandated Standard</GradientText> for Financial Trust.
            </Box>
          </Typography>
        </motion.div>

        {/* === UPDATED SUBHEAD: Reinforces the core value proposition === */}
        <motion.div variants={fadeInUp}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: colors[mode].textDim, 
              fontWeight: 500, 
              maxWidth: '760px', 
              mx: 'auto', 
              mb: { xs: 5, md: 8 }, 
              fontSize: { xs: '1.2rem', md: '1.8rem' }, 
              lineHeight: { xs: 1.5, md: 1.4 }, 
              px: { xs: 3, md: 0 }, 
            }}
          >
            We are building the foundational layer of governance that makes the machine economy auditable, explainable, and trustworthy.
          </Typography>
        </motion.div>

        {/* === UPDATED TAGLINE: The strategic pillars of the moat === */}
        <motion.div variants={fadeInUp}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: colors.lucraGold, 
              fontWeight: 800, 
              mb: { xs: 3, md: 4 }, 
              fontSize: { xs: '1.6rem', md: '2.2rem' }, 
            }}
          >
            Reason. Governance. Trust.
          </Typography>
          
          {/* CTA remains the same, but brand name is updated */}
          <motion.div 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)} 
            initial={{ scale: 1 }} 
            animate={{ scale: hovered ? 1.05 : 1 }} 
            transition={{ duration: 0.2 }} 
            sx={{ minHeight: '60px', display: 'inline-block', mt: { xs: 2, md: 3 }, }}
          >
            <Box sx={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexDirection: hovered ? 'column' : 'row', gap: hovered ? 1 : 0, px: 3, py: hovered ? 1.5 : 2.5, borderRadius: 2, border: `2px solid ${colors.accent}`, minWidth: { xs: 260, md: 320 }, transition: 'all 0.3s ease', backgroundColor: hovered ? colors.accent : 'transparent', color: hovered ? colors.logoDark : colors.accent, fontWeight: 700, }}>
              {hovered ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <Button variant="contained" href="https://calendly.com/ronnie-aristil/30min" target="_blank" rel="noopener noreferrer" color="secondary" sx={{ mb: 1, bgcolor: colors.lucraGold, '&:hover': { bgcolor: colors.lucraGold } }}>Schedule a Deep Dive</Button>
                  <Button variant="contained" href="mailto:contact@omeca.com" color="primary" sx={{ mb: 1 }}>Email the Founder</Button>
                </Box>
              ) : (
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: '1rem', md: '1.2rem' }, }}>Book a Meeting</Typography>
              )}
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </SlideLayout>
  );
};

// --- Main App Component ---
// const slides = [NewSlide0_Title, NewSlide1_Problem, NewSlide3_Solution, NewSlide4_ArchitecturalMoat, NewSlide5_GTM, NewSlide6_Market, NewSlide7_BusinessModel, NewSlide8_WhyWeWin, NewSlide9_Traction, NewSlide10_Financials, NewSlide11_Team, NewSlide12_Ask, NewSlide13_Closing];
const slides = [
  Slide1_Opening,
  Slide2_ProblemSolution,
  Slide3_Solutions,
  Slide4_WhyLegacyFails,
  Slide5_GTM,
  Slide6_Beachhead,
  Slide7_PricingModel,
  Slide8_Moat,
  Slide9_Validation,
  Slide10_FinancialPath,
  Slide11_Team,
  Slide12_Ask,
  Slide13_Closing
];
export { slides };
// NewSlide2_BusinessCase
const PitchDeckApp = () => {
  const [slideIndex, setSlideIndex] = useState(0); const { toggleColorMode, mode } = useContext(ColorModeContext); const SlideComponent = slides[slideIndex]; const [anchorEl, setAnchorEl] = useState(null); const listButtonRef = useRef(null);
  const goToNext = () => setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1)); const goToPrev = () => setSlideIndex((prev) => Math.max(prev - 1, 0)); const goToSlide = (index) => { setSlideIndex(index); setAnchorEl(null); };
  const handleListClick = (event) => setAnchorEl(event.currentTarget); const handleListClose = () => setAnchorEl(null); const open = Boolean(anchorEl); const id = open ? 'slide-jump-popover' : undefined;
  useEffect(() => { const handleKeyDown = (event) => { if (event.key === 'ArrowRight') { goToNext(); } else if (event.key === 'ArrowLeft') { goToPrev(); } }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown); }, [slideIndex]);
  return (<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}><Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', gap: 1 }}><IconButton ref={listButtonRef} onClick={handleListClick} color="primary" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' } }}><ListIcon /></IconButton><Popover id={id} open={open} anchorEl={anchorEl} onClose={handleListClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} transformOrigin={{ vertical: 'top', horizontal: 'right', }} PaperProps={{ sx: { backgroundColor: colors[mode].card, border: `1px solid ${colors[mode].textDim}33`, maxHeight: '80vh', } }}><List dense sx={{ width: '300px' }}>{slideTitles.map((title, index) => (<ListItem key={index} onClick={() => goToSlide(index)} selected={slideIndex === index} sx={{ cursor: 'pointer', '&.Mui-selected': { backgroundColor: colors.accent + '22', borderLeft: `3px solid ${colors.accent}`, '& .MuiListItemText-primary': { fontWeight: 700, color: colors.accent } }, '&:hover': { backgroundColor: colors[mode].bgGradA + '55', } }}>
  <ListItemText primary={`${index + 1}. ${title}`} primaryTypographyProps={{ color: slideIndex === index ? colors.accent : colors[mode].textPrimary, fontWeight: slideIndex === index ? 700 : 400, fontSize: '0.9rem' }} />
  </ListItem>))}
  </List>
          {/* === NEW CODE: Download button inside the popover === */}
        <Divider sx={{ borderColor: `${colors[mode].textDim}33` }} />
        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => {
              exportDeckAsPDF(slides, ThemeWrapper, mode);
              handleListClose(); // Close popover after clicking
            }}
            sx={{ borderRadius: "8px" }} // Slightly adjust border radius to fit popover style
          >
            Download PDF
          </Button>
        </Box>
        {/* === END NEW CODE === */}

  </Popover><IconButton onClick={toggleColorMode} color="primary" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' } }}>{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton></Box>
  <Box id="pitch-deck-root">
  <AnimatePresence mode="wait"><Box key={slideIndex} sx={{ width: '100%', flexGrow: 1 }}><SlideComponent /></Box></AnimatePresence></Box>
  {/* <Box sx={{ position: 'fixed', bottom: { xs: 50, md: 70 }, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', zIndex: 10, '@media (max-width: 600px)': { flexDirection: 'row', justifyContent: 'space-around', bottom: 8, left: 0, right: 0, } }}><Button onClick={goToPrev} disabled={slideIndex === 0} startIcon={<ArrowBackIosIcon />} variant="contained" color="primary" sx={{ opacity: slideIndex === 0 ? 0.3 : 1, transition: 'opacity 0.3s', '@media (max-width: 600px)': { minWidth: 'auto', padding: '6px 8px', '& .MuiButton-startIcon': { margin: 0 }, '& .MuiButton-endIcon': { margin: 0 }, '& .MuiButton-label': { display: 'none' } } }}>Previous</Button><Button onClick={goToNext} disabled={slideIndex === slides.length - 1} endIcon={<ArrowForwardIosIcon />} variant="contained" color="primary" sx={{ opacity: slideIndex === slides.length - 1 ? 0.3 : 1, transition: 'opacity 0.3s', '@media (max-width: 600px)': { minWidth: 'auto', padding: '6px 8px', '& .MuiButton-startIcon': { margin: 0 }, '& .MuiButton-endIcon': { margin: 0 }, '& .MuiButton-label': { display: 'none' } } }}>Next</Button></Box> */}

{/* Navigation buttons */}
<Box
  sx={{
    position: "fixed",
    bottom: { xs: 50, md: 70 },
    left: 16,
    right: 16,
    display: "flex",
    justifyContent: "space-between",
    zIndex: 10,
    "@media (max-width: 600px)": {
      flexDirection: "row",
      justifyContent: "space-around",
      bottom: 8,
      left: 0,
      right: 0,
    },
  }}
>
  <Button
    onClick={goToPrev}
    disabled={slideIndex === 0}
    startIcon={<ArrowBackIosIcon />}
    variant="contained"
    color="primary"
    sx={{
      opacity: slideIndex === 0 ? 0.3 : 1,
      transition: "opacity 0.3s",
    }}
  >
    Previous
  </Button>
  {/* Download button (floating)
<Button
  variant="contained"
  color="secondary"
  startIcon={<PictureAsPdfIcon />}
  onClick={() => exportDeckAsPDF(slides, ThemeWrapper, mode)}
  sx={{
    position: "fixed",
    bottom: { xs: 12, md: 24 },
    right: { xs: 12, md: 24 },
    zIndex: 1500,
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  }}
>
  Download PDF
</Button> */}
  <Button
    onClick={goToNext}
    disabled={slideIndex === slides.length - 1}
    endIcon={<ArrowForwardIosIcon />}
    variant="contained"
    color="primary"
    sx={{
      opacity: slideIndex === slides.length - 1 ? 0.3 : 1,
      transition: "opacity 0.3s",
    }}
  >
    Next
  </Button>
</Box>
</Box>);
};

const App = () => (<ThemeWrapper><PitchDeckApp /></ThemeWrapper>);

export default App;