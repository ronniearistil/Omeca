// import React, { useState, useMemo, useContext, useRef, useEffect } from 'react';
// import {
//     AppBar, Toolbar, Container, Box, Grid, Paper,
//     Typography, TextField, Button, IconButton, Link,
//     FormControl, InputLabel, Select, MenuItem, FormHelperText
// } from '@mui/material';
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
// 
// // --- Theme and Page Imports (Paths confirmed to work based on the final move) ---
// import { ColorModeContext } from "../styles/ThemeWrapper.jsx";
// import { colors } from "../styles/theme.js";
// 
// 
// // =================================================================
// // 1. RESTORED LOCAL UI AND LAYOUT COMPONENTS
// // =================================================================
// 
// // --- Logo Component (Restored) ---
// const MelucraLogoComponent = ({ size = 36 }) => (
//     <img
//         src="/assets/Melucra/melucra-logo.png"
//         alt="Melucra Logo"
//         width={size}
//         height={size}
//         style={{ display: 'block' }}
//     />
// );
// 
// // --- Theme Toggle Button (Restored) ---
// const ThemeToggleButton = () => {
//     const { mode, toggleColorMode } = useContext(ColorModeContext);
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
// // --- Dashboard Preview Helpers (Restored) ---
// const SimpleGraphLine = ({ color, points }) => (
//     <svg viewBox="0 0 100 20" style={{ width: '100%', height: '50px' }}>
//         <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
//     </svg>
// );
// 
// // --- Dashboard Preview (Restored) ---
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
//     return (
//         <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.1 }}>
//             <Paper elevation={0} sx={{
//                 bgcolor: currentColors.card, p: 3, borderRadius: 3, border: `1px solid ${colors.accent}44`, maxWidth: '1200px', mx: 'auto',
//                 boxShadow: mode === 'dark' ? `0 0 30px rgba(0, 0, 0, 0.4), 0 0 10px ${colors.accent}22` : '0 4px 20px rgba(0,0,0,0.1)',
//                 color: currentColors.textPrimary,
//             }}>
//                 <Box sx={{ display: 'flex', borderBottom: `1px solid ${currentColors.textDim}22`, mb: 3 }}>
//                     {['Overview', 'Ledger', 'Reconciliation', 'Alerts'].map((tab) => (
//                         <Button key={tab} sx={{ color: tab === 'Overview' ? colors.accent : currentColors.textDim, borderBottom: tab === 'Overview' ? '2px solid' : 'none', borderColor: colors.accent, borderRadius: 0, textTransform: 'none', fontWeight: tab === 'Overview' ? 700 : 400, mr: 3, py: 1, }}>
//                             {tab}
//                         </Button>
//                     ))}
//                 </Box>
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
// // --- App Footer (Restored) ---
// const AppFooter = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const footerLinks = [
//         { title: 'Products', links: [{ name: 'Ledger API', target: 'ledger' }, { name: 'Reconciliation', target: 'reconciliation' }, { name: 'Margin Alerts', target: 'alerts' }, { name: 'Pricing', target: 'pricing' }] },
//         { title: 'Company', links: [{ name: 'About', target: 'about' }, { name: 'Careers', target: 'careers' }, { name: 'Blog', target: 'about' }, { name: 'Contact', target: 'contact' }] },
//         { title: 'Legal', links: [{ name: 'Privacy Policy', target: 'privacy' }, { name: 'Cookies', target: 'cookies' }, { name: 'Terms of Service', target: 'terms' }, { name: 'Security', target: 'security' }] },
//     ];
// 
//     return (
//         <Box sx={{ bgcolor: currentColors.bgTop, borderTop: `1px solid ${currentColors.textDim}22` }}>
//             {/* Upper CTA */}
//             <Box sx={{ py: 8, textAlign: 'center', background: `linear-gradient(180deg, ${currentColors.bgGradB}44, ${currentColors.bgTop})` }}>
//                 <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>Ready to get started?</Typography>
//                 <Typography sx={{ color: currentColors.textDim, mt: 1, mb: 4 }}>
//                     Join teams who trust Melucra to power their machine profit.
//                 </Typography>
//                 <Button variant="contained" size="large" sx={{ mt: 1, mr: 2, px: 4, py: 1.2, fontWeight: 800, textTransform: 'none', bgcolor: colors.accent, color: currentColors.bgTop, '&:hover': { bgcolor: colors.accentHover } }} onClick={() => setPage('contact')}>
//                     Get Started &rarr;
//                 </Button>
//                 <Button variant="outlined" size="large" sx={{ mt: 1, px: 4, py: 1.2, fontWeight: 700, textTransform: 'none', borderColor: currentColors.textDim, color: currentColors.textDim, '&:hover': { bgcolor: `${currentColors.textDim}1A` } }} onClick={() => setPage('documentation')}>
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
//                             <MelucraLogoComponent size={32} />
//                             <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>MELUCRA</Typography>
//                         </Box>
//                         <Typography variant="h6" sx={{ mt: 2, maxWidth: 820, mx: 'auto', color: currentColors.textDim }}>
//                             Legacy ERPs Miss the Machine Economy.
//                             Melucra is the First Native AI ERP, Built to Manage Lucra with Clarity.
//                         </Typography>
//                     </Grid>
// 
//                     {/* Link Columns */}
//                     <Grid item xs={12} md={8}>
//                         <Grid container spacing={4}>
//                             {footerLinks.map((col, idx) => (
//                                 <Grid item xs={6} sm={4} key={idx}>
//                                     <Typography variant="subtitle1" fontWeight={700} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                                         {col.title}
//                                     </Typography>
//                                     <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
//                                         {col.links.map((link, linkIdx) => (
//                                             <Link key={linkIdx} onClick={() => setPage(link.target)} underline="none" sx={{ display: 'block', mb: 1, color: currentColors.textDim, '&:hover': { color: colors.accent, cursor: 'pointer' } }}>
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
//                 <Box sx={{ borderTop: `1px solid ${currentColors.textDim}22`, mt: 6, pt: 3, textAlign: 'center' }}>
//                     <Typography variant="caption" sx={{ color: currentColors.textDim }}>
//                         &copy; {new Date().getFullYear()} Melucra. All rights reserved.
//                     </Typography>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };
// 
// // =================================================================
// // 2. RESTORED LOCAL SECTION COMPONENTS
// // =================================================================
// 
// // --- Logo Marquee Helper Component ---
// const LogoMarquee = ({ logos }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
//     const fullLogos = [...logos, ...logos];
// 
//     const marqueeVariants = {
//         animate: {
//             x: ['0%', '-49.9%'],
//             transition: {
//                 x: { duration: 30, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
//             },
//         },
//     };
// 
//     return (
//         <Box sx={{
//             width: '100%', py: 3,
//             background: mode === 'dark' ? `linear-gradient(90deg, ${currentColors.bgTop} 0%, ${currentColors.card} 50%, ${currentColors.bgTop} 100%)` : `linear-gradient(90deg, ${currentColors.bgTop} 0%, ${currentColors.bgGradB} 50%, ${currentColors.bgTop} 100%)`,
//         }}>
//             <motion.div style={{ display: 'flex', width: `${fullLogos.length * 100 / (fullLogos.length / 2)}%` }} variants={marqueeVariants} animate="animate">
//                 {fullLogos.map((name, index) => (
//                     <Box key={index} sx={{ minWidth: { xs: '120px', sm: '200px' }, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', px: { xs: 2, md: 4 } }}>
//                         <Typography variant="h6" fontWeight={700} sx={{ color: currentColors.textDim, opacity: 0.4, letterSpacing: 1, transition: 'color 0.3s', '&:hover': { color: colors.accent, opacity: 1, cursor: 'default' } }}>
//                             {name}
//                         </Typography>
//                     </Box>
//                 ))}
//             </motion.div>
//         </Box>
//     );
// };
// 
// // --- Supported Integrations Section (Restored) ---
// const SupportedIntegrations = () => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
//     const integrations = ['Stripe', 'AWS', 'Google Cloud', 'OpenAI', 'Azure', 'Snowflake', 'Databricks', 'Confluent', 'Vanta', 'GCP'];
// 
//     return (
//         <Container maxWidth={false} disableGutters sx={{ py: { xs: 6, md: 8 }, textAlign: 'center', bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }}>
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ lineHeight: 1.2 }}>
//                     Connect <span style={{ color: colors.lucraGold }}>Agent Work</span> Instantly
//                 </Typography>
//                 <Typography sx={{ color: currentColors.textDim, mt: 1 }}>
//                     Unify agent activity and costs in one ERP built for the machine economy.
//                 </Typography>
//             </motion.div>
//             <LogoMarquee logos={integrations} />
//         </Container>
//     );
// };
// 
// // --- Profit Flow Section (Restored) ---
// const ProfitFlow = () => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const steps = [
//         { title: 'Ingest Activity', body: 'Real-time ledger updates for every machine event.', icon: <SyncAltRounded /> },
//         { title: 'Calculate Value', body: 'Apply dynamic pricing and reconciliation logic.', icon: <AccountBalanceWalletRoundedIcon /> },
//         { title: 'Drive Lucra', body: 'Automate invoicing, margin protection, and reporting.', icon: <AttachMoneyRoundedIcon /> },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
//             <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }}>
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 4 }}>
//                     Ledger &rarr; Reconciliation &rarr; Profit
//                 </Typography>
//                 <Typography sx={{ color: currentColors.textDim, mb: 4 }}>
//                     Stop burning cycles on fragile finance logic. Melucra eliminates reconciliation risk and protects margin in real time—so you can focus on growth.
//                 </Typography>
//             </motion.div>
//             <Grid container spacing={4} justifyContent="center">
//                 {steps.map((step, index) => (
//                     <Grid item xs={12} md={4} key={index}>
//                         <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true, amount: 0.6 }}>
//                             <Paper sx={{ p: 3, borderRadius: 2, bgcolor: currentColors.card, height: '100%', border: `1px solid ${currentColors.textDim}22`, position: 'relative' }}>
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
// // --- Problem/Solution Comparison Section (Restored) ---
// const ComparisonCard = ({ items, isSolution }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
//     return (
//         <Paper sx={{
//             p: 4, height: '100%', borderRadius: 3,
//             bgcolor: isSolution ? `${colors.successGreen}10` : `${colors.errorRed}10`,
//             border: `1px solid ${isSolution ? colors.successGreen : colors.errorRed}44`,
//             color: currentColors.textPrimary,
//         }}>
//             <Typography variant="h6" fontWeight={800} sx={{ color: isSolution ? colors.successGreen : colors.errorRed, mb: 2 }}>
//                 {isSolution ? 'With Melucra' : 'Without Melucra'}
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
// };
// 
// const ProblemSolutionComparison = () => {
//     const problems = [
//         'Legacy ERPs don’t account for AI agents or machine output.',
//         'Leaders can’t track if agent spend aligns with productivity.',
//         'Finance and operations rely on manual workarounds that don’t scale.',
//         'Governance and compliance gaps widen as agent use expands.',
//     ];
//     const solutions = [
//         'The first AI-native ERP built to manage agent work, compute, and capital in one ledger.',
//         'A trusted system of record for the machine economy — not a retrofit of human workflows.',
//         'Zero billing overhead with built-in reconciliation.',
//         'Real-time visibility into costs, output, and financial impact of AI agents.',
//     ];
//     
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
//             <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }}>
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 1 }}>
//                     Legacy ERPs<span style={{ color: colors.errorRed }}> Were NOT Built for AI Agents</span>
//                 </Typography>
//                 <Typography sx={{ color: currentColors.textDim, mb: 4 }}>
//                     Traditional systems retrofit AI into human workflows. Melucra is the first ERP built for agents, compute, and the machine economy from day one.
//                 </Typography>
//             </motion.div>
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
// // --- Developer Integration Section (Restored) ---
// const DeveloperIntegration = () => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const steps = [
//         { n: 1, title: 'Install the SDK', body: 'Add our lightweight SDK to your project with a single command.' },
//         { n: 2, title: 'Replace Core Hooks', body: 'Update your existing finance logic hooks with our simple wrappers.' },
//         { n: 3, title: 'Start Tracking', body: 'Immediately see usage analytics, costs, and performance metrics in your dashboard.' },
//     ];
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
//   accountId: "user-123",
//   event: "model.inference",
//   units: 4200, // tokens or compute
//   value: 0.05, // USD per unit
// });
// 
// if (ledgerEntry.marginAlert) {
//   send_critical_alert(ledgerEntry.marginAlert);
// }
//     `.trim();
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
//             <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }}>
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 1, textAlign: 'center' }}>
//                     ERP Integration <span style={{ color: colors.accent }}>Three Lines of Code</span>
//                 </Typography>
//                 <Typography sx={{ color: currentColors.textDim, mb: 4, textAlign: 'center' }}>
//                     A drop-in replacement for spreadsheets and brittle custom finance logic.
//                 </Typography>
//             </motion.div>
//             <Grid container spacing={4}>
//                 <Grid item xs={12} md={6}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//                         {steps.map((step, index) => (
//                             <motion.div key={step.n} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true, amount: 0.8 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                     <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: colors.lucraGold, color: currentColors.card, display: 'grid', placeItems: 'center', fontWeight: 800, mr: 2 }}>
//                                         {step.n}
//                                     </Box>
//                                     <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>{step.title}</Typography>
//                                 </Box>
//                                 <Typography variant="body2" sx={{ ml: 6, color: currentColors.textDim }}>{step.body}</Typography>
//                             </motion.div>
//                         ))}
//                         <Button variant="outlined" size="large" sx={{ mt: 3, borderColor: colors.accent, color: colors.accent, '&:hover': { bgcolor: `${colors.accent}14` } }}>
//                             View Integration Guide &rarr;
//                         </Button>
//                     </Box>
//                 </Grid>
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
// // 3. RESTORED LOCAL PAGE COMPONENTS
// // =================================================================
// 
// // --- BackButton utility function (Restored) ---
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
// // --- LEDGER API Page Component (Restored) ---
// const LedgerAPIPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <StorageRoundedIcon fontSize="large" />, title: "Immutable Ledger Core", desc: "Every machine event is cryptographically signed and stored in an immutable ledger, providing a complete, non-repudiable audit trail for financial compliance." },
//         { icon: <PolicyRoundedIcon fontSize="large" />, title: "Real-Time Event Ingestion", desc: "Low-latency API ingestion built for high-throughput machine data streams, ensuring your reconciliation and margin calculations are always current." },
//         { icon: <StorageRoundedIcon fontSize="large" />, title: "Schema Flexibility", desc: "Handle diverse data structures from multiple cloud providers and proprietary systems. Normalize compute, usage, and revenue signals automatically." },
//     ];
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>Ledger API: The Core of Machine Finance</Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>Transform chaotic usage data into the single source of truth for your AI-native ERP.</Typography>
//             </motion.div>
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
// // --- RECONCILIATION Page Component (Restored) ---
// const ReconciliationPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <AccountBalanceWalletRoundedIcon fontSize="large" />, title: "Automated Financial Matching", desc: "Match platform consumption against payment gateways (Stripe, etc.) and vendor invoices to eliminate end-of-month reconciliation debt instantly." },
//         { icon: <SyncAltRounded fontSize="large" />, title: "Latency-Free Auditing", desc: "Validate transaction flow in real-time. Melucra ensures every penny of revenue corresponds to a machine event without manual intervention." },
//         { icon: <CheckCircleOutlineRounded fontSize="large" />, title: "Discrepancy Flagging", desc: "Automatically flag and report any mismatch between expected revenue and reported usage, protecting against margin leakage and billing errors." },
//     ];
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>The Reconciliation Engine</Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>Achieve instant, auditable clarity between your machine costs and your financial revenue.</Typography>
//             </motion.div>
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
// // --- MARGIN ALERTS Page Component (Restored) ---
// const MarginAlertsPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <AttachMoneyRoundedIcon fontSize="large" />, title: "Real-Time Profit Protection", desc: "Set explicit margin thresholds (e.g., 30%) and receive immediate alerts when usage patterns put your projected profit at risk." },
//         { icon: <TrendingUp fontSize="large" />, title: "Predictive Forecasting", desc: "AI models analyze historical and current usage to forecast cost spikes and revenue drops, giving you hours, not days, to adjust pricing or infrastructure." },
//         { icon: <CodeRoundedIcon fontSize="large" />, title: "Automated Control Hooks", desc: "Integrate margin alerts directly into your operations pipeline to throttle high-cost users or automatically switch compute vendors when margins falls." },
//     ];
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>Predictive Margin Alerts</Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>Turn finance from a reporting function into a protective, profit-maximizing shield for your business.</Typography>
//             </motion.div>
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
// // --- PRICING Page Component (Restored) ---
// const PricingPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const tiers = [
//         { name: "Starter", price: "Free", desc: "For prototyping and early-stage projects. Includes core Ledger API and documentation access.", features: ["Up to 1M events/month", "Standard reconciliation", "Community support"] },
//         { name: "Growth", price: "$499/mo", desc: "For scaling teams that need robust tracking and basic alerts.", features: ["Up to 50M events/month", "Predictive Margin Alerts", "Priority support"] },
//         { name: "Enterprise", price: "Custom", desc: "Full suite for large organizations with complex compliance needs.", features: ["Unlimited volume", "Full SOC 2 compliance", "Dedicated Account Manager", "Custom pricing models"] },
//     ];
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>Transparent Pricing, Maximum Lucra</Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>Pay only for the scale you need, and nothing for the headache.</Typography>
//             </motion.div>
//             <Grid container spacing={4} alignItems="stretch">
//                 {tiers.map((tier, index) => (
//                     <Grid item xs={12} md={4} key={index}>
//                         <Paper sx={{ p: 4, bgcolor: currentColors.card, height: '100%', border: index === 1 ? `3px solid ${colors.accent}` : `1px solid ${currentColors.textDim}33` }}>
//                             <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>{tier.name}</Typography>
//                             <Typography variant="h4" fontWeight={900} color={colors.lucraGold} sx={{ my: 2 }}>{tier.price}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ minHeight: 60 }}>{tier.desc}</Typography>
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
// // --- COMPANY INFO Page Component (Restored) ---
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
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>The Melucra Story</Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>We are defining the next generation of enterprise financial tools.</Typography>
//             </motion.div>
//             <Grid container spacing={4}>
//                 {sections.map((item, index) => (
//                     <Grid item xs={12} md={6} key={index}>
//                         <Paper sx={{ p: 3, bgcolor: currentColors.card, height: '100%', borderTop: `4px solid ${colors.lucraGold}` }}>
//                             <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>{item.title}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mt: 1 }}>{item.content}</Typography>
//                             <Button onClick={() => setPage(item.target)} size="small" sx={{ mt: 2, color: colors.accent, fontWeight: 700 }}>
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
// // --- CAREERS Page Component (Restored) ---
// const CareersPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const positions = [
//         { title: "Senior Backend Engineer (Go/Rust)", dept: "Engineering", focus: "Building the immutable ledger and reconciliation core." },
//         { title: "Financial Data Scientist", dept: "Data & AI", focus: "Developing predictive margin alert models and risk scoring." },
//         { title: "VP of Product Marketing", dept: "Marketing", focus: "Driving GTM strategy for our core ERP and API products." },
//     ];
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>Careers: Build the Future of Finance</Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>We are looking for builders who thrive at the intersection of AI, finance, and engineering excellence.</Typography>
//             </motion.div>
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
//         </Container>
//     );
// };
// 
// // --- CONTACT Page Component (Restored) ---
// const INDUSTRY_OPTIONS = ['Financial Services', 'Technology & SaaS', 'E-commerce & Retail', 'Manufacturing & IoT', 'Logistics & Supply Chain', 'Other'];
// const INITIAL_FORM_DATA = { firstName: '', lastName: '', company: '', industry: '', email: '', query: '' };
// const useContactForm = (setFormSubmitted) => {
//     const [formData, setFormData] = useState(INITIAL_FORM_DATA);
//     const [errors, setErrors] = useState({});
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     
//     // NOTE: This hook was part of your original file and must be defined if imported/used
//     const validateForm = () => { 
//         let newErrors = {};
//         if (!formData.firstName) newErrors.firstName = 'Required.';
//         if (!formData.email) newErrors.email = 'Required.';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0; 
//     }; 
//     const handleInputChange = (e) => { 
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name]) { setErrors(prev => ({ ...prev, [name]: '' })); }
//     };
//     const handleContactSubmit = (e) => { 
//         e.preventDefault(); 
//         if (!validateForm()) return;
//         setFormSubmitted(true);
//         setTimeout(() => setFormSubmitted(false), 5000);
//     };
//     return { formData, errors, handleInputChange, handleContactSubmit };
// };
// const ContactPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const { formData, errors, handleInputChange, handleContactSubmit } = useContactForm(setFormSubmitted);
//     const currentColors = colors[mode];
// 
//     const inputStyles = useMemo(() => ({
//         '& .MuiOutlinedInput-root': { bgcolor: mode === 'dark' ? currentColors.bgTop : currentColors.bgGradA, color: currentColors.textPrimary, borderRadius: 1.5, transition: 'border-color 0.3s', '& fieldset': { borderColor: `${currentColors.textDim}44` }, '&.Mui-focused fieldset': { borderColor: colors.accent, borderWidth: '2px' }, },
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
//     return (
//         <Container maxWidth="sm" sx={{ py: { xs: 6, md: 8 }, bgcolor: currentColors.bgTop, minHeight: '80vh' }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 1, lineHeight: 1.1 }}>Book a Demo to See <span style={{ color: colors.lucraGold }}>Melucra</span></Typography>
//             </motion.div>
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
//                 <Paper elevation={8} sx={{ p: { xs: 3, sm: 4 }, bgcolor: currentColors.card, borderRadius: 3, border: `2px solid ${colors.accent}44`, boxShadow: mode === 'dark' ? `0 10px 30px rgba(0, 0, 0, 0.5)` : `0 5px 20px rgba(0,0,0,0.1)`, }}>
//                     {formSubmitted ? (
//                         <Box sx={{ textAlign: 'center', py: 6 }}>
//                             <CheckCircleOutlineRounded sx={{ fontSize: 72, color: colors.successGreen }} />
//                             <Typography variant="h5" fontWeight={800} color={colors.successGreen} sx={{ mt: 3, mb: 1 }}>Request Confirmed.</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 3 }}>We'll be in touch shortly to schedule your live demonstration.</Typography>
//                             <Button variant="text" onClick={() => setPage('home')} sx={{ color: colors.accent, fontWeight: 700 }}>Return Home &rarr;</Button>
//                         </Box>
//                     ) : (
//                         <Grid container spacing={2.5} component="form" onSubmit={handleContactSubmit}>
//                             {formFields.map(field => (
//                                 <Grid item xs={12} sm={field.grid} key={field.name}>
//                                     {field.select ? (
//                                         <FormControl fullWidth required error={!!errors[field.name]} sx={inputStyles}><InputLabel>{field.label}</InputLabel>
//                                             <Select label={field.label} name={field.name} value={formData[field.name]} onChange={handleInputChange} inputProps={{ sx: { bgcolor: mode === 'dark' ? currentColors.bgTop : currentColors.bgGradA } }}>
//                                                 {INDUSTRY_OPTIONS.map((industry) => (<MenuItem key={industry} value={industry}>{industry}</MenuItem>))}
//                                             </Select>
//                                             {!!errors[field.name] && <FormHelperText>{errors[field.name]}</FormHelperText>}
//                                         </FormControl>
//                                     ) : (
//                                         <TextField fullWidth label={field.label} name={field.name} type={field.type || 'text'} value={formData[field.name]} onChange={handleInputChange} variant="outlined" required multiline={field.multiline} rows={field.rows} error={!!errors[field.name]} helperText={errors[field.name]} sx={inputStyles}/>
//                                     )}
//                                 </Grid>
//                             ))}
//                             <Grid item xs={12} sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
//                                 <Button variant="contained" size="large" type="submit" sx={{ bgcolor: colors.accent, color: currentColors.bgTop, fontWeight: 700, minWidth: 160, '&:hover': { bgcolor: colors.accentHover } }}>Submit Request</Button>
//                                 <Typography variant="body2" color={currentColors.textDim}>or</Typography>
//                                 <Button variant="outlined" size="large" component={Link} href="mailto:luca@meluca.com" sx={{ color: colors.lucraGold, borderColor: colors.lucraGold, textTransform: 'none', fontWeight: 600, '&:hover': { borderColor: colors.lucraGold + 'AA', bgcolor: colors.lucraGold + '11' } }}>Email us</Button>
//                             </Grid>
//                         </Grid>
//                     )}
//                 </Paper>
//                 <Box sx={{ textAlign: 'center', mt: 5 }}>
//                     <Typography variant="body2" color={currentColors.textDim}>Need technical details? 
//                         <Link onClick={() => setPage('documentation')} underline="hover" sx={{ ml: 1, color: colors.accent, cursor: 'pointer', fontWeight: 600 }}>View Developer Docs</Link>
//                     </Typography>
//                 </Box>
//             </motion.div>
//         </Container>
//     );
// };
// 
// // --- LEGAL/SECURITY Page Component (Restored) ---
// const LegalPage = ({ setPage, currentTarget }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const getPageTitle = (target) => {
//         switch (target) {
//             case 'privacy': return "Privacy Policy: Data Integrity";
//             case 'cookies': return "Cookie Policy";
//             case 'terms': return "Terms of Service";
//             case 'security': return "Security & Compliance Center";
//             default: return "Documentation & Compliance";
//         }
//     };
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
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>{getPageTitle(currentTarget)}</Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>As an ERP provider, Melucra is committed to rigorous security, data integrity, and regulatory compliance.</Typography>
//             </motion.div>
//             <Paper sx={{ p: 4, bgcolor: currentColors.card, border: `1px solid ${currentColors.textDim}22` }}>
//                 <Typography variant="h5" fontWeight={700} color={currentColors.textPrimary} sx={{ mb: 2 }}>{getPageTitle(currentTarget).toUpperCase()}</Typography>
//                 <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 3 }}>{getPageContent(currentTarget)}</Typography>
//                 <Link onClick={() => setPage('home')} sx={{ color: colors.accent, cursor: 'pointer', fontWeight: 700 }}>Return to Melucra Home</Link>
//             </Paper>
//         </Container>
//     );
// };
// 
// 
// // =================================================================
// // MAIN APPLICATION ROUTER (STATE, ROUTING, AND RENDER)
// // =================================================================
// 
// const MelucraAppRouter = () => {
//     // --- State and Handlers (Centralized logic) ---
//     const { mode } = useContext(ColorModeContext);
//     const [email, setEmail] = useState('');
//     const [submitted, setSubmitted] = useState(false);
//     const [page, setPage] = useState('home'); 
//     const emailInputRef = useRef(null);
//     const currentColors = colors[mode];
//     
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, [page]);
// 
//     const handleSubmit = () => {
//         if (email && email.includes('@') && email.includes('.')) {
//             console.log('Melucra invite request:', { email });
//             setSubmitted(true);
//         } else {
//             alert("Please enter a valid email address.");
//         }
//     };
// 
//     const handleRequestInviteClick = () => {
//         if (page !== 'home') {
//             setPage('home');
//             setTimeout(() => {
//                 if (emailInputRef.current) {
//                     emailInputRef.current.focus();
//                 }
//             }, 50); 
//         } else if (emailInputRef.current) {
//              emailInputRef.current.focus();
//         }
//     };
// 
// 
//     // --- Page Router Logic (Uses restored components) ---
//     const PageRouter = () => {
//         switch (page) {
//             // Products
//             case 'ledger': return <LedgerAPIPage setPage={setPage} />;
//             case 'reconciliation': return <ReconciliationPage setPage={setPage} />;
//             case 'alerts': return <MarginAlertsPage setPage={setPage} />;
//             case 'pricing': return <PricingPage setPage={setPage} />;
// 
//             // Company
//             case 'about':
//             case 'blog':
//                 return <CompanyInfoPage setPage={setPage} currentTarget={page} />;
//             case 'careers': return <CareersPage setPage={setPage} />;
//             case 'contact': return <ContactPage setPage={setPage} />;
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
//                 // Home Page Content (Inline rendering of restored sections)
//                 return (
//                     <>
//                         {/* HERO SECTION */}
//                         <Box sx={{
//                             pt: { xs: 8, md: 9 }, pb: { xs: 6, md: 8 }, textAlign: 'center',
//                             background: `radial-gradient(1200px 600px at 50% -10%, ${currentColors.bgGradA} 0%, ${currentColors.bgTop} 60%), linear-gradient(180deg, ${currentColors.bgGradB} 0%, ${currentColors.bgTop} 40%)`
//                         }}>
//                             <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//                                 <Typography variant="h2" fontWeight={500} sx={{
//                                     fontFamily: 'Inter, sans-serif', lineHeight: 1.1, color: currentColors.textPrimary,
//                                     '& span': { background: 'linear-gradient(90deg, #00E5BE, #66CCFF, #E6F4F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }
//                                 }}>
//                                     The AI-native ERP for the <span style={{ color: colors.lucraGold }}>Machine Economy</span>
//                                 </Typography>
//                             </motion.div>
// 
//                             <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
//                                 <Typography variant="h6" sx={{ mt: 2, maxWidth: 720, mx: 'auto', px: { xs: 2, md: 0 }, color: currentColors.textDim, textAlign: 'center' }}>
//                                     <span style={{ background: 'linear-gradient(90deg, #00E5BE, #66CCFF, #E6F4F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600, display: 'inline-block' }}>Melucra</span> is the first ERP for AI agents bringing clarity to spend, usage, and reporting.
//                                 </Typography>
//                             </motion.div>
// 
//                             {/* Inline invite form */}
//                             <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.45 }}>
//                                 <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }} id="invite-form-target">
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
//                             <Container maxWidth="lg" sx={{ mt: 6 }}><DashboardPreview /></Container>
//                         </Box>
// 
//                         {/* CONTENT SECTIONS (Uses restored local definitions) */}
//                         <SupportedIntegrations />
//                         <ProfitFlow />
//                         <ProblemSolutionComparison />
//                         <DeveloperIntegration />
//                     </>
//                 );
//         }
//     };
// 
// 
//     // --- Final Render of the Router ---
//     return (
//         <Box sx={{
//             bgcolor: currentColors.bgTop,
//             color: currentColors.textPrimary,
//             minHeight: '100vh',
//         }}>
// 
//             {/* --- TOP NAV (Uses restored local components) --- */}
//             <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', pt: 1 }}>
//                 <Toolbar sx={{ justifyContent: 'space-between' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => setPage('home')}>
//                         <MelucraLogoComponent size={36} />
//                         <Typography variant="h6" fontWeight={800} letterSpacing={0.5} color={currentColors.textPrimary}>MELUCRA</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <ThemeToggleButton />
//                         <Button 
//                             variant="outlined" size="medium" sx={{ borderColor: colors.accent, color: colors.accent, fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: `${colors.accent}14`, borderColor: colors.accent } }}
//                             onClick={handleRequestInviteClick}>
//                             Request Invite
//                         </Button>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
// 
//             {/* --- MAIN PAGE CONTENT AREA --- */}
//             <PageRouter />
// 
//             {/* --- FOOTER (Uses restored local component) --- */}
//             <AppFooter setPage={setPage} />
//         </Box>
//     );
// };
// 
// export default MelucraAppRouter;

