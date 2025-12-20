// // src/OmecaPricingPage.jsx
// import React, { useContext } from 'react';
// import { 
//   Container, 
//   Box, 
//   Grid, 
//   Typography, 
//   Button, 
//   Chip, 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText, 
//   Divider,
//   Stack
// } from '@mui/material';
// import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
// import { 
//   ArrowBackRounded, 
//   CheckCircle, 
//   ArrowForward, 
//   Security, 
//   GppGood,
//   Bolt,
//   AllInclusive,
//   Flare
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// 
// import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
// import { colors } from '../../../shared/layouts/theme/theme.js';
// 
// // --- BACKGROUNDS ---
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
// // --- CARD COMPONENT ---
// const PricingCard = ({ children, highlight = false, delay = 0 }) => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === 'dark';
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
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay, ease: "easeOut" }}
//       onMouseMove={handleMouseMove}
//       style={{ height: '100%', width: '100%', position: 'relative' }}
//     >
//       <Box
//         sx={{
//           height: '100%',
//           position: 'relative',
//           borderRadius: 4,
//           border: '1px solid',
//           borderColor: highlight 
//             ? colors.accent 
//             : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"),
//           bgcolor: isDark ? "rgba(15,15,20,0.8)" : "rgba(255,255,255,0.8)",
//           backdropFilter: "blur(20px)",
//           display: "flex",
//           flexDirection: "column",
//           transition: 'transform 0.2s',
//           boxShadow: highlight 
//             ? `0 20px 80px -20px ${colors.accent}20` 
//             : '0 4px 20px rgba(0,0,0,0.05)',
//           '&:hover': {
//              transform: 'translateY(-4px)',
//              borderColor: highlight ? colors.accent : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"),
//           }
//         }}
//       >
//         <motion.div
//           style={{
//             pointerEvents: "none",
//             position: "absolute", inset: 0, zIndex: 1,
//             background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${highlight ? colors.accent + '15' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)')}, transparent 80%)`,
//           }}
//         />
//         <Box sx={{ p: { xs: 3, md: 5 }, position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
//           {children}
//         </Box>
//       </Box>
//     </motion.div>
//   );
// };
// 
// // --- MAIN PAGE ---
// const OmecaPricingPage = ({ setPage }) => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === 'dark';
//   const palette = colors[mode];
//   const navigate = useNavigate();
// 
//   const strategies = [
//     {
//       label: "PHASE 1: VALIDATION",
//       title: "Connected Pilot",
//       price: "$25K–$50K",
//       period: "Fixed Engagement",
//       description: "Prove the value before you commit. A 90-day sprint to quantify ROI and expose control gaps.",
//       highlight: false,
//       tag: null,
//       icon: <Bolt fontSize="medium" />,
//       buttonText: "Book Pilot Strategy",
//       features: [
//         "Read-only ERP integration setup",
//         "Close visibility dashboard",
//         "Validation rule configuration",
//         "ROI and efficiency analysis",
//       ]
//     },
//     {
//       label: "PHASE 2: SCALE",
//       title: "Enterprise Control",
//       price: "$125K+",
//       period: "ACV / Year",
//       description: "Full autonomous scale. We replace manual reconciliation with a continuous, governing layer.",
//       highlight: true,
//       tag: "MOST COMMON PATH",
//       icon: <AllInclusive fontSize="medium" />,
//       buttonText: "Contact Sales",
//       features: [
//         "Real-time validation & exception queue",
//         "Immutable audit ledger (Governance)",
//         "Multi-entity & policy engine",
//         "Dedicated success & compliance partner",
//       ]
//     }
//   ];
// 
//   return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       bgcolor: palette.bgTop, 
//       pt: { xs: 4, md: 5 }, 
//       pb: 5,
//       position: 'relative',
//       overflowX: 'hidden'
//     }}>
//       <NoiseOverlay />
//       <GridBackground isDark={isDark} />
// 
//       {/* ⚡ KEY FIX: Container Width and Padding for all screens */}
//       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 6, lg: 10 } }}>
//         
//         {/* BACK BUTTON */}
//         <Box sx={{ mb: 6 }}>
//           <Button
//             startIcon={<ArrowBackRounded />}
//             onClick={() => navigate('/')}
//             sx={{
//               color: palette.textDim,
//               fontWeight: 600,
//               textTransform: 'none',
//               borderRadius: 50,
//               px: 0,
//               '&:hover': { bgcolor: 'transparent', color: palette.textPrimary },
//             }}
//           >
//             Back to Home
//           </Button>
//         </Box>
// 
//         {/* ⚡ KEY FIX: Centered Hero Section */}
//         <Box sx={{ 
//             textAlign: 'center', 
//             mb: 10, 
//             mx: 'auto', // Centers the box itself
//             maxWidth: 800 
//         }}>
//           <Chip 
//             label="PRICING STRUCTURE" 
//             size="small"
//             sx={{ 
//               mb: 2, fontWeight: 700, fontSize: "0.65rem", letterSpacing: 1,
//               bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
//               color: palette.textDim, 
//             }} 
//           />
//           <Typography variant="h2" fontWeight={800} sx={{ 
//             fontSize: { xs: "2.5rem", md: "3.5rem" }, 
//             letterSpacing: "-0.03em",
//             lineHeight: 1.1,
//             mb: 2,
//             color: palette.textPrimary
//           }}>
//             Invest in <span style={{ color: colors.accent }}>Control.</span>
//           </Typography>
//           <Typography variant="body1" sx={{ color: palette.textDim, fontSize: '1.1rem', lineHeight: 1.6 }}>
//             From proof-of-value to enterprise scale. Prove the control gap with a Pilot before committing to the Enterprise cure.
//           </Typography>
//         </Box>
// 
//         {/* ⚡ KEY FIX: Centered Grid + Correct Widths */}
//         <Container maxWidth="lg" disableGutters>
//             <Grid 
//                 container 
//                 spacing={4} 
//                 alignItems="stretch" 
//                 justifyContent="center" // Keeps cards centered on huge screens
//             >
//             {strategies.map((tier, index) => (
//                 <Grid item xs={12} md={6} key={index}> {/* md=6 means 50/50 split on desktop */}
//                 <PricingCard highlight={tier.highlight} delay={index * 0.1}>
//                     
//                     {/* Header */}
//                     <Box sx={{ minHeight: 180 }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//                             <Typography variant="overline" sx={{ fontWeight: 700, color: tier.highlight ? colors.accent : palette.textDim, letterSpacing: 1 }}>
//                                 {tier.label}
//                             </Typography>
//                             {tier.tag && (
//                                 <Chip label={tier.tag} size="small" sx={{ bgcolor: colors.accent, color: '#000', fontWeight: 800, height: 20, fontSize: '0.6rem' }} />
//                             )}
//                         </Box>
//                         <Typography variant="h4" fontWeight={700} sx={{ mb: 1, color: palette.textPrimary }}>
//                             {tier.title}
//                         </Typography>
//                         <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 2 }}>
//                             <Typography variant="h3" fontWeight={800} sx={{ color: palette.textPrimary, letterSpacing: '-1px' }}>
//                                 {tier.price}
//                             </Typography>
//                             <Typography variant="body2" fontWeight={600} color={palette.textDim}>
//                                 / {tier.period}
//                             </Typography>
//                         </Stack>
//                     </Box>
// 
//                     {/* Description */}
//                     <Box sx={{ minHeight: 80, mb: 2 }}>
//                         <Typography variant="body1" sx={{ color: palette.textDim, lineHeight: 1.6 }}>
//                             {tier.description}
//                         </Typography>
//                     </Box>
// 
//                     <Divider sx={{ mb: 3, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
// 
//                     {/* Features */}
//                     <Box sx={{ flexGrow: 1, mb: 4 }}>
//                         <List disablePadding>
//                             {tier.features.map((feature, i) => (
//                             <ListItem key={i} disableGutters sx={{ py: 0.75, alignItems: 'flex-start' }}>
//                                 <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
//                                 <CheckCircle sx={{ fontSize: 18, color: tier.highlight ? colors.accent : colors.successGreen }} />
//                                 </ListItemIcon>
//                                 <ListItemText 
//                                 primary={feature} 
//                                 primaryTypographyProps={{ variant: 'body2', fontWeight: 500, color: palette.textPrimary }} 
//                                 />
//                             </ListItem>
//                             ))}
//                         </List>
//                     </Box>
// 
//                     {/* Button */}
//                     <Button
//                         fullWidth
//                         size="large"
//                         endIcon={<ArrowForward />}
//                         onClick={() => setPage('contact')}
//                         sx={{
//                             py: 1.8,
//                             borderRadius: 3,
//                             textTransform: 'none',
//                             fontWeight: 700,
//                             fontSize: '1rem',
//                             ...(tier.highlight ? {
//                             bgcolor: colors.accent,
//                             color: '#000',
//                             '&:hover': { bgcolor: '#fff' },
//                             } : {
//                             bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
//                             color: palette.textPrimary,
//                             border: '1px solid',
//                             borderColor: 'transparent',
//                             '&:hover': { borderColor: colors.accent, bgcolor: 'transparent' },
//                             })
//                         }}
//                     >
//                         {tier.buttonText}
//                     </Button>
// 
//                 </PricingCard>
//                 </Grid>
//             ))}
//             </Grid>
//         </Container>
// 
//         {/* Footer Trust */}
//         <Box sx={{ mt: 10, pt: 6, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
//            <Grid container spacing={4} justifyContent="center">
//              {[
//                  { icon: <GppGood fontSize="small" />, text: "SOC 2 TYPE II READY" },
//                  { icon: <Security fontSize="small" />, text: "ZERO TRUST ARCHITECTURE" },
//                  { icon: <Flare fontSize="small" />, text: "AUDIT-READY 24/7" }
//              ].map((item, i) => (
//                  <Grid item key={i}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: palette.textDim, opacity: 0.7 }}>
//                        {item.icon}
//                        <Typography variant="caption" fontWeight={700} sx={{ letterSpacing: 0.5 }}>
//                            {item.text}
//                        </Typography>
//                     </Box>
//                  </Grid>
//              ))}
//            </Grid>
//         </Box>
// 
//       </Container>
//     </Box>
//   );
// };
// 
// export default OmecaPricingPage;

