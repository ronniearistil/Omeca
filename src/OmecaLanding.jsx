// import React, { useState, useMemo, useContext, useRef } from 'react';
// import {
//     AppBar, Toolbar, Container, Box, Grid, Paper,
//     Typography, TextField, Button, IconButton, Link,
//     FormControl, InputLabel, Select, MenuItem, FormHelperText
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// import TrendingUp from '@mui/icons-material/TrendingUp';
// import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
// import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
// import SyncAltRounded from '@mui/icons-material/SyncAltRounded';
// import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
// import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
// import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
// import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
// import CancelRounded from '@mui/icons-material/CancelRounded';
// import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
// import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
// 
// import OmecaGovernanceDashboardPage from "./omeca-governance/components/pages/OmecaGovernanceDashboardPage.jsx";
// import OmecaGovernanceDashboardPreview from "./omeca-governance/components/pages/OmecaGovernanceDashboardPreview.jsx";
// import OmecaGovernanceWaitlistDialog from "./omeca-governance/components/OmecaGovernanceWaitlistDialog.jsx";
// 
// // =================================================================
// // 1. THEME DEFINITIONS, CONTEXT, AND UTILITIES
// // =================================================================
// 
// const colors = {
//     // Shared colors
//     accent: '#00E5BE',
//     accentHover: '#00caa8',
//     lucraGold: '#D4AF37',
//     errorRed: '#FF4136',
//     successGreen: '#2ECC40',
//     logoDark: '#1A334A',
// 
//     // Dark Mode specific colors (Softer Slate Blue)
//     dark: {
//         bgTop: '#1A2433',
//         bgGradA: '#2A344A',
//         bgGradB: '#111827',
//         card: '#243040',
//         textDim: 'rgba(255,255,255,0.78)',
//         textPrimary: '#F0F3F7',
//     },
// 
//     // Light Mode specific colors (Softer Light Gray/Mint)
//     light: {
//         bgTop: '#F8F9FA',
//         bgGradA: '#E6F4F1',
//         bgGradB: '#D8E8E6',
//         card: '#FFFFFF',
//         textDim: 'rgba(0,0,0,0.65)',
//         textPrimary: '#1F2937',
//     }
// };
// 
// const getDesignTokens = (mode) => ({
//     palette: {
//         mode,
//         primary: { main: colors.accent },
//         secondary: { main: colors.lucraGold },
//         error: { main: colors.errorRed },
//         success: { main: colors.successGreen },
//         background: {
//             default: colors[mode].bgTop,
//             paper: colors[mode].card,
//         },
//         text: {
//             primary: colors[mode].textPrimary,
//             secondary: colors[mode].textDim,
//         },
//     },
//     typography: { fontFamily: 'Roboto, sans-serif' },
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 contained: {
//                     color: mode === 'dark' ? colors.dark.bgTop : colors.light.bgTop,
//                 },
//             },
//         },
//     },
// });
// 
// const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'dark' });
// // =================================================================
// // 2. UI AND LAYOUT COMPONENTS
// // =================================================================
// 
// // --- Logo Component (Reverting to image tag for local asset path) ---
// // const MelucraLogoComponent = ({ size = 36 }) => (
// //     <img
// //         src="/assets/omeca-logo.png"
// //         alt="Omeca Logo"
// //         width={size}
// //         height={size}
// //         style={{ display: 'block' }}
// //     />
// // );
// const OmecaLogoComponent = ({ size = 36 }) => (
//     <img
//         src="/assets/omeca-logo.png"
//         alt="OMECA Logo"
//         width={size}
//         height={size}
//         style={{ display: 'block' }}
//     />
// );
// 
// 
// // --- Theme Toggle Button ---
// const ThemeToggleButton = () => {
//     const { mode, toggleColorMode } = useContext(ColorModeContext);
// 
//     return (
//         <IconButton onClick={toggleColorMode} color="inherit" sx={{
//             color: mode === 'dark' ? '#FFFFFF' : '#000000',
//             transition: 'color 0.3s'
//         }}>
//             {mode === 'dark' ? <WbSunnyRoundedIcon /> : <NightsStayRoundedIcon />}
//         </IconButton>
//     );
// };
// 
// // --- Dashboard Preview Helpers (Unchanged) ---
// const SimpleGraphLine = ({ color, points }) => (
//     <svg viewBox="0 0 100 20" style={{ width: '100%', height: '50px' }}>
//         <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
//     </svg>
// );
// 
// // --- Dashboard Preview ---
// const DashboardPreview = () => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const statItems = [
//         { label: 'Validated Events', value: '45.2M', trend: '+12%', color: colors.accent },
//         { label: 'Forecast Margin', value: '$1.4M', trend: '+18%', color: colors.accent },
//         { label: 'Reconciliation Lag', value: '3.5s', trend: '-0.2s', color: colors.lucraGold },
//         { label: 'Profit Alert Count', value: '7', trend: 'Critical', color: colors.lucraGold },
//     ];
// 
//     return (
//         <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.1 }}>
//             <Paper elevation={0} sx={{
//                 bgcolor: currentColors.card, p: 3, borderRadius: 3, border: `1px solid ${colors.accent}44`, maxWidth: '1200px', mx: 'auto',
//                 boxShadow: mode === 'dark' ? `0 0 30px rgba(0, 0, 0, 0.4), 0 0 10px ${colors.accent}22` : '0 4px 20px rgba(0,0,0,0.1)',
//                 color: currentColors.textPrimary,
//             }}>
//                 {/* FIX: Updated Dashboard Header for alignment */}
//                 <Box sx={{ borderBottom: `1px solid ${currentColors.textDim}22`, mb: 3 }}>
//                     <Typography variant="h6" fontWeight={700} sx={{ color: colors.accent, mb: 1 }}>
//                         Explainability Core: Live Snapshot
//                     </Typography>
//                 </Box>
//                 
//                 <Grid container spacing={3}>
//                     {statItems.map((item, index) => (
//                         <Grid item xs={6} md={3} key={index}>
//                             <Box sx={{ pr: index < 3 ? 3 : 0, borderRight: index < 3 && mode === 'dark' ? `1px solid ${colors.dark.textDim}22` : 'none' }}>
//                                 <Typography variant="body2" color={currentColors.textDim}>{item.label}</Typography>
//                                 <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, color: item.color }}>{item.value}</Typography>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
//                                     <TrendingUp sx={{ fontSize: 16, color: item.color }} />
//                                     <Typography variant="caption" sx={{ ml: 0.5, color: item.color, fontWeight: 500 }}>{item.trend}</Typography>
//                                 </Box>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${currentColors.textDim}22` }}>
//                     <Typography variant="h6" fontWeight={500} gutterBottom>Usage vs. Revenue Trend</Typography>
//                     <SimpleGraphLine color={colors.lucraGold} points="0,18 10,12 20,8 30,10 40,6 50,4 60,6 70,8 80,10 90,12 100,15" />
//                     <SimpleGraphLine color={colors.accent} points="0,15 10,10 20,13 30,16 40,14 50,11 60,9 70,12 80,14 90,17 100,19" />
//                 </Box>
//             </Paper>
//         </motion.div>
//     );
// };
// 
// 
// // --- App Footer (Receives setPage prop) ---
// const AppFooter = ({ setPage }) => { // FIX: Ensure setPage is destructured
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     // All links requested are defined here, with their correct 'target' keys
//     const footerLinks = [
//         {
//             title: 'Products',
//             links: [
//                 { name: 'Ledger API', target: 'ledger' },
//                 { name: 'Reconciliation', target: 'reconciliation' },
//                 { name: 'Margin Alerts', target: 'alerts' },
//                 { name: 'Pricing', target: 'pricing' }
//             ]
//         },
//         {
//             title: 'Company',
//             links: [
//                 { name: 'About', target: 'about' },
//                 { name: 'Careers', target: 'careers' },
//                 { name: 'Blog', target: 'about' }, // Blog links to About page for simplicity
//                 { name: 'Contact', target: 'contact' }
//             ]
//         },
//         {
//             title: 'Legal',
//             links: [
//                 { name: 'Privacy Policy', target: 'privacy' },
//                 { name: 'Cookies', target: 'cookies' },
//                 { name: 'Terms of Service', target: 'terms' },
//                 { name: 'Security', target: 'security' }
//             ]
//         },
//     ];
// 
//     return (
//         <Box sx={{ bgcolor: currentColors.bgTop, borderTop: `1px solid ${currentColors.textDim}22` }}>
//             {/* Upper CTA - Buttons now correctly use setPage for navigation */}
//             <Box sx={{ py: 8, textAlign: 'center', background: `linear-gradient(180deg, ${currentColors.bgGradB}44, ${currentColors.bgTop})` }}>
//                 {/* <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>Ready to close your compliance gap?</Typography>
//                 <Typography sx={{ color: currentColors.textDim, mt: 1, mb: 4 }}>
// Adopt the AI-native audit layer that restores financial control across autonomous operations.
//                 </Typography> */}
// <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>
//   Ready to make autonomous systems explainable and trusted?
// </Typography>
// <Typography sx={{ color: currentColors.textDim, mt: 1, mb: 4 }}>
//   Adopt the Explainability Core that turns machine activity into transparent, verifiable financial records.
// </Typography>
// 
// 
//                 <Button
//                     variant="contained"
//                     size="large"
//                     sx={{ mt: 1, mr: 2, px: 4, py: 1.2, fontWeight: 800, textTransform: 'none', bgcolor: colors.accent, color: currentColors.bgTop, '&:hover': { bgcolor: colors.accentHover } }}
//                     // FIX: Direct navigation to the Contact page (setPage is defined here)
//                     onClick={() => setPage('contact')}
//                 >
//                     Book Audit Strategy Session &rarr;
//                 </Button>
//                 <Button
//                     variant="outlined"
//                     size="large"
//                     sx={{ mt: 1, px: 4, py: 1.2, fontWeight: 700, textTransform: 'none', borderColor: currentColors.textDim, color: currentColors.textDim, '&:hover': { bgcolor: `${currentColors.textDim}1A` } }}
//                     // FIX: Direct navigation to the Documentation page (setPage is defined here)
//                     onClick={() => setPage('documentation')}
//                 >
//                     View Documentation &rarr;
//                 </Button>
//             </Box>
// 
//             {/* Main Footer Links */}
//             <Container maxWidth="lg" sx={{ pt: 6, pb: 4 }}>
//                 <Grid container spacing={4}>
//                     {/* Melucra Info Column */}
//                     <Grid item xs={12} md={4}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
//                             <OmecaLogoComponent size={100} />
//                             <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}></Typography>
//                         </Box>
//                         {/* FIX: New, concise tagline */}
//                         <Typography
//                             variant="h6"
//                             sx={{ mt: 2, maxWidth: 820, mx: 'auto', color: currentColors.textDim, fontSize: { xs: '1rem', md: '1.2rem' } }}
//                         >
//                         The Explainable System of Record for the Machine Economy.
//                         </Typography>
//                     </Grid>
// 
//                     {/* Link Columns - ALL 12 NESTED LINKS ARE NOW FIXED */}
//                     <Grid item xs={12} md={8}>
//                         <Grid container spacing={4}>
//                             {footerLinks.map((col, idx) => (
//                                 <Grid item xs={6} sm={4} key={idx}>
//                                     <Typography variant="subtitle1" fontWeight={700} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                                         {col.title}
//                                     </Typography>
//                                     <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
//                                         {col.links.map((link, linkIdx) => (
//                                             <Link
//                                                 key={linkIdx}
//                                                 // FIX: Correct, simple inline function guarantees navigation (setPage is defined here)
//                                                 onClick={() => setPage(link.target)}
//                                                 underline="none"
//                                                 sx={{ display: 'block', mb: 1, color: currentColors.textDim, '&:hover': { color: colors.accent, cursor: 'pointer' } }}
//                                             >
//                                                 <Typography variant="body2">{link.name}</Typography>
//                                             </Link>
//                                         ))}
//                                     </Box>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </Grid>
//                 </Grid>
// 
//                 {/* Copyright */}
//                 <Box 
//                 sx={{ borderTop: `1px solid ${currentColors.textDim}22`, mt: 4, pt: 3, textAlign: 'center' }}>
//                     {/* Compliance credibility bar */}
// <Box
//   sx={{
//     py: 2,
//     textAlign: 'center',
//     color: currentColors.textDim,
//     borderTop: `1px solid ${currentColors.textDim}22`,
//     fontSize: '0.85rem',
//     letterSpacing: 0.3,
//   }}
// >
//   SOC 2 • GDPR • CCPA • Immutable Ledger Verified • Zero Trust Architecture
// </Box>
// 
//                     <Typography variant="caption" sx={{ color: currentColors.textDim }}>
//                         &copy; {new Date().getFullYear()} Melucra. All rights reserved.
//                     </Typography>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };
// 
// 
// // =================================================================
// // 3. MAIN SECTION COMPONENTS (Used on Home Page)
// // =================================================================
// 
// // --- Logo Marquee Helper Component (Unchanged) ---
// const LogoMarquee = ({ logos }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     // Duplicate logos to ensure seamless looping without a gap
//     const fullLogos = [...logos, ...logos];
// 
//     // Define the animation properties
//     const marqueeVariants = {
//         animate: {
//             // FIX: This needs to be slightly less than 50% due to potential rounding errors causing jump
//             x: ['0%', '-49.9%'],
//             transition: {
//                 x: {
//                     duration: 30, // Speed of the scroll (adjust as needed)
//                     ease: 'linear',
//                     repeat: Infinity,
//                     repeatType: 'loop',
//                 },
//             },
//         },
//     };
// 
//     return (
//         <Box sx={{
//             width: '100%',
//             // FIX: Tighter, consistent vertical padding
//             py: 3,
//             overflow: 'hidden',
//             // Dynamic background gradient for the marquee effect
//             background: mode === 'dark'
//                 ? `linear-gradient(90deg, ${currentColors.bgTop} 0%, ${currentColors.card} 50%, ${currentColors.bgTop} 100%)`
//                 : `linear-gradient(90deg, ${currentColors.bgTop} 0%, ${currentColors.bgGradB} 50%, ${currentColors.bgTop} 100%)`,
//         }}>
//             <motion.div
//                 style={{ display: 'flex', width: `${fullLogos.length * 100 / (fullLogos.length / 2)}%` }} // Dynamic width for duplicated logos
//                 variants={marqueeVariants}
//                 animate="animate"
//             >
//                 {fullLogos.map((name, index) => (
//                     <Box
//                         key={index}
//                         sx={{
//                             // Ensure mobile width is small enough for many logos but won't cut out the entire box
//                             minWidth: { xs: '120px', sm: '200px' },
//                             flexShrink: 0,
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             px: { xs: 2, md: 4 } // Added responsive padding
//                         }}
//                     >
//                         <Typography
//                             variant="h6"
//                             fontWeight={700}
//                             sx={{
//                                 color: currentColors.textDim,
//                                 opacity: 0.4,
//                                 letterSpacing: 1,
//                                 transition: 'color 0.3s',
//                                 '&:hover': {
//                                     color: colors.accent,
//                                     opacity: 1,
//                                     cursor: 'default'
//                                 }
//                             }}
//                         >
//                             {name}
//                         </Typography>
//                     </Box>
//                 ))}
//             </motion.div>
//         </Box>
//     );
// };
// 
// // --- Supported Integrations Section (No changes needed beyond initial reframing) ---
// const SupportedIntegrations = () => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     // Expanded list for better marquee effect
//     const integrations = ['Stripe', 'AWS', 'Google Cloud', 'OpenAI', 'Azure', 'Snowflake', 'Databricks', 'Confluent', 'Vanta', 'GCP'];
// 
//     return (
//         <Container maxWidth={false} disableGutters sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 4, md: 6 },
//             textAlign: 'center',
//             bgcolor: currentColors.bgTop
//         }}>
// <motion.div
//   initial={{ opacity: 0, y: 15 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   viewport={{ once: true, amount: 0.5 }}
// >
//   <Typography
//     variant="h5"
//     fontWeight={700}
//     color={currentColors.textPrimary}
//     sx={{ lineHeight: 1.25, textAlign: 'center', mb: 4 }}
//   >
//     Connect Your <strong>Entire AI Stack</strong> for All AI Workflows in Minutes
//   </Typography>
// {/* 
//   <Typography
//     sx={{
//       color: currentColors.textDim,
//       textAlign: 'center',
//       maxWidth: '700px',
//       mx: 'auto',
//       fontSize: { xs: '0.95rem', md: '1.1rem' },
//       fontWeight: 400,
//     }}
//   >
// Melucra turns agent transactions into verified financial records.
//   </Typography> */}
// </motion.div>
// 
// 
//             <LogoMarquee logos={integrations} />
//         </Container>
//     );
// };
// 
// // --- Profit Flow Section (No changes needed beyond initial reframing) ---
// const ProfitFlow = () => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
// const steps = [
//   {
//     title: 'Capture Activity',
//     body: 'Record every action from AI models, APIs, and cloud systems with full visibility and context.',
//     icon: <SyncAltRounded />,
//   },
//   {
//     title: 'Validate & Explain',
//     body: 'Verify each event against governance rules and generate transparent, explainable records.',
//     icon: <AccountBalanceWalletRoundedIcon />,
//   },
//   {
//     title: 'Anchor to Ledger',
//     body: 'Preserve verified data in an immutable ledger that provides financial and operational proof.',
//     icon: <AttachMoneyRoundedIcon />,
//   },
// ];
// 
// 
//     return (
// 
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 4, md: 6 },
//             textAlign: 'center'
//         }}>
// <motion.div
//   initial={{ opacity: 0, y: 15 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   viewport={{ once: true, amount: 0.5 }}
// >
// <Typography
//   variant="h4"
//   fontWeight={900}
//   color={currentColors.textPrimary}
//   sx={{
//     mb: 0,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: { xs: 'column', sm: 'row' },
//     gap: { xs: 0, sm: 1 },
//   }}
// >
//   Capture
//   <motion.span
//     initial={{ opacity: 0.2, x: -5 }}
//     animate={{ opacity: [0.2, 1, 0.2], x: [0, 5, 0] }}
//     transition={{ duration: 1.2, repeat: Infinity }}
//     style={{ display: 'inline-block' }}
//   >
//     <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>&darr;</Box>
//     <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>&rarr;</Box>
//   </motion.span>
//   Validate
//   <motion.span
//     initial={{ opacity: 0.2, x: -5 }}
//     animate={{ opacity: [0.2, 1, 0.2], x: [0, 5, 0] }}
//     transition={{ duration: 1.2, delay: 0.6, repeat: Infinity }}
//     style={{ display: 'inline-block' }}
//   >
//     <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>&darr;</Box>
//     <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>&rarr;</Box>
//   </motion.span>
//   Anchor
// </Typography>
// 
// <Typography
//   sx={{
//     color: currentColors.textDim,
//     textAlign: 'center',
//     fontSize: { xs: '1rem', sm: '1.1rem' },
//     fontWeight: 400,
//     maxWidth: '720px',
//     mx: 'auto',
//     mt: 1.5,
//     mb: 4,
//   }}
// >
//   <strong>Melucra</strong> transforms raw agent activity into explainable financial truth, giving enterprises traceable control over every autonomous transaction.
// </Typography>
// 
// </motion.div>
// 
// 
//             <Grid container spacing={4} justifyContent="center">
//                 {steps.map((step, index) => (
//                     <Grid item xs={12} md={4} key={index}>
//                         <motion.div
//                             initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6, delay: index * 0.2 }}
//                             viewport={{ once: true, amount: 0.6 }}
//                         >
//                             <Paper sx={{
//                                 p: 3,
//                                 borderRadius: 2,
//                                 bgcolor: currentColors.card,
//                                 height: '100%',
//                                 border: `1px solid ${currentColors.textDim}22`,
//                                 position: 'relative',
//                             }}>
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//                                     <Box sx={{ p: 2, borderRadius: '50%', bgcolor: `${colors.accent}1A`, color: colors.accent, border: `1px solid ${colors.accent}44` }}>
//                                         {step.icon}
//                                     </Box>
//                                 </Box>
//                                 <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>{step.title}</Typography>
//                                 <Typography variant="body2" color={currentColors.textDim} sx={{ mt: 1 }}>{step.body}</Typography>
//                             </Paper>
//                         </motion.div>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// // --- Problem/Solution Comparison Section (No changes needed beyond initial reframing) ---
// const ProblemSolutionComparison = () => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
// const problems = [
//   'Legacy ERPs see invoices, not inference — blind to agent activity and compute cost.',
//   'CFOs can’t trace AI spend back to validated outcomes or unit economics.',
//   'Finance teams patch systems together with spreadsheets that break under scale.',
//   'AI adoption is accelerating faster than internal control can catch up.',
// ];
// 
// const solutions = [
//   'AI-native audit core that translates every agent action into immutable financial proof.',
//   'Purpose-built for the machine economy, not adapted from human workflows.',
//   'Automated reconciliation and ERP sync that turns AI spend into verified financial data.',
//   'Continuous compliance and visibility across all autonomous operations.',
// ];
// 
// 
//     const ComparisonCard = ({ items, isSolution }) => (
//         <Paper sx={{
//             p: 4,
//             height: '100%',
//             borderRadius: 3,
//             bgcolor: isSolution ? `${colors.successGreen}10` : `${colors.errorRed}10`,
//             border: `1px solid ${isSolution ? colors.successGreen : colors.errorRed}44`,
//             color: currentColors.textPrimary,
//         }}>
//             <Typography variant="h6" fontWeight={800} sx={{ color: isSolution ? colors.successGreen : colors.errorRed, mb: 2 }}>
//                 {isSolution ? 'With Melucra: Auditable Control' : 'Without Melucra: The Compliance Gap'}
//             </Typography>
//             <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
//                 {items.map((item, index) => (
//                     <Box key={index} component="li" sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
//                         {isSolution ?
//                             <CheckCircleOutlineRounded sx={{ color: colors.successGreen, mr: 1, mt: 0.5, flexShrink: 0 }} /> :
//                             <CancelRounded sx={{ color: colors.errorRed, mr: 1, mt: 0.5, flexShrink: 0 }} />
//                         }
//                         <Typography variant="body2" color={currentColors.textDim}>
//                             {item}
//                         </Typography>
//                     </Box>
//                 ))}
//             </Box>
//         </Paper>
//     );
// 
//     return (
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 },
//             textAlign: 'center'
//         }}>
// <motion.div
//   initial={{ opacity: 0, y: 15 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   viewport={{ once: true, amount: 0.5 }}
// >
//   <Typography
//     variant="h4"
//     fontWeight={900}
//     color={currentColors.textPrimary}
//     sx={{ mb: 1, textAlign: 'center' }}
//   >
//     From Operational <strong>Noise</strong> to Explainable Control
//   </Typography>
// 
//   <Typography
//     sx={{
//       color: currentColors.textDim,
//       mb: 4,
//       maxWidth: 720,
//       mx: 'auto',
//       textAlign: 'center',
//       fontWeight: 500,
//     }}
//   >
//     Traditional ERPs cannot interpret autonomous activity or trace AI decisions. 
//     <strong> Melucra</strong> captures machine-level data and transforms it into transparent, verifiable financial records.
//   </Typography>
// </motion.div>
// 
//             <Grid container spacing={4}>
//                 <Grid item xs={12} md={6}>
//                     <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true, amount: 0.3 }}>
//                         <ComparisonCard items={problems} isSolution={false} />
//                     </motion.div>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true, amount: 0.3 }}>
//                         <ComparisonCard items={solutions} isSolution={true} />
//                     </motion.div>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };
// 
// // --- Developer Integration Section (Requires setPage for button) ---
// const DeveloperIntegration = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
// const steps = [
//     {
//     n: 1,
//     title: 'Capture Activity',
//     body: 'Capture atomic-level data from AI models, APIs, and clouds.',
//     icon: <SyncAltRounded />
//     },
//     {
//     n: 2,
//     title: 'Validate & Attest',
//     body: 'Enrich data with financial identity and validate against compliance controls.',
//     icon: <AccountBalanceWalletRoundedIcon />
//     },
//     {
//     n: 3,
//     title: 'Anchor Proof',
//     body: 'Generate immutable, GL-ready entries that sync to enterprise ERPs.',
//     icon: <AttachMoneyRoundedIcon />
//     },
// ];
// 
//     const codeSnippet = `
// const melucra = new MelucraSDK({
//   apiKey: "MELU_PK_...",
// });
// 
// // BEFORE Melucra:
// // const cost = calculate_usage(data);
// // update_spreadsheet(cost);
// 
// // WITH Melucra:
// const ledgerEntry = melucra.track({
//   accountId: "agent-id-123",
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
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 }
//         }}>
// <motion.div
//   initial={{ opacity: 0, y: 15 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   viewport={{ once: true, amount: 0.5 }}
// >
// <Typography
//   variant="h4"
//   fontWeight={600}
//   color={currentColors.textPrimary}
//   sx={{ mb: 1, textAlign: 'center' }}
// >
//   ERP Integration <span style={{ color: colors.accent }}>in Three Lines of Code</span>
// </Typography>
// 
// <Typography
//   sx={{
//     color: currentColors.textDim,
//     mb: 4,
//     textAlign: 'center',
//     maxWidth: 720,
//     mx: 'auto',
//   }}
// >
//   The <strong>Explainability Core API</strong> connects AI systems with enterprise finance tools, 
//   turning machine actions into clear and traceable financial entries.
// </Typography>
// 
// </motion.div>
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
//                                     <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: colors.lucraGold, color: currentColors.card, display: 'grid', placeItems: 'center', fontWeight: 800, mr: 2 }}>
//                                         {step.n}
//                                     </Box>
//                                     <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>{step.title}</Typography>
//                                 </Box>
//                                 <Typography variant="body2" sx={{ ml: 6, color: currentColors.textDim }}>
//                                     {step.body}
//                                 </Typography>
//                             </motion.div>
//                         ))}
//                         <Button
//                             variant="outlined"
//                             size="large"
//                             sx={{ mt: 3, borderColor: colors.accent, color: colors.accent, '&:hover': { bgcolor: `${colors.accent}14` } }}
//                             onClick={() => setPage('documentation')} // FIX: setPage now exists on props
//                         >
//                             View Integration Guide &rarr;
//                         </Button>
//                     </Box>
//                 </Grid>
// 
//                 {/* Code Block */}
//                 <Grid item xs={12} md={6}>
//                     <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
//                         <Paper sx={{ bgcolor: colors.dark.bgTop, color: 'white', p: 2, borderRadius: 2, border: `1px solid ${colors.accent}44`, height: '100%' }}>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, borderBottom: '1px solid #333' }}>
//                                 <Typography variant="caption" sx={{ color: colors.accent }}>Code Comparison</Typography>
//                                 <Button size="small" sx={{ color: colors.accent }}>Copy</Button>
//                             </Box>
//                             <Box component="pre" sx={{ overflowX: 'auto', bgcolor: colors.dark.bgTop, borderRadius: 1, p: 1, color: '#C8C8C8' }}>
//                                 <Typography component="code" sx={{ fontSize: '0.85rem', lineHeight: 1.5, fontFamily: 'monospace' }}>
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
// // =================================================================
// // 4. INDIVIDUAL PAGE COMPONENTS
// // =================================================================
// 
// // --- BackButton utility function defined once for external components to use ---
// const BackButton = ({ setPage, currentColors }) => (
//     <Button
//         startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
//         onClick={() => setPage('home')}
//         sx={{ mt: 4, mb: 2, color: currentColors.textDim, textTransform: 'none', '&:hover': { color: colors.accent } }}
//     >
//         Back to Home
//     </Button>
// );
// 
// 
// // --- LEDGER API Page Component (Requires setPage) ---
// const LedgerAPIPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <StorageRoundedIcon fontSize="large" />, title: "Immutable Ledger Core", desc: "Every machine event is cryptographically signed and stored in an immutable ledger, providing a complete, non-repudiable audit trail for financial compliance." },
//         { icon: <PolicyRoundedIcon fontSize="large" />, title: "Real-Time Event Ingestion", desc: "Low-latency API ingestion built for high-throughput machine data streams, ensuring your reconciliation and margin calculations are always current." },
//         { icon: <StorageRoundedIcon fontSize="large" />, title: "Schema Flexibility", desc: "Handle diverse data structures from multiple cloud providers and proprietary systems. Normalize compute, usage, and revenue signals automatically." },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 },
//             bgcolor: currentColors.bgTop
//         }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     Ledger API: The Core of Machine Finance
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     Transform chaotic usage data into the single source of truth for your AI-native ERP.
//                 </Typography>
//             </motion.div>
// 
//             <Grid container spacing={4}>
//                 {features.map((item, index) => (
//                     <Grid item xs={12} sm={4} key={index}>
//                         <Paper sx={{ p: 3, bgcolor: currentColors.card, height: '100%', borderLeft: `4px solid ${colors.accent}` }}>
//                             <Box sx={{ color: colors.accent, mb: 1 }}>{item.icon}</Box>
//                             <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>{item.title}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mt: 1 }}>{item.desc}</Typography>
//                         </Paper>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// // --- RECONCILIATION Page Component (Requires setPage) ---
// const ReconciliationPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <AccountBalanceWalletRoundedIcon fontSize="large" />, title: "Automated Financial Matching", desc: "Match platform consumption against payment gateways (Stripe, etc.) and vendor invoices to eliminate end-of-month reconciliation debt instantly." },
//         { icon: <SyncAltRounded fontSize="large" />, title: "Latency-Free Auditing", desc: "Validate transaction flow in real-time. Melucra ensures every penny of revenue corresponds to a machine event without manual intervention." },
//         { icon: <CheckCircleOutlineRounded fontSize="large" />, title: "Discrepancy Flagging", desc: "Automatically flag and report any mismatch between expected revenue and reported usage, protecting against margin leakage and billing errors." },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 },
//             bgcolor: currentColors.bgTop
//         }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     The Reconciliation Engine
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     See exactly how agent work connects to your financial system in real time.
//                 </Typography>
//             </motion.div>
// 
//             <Grid container spacing={4}>
//                 {features.map((item, index) => (
//                     <Grid item xs={12} sm={4} key={index}>
//                         <Paper sx={{ p: 3, bgcolor: currentColors.card, height: '100%', borderLeft: `4px solid ${colors.lucraGold}` }}>
//                             <Box sx={{ color: colors.lucraGold, mb: 1 }}>{item.icon}</Box>
//                             <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>{item.title}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mt: 1 }}>{item.desc}</Typography>
//                         </Paper>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// // --- MARGIN ALERTS Page Component (Requires setPage) ---
// const MarginAlertsPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <AttachMoneyRoundedIcon fontSize="large" />, title: "Real-Time Profit Protection", desc: "Set explicit margin thresholds (e.g., 30%) and receive immediate alerts when usage patterns put your projected profit at risk." },
//         { icon: <TrendingUp fontSize="large" />, title: "Predictive Forecasting", desc: "AI models analyze historical and current usage to forecast cost spikes and revenue drops, giving you hours, not days, to adjust pricing or infrastructure." },
//         { icon: <CodeRoundedIcon fontSize="large" />, title: "Automated Control Hooks", desc: "Integrate margin alerts directly into your operations pipeline to throttle high-cost users or automatically switch compute vendors when margins falls." },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 },
//             bgcolor: currentColors.bgTop
//         }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     Predictive Margin Alerts
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     Turn finance from a reporting function into a protective, profit-maximizing shield for your business.
//                 </Typography>
//             </motion.div>
// 
//             <Grid container spacing={4}>
//                 {features.map((item, index) => (
//                     <Grid item xs={12} sm={4} key={index}>
//                         <Paper sx={{ p: 3, bgcolor: currentColors.card, height: '100%', borderLeft: `4px solid ${colors.accent}` }}>
//                             <Box sx={{ color: colors.accent, mb: 1 }}>{item.icon}</Box>
//                             <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>{item.title}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mt: 1 }}>{item.desc}</Typography>
//                         </Paper>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// // --- PRICING Page Component (Requires setPage) ---
// const PricingPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const tiers = [
//         // { name: "Starter", price: "Free", desc: "For prototyping and early-stage projects. Includes core Ledger API and documentation access.", features: ["Up to 500M events/month", "Standard reconciliation", "Community support"] },
//         { name: "Connected Finance Pilot", price: "$25K–$50K", desc: "Proof-of-value engagement quantifying ROI through continuous visibility and control.", features: ["Read-only ERP integration setup", "Close visibility dashboard", "Validation rule configuration","ROI and efficiency analysis"] },
//         { name: "Enterprise Control Layer", price: "$125K+ ACV", desc: "Full SaaS deployment delivering continuous reconciliation, governance, and enterprise-scale control.", features: ["Real-time validation and exception queue", "Immutable audit ledger", "Multi-entity and policy engine", "Dedicated success and compliance partner"] },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 },
//             bgcolor: currentColors.bgTop
//         }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     Pricing for Proof and Scale
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     
//                 Omeca turns pilot validation into predictable recurring growth.
//                 </Typography>
//             </motion.div>
// 
//             <Grid container spacing={4} alignItems="stretch">
//                 {tiers.map((tier, index) => (
//                     <Grid item xs={12} md={4} key={index}>
//                         <Paper sx={{ p: 4, bgcolor: currentColors.card, height: '100%', border: index === 1 ? `3px solid ${colors.accent}` : `1px solid ${currentColors.textDim}33` }}>
//                             <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>{tier.name}</Typography>
//                             <Typography variant="h4" fontWeight={900} color={colors.lucraGold} sx={{ my: 2 }}>{tier.price}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ minHeight: 60 }}>{tier.desc}</Typography>
// 
//                             <Box component="ul" sx={{ mt: 3, p: 0, listStyle: 'none' }}>
//                                 {tier.features.map((feature, fIndex) => (
//                                     <Typography key={fIndex} variant="body2" color={currentColors.textPrimary} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                         <CheckCircleOutlineRounded sx={{ color: colors.successGreen, fontSize: 16, mr: 1 }} /> {feature}
//                                     </Typography>
//                                 ))}
//                             </Box>
//                             <Button variant="contained" fullWidth sx={{ mt: 4, bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentHover } }}>
//                                 {tier.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
//                             </Button>
//                         </Paper>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// // --- COMPANY INFO Page Component (Requires setPage) ---
// const CompanyInfoPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const sections = [
//         { title: "Our Mission (About)", target: "about", content: "We are building the financial operating system for the machine economy. Our mission is to eliminate friction between engineering, finance, and business strategy by providing a single source of truth for value realization." },
//         { title: "Careers", target: "careers", content: "Join the team that is defining the next generation of enterprise finance. We hire brilliant engineers, data scientists, and finance experts dedicated to scaling AI infrastructure." },
//         { title: "Contact Us", target: "contact", content: "Reach out to our sales or support team via email or book a live demo of the Melucra platform." },
//         { title: "Blog", target: "blog", content: "Read our latest insights on AI governance, compute cost optimization, and the future of ERP systems." },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 },
//             bgcolor: currentColors.bgTop
//         }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     The Melucra Story
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     We are defining the next generation of enterprise financial tools.
//                 </Typography>
//             </motion.div>
// 
//             <Grid container spacing={4}>
//                 {sections.map((item, index) => (
//                     <Grid item xs={12} md={6} key={index}>
//                         <Paper sx={{ p: 3, bgcolor: currentColors.card, height: '100%', borderTop: `4px solid ${colors.lucraGold}` }}>
//                             <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>{item.title}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mt: 1 }}>{item.content}</Typography>
//                             <Button
//                                 onClick={() => setPage(item.target)} // FIX: setPage now exists on props
//                                 size="small"
//                                 sx={{ mt: 2, color: colors.accent, fontWeight: 700 }}
//                             >
//                                 {item.target === 'blog' ? 'View Posts' : item.target === 'careers' ? 'View Openings' : 'Learn More'} &rarr;
//                             </Button>
//                         </Paper>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// // --- CAREERS Page Component (Requires setPage) ---
// const CareersPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const positions = [
//         { title: "Senior Backend Engineer (Go/Rust)", dept: "Engineering", focus: "Building the immutable ledger and reconciliation core." },
//         { title: "Financial Data Scientist", dept: "Data & AI", focus: "Developing predictive margin alert models and risk scoring." },
//         { title: "VP of Product Marketing", dept: "Marketing", focus: "Driving GTM strategy for our core ERP and API products." },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 },
//             bgcolor: currentColors.bgTop
//         }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     Careers
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     We are looking for builders who thrive at the intersection of AI, finance, and engineering excellence.
//                 </Typography>
//             </motion.div>
// 
//             <Box sx={{ maxWidth: 800, mx: 'auto' }}>
//                 {positions.map((job, index) => (
//                     <Paper key={index} sx={{ p: 3, mb: 3, bgcolor: currentColors.card, border: `1px solid ${currentColors.textDim}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Box>
//                             <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>{job.title}</Typography>
//                             <Typography variant="body2" color={colors.accent} sx={{ mt: 0.5 }}>{job.dept} &middot; {job.focus}</Typography>
//                         </Box>
//                         <Button variant="outlined" size="small" sx={{ color: colors.lucraGold, borderColor: colors.lucraGold }} onClick={() => setPage('contact')}>Apply</Button>
//                     </Paper>
//                 ))}
//             </Box>
// 
//         </Container>
//     );
// };
// 
// // --- CONTACT Page Component (Requires setPage) ---
// const INDUSTRY_OPTIONS = [
//     'Financial Services', 'Technology & SaaS', 'E-commerce & Retail',
//     'Manufacturing & IoT', 'Logistics & Supply Chain', 'Other'
// ];
// 
// const INITIAL_FORM_DATA = {
//     firstName: '', lastName: '', company: '',
//     industry: '', email: '', query: ''
// };
// 
// const useContactForm = (setFormSubmitted) => {
//     const [formData, setFormData] = useState(INITIAL_FORM_DATA);
//     const [errors, setErrors] = useState({});
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 
//     const validateForm = () => {
//         let newErrors = {};
//         if (!formData.firstName) newErrors.firstName = 'Required.';
//         if (!formData.lastName) newErrors.lastName = 'Required.';
//         if (!formData.company) newErrors.company = 'Required.';
//         if (!formData.email) newErrors.email = 'Required.';
//         else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email.';
//         if (!formData.query) newErrors.query = 'Required.';
//         if (!formData.industry) newErrors.industry = 'Required.';
// 
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
// 
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name]) {
//             setErrors(prev => ({ ...prev, [name]: '' }));
//         }
//     };
// 
//     const handleContactSubmit = (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
// 
//         console.log('Contact Form Submitted:', formData);
//         setFormData(INITIAL_FORM_DATA);
//         setErrors({});
//         setFormSubmitted(true);
//         setTimeout(() => setFormSubmitted(false), 5000);
//     };
// 
//     return { formData, errors, handleInputChange, handleContactSubmit };
// };
// 
// 
// const ContactPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const [formSubmitted, setFormSubmitted] = useState(false);
// 
//     const { formData, errors, handleInputChange, handleContactSubmit } = useContactForm(setFormSubmitted);
//     const currentColors = colors[mode];
// 
//     const inputStyles = useMemo(() => ({
//         '& .MuiOutlinedInput-root': {
//             bgcolor: mode === 'dark' ? currentColors.bgTop : currentColors.bgGradA,
//             color: currentColors.textPrimary,
//             borderRadius: 1.5,
//             transition: 'border-color 0.3s',
//             '& fieldset': { borderColor: `${currentColors.textDim}44` },
//             '&.Mui-focused fieldset': { borderColor: colors.accent, borderWidth: '2px' },
//         },
//         '& .MuiInputLabel-root': { color: currentColors.textDim }
//     }), [mode, currentColors]);
// 
//     const formFields = [
//         { name: 'firstName', label: 'First Name', grid: 6 },
//         { name: 'lastName', label: 'Last Name', grid: 6 },
//         { name: 'email', label: 'Work Email', type: 'email', grid: 6 },
//         { name: 'company', label: 'Company Name', grid: 6 },
//         { name: 'industry', label: 'Industry', grid: 12, select: true },
//         { name: 'query', label: 'Use Case/Query', multiline: true, rows: 3, grid: 12 },
//     ];
// 
// 
//     return (
//         <Container
//             maxWidth="sm" // Reduced max width for a less "too big" feel
//             sx={{
//                 // FIX: Tighter, consistent vertical padding
//                 py: { xs: 6, md: 8 },
//                 bgcolor: currentColors.bgTop,
//                 minHeight: '80vh'
//             }}
//         >
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 1, lineHeight: 1.1 }}>
//                     Book a Demo to See <span style={{ color: colors.lucraGold }}>Omeca</span>
//                 </Typography>
//                 <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 4 }}>
//                     See how we unify machine work, compute costs, and financial intelligence for your AI platform.
//                 </Typography>
//             </motion.div>
// 
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//             >
//                 <Paper
//                     elevation={8}
//                     sx={{
//                         p: { xs: 3, sm: 4 },
//                         bgcolor: currentColors.card,
//                         borderRadius: 3,
//                         border: `2px solid ${colors.accent}44`,
//                         boxShadow: mode === 'dark' ? `0 10px 30px rgba(0, 0, 0, 0.5)` : `0 5px 20px rgba(0,0,0,0.1)`,
//                     }}
//                 >
//                     {formSubmitted ? (
//                         <Box sx={{ textAlign: 'center', py: 6 }}>
//                             <CheckCircleOutlineRounded sx={{ fontSize: 72, color: colors.successGreen }} />
//                             <Typography variant="h5" fontWeight={800} color={colors.successGreen} sx={{ mt: 3, mb: 1 }}>
//                                 Request Confirmed.
//                             </Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 3 }}>
//                                 We'll be in touch shortly to schedule your live demonstration.
//                             </Typography>
//                             <Button variant="text" onClick={() => setPage('home')} sx={{ color: colors.accent, fontWeight: 700 }}>
//                                 Return Home &rarr;
//                             </Button>
//                         </Box>
//                     ) : (
//                         <Grid container spacing={2.5} component="form" onSubmit={handleContactSubmit}>
//                             {formFields.map(field => (
//                                 <Grid item xs={12} sm={field.grid} key={field.name}>
//                                     {field.select ? (
//                                         <FormControl fullWidth required error={!!errors[field.name]} sx={inputStyles}>
//                                             <InputLabel>{field.label}</InputLabel>
//                                             <Select
//                                                 label={field.label}
//                                                 name={field.name}
//                                                 value={formData[field.name]}
//                                                 onChange={handleInputChange}
//                                                 inputProps={{ sx: { bgcolor: mode === 'dark' ? currentColors.bgTop : currentColors.bgGradA } }}
//                                             >
//                                                 {INDUSTRY_OPTIONS.map((industry) => (
//                                                     <MenuItem key={industry} value={industry}>
//                                                         {industry}
//                                                     </MenuItem>
//                                                 ))}
//                                             </Select>
//                                             {!!errors[field.name] && <FormHelperText>{errors[field.name]}</FormHelperText>}
//                                         </FormControl>
//                                     ) : (
//                                         <TextField
//                                             fullWidth
//                                             label={field.label}
//                                             name={field.name}
//                                             type={field.type || 'text'}
//                                             value={formData[field.name]}
//                                             onChange={handleInputChange}
//                                             variant="outlined"
//                                             required
//                                             multiline={field.multiline}
//                                             rows={field.rows}
//                                             error={!!errors[field.name]}
//                                             helperText={errors[field.name]}
//                                             sx={inputStyles}
//                                         />
//                                     )}
//                                 </Grid>
//                             ))}
// 
//                             <Grid item xs={12} sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
//                                 <Button
//                                     variant="contained"
//                                     size="large"
//                                     type="submit"
//                                     sx={{
//                                         bgcolor: colors.accent,
//                                         color: currentColors.bgTop,
//                                         fontWeight: 700,
//                                         minWidth: 160,
//                                         '&:hover': { bgcolor: colors.accentHover }
//                                     }}
//                                 >
//                                     Submit Request
//                                 </Button>
// 
//                                 <Typography variant="body2" color={currentColors.textDim}>
//                                     or
//                                 </Typography>
// 
//                                 <Button
//                                     variant="outlined"
//                                     size="large"
//                                     component={Link}
//                                     href="mailto:luca@meluca.com"
//                                     sx={{
//                                         color: colors.lucraGold,
//                                         borderColor: colors.lucraGold,
//                                         textTransform: 'none',
//                                         fontWeight: 600,
//                                         '&:hover': { borderColor: colors.lucraGold + 'AA', bgcolor: colors.lucraGold + '11' }
//                                     }}
//                                 >
//                                     Email us
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     )}
//                 </Paper>
// 
//                 <Box sx={{ textAlign: 'center', mt: 5 }}>
//                     <Typography variant="body2" color={currentColors.textDim}>
//                         Need technical details?
//                         <Link onClick={() => setPage('documentation')} underline="hover" sx={{ ml: 1, color: colors.accent, cursor: 'pointer', fontWeight: 600 }}>
//                             View Developer Docs
//                         </Link>
//                     </Typography>
//                 </Box>
//             </motion.div>
//         </Container>
//     );
// };
// 
// 
// // --- LEGAL/SECURITY Page Component (Requires setPage) ---
// const LegalPage = ({ setPage, currentTarget }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     // Function to generate the title based on the link clicked
//     const getPageTitle = (target) => {
//         switch (target) {
//             case 'privacy': return "Privacy Policy: Data Integrity";
//             case 'cookies': return "Cookie Policy";
//             case 'terms': return "Terms of Service";
//             case 'security': return "Security & Compliance Center";
//             default: return "Documentation & Compliance";
//         }
//     };
// 
//     const getPageContent = (target) => {
//         switch (target) {
//             case 'privacy': return "Our policy details how Melucra processes, stores, and protects customer data, adhering strictly to global financial and data privacy regulations (e.g., GDPR, CCPA). Data is tokenized and never sold.";
//             case 'cookies': return "We use essential cookies for platform performance and security, and optional analytics cookies to improve our services. You have full control over non-essential tracking.";
//             case 'terms': return "The definitive agreement governing your use of the Melucra API, Reconciliation Engine, and Ledger services.";
//             case 'security': return "Melucra maintains SOC 2 Type II compliance, employs Zero-Trust architecture, and utilizes immutable ledger technology to ensure unparalleled data authenticity and integrity.";
//             default: return "Access our comprehensive developer documentation, API references, and detailed compliance reports here.";
//         }
//     };
// 
// 
//     return (
//         <Container maxWidth="lg" sx={{
//             // FIX: Tighter, consistent vertical padding
//             py: { xs: 6, md: 8 },
//             bgcolor: currentColors.bgTop
//         }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     {getPageTitle(currentTarget)}
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     As an ERP provider, Melucra is committed to rigorous security, data integrity, and regulatory compliance.
//                 </Typography>
//             </motion.div>
// 
//             <Paper sx={{ p: 4, bgcolor: currentColors.card, border: `1px solid ${currentColors.textDim}22` }}>
//                 <Typography variant="h5" fontWeight={700} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     {getPageTitle(currentTarget).toUpperCase()}
//                 </Typography>
//                 <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 3 }}>
//                     {getPageContent(currentTarget)}
//                 </Typography>
//                 <Link onClick={() => setPage('home')} sx={{ color: colors.accent, cursor: 'pointer', fontWeight: 700 }}>
//                     Return to Omeca Home
//                 </Link>
//             </Paper>
//         </Container>
//     );
// };
// 
// 
// // =================================================================
// // 5. MAIN LANDING COMPONENT (FINAL ASSEMBLY)
// // =================================================================
// 
// const MelucraLanding = () => {
//     const { mode } = useContext(ColorModeContext);
// 
//     const [email, setEmail] = useState('');
//     const [submitted, setSubmitted] = useState(false);
//     const [page, setPage] = useState('home'); // Define setPage here, it is passed down
// 
//     // Use a ref to point to the email input for programmatic focusing
//     const emailInputRef = useRef(null);
// 
//     // FIX: Simplified handleSubmit to use native focus/scroll
//     const handleSubmit = () => {
//         if (email && email.includes('@') && email.includes('.')) {
//             console.log('Melucra invite request:', { email });
//             setSubmitted(true);
//         // } else {
//         //     alert("Please enter a valid email address.");
//         // }
//         } else {
//     setSubmitted(false);
//     const errorMsg = document.getElementById('emailError');
//     if (errorMsg) {
//         errorMsg.style.opacity = '1';
//         setTimeout(() => (errorMsg.style.opacity = '0'), 4000);
//     }
// }
// 
//     };
// 
//     // FIX: New function to handle the button click and focus the input, fixing the jump issue.
//     // const handleRequestInviteClick = () => {
//     //     if (emailInputRef.current) {
//     //         // Focus the input, letting the browser/OS handle the scrolling and keyboard gracefully
//     //         emailInputRef.current.focus();
//     //     }
//     // };
// 
//     const handleRequestInviteClick = () => {
//     if (emailInputRef.current) {
//         emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         setTimeout(() => emailInputRef.current.focus(), 300);
//     }
// };
// 
// 
// 
//     const currentColors = colors[mode];
// 
//     // --- Page Router Component ---
//     const PageRouter = () => {
//         // Scroll to top when page changes
//         React.useEffect(() => {
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//         }, [page]);
// 
//         switch (page) {
//             // Products
//             case 'ledger':
//                 return <LedgerAPIPage setPage={setPage} />;
//             case 'reconciliation':
//                 return <ReconciliationPage setPage={setPage} />;
//             case 'alerts':
//                 return <MarginAlertsPage setPage={setPage} />;
//             case 'pricing':
//                 return <PricingPage setPage={setPage} />;
// 
//             // Company
//             case 'about':
//             case 'blog':
//                 return <CompanyInfoPage setPage={setPage} />;
//             case 'careers':
//                 return <CareersPage setPage={setPage} />;
//             case 'contact':
//                 return <ContactPage setPage={setPage} />;
// 
//             // Legal & Docs
//             case 'privacy':
//             case 'cookies':
//             case 'terms':
//             case 'security':
//             case 'documentation':
//                 return <LegalPage setPage={setPage} currentTarget={page} />;
// 
//             case 'home':
//             default:
//                 // Home Page Content (Rendered only on 'home')
//                 return (
//                     <>
//                         {/* HERO SECTION */}
//                         <Box sx={{
//                             // FIX: Tighter Top Padding
//                             pt: { xs: 8, md: 9 },
//                             // FIX: Tighter Bottom Padding
//                             pb: { xs: 4, md: 6 },
//                               px: { xs: 2, sm: 4 },
//                             overflowX: 'hidden',
//                             textAlign: 'center',
//                             background: `radial-gradient(900px 400px at 50% -10%, ${currentColors.bgGradA} 0%, ${currentColors.bgTop} 60%), linear-gradient(180deg, ${currentColors.bgGradB} 0%, ${currentColors.bgTop} 40%)`
//                         }}>
// <motion.div
//   initial={{ opacity: 0, y: -12 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6 }}
// >
// 
// {/* === BRAND HEADER (matches brief style) === */}
// <div>
//   <Typography
//     component="h1"
//     sx={{
//       fontWeight: 1000,
//       lineHeight: 1.05,
//       fontSize: "clamp(4rem, 12vw, 9rem)",
//       letterSpacing: "-0.02em",
//       mb: 3,
//       textAlign: "center",
//       background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//     }}
//   >
//     Omeca
//   </Typography>
// </div>
// 
// {/* === MAIN HERO HEADLINE === */}
// <div>
//   <Typography
//     variant="h3"
//     fontWeight={900}
//     sx={{
//       fontSize: { xs: "1.8rem", sm: "2.6rem", md: "3.4rem", lg: "3.8rem" },
//       wordBreak: "break-word",
//       px: { xs: 2, sm: 4 },
//       fontFamily:
//         'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//       lineHeight: 1.15,
//       color: currentColors.textPrimary,
//       textAlign: "center",
//       mb: 2,
//       "& .aiGradient": {
//         background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent",
//         display: "inline-block",
//         fontWeight: 900,
//       },
//     }}
//   >
//     The Explainability Core powering the{" "}
//     <span className="aiGradient">$1.3&nbsp;Trillion</span> Machine Economy
//   </Typography>
// </div>
// 
// <Typography
//   variant="h5"
//   align="center"
//   sx={{
//     fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' },
//     color: currentColors.textDim,
//     px: { xs: 3, md: 0 },
//     lineHeight: 1.6,
//     fontWeight: 500,
//     maxWidth: '720px',
//     mx: 'auto',
//     mb: 2.5,
//   }}
// >
//   <strong>Melucra</strong> captures every action and decision at the source, 
//   giving enterprises clear context, verified proof, and financial clarity across the machine economy.
// </Typography>
// 
// </motion.div>
// 
//                             {/* Inline invite form */}
//                             <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.45 }}>
//                                 {/* FIX: Reduced mt from 5 to 4 for tighter rhythm */}
//                                 {/* <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }} id="invite-form-target"> */}
//                                 <Box sx={{
//   mt: { xs: 3, sm: 4 },
//   flexDirection: { xs: 'column', sm: 'row' },
//   alignItems: 'center',
//   justifyContent: 'center',
//   gap: { xs: 2, sm: 0 },
// }} id="invite-form-target">
//                                     {!submitted ? (
//                                         <>
//                                             <TextField variant="outlined" placeholder="Your work email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//                                             
//                                                 // Attach the ref here
//                                                 inputRef={emailInputRef}
//                                                 InputProps={{ sx: { width: { xs: '250px', sm: '350px' }, borderRadius: '8px 0 0 8px', border: `1px solid ${currentColors.textDim}44`, } }}
//                                                 sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
//                                             />
//                                             <Button variant="contained" size="large" endIcon={<ArrowForwardIosRounded />} onClick={handleSubmit}
//                                                 sx={{ borderRadius: '0 8px 8px 0', py: 1.3, fontWeight: 800, textTransform: 'none', bgcolor: colors.accent, color: currentColors.bgTop, '&:hover': { bgcolor: colors.accentHover } }}>
//                                                 Get Started
//                                             </Button>
//                                         </>
//                                     ) : (
//                                         <Typography variant="h6" sx={{ mt: 4, color: colors.accent }}>Thanks! We’ll be in touch shortly.</Typography>
//                                     )}
//                                 </Box>
//                             </motion.div>
// 
//                             {/* Dashboard Preview Placement */}
//                             {/* FIX: Reduced mt from 8 to 6 for tighter rhythm */}
//                             {/* <Container maxWidth="lg" sx={{ mt: 6 }}>
//                                 <MelucraDashboardPage />
//                             </Container> */}
// 
// <Box sx={{ py: { xs: 2, md: 4 } }}>
//   <OmecaGovernanceDashboardPage />
// </Box>
// 
//                         </Box>
// 
//                         {/* CONTENT SECTIONS - Now consistently spaced */}
//                         {/* FIX: Pass setPage to any section component containing a button that uses it */}
//                         <SupportedIntegrations /> 
//                         <ProfitFlow />
//                         <ProblemSolutionComparison />
//                         <DeveloperIntegration setPage={setPage} /> {/* FIX: Passing setPage here */}
//                     </>
//                 );
//         }
//     };
// 
// 
//     return (
//         <Box sx={{
//             bgcolor: currentColors.bgTop,
//             color: currentColors.textPrimary,
//             minHeight: '100vh',
//         }}>
// 
// {/* --- TOP NAV (Always Visible) --- */}
// <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', pt: 1 }}>
//     <Toolbar sx={{ justifyContent: 'space-between' }}>
//         
//         {/* Brand / Home Link */}
//         <Box
//             sx={{ display: 'flex', alignItems: 'center', gap: 1.8, cursor: 'pointer' }}
//             onClick={() => setPage('home')}
//         >
//             <OmecaLogoComponent size={90} />
//             {/* <Typography
//                 variant="h5"
//                 fontWeight={900}
//                 letterSpacing={1}
//                 sx={{
//                     color: currentColors.textPrimary,
//                     textTransform: 'uppercase',
//                     fontFamily: 'Inter, Roboto, sans-serif'
//                 }}
//             >
//                 Omeca
//             </Typography> */}
//         </Box>
// 
//         {/* Right-Side Controls */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//             <ThemeToggleButton />
//             <Button
//                 variant="outlined"
//                 size="medium"
//                 sx={{
//                     borderColor: colors.accent,
//                     color: colors.accent,
//                     fontWeight: 700,
//                     textTransform: 'none',
//                     '&:hover': {
//                         bgcolor: `${colors.accent}14`,
//                         borderColor: colors.accent,
//                     }
//                 }}
//                 onClick={handleRequestInviteClick}
//             >
//                 Request Invite
//             </Button>
//         </Box>
// 
//     </Toolbar>
// </AppBar>
// 
// 
//             {/* --- MAIN PAGE CONTENT AREA (Router) --- */}
//             <PageRouter />
// 
//             {/* --- FOOTER (Always Visible, receives setPage) --- */}
//             <AppFooter setPage={setPage} /> {/* FIX: Passing setPage here */}
//         </Box>
//     );
// };
// 
// // --- 5. App Wrapper Component for Theme Context (FINAL EXPORT) ---
// const AppThemeWrapper = () => {
//     // Use system preference or default to 'dark'
//     const preferredMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//     const [mode, setMode] = useState(preferredMode);
// 
//     const colorMode = useMemo(
//         () => ({
//             mode,
//             toggleColorMode: () => {
//                 setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//             },
//         }),
//         [mode],
//     );
// 
//     // Memoize the MUI theme object
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
// 
//     const [waitlistOpen, setWaitlistOpen] = useState(false);
// 
// const handleRequestInviteClick = () => {
//   setWaitlistOpen(true);
// };
// 
// 
//     return (
//         <ColorModeContext.Provider value={{ ...colorMode, mode }}>
//             <ThemeProvider theme={theme}>
//                 <MelucraLanding />
//             </ThemeProvider>
//         </ColorModeContext.Provider>
//     );
// };
// 
// export default AppThemeWrapper;