// src/components/MelucraAppRouter.jsx
import React, { useEffect } from 'react';

// Import Page Components
import CareersPage from './pages/CareersPage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import ContactPage from './pages/ContactPage';
import LedgerAPIPage from './pages/LedgerAPIPage';
import LegalPage from './pages/LegalPage';
import MarginAlertsPage from './pages/MarginAlertsPage';
// import MelucraDashboardConnectedPage from './pages/MelucraDashboardConnectedPage'; // If needed
import PricingPage from './pages/PricingPage';
import ReconciliationPage from './pages/ReconciliationPage';

// Import Home Page Section Components
import DeveloperIntegration from './sections/DeveloperIntegration';
import ProblemSolutionComparison from './sections/ProblemSolutionComparison';
import ProfitFlow from './sections/ProfitFlow';
import SupportedIntegrations from './sections/SupportedIntegrations';
import DashboardPreview from './ui/DashboardPreview'; // Assuming this is part of the home page view

// Import Hero section components or define Hero here if it wasn't decoupled
// For simplicity, assuming Hero related JSX is directly in MelucraLanding for now

/**
 * Handles routing between different page views and the home page sections.
 * @param {object} props - Component props.
 * @param {string} props.currentPage - The identifier for the current page/view to display.
 * @param {function} props.setPage - Callback function to update the current page state.
 */
