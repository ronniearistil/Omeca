// import React, { useContext } from 'react';
// import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
// // import { ColorModeContext } from '../theme/ThemeContext';
// // import { colors } from '../theme/theme';
// import { ColorModeContext } from '../components/theme/ThemeContext.js'; 
// // import { colors } from '../components/theme/theme.js'; 
// import { colors } from "../../../shared/layouts/theme/theme.js";
// 
// 
// const BackButton = ({ setPage, currentColors }) => (
//   <Button
//     startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
//     onClick={() => setPage('home')}
//     sx={{
//       mt: 4,
//       mb: 2,
//       color: currentColors.textDim,
//       textTransform: 'none',
//       '&:hover': { color: colors.accent },
//     }}
//   >
//     Back to Home
//   </Button>
// );
// 
// const PricingPage = ({ setPage }) => {
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
// 
//   const tiers = [
//     {
//       name: 'Starter',
//       price: 'Free',
//       desc: 'For prototyping and early-stage projects. Includes core Ledger API and documentation access.',
//       features: ['Up to 1M events/month', 'Standard reconciliation', 'Community support'],
//     },
//     // {
//     //   name: 'Growth',
//     //   price: '$499/mo',
//     //   desc: 'For scaling teams that need robust tracking and basic alerts.',
//     //   features: ['Up to 50M events/month', 'Predictive Margin Alerts', 'Priority support'],
//     // },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       desc: 'Full suite for large organizations with complex compliance needs.',
//       features: ['Unlimited volume', 'Full SOC 2 compliance', 'Dedicated Account Manager', 'Custom pricing models'],
//     },
//   ];
// 
//   return (
//     <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <BackButton setPage={setPage} currentColors={currentColors} />
//         <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//           Transparent Pricing, Maximum Lucra
//         </Typography>
//         <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//           Pay only for the scale you need, and nothing for the headache.
//         </Typography>
//       </motion.div>
// 
//       <Grid container spacing={4} alignItems="stretch">
//         {tiers.map((tier, index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <Paper
//               sx={{
//                 p: 4,
//                 bgcolor: currentColors.card,
//                 height: '100%',
//                 border:
//                   tier.name === 'Enterprise'
//                     ? `3px solid ${colors.accent}`
//                     : `1px solid ${currentColors.textDim}33`,
//               }}
//             >
//               <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>
//                 {tier.name}
//               </Typography>
//               <Typography variant="h4" fontWeight={900} color={colors.lucraGold} sx={{ my: 2 }}>
//                 {tier.price}
//               </Typography>
//               <Typography variant="body1" color={currentColors.textDim} sx={{ minHeight: 60 }}>
//                 {tier.desc}
//               </Typography>
// 
//               <Box component="ul" sx={{ mt: 3, p: 0, listStyle: 'none' }}>
//                 {tier.features.map((feature, fIndex) => (
//                   <Typography
//                     key={fIndex}
//                     variant="body2"
//                     color={currentColors.textPrimary}
//                     sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
//                   >
//                     <CheckCircleOutlineRounded sx={{ color: colors.successGreen, fontSize: 16, mr: 1 }} /> {feature}
//                   </Typography>
//                 ))}
//               </Box>
// 
//               {tier.name === 'Starter' && (
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{ mt: 4, bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentHover } }}
//                   onClick={() => setPage('signup')}
//                 >
//                   Get Started
//                 </Button>
//               )}
// 
//               {tier.name === 'Enterprise' && (
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{ mt: 4, bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentHover } }}
//                   component="a"
//                   href="mailto:luca@melucra.com"
//                 >
//                   Contact Us
//                 </Button>
//               )}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };
// 
// export default PricingPage;

import React, { useContext } from 'react';
import { 
  Container, 
  Box, 
  Grid, 
  Typography, 
  Button, 
  Paper, 
  Chip, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  ArrowBackRounded, 
  CheckCircle, 
  ArrowForward, 
  Security, 
  GppGood,
  Bolt,
  AllInclusive,
  Flare,
  AutoGraphRounded
} from '@mui/icons-material';

import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
import { colors } from '../../../shared/layouts/theme/theme.js';

// --- MOTION CONFIG ---
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVar = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 40, damping: 20 } 
  }
};

