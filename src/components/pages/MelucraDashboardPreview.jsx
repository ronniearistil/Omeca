// MelucraDashboardPreview.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { motion } from 'framer-motion';

// ✅ Import the shared theme + color context from your real dashboard
import { colors, ColorModeContext } from './MelucraDashboardPage';

// --- Motion variant (same as dashboard) ---
const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
};

// --- Reuse MetricCard logic locally (no cross-file import issues) ---
const MetricCard = ({ title, value, unit, icon: Icon, color, isGrowing = true }) => {
  const { mode } = useContext(ColorModeContext);
  const primaryTextColor = colors[mode].textPrimary;
  const growthColor = isGrowing ? colors.successGreen : colors.errorRed;

  return (
    <motion.div variants={fadeInUp} style={{ height: '100%' }}>
      <Box
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: `4px solid ${color}`,
          backgroundColor: colors[mode].card,
          borderRadius: 2,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ color, fontWeight: 700 }}>
            {title}
          </Typography>
          <Icon sx={{ color, opacity: 0.7 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 800, color: primaryTextColor }}>
          {value}
          <Typography component="span" variant="h6" sx={{ fontWeight: 500, ml: 1, color }}>
            {unit}
          </Typography>
        </Typography>
        <Typography variant="caption" color={growthColor} sx={{ mt: 1 }}>
          {isGrowing ? '+12.5% vs. Last Period' : '-4.2% Cost Overrun'}
        </Typography>
      </Box>
    </motion.div>
  );
};

// --- Main Preview Component ---
const MelucraDashboardPreview = () => {
  const { mode } = useContext(ColorModeContext);
  const [totalSpend, setTotalSpend] = useState(4.2);
  const [unauditedSpend, setUnauditedSpend] = useState(0.02);
  const [efficiency, setEfficiency] = useState(87.0);

  // Live metric updates every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSpend(prev => +(prev + Math.random() * 0.03).toFixed(2));
      setUnauditedSpend(prev =>
        Math.max(0, Math.min(0.15, +(prev + (Math.random() - 0.5) * 0.01).toFixed(3)))
      );
      setEfficiency(prev =>
        Math.max(70, Math.min(95, +(prev + (Math.random() - 0.5) * 0.5).toFixed(1)))
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 4, md: 5 },
        mx: 'auto',
        maxWidth: 1100,
        textAlign: 'center',
        background: `linear-gradient(135deg, ${colors[mode].bgGradA}, ${colors[mode].bgGradB})`,
        borderRadius: 3,
        p: { xs: 2, md: 4 },
        mt: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={900}
        sx={{
          mb: 3,
          color: colors[mode].textPrimary,
        }}
      >
        Live Snapshot from the{' '}
        <span
          style={{
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Melucra Audit Core
        </span>
      </Typography>

      {/* Metric Grid */}
      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Machine Spend (USD)"
              value={totalSpend.toFixed(2)}
              unit="M $"
              icon={MonetizationOnIcon}
              color={colors.lucraGold}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Unaudited Machine Spend"
              value={(unauditedSpend * 100).toFixed(1)}
              unit="%"
              icon={GavelIcon}
              color={unauditedSpend > 0.03 ? colors.errorRed : colors.successGreen}
              isGrowing={unauditedSpend > 0.03}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Mandated Assurance Score"
              value="99.8"
              unit="%"
              icon={GavelIcon}
              color={colors.accent}
              isGrowing
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Efficiency Signals"
              value={efficiency.toFixed(1)}
              unit="%"
              icon={TrendingUpIcon}
              color={colors.lucraGold}
              isGrowing
            />
          </Grid>
        </Grid>
      </motion.div>

{/* Footer */}
<Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
  <Typography
    variant="caption"
    sx={{
      display: 'block',
      color: colors[mode].textDim,
    }}
  >
    Metrics updating live every few seconds — powered by the Melucra prototype engine.
  </Typography>

  <Typography
    component="a"
    href="/meldashboard"
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      fontSize: '0.85rem',
      color: colors.accent,
      textDecoration: 'none',
      fontWeight: 600,
      mt: 0.5,
      '&:hover': { textDecoration: 'underline', opacity: 0.85 },
    }}
  >
    → View Full Prototype
  </Typography>
</Box>

    </Box>
  );
};

export default MelucraDashboardPreview;