const MelucraAppRouter = ({ currentPage, setPage }) => {
    // Effect to scroll to the top when the page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Render component based on the currentPage prop
    switch (currentPage) {
        // Product Pages
        case 'ledger':
            return <LedgerAPIPage setPage={setPage} />;
        case 'reconciliation':
            return <ReconciliationPage setPage={setPage} />;
        case 'alerts':
            return <MarginAlertsPage setPage={setPage} />;
        case 'pricing':
            return <PricingPage setPage={setPage} />;

        // Company Pages
        case 'about': // Assuming 'about' and 'blog' might share a component or layout
        case 'blog':
            return <CompanyInfoPage setPage={setPage} />;
        case 'careers':
            return <CareersPage setPage={setPage} />;
        case 'contact':
            return <ContactPage setPage={setPage} />;

        // Legal & Docs Pages
        case 'privacy':
        case 'cookies':
        case 'terms':
        case 'security':
        case 'documentation':
            // Pass the specific target page to LegalPage for content differentiation
            return <LegalPage setPage={setPage} currentTarget={currentPage} />;

        // Home Page View
        case 'home':
        default:
            // Render the sequence of sections that make up the home page
            return (
                <>
                    {/* Note: Hero Section JSX likely remains in MelucraLanding.jsx */}
                    {/* The router only handles content *below* the hero/nav */}
                    <DashboardPreview /> {/* Included as part of home page content */}
                    <SupportedIntegrations />
                    <ProfitFlow />
                    <ProblemSolutionComparison />
                    <DeveloperIntegration setPage={setPage} /> {/* Pass setPage if needed */}
                </>
            );
    }
};

export default MelucraAppRouter;