const OmecaPricingPage = ({ setPage }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  const palette = colors[mode];

  // --- STRATEGY DATA ---
  const strategies = [
    {
      label: "PHASE 1: VALIDATION",
      title: "Connected Finance Pilot",
      price: "$25K–$50K",
      period: "Fixed Engagement",
      description: "Prove the value before you commit. A 90-day sprint to quantify ROI and expose control gaps through continuous visibility.",
      highlight: false,
      icon: <Bolt fontSize="large" />,
      buttonText: "Book Pilot Strategy",
      buttonAction: () => setPage('contact'),
      features: [
        "Read-only ERP integration setup",
        "Close visibility dashboard",
        "Validation rule configuration",
        "ROI and efficiency analysis",
      ]
    },
    {
      label: "PHASE 2: SCALE",
      title: "Enterprise Control Layer",
      price: "$125K+",
      period: "ACV / Year",
      description: "Full autonomous scale. We replace manual reconciliation with a continuous, governing layer across your entire financial stack.",
      highlight: true,
      icon: <AllInclusive fontSize="large" />,
      buttonText: "Contact Sales",
      buttonAction: () => setPage('contact'),
      features: [
        "Real-time validation & exception queue",
        "Immutable audit ledger (Governance)",
        "Multi-entity & policy engine",
        "Dedicated success & compliance partner",
      ]
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: palette.bgTop, 
      pt: { xs: 4, md: 8 }, 
      pb: 12,
      position: 'relative',
      overflowX: 'hidden' // Critical Fix: Allows vertical scroll, prevents horizontal overflow
    }}>
      
      {/* --- BACKGROUND GLOW --- */}
      <Box sx={{ 
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', 
        width: '140%', height: '800px', 
        background: isDark 
          ? `radial-gradient(circle at 50% 0%, ${colors.accent}08 0%, transparent 60%)`
          : `radial-gradient(circle at 50% 0%, ${colors.accent}05 0%, transparent 60%)`,
        zIndex: 0, pointerEvents: 'none'
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 8, xl: 12 } }}>
        
        {/* --- NAV --- */}
        <Box sx={{ mb: 8 }}>
          <Button
            startIcon={<ArrowBackRounded />}
            onClick={() => setPage('home')}
            sx={{
              color: palette.textDim,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.9rem',
              '&:hover': { color: palette.textPrimary, bgcolor: 'transparent', transform: 'translateX(-5px)' },
              transition: 'all 0.2s'
            }}
          >
            Back to Home
          </Button>
        </Box>

        <motion.div variants={containerVar} initial="hidden" animate="show">
          
          {/* --- HERO SECTION --- */}
          <Box sx={{ textAlign: 'center', mb: 10, maxWidth: 800, mx: 'auto' }}>
            <Chip 
              label="PRICING STRUCTURE" 
              sx={{ 
                mb: 3, fontWeight: 800, fontSize: "0.7rem", letterSpacing: 1.5,
                bgcolor: `${colors.lucraGold}15`, color: colors.lucraGold, 
                border: `1px solid ${colors.lucraGold}30`
              }} 
            />
            <Typography variant="h2" fontWeight={900} sx={{ 
              color: palette.textPrimary, 
              fontSize: { xs: "2.25rem", md: "3.5rem" }, 
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              mb: 2
            }}>
              Invest in Control.
            </Typography>
            <Typography variant="h5" sx={{ 
              color: palette.textDim, 
              fontWeight: 400, 
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.2rem" }
            }}>
              From proof-of-value to enterprise scale. Prove the control gap with a Pilot before committing to the Enterprise cure.
            </Typography>
          </Box>

          {/* --- PRICING GRID --- */}
          <Container maxWidth="lg" disableGutters>
            <Grid container spacing={4} alignItems="stretch">
              {strategies.map((tier, index) => (
                <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
                  <motion.div variants={cardVar} style={{ width: '100%', display: 'flex' }}>
                    
                    <Paper
                      elevation={0}
                      sx={{
                        flex: 1,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        // Note: "justifyContent: space-between" is handled by flexGrow in content box below
                        p: { xs: 4, md: 6 },
                        borderRadius: 6,
                        
                        // --- GLASSMORPHISM & BORDERS ---
                        background: isDark 
                          ? (tier.highlight ? `linear-gradient(145deg, ${colors.accent}08 0%, ${palette.card} 100%)` : palette.card)
                          : palette.card,
                        
                        border: tier.highlight 
                          ? `1px solid ${colors.accent}50` 
                          : `1px solid ${palette.textDim}15`,

                        boxShadow: tier.highlight 
                           ? `0 20px 80px -20px ${colors.accent}15` 
                           : 'none',

                        backdropFilter: "blur(12px)",
                        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: tier.highlight 
                             ? `0 30px 100px -20px ${colors.accent}25` 
                             : `0 20px 60px -20px rgba(0,0,0,0.1)`,
                        }
                      }}
                    >
                      {/* --- TOP CONTENT WRAPPER (FlexGrow pushes button down) --- */}
                      <Box sx={{ flexGrow: 1 }}>
                        
                        {/* Header: Label & Icon */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                           <Typography variant="caption" sx={{ 
                             fontFamily: "monospace", fontWeight: 700, 
                             color: tier.highlight ? colors.accent : palette.textDim, 
                             letterSpacing: 2 
                           }}>
                             {tier.label}
                           </Typography>
                           <Box sx={{ color: tier.highlight ? colors.accent : palette.textDim }}>
                             {tier.icon}
                           </Box>
                        </Box>

                        {/* Title */}
                        <Typography variant="h4" fontWeight={800} sx={{ color: palette.textPrimary, mb: 1 }}>
                          {tier.title}
                        </Typography>

                        {/* Price */}
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
                          <Typography variant="h3" fontWeight={900} sx={{ 
                            color: tier.highlight ? colors.accent : colors.lucraGold, 
                            letterSpacing: '-1px'
                          }}>
                            {tier.price}
                          </Typography>
                          <Typography variant="caption" fontWeight={600} color={palette.textDim}>
                            / {tier.period}
                          </Typography>
                        </Box>

                        {/* Description */}
                        <Typography variant="body1" sx={{ 
                          color: palette.textDim, 
                          mb: 5, 
                          lineHeight: 1.7, 
                          fontSize: "1.05rem"
                        }}>
                          {tier.description}
                        </Typography>

                        <Divider sx={{ mb: 4, borderColor: `${palette.textDim}15` }} />

                        {/* Features */}
                        <List disablePadding sx={{ mb: 6 }}>
                          {tier.features.map((feature, i) => (
                            <ListItem key={i} disableGutters sx={{ py: 1, alignItems: 'flex-start' }}>
                              <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                                <CheckCircle sx={{ 
                                  fontSize: 18, 
                                  color: tier.highlight ? colors.accent : colors.successGreen 
                                }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={feature} 
                                primaryTypographyProps={{ 
                                  variant: 'body2', 
                                  fontWeight: 500, 
                                  color: palette.textPrimary,
                                  fontSize: '0.95rem'
                                }} 
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>

                      {/* --- BOTTOM SECTION: CTA --- */}
                      <Button
                        variant={tier.highlight ? "contained" : "outlined"}
                        fullWidth
                        size="large"
                        endIcon={<ArrowForward />}
                        onClick={tier.buttonAction}
                        sx={{
                          py: 2,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 800,
                          fontSize: '1rem',
                          ...(tier.highlight ? {
                            bgcolor: colors.accent,
                            color: '#000',
                            '&:hover': { bgcolor: colors.accentHover },
                          } : {
                            borderColor: palette.textDim,
                            color: palette.textPrimary,
                            borderWidth: '1.5px',
                            '&:hover': { 
                                borderColor: palette.textPrimary, 
                                borderWidth: '1.5px',
                                bgcolor: palette.textDim + '05' 
                            },
                          })
                        }}
                      >
                        {tier.buttonText}
                      </Button>

                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* --- TRUST FOOTER --- */}
          <Box sx={{ mt: 12, textAlign: 'center', borderTop: `1px solid ${palette.textDim}10`, pt: 6, opacity: 0.8 }}>
            <Grid container spacing={6} justifyContent="center">
              <Grid item>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: palette.textDim }}>
                    <GppGood fontSize="small" />
                    <Typography variant="caption" fontWeight={700} sx={{ letterSpacing: 1 }}>SOC 2 TYPE II READY</Typography>
                 </Box>
              </Grid>
              <Grid item>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: palette.textDim }}>
                    <Security fontSize="small" />
                    <Typography variant="caption" fontWeight={700} sx={{ letterSpacing: 1 }}>ZERO TRUST ARCHITECTURE</Typography>
                 </Box>
              </Grid>
              <Grid item>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: palette.textDim }}>
                    <Flare fontSize="small" />
                    <Typography variant="caption" fontWeight={700} sx={{ letterSpacing: 1 }}>AUDIT-READY 24/7</Typography>
                 </Box>
              </Grid>
            </Grid>
          </Box>

        </motion.div>
      </Container>
    </Box>
  );
};

export default OmecaPricingPage;