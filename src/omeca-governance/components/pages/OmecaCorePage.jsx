// // Omeca/pages/OmecaMarginAlertsPage.jsx - L1: Operational Control Dashboard
// 
// import React, { useState, useMemo, useContext, useEffect, useCallback } from 'react';
// import {
//     Box, Typography, Button, IconButton, Paper, Grid, List, ListItem, Chip, Tooltip,
//     Dialog, DialogTitle, DialogContent, Divider,
// } from '@mui/material';
// import { motion, AnimatePresence } from 'framer-motion';
// import { styled } from '@mui/material/styles';
// import {
//     MonetizationOn as SpendIcon,
//     CompareArrows as VarianceIcon,
//     Calculate as MarginIcon,
//     QueryBuilder as LatencyIcon,
//     WarningRounded,
//     CheckCircleOutlineRounded,
// } from '@mui/icons-material';
// 
// // --- Color Palette and Configuration (WCAG Readability Enhanced) ---
// export const colors = {
//     accent: '#00ace5ff',
//     lucraGold: '#37d4cfff',
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
// // Mock Context for environment
// const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'dark' });
// 
// 
// // --- Gradient Utility ---
// const GradientText = styled(Typography)(({ theme }) => ({
//     background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     display: 'inline',
//     fontWeight: 700,
// }));
// 
// // --- Framer Motion Variants ---
// const fadeInUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } };
// const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
// 
// // --- Mock Data Sources ---
// const alertPool = [
//     { id: 1, severity: 'High', metric: 'Gross Margin Variance', value: '-8.5%', reason: 'AWS Compute Overrun (R&D)', timestamp: '11:05:30Z' },
//     { id: 2, severity: 'Medium', metric: 'Liquidity Position', value: '45 Days', reason: 'Delayed A/R Postings', timestamp: '11:06:15Z' },
//     { id: 3, severity: 'High', metric: 'Forecast Accuracy', value: '15% Miss', reason: 'Unaccounted Hardware Spend', timestamp: '11:07:01Z' },
//     { id: 4, severity: 'Low', metric: 'Spend vs Budget', value: '+2.1%', reason: 'Standard SaaS Subscription', timestamp: '11:07:45Z' },
// ];
// 
// // --- REUSABLE DASHBOARD COMPONENTS ---
// 
// // 1. MetricCard (Reused from Governance Dashboard)
// const MetricCard = ({ title, value, unit, icon: Icon, color, isGrowing = true, onClick }) => {
//     const context = useContext(ColorModeContext); 
//     const { mode } = context; 
//     
//     const primaryTextColor = colors[mode].textPrimary;
//     const growthColor = isGrowing ? colors.successGreen : colors.errorRed;
// 
//     const annotationText = (title === 'Real-Time Variance' && isGrowing)
//         ? '⚠️ Spend is +5% over Real-Time Forecast'
//         : (isGrowing ? '+1.2% in margin' : '-0.5% in margin') + ' (Live Simulation)';
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
// // 2. Margin Alert Row
// const MarginAlertEntry = ({ severity, metric, value, reason, timestamp, handleDrillDown }) => {
//     const context = useContext(ColorModeContext); 
//     const { mode } = context; 
// 
//     const severityColor = severity === 'High' ? colors.errorRed : severity === 'Medium' ? colors.lucraGold : colors.successGreen;
//     const Icon = severity === 'High' ? WarningRounded : CheckCircleOutlineRounded;
// 
//     return (
//         <motion.div
//             layout
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 30 }}
//         >
//             <Tooltip title="Click to trace the underlying financial anomaly to the Machine Ledger (L2)">
//                 <ListItem
//                     divider
//                     onClick={handleDrillDown}
//                     sx={{
//                         p: 1.5,
//                         mb: 0.5,
//                         borderRadius: 1,
//                         cursor: 'pointer',
//                         transition: 'background-color 0.2s',
//                         backgroundColor: severity === 'High' ? `${colors.errorRed}15` : 'transparent',
//                         '&:hover': {
//                             backgroundColor: `${colors.accent}15`,
//                             boxShadow: 2
//                         }
//                     }}>
//                     <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={3}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <Icon fontSize="small" sx={{ color: severityColor, mr: 1 }} />
//                                 <Typography variant="body2" fontWeight={600} color="textPrimary">
//                                     {metric}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                         <Grid item xs={4}>
//                             <Typography variant="body2" color="textPrimary">{reason}</Typography>
//                         </Grid>
//                         <Grid item xs={2}>
//                             <Typography variant="body2" fontWeight={700} sx={{ color: severityColor }}>
//                                 {value}
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={3} sx={{ textAlign: 'right' }}>
//                             <Chip
//                                 label={severity}
//                                 size="small"
//                                 sx={{
//                                     bgcolor: severityColor + '15',
//                                     color: severityColor,
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
// // 3. Real-Time Forecast Bar (Simulation)
// const ForecastBar = ({ name, actual, forecast, color, handleDrillDown }) => {
//     const context = useContext(ColorModeContext); 
//     const { mode } = context; 
// 
//     const barColor = color === 'accent' ? colors.accent : color === 'errorRed' ? colors.errorRed : colors.successGreen;
// 
//     // Simulate a difference (variance)
//     const variance = (actual / forecast) * 100;
//     const isOver = actual > forecast;
//     const displayVariance = isOver ? `${(variance - 100).toFixed(1)}% Over` : `${(100 - variance).toFixed(1)}% Under`;
//     const varianceColor = isOver ? colors.errorRed : colors.successGreen;
//     const barPercentage = Math.min(variance, 100); 
// 
//     // Mock entry for modal drill-down
//     const mockEntry = { name: name, description: `Live trace of Operational KPI: ${name}`, isMetric: true };
// 
//     return (
//         <motion.div variants={fadeInUp} style={{ width: '100%', cursor: 'pointer' }}>
//             <Tooltip title={`Click to view the real-time financial model trace.`}>
//                 <Box sx={{ mb: 3 }} onClick={() => handleDrillDown(mockEntry)}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
//                         <Typography variant="body1" fontWeight={700} sx={{ color: colors[mode].textPrimary }}>
//                             {name}
//                         </Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
//                             <Typography variant="body2" fontWeight={600} color="textSecondary">
//                                 Act: ${actual.toFixed(2)}M
//                             </Typography>
//                             <Typography variant="body2" fontWeight={600} sx={{ color: barColor }}>
//                                 Fcast: ${forecast.toFixed(2)}M
//                             </Typography>
//                             <Typography variant="body2" fontWeight={700} sx={{ color: varianceColor, ml: 1 }}>
//                                 {displayVariance}
//                             </Typography>
//                         </Box>
//                     </Box>
//                     <Box sx={{ height: 12, bgcolor: colors[mode].textDim + '22', borderRadius: 1 }}>
//                         <motion.div
//                             initial={{ width: 0 }}
//                             animate={{ width: `${barPercentage}%` }}
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
// // --- The Missing Mock Modal (Simplified for L1/L2) ---
// const MetricDrillDownModal = ({ isOpen, handleClose, entry }) => {
//     const context = useContext(ColorModeContext); 
//     const { mode } = context; 
// 
//     if (!entry) return null;
// 
//     return (
//         <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
//             <Paper sx={{ p: 3, bgcolor: colors[mode].card }}>
//                 <DialogTitle sx={{ p: 0, pb: 2 }}>
//                     <Typography variant="h5" fontWeight={800} color={colors.accent}>
//                         Metric Source Trace: {entry.name}
//                     </Typography>
//                 </DialogTitle>
//                 <DialogContent sx={{ p: 0 }}>
//                     <Grid item xs={12}>
//                         <Typography variant="h6" sx={{ color: colors.lucraGold, mb: 1 }}>
//                             Trace to Omeca Core (L1)
//                         </Typography>
//                         <Typography variant="body1" sx={{ color: colors[mode].textPrimary, mb: 2 }}>
//                             Omeca shows the direct linkage between this real-time KPI and its source operational data (e.g., API consumption, server logs, utilization data).
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             In production, this view opens a filtered stream of the data ingestion layer, confirming the integrity of the operational control system.
//                         </Typography>
//                     </Grid>
//                 </DialogContent>
//                 <Box sx={{ pt: 3, textAlign: 'right' }}>
//                     <Button onClick={handleClose} variant="contained" color="primary">Close Trace</Button>
//                 </Box>
//             </Paper>
//         </Dialog>
//     );
// };
// 
// 
// 
// // --------------------------------------------------------
// // --- THE MAIN DASHBOARD COMPONENT -----------------------
// // --------------------------------------------------------
// const OmecaMarginAlertsPage = ({ setPage }) => {
//     // Note: setPage is used here to allow navigation back to the preview/homepage in a full app.
//     const context = useContext(ColorModeContext); 
//     const { mode, toggleColorMode } = context;
// 
//     // --- State Management ---
//     const [alertStream, setAlertStream] = useState(alertPool.slice(0, 4).map(entry => ({ ...entry, id: Date.now() + Math.random() })));
//     const [marginForecast, setMarginForecast] = useState(25.5);
//     const [variance, setVariance] = useState(5.2);
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
//     const generateNewAlert = useCallback(() => {
//         const alert = alertPool[Math.floor(Math.random() * alertPool.length)];
//         return {
//             ...alert,
//             id: Date.now() + Math.random(),
//             timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }) + 'Z',
//         };
//     }, []);
// 
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setAlertStream(prevData => {
//                 const newEntry = generateNewAlert();
//                 
//                 // Simulate metric drift
//                 setMarginForecast(prev => +(prev + (Math.random() - 0.5) * 0.2).toFixed(2));
//                 setVariance(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));
// 
//                 return [newEntry, ...prevData].slice(0, 7);
//             });
//         }, 4000);
// 
//         return () => clearInterval(interval);
//     }, [generateNewAlert]);
// 
//     const handleMetricClick = (metric) => {
//         setSelectedEntry({
//             name: metric,
//             description: `This high-level metric is tied directly to the audited Machine Ledger data streams and resource utilization APIs.`,
//             isMetric: true
//         });
//         setModalOpen(true);
//     };
// 
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
//             {/* METRIC DRILL-DOWN MODAL */}
//             <MetricDrillDownModal
//                 isOpen={modalOpen}
//                 handleClose={() => setModalOpen(false)}
//                 entry={selectedEntry}
//             />
// 
//             {/* Header and Controls */}
//             <Box sx={{ mb: 5 }}>
//                 <Typography variant="h4" fontWeight={900}>
//                     <GradientText variant="h4" sx={{ fontSize: 'inherit' }}>
//                         Omeca Core (L1)
//                     </GradientText>
//                 </Typography>
//                 <Typography variant="h5" sx={{ color: colors[mode].textPrimary, fontWeight: 700 }}>
//                     Real-Time Operational Control Dashboard
//                 </Typography>
// 
//                 <Typography
//                     variant="subtitle1"
//                     sx={{
//                         color: colors[mode].textSecondary,
//                         fontWeight: 500,
//                         opacity: 0.8
//                     }}
//                 >
//                     Live Margin Alerts, Forecast Variance, and Resource Utilization.
//                 </Typography>
//             </Box>
// 
//             {/* Content Grids */}
//             <motion.div variants={staggerContainer} initial="hidden" animate="show">
//                 <Grid container spacing={4} sx={{ mb: 4 }}>
//                     {/* Metric 1: Gross Margin Forecast (CLICKABLE) */}
//                     <Grid item xs={12} sm={6} md={3}>
//                         <MetricCard
//                             title="Gross Margin Forecast"
//                             value={marginForecast.toFixed(1)}
//                             unit="%"
//                             icon={MarginIcon}
//                             color={colors.successGreen}
//                             isGrowing={marginForecast > 25.0}
//                             onClick={() => handleMetricClick("Gross Margin Forecast")}
//                         />
//                     </Grid>
// 
//                     {/* Metric 2: Real-Time Variance (Spend vs Budget) (CLICKABLE) */}
//                     <Grid item xs={12} sm={6} md={3}>
//                         <MetricCard
//                             title="Real-Time Variance"
//                             value={variance.toFixed(1)}
//                             unit="%"
//                             icon={VarianceIcon}
//                             color={colors.errorRed}
//                             isGrowing={variance > 5.0} // Over 5% is bad
//                             onClick={() => handleMetricClick("Real-Time Variance")}
//                         />
//                     </Grid>
// 
//                     {/* Metric 3: API Latency/Data Freshness (CLICKABLE) */}
//                     <Grid item xs={12} sm={6} md={3}>
//                         <MetricCard
//                             title="Data Stream Latency"
//                             value={250}
//                             unit="ms"
//                             icon={LatencyIcon}
//                             color={colors.accent}
//                             isGrowing={false}
//                             onClick={() => handleMetricClick("Data Stream Latency")}
//                         />
//                     </Grid>
// 
//                     {/* Metric 4: Liquidity Position (CLICKABLE) */}
//                     <Grid item xs={12} sm={6} md={3}>
//                         <MetricCard
//                             title="Liquidity Runway"
//                             value={92}
//                             unit="Days"
//                             icon={SpendIcon}
//                             color={colors.lucraGold}
//                             isGrowing={true}
//                             onClick={() => handleMetricClick("Liquidity Runway")}
//                         />
//                     </Grid>
//                 </Grid>
// 
//                 <Grid container spacing={4}>
//                     {/* Panel 1: Live Margin Alert Stream */}
//                     <Grid item xs={12} md={6}>
//                         <motion.div variants={fadeInUp} style={{ height: '100%' }}>
//                             <Paper sx={{ p: 3, height: '100%' }}>
//                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: `1px solid ${colors[mode].textDim}22` }}>
//                                     <Typography variant="h6" fontWeight={700}>
//                                         Live Margin Anomaly Alerts (L1)
//                                     </Typography>
//                                     <Chip label="2 High Priority" color="error" size="small" sx={{ bgcolor: colors.errorRed, color: colors.dark.bgTop, fontWeight: 700 }} />
//                                 </Box>
//                                 <List sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
//                                     <AnimatePresence>
//                                         {alertStream.map(entry => (
//                                             <MarginAlertEntry
//                                                 key={entry.id}
//                                                 severity={entry.severity}
//                                                 metric={entry.metric}
//                                                 value={entry.value}
//                                                 reason={entry.reason}
//                                                 timestamp={entry.timestamp}
//                                                 handleDrillDown={() => handleDrillDown(entry)}
//                                             />
//                                         ))}
//                                     </AnimatePresence>
//                                 </List>
//                                 <Divider sx={{ mt: 2, mb: 1 }} />
//                                 <Typography variant="caption" color="textSecondary">
//                                     Alerts are triggered by real-time variance against the Omeca Forecast Model.
//                                 </Typography>
//                             </Paper>
//                         </motion.div>
//                     </Grid>
// 
//                     {/* Panel 2: Real-Time Forecast vs Actuals */}
//                     <Grid item xs={12} md={6}>
//                         <motion.div variants={fadeInUp} style={{ height: '100%' }}>
//                             <Paper sx={{ p: 3, height: '100%' }}>
//                                 <Box sx={{ mb: 4, borderBottom: `1px solid ${colors[mode].textDim}22` }}>
//                                     <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
//                                         Real-Time OpEx Financial Trace
//                                     </Typography>
//                                 </Box>
//                                 <ForecastBar name="R&D Compute" actual={1.9} forecast={1.75} color="errorRed" handleDrillDown={handleMetricClick} />
//                                 <ForecastBar name="SaaS/Licensing" actual={0.45} forecast={0.50} color="successGreen" handleDrillDown={handleMetricClick} />
//                                 <ForecastBar name="Cloud Storage" actual={0.21} forecast={0.20} color="errorRed" handleDrillDown={handleMetricClick} />
//                                 <ForecastBar name="Marketing Software" actual={0.62} forecast={0.65} color="successGreen" handleDrillDown={handleMetricClick} />
// 
//                                 <Divider sx={{ mt: 4, mb: 1 }} />
//                                 <Typography variant="caption" color="textSecondary">
//                                     Forecasts are automatically adjusted based on live utilization and machine learning.
//                                 </Typography>
//                             </Paper>
//                         </motion.div>
//                     </Grid>
//                 </Grid>
//             </motion.div>
//         </Box>
//     );
// };
// 
// export default OmecaMarginAlertsPage;

import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Box, Typography, Paper, Grid, List, ListItemButton, Chip, 
    Dialog, DialogTitle, DialogContent, Stack, IconButton, Divider,
    LinearProgress, alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
    GppGood as IntegrityIcon,
    DataUsage as VolumeIcon,
    ErrorOutline as IssueIcon,
    Speed as LatencyIcon,
    CheckCircle,
    Warning,
    Close as CloseIcon,
    Rule as RuleIcon
} from '@mui/icons-material';

// --- GLOBAL IMPORTS ---
import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
import { colors } from '../../../shared/layouts/theme/theme.js';

// --- API CONFIG ---
const API_BASE = "http://127.0.0.1:8000/api/v1";

// --- ANIMATION ---
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
                    {data.isError ? <Warning color="error" /> : <RuleIcon sx={{ color: colors.lucraGold }} />}
                    <Typography variant="h6" fontWeight={700}>System Inspector</Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'grey.500' }}><CloseIcon /></IconButton>
            </DialogTitle>
            <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
            <DialogContent>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 700, letterSpacing: 1 }}>CONTEXT</Typography>
                        <Typography variant="body1" fontWeight={700}>{data.id}</Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400', mt: 0.5 }}>{data.desc}</Typography>
                    </Box>
                    
                    <Box>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 700, letterSpacing: 1 }}>RAW PAYLOAD / LOGIC</Typography>
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

