// Omeca/pages/OmecaReconciliationPage.jsx - L2: Continuous Close Dashboard

import React, { useState, useMemo, useContext, useEffect, useCallback } from 'react';
import {
    Box, Typography, Button, IconButton, Paper, Grid, List, ListItem, Chip, Tooltip,
    Dialog, DialogTitle, DialogContent, Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
    AccountTree as LedgerIcon,
    AccessTime as TimeIcon,
    CheckCircleOutline as CheckIcon,
    Sync as SyncIcon,
    Gavel as PolicyIcon,
    Autorenew as AutoIcon,
} from '@mui/icons-material';

// --- Color Palette and Configuration (WCAG Readability Enhanced) ---
export const colors = {
    accent: '#00ace5ff',
    lucraGold: '#37d4cfff',
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
const reconciliationPool = [
    { id: 1, source: 'AWS Billing API', action: 'Cost Tagging & Allocation', status: 'Reconciled', value: 0.15, je_id: 'JE-202511-001' },
    { id: 2, source: 'Stripe Payments', action: 'Revenue Recognition', status: 'Manual Review', value: 0.05, je_id: 'N/A' },
    { id: 3, source: 'Salesforce Usage', action: 'Accrual Calculation', status: 'Reconciled', value: 0.08, je_id: 'JE-202511-002' },
    { id: 4, source: 'Internal Payroll', action: 'GL Posting', status: 'Reconciled', value: 0.30, je_id: 'JE-202511-003' },
    { id: 5, source: 'Azure Compute', action: 'Cost Tagging & Allocation', status: 'Reconciled', value: 0.10, je_id: 'JE-202511-004' },
];

// --- REUSABLE DASHBOARD COMPONENTS ---

// 1. MetricCard (Reused from Governance Dashboard)
const MetricCard = ({ title, value, unit, icon: Icon, color, isGrowing = true, onClick }) => {
    const context = useContext(ColorModeContext); 
    const { mode } = context; 

    const primaryTextColor = colors[mode].textPrimary;
    const isErrorMetric = title === 'Manual Review Exceptions';
    const growthColor = isErrorMetric 
        ? (isGrowing ? colors.errorRed : colors.successGreen)
        : (isGrowing ? colors.successGreen : colors.errorRed);

    const annotationText = (title === 'Time to Close' && isGrowing)
        ? '✅ Faster Reconciliation (Prototype)'
        : (title === 'Manual Review Exceptions' && isGrowing)
            ? '⚠️ +12% exceptions this hour'
            : (isGrowing ? '+1.2% rate increase' : '-0.8% rate decrease') + ' (Live Simulation)';

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


// 2. Reconciliation Stream Row
const ReconciliationEntry = ({ source, action, status, value, je_id, handleDrillDown }) => {
    const context = useContext(ColorModeContext); 
    const { mode } = context; 

    const isReconciled = status === 'Reconciled';
    const statusColor = isReconciled ? colors.successGreen : colors.errorRed;
    const Icon = isReconciled ? CheckIcon : SyncIcon;
    const chipLabel = status;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
            <Tooltip title="Click to view full Machine Ledger Trace and Journal Entry generation proof.">
                <ListItem
                    divider
                    onClick={handleDrillDown}
                    sx={{
                        p: 1.5,
                        mb: 0.5,
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        backgroundColor: isReconciled ? 'transparent' : `${colors.errorRed}15`,
                        '&:hover': {
                            backgroundColor: `${colors.accent}15`,
                            boxShadow: 2
                        }
                    }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Icon fontSize="small" sx={{ color: statusColor, mr: 1 }} />
                                <Typography variant="body2" fontWeight={600} color="textPrimary">
                                    {source}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textPrimary">{action}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" fontWeight={700} sx={{ color: colors.lucraGold }}>
                                ${value.toFixed(2)}M
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                            <Chip
                                label={chipLabel}
                                size="small"
                                sx={{
                                    bgcolor: statusColor + '15',
                                    color: statusColor,
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


// 3. Journal Entry Automation Status Bar
const AutomationBar = ({ name, percentage, color, entries, handleDrillDown }) => {
    const context = useContext(ColorModeContext); 
    const { mode } = context; 
    
    const barColor = color === 'accent' ? colors.accent : color === 'lucraGold' ? colors.lucraGold : color === 'errorRed' ? colors.errorRed : colors.successGreen;

    // Mock entry object for modal drill-down
    const mockEntry = { name: name, description: `Journal Entry Automation for: ${name}`, isMetric: true };

    return (
        <motion.div variants={fadeInUp} style={{ width: '100%', cursor: 'pointer' }}>
            <Tooltip title={`Click to view the Machine Ledger policy that automates these journal entries.`}>
                <Box sx={{ mb: 2 }} onClick={() => handleDrillDown(mockEntry)}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body1" fontWeight={700} sx={{ color: colors[mode].textPrimary }}>
                            {name}
                        </Typography>
                        <Typography variant="body1" fontWeight={700} sx={{ color: barColor }}>
                            {percentage}% Automated ({entries} JEs)
                        </Typography>
                    </Box>
                    <Box sx={{ height: 10, bgcolor: colors[mode].textDim + '22', borderRadius: 1 }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
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

// --- The Missing Mock Modal (Simplified for L1/L2 - Reused/Adapted) ---
const LedgerDrillDownModal = ({ isOpen, handleClose, entry }) => {
    const context = useContext(ColorModeContext); 
    const { mode } = context; 

    if (!entry) return null;

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
            <Paper sx={{ p: 3, bgcolor: colors[mode].card }}>
                <DialogTitle sx={{ p: 0, pb: 2 }}>
                    <Typography variant="h5" fontWeight={800} color={colors.accent}>
                        Ledger Trace: {entry.name}
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: colors.lucraGold, mb: 1 }}>
                            Trace to Omeca Ledger (L2) Policy
                        </Typography>
                        <Typography variant="body1" sx={{ color: colors[mode].textPrimary, mb: 2 }}>
                            Omeca shows the automated policy and data points used to create the journal entry or reconciliation proof for this transaction/metric.
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            In production, this opens the immutable trace, linking the GL entry back to the raw, time-stamped machine log.
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
const OmecaReconciliationPage = ({ setPage }) => {
    const context = useContext(ColorModeContext); 
    const { mode, toggleColorMode } = context;

    // --- State Management ---
    const [recoStream, setRecoStream] = useState(reconciliationPool.slice(0, 5).map(entry => ({ ...entry, id: Date.now() + Math.random() })));
    const [autoRecoRate, setAutoRecoRate] = useState(88.5);
    const [manualExceptions, setManualExceptions] = useState(8);

    // Drill-down Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    const handleDrillDown = useCallback((entry) => {
        setSelectedEntry(entry);
        setModalOpen(true);
    }, []);

    const generateNewEntry = useCallback(() => {
        const entry = reconciliationPool[Math.floor(Math.random() * reconciliationPool.length)];
        return {
            ...entry,
            id: Date.now() + Math.random(),
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRecoStream(prevData => {
                const newEntry = generateNewEntry();
                
                // Simulate metric drift
                setAutoRecoRate(prev => Math.min(+(prev + (Math.random() - 0.5) * 0.1).toFixed(1), 99.9));
                setManualExceptions(prev => Math.max(0, prev + (Math.random() > 0.7 ? 1 : (Math.random() < 0.3 ? -1 : 0))));

                return [newEntry, ...prevData].slice(0, 7);
            });
        }, 3500);

        return () => clearInterval(interval);
    }, [generateNewEntry]);


    const handleMetricClick = (metric) => {
        setSelectedEntry({
            name: metric,
            description: `This metric represents the efficiency and accuracy of the continuous reconciliation engine.`,
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
            {/* LEDGER DRILL-DOWN MODAL */}
            <LedgerDrillDownModal
                isOpen={modalOpen}
                handleClose={() => setModalOpen(false)}
                entry={selectedEntry}
            />

            {/* Header and Controls */}
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" fontWeight={900}>
                    <GradientText variant="h4" sx={{ fontSize: 'inherit' }}>
                        Omeca Ledger (L2)
                    </GradientText>
                </Typography>
                <Typography variant="h5" sx={{ color: colors[mode].textPrimary, fontWeight: 700 }}>
                    Continuous Close Dashboard
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: colors[mode].textSecondary,
                        fontWeight: 500,
                        opacity: 0.8
                    }}
                >
                    Automated Reconciliation, Subledger Integrity, and Journal Entry Generation.
                </Typography>
            </Box>

            {/* Content Grids */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {/* Metric 1: Automated Reconciliation Rate (CLICKABLE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Auto Reconciliation Rate"
                            value={autoRecoRate.toFixed(1)}
                            unit="%"
                            icon={AutoIcon}
                            color={colors.successGreen}
                            isGrowing={autoRecoRate > 88.0}
                            onClick={() => handleMetricClick("Auto Reconciliation Rate")}
                        />
                    </Grid>

                    {/* Metric 2: Time to Close (CLICKABLE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Time to Close"
                            value={0.5}
                            unit="Days"
                            icon={TimeIcon}
                            color={colors.accent}
                            isGrowing={true} 
                            onClick={() => handleMetricClick("Time to Close")}
                        />
                    </Grid>

                    {/* Metric 3: Manual Review Exceptions (CLICKABLE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Manual Review Exceptions"
                            value={manualExceptions}
                            unit="Items"
                            icon={PolicyIcon}
                            color={colors.errorRed}
                            isGrowing={manualExceptions > 7}
                            onClick={() => handleMetricClick("Manual Review Exceptions")}
                        />
                    </Grid>

                    {/* Metric 4: Ledger Health (CLICKABLE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Ledger Health"
                            value={99.9}
                            unit="%"
                            icon={LedgerIcon}
                            color={colors.lucraGold}
                            isGrowing={true} 
                            onClick={() => handleMetricClick("Ledger Health")}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={4}>
                    {/* Panel 1: Live Reconciliation Stream */}
                    <Grid item xs={12} md={6}>
                        <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: `1px solid ${colors[mode].textDim}22` }}>
                                    <Typography variant="h6" fontWeight={700}>
                                        Live Reconciliation Stream (L2)
                                    </Typography>
                                    <Chip label="Continuous" color="primary" size="small" sx={{ bgcolor: colors.accent, color: colors.dark.bgTop, fontWeight: 700 }} />
                                </Box>
                                <List sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
                                    <AnimatePresence>
                                        {recoStream.map(entry => (
                                            <ReconciliationEntry
                                                key={entry.id}
                                                source={entry.source}
                                                action={entry.action}
                                                status={entry.status}
                                                value={entry.value}
                                                je_id={entry.je_id}
                                                handleDrillDown={() => handleDrillDown(entry)}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </List>
                                <Divider sx={{ mt: 2, mb: 1 }} />
                                <Typography variant="caption" color="textSecondary">
                                    Machine Ledger continuously processes source data into audit-ready subledger entries.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* Panel 2: Journal Entry Automation */}
                    <Grid item xs={12} md={6}>
                        <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Box sx={{ mb: 4, borderBottom: `1px solid ${colors[mode].textDim}22` }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                        Journal Entry Automation Status
                                    </Typography>
                                </Box>
                                <AutomationBar name="OpEx Accruals" percentage={95} entries={45} color="successGreen" handleDrillDown={handleMetricClick} />
                                <AutomationBar name="Revenue Recognition" percentage={80} entries={120} color="lucraGold" handleDrillDown={handleMetricClick} />
                                <AutomationBar name="Fixed Assets" percentage={99} entries={5} color="accent" handleDrillDown={handleMetricClick} />
                                <AutomationBar name="Inter-Company" percentage={40} entries={15} color="errorRed" handleDrillDown={handleMetricClick} />

                                <Divider sx={{ mt: 4, mb: 1 }} />
                                <Typography variant="caption" color="textSecondary">
                                    Automation percentages represent transactions moving directly from Subledger to GL without manual intervention.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>
        </Box>
    );
};

export default OmecaReconciliationPage;