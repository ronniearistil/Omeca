// // Omeca/pages/OmecaDashboardPage.jsx - FINAL DEFINITIVE & FUNCTIONAL VERSION (STORYBOARD)
// 
// import React, { useState, useMemo, useContext, useEffect, useCallback } from 'react';
// import {
//     ThemeProvider, createTheme, Box, Typography, Button, IconButton, Paper, Grid,
//     List, ListItem, ListItemText, Divider, Chip, CssBaseline, Tooltip, Dialog, DialogTitle, DialogContent
// } from '@mui/material';
// import { motion, AnimatePresence } from 'framer-motion';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import BoltIcon from '@mui/icons-material/Bolt';
// import PeopleIcon from '@mui/icons-material/People';
// import GavelIcon from '@mui/icons-material/Gavel';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import { styled } from '@mui/material/styles';
// 
// 
// // --- Color Palette and Configuration (WCAG Readability Enhanced) ---
// export const colors = {
//     accent: '#00E5BE',
//     lucraGold: '#D4AF37',
//     errorRed: '#FF4136',
//     successGreen: '#2ECC40',
//     logoDark: '#1A334A',
//     dark: {
//         bgTop: '#1A2433',
//         bgGradA: '#2A344A',
//         bgGradB: '#111827',
//         card: '#243040',
//         textDim: 'rgba(255,255,255,0.85)', // Enhanced readability
//         textPrimary: '#F0F3F7',
//     },
//     light: {
//         bgTop: '#F8F9FA',
//         bgGradA: '#E6F4F1',
//         bgGradB: '#D8E8E6',
//         card: '#FFFFFF',
//         textDim: 'rgba(0,0,0,0.82)', // Enhanced readability
//         textPrimary: '#1F2937',
//     }
// };
// 
// // --- Gradient Utility & Theme Utilities (Unchanged) ---
// const GradientText = styled(Typography)(({ theme }) => ({
//     background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     display: 'inline',
//     fontWeight: theme.typography.fontWeightBold,
// }));
// 
// export const getDesignTokens = (mode) => ({
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
//     typography: {
//         fontFamily: 'Roboto, sans-serif',
//         h3: { fontSize: '2.5rem' },
//         h5: { fontSize: '1.4rem' },
//         body1: { fontSize: '1rem' },
//     },
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 contained: {
//                     color: mode === 'dark' ? colors.dark.bgTop : colors.light.bgTop,
//                 },
//             },
//         },
//         MuiPaper: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: colors[mode].card,
//                 }
//             }
//         }
//     },
// });
// 
// export const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'dark' });
// 
// const ThemeWrapper = ({ children }) => {
//     const [mode, setMode] = useState('dark');
//     const colorMode = useMemo(
//         () => ({
//             mode,
//             toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
//         }),
//         [mode]
//     );
//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
// 
//     return (
//         <ColorModeContext.Provider value={{ ...colorMode, mode }}>
//             <ThemeProvider theme={theme}>
//                 <CssBaseline />
//                 {children}
//             </ThemeProvider>
//         </ColorModeContext.Provider>
//     );
// };
// // --- Framer Motion Variants (Unchanged) ---
// const fadeInUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } };
// const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
// 
// // --- Mock Data Sources (UPDATED) ---
// const agentPool = [
//     { id: '1', name: 'GenAI_Agent_01', action: 'API Call: GPT-4o-mini', cost: 0.015, status: 'Audited', category: 'R&D', timestamp: '2025-09-30T10:01:22Z', model_tokens: 5000, compliance_rule: 'P&L-CAT-101', chain_id: '0x1A2B3C...D4E5F6', raw_log: '{"source":"OpenAI","api":"GPT-4o-mini","tokens":5000}' },
//     { id: '2', name: 'AutoDev_Agent', action: 'Compute: Kubernetes Pod (AWS)', cost: 0.35, status: 'Audited', category: 'Core Ops', timestamp: '2025-09-30T10:01:25Z', input_size_mb: 45, compliance_rule: 'SEC-102', chain_id: '0x2B3C4D...F6A7B8', raw_log: '{"service":"AWS/EC2","instance":"k8s-pod-7","cost":0.35,"user":"system"}' },
//     { id: '3', name: 'DataSync_Robot', action: 'Database Write Operation', cost: 0.001, status: 'Audited', category: 'Core Ops', timestamp: '2025-09-30T10:01:28Z', compliance_rule: 'P&L-CAT-101', chain_id: '0x3C4D5E...A7B8C9', raw_log: '{"db_type":"Postgres","action":"WRITE","volume":1}' },
//     { id: '4', name: 'Compliance_Bot', action: 'Data Transfer (Azure)', cost: 0.11, status: 'Audited', category: 'G&A', timestamp: '2025-09-30T10:01:38Z', compliance_rule: 'REG-300', chain_id: '0x4D5E6F...B8C9D0', raw_log: '{"service":"Azure Data Lake","bytes":110000,"region":"US-West"}' },
//     { id: '5', name: 'Shadow_Compute', action: 'Compute: Unallocated GPU (GCP)', cost: 1.50, status: 'Pending Audit', category: 'Leakage', timestamp: '2025-09-30T10:01:40Z', compliance_rule: 'RULE-VIOLATION-001', chain_id: '0x5E6F70...C9D0E1', raw_log: '{"error":"Missing Cost Center Tag","user":"anon_process"}' },
// ];
// 
// // --- ATOMIC AUDIT LOG MODAL (STORYBOARD IMPLEMENTATION - FIXES SCOPE ERROR) ---
// const AtomicAuditLogModal = ({ isOpen, handleClose, entry }) => {
//     const { mode } = useContext(ColorModeContext);
// 
//     // Ensure all hooks are called unconditionally at the top level
//     const [stage, setStage] = useState(1);
// 
//     const isTransaction = entry && entry.chain_id !== undefined;
// 
//     // Reset stage when modal opens for a new transaction
//     useEffect(() => {
//         if (isOpen && isTransaction) {
//             setStage(1);
//         }
//     }, [isOpen, isTransaction]);
// 
//     if (!entry) return null; // Exit early after hooks are called
// 
//     const statusIcon = entry.status === 'Audited' ? <CheckCircleOutlineRounded sx={{ color: colors.successGreen }} /> : <ErrorOutlineIcon sx={{ color: colors.errorRed }} />;
//     const statusText = entry.status === 'Audited' ? 'AUDIT PASSED: Transaction Reconciled' : 'AUDIT FAILED: Requires Manual Review';
// 
//     // Define finalDestination here where it's immediately available to the component
//     // We will define it inside renderContent if needed, or pass it explicitly.
//     // However, the error is inside the return of renderContent. Let's fix that.
// 
//     const DetailItem = ({ label, value, color = 'textPrimary' }) => (
//         <Box sx={{ mb: 1, borderBottom: `1px dashed ${colors[mode].textDim}22` }}>
//             <Typography variant="caption" color="textSecondary">{label}</Typography>
//             <Typography variant="body1" fontWeight={600} color={color} sx={{ wordBreak: 'break-all' }}>{value}</Typography>
//         </Box>
//     );
// 
//     const renderContent = () => {
//         const finalDestination = entry.status === 'Audited' ? 'GL (General Ledger) Chained' : 'Quarantine Queue'; // Defined locally for stage 3
// 
//         if (!isTransaction) {
//             // Mock Allocation/Metric Drill-Down Content (Stage 3+)
//             return (
//                 <Grid item xs={12}>
//                     <Typography variant="h6" sx={{ color: colors.accent, mb: 1 }}>
//                         Data Source Trace:
//                     </Typography>
//                     <Typography variant="body1" sx={{ color: colors[mode].textPrimary, mb: 2 }}>
//                         {entry.description || "Melucra is demonstrating the linkage between this aggregated metric and its underlying, validated Machine Ledger entries."}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                         This view confirms the integrity of your P&L segmentation. In production, this opens a filtered view of the Machine Ledger Stream.
//                     </Typography>
//                 </Grid>
//             );
//         }
// 
//         switch (stage) {
//             case 1: // RAW INGEST (The Problem)
//                 return (
//                     <Grid item xs={12}>
//                         <Typography variant="h6" color={colors.errorRed} sx={{ mb: 1 }}>Stage 1: Raw Ingest (The Problem)</Typography>
//                         <DetailItem label="Source Log (Untagged)" value={entry.raw_log} color={colors.errorRed} />
//                         <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//                             This is the raw, unvalidated telemetry captured from the cloud/API endpoint. **It has no financial identity**—it's just a raw cost that creates the audit blind spot.
//                         </Typography>
//                     </Grid>
//                 );
//             case 2: // RECONCILIATION (The IP/Audit)
//                 return (
//                     <>
//                         <Grid item xs={6}>
//                             <Typography variant="h6" color={colors.lucraGold} sx={{ mb: 1 }}>Stage 2: Identity & Cost Audit</Typography>
//                             <DetailItem label="Agent ID Verified" value={entry.name} />
//                             <DetailItem label="Action Type" value={entry.action} />
//                             <DetailItem label="Atomic Cost Verified" value={`$${entry.cost}`} color={colors.accent} />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Typography variant="h6" color={colors.lucraGold} sx={{ mb: 1 }}>Compliance Check</Typography>
//                             <DetailItem label="Compliance Rule Checked" value={entry.compliance_rule} />
//                             <DetailItem label="Audit Chain Hash" value={entry.chain_id} color={colors.accent} />
//                             <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//                                 Melucra's intelligence has verified the identity and applied compliance rules.
//                             </Typography>
//                         </Grid>
//                     </>
//                 );
//             case 3: // NORMALIZATION & FINAL REPORT (The Solution)
//                 return (
//                     <>
//                         <Grid item xs={6}>
//                             <Typography variant="h6" color={colors.successGreen} sx={{ mb: 1 }}>Stage 3: Anchor to Ledger & Explain Decision</Typography>
//                             <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                                 Each ledger record includes its causal trace — the “why” behind every decision.
//                             </Typography>
// 
//                             <DetailItem label="Policy Trace" value={entry.category} />
//                             <DetailItem label="Final Destination" value={finalDestination} color={entry.status === 'Audited' ? colors.successGreen : colors.errorRed} />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Typography variant="h6" color={colors.successGreen} sx={{ mb: 1 }}>Business Value</Typography>
//                             <DetailItem label="Time Saved" value="45 Minutes (Per Entry)" />
//                             <DetailItem label="Financial Status" value={entry.status === 'Audited' ? 'GL Ready' : 'Leakage Blocked'} color={entry.status === 'Audited' ? colors.successGreen : colors.errorRed} />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Typography variant="body1" color={colors.accent} sx={{ mt: 2, textAlign: 'center' }}>
//                                 This is the <strong>Audit Core</strong> closing the loop: Clean and verified data flows to the ledger of record.
//                             </Typography>
//                         </Grid>
//                     </>
//                 );
//             default:
//                 return null;
//         }
//     };
// 
//     return (
//         <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
//             <Paper sx={{ p: 3, bgcolor: colors[mode].card }}>
//                 <DialogTitle sx={{ p: 0, pb: 2 }}>
//                     <Typography variant="h5" fontWeight={800} color={colors.accent}>
//                         {isTransaction ? `Atomic Audit Trace: ${entry.name}` : `Data Source Trace`}
//                     </Typography>
//                 </DialogTitle>
// 
//                 <DialogContent sx={{ p: 0 }}>
//                     <Box sx={{ mb: 3 }}>
//                         {isTransaction && (
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                                 {/* Stage Progression Buttons */}
//                                 {[1, 2, 3].map(s => (
//                                     <Button
//                                         key={s}
//                                         onClick={() => setStage(s)}
//                                         variant={stage === s ? 'contained' : 'outlined'}
//                                         color={stage === s ? 'primary' : 'secondary'}
//                                         size="small"
//                                         sx={{
//                                             flexGrow: 1,
//                                             mx: 0.5,
//                                             color: stage === s ? colors.logoDark : colors[mode].textPrimary,
//                                             borderColor: colors.accent,
//                                         }}
//                                     >
//                                         {s === 1 ? '1. CAPTURE' : s === 2 ? '2. VAL & ATTEST' : '3. ANCHOR'}
//                                     </Button>
//                                 ))}
//                             </Box>
//                         )}
//                     </Box>
// 
//                     <Grid container spacing={3}>
//                         {renderContent()}
// 
//                         {/* Display final status box only if transaction is fully processed */}
//                         {isTransaction && stage === 3 && (
//                             <Grid item xs={12}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 1, bgcolor: entry.status === 'Audited' ? `${colors.successGreen}15` : `${colors.errorRed}15`, mt: 2 }}>
//                                     {statusIcon}
//                                     <Typography variant="body1" fontWeight={700} sx={{ ml: 1, color: entry.status === 'Audited' ? colors.successGreen : colors.errorRed }}>
//                                         {statusText}
//                                     </Typography>
//                                 </Box>
//                             </Grid>
//                         )}
//                     </Grid>
//                 </DialogContent>
//                 <Box sx={{ pt: 3, textAlign: 'right' }}>
//                     <Button onClick={handleClose} variant="contained" color="primary">Close Audit</Button>
//                 </Box>
//             </Paper>
//         </Dialog>
//     );
// };
// 
// // --------------------------------------------------------
// // --- REUSABLE DASHBOARD COMPONENTS (UNMODIFIED) ---------
// // --------------------------------------------------------
// 
// // 1. MetricCard (Unchanged logic)
// const MetricCard = ({ title, value, unit, icon: Icon, color, isGrowing = true, onClick }) => {
//     const { mode } = useContext(ColorModeContext);
//     const primaryTextColor = colors[mode].textPrimary;
//     const growthColor = isGrowing ? colors.successGreen : colors.errorRed;
// 
//     const annotationText = (title === 'Unaudited Machine Spend' && isGrowing)
//         ? '⚠️ Increase in Unreconciled Spend (Prototype)'
//         : (isGrowing ? '+12.5% vs. Last Period' : '-4.2% Cost Overrun') + ' (Prototype Simulation)';
// 
// 
//     return (
//         <motion.div variants={fadeInUp} style={{ height: '100%', cursor: 'pointer' }}>
//             <Paper
//                 elevation={3}
//                 sx={{
//                     p: 3,
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     borderLeft: `4px solid ${color}`,
//                     transition: 'transform 0.3s',
//                     '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
//                 }}
//                 onClick={onClick}
//             >
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                     <Typography variant="body1" sx={{ color: color, fontWeight: 700 }}>
//                         {title}
//                     </Typography>
//                     <Icon sx={{ color: color, opacity: 0.7 }} />
//                 </Box>
//                 <Typography variant="h3" sx={{ fontWeight: 800, color: primaryTextColor }}>
//                     <motion.span
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, type: 'spring' }}
//                     >
//                         {value}
//                     </motion.span>
//                     <Typography component="span" variant="h5" sx={{ fontWeight: 500, ml: 1, color: color }}>
//                         {unit}
//                     </Typography>
//                 </Typography>
//                 <Typography variant="caption" color={growthColor} sx={{ mt: 1 }}>
//                     {annotationText}
//                 </Typography>
//             </Paper>
//         </motion.div>
//     );
// };
// 
// 
// // 2. Real-Time Ledger Activity Stream Row (Drillable) - Unchanged
// 
// const AuditEntry = ({ agent, action, cost, status, handleDrillDown }) => {
//     const { mode } = useContext(ColorModeContext);
//     const isAudited = status === 'Audited';
//     const statusColor = isAudited ? colors.successGreen : colors.errorRed;
//     const anomalyIcon = status === 'Pending Audit' ? '⚠️ ' : '';
//     const chipLabel = anomalyIcon + (status === 'Pending Audit' ? 'Audit Required' : status);
// 
//     return (
//         <motion.div
//             layout
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 30 }}
//         >
//             <Tooltip title="Click to view full Atomic Audit Log (Proof of Identity & Trace)">
//                 <ListItem
//                     divider
//                     onClick={handleDrillDown}
//                     sx={{
//                         p: 1.5,
//                         mb: 0.5,
//                         borderRadius: 1,
//                         cursor: 'pointer',
//                         transition: 'background-color 0.2s',
//                         backgroundColor: isAudited ? 'transparent' : `${colors.errorRed}15`,
//                         '&:hover': {
//                             backgroundColor: `${colors.accent}15`,
//                             boxShadow: 2
//                         }
//                     }}>
//                     <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={3}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <BoltIcon fontSize="small" sx={{ color: statusColor, mr: 1 }} />
//                                 <Typography variant="body2" fontWeight={600} color="textPrimary">
//                                     {agent}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                         <Grid item xs={4}>
//                             <Typography variant="body2" color="textPrimary">{action}</Typography>
//                         </Grid>
//                         <Grid item xs={2}>
//                             <Typography variant="body2" fontWeight={700} sx={{ color: statusColor }}>
//                                 ${cost}
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={3} sx={{ textAlign: 'right' }}>
//                             <Chip
//                                 label={chipLabel}
//                                 size="small"
//                                 sx={{
//                                     bgcolor: statusColor + '15',
//                                     color: statusColor,
//                                     fontWeight: 700
//                                 }}
//                             />
//                         </Grid>
//                     </Grid>
//                 </ListItem>
//             </Tooltip>
//         </motion.div>
//     );
// };
// 
// 
// // 3. Cost Allocation Bar (Drillable, using mock modal)
// const AllocationBar = ({ name, percentage, color, value, handleDrillDown }) => {
//     const { mode } = useContext(ColorModeContext);
//     const barColor = color === 'accent' ? colors.accent : colors.lucraGold;
// 
//     // Use a mock entry object to open the shared Audit Modal UX
//     const mockEntry = { name: name, category: name, value: value };
// 
//     return (
//         <motion.div variants={fadeInUp} style={{ width: '100%', cursor: 'pointer' }}>
//             <Tooltip title={`Click to trace this $${value}M allocation to its contributing Machine Ledger entries.`}>
//                 <Box sx={{ mb: 2 }} onClick={() => handleDrillDown(mockEntry)}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                         <Typography variant="body1" fontWeight={700} sx={{ color: colors[mode].textPrimary }}>
//                             {name}
//                             {/* </Typography>
//                         <Typography variant="body1" fontWeight={700} sx={{ color: barColor }}>
//                             {percentage}% (${value}M) */}
//                             <Typography variant="body1" fontWeight={700} sx={{ color: barColor }}>
//                                 {percentage}%{value !== undefined ? ` ($${value}M)` : ''}
//                             </Typography>
// 
//                         </Typography>
//                     </Box>
//                     <Box sx={{ height: 10, bgcolor: colors[mode].textDim + '22', borderRadius: 1 }}>
//                         <motion.div
//                             initial={{ width: 0 }}
//                             animate={{ width: `${percentage}%` }}
//                             transition={{ duration: 1.2, type: 'spring', stiffness: 50, damping: 10 }}
//                             style={{
//                                 height: '100%',
//                                 backgroundColor: barColor,
//                                 borderRadius: 'inherit',
//                             }}
//                         />
//                     </Box>
//                 </Box>
//             </Tooltip>
//         </motion.div>
//     );
// };
// 
// 
// // --------------------------------------------------------
// // --- THE MAIN DASHBOARD COMPONENT -----------------------
// // --------------------------------------------------------
// const MelucraDashboard = () => {
//     const { mode, toggleColorMode } = useContext(ColorModeContext);
// 
//     // --- State Management ---
//     const [ledgerData, setLedgerData] = useState(agentPool.slice(0, 5).map(entry => ({ ...entry, id: Date.now() + Math.random() })));
//     const [unauditedSpend, setUnauditedSpend] = useState(0.0);
//     const [totalSpend, setTotalSpend] = useState(4.20);
// 
//     // Drill-down Modal State
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedEntry, setSelectedEntry] = useState(null);
// 
//     const handleDrillDown = useCallback((entry) => {
//         setSelectedEntry(entry);
//         setModalOpen(true);
//     }, []);
// 
//     const generateNewEntry = useCallback(() => {
//         const entry = agentPool[Math.floor(Math.random() * agentPool.length)];
//         return {
//             ...entry,
//             id: Date.now() + Math.random(),
//             chain_id: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
//         };
//     }, []);
// 
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setLedgerData(prevData => {
//                 const newEntry = generateNewEntry();
// 
//                 // 1. Dynamic Total Spend Update
//                 // setTotalSpend(prev => +(prev + 0.01).toFixed(2));
//                 // setTotalSpend(prev => +(prev + newEntry.cost).toFixed(2));
// 
//                 // 2. Simulate Audit Leakage update based on stream
//                 if (newEntry.status !== 'Audited') {
//                     setUnauditedSpend(prev => Math.min(prev + 0.05, 0.15)); // Reduced leakage increase for stability
//                 } else if (prevData.length >= 7) {
//                     setUnauditedSpend(prev => Math.max(prev - 0.01, 0.0));
//                 }
// 
//                 return [newEntry, ...prevData].slice(0, 7);
//             });
//         }, 3000);
// 
//         return () => clearInterval(interval);
//     }, [generateNewEntry]);
// 
//     const computedTotalSpend = useMemo(() =>
//         ledgerData.reduce((sum, e) => sum + (e.cost || 0), 0),
//         [ledgerData]
//     );
// 
//     const auditedSpend = useMemo(() =>
//         ledgerData.filter(e => e.status === 'Audited').reduce((sum, e) => sum + (e.cost || 0), 0),
//         [ledgerData]
//     );
// 
//     const quarantinedSpend = computedTotalSpend - auditedSpend;
// 
//     const validatedPct = computedTotalSpend ? ((auditedSpend / computedTotalSpend) * 100).toFixed(1) : 0;
//     const quarantinedPct = computedTotalSpend ? ((quarantinedSpend / computedTotalSpend) * 100).toFixed(1) : 0;
// 
//     // Simulate small adaptive compliance metrics until live policy logic is added
//     const explainabilityCoverage = validatedPct > 0 ? (95 + Math.random() * 3).toFixed(1) : 0;
//     const policyComplianceRate = validatedPct > 0 ? (85 + Math.random() * 5).toFixed(1) : 0;
// 
// 
// 
//     // Handler for Metric Card Clicks (uses modal for consistent UX)
//     const handleMetricClick = (metric) => {
//         setSelectedEntry({
//             name: metric,
//             description: `This high-level metric is tied directly to the audited Machine Ledger data streams and resource utilization APIs.`,
//             isMetric: true
//         });
//         setModalOpen(true);
//     };
// 
//     // --- Render Logic ---
//     return (
//         <Box
//             sx={{
//                 minHeight: '100vh',
//                 p: { xs: 2, md: 4 },
//                 background: `linear-gradient(135deg, ${colors[mode].bgGradA} 0%, ${colors[mode].bgGradB} 100%)`,
//                 transition: 'background 0.5s ease-in-out',
//                 color: colors[mode].textPrimary,
//             }}
//         >
//             {/* ATOMIC AUDIT LOG MODAL (The Proof Point) */}
//             <AtomicAuditLogModal
//                 isOpen={modalOpen}
//                 handleClose={() => setModalOpen(false)}
//                 entry={selectedEntry}
//             />
// 
//             {/* Header and Controls */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
// 
// 
//                 <Box sx={{ textAlign: 'left' }}>
//                     <Typography variant="h4" fontWeight={900}>
//                         <GradientText variant="h4" sx={{ fontSize: 'inherit' }}>
//                             Melucra
//                         </GradientText>
//                     </Typography>
//                     {/* <Typography variant="h5" sx={{ color: colors[mode].textPrimary, fontWeight: 700 }}>
//   The first Audit Core for Agentic Work
// </Typography> */}
//                     <Typography variant="h5" sx={{ color: colors[mode].textPrimary, fontWeight: 700 }}>
//                         The Audit Core powering the Machine Economy
//                     </Typography>
// 
//                     <Typography
//                         variant="subtitle1"
//                         sx={{
//                             color: colors[mode].textSecondary,
//                             fontWeight: 500,
//                             opacity: 0.8
//                         }}
//                     >
//                         Prototype demonstration of Melucra’s immutable, explainable audit layer
//                         {/* • System of Record for the $1.3T Machine Economy */}
//                     </Typography>
//                 </Box>
// 
// 
// 
//                 <Box>
//                     {/* BUTTON 1: Generate Audit Report */}
//                     <Tooltip title="Prototype Demo: Illustrates future mandated export functionality.">
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             endIcon={<GavelIcon />}
//                             onClick={() => alert("Simulating Audit Report Generation: Data from the Machine Ledger is compiled and formatted for SOC2/CFO review.")}
//                             sx={{ mr: 2, display: { xs: 'none', sm: 'inline-flex' } }}
//                         >
//                             Generate Mandated Audit Report
//                         </Button>
//                     </Tooltip>
// 
//                     {/* Theme Toggle */}
//                     <IconButton onClick={toggleColorMode} color="primary" sx={{
//                         backgroundColor: colors[mode].card + '55',
//                         '&:hover': { backgroundColor: colors[mode].card }
//                     }}>
//                         {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//                     </IconButton>
//                 </Box>
//             </Box>
// 
//             {/* Content Grids */}
//             <motion.div variants={staggerContainer} initial="hidden" animate="show">
//                 <Grid container spacing={4} sx={{ mb: 4 }}>
//                     {/* Metric 1: Total Spend (CLICKABLE) */}
//                     <Grid item xs={12} sm={6} md={3}>
//                         <MetricCard
//                             title="Total Machine Spend (USD)"
//                             // value={totalSpend.toFixed(2)}
//                             value={computedTotalSpend.toFixed(2)}
//                             unit="M $"
//                             icon={MonetizationOnIcon}
//                             color={colors.lucraGold}
//                             onClick={() => handleMetricClick("Total Machine Spend")}
//                         />
//                     </Grid>
// 
//                     {/* Metric 2: Audit Leakage (CLICKABLE) */}
//                     <Grid item xs={12} sm={6} md={3}>
//                         <MetricCard
//                             title="Unaudited Machine Spend"
//                             value={parseFloat(quarantinedPct).toFixed(1)}
//                             unit="%"
//                             icon={GavelIcon}
//                             color={quarantinedPct > 1 ? colors.errorRed : colors.successGreen}
//                             isGrowing={quarantinedPct > 1}
//                             onClick={() => handleMetricClick("Unaudited Machine Spend")}
//                         />
//                     </Grid>
// 
//                     {/* Metric 3: Compliance Score (CLICKABLE) */}
//                     <Grid item xs={12} sm={6} md={3}>
//                         <MetricCard
//                             title="Mandated Assurance Score"
//                             value="99.8"
//                             unit="% Score"
//                             icon={GavelIcon}
//                             color={colors.accent}
//                             isGrowing={true}
//                             onClick={() => handleMetricClick("Mandated Assurance Score")}
//                         />
//                     </Grid>
// 
//                     {/* Metric 4: Utilization / Efficiency (CLICKABLE) */}
//                     <Grid item xs={12} sm={6} md={3}>
//                         <MetricCard
//                             title="Efficiency Signals"
//                             value="87"
//                             unit="% Efficiency"
//                             icon={TrendingUpIcon}
//                             color={colors.lucraGold}
//                             isGrowing={true}
//                             onClick={() => handleMetricClick("Efficiency Signals")}
//                         />
//                     </Grid>
//                 </Grid>
// 
//                 <Grid container spacing={4}>
//                     {/* LEFT PANEL HEADER */}
//                     <Grid item xs={12} md={7}>
//                         <Typography variant="h6" fontWeight={800} sx={{ mb: 1, color: colors.accent }}>
//                             Step 1: Capture and Validate
//                         </Typography>
//                         <motion.div variants={fadeInUp} style={{ height: '100%' }}>
//                             <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
//                                 <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: colors.accent }}>
//                                     Live Audit Stream: Machine Events Captured and Verified in Real Time
//                                 </Typography>
//                                 {/* NEW SOUNDBITE ADDED */}
//                                 <Typography variant="caption" color="textSecondary" sx={{ mb: 1, fontStyle: 'italic' }}>
//                                     {/* Every machine event reconciled in real-time — compliant entries flow, violations are quarantined. */}
//                                     Every autonomous transaction is captured, validated, and anchored to auditable financial truth in real time.
//                                 </Typography>
// 
//                                 {/* BLOCKED SPEND BOX ADDED */}
//                                 <Box sx={{ textAlign: 'right', mb: 1 }}>
//                                     <Chip
//                                         label={`Quarantined Events: ${Math.round(quarantinedPct)} Detected`}
//                                         color="error"
//                                         variant="outlined"
//                                         sx={{ fontWeight: 700 }}
//                                     />
//                                 </Box>
// 
//                                 <Divider sx={{ mb: 1 }} />
//                                 <List sx={{ overflowY: 'auto', flexGrow: 1, p: 0, maxHeight: 500 }}>
//                                     {/* Header Row */}
//                                     <Grid container spacing={2} sx={{ mb: 1, px: 2 }}>
//                                         <Grid item xs={3}><Typography variant="caption" fontWeight={700} color="textSecondary">AGENT ID</Typography></Grid>
//                                         <Grid item xs={4}><Typography variant="caption" fontWeight={700} color="textSecondary">ACTIVITY / RESOURCE</Typography></Grid>
//                                         <Grid item xs={2}><Typography variant="caption" fontWeight={700} color="textSecondary">COST</Typography></Grid>
//                                         <Grid item xs={3}><Typography variant="caption" fontWeight={700} color="textSecondary" sx={{ textAlign: 'right' }}>AUDIT STATUS</Typography></Grid>
//                                     </Grid>
//                                     <Divider sx={{ mb: 1 }} />
//                                     {/* Data Rows */}
//                                     <AnimatePresence initial={false}>
//                                         {ledgerData.map((entry) => (
//                                             <AuditEntry
//                                                 key={entry.id}
//                                                 {...entry}
//                                                 handleDrillDown={() => handleDrillDown(entry)} // Pass drill down handler
//                                             />
//                                         ))}
//                                     </AnimatePresence>
//                                 </List>
//                                 <ListItemText sx={{ mt: 2, textAlign: 'center' }}>
//                                     <Typography variant="body2" color="textSecondary">
//                                         Atomic ingestion live — every 3s a new agent event is reconciled.
//                                     </Typography>
//                                 </ListItemText>
//                             </Paper>
//                         </motion.div>
//                     </Grid>
// 
//                     {/* RIGHT PANEL HEADER */}
//                     <Grid item xs={12} md={5}>
//                         <Typography variant="h6" fontWeight={800} sx={{ mb: 1, color: colors.lucraGold }}>
//                             Step 2: Explain and Anchor
//                         </Typography>
//                         <motion.div variants={fadeInUp} style={{ height: '100%' }}>
//                             <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//                                 <Box>
//                                     <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: colors.lucraGold }}>
//                                         Explainability and Compliance Signal Prototype
//                                     </Typography>
//                                     <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
//                                         Illustrating how Melucra links validated machine events to policy reasoning and compliance evidence.
//                                     </Typography>
//                                     <Divider sx={{ mb: 3 }} />
// 
//                                     {/* Allocation Bars (Drillable, using mock modal) */}
//                                     <motion.div variants={staggerContainer}>
//                                         <AllocationBar
//                                             name="Validated Events Rate"
//                                             percentage={validatedPct}
//                                             color="accent"
//                                             value={auditedSpend.toFixed(2)}
//                                             handleDrillDown={handleDrillDown}
//                                         />
//                                         <AllocationBar
//                                             name="Quarantined Events Rate"
//                                             percentage={quarantinedPct}
//                                             color="lucraGold"
//                                             value={quarantinedSpend.toFixed(2)}
//                                             handleDrillDown={handleDrillDown}
//                                         />
//                                         <AllocationBar
//                                             name="Explainability Coverage"
//                                             percentage={explainabilityCoverage}
//                                             color="accent"
//                                             handleDrillDown={handleDrillDown}
//                                         />
//                                         <AllocationBar
//                                             name="Policy Compliance Rate"
//                                             percentage={policyComplianceRate}
//                                             color="lucraGold"
//                                             handleDrillDown={handleDrillDown}
//                                         />
// 
// 
//                                     </motion.div>
//                                 </Box>
// 
//                                 {/* EXPORT BUTTON (Mock Preview) */}
//                                 <Tooltip title="Mock Output: Demonstrates export of immutable audit records for external verification or regulatory review.">
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         endIcon={<AccountTreeIcon />}
//                                         onClick={() => handleDrillDown({ name: "GL Reconciliation File", description: "Mock output: Validated ledger data packaged for ERP import. In production, this produces a CFO-ready JSON/PDF export." })}
//                                         sx={{ mt: 4 }}
//                                     >
//                                         Export Immutable Audit Trail
//                                     </Button>
//                                 </Tooltip>
//                             </Paper>
//                         </motion.div>
//                     </Grid>
//                 </Grid>
//             </motion.div>
// 
//             <Box sx={{ textAlign: 'center', mt: 6, py: 2, borderTop: `1px solid ${colors[mode].textDim}22`, color: colors[mode].textDim, fontSize: '0.85rem', letterSpacing: 0.3 }}>
//                 SOC 2 Type II Ready • Immutable Ledger Verified • Explainable AI Audit Core • Zero Trust Architecture
//             </Box>
// 
//         </Box>
//     );
// };
// 
// // Final component for export, wrapped in the local ThemeProvider
// const MelucraDashboardPage = () => (
//     <ThemeWrapper>
//         <MelucraDashboard />
//     </ThemeWrapper>
// );
// 
// export default MelucraDashboardPage;

// import React, { useState, useMemo, useContext } from 'react';
// import {
//     Box, Typography, Button, Paper, Grid, Tabs, Tab,
//     List, ListItem, ListItemText, LinearProgress, Chip
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import { styled } from '@mui/material/styles';
// import {
//     Gavel as GovernanceIcon,
//     Shield as ShieldIcon,
//     Zap as ZapIcon,
//     AlertTriangle as AlertIcon,
//     Layers as StackIcon,
// } from 'lucide-react';
// 
// // --- Color Palette and Configuration (REUSED for consistency) ---
// const colors = {
//     accent: '#00E5BE',
//     lucraGold: '#D4AF37', // Primary color for L3 Governance
//     errorRed: '#FF4136',
//     successGreen: '#2ECC40',
//     logoDark: '#1A334A',
//     dark: {
//         bgTop: '#1A2433',
//         bgGradA: '#2A344A',
//         bgGradB: '#111827',
//         card: '#243040',
//         textDim: 'rgba(255,255,255,0.85)',
//         textPrimary: '#F0F3F7',
//     },
//     light: {
//         bgTop: '#F8F9FA',
//         bgGradA: '#E6F4F1',
//         bgGradB: '#D8E8E6',
//         card: '#FFFFFF',
//         textDim: 'rgba(0,0,0,0.82)',
//         textPrimary: '#1F2937',
//     }
// };
// 
// const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'dark' });
// 
// // --- Framer Motion Variants (REUSED) ---
// const fadeInUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } };
// const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
// 
// // --- Gradient Utility (REUSED) ---
// const GradientText = styled(Typography)(({ theme }) => ({
//     background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     display: 'inline',
//     fontWeight: 700,
// }));
// 
// // --- Metric Card Component ---
// const MetricCard = ({ title, value, unit, icon: Icon, color, annotation }) => {
//     const { mode } = useContext(ColorModeContext); 
//     const primaryTextColor = colors[mode].textPrimary;
// 
//     return (
//         <motion.div variants={fadeInUp} style={{ height: '100%' }}>
//             <Paper
//                 elevation={3}
//                 sx={{
//                     p: 3,
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     borderLeft: `4px solid ${color}`,
//                     transition: 'transform 0.3s',
//                     '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
//                 }}
//             >
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                     <Typography variant="body1" sx={{ color: color, fontWeight: 700 }}>
//                         {title}
//                     </Typography>
//                     <Icon color={color} size={20} />
//                 </Box>
//                 <Typography variant="h3" sx={{ fontWeight: 800, color: primaryTextColor }}>
//                     <motion.span
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, type: 'spring' }}
//                     >
//                         {value}
//                     </motion.span>
//                     <Typography component="span" variant="h5" sx={{ fontWeight: 500, ml: 1, color: color }}>
//                         {unit}
//                     </Typography>
//                 </Typography>
//                 <Typography variant="caption" color={colors.dark.textDim} sx={{ mt: 1 }}>
//                     {annotation}
//                 </Typography>
//             </Paper>
//         </motion.div>
//     );
// };
// 
// // --- Custom Component: Immutability Ledger Health ---
// const LedgerHealth = () => {
//     const { mode } = useContext(ColorModeContext);
//     const data = [
//         { name: 'Attestation Blocks Created', value: '1.2M', color: colors.accent },
//         { name: 'Proof Hash Conflicts', value: '0', color: colors.successGreen },
//         { name: 'Last Attestation Time', value: '1.2s ago', color: colors.lucraGold },
//         { name: 'Block Generation Rate', value: '25/sec', color: colors.accent },
//     ];
// 
//     return (
//         <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
//             <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
//                 Ledger Immutability & Health
//             </Typography>
//             <List dense>
//                 {data.map((item, index) => (
//                     <ListItem key={index} disableGutters>
//                         <ListItemText 
//                             primary={item.name} 
//                             secondary={item.value} 
//                             primaryTypographyProps={{ color: colors[mode].textPrimary }}
//                             secondaryTypographyProps={{ color: item.color, fontWeight: 700, fontSize: '1.1rem' }}
//                         />
//                         <Chip label={item.value} size="small" sx={{ bgcolor: item.color + '20', color: item.color, fontWeight: 'bold' }} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Paper>
//     );
// };
// 
// // --- Custom Component: Compliance Scorecard ---
// const ComplianceScorecard = () => {
//     const { mode } = useContext(ColorModeContext);
//     const scores = [
//         { domain: 'SOX Compliance', score: 98, color: colors.successGreen },
//         { domain: 'IFRS 15 Recognition', score: 85, color: colors.lucraGold },
//         { domain: 'Internal Policy Audit', score: 72, color: colors.errorRed },
//     ];
// 
//     return (
//         <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
//             <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
//                 Live Compliance Scorecard
//             </Typography>
//             <Box>
//                 {scores.map((item, index) => (
//                     <Box key={index} sx={{ mb: 3 }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                             <Typography variant="body2" color={colors[mode].textPrimary}>{item.domain}</Typography>
//                             <Typography variant="body2" fontWeight={700} color={item.color}>{item.score}%</Typography>
//                         </Box>
//                         <LinearProgress 
//                             variant="determinate" 
//                             value={item.score} 
//                             sx={{ 
//                                 height: 8, 
//                                 borderRadius: 4, 
//                                 bgcolor: colors[mode].textDim + '10', 
//                                 '& .MuiLinearProgress-bar': { bgcolor: item.color } 
//                             }} 
//                         />
//                     </Box>
//                 ))}
//             </Box>
//         </Paper>
//     );
// };
// 
// // --------------------------------------------------------
// // --- THE MAIN DASHBOARD COMPONENT (OmecaGovernancePage) ---
// // --------------------------------------------------------
// const OmecaGovernancePage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
// 
//     // Tab state (Focuses on Governance, but allows navigation to L1/L2)
//     const [currentTab, setCurrentTab] = useState('governance'); 
// 
//     const handleTabChange = (event, newValue) => {
//         // Here we trigger the top-level app router to switch pages
//         if (newValue === 'core') {
//             setPage('core'); 
//         } else if (newValue === 'ledger') {
//             setPage('ledger'); 
//         } else {
//              setCurrentTab(newValue);
//         }
//     };
// 
//     // --- Render Logic ---
//     return (
//         <Box
//             sx={{
//                 minHeight: '100vh',
//                 p: { xs: 2, md: 4 },
//                 background: `linear-gradient(135deg, ${colors[mode].bgGradA} 0%, ${colors[mode].bgGradB} 100%)`,
//                 transition: 'background 0.5s ease-in-out',
//                 color: colors[mode].textPrimary,
//                 pt: 8
//             }}
//         >
//             {/* Header and Controls */}
//             <Box sx={{ mb: 3 }}>
//                 <Typography variant="h4" fontWeight={900}>
//                     <GradientText variant="h4" sx={{ fontSize: 'inherit' }}>
//                         Omeca Governance (L3)
//                     </GradientText>
//                 </Typography>
//                 <Typography variant="h5" sx={{ color: colors.lucraGold, fontWeight: 700 }}>
//                     Verifiable Trust & Compliance Dashboard
//                 </Typography>
//             </Box>
// 
//             {/* Nav Tabs (Linking to the other two layers) */}
//             <Paper sx={{ mb: 4, borderRadius: 2 }}>
//                 <Tabs 
//                     value={currentTab} 
//                     onChange={handleTabChange} 
//                     indicatorColor="primary" 
//                     textColor="primary"
//                     variant="scrollable"
//                     scrollButtons="auto"
//                     sx={{ borderBottom: 1, borderColor: 'divider' }}
//                 >
//                     <Tab 
//                         value="governance" 
//                         label="Trust Score & Audit" 
//                         icon={<GovernanceIcon />}
//                         sx={{ fontWeight: 700 }}
//                     />
//                     <Tab 
//                         value="core" 
//                         label="Operational Control (L1)" 
//                         icon={<ZapIcon />}
//                         sx={{ fontWeight: 700 }}
//                     />
//                     <Tab 
//                         value="ledger" 
//                         label="Omeca Ledger (L2)" 
//                         icon={<StackIcon />}
//                         sx={{ fontWeight: 700 }}
//                     />
//                 </Tabs>
//             </Paper>
// 
//             {/* Dashboard Content */}
//             {currentTab === 'governance' && (
//                 <motion.div variants={staggerContainer} initial="hidden" animate="show">
//                     <Grid container spacing={4} sx={{ mb: 4 }}>
//                         {/* Metric 1: Trust Score */}
//                         <Grid item xs={12} sm={6} md={3}>
//                             <MetricCard
//                                 title="Omeca Trust Score"
//                                 value={94.5}
//                                 unit="%"
//                                 icon={ShieldIcon}
//                                 color={colors.lucraGold}
//                                 annotation="Average Attestation Integrity"
//                             />
//                         </Grid>
//                         {/* Metric 2: Immutable Record Ratio */}
//                         <Grid item xs={12} sm={6} md={3}>
//                             <MetricCard
//                                 title="Immutable Record Ratio"
//                                 value={99.99}
//                                 unit="%"
//                                 icon={GovernanceIcon}
//                                 color={colors.accent}
//                                 annotation="Blocks Secured by Cryptographic Proof"
//                             />
//                         </Grid>
//                         {/* Metric 3: Policy Violation Alerts */}
//                         <Grid item xs={12} sm={6} md={3}>
//                             <MetricCard
//                                 title="Policy Violation Alerts"
//                                 value={2}
//                                 unit="Critical"
//                                 icon={AlertIcon}
//                                 color={colors.errorRed}
//                                 annotation="Requires immediate human review"
//                             />
//                         </Grid>
//                         {/* Metric 4: Attestation Velocity */}
//                         <Grid item xs={12} sm={6} md={3}>
//                             <MetricCard
//                                 title="Attestation Velocity"
//                                 value={3.1}
//                                 unit="ms"
//                                 icon={ZapIcon}
//                                 color={colors.successGreen}
//                                 annotation="Avg. time to final proof of state"
//                             />
//                         </Grid>
//                     </Grid>
//                     
//                     <Grid container spacing={4}>
//                         {/* Left Column: Compliance Scorecard */}
//                         <Grid item xs={12} md={6}>
//                            <ComplianceScorecard />
//                         </Grid>
// 
//                         {/* Right Column: Ledger Health */}
//                         <Grid item xs={12} md={6}>
//                            <LedgerHealth />
//                         </Grid>
//                     </Grid>
// 
//                 </motion.div>
//             )}
//         </Box>
//     );
// };
// 
// export default OmecaGovernancePage;