// import React, { useState, useMemo, useContext, useRef } from 'react';
// import {
//     AppBar, Toolbar, Container, Box,
//     Typography, TextField, Button, IconButton, Link,
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// 
// // --- THEME & CONTEXT ---
// import { colors, getDesignTokens } from "./layouts/theme/theme.js";
// import { ColorModeContext } from "./layouts/theme/ThemeContext.jsx";
// import ThemeToggleButton from "./layouts/ThemeToggleButton.jsx";
// 
// // --- UI COMPONENTS ---
// import OmecaAppFooter from "./components/ui/AppFooter.jsx";
// import OmecaDashboardPreview from "./components/ui/DashboardPreview.jsx";
// 
// // --- PAGE COMPONENTS ---
// // import OmecaCareersPage from "./components/pages/CareersPage.jsx";
// import OmecaCareersPage from "./components/pages/CareersPage.jsx";
// 
// import OmecaCompanyInfoPage from "./components/pages/CompanyInfoPage.jsx";
// import OmecaContactPage from "./components/pages/ContactPage.jsx";
// import OmecaLedgerAPIPage from "./components/pages/LedgerAPIPage.jsx";
// import OmecaLegalPage from "./components/pages/LegalPage.jsx";
// import OmecaMarginAlertsPage from "./components/pages/MarginAlertsPage.jsx";
// import OmecaPricingPage from "./components/pages/PricingPage.jsx";
// import OmecaReconciliationPage from "./components/pages/ReconciliationPage.jsx";
// import OmecaBrief from "./components/pages/OmecaBrief.jsx";
// import OmecaLogo from "./components/ui/OmecaLogo.jsx";
// 
// 
// 
// // --- SECTION COMPONENTS (located in omeca-governance/components/sections/) ---
// import OmecaDeveloperIntegration 
//   from "./omeca-governance/components/sections/DeveloperIntegration.jsx";
// import OmecaProblemSolutionComparison 
//   from "./omeca-governance/components/sections/ProblemSolutionComparison.jsx";
// import OmecaProfitFlow 
//   from "./omeca-governance/components/sections/ProfitFlow.jsx";
// import OmecaSupportedIntegrations 
//   from "./omeca-governance/components/sections/SupportedIntegrations.jsx";
// 
// // --- GOVERNANCE COMPONENTS ---
// import OmecaGovernanceDashboardPage 
//   from "./omeca-governance/components/pages/OmecaGovernanceDashboardPage.jsx";
// import OmecaGovernanceWaitlistDialog 
//   from "./omeca-governance/components/OmecaGovernanceWaitlistDialog.jsx";
// //   import OmecaLogoComponent from "./omeca-governance/components/ui/OmecaGovernanceLogo.jsx";
// 
// // --- LOGO COMPONENT (INLINE) ---
// // const OmecaLogoComponent = ({ size = 36 }) => (
// //     <img
// //         src="/assets/omeca-logo.png"
// //         alt="OMECA Logo"
// //         width={size}
// //         height={size}
// //         style={{ display: 'block' }}
// //     />
// // );
// 
// 
// 
// // --- MOTION VARIANTS ---
// const fadeInUp = { 
//   hidden: { y: 20, opacity: 0 }, 
//   show: { 
//     y: 0, 
//     opacity: 1, 
//     transition: { type: "spring", stiffness: 100, damping: 20 } 
//   } 
// };
// 
// 
// // =================================================================
// // 1. MAIN APPLICATION ROUTER (OmecaLanding)
// // =================================================================
// 
// const OmecaLanding = () => {
//     const { mode } = useContext(ColorModeContext);
// 
//     const [email, setEmail] = useState('');
//     const [submitted, setSubmitted] = useState(false);
//     const [page, setPage] = useState('home'); 
//     const emailInputRef = useRef(null);
// 
//     // --- Form logic remains unchanged ---
//     const handleSubmit = () => {
//         if (email && email.includes('@') && email.includes('.')) {
//             console.log('Omeca invite request:', { email });
//             setSubmitted(true);
//         } else {
//             setSubmitted(false);
//             const errorMsg = document.getElementById('emailError');
//             if (errorMsg) {
//                 errorMsg.style.opacity = '1';
//                 setTimeout(() => (errorMsg.style.opacity = '0'), 4000);
//             }
//         }
//     };
// 
//     const handleRequestInviteClick = () => {
//         if (emailInputRef.current) {
//             emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             setTimeout(() => emailInputRef.current.focus(), 300);
//         }
//     };
// 
//     const currentColors = colors[mode];
// 
//     // --- Page Router Component ---
//     const PageRouter = () => {
//         React.useEffect(() => {
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//         }, [page]);
// 
//         switch (page) {
//             // Products
//             case 'ledger': return <OmecaLedgerAPIPage setPage={setPage} />;
//             case 'reconciliation': return <OmecaReconciliationPage setPage={setPage} />;
//             case 'alerts': return <OmecaMarginAlertsPage setPage={setPage} />;
//             case 'pricing': return <OmecaPricingPage setPage={setPage} />;
//             
//             // Company
//             case 'about':
//             case 'blog': return <OmecaCompanyInfoPage setPage={setPage} />;
//             case 'careers': return <OmecaCareersPage setPage={setPage} />;
//             case 'contact': return <OmecaContactPage setPage={setPage} />;
//             case 'brief': return <OmecaBrief setPage={setPage} />;
// 
//             
//             
//             // Legal & Docs
//             case 'privacy':
//             case 'cookies':
//             case 'terms':
//             case 'security':
//             case 'documentation': return <OmecaLegalPage setPage={setPage} currentTarget={page} />;
//             
//             case 'home':
//             default:
//                 return (
//                     <>
//                         {/* HERO SECTION */}
//                         <Box
//                             sx={{
//                                 pt: { xs: 8, md: 9 },
//                                 pb: { xs: 4, md: 6 },
//                                 px: { xs: 2, sm: 4 },
//                                 overflowX: 'hidden',
//                                 textAlign: 'center',
//                                 background: `radial-gradient(900px 400px at 50% -10%, ${currentColors.bgGradA} 0%, ${currentColors.bgTop} 60%), linear-gradient(180deg, ${currentColors.bgGradB} 0%, ${currentColors.bgTop} 40%)`
//                             }}
//                         >
//                             <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//                                 
//                                 {/* BRAND HEADER */}
//                                 <div>
//                                     <Typography
//                                         component="h1"
//                                         sx={{
//                                             fontWeight: 1000,
//                                             lineHeight: 1.05,
//                                             fontSize: "clamp(4rem, 12vw, 9rem)",
//                                             letterSpacing: "-0.02em",
//                                             mb: 3,
//                                             textAlign: "center",
//                                             background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//                                             WebkitBackgroundClip: "text",
//                                             WebkitTextFillColor: "transparent",
//                                         }}
//                                     >
//                                         Omeca
//                                     </Typography>
//                                 </div>
//                                 
//                                 {/* MAIN HERO HEADLINE */}
//                                 <div>
// <Typography
//     variant="h3"
//     fontWeight={900}
//     sx={{
//         fontSize: { xs: "1.8rem", sm: "2.6rem", md: "3.4rem", lg: "3.8rem" },
//         wordBreak: "break-word",
//         px: { xs: 2, sm: 4 },
//         fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//         lineHeight: 1.15,
//         color: currentColors.textPrimary,
//         textAlign: "center",
//         mb: 2,
//         "& .aiGradient": {
//             background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             display: "inline-block",
//             fontWeight: 900,
//         },
//     }}
// >
//     The <span className="aiGradient">Self-Driving</span> Cognitive ERP
// </Typography>
// 
//                                 </div>
// 
// <Typography
//     variant="h5"
//     align="center"
//     sx={{
//         fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' },
//         color: currentColors.textDim,
//         px: { xs: 3, md: 0 },
//         lineHeight: 1.6,
//         fontWeight: 500,
//         maxWidth: '720px',
//         mx: 'auto',
//         mb: 2.5,
//     }}
// >
//     Transforming ERPs from passive record-keeping to continuous, autonomous control.  
//     <strong>Omeca</strong> unifies operational truth, real-time close, and verifiable intelligence into a single cognitive system of record.
// </Typography>
// 
//                             </motion.div>
// 
//                             {/* Inline invite form */}
//                             <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.45 }}>
//                                 <Box sx={{
//                                     mt: { xs: 3, sm: 4 },
//                                     flexDirection: { xs: 'column', sm: 'row' },
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     gap: { xs: 2, sm: 0 },
//                                 }} id="invite-form-target">
//                                     {!submitted ? (
//                                         <>
//                                             <TextField variant="outlined" placeholder="Your work email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//                                                 inputRef={emailInputRef}
//                                                 InputProps={{ sx: { width: { xs: '250px', sm: '350px' }, borderRadius: '8px 0 0 8px', border: `1px solid ${currentColors.textDim}44`, } }}
//                                                 sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
//                                             />
//                                             <Button variant="contained" size="large" endIcon={<ArrowForwardIosRounded />} onClick={handleSubmit}
//                                                 sx={{ borderRadius: '0 8px 8px 0', py: 1.3, fontWeight: 800, textTransform: 'none', bgcolor: colors.accent, color: currentColors.bgTop, '&:hover': { bgcolor: colors.accentHover } }}>
//                                                 Get Started
//                                             </Button>
//                                         </>
//                                     ) : (
//                                         <Typography variant="h6" sx={{ mt: 4, color: colors.accent }}>Thanks! We’ll be in touch shortly.</Typography>
//                                     )}
//                                 </Box>
//                             </motion.div>
// 
//                             {/* Dashboard Preview Placement */}
//                             <Box sx={{ py: { xs: 2, md: 4 } }}>
//                                 <OmecaGovernanceDashboardPage />
//                             </Box>
//                         </Box>
//                         
//                         {/* CONTENT SECTIONS */}
//                         <OmecaSupportedIntegrations />
//                         <OmecaProfitFlow />
//                         <OmecaProblemSolutionComparison />
//                         <OmecaDeveloperIntegration setPage={setPage} /> 
//                     </>
//                 );
//         }
//     };
// 
// 
//     return (
//         <Box sx={{
//             bgcolor: currentColors.bgTop,
//             color: currentColors.textPrimary,
//             minHeight: '100vh',
//         }}>
// 
//             {/* --- TOP NAV (UNIFIED) --- */}
//             <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', pt: 1 }}>
//                 <Toolbar sx={{ justifyContent: 'space-between' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8, cursor: 'pointer' }} onClick={() => setPage('home')}>
//                         {/* <OmecaLogoComponent size={90} /> */}
//                         <OmecaLogo size={90} />
// 
//                     </Box>
// 
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                         <ThemeToggleButton />
//                         <Button
//                             variant="outlined"
//                             size="medium"
//                             sx={{
//                                 borderColor: colors.accent,
//                                 color: colors.accent,
//                                 fontWeight: 700,
//                                 textTransform: 'none',
//                                 '&:hover': {
//                                     bgcolor: `${colors.accent}14`,
//                                     borderColor: colors.accent,
//                                 }
//                             }}
//                             onClick={handleRequestInviteClick}
//                         >
//                             Request Invite
//                         </Button>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
// 
//             {/* --- MAIN PAGE CONTENT AREA (Router) --- */}
//             <PageRouter />
// 
//             {/* --- FOOTER --- */}
//             <OmecaAppFooter setPage={setPage} />
//         </Box>
//     );
// };
// 
// // =================================================================
// // 2. APP WRAPPER COMPONENT (FINAL EXPORT)
// // =================================================================
// 
// const AppThemeWrapper = () => {
//     const preferredMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//     const [mode, setMode] = useState(preferredMode);
// 
//     const colorMode = useMemo(
//         () => ({
//             mode,
//             toggleColorMode: () => {
//                 setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//             },
//         }),
//         [mode],
//     );
// 
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
// 
//     return (
//         <ColorModeContext.Provider value={{ ...colorMode, mode }}>
//             <ThemeProvider theme={theme}>
//                 <OmecaLanding />
//             </ThemeProvider>
//         </ColorModeContext.Provider>
//     );
// };
// 
// export default AppThemeWrapper;