import React, { useContext, useState } from 'react';
import { 
  Container, 
  Box, 
  Grid, 
  Typography, 
  Button, 
  Chip, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Stack,
  Link,
  IconButton
} from '@mui/material';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  ArrowBackRounded, 
  CheckCircle, 
  ArrowForward, 
  Security, 
  GppGood,
  Bolt,
  AllInclusive,
  Flare,
  Close // Added for the dismiss action
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
import { colors } from '../../../shared/layouts/theme/theme.js';

// --- EXECUTIVE BACKGROUNDS ---
const NoiseOverlay = () => (
  <Box
    sx={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0, opacity: 0.02,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const GridBackground = ({ isDark }) => (
  <Box
    sx={{
      position: "absolute", top: 0, left: 0, right: 0, height: "100%",
      overflow: "hidden", zIndex: 0,
      maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
    }}
  >
    <Box
      sx={{
        width: "100%", height: "100%",
        backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)'} 1px, transparent 1px),
        linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)'} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }}
    />
  </Box>
);

// --- PREMIUM PRICING CARD ---
const PricingCard = ({ children, highlight = false, delay = 0 }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      style={{ height: '100%', width: '100%', position: 'relative' }}
    >
      <Box
        sx={{
          height: '100%',
          position: 'relative',
          borderRadius: 6,
          border: '1px solid',
          borderColor: highlight 
            ? `${colors.accent}40`
            : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"),
          bgcolor: isDark ? "rgba(15,18,25,0.6)" : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column",
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: highlight 
                ? `0 24px 60px -12px ${colors.accent}25`
                : `0 24px 60px -12px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`,
            borderColor: highlight ? colors.accent : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"),
          }
        }}
      >
        <motion.div
          style={{
            pointerEvents: "none",
            position: "absolute", inset: 0, zIndex: 1,
            background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${highlight ? colors.accent + '10' : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)')}, transparent 80%)`,
          }}
        />
        <Box sx={{ p: { xs: 4, md: 5 }, position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Box>
    </motion.div>
  );
};

// --- MAIN PAGE ---
const OmecaPricingPage = ({ setPage }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  const palette = colors[mode];
  const navigate = useNavigate();

  const [showContact, setShowContact] = useState({});

  const toggleContact = (index) => {
    setShowContact(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const strategies = [
    {
      label: "PHASE 01",
      title: "Connected Pilot",
      // Uncommenting these in the future will automatically render them correctly
      // price: "$25K", 
      // period: "Fixed Engagement",
      description: "A focused implementation that integrates Omeca with your core workflows to demonstrate continuous control and ROI.",
      highlight: false,
      tag: null,
      icon: <Flare />,
      buttonText: "Start Pilot Strategy",
      features: [
        "Live connection to finance data",
        "Integrity checks on core workflows",
        "Continuous accounting visibility",
        "Operational ROI assessment",
      ]
    },
    {
      label: "PHASE 02",
      title: "Enterprise Control",
      // price: "125K+",
      // period: "Annual Platform",
      description: "Omeca establishes a permanent financial control layer over your entire organization, keeping ledgers accurate by design.",
      highlight: true,
      tag: "Most Selected",
      icon: <AllInclusive />,
      buttonText: "Contact Sales",
      features: [
        "Real-time validation across all workflows",
        "Autonomous continuous close",
        "Verifiable audit trail for every event",
        "Full policy engine & control models",
        "Dedicated Solutions Architect",
      ]
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: palette.bgTop, 
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <NoiseOverlay />
      <GridBackground isDark={isDark} />

{/* NAV HEADER - FIXED: Added relative positioning and zIndex to sit ABOVE background */}
      <Container maxWidth="xl" sx={{ pt: 4, px: { xs: 3, md: 6 }, position: 'relative', zIndex: 10 }}>
          <Button
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate('/')}
            sx={{
              color: palette.textDim,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { bgcolor: 'transparent', color: palette.textPrimary },
            }}
          >
            Back to Home
          </Button>
      </Container>

      {/* MAIN CONTENT - ADJUSTMENT: Added negative top margin to lift content ~5% */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 }, mt: { xs: -2, md: -4 } }}>
        
        {/* HERO HEADER */}
        <Box sx={{ textAlign: 'center', mb: 10, mx: 'auto', maxWidth: 800 }}>
          <Chip 
            label="Pricing Structure" 
            size="small"
            sx={{ 
              mb: 3, fontWeight: 700, fontSize: "0.7rem", letterSpacing: 1.5,
              bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
              color: palette.textDim, 
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }} 
          />
          <Typography variant="h2" fontWeight={800} sx={{ 
            fontSize: { xs: "2.5rem", md: "4rem" }, 
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            mb: 3,
            color: palette.textPrimary
          }}>
            Invest in <span style={{ color: colors.accent }}>meaningful control.</span>
          </Typography>
          <Typography variant="body1" sx={{ color: palette.textDim, fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '60ch', mx: 'auto' }}>
            Begin with a connected pilot to prove value, then expand into a unified control layer that secures your financial truth.
          </Typography>
        </Box>

        {/* CARDS GRID */}
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
            {strategies.map((tier, index) => (
              <Grid item xs={12} md={6} lg={5} key={index}>
                <PricingCard highlight={tier.highlight} delay={index * 0.15}>
                  
                  {/* CARD HEADER */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: tier.highlight ? colors.accent : palette.textDim }}>
                            {React.cloneElement(tier.icon, { fontSize: "small" })}
                            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1.2 }}>
                                {tier.label}
                            </Typography>
                        </Box>
                        {tier.tag && (
                            <Chip label={tier.tag} size="small" sx={{ bgcolor: colors.accent, color: '#000', fontWeight: 800, fontSize: '0.65rem', height: 22 }} />
                        )}
                    </Box>
                    
                    <Typography variant="h4" fontWeight={800} sx={{ mb: 1, color: palette.textPrimary }}>
                      {tier.title}
                    </Typography>
                    
                    {/* LOGIC RESTORED: Renders Price/Period only if they exist in data */}
                    {(tier.price || tier.period) && (
                        <Stack direction="row" alignItems="baseline" spacing={1}>
                            {tier.price && (
                                <Typography variant="h3" fontWeight={800} sx={{ color: palette.textPrimary }}>
                                    {tier.price}
                                </Typography>
                            )}
                            {tier.period && (
                                <Typography variant="subtitle1" fontWeight={600} sx={{ color: tier.highlight ? colors.accent : palette.textDim }}>
                                    {tier.period}
                                </Typography>
                            )}
                        </Stack>
                    )}
                  </Box>

                  {/* DESCRIPTION */}
                  <Typography variant="body1" sx={{ color: palette.textDim, lineHeight: 1.7, minHeight: 80, mb: 4 }}>
                      {tier.description}
                  </Typography>

                  <Divider sx={{ mb: 4, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />

                  {/* FEATURES LIST */}
                  <Box sx={{ flexGrow: 1, mb: 5 }}>
                    <List disablePadding>
                      {tier.features.map((feature, i) => (
                        <ListItem key={i} disableGutters sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle sx={{ fontSize: 20, color: tier.highlight ? colors.accent : colors.successGreen }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 500, color: palette.textPrimary, fontSize: '0.95rem' }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* ACTIONS - NOW WITH TOGGLE / CLOSE LOGIC */}
                  <Box>
                      {!showContact[index] ? (
                        <Button
                            fullWidth
                            size="large"
                            endIcon={<ArrowForward />}
                            onClick={() => toggleContact(index)}
                            sx={{
                                py: 1.8,
                                borderRadius: 50,
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '1rem',
                                boxShadow: 'none',
                                transition: 'all 0.2s ease',
                                ...(tier.highlight ? {
                                    bgcolor: colors.accent,
                                    color: '#000',
                                    '&:hover': { bgcolor: '#fff', transform: 'scale(1.02)' },
                                } : {
                                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    color: palette.textPrimary,
                                    border: '1px solid transparent',
                                    '&:hover': { borderColor: colors.accent, bgcolor: 'transparent', color: colors.accent },
                                }),
                            }}
                        >
                        {tier.buttonText}
                        </Button>
                      ) : (
                        // REVEALED STATE with CLOSE BUTTON
                        <Box 
                            component={motion.div}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            sx={{ 
                                position: 'relative',
                                textAlign: 'center', p: 3, 
                                borderRadius: 4, 
                                bgcolor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.04)',
                                border: `1px dashed ${colors.accent}40`
                            }}
                        >
                            {/* CLOSE BUTTON */}
                            <IconButton 
                                size="small" 
                                onClick={() => toggleContact(index)}
                                sx={{ position: 'absolute', top: 8, right: 8, color: palette.textDim }}
                            >
                                <Close fontSize="small" />
                            </IconButton>

                            <Typography variant="body2" sx={{ color: palette.textDim, mb: 1 }}>
                                Reach our team directly:
                            </Typography>
                            <Link href="mailto:aerp@omeca.co" underline="none" sx={{ display: 'block', color: colors.accent, fontWeight: 700, fontSize: '1.2rem', mb: 0.5, '&:hover': { textDecoration: 'underline' } }}>
                                aerp@omeca.co
                            </Link>
                        </Box>
                      )}
                  </Box>

                </PricingCard>
              </Grid>
            ))}
        </Grid>

        {/* TRUST SIGNALS FOOTER */}
        <Box sx={{ mt: 12, pt: 6, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
          <Grid container spacing={6} justifyContent="center">
            {[
              { icon: <GppGood />, text: "SOC2 Type II Ready Architecture" },
              { icon: <Security />, text: "Enterprise-Grade Encryption" },
              { icon: <Bolt />, text: "Live Continuous Availability" }
            ].map((item, i) => (
              <Grid item key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: palette.textDim, opacity: 0.8 }}>
                  {React.cloneElement(item.icon, { sx: { color: colors.accent } })}
                  <Typography variant="subtitle2" fontWeight={600} sx={{ letterSpacing: 0.5 }}>
                    {item.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
};

export default OmecaPricingPage;