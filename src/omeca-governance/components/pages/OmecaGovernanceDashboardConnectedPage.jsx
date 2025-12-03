import React, { useState, useMemo, useContext, useEffect, useCallback, useRef } from 'react';
import {
    ThemeProvider, createTheme, Box, Typography, Button, IconButton, Paper, Grid,
    List, ListItem, ListItemText, Divider, Chip, CssBaseline, Tooltip, Dialog, DialogTitle, DialogContent, Alert, CircularProgress,
    responsiveFontSizes // --- ADDED: Import for responsive fonts ---
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BoltIcon from '@mui/icons-material/Bolt';
import PeopleIcon from '@mui/icons-material/People';
import GavelIcon from '@mui/icons-material/Gavel';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from '@mui/material/styles';

import { certifyEvent } from "../../api/auth";
import AuditCertModal from "../AuditCertModal";


// --- Auth function (inlined for simplicity) ---
export async function getAuthToken() {
    console.log("getAuthToken: Fetching dev token...");
    // const res = await fetch("http://127.0.0.1:8000/generate-token-for-dev");
    const res = await fetch(`${API_BASE_URL}/generate-token-for-dev`);

    if (!res.ok) {
        console.error("getAuthToken: Failed to get token", res.status);
        throw new Error("Failed to get token");
    }
    const { access_token } = await res.json();
    console.log("getAuthToken: Token received.");
    return access_token;
}


// --- Color Palette and Configuration (Unchanged) ---
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

// --- Gradient Utility & Theme Utilities (Unchanged) ---
const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline',
    fontWeight: theme.typography.fontWeightBold,
}));

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: { main: colors.accent },
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
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h3: { fontSize: '2.5rem' },
        h5: { fontSize: '1.4rem' },
        body1: { fontSize: '1rem' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: mode === 'dark' ? colors.dark.bgTop : colors.light.bgTop,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: colors[mode].card,
                }
            }
        }
    },
});

export const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: 'dark' });

const ThemeWrapper = ({ children }) => {
    const [mode, setMode] = useState('dark');
    const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
        }),
        [mode]
    );

    // --- UPDATED: Apply responsiveFontSizes to the theme ---
    const theme = useMemo(() => {
        let baseTheme = createTheme(getDesignTokens(mode));
        return responsiveFontSizes(baseTheme); // Wraps the theme to make fonts responsive
    }, [mode]);

    return (
        <ColorModeContext.Provider value={{ ...colorMode, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
// --- Framer Motion Variants (Unchanged) ---
const fadeInUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } };
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }

// --- ATOMIC AUDIT LOG MODAL (Data-mapped) ---
const AtomicAuditLogModal = ({ isOpen, handleClose, entry }) => {
    const { mode } = useContext(ColorModeContext);
    const [stage, setStage] = useState(1);

    const isTransaction = entry && entry.chain_hash !== undefined;

    useEffect(() => {
        if (isOpen && isTransaction) {
            setStage(1);
        }
    }, [isOpen, isTransaction]);

    if (!entry) return null;

    const isAudited = entry.audit_status === 'Audited';
    const statusIcon = isAudited ? <CheckCircleOutlineRounded sx={{ color: colors.successGreen }} /> : <ErrorOutlineIcon sx={{ color: colors.errorRed }} />;
    const statusText = isAudited ? 'AUDIT PASSED: Transaction Reconciled' : 'AUDIT FAILED: Requires Manual Review';

    const DetailItem = ({ label, value, color = 'textPrimary' }) => (
        <Box sx={{ mb: 1, borderBottom: `1px dashed ${colors[mode].textDim}22` }}>
            <Typography variant="caption" color="textSecondary">{label}</Typography>
            <Typography variant="body1" fontWeight={600} color={color} sx={{ wordBreak: 'break-all' }}>{value || 'N/A'}</Typography>
        </Box>
    );

    const renderContent = () => {
        const finalDestination = isAudited ? 'GL (General Ledger) Chained' : 'Quarantine Queue';

        if (!isTransaction) {
            return (
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: colors.accent, mb: 1 }}>
                        Data Source Trace:
                    </Typography>
                    <Typography variant="body1" sx={{ color: colors[mode].textPrimary, mb: 2 }}>
                        {/* UNIFIED MESSAGE: Remove Melucra reference */}
                        {entry.description || "Omeca demonstrates the linkage between this aggregated metric and its underlying, validated Machine Ledger entries."}
                    </Typography>
                </Grid>
            );
        }

        switch (stage) {
            case 1: // RAW INGEST
                return (
                    <Grid item xs={12}>
                        <Typography variant="h6" color={colors.errorRed} sx={{ mb: 1 }}>Stage 1: Raw Ingest (The Problem)</Typography>
                        <DetailItem
                            label="Source Log (Untagged)"
                            value={entry.rule_narrative}
                            color={colors.errorRed}
                        />
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                            This is the raw, unvalidated telemetry captured from the cloud/API endpoint.
                        </Typography>
                    </Grid>
                );
            case 2: // RECONCILIATION
                return (
                    <>
                        <Grid item xs={6}>
                            <Typography variant="h6" color={colors.lucraGold} sx={{ mb: 1 }}>Stage 2: Identity & Cost Audit</Typography>
                            <DetailItem label="Agent ID Verified" value={entry.agent} />
                            <DetailItem label="Action Type" value={entry.action} />
                            <DetailItem label="Atomic Cost Verified" value={`$${entry.cost.toFixed(3)}`} color={colors.accent} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" color={colors.lucraGold} sx={{ mb: 1 }}>Compliance Check</Typography>
                            <DetailItem label="Compliance Rule Checked" value={entry.rule_version} />
                            <DetailItem label="Audit Chain Hash" value={entry.chain_hash} color={colors.accent} />
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                {/* UNIFIED MESSAGE: Remove Melucra reference */}
                                Omeca's intelligence has verified the identity and applied compliance rules.
                            </Typography>
                        </Grid>
                    </>
                );
            case 3: // NORMALIZATION & FINAL REPORT
                return (
                    <>
                        <Grid item xs={6}>
                            <Typography variant="h6" color={colors.successGreen} sx={{ mb: 1 }}>Stage 3: Anchor to Ledger & Explain Decision</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Each ledger record includes its causal trace — the “why” behind every decision.
                            </Typography>
                            <DetailItem label="Policy Trace" value={entry.rule_narrative} />
                            <DetailItem label="Final Destination" value={finalDestination} color={isAudited ? colors.successGreen : colors.errorRed} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" color={colors.successGreen} sx={{ mb: 1 }}>Business Value</Typography>
                            <DetailItem label="Time Saved" value="45 Minutes (Per Entry)" />
                            <DetailItem label="Financial Status" value={isAudited ? 'GL Ready' : 'Leakage Blocked'} color={isAudited ? colors.successGreen : colors.errorRed} />
                        </Grid>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
            <Paper sx={{ p: 3, bgcolor: colors[mode].card }}>
                <DialogTitle sx={{ p: 0, pb: 2 }}>
                    <Typography variant="h5" fontWeight={800} color={colors.accent}>
                        {isTransaction ? `Atomic Audit Trace: ${entry.agent}` : `Data Source Trace`}
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ mb: 3 }}>
                        {isTransaction && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                {[1, 2, 3].map(s => (
                                    <Button
                                        key={s}
                                        onClick={() => setStage(s)}
                                        variant={stage === s ? 'contained' : 'outlined'}
                                        color={stage === s ? 'primary' : 'secondary'}
                                        size="small"
                                        sx={{ flexGrow: 1, mx: 0.5, color: stage === s ? colors.logoDark : colors[mode].textPrimary, borderColor: colors.accent }}
                                    >
                                        {s === 1 ? '1. CAPTURE' : s === 2 ? '2. VAL & ATTEST' : '3. ANCHOR'}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>

                    <Grid container spacing={3}>
                        {renderContent()}

                        {isTransaction && stage === 3 && (
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 1, bgcolor: isAudited ? `${colors.successGreen}15` : `${colors.errorRed}15`, mt: 2 }}>
                                    {statusIcon}
                                    <Typography variant="body1" fontWeight={700} sx={{ ml: 1, color: isAudited ? colors.successGreen : colors.errorRed }}>
                                        {statusText}
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <Box sx={{ pt: 3, textAlign: 'right' }}>
                    <Button onClick={handleClose} variant="contained" color="primary">Close Audit</Button>
                </Box>
            </Paper>
        </Dialog>
    );
};

// --------------------------------------------------------
// --- REUSABLE DASHBOARD COMPONENTS ----------------------
// --------------------------------------------------------

// 1. MetricCard (STYLES ALIGNED WITH STORYBOARD)
const MetricCard = ({ title, value, unit, icon: Icon, color, isGrowing = true, onClick }) => {
    const { mode } = useContext(ColorModeContext);
    const primaryTextColor = colors[mode].textPrimary;
    const growthColor = isGrowing ? colors.successGreen : colors.errorRed;

    const annotationText = (title === 'Unaudited Machine Spend' && isGrowing)
        ? '⚠️ Increase in Unreconciled Spend (Prototype)'
        : (isGrowing ? '+12.5% vs. Last Period' : '-4.2% Cost Overrun') + ' (Prototype Simulation)';


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
                    // --- STYLING FIX: Removed 'alignItems: 'flex-end'' to match storyboard ---
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
                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, type: 'spring' }} >
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


// 2. Real-Time Ledger Activity Stream Row (Data-mapped)
const AuditEntry = ({ agent, action, cost, audit_status, handleDrillDown }) => {
    const { mode } = useContext(ColorModeContext);

    const isAudited = audit_status === 'Audited';
    const statusColor = isAudited ? colors.successGreen : colors.errorRed;
    const anomalyIcon = !isAudited ? '⚠️ ' : '';
    const chipLabel = anomalyIcon + (isAudited ? 'Audited' : 'Audit Required');

    const numericCost = typeof cost === 'number' ? cost : parseFloat(cost) || 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
            <Tooltip title="Click to view full Atomic Audit Log (Proof of Identity & Trace)">
                <ListItem
                    divider
                    onClick={handleDrillDown}
                    sx={{ p: 1.5, mb: 0.5, borderRadius: 1, cursor: 'pointer', transition: 'background-color 0.2s', backgroundColor: isAudited ? 'transparent' : `${colors.errorRed}15`, '&:hover': { backgroundColor: `${colors.accent}15`, boxShadow: 2 } }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <BoltIcon fontSize="small" sx={{ color: statusColor, mr: 1 }} />
                                <Typography variant="body2" fontWeight={600} color="textPrimary">
                                    {agent}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textPrimary">{action}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" fontWeight={700} sx={{ color: statusColor }}>
                                ${numericCost.toFixed(3)}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                            <Chip
                                label={chipLabel}
                                size="small"
                                sx={{ bgcolor: statusColor + '15', color: statusColor, fontWeight: 700 }}
                            />
                        </Grid>
                    </Grid>
                </ListItem>
            </Tooltip>
        </motion.div>
    );
};


// 3. Cost Allocation Bar (Unchanged)
const AllocationBar = ({ name, percentage, color, value, handleDrillDown }) => {
    const { mode } = useContext(ColorModeContext);
    const barColor = color === 'accent' ? colors.accent : colors.lucraGold;
    const mockEntry = { name: name, category: name, value: value };
    const numericPercentage = typeof percentage === 'number' ? percentage : parseFloat(percentage) || 0;

    return (
        <motion.div variants={fadeInUp} style={{ width: '100%', cursor: 'pointer' }}>
            <Tooltip title={`Click to trace this $${value}M allocation to its contributing Machine Ledger entries.`}>
                <Box sx={{ mb: 2 }} onClick={() => handleDrillDown(mockEntry)}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body1" fontWeight={700} sx={{ color: colors[mode].textPrimary }}>
                            {name}
                        </Typography>
                        <Typography variant="body1" fontWeight={700} sx={{ color: barColor }}>
                            {numericPercentage.toFixed(1)}%{value !== undefined ? ` ($${value}M)` : ''}
                        </Typography>
                    </Box>
                    <Box sx={{ height: 10, bgcolor: colors[mode].textDim + '22', borderRadius: 1 }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${numericPercentage}%` }}
                            transition={{ duration: 1.2, type: 'spring', stiffness: 50, damping: 10 }}
                            style={{ height: '100%', backgroundColor: barColor, borderRadius: 'inherit' }}
                        />
                    </Box>
                </Box>
            </Tooltip>
        </motion.div>
    );
};

// --------------------------------------------------------
// --- THE MAIN DASHBOARD COMPONENT -----------------------
// --------------------------------------------------------
const OmecaDashboard = () => {
    const { mode, toggleColorMode } = useContext(ColorModeContext); // Renamed component name to OmecaDashboard

    // --- Backend Connection State & Config ---
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const pollingIntervalRef = useRef(null);

    // const API_BASE_URL = 'http://127.0.0.1:8000';
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://127.0.0.1:8000';
    // --- State Management ---
    const [ledgerData, setLedgerData] = useState([]);
    const [metrics, setMetrics] = useState({
        total_cost: 0,
        total_events: 0,
        compliance_percent: 0,
        audit_pass_percent: 0
    });

    // Drill-down Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    const [certOpen, setCertOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);


    const handleDrillDown = useCallback((entry) => {
        setSelectedEntry(entry);
        setModalOpen(true);
    }, []);


    // --- Main fetchData function (Unchanged) ---
    const fetchData = useCallback(async (isInitialLoad = false) => {
        if (isInitialLoad) setIsLoading(true);
        setApiError(null);
        console.log(`Fetching data...`);

        try {
            const token = await getAuthToken();
            if (!token) {
                throw new Error("Auth token not received. Cannot fetch data.");
            }
            const headers = { 'Authorization': `Bearer ${token}` };

            const reportsRes = await fetch(`${API_BASE_URL}/api/v1/reports/`, { headers });
            const metricsRes = await fetch(`${API_BASE_URL}/api/v1/metrics/summary`, { headers });

            if (!reportsRes.ok) { const body = await reportsRes.text(); throw new Error(`Reports Err: ${reportsRes.status} ${body}`); }
            if (!metricsRes.ok) { const body = await metricsRes.text(); throw new Error(`Metrics Err: ${metricsRes.status} ${body}`); }

            const reportsData = await reportsRes.json();
            const metricsData = await metricsRes.json();

            console.log("Backend Metrics Data:", metricsData);
            console.log("Backend Reports Data:", reportsData);

            const formattedLedgerData = reportsData.records.map(r => {
                return {
                    ...r,
                    id: r.id,
                    agent: r.agent,
                    rule_narrative: r.rule_narrative,
                    audit_status: r.audit_status,
                };
            });

            formattedLedgerData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setLedgerData(formattedLedgerData.slice(0, 7));

            setMetrics(metricsData);
            setApiError(null);

        } catch (error) {
            console.error("Fetch Error:", error);
            let detailedErrorMessage = `Connection error.`;
            if (error instanceof TypeError) detailedErrorMessage = "Network Error: Cannot reach backend.";
            else if (error.message.includes("401")) detailedErrorMessage = "Auth Error: Invalid/Expired Token. Check token.";
            else if (error.message.includes("403")) detailedErrorMessage = "Auth Error: Access Denied.";
            else if (error.message.includes("Auth token not received")) detailedErrorMessage = "Auth Error: Could not get dev token from backend.";
            else detailedErrorMessage = `Error: ${error.message}`;
            setApiError(detailedErrorMessage);
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
                console.log("Polling stopped due to error.");
            }
        } finally {
            if (isInitialLoad) setIsLoading(false);
        }
    }, []);
    // --- END: Add fetchData function ---


    // --- useEffect for polling (Unchanged) ---
    useEffect(() => {
        fetchData(true); // Initial fetch

        const intervalId = setInterval(() => {
            fetchData(false); // Subsequent polls
        }, 5000); // Polls every 5 seconds
        pollingIntervalRef.current = intervalId;

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                console.log("Polling interval cleared on unmount.");
            }
        };
    }, [fetchData]);


    // --- Computed Metrics (Unchanged) ---
    const computedTotalSpend = metrics.total_cost;
    const auditPassPercent = metrics.audit_pass_percent;
    const compliancePercent = metrics.compliance_percent;
    const quarantinedPct = 100 - auditPassPercent;

    const ledgerTotalSpend = useMemo(() =>
        ledgerData.reduce((sum, e) => sum + (e.cost || 0), 0),
        [ledgerData]
    );
    const ledgerAuditedSpend = useMemo(() =>
        ledgerData.filter(e => e.audit_status === 'Audited').reduce((sum, e) => sum + (e.cost || 0), 0),
        [ledgerData]
    );
    const ledgerQuarantinedSpend = ledgerTotalSpend - ledgerAuditedSpend;
    // --- END COMPUTED METRICS ---


    // Handler for Metric Card Clicks (Unchanged)
    const handleMetricClick = (metric) => {
        setSelectedEntry({
            name: metric,
            description: `This high-level metric is tied directly to the audited Machine Ledger data streams and resource utilization APIs.`,
            isMetric: true
        });
        setModalOpen(true);
    };

    // --- Render Logic ---
    if (isLoading) {
        // --- UNIFIED MESSAGE: Omeca not Melucra ---
        return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: 'background.default' }}><CircularProgress /><Typography sx={{ mt: 2 }}>Connecting to Omeca Core...</Typography></Box>;
    }

    if (apiError) {
        // --- UNIFIED MESSAGE: Omeca not Melucra ---
        return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: 'background.default', p: 3 }}><Paper sx={{ p: 4, maxWidth: '600px', textAlign: 'center' }}><ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main' }} /><Typography variant="h4">Connection Error</Typography><Alert severity="error" sx={{ my: 2 }}>{apiError}</Alert><List dense><ListItem><ListItemText primary="1. Backend Running?" secondary="python run.py" /></ListItem><ListItem><ListItemText primary="2. CORS Correct?" secondary={`Check app/main.py allows '*' or this origin`} /></ListItem><ListItem><ListItemText primary="3. Auth Endpoint?" secondary="Is /generate-token-for-dev running?" /></ListItem><ListItem><ListItemText primary="4. Database Seeded?" secondary="python seed.py" /></ListItem></List><Button variant="contained" onClick={() => fetchData(true)}>Retry</Button></Paper></Box>;
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                p: { xs: 2, md: 4 },
                background: `linear-gradient(135deg, ${colors[mode].bgGradA} 0%, ${colors[mode].bgGradB} 100%)`,
                transition: 'background 0.5s ease-in-out',
                color: colors[mode].textPrimary,
            }}
        >
            <AtomicAuditLogModal
                isOpen={modalOpen}
                handleClose={() => setModalOpen(false)}
                entry={selectedEntry}
            />

            {/* Header and Controls (UNIFIED MESSAGE) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h4" fontWeight={900}>
                        {/* UNIFIED MESSAGE: Use Omeca Brand */}
                        <GradientText variant="h4" sx={{ fontSize: 'inherit' }}>
                            Omeca
                        </GradientText>
                    </Typography>
                    {/* UNIFIED MESSAGE: Describe as the single product */}
                    <Typography variant="h5" sx={{ color: colors[mode].textPrimary, fontWeight: 700 }}>
                        The Omeca Trust Stack: Financial Control Core
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: colors[mode].textSecondary, fontWeight: 500, opacity: 0.8 }} >
                        Prototype demonstration of Omeca’s immutable, explainable audit layer
                    </Typography>
                </Box>
                <Box>
                    <Tooltip title="Prototype Demo: Illustrates future mandated export functionality.">
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<GavelIcon />}
                            onClick={() => alert("Simulating Audit Report Generation: Data from the Machine Ledger is compiled and formatted for SOC2/CFO review.")}
                            sx={{ mr: 2, display: { xs: 'none', sm: 'inline-flex' } }}
                        >
                            Generate Mandated Audit Report
                        </Button>
                    </Tooltip>
                    <IconButton onClick={toggleColorMode} color="primary" sx={{ backgroundColor: colors[mode].card + '55', '&:hover': { backgroundColor: colors[mode].card } }}>
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>
            </Box>

            {/* Content Grids */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {/* Metric 1: Total Spend (LIVE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Total Machine Spend (USD)"
                            value={computedTotalSpend.toFixed(2)} // LIVE from API
                            unit="M $"
                            icon={MonetizationOnIcon}
                            color={colors.lucraGold}
                            onClick={() => handleMetricClick("Total Machine Spend")}
                        />
                    </Grid>

                    {/* Metric 2: Audit Leakage (LIVE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Unaudited Machine Spend"
                            value={parseFloat(quarantinedPct).toFixed(1)} // LIVE from API
                            unit="%"
                            icon={GavelIcon}
                            color={quarantinedPct > 1 ? colors.errorRed : colors.successGreen}
                            isGrowing={quarantinedPct > 1}
                            onClick={() => handleMetricClick("Unaudited Machine Spend")}
                        />
                    </Grid>

                    {/* Metric 3: Compliance Score (LIVE) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Mandated Assurance Score"
                            value={compliancePercent.toFixed(1)} // LIVE from API
                            unit="% Score"
                            icon={GavelIcon}
                            color={colors.accent}
                            isGrowing={true}
                            onClick={() => handleMetricClick("Mandated Assurance Score")}
                        />
                    </Grid>

                    {/* Metric 4: Utilization / Efficiency (Mock) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Efficiency Signals"
                            value="87" // Still mock data
                            unit="% Efficiency"
                            icon={TrendingUpIcon}
                            color={colors.lucraGold}
                            isGrowing={true}
                            onClick={() => handleMetricClick("Efficiency Signals")}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={4}>
                    {/* LEFT PANEL HEADER (UNIFIED MESSAGE) */}
                    <Grid item xs={12} md={7}>
                        <Typography variant="h6" fontWeight={800} sx={{ mb: 1, color: colors.accent }}>
                            Step 1: Capture and Validate
                        </Typography>
                        <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                            <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: colors.accent }}>
                                    Live Audit Stream: Machine Events Captured and Verified in Real Time
                                </Typography>
                                {/* UNIFIED MESSAGE: Remove Melucra reference */}
                                <Typography variant="caption" color="textSecondary" sx={{ mb: 1, fontStyle: 'italic' }}>
                                    Every autonomous transaction is captured, validated, and anchored to auditable financial truth in real time.
                                </Typography>

                                <Box sx={{ textAlign: 'right', mb: 1 }}>
                                    <Chip
                                        label={`Quarantined Events: ${ledgerData.filter(e => e.audit_status !== 'Audited').length} Detected`}
                                        color="error"
                                        variant="outlined"
                                        sx={{ fontWeight: 700 }}
                                    />
                                </Box>

                                <Divider sx={{ mb: 1 }} />
                                <List sx={{ overflowY: 'auto', flexGrow: 1, p: 0, maxHeight: 500 }}>
                                    {/* Header Row (Unchanged) */}
                                    <Grid container spacing={2} sx={{ mb: 1, px: 2 }}>
                                        <Grid item xs={3}><Typography variant="caption" fontWeight={700} color="textSecondary">AGENT ID</Typography></Grid>
                                        <Grid item xs={4}><Typography variant="caption" fontWeight={700} color="textSecondary">ACTIVITY / RESOURCE</Typography></Grid>
                                        <Grid item xs={2}><Typography variant="caption" fontWeight={700} color="textSecondary">COST</Typography></Grid>
                                        <Grid item xs={3}><Typography variant="caption" fontWeight={700} color="textSecondary" sx={{ textAlign: 'right' }}>AUDIT STATUS</Typography></Grid>
                                    </Grid>
                                    <Divider sx={{ mb: 1 }} />
                                    {/* Data Rows (Unchanged logic) */}
                                    <AnimatePresence initial={false}>
                                        {ledgerData.map((entry) => (
                                            <AuditEntry
                                                key={entry.id}
                                                {...entry}
                                                handleDrillDown={() => handleDrillDown(entry)}
                                                // double-click to certify
                                                onDoubleClick={() => {
                                                    setSelectedEventId(entry.id);
                                                    setCertOpen(true);
                                                }}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </List>
                                <ListItemText sx={{ mt: 2, textAlign: 'center' }}>
                                    {/* UNIFIED MESSAGE: Remove Melucra reference */}
                                    <Typography variant="body2" color="textSecondary">
                                        Atomic ingestion live — every 5s a new agent event is reconciled.
                                    </Typography>
                                </ListItemText>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* RIGHT PANEL HEADER (UNIFIED MESSAGE) */}
                    <Grid item xs={12} md={5}>
                        <Typography variant="h6" fontWeight={800} sx={{ mb: 1, color: colors.lucraGold }}>
                            Step 2: Explain and Anchor
                        </Typography>
                        <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                            <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: colors.lucraGold }}>
                                        Explainability and Compliance Signal
                                    </Typography>
                                    {/* UNIFIED MESSAGE: Remove Melucra reference */}
                                    <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                                        Omeca links validated machine events to policy reasoning and compliance evidence.
                                    </Typography>
                                    <Divider sx={{ mb: 3 }} />

                                    <motion.div variants={staggerContainer}>
                                        <AllocationBar
                                            name="Validated Events Rate"
                                            percentage={auditPassPercent}
                                            color="accent"
                                            value={ledgerAuditedSpend.toFixed(2)}
                                            handleDrillDown={handleDrillDown}
                                        />
                                        <AllocationBar
                                            name="Quarantined Events Rate"
                                            percentage={quarantinedPct}
                                            color="lucraGold"
                                            value={ledgerQuarantinedSpend.toFixed(2)}
                                            handleDrillDown={handleDrillDown}
                                        />
                                        <AllocationBar
                                            name="Explainability Coverage"
                                            percentage={95.8}
                                            color="accent"
                                            handleDrillDown={handleDrillDown}
                                        />
                                        <AllocationBar
                                            name="Policy Compliance Rate"
                                            percentage={88.5}
                                            color="lucraGold"
                                            handleDrillDown={handleDrillDown}
                                        />
                                    </motion.div>
                                </Box>

                                <Tooltip title="Mock Output: Demonstrates export of immutable audit records for external verification or regulatory review.">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        endIcon={<AccountTreeIcon />}
                                        onClick={() => handleDrillDown({ name: "GL Reconciliation File", description: "Mock output: Validated ledger data packaged for ERP import. In production, this produces a CFO-ready JSON/PDF export." })}
                                        sx={{ mt: 4 }}
                                    >
                                        Export Immutable Audit Trail
                                    </Button>
                                </Tooltip>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>

            {/* === ADD THIS HERE, just before the footer Box === */}
            <AuditCertModal
                open={certOpen}
                onClose={() => setCertOpen(false)}
                eventId={selectedEventId}
                onCertified={async ({ eventId, narrative, reason_code }) => {
                    try {
                        await certifyEvent(eventId, narrative, reason_code);
                        await fetchData(); // refresh dashboard after successful certification
                    } catch (err) {
                        console.error("Certification failed:", err);
                        alert("Certification failed: " + err.message);
                    }
                }}
            />

            {/* existing footer below */}
            <Box sx={{ textAlign: 'center', mt: 6, py: 2, borderTop: `1px solid ${colors[mode].textDim}22`, color: colors[mode].textDim, fontSize: '0.85rem', letterSpacing: 0.3 }}>
                SOC 2 Type II Ready • Immutable Ledger Verified • Explainable AI Audit Core • Zero Trust Architecture
            </Box>


        </Box>
    );
};

// Final component for export, wrapped in the local ThemeProvider
const OmecaDashboardPage = () => (
    <ThemeWrapper>
        <OmecaDashboard />
    </ThemeWrapper>
);

export default OmecaDashboardPage;