import React, { useState, useMemo, useContext, useRef } from 'react';
import {
    AppBar, Toolbar, Container, Box,
    Typography, TextField, Button, IconButton, Link,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';

// --- THEME & CONTEXT ---
import { colors, getDesignTokens } from "./layouts/theme/theme.js";
import { ColorModeContext } from "./layouts/theme/ThemeContext.jsx";
import ThemeToggleButton from "./layouts/ThemeToggleButton.jsx";

// --- UI COMPONENTS ---
import OmecaAppFooter from "./components/ui/AppFooter.jsx";
import OmecaDashboardPreview from "./components/ui/OmecaDashboardPreview.jsx"; // NEW: Import the lightweight preview

// --- PAGE COMPONENTS ---
import OmecaCareersPage from "./components/pages/CareersPage.jsx";
import OmecaCompanyInfoPage from "./components/pages/CompanyInfoPage.jsx";
import OmecaContactPage from "./components/pages/ContactPage.jsx";
import OmecaLedgerAPIPage from "./components/pages/LedgerAPIPage.jsx";
import OmecaLegalPage from "./components/pages/LegalPage.jsx";
import OmecaMarginAlertsPage from "./components/pages/MarginAlertsPage.jsx";
import OmecaPricingPage from "./components/pages/PricingPage.jsx";
import OmecaReconciliationPage from "./components/pages/ReconciliationPage.jsx";
import OmecaBrief from "./components/pages/OmecaBrief.jsx";
import OmecaLogo from "./components/ui/OmecaLogo.jsx";


// --- SECTION COMPONENTS (located in omeca-governance/components/sections/) ---

// 1. Control Crisis component (File: ProblemSolutionComparison.jsx)
import OmecaProblemSolutionComparison 
  from "./omeca-governance/components/sections/ProblemSolutionComparison.jsx"; 

// 2. The Trust Stack component (File: TrustStack.jsx)
import OmecaTrustStack 
  from "./omeca-governance/components/sections/TrustStack.jsx"; 

// 3. Pilot/Enterprise GTM component (File: DeveloperIntegration.jsx)
import OmecaDeveloperIntegration 
  from "./omeca-governance/components/sections/DeveloperIntegration.jsx"; 

// 4. Ecosystem Connect component (File: SupportedIntegrations.jsx)
import OmecaSupportedIntegrations 
  from "./omeca-governance/components/sections/SupportedIntegrations.jsx"; 

// --- GOVERNANCE COMPONENTS ---
// REMOVED: OmecaGovernanceDashboardPage import since it's no longer used as a preview
import OmecaGovernanceWaitlistDialog 
  from "./omeca-governance/components/OmecaGovernanceWaitlistDialog.jsx";

  import OmecaTrustStackPreview 
  from "./omeca-governance/components/pages/OmecaTrustStackPreview.jsx";
  
  

// --- MOTION VARIANTS ---
const fadeInUp = { 
  hidden: { y: 20, opacity: 0 }, 
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  } 
};


