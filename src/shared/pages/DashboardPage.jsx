import React, { useContext, useEffect, useState } from "react";
import { 
  Box, Container, Typography, Button, Paper, Grid, Chip, IconButton, Divider, alpha 
} from "@mui/material";
import { 
  Logout, ArrowForward, NotificationsActive, AccountBalance, 
  VerifiedUser, TrendingUp, Speed 
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// --- IMPORTS ---
import { auth, db, APP_ID } from "../../lib/firebase.js";
import { ColorModeContext } from "../layouts/theme/ThemeContext.jsx";
import { colors } from "../layouts/theme/theme.js";
import OmecaLogo from "../ui/OmecaLogo.jsx";

// --- WIDGET COMPONENT (Internal for cleanliness) ---
const DashboardWidget = ({ title, metric, subtext, icon: Icon, color, onClick, isDark }) => (
  <Paper 
    elevation={0} 
    onClick={onClick}
    sx={{ 
      p: 3, 
      height: '100%', 
      cursor: 'pointer',
      borderRadius: 4, 
      bgcolor: isDark ? alpha(color, 0.05) : '#fff', 
      border: `1px solid ${isDark ? alpha(color, 0.2) : 'rgba(0,0,0,0.08)'}`,
      transition: 'all 0.2s',
      '&:hover': { 
        transform: 'translateY(-4px)', 
        boxShadow: `0 10px 20px -10px ${alpha(color, 0.3)}`,
        borderColor: color
      }
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(color, 0.1), color: color }}>
        <Icon />
      </Box>
      <ArrowForward sx={{ color: 'text.secondary', fontSize: 18 }} />
    </Box>
    <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, color: isDark ? '#fff' : '#000' }}>
      {metric}
    </Typography>
    <Typography variant="subtitle2" fontWeight={700} sx={{ color: color, mb: 0.5 }}>
      {title}
    </Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
      {subtext}
    </Typography>
  </Paper>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];
  const isDark = mode === 'dark';
  const user = auth.currentUser;
  
  const [profile, setProfile] = useState(null);

  // Fetch User Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
        if (user) {
            try {
                const docRef = doc(db, 'artifacts', APP_ID, 'users', user.uid, 'profile');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                }
            } catch (err) {
                console.error("Profile load error", err);
            }
        }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: currentColors.bgTop, color: currentColors.textPrimary }}>
      
      {/* --- TOP NAVIGATION --- */}
      <Box sx={{ 
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, 
          bgcolor: isDark ? alpha('#000', 0.2) : '#fff',
          backdropFilter: 'blur(10px)',
          position: 'sticky', top: 0, zIndex: 10
      }}>
        <Container maxWidth="xl">
            <Box sx={{ height: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <OmecaLogo size={32} />
                    <Divider orientation="vertical" flexItem sx={{ height: 20, my: 'auto', borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }} />
                    <Chip 
                        label="Pilot Access" 
                        size="small" 
                        sx={{ 
                            bgcolor: alpha(colors.accent, 0.1), 
                            color: colors.accent, 
                            fontWeight: 700, 
                            border: `1px solid ${alpha(colors.accent, 0.2)}` 
                        }} 
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                        <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
                            {profile?.fullName || user?.displayName || 'User'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {profile?.company || 'Omeca Partner'}
                        </Typography>
                    </Box>
                    <IconButton onClick={handleLogout} sx={{ color: 'text.secondary', '&:hover': { color: colors.accent, bgcolor: alpha(colors.accent, 0.1) } }}>
                        <Logout />
                    </IconButton>
                </Box>
            </Box>
        </Container>
      </Box>

      {/* --- MAIN COCKPIT CONTENT --- */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        
        {/* SECTION 1: HEADER */}
        <Box sx={{ mb: 6 }}>
            <Typography variant="h3" fontWeight={800} gutterBottom sx={{ letterSpacing: '-0.02em' }}>
                Operational Overview
            </Typography>
            <Typography variant="h6" sx={{ color: currentColors.textDim, maxWidth: 600 }}>
                Real-time insights across your financial ledger, governance stack, and operational core.
            </Typography>
        </Box>

        {/* SECTION 2: KEY METRICS GRID */}
        <Grid container spacing={3}>
            
            {/* OMECA CORE: ALERTS */}
            <Grid item xs={12} md={4}>
                <DashboardWidget 
                    title="Active Margin Alerts"
                    metric="3 Critical"
                    subtext="Operational anomaly detected in Q3 forecast."
                    icon={NotificationsActive}
                    color="#FF4C4C" // Red for alerts
                    isDark={isDark}
                    onClick={() => navigate('/margin-alerts')}
                />
            </Grid>

            {/* OMECA LEDGER: RECONCILIATION */}
            <Grid item xs={12} md={4}>
                <DashboardWidget 
                    title="Ledger Reconciliation"
                    metric="98.2%"
                    subtext="Continuous close active. 14 items pending review."
                    icon={AccountBalance}
                    color={colors.successGreen}
                    isDark={isDark}
                    onClick={() => navigate('/reconciliation')}
                />
            </Grid>

            {/* OMECA GOVERNANCE: TRUST */}
            <Grid item xs={12} md={4}>
                <DashboardWidget 
                    title="Audit Readiness Score"
                    metric="A+"
                    subtext="Blockchain verification active. No gaps found."
                    icon={VerifiedUser}
                    color={colors.lucraGold}
                    isDark={isDark}
                    onClick={() => navigate('/trust-stack')}
                />
            </Grid>

            {/* REPORTING: ANALYTICS */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ 
                    p: 4, borderRadius: 4, height: '100%',
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Speed sx={{ color: colors.accent }} />
                        <Typography variant="h6" fontWeight={700}>System Velocity</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: currentColors.textDim, mb: 3 }}>
                        Your autonomous financial core is processing transactions 40x faster than manual entry.
                    </Typography>
                    <Button variant="outlined" sx={{ color: currentColors.textPrimary, borderColor: currentColors.textDim }} onClick={() => navigate('/pricing')}>
                        View Usage & Billing
                    </Button>
                </Paper>
            </Grid>

            {/* REPORTING: FORECAST */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ 
                    p: 4, borderRadius: 4, height: '100%',
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <TrendingUp sx={{ color: colors.accent }} />
                        <Typography variant="h6" fontWeight={700}>Forecast Accuracy</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: currentColors.textDim, mb: 3 }}>
                        AI Models are currently predicting Q4 cash flow with 94% confidence intervals.
                    </Typography>
                    <Button variant="outlined" sx={{ color: currentColors.textPrimary, borderColor: currentColors.textDim }}>
                        Generate Report
                    </Button>
                </Paper>
            </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;