// import React, { useState, useContext } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   Tabs,
//   Tab,
//   List,
//   ListItem,
//   ListItemText,
//   LinearProgress,
//   Chip,
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import { styled } from '@mui/material/styles';
// 
// // MUI icons only (no lucide)
// import GavelIcon from '@mui/icons-material/Gavel';
// import ShieldIcon from '@mui/icons-material/Shield';
// import BoltIcon from '@mui/icons-material/Bolt';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// import LayersIcon from '@mui/icons-material/Layers';
// 
// // --- Color Palette and Configuration (REUSED for consistency) ---
// const colors = {
//   accent: '#00ace5ff',
//   lucraGold: '#37d495ff', // Primary color for L3 Governance
//   errorRed: '#FF4136',
//   successGreen: '#2ECC40',
//   logoDark: '#1A334A',
//   dark: {
//     bgTop: '#1A2433',
//     bgGradA: '#2A344A',
//     bgGradB: '#111827',
//     card: '#243040',
//     textDim: 'rgba(255,255,255,0.85)',
//     textPrimary: '#F0F3F7',
//   },
//   light: {
//     bgTop: '#F8F9FA',
//     bgGradA: '#E6F4F1',
//     bgGradB: '#D8E8E6',
//     card: '#FFFFFF',
//     textDim: 'rgba(0,0,0,0.82)',
//     textPrimary: '#1F2937',
//   },
// };
// 
// // Local context so existing code does not break if no provider wraps it
// const ColorModeContext = React.createContext({
//   toggleColorMode: () => {},
//   mode: 'dark',
// });
// 
// // --- Framer Motion Variants (REUSED) ---
// const fadeInUp = {
//   hidden: { y: 20, opacity: 0 },
//   show: {
//     y: 0,
//     opacity: 1,
//     transition: { type: 'spring', stiffness: 100, damping: 20 },
//   },
// };
// 
// const staggerContainer = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.1 },
//   },
// };
// 
// // --- Gradient Utility (REUSED) ---
// const GradientText = styled(Typography)(() => ({
//   background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   display: 'inline',
//   fontWeight: 700,
// }));
// 
// // --- Metric Card Component ---
// const MetricCard = ({ title, value, unit, icon: Icon, color, annotation }) => {
//   const ctx = useContext(ColorModeContext);
//   const mode = ctx?.mode || 'dark';
//   const primaryTextColor = colors[mode].textPrimary;
// 
//   return (
//     <motion.div variants={fadeInUp} style={{ height: '100%' }}>
//       <Paper
//         elevation={3}
//         sx={{
//           p: 3,
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           borderLeft: `4px solid ${color}`,
//           transition: 'transform 0.3s',
//           '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 2,
//           }}
//         >
//           <Typography variant="body1" sx={{ color: color, fontWeight: 700 }}>
//             {title}
//           </Typography>
//           <Icon sx={{ color }} fontSize="small" />
//         </Box>
//         <Typography
//           variant="h3"
//           sx={{ fontWeight: 800, color: primaryTextColor }}
//         >
//           <motion.span
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, type: 'spring' }}
//           >
//             {value}
//           </motion.span>
//           <Typography
//             component="span"
//             variant="h5"
//             sx={{ fontWeight: 500, ml: 1, color: color }}
//           >
//             {unit}
//           </Typography>
//         </Typography>
//         <Typography
//           variant="caption"
//           color={colors.dark.textDim}
//           sx={{ mt: 1 }}
//         >
//           {annotation}
//         </Typography>
//       </Paper>
//     </motion.div>
//   );
// };
// 
// // --- Custom Component: Immutability Ledger Health ---
// const LedgerHealth = () => {
//   const ctx = useContext(ColorModeContext);
//   const mode = ctx?.mode || 'dark';
// 
//   const data = [
//     { name: 'Attestation Blocks Created', value: '1.2M', color: colors.accent },
//     { name: 'Proof Hash Conflicts', value: '0', color: colors.successGreen },
//     { name: 'Last Attestation Time', value: '1.2s ago', color: colors.lucraGold },
//     { name: 'Block Generation Rate', value: '25/sec', color: colors.accent },
//   ];
// 
//   return (
//     <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
//       <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
//         Ledger Immutability and Health
//       </Typography>
//       <List dense>
//         {data.map((item, index) => (
//           <ListItem key={index} disableGutters>
//             <ListItemText
//               primary={item.name}
//               secondary={item.value}
//               primaryTypographyProps={{ color: colors[mode].textPrimary }}
//               secondaryTypographyProps={{
//                 color: item.color,
//                 fontWeight: 700,
//                 fontSize: '1.1rem',
//               }}
//             />
//             <Chip
//               label={item.value}
//               size="small"
//               sx={{
//                 bgcolor: item.color + '20',
//                 color: item.color,
//                 fontWeight: 'bold',
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// };
// 
// // --- Custom Component: Compliance Scorecard ---
// const ComplianceScorecard = () => {
//   const ctx = useContext(ColorModeContext);
//   const mode = ctx?.mode || 'dark';
// 
//   const scores = [
//     { domain: 'SOX Compliance', score: 98, color: colors.successGreen },
//     { domain: 'IFRS 15 Recognition', score: 85, color: colors.lucraGold },
//     { domain: 'Internal Policy Audit', score: 72, color: colors.errorRed },
//   ];
// 
//   return (
//     <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
//       <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
//         Live Compliance Scorecard
//       </Typography>
//       <Box>
//         {scores.map((item, index) => (
//           <Box key={index} sx={{ mb: 3 }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 mb: 0.5,
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 color={colors[mode].textPrimary}
//               >
//                 {item.domain}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 fontWeight={700}
//                 color={item.color}
//               >
//                 {item.score}%
//               </Typography>
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={item.score}
//               sx={{
//                 height: 8,
//                 borderRadius: 4,
//                 bgcolor: colors[mode].textDim + '10',
//                 '& .MuiLinearProgress-bar': { bgcolor: item.color },
//               }}
//             />
//           </Box>
//         ))}
//       </Box>
//     </Paper>
//   );
// };
// 
// // --------------------------------------------------------
// // --- THE MAIN DASHBOARD COMPONENT (OmecaGovernancePage) ---
// // --------------------------------------------------------
// const OmecaGovernancePage = ({ setPage }) => {
//   const ctx = useContext(ColorModeContext);
//   const mode = ctx?.mode || 'dark';
// 
//   // Tab state (focuses on Governance but allows navigation to L1 and L2)
//   const [currentTab, setCurrentTab] = useState('governance');
// 
//   const handleTabChange = (event, newValue) => {
//     if (newValue === 'core') {
//       setPage('core');
//     } else if (newValue === 'ledger') {
//       setPage('ledger');
//     } else {
//       setCurrentTab(newValue);
//     }
//   };
// 
//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         p: { xs: 2, md: 4 },
//         background: `linear-gradient(135deg, ${colors[mode].bgGradA} 0%, ${colors[mode].bgGradB} 100%)`,
//         transition: 'background 0.5s ease-in-out',
//         color: colors[mode].textPrimary,
//         pt: 8,
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h4" fontWeight={900}>
//           <GradientText variant="h4" sx={{ fontSize: 'inherit' }}>
//             Omeca Governance (L3)
//           </GradientText>
//         </Typography>
//         <Typography
//           variant="h5"
//           sx={{ color: colors.lucraGold, fontWeight: 700 }}
//         >
//           Verifiable Trust and Compliance Dashboard
//         </Typography>
//       </Box>
// 
//       {/* Nav Tabs */}
//       <Paper sx={{ mb: 4, borderRadius: 2 }}>
//         <Tabs
//           value={currentTab}
//           onChange={handleTabChange}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="scrollable"
//           scrollButtons="auto"
//           sx={{ borderBottom: 1, borderColor: 'divider' }}
//         >
//           <Tab
//             value="governance"
//             label="Trust Score and Audit"
//             icon={<GavelIcon fontSize="small" />}
//             iconPosition="start"
//             sx={{ fontWeight: 700 }}
//           />
//           <Tab
//             value="core"
//             label="Operational Control (L1)"
//             icon={<BoltIcon fontSize="small" />}
//             iconPosition="start"
//             sx={{ fontWeight: 700 }}
//           />
//           <Tab
//             value="ledger"
//             label="Omeca Ledger (L2)"
//             icon={<LayersIcon fontSize="small" />}
//             iconPosition="start"
//             sx={{ fontWeight: 700 }}
//           />
//         </Tabs>
//       </Paper>
// 
//       {/* Dashboard Content */}
//       {currentTab === 'governance' && (
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           animate="show"
//         >
//           <Grid container spacing={4} sx={{ mb: 4 }}>
//             {/* Metric 1: Trust Score */}
//             <Grid item xs={12} sm={6} md={3}>
//               <MetricCard
//                 title="Omeca Trust Score"
//                 value={94.5}
//                 unit="%"
//                 icon={ShieldIcon}
//                 color={colors.lucraGold}
//                 annotation="Average attestation integrity"
//               />
//             </Grid>
// 
//             {/* Metric 2: Immutable Record Ratio */}
//             <Grid item xs={12} sm={6} md={3}>
//               <MetricCard
//                 title="Immutable Record Ratio"
//                 value={99.99}
//                 unit="%"
//                 icon={GavelIcon}
//                 color={colors.accent}
//                 annotation="Blocks secured by cryptographic proof"
//               />
//             </Grid>
// 
//             {/* Metric 3: Policy Violation Alerts */}
//             <Grid item xs={12} sm={6} md={3}>
//               <MetricCard
//                 title="Policy Violation Alerts"
//                 value={2}
//                 unit="Critical"
//                 icon={WarningAmberIcon}
//                 color={colors.errorRed}
//                 annotation="Requires immediate human review"
//               />
//             </Grid>
// 
//             {/* Metric 4: Attestation Velocity */}
//             <Grid item xs={12} sm={6} md={3}>
//               <MetricCard
//                 title="Attestation Velocity"
//                 value={3.1}
//                 unit="ms"
//                 icon={BoltIcon}
//                 color={colors.successGreen}
//                 annotation="Average time to final proof of state"
//               />
//             </Grid>
//           </Grid>
// 
//           <Grid container spacing={4}>
//             {/* Left Column: Compliance Scorecard */}
//             <Grid item xs={12} md={6}>
//               <ComplianceScorecard />
//             </Grid>
// 
//             {/* Right Column: Ledger Health */}
//             <Grid item xs={12} md={6}>
//               <LedgerHealth />
//             </Grid>
//           </Grid>
//         </motion.div>
//       )}
//     </Box>
//   );
// };
// 
// export default OmecaGovernancePage;

