// Omeca/pages/OmecaMarginAlertsPage.jsx - L1: Operational Control Dashboard

import React, { useState, useMemo, useContext, useEffect, useCallback } from 'react';
import {
    Box, Typography, Button, IconButton, Paper, Grid, List, ListItem, Chip, Tooltip,
    Dialog, DialogTitle, DialogContent, Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
    MonetizationOn as SpendIcon,
    CompareArrows as VarianceIcon,
    Calculate as MarginIcon,
    QueryBuilder as LatencyIcon,
    WarningRounded,
    CheckCircleOutlineRounded,
} from '@mui/icons-material';

// --- Color Palette and Configuration (WCAG Readability Enhanced) ---
export const colors = {
    accent: '#00E5BE',
    lucraGold: '#D4AF37',
    errorRed: '#FF4136',
    successGreen: '#2ECC40',
    logoDark: '#1A334A',
    dark: {
        bgTop: '#1A2433',
        bgGradA: '#2A344A',
        bgGradB: '#111827',
        card: '#243040',
        textDim: 'rgba(255,255,255,0.85)',
        textPrimary: '#F0F3F7',
    },
    light: {
        bgTop: '#F8F9FA',
        bgGradA: '#E6F4F1',
        bgGradB: '#D8E8E6',
        card: '#FFFFFF',
        textDim: 'rgba(0,0,0,0.82)',
        textPrimary: '#1F2937',
    }
};

// Mock Context for environment
const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'dark' });


// --- Gradient Utility ---
const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline',
    fontWeight: 700,
}));

// --- Framer Motion Variants ---
const fadeInUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } };
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

// --- Mock Data Sources ---
const alertPool = [
    { id: 1, severity: 'High', metric: 'Gross Margin Variance', value: '-8.5%', reason: 'AWS Compute Overrun (R&D)', timestamp: '11:05:30Z' },
    { id: 2, severity: 'Medium', metric: 'Liquidity Position', value: '45 Days', reason: 'Delayed A/R Postings', timestamp: '11:06:15Z' },
    { id: 3, severity: 'High', metric: 'Forecast Accuracy', value: '15% Miss', reason: 'Unaccounted Hardware Spend', timestamp: '11:07:01Z' },
    { id: 4, severity: 'Low', metric: 'Spend vs Budget', value: '+2.1%', reason: 'Standard SaaS Subscription', timestamp: '11:07:45Z' },
];

// --- REUSABLE DASHBOARD COMPONENTS ---

// 1. MetricCard (Reused from Governance Dashboard)
const MetricCard = ({ title, value, unit, icon: Icon, color, isGrowing = true, onClick }) => {
    const context = useContext(ColorModeContext); 
    const { mode } = context; 
    
    const primaryTextColor = colors[mode].textPrimary;
    const growthColor = isGrowing ? colors.successGreen : colors.errorRed;

    const annotationText = (title === 'Real-Time Variance' && isGrowing)
        ? '⚠️ Spend is +5% over Real-Time Forecast'
        : (isGrowing ? '+1.2% in margin' : '-0.5% in margin') + ' (Live Simulation)';


    return (
        <motion.div variants={fadeInUp} style={{ height: '100%', cursor: 'pointer' }}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderLeft: `4px solid ${color}`,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
                }}
                onClick={onClick}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" sx={{ color: color, fontWeight: 700 }}>
                        {title}
                    </Typography>
                    <Icon sx={{ color: color, opacity: 0.7 }} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: primaryTextColor }}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        {value}
                    </motion.span>
                    <Typography component="span" variant="h5" sx={{ fontWeight: 500, ml: 1, color: color }}>
                        {unit}
                    </Typography>
                </Typography>
                <Typography variant="caption" color={growthColor} sx={{ mt: 1 }}>
                    {annotationText}
                </Typography>
            </Paper>
        </motion.div>
    );
};


// 2. Margin Alert Row
const MarginAlertEntry = ({ severity, metric, value, reason, timestamp, handleDrillDown }) => {
    const context = useContext(ColorModeContext); 
    const { mode } = context; 

    const severityColor = severity === 'High' ? colors.errorRed : severity === 'Medium' ? colors.lucraGold : colors.successGreen;
    const Icon = severity === 'High' ? WarningRounded : CheckCircleOutlineRounded;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
            <Tooltip title="Click to trace the underlying financial anomaly to the Machine Ledger (L2)">
                <ListItem
                    divider
                    onClick={handleDrillDown}
                    sx={{
                        p: 1.5,
                        mb: 0.5,
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        backgroundColor: severity === 'High' ? `${colors.errorRed}15` : 'transparent',
                        '&:hover': {
                            backgroundColor: `${colors.accent}15`,
                            boxShadow: 2
                        }
                    }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Icon fontSize="small" sx={{ color: severityColor, mr: 1 }} />
                                <Typography variant="body2" fontWeight={600} color="textPrimary">
                                    {metric}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textPrimary">{reason}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" fontWeight={700} sx={{ color: severityColor }}>
                                {value}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                            <Chip
                                label={severity}
                                size="small"
                                sx={{
                                    bgcolor: severityColor + '15',
                                    color: severityColor,
                                    fontWeight: 700
                                }}
                            />
                        </Grid>
                    </Grid>
                </ListItem>
            </Tooltip>
        </motion.div>
    );
};