// =================================================================
// 1. MAIN APPLICATION ROUTER (OmecaLanding)
// =================================================================

const OmecaLanding = () => {
    const { mode } = useContext(ColorModeContext);

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [page, setPage] = useState('home'); 
    const emailInputRef = useRef(null);

    // --- Form logic remains unchanged ---
    const handleSubmit = () => {
        if (email && email.includes('@') && email.includes('.')) {
            console.log('Omeca invite request:', { email });
            setSubmitted(true);
        } else {
            setSubmitted(false);
            const errorMsg = document.getElementById('emailError');
            if (errorMsg) {
                errorMsg.style.opacity = '1';
                setTimeout(() => (errorMsg.style.opacity = '0'), 4000);
            }
        }
    };

    const handleRequestInviteClick = () => {
        if (emailInputRef.current) {
            emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => emailInputRef.current.focus(), 300);
        }
    };

    const currentColors = colors[mode];

    // --- Page Router Component ---
    const PageRouter = () => {
        React.useEffect(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, [page]);

        switch (page) {
            // Products
            case 'ledger': return <OmecaLedgerAPIPage setPage={setPage} />;
            case 'reconciliation': return <OmecaReconciliationPage setPage={setPage} />;
            case 'alerts': return <OmecaMarginAlertsPage setPage={setPage} />;
            case 'pricing': return <OmecaPricingPage setPage={setPage} />;
            
            // Company
            case 'about':
            case 'blog': return <OmecaCompanyInfoPage setPage={setPage} />;
            case 'careers': return <OmecaCareersPage setPage={setPage} />;
            case 'contact': return <OmecaContactPage setPage={setPage} />;
            case 'brief': return <OmecaBrief setPage={setPage} />;

            case "trust-stack":
    return <OmecaTrustStackPreview setPage={setPage} />;

            
            // Legal & Docs
            case 'privacy':
            case 'cookies':
            case 'terms':
            case 'security':
            case 'documentation': return <OmecaLegalPage setPage={setPage} currentTarget={page} />;
            
            case 'home':
            default:
                return (
                    <>
                        {/* HERO SECTION */}
                        <Box
                            sx={{
                                pt: { xs: 8, md: 9 },
                                pb: { xs: 4, md: 6 },
                                px: { xs: 2, sm: 4 },
                                overflowX: 'hidden',
                                textAlign: 'center',
                                background: `radial-gradient(900px 400px at 50% -10%, ${currentColors.bgGradA} 0%, ${currentColors.bgTop} 60%), linear-gradient(180deg, ${currentColors.bgGradB} 0%, ${currentColors.bgTop} 40%)`
                            }}
                        >
                            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                
                                {/* BRAND HEADER */}
                                <div>
                                    <Typography
                                        component="h1"
                                        sx={{
                                            fontWeight: 1000,
                                            lineHeight: 1.05,
                                            fontSize: "clamp(4rem, 12vw, 9rem)",
                                            letterSpacing: "-0.02em",
                                            mb: 3,
                                            textAlign: "center",
                                            background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        Omeca
                                    </Typography>
                                </div>
                                
                                {/* MAIN HERO HEADLINE */}
                                <div>
<Typography
    variant="h3"
    fontWeight={900}
    sx={{
        fontSize: { xs: "1.8rem", sm: "2.6rem", md: "3.4rem", lg: "3.8rem" },
        wordBreak: "break-word",
        px: { xs: 2, sm: 4 },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: 1.15,
        color: currentColors.textPrimary,
        textAlign: "center",
        mb: 2,
        "& .aiGradient": {
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            fontWeight: 900,
        },
    }}
>
    The <span className="aiGradient">Self-Driving</span> Cognitive ERP
</Typography>

                                </div>

<Typography
    variant="h5"
    align="center"
    sx={{
        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' },
        color: currentColors.textDim,
        px: { xs: 3, md: 0 },
        lineHeight: 1.6,
        fontWeight: 500,
        maxWidth: '720px',
        mx: 'auto',
        mb: 2.5,
    }}
>
    Transforming ERPs from passive record-keeping to continuous, autonomous control.  
    <strong>Omeca</strong> unifies operational truth, real-time close, and verifiable intelligence into a single cognitive system of record.
</Typography>

                            </motion.div>

                            {/* Inline invite form */}
                            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.45 }}>
                                <Box sx={{
                                    mt: { xs: 3, sm: 4 },
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: { xs: 2, sm: 0 },
                                }} id="invite-form-target">
                                    {!submitted ? (
                                        <>
                                            <TextField variant="outlined" placeholder="Your work email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                inputRef={emailInputRef}
                                                InputProps={{ sx: { width: { xs: '250px', sm: '350px' }, borderRadius: '8px 0 0 8px', border: `1px solid ${currentColors.textDim}44`, } }}
                                                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                                            />
                                            <Button variant="contained" size="large" endIcon={<ArrowForwardIosRounded />} onClick={handleSubmit}
                                                sx={{ borderRadius: '0 8px 8px 0', py: 1.3, fontWeight: 800, textTransform: 'none', bgcolor: colors.accent, color: currentColors.bgTop, '&:hover': { bgcolor: colors.accentHover } }}>
                                                Get Started
                                            </Button>
                                        </>
                                    ) : (
                                        <Typography variant="h6" sx={{ mt: 4, color: colors.accent }}>Thanks! We’ll be in touch shortly.</Typography>
                                    )}
                                </Box>
                            </motion.div>

                            {/* Dashboard Preview Placement (Using the new lightweight component) */}
                            {/* <Box sx={{ py: { xs: 2, md: 4 } }}>
                                <OmecaDashboardPreview />
                            </Box> */}
{/* Trust Stack Preview (Core / Ledger / Governance) */}
<Box sx={{ py: { xs: 2, md: 4 } }}>
    <OmecaDashboardPreview 
        setPage={setPage}
        onExplore={() => setPage("trust-stack")}
    />
</Box>



                        </Box>
                        
                        {/* CONTENT SECTIONS - NEW PITCH DECK ORDER (Fixes Issue 1, 4, 5) */}
                        <OmecaProblemSolutionComparison /> 
                        <OmecaTrustStack />              
                        <OmecaDeveloperIntegration setPage={setPage} /> 
                        <OmecaSupportedIntegrations />     
                    </>
                );
        }
    };


    return (
        <Box sx={{
            bgcolor: currentColors.bgTop,
            color: currentColors.textPrimary,
            minHeight: '100vh',
        }}>

            {/* --- TOP NAV (UNIFIED) --- */}
            <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', pt: 1 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8, cursor: 'pointer' }} onClick={() => setPage('home')}>
                        <OmecaLogo size={90} />

                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <ThemeToggleButton />
                        <Button
                            variant="outlined"
                            size="medium"
                            sx={{
                                borderColor: colors.accent,
                                color: colors.accent,
                                fontWeight: 700,
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: `${colors.accent}14`,
                                    borderColor: colors.accent,
                                }
                            }}
                            onClick={handleRequestInviteClick}
                        >
                            Request Invite
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* --- MAIN PAGE CONTENT AREA (Router) --- */}
            <PageRouter />

            {/* --- FOOTER --- */}
            <OmecaAppFooter setPage={setPage} />
        </Box>
    );
};

// =================================================================
// 2. APP WRAPPER COMPONENT (FINAL EXPORT)
// =================================================================

const AppThemeWrapper = () => {
    const preferredMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const [mode, setMode] = useState(preferredMode);

    const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [mode],
    );

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={{ ...colorMode, mode }}>
            <ThemeProvider theme={theme}>
                <OmecaLanding />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default AppThemeWrapper;