import React, { useState, useContext, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Tabs, Tab, List, ListItemButton,
  LinearProgress, Chip, Dialog, DialogTitle, DialogContent, Stack, IconButton, Divider, alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

// MUI icons
import GavelIcon from '@mui/icons-material/Gavel';
import ShieldIcon from '@mui/icons-material/Shield';
import BoltIcon from '@mui/icons-material/Bolt';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LayersIcon from '@mui/icons-material/Layers';
import CloseIcon from '@mui/icons-material/Close';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// --- GLOBAL IMPORTS ---
import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
import { colors } from '../../../shared/layouts/theme/theme.js';

// --- API CONFIG ---
const API_BASE = "http://127.0.0.1:8000/api/v1";

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

// --- STYLED COMPONENTS ---
const GradientSpan = styled('span')(({ theme }) => ({
  background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
}));

// --- DRILL DOWN MODAL ---
const InspectorModal = ({ open, onClose, data }) => {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === 'dark';
    const palette = colors[mode];

    if (!data) return null;

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: palette.card,
                    borderRadius: 3,
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: palette.textPrimary
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FingerprintIcon sx={{ color: colors.lucraGold }} />
                    <Typography variant="h6" fontWeight={700}>Audit Inspector</Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'grey.500' }}><CloseIcon /></IconButton>
            </DialogTitle>
            <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
            <DialogContent>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 700, letterSpacing: 1 }}>METRIC CONTEXT</Typography>
                        <Typography variant="body1" fontWeight={700}>{data.id}</Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400', mt: 0.5 }}>{data.desc}</Typography>
                    </Box>
                    
                    <Box>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 700, letterSpacing: 1 }}>CRYPTOGRAPHIC PROOF</Typography>
                        <Paper sx={{ 
                            p: 2, mt: 1, 
                            bgcolor: isDark ? '#0B1120' : '#F3F4F6', 
                            borderRadius: 2,
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            color: isDark ? '#A5B4FC' : '#4B5563',
                            overflowX: 'auto'
                        }}>
                            <pre style={{ margin: 0 }}>{JSON.stringify(data.raw, null, 2)}</pre>
                        </Paper>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