// 3. Real-Time Forecast Bar (Simulation)
const ForecastBar = ({ name, actual, forecast, color, handleDrillDown }) => {
    const context = useContext(ColorModeContext); 
    const { mode } = context; 

    const barColor = color === 'accent' ? colors.accent : color === 'errorRed' ? colors.errorRed : colors.successGreen;

    // Simulate a difference (variance)
    const variance = (actual / forecast) * 100;
    const isOver = actual > forecast;
    const displayVariance = isOver ? `${(variance - 100).toFixed(1)}% Over` : `${(100 - variance).toFixed(1)}% Under`;
    const varianceColor = isOver ? colors.errorRed : colors.successGreen;
    const barPercentage = Math.min(variance, 100); 

    // Mock entry for modal drill-down
    const mockEntry = { name: name, description: `Live trace of Operational KPI: ${name}`, isMetric: true };

    return (
        <motion.div variants={fadeInUp} style={{ width: '100%', cursor: 'pointer' }}>
            <Tooltip title={`Click to view the real-time financial model trace.`}>
                <Box sx={{ mb: 3 }} onClick={() => handleDrillDown(mockEntry)}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="body1" fontWeight={700} sx={{ color: colors[mode].textPrimary }}>
                            {name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                            <Typography variant="body2" fontWeight={600} color="textSecondary">
                                Act: ${actual.toFixed(2)}M
                            </Typography>
                            <Typography variant="body2" fontWeight={600} sx={{ color: barColor }}>
                                Fcast: ${forecast.toFixed(2)}M
                            </Typography>
                            <Typography variant="body2" fontWeight={700} sx={{ color: varianceColor, ml: 1 }}>
                                {displayVariance}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ height: 12, bgcolor: colors[mode].textDim + '22', borderRadius: 1 }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barPercentage}%` }}
                            transition={{ duration: 1.2, type: 'spring', stiffness: 50, damping: 10 }}
                            style={{
                                height: '100%',
                                backgroundColor: barColor,
                                borderRadius: 'inherit',
                            }}
                        />
                    </Box>
                </Box>
            </Tooltip>
        </motion.div>
    );
};


// --- The Missing Mock Modal (Simplified for L1/L2) ---
const MetricDrillDownModal = ({ isOpen, handleClose, entry }) => {
    const context = useContext(ColorModeContext); 
    const { mode } = context; 

    if (!entry) return null;

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
            <Paper sx={{ p: 3, bgcolor: colors[mode].card }}>
                <DialogTitle sx={{ p: 0, pb: 2 }}>
                    <Typography variant="h5" fontWeight={800} color={colors.accent}>
                        Metric Source Trace: {entry.name}
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: colors.lucraGold, mb: 1 }}>
                            Trace to Omeca Core (L1)
                        </Typography>
                        <Typography variant="body1" sx={{ color: colors[mode].textPrimary, mb: 2 }}>
                            Omeca shows the direct linkage between this real-time KPI and its source operational data (e.g., API consumption, server logs, utilization data).
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            In production, this view opens a filtered stream of the data ingestion layer, confirming the integrity of the operational control system.
                        </Typography>
                    </Grid>
                </DialogContent>
                <Box sx={{ pt: 3, textAlign: 'right' }}>
                    <Button onClick={handleClose} variant="contained" color="primary">Close Trace</Button>
                </Box>
            </Paper>
        </Dialog>
    );
};



// --------------------------------------------------------
// --- THE MAIN DASHBOARD COMPONENT -----------------------
// --------------------------------------------------------
const OmecaMarginAlertsPage = ({ setPage }) => {
    // Note: setPage is used here to allow navigation back to the preview/homepage in a full app.
    const context = useContext(ColorModeContext); 
    const { mode, toggleColorMode } = context;

    // --- State Management ---
    const [alertStream, setAlertStream] = useState(alertPool.slice(0, 4).map(entry => ({ ...entry, id: Date.now() + Math.random() })));
    const [marginForecast, setMarginForecast] = useState(25.5);
    const [variance, setVariance] = useState(5.2);

    // Drill-down Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    const handleDrillDown = useCallback((entry) => {
        setSelectedEntry(entry);
        setModalOpen(true);
    }, []);

    const generateNewAlert = useCallback(() => {
        const alert = alertPool[Math.floor(Math.random() * alertPool.length)];
        return {
            ...alert,
            id: Date.now() + Math.random(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }) + 'Z',
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAlertStream(prevData => {
                const newEntry = generateNewAlert();
                
                // Simulate metric drift
                setMarginForecast(prev => +(prev + (Math.random() - 0.5) * 0.2).toFixed(2));
                setVariance(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));

                return [newEntry, ...prevData].slice(0, 7);
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [generateNewAlert]);

    const handleMetricClick = (metric) => {
        setSelectedEntry({
            name: metric,
            description: `This high-level metric is tied directly to the audited Machine Ledger data streams and resource utilization APIs.`,
            isMetric: true
        });
        setModalOpen(true);
    };


    // --- Render Logic ---
    return (
        <Box
            sx={{
                minHeight: '100vh',
                p: { xs: 2, md: 4 },
                background: `linear-gradient(135deg, ${colors[mode].bgGradA} 0%, ${colors[mode].bgGradB} 100%)`,
                transition: 'background 0.5s ease-in-out',
                color: colors[mode].textPrimary,
                pt: 8
            }}
        >
            {/* METRIC DRILL-DOWN MODAL */}
            <MetricDrillDownModal
                isOpen={modalOpen}
                handleClose={() => setModalOpen(false)}
                entry={selectedEntry}
            />

            {/* Header and Controls */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" fontWeight={900}>
                    <GradientText variant="h4" sx={{ fontSize: 'inherit' }}>
                        Omeca Core (L1)
                    </GradientText>
                </Typography>
                <Typography variant="h5" sx={{ color: colors[mode].textPrimary, fontWeight: 700 }}>
                    Real-Time Operational Control Dashboard
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: colors[mode].textSecondary,
                        fontWeight: 500,
                        opacity: 0.8
                    }}
                >
                    Live Margin Alerts, Forecast Variance, and Resource Utilization.
                </Typography>
            </Box>

            {/* Content Grids */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {/* Metric 1: Gross Margin Forecast (CLICKABLE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Gross Margin Forecast"
                            value={marginForecast.toFixed(1)}
                            unit="%"
                            icon={MarginIcon}
                            color={colors.successGreen}
                            isGrowing={marginForecast > 25.0}
                            onClick={() => handleMetricClick("Gross Margin Forecast")}
                        />
                    </Grid>

                    {/* Metric 2: Real-Time Variance (Spend vs Budget) (CLICKABLE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Real-Time Variance"
                            value={variance.toFixed(1)}
                            unit="%"
                            icon={VarianceIcon}
                            color={colors.errorRed}
                            isGrowing={variance > 5.0} // Over 5% is bad
                            onClick={() => handleMetricClick("Real-Time Variance")}
                        />
                    </Grid>

                    {/* Metric 3: API Latency/Data Freshness (CLICKABLE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Data Stream Latency"
                            value={250}
                            unit="ms"
                            icon={LatencyIcon}
                            color={colors.accent}
                            isGrowing={false}
                            onClick={() => handleMetricClick("Data Stream Latency")}
                        />
                    </Grid>

                    {/* Metric 4: Liquidity Position (CLICKABLE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Liquidity Runway"
                            value={92}
                            unit="Days"
                            icon={SpendIcon}
                            color={colors.lucraGold}
                            isGrowing={true}
                            onClick={() => handleMetricClick("Liquidity Runway")}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={4}>
                    {/* Panel 1: Live Margin Alert Stream */}
                    <Grid item xs={12} md={6}>
                        <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: `1px solid ${colors[mode].textDim}22` }}>
                                    <Typography variant="h6" fontWeight={700}>
                                        Live Margin Anomaly Alerts (L1)
                                    </Typography>
                                    <Chip label="2 High Priority" color="error" size="small" sx={{ bgcolor: colors.errorRed, color: colors.dark.bgTop, fontWeight: 700 }} />
                                </Box>
                                <List sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
                                    <AnimatePresence>
                                        {alertStream.map(entry => (
                                            <MarginAlertEntry
                                                key={entry.id}
                                                severity={entry.severity}
                                                metric={entry.metric}
                                                value={entry.value}
                                                reason={entry.reason}
                                                timestamp={entry.timestamp}
                                                handleDrillDown={() => handleDrillDown(entry)}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </List>
                                <Divider sx={{ mt: 2, mb: 1 }} />
                                <Typography variant="caption" color="textSecondary">
                                    Alerts are triggered by real-time variance against the Omeca Forecast Model.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* Panel 2: Real-Time Forecast vs Actuals */}
                    <Grid item xs={12} md={6}>
                        <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Box sx={{ mb: 4, borderBottom: `1px solid ${colors[mode].textDim}22` }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                        Real-Time OpEx Financial Trace
                                    </Typography>
                                </Box>
                                <ForecastBar name="R&D Compute" actual={1.9} forecast={1.75} color="errorRed" handleDrillDown={handleMetricClick} />
                                <ForecastBar name="SaaS/Licensing" actual={0.45} forecast={0.50} color="successGreen" handleDrillDown={handleMetricClick} />
                                <ForecastBar name="Cloud Storage" actual={0.21} forecast={0.20} color="errorRed" handleDrillDown={handleMetricClick} />
                                <ForecastBar name="Marketing Software" actual={0.62} forecast={0.65} color="successGreen" handleDrillDown={handleMetricClick} />

                                <Divider sx={{ mt: 4, mb: 1 }} />
                                <Typography variant="caption" color="textSecondary">
                                    Forecasts are automatically adjusted based on live utilization and machine learning.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>
        </Box>
    );
};

export default OmecaMarginAlertsPage;