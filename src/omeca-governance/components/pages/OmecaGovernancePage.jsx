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