// --- METRIC CARD (Standardized Style) ---
const MetricCard = ({ title, value, unit, icon: Icon, color, annotation, onClick }) => {
  const ctx = useContext(ColorModeContext);
  const mode = ctx?.mode || 'dark';
  const isDark = mode === 'dark';
  const palette = colors[mode];

  return (
    <Paper
        elevation={0}
        onClick={onClick}
        sx={{
          p: 3,
          height: '100%',
          bgcolor: palette.card,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.2s ease-out',
          '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 30px -10px ${color}30`,
              borderColor: color
          }
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, right: 0, p: 3, opacity: 0.05 }}>
            <Icon sx={{ fontSize: 100, color: color }} />
        </Box>

        <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(color, 0.1), color: color, display: 'flex' }}>
                    <Icon fontSize="small" />
                </Box>
                <Typography variant="subtitle2" sx={{ color: isDark ? 'grey.400' : 'grey.600', fontWeight: 700 }}>
                    {title}
                </Typography>
            </Box>

            <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: palette.textPrimary, letterSpacing: '-0.03em' }}>
                    {value}
                    <Typography component="span" variant="h5" sx={{ fontWeight: 500, ml: 1, color: color }}>
                        {unit}
                    </Typography>
                </Typography>
                <Typography variant="caption" sx={{ color: colors.dark.textDim, fontWeight: 500 }}>
                    {annotation}
                </Typography>
            </Box>
        </Stack>
      </Paper>
  );
};

// --- LEDGER HEALTH (Standardized List Style) ---
const LedgerHealth = ({ latestBlock, totalProofs, onClick }) => {
  const ctx = useContext(ColorModeContext);
  const mode = ctx?.mode || 'dark';
  const isDark = mode === 'dark';
  const palette = colors[mode];

  // Prepare data rows
  const rows = [
    { label: 'Attestation Blocks', value: totalProofs.toLocaleString(), color: colors.accent, id: 'BLOCKS' },
    { label: 'Hash Conflicts', value: '0', color: colors.successGreen, id: 'CONFLICTS' },
    { label: 'Latest Hash', value: latestBlock ? `${latestBlock.hash_preview}` : 'Mining...', color: colors.lucraGold, id: 'HASH', isHash: true },
    { label: 'Block Time', value: '1.2s', color: colors.accent, id: 'TIME' },
  ];

  return (
    <Paper sx={{ 
        p: 4, 
        borderRadius: 4, 
        bgcolor: palette.card,
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        height: '100%'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: palette.textPrimary }}>
            Ledger Immutability
        </Typography>
        <Chip 
            label="LIVE CHAIN" 
            size="small" 
            icon={<Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.lucraGold, boxShadow: `0 0 8px ${colors.lucraGold}` }} />}
            sx={{ bgcolor: alpha(colors.lucraGold, 0.1), color: colors.lucraGold, fontWeight: 800, pl: 0.5 }} 
        />
      </Box>

      <List>
        <AnimatePresence>
            {rows.map((item, index) => (
                <ListItemButton 
                    key={index}
                    onClick={() => onClick({ 
                        id: `LEDGER-${item.id}`, 
                        desc: "Blockchain Health Metric", 
                        raw: { metric: item.label, value: item.value, status: "NOMINAL", timestamp: new Date().toISOString() } 
                    })}
                    sx={{
                        p: 2,
                        mb: 1.5,
                        borderRadius: 3,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'grey.50',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                        transition: 'all 0.2s',
                        '&:hover': {
                            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'grey.100',
                            transform: 'translateX(4px)',
                            borderColor: item.color
                        }
                    }}
                >
                    <Grid container alignItems="center" spacing={2}>
                        <Grid size={{ xs: 1 }}>
                            <CheckCircleIcon sx={{ color: item.color, fontSize: 20 }} />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Typography variant="body2" fontWeight={600} sx={{ color: palette.textPrimary }}>
                                {item.label}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 5 }} sx={{ textAlign: 'right' }}>
                            <Chip
                                label={item.value}
                                size="small"
                                sx={{
                                    bgcolor: alpha(item.color, 0.1),
                                    color: item.color,
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace',
                                    fontSize: item.isHash ? '0.7rem' : '0.75rem',
                                    maxWidth: '100%'
                                }}
                            />
                        </Grid>
                    </Grid>
                </ListItemButton>
            ))}
        </AnimatePresence>
      </List>
    </Paper>
  );
};

// --- COMPLIANCE SCORECARD (Standardized Panel Style) ---
const ComplianceScorecard = ({ scores, onClick }) => {
  const ctx = useContext(ColorModeContext);
  const mode = ctx?.mode || 'dark';
  const isDark = mode === 'dark';
  const palette = colors[mode];

  return (
    <Paper sx={{ 
        p: 4, 
        borderRadius: 4, 
        bgcolor: palette.card,
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        height: '100%'
    }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 4, color: palette.textPrimary }}>
        Live Compliance Scorecard
      </Typography>
      
      <Stack spacing={4}>
        {scores.map((item, index) => (
          <Box 
            key={index} 
            sx={{ 
                cursor: 'pointer', 
                '&:hover .MuiTypography-root': { color: item.color },
                '&:hover .MuiLinearProgress-bar': { opacity: 0.8 }
            }}
            onClick={() => onClick({ id: `COMP-${item.domain}`, desc: "Automated Control Test", raw: { domain: item.domain, score: item.score, last_test: new Date().toISOString() } })}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight={600} color={isDark ? "grey.400" : "grey.600"} sx={{ transition: 'color 0.2s' }}>
                {item.domain}
              </Typography>
              <Typography variant="body2" fontWeight={700} sx={{ color: item.color }}>
                {item.score.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={item.score}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: isDark ? 'grey.800' : 'grey.200',
                '& .MuiLinearProgress-bar': { bgcolor: item.color, transition: 'transform 0.5s ease-out' },
              }}
            />
          </Box>
        ))}
      </Stack>

      <Box sx={{ mt: 6, p: 2, bgcolor: isDark ? 'rgba(0,0,0,0.2)' : 'grey.50', borderRadius: 2, border: '1px dashed grey' }}>
        <Typography variant="caption" sx={{ color: 'grey.500', display: 'block', mb: 1, fontWeight: 700 }}>
            AUDIT NOTE
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey.500', fontStyle: 'italic' }}>
            "Governance proofs are cryptographically secured. Every scorecard change is recorded on the immutable ledger."
        </Typography>
      </Box>
    </Paper>
  );
};

// --------------------------------------------------------
// --- THE MAIN DASHBOARD COMPONENT ---
// --------------------------------------------------------
const OmecaGovernancePage = ({ setPage }) => {
  const ctx = useContext(ColorModeContext);
  const mode = ctx?.mode || 'dark';
  const palette = colors[mode];
  
  // --- STATE ---
  const [metrics, setMetrics] = useState({
    verificationRate: 0,
    totalProofs: 0,
    trustScore: 94.5,
    velocity: 3.1,
    violations: 0,
    latestBlocks: []
  });

  const [compliance, setCompliance] = useState([
    { domain: 'SOX Compliance', score: 98.0, color: colors.successGreen },
    { domain: 'IFRS 15 Recognition', score: 85.0, color: colors.lucraGold },
    { domain: 'Internal Policy Audit', score: 72.0, color: colors.errorRed },
  ]);

  const [currentTab, setCurrentTab] = useState('governance');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // --- 1. POLL BACKEND (The Truth) ---
  useEffect(() => {
    const fetchL3Data = async () => {
      try {
        const res = await fetch(`${API_BASE}/governance/proofs`);
        if (res.ok) {
          const json = await res.json();
          setMetrics(prev => ({
            ...prev,
            verificationRate: json.verification_rate,
            totalProofs: json.total_proofs,
            latestBlocks: json.latest_blocks || []
          }));
        }
      } catch (err) { }
    };
    const interval = setInterval(fetchL3Data, 1000);
    fetchL3Data();
    return () => clearInterval(interval);
  }, []);

  // --- 2. LIVE JITTER (Breathing Effect) ---
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        trustScore: Math.min(100, Math.max(90, prev.trustScore + (Math.random() - 0.5) * 0.2)),
        velocity: Math.max(1, prev.velocity + (Math.random() - 0.5) * 0.5),
        violations: Math.floor(Math.random() * 3)
      }));

      setCompliance(prev => prev.map(item => ({
        ...item,
        score: Math.min(100, Math.max(50, item.score + (Math.random() - 0.5) * 0.3))
      })));

    }, 1500);
    return () => clearInterval(jitterInterval);
  }, []);

  const handleTabChange = (event, newValue) => {
    if (newValue === 'core') setPage('core');
    else if (newValue === 'ledger') setPage('ledger');
    else setCurrentTab(newValue);
  };

  const handleOpenInspector = (data) => {
    setSelectedItem(data);
    setModalOpen(true);
  };

  return (
    <Box sx={{
        minHeight: '100vh',
        p: { xs: 2, md: 6 },
        bgcolor: palette.bgTop,
        color: palette.textPrimary,
        transition: 'background-color 0.3s'
    }}>
      <InspectorModal open={modalOpen} onClose={() => setModalOpen(false)} data={selectedItem} />

      {/* Header */}
      <Box sx={{ mb: 6, maxWidth: 800 }}>
        <Typography variant="overline" sx={{ color: colors.lucraGold, fontWeight: 700, letterSpacing: 2 }}>
            LAYER 3: GOVERNANCE
        </Typography>
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2, mt: 1 }}>
          Verifiable <GradientSpan>Trust</GradientSpan>
        </Typography>
        <Typography variant="h6" sx={{ color: 'grey.500', fontWeight: 400, lineHeight: 1.6 }}>
          Immutable attestation for every AI decision. 
          Omeca generates cryptographic proofs for every reconciled event in real-time.
        </Typography>
      </Box>

      {/* Nav Tabs */}
      <Paper sx={{ mb: 6, borderRadius: 2, bgcolor: palette.card }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
              borderBottom: 1, borderColor: 'divider',
              '& .MuiTab-root': { fontWeight: 700, color: colors[mode].textDim },
              '& .Mui-selected': { color: colors.accent }
          }}
        >
          <Tab value="governance" label="Trust Score and Audit" icon={<GavelIcon fontSize="small" />} iconPosition="start" />
          <Tab value="core" label="Operational Control (L1)" icon={<BoltIcon fontSize="small" />} iconPosition="start" />
          <Tab value="ledger" label="Omeca Ledger (L2)" icon={<LayersIcon fontSize="small" />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Dashboard Content */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Metric 1: Trust Score */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <MetricCard
              title="Omeca Trust Score"
              value={metrics.trustScore.toFixed(1)}
              unit="%"
              icon={ShieldIcon}
              color={colors.lucraGold}
              annotation="Average attestation integrity"
              onClick={() => handleOpenInspector({ id: "KPI-TRUST", desc: "System-wide Confidence", raw: { algorithm: "Weighted Average", components: ["Data Integrity", "Policy Check"] } })}
            />
          </Grid>

          {/* Metric 2: Immutable Record Ratio */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <MetricCard
              title="Immutable Record Ratio"
              value={metrics.verificationRate}
              unit="%"
              icon={GavelIcon}
              color={colors.accent}
              annotation={`${metrics.totalProofs} Blocks Secured`}
              onClick={() => handleOpenInspector({ id: "KPI-IMMUTABLE", desc: "Cryptographic Coverage", raw: { total_txns: metrics.totalProofs, unverified: 0 } })}
            />
          </Grid>

          {/* Metric 3: Policy Violation Alerts */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <MetricCard
              title="Policy Violation Alerts"
              value={metrics.violations}
              unit="Critical"
              icon={WarningAmberIcon}
              color={colors.errorRed}
              annotation="Requires immediate human review"
              onClick={() => handleOpenInspector({ id: "KPI-ALERTS", desc: "Policy Failures", raw: { severity: "High", queue: "Empty" } })}
            />
          </Grid>

          {/* Metric 4: Attestation Velocity */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <MetricCard
              title="Attestation Velocity"
              value={metrics.velocity.toFixed(1)}
              unit="ms"
              icon={BoltIcon}
              color={colors.successGreen}
              annotation="Time to final proof"
              onClick={() => handleOpenInspector({ id: "KPI-VELOCITY", desc: "Performance", raw: { p99: "4ms", avg: "3.1ms" } })}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Left Column: Compliance Scorecard */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ComplianceScorecard scores={compliance} onClick={handleOpenInspector} />
          </Grid>

          {/* Right Column: Ledger Health */}
          <Grid size={{ xs: 12, md: 6 }}>
            <LedgerHealth 
                latestBlock={metrics.latestBlocks[0]} 
                totalProofs={metrics.totalProofs}
                onClick={handleOpenInspector}
            />
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default OmecaGovernancePage;