// --- METRIC CARD ---
const MetricCard = ({ title, value, subtext, icon: Icon, color, trend, onClick }) => {
    const { mode } = useContext(ColorModeContext);
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
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${color}15`, color: color, display: 'flex' }}>
                        <Icon fontSize="small" />
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: isDark ? 'grey.400' : 'grey.600', fontWeight: 700 }}>
                        {title}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: palette.textPrimary, letterSpacing: '-0.03em' }}>
                        {value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: trend === 'good' ? colors.successGreen : colors.errorRed, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {subtext}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    );
};

// --- VALIDATION RULE BAR ---
const ValidationRule = ({ label, value, color, onClick }) => {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === 'dark';

    return (
        <Box 
            onClick={onClick}
            sx={{ 
                cursor: 'pointer', 
                '&:hover .MuiTypography-root': { color: color },
                '&:hover .MuiLinearProgress-bar': { opacity: 0.8 }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight={600} color={isDark ? "grey.400" : "grey.600"} sx={{ transition: 'color 0.2s' }}>
                    {label}
                </Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: color }}>
                    {value.toFixed(1)}%
                </Typography>
            </Box>
            <LinearProgress 
                variant="determinate" 
                value={value} 
                sx={{ 
                    height: 6, 
                    borderRadius: 3, 
                    bgcolor: isDark ? 'grey.800' : 'grey.200', 
                    '& .MuiLinearProgress-bar': { bgcolor: color, transition: 'transform 0.5s ease-out' } 
                }} 
            />
        </Box>
    );
};

// --- STREAM ROW ---
const AlertRow = ({ event, onClick }) => {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === 'dark';
    const palette = colors[mode];
    
    // Check if it's an anomaly based on the message content
    const isError = event.message.includes("Error") || event.message.includes("Missing") || event.message.includes("Future");
    const color = isError ? colors.errorRed : colors.successGreen;
    const Icon = isError ? Warning : CheckCircle;

    return (
        <ListItemButton
            onClick={() => onClick({ 
                id: event.id, 
                desc: "Event Payload Inspection",
                isError: isError,
                raw: { 
                    event_id: event.id,
                    status: isError ? "QUARANTINED" : "VERIFIED",
                    check: event.message,
                    latency: "12ms",
                    timestamp: new Date().toISOString()
                } 
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
                    borderColor: color
                }
            }}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={1}>
                    <Icon sx={{ color: color }} />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.textPrimary }}>
                        {event.message}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'grey.500', fontFamily: 'monospace' }}>
                        Ingestion Layer • ID: {event.id}
                    </Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <Chip 
                        label={isError ? "ANOMALY" : "VERIFIED"} 
                        size="small" 
                        sx={{ 
                            bgcolor: `${color}15`, 
                            color: color, 
                            fontWeight: 800, 
                            fontSize: '0.65rem' 
                        }} 
                    />
                </Grid>
            </Grid>
        </ListItemButton>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function OmecaOperationalControlPage() {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === 'dark';
    const bgColors = colors[mode];

    // --- REAL + JITTER DATA STATE ---
    const [data, setData] = useState({
        score: 100,
        scanned: 2405, // Start with a base number so it doesn't look empty
        latency: 12,
        issues: [],
        isConnected: false
    });

    // Validation Rules (Simulated Fluctuation)
    const [rules, setRules] = useState({
        schema: 100,
        timestamp: 99.8,
        dedup: 100
    });

    const [stream, setStream] = useState([]); 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // --- 1. POLL BACKEND (The Truth) ---
    useEffect(() => {
        const fetchL1Data = async () => {
            try {
                const res = await fetch(`${API_BASE}/integrity/score`);
                if (res.ok) {
                    const json = await res.json();
                    const backendIssues = json.metrics.active_issues || [];
                    
                    // We update the issues and connection status from backend
                    setData(prev => ({
                        ...prev,
                        issues: backendIssues,
                        isConnected: true
                    }));
                }
            } catch (err) {
                // Keep default state or show error
            }
        };
        const interval = setInterval(fetchL1Data, 2000); // Poll slower for heavy data
        fetchL1Data();
        return () => clearInterval(interval);
    }, []);

    // --- 2. LIVE JITTER ENGINE (The Visuals) ---
    useEffect(() => {
        const jitterInterval = setInterval(() => {
            setData(prev => ({
                ...prev,
                // Volume ticks up constantly to show throughput
                scanned: prev.scanned + Math.floor(Math.random() * 5), 
                // Latency jitters between 8ms and 45ms
                latency: Math.floor(Math.random() * (45 - 8 + 1) + 8),
                // Score breathes slightly between 99.8 and 100
                score: prev.issues.length > 0 ? 92.5 : (Math.random() > 0.8 ? 99.9 : 100)
            }));

            // Micro-fluctuations for validation rules
            setRules({
                schema: Math.random() > 0.9 ? 99.9 : 100,
                timestamp: Math.random() > 0.7 ? (99.0 + Math.random()) : 99.9,
                dedup: 100
            });

        }, 800); // Updates every 800ms

        return () => clearInterval(jitterInterval);
    }, []);

    // --- 3. LIVE STREAM GENERATOR ---
    useEffect(() => {
        const generateEvent = () => {
            const id = Math.floor(Math.random() * 9000) + 1000;
            const isAnomaly = data.issues.length > 0 && Math.random() > 0.7; 
            
            let newEvent;
            
            if (isAnomaly) {
                const errorMsg = data.issues[Math.floor(Math.random() * data.issues.length)];
                newEvent = { id: `ERR-${id}`, message: errorMsg, type: 'error' };
            } else {
                const successMessages = [
                    "Schema validation passed", 
                    "Timestamp verified", 
                    "Currency normalized: USD", 
                    "Deduplication check passed",
                    "Vendor ID matched",
                    "API Token Validated"
                ];
                const msg = successMessages[Math.floor(Math.random() * successMessages.length)];
                newEvent = { id: `EV-${id}`, message: msg, type: 'success' };
            }

            setStream(prev => [newEvent, ...prev].slice(0, 6)); // Keep last 6
        };

        const streamInterval = setInterval(generateEvent, 600); // Fast stream
        return () => clearInterval(streamInterval);
    }, [data.issues]);

    const handleOpenInspector = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            p: { xs: 2, md: 6 }, 
            bgcolor: bgColors.bgTop,
            color: bgColors.textPrimary,
            transition: 'background-color 0.3s'
        }}>
            
            <InspectorModal 
                open={modalOpen} 
                onClose={() => setModalOpen(false)} 
                data={selectedItem} 
            />

            {/* HEADER */}
            <Box sx={{ mb: 6, maxWidth: 800 }}>
                <Typography variant="overline" sx={{ color: colors.accent, fontWeight: 700, letterSpacing: 2 }}>
                    LAYER 1: CORE
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mb: 2, mt: 1, color: bgColors.textPrimary }}>
                    Operational <GradientSpan>Integrity</GradientSpan>
                </Typography>
                <Typography variant="h6" sx={{ color: 'grey.500', fontWeight: 400, lineHeight: 1.6 }}>
                    Real-time validation of the operational data stream. 
                    Omeca ensures data quality <i>before</i> it hits the ledger.
                </Typography>
            </Box>

            {/* METRICS GRID */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    
                    <Grid item xs={12} md={4}>
                        <motion.div variants={itemVariants} style={{ height: '100%' }}>
                            <MetricCard
                                title="Data Integrity Score"
                                value={`${data.score}%`}
                                subtext={data.score === 100 ? "● Optimal Health" : "● Degradation Detected"}
                                icon={IntegrityIcon}
                                color={data.score > 90 ? colors.successGreen : colors.errorRed}
                                trend={data.score > 90 ? "good" : "bad"}
                                onClick={() => handleOpenInspector({ id: "SYS-HEALTH", desc: "Live Health Calculation", raw: { score: data.score, rules_passed: 142, active_nodes: 3 }})}
                            />
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <motion.div variants={itemVariants} style={{ height: '100%' }}>
                            <MetricCard
                                title="Events Scanned"
                                value={data.scanned.toLocaleString()}
                                subtext="+12% vs last hour"
                                icon={VolumeIcon}
                                color={colors.accent}
                                trend="good"
                                onClick={() => handleOpenInspector({ id: "VOL-METRIC", desc: "Throughput Analysis", raw: { total_events: data.scanned, rate: "124/sec", peak: "11:45 AM" }})}
                            />
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <motion.div variants={itemVariants} style={{ height: '100%' }}>
                            <MetricCard
                                title="Ingestion Latency"
                                value={`${data.latency}ms`}
                                subtext="Real-time Pipeline"
                                icon={LatencyIcon}
                                color={colors.lucraGold}
                                trend="good"
                                onClick={() => handleOpenInspector({ id: "NET-LATENCY", desc: "Network Statistics", raw: { p95: `${data.latency}ms`, p99: "45ms", region: "us-east-1" }})}
                            />
                        </motion.div>
                    </Grid>
                </Grid>

                {/* DETAIL VIEW */}
                <Grid container spacing={4}>
                    
                    {/* LEFT: LIVE STREAM */}
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ 
                            p: 4, 
                            borderRadius: 4, 
                            bgcolor: bgColors.card,
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                            minHeight: 500
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ color: bgColors.textPrimary }}>
                                    Live Ingestion Stream
                                </Typography>
                                <Chip 
                                    label="ACTIVE" 
                                    size="small" 
                                    icon={<Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.successGreen, boxShadow: `0 0 8px ${colors.successGreen}` }} />}
                                    sx={{ bgcolor: `${colors.successGreen}15`, color: colors.successGreen, fontWeight: 800, pl: 0.5 }} 
                                />
                            </Box>

                            <List>
                                <AnimatePresence>
                                    {stream.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <AlertRow event={event} onClick={handleOpenInspector} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </List>
                        </Paper>
                    </Grid>

                    {/* RIGHT: HEALTH ANALYSIS (Interactive & Breathing) */}
                    <Grid item xs={12} md={5}>
                        <Paper sx={{ 
                            p: 4, 
                            borderRadius: 4, 
                            bgcolor: bgColors.card,
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                            height: '100%'
                        }}>
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 4, color: bgColors.textPrimary }}>
                                Validation Rules
                            </Typography>

                            <Stack spacing={4}>
                                <ValidationRule 
                                    label="Schema Compliance" 
                                    value={rules.schema} 
                                    color={colors.successGreen} 
                                    onClick={() => handleOpenInspector({ id: "RULE-SCHEMA", desc: "JSON Schema Validation", raw: { strict_mode: true, schema_version: "v2.1", pass_rate: `${rules.schema}%` } })}
                                />
                                <ValidationRule 
                                    label="Timestamp Validity" 
                                    value={rules.timestamp} 
                                    color={colors.accent} 
                                    onClick={() => handleOpenInspector({ id: "RULE-TIME", desc: "Temporal Integrity Check", raw: { window: "500ms", outliers: 2, pass_rate: `${rules.timestamp.toFixed(1)}%` } })}
                                />
                                <ValidationRule 
                                    label="Duplicate Detection" 
                                    value={rules.dedup} 
                                    color={colors.lucraGold} 
                                    onClick={() => handleOpenInspector({ id: "RULE-DEDUP", desc: "Idempotency Check", raw: { hash_algo: "SHA-256", collisions: 0, pass_rate: "100%" } })}
                                />
                            </Stack>

                            <Box sx={{ mt: 6, p: 2, bgcolor: isDark ? 'rgba(0,0,0,0.2)' : 'grey.50', borderRadius: 2, border: '1px dashed grey' }}>
                                <Typography variant="caption" sx={{ color: 'grey.500', display: 'block', mb: 1, fontWeight: 700 }}>
                                    SYSTEM NOTE
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'grey.500', fontStyle: 'italic' }}>
                                    "Omeca L1 intercepts data at the edge. Any event that fails these checks is quarantined before it can pollute the L2 Ledger."
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            </motion.div>
        </Box>
    );
}