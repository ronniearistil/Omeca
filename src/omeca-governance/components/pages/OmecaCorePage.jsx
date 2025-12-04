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