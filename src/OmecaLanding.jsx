import React, { useState, useContext, useEffect, useRef } from "react";
import {
  AppBar, Toolbar, Box, Container, Typography, Button, IconButton, Grid, Chip, Paper, alpha,
  Drawer, List, ListItem, useMediaQuery, InputBase
} from "@mui/material";
import { 
    Menu as MenuIcon, Bolt, ArrowForward, VerifiedUser, Close as CloseIcon, Logout, Dashboard
} from "@mui/icons-material";
import { motion, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// --- THEME & UI (Corrected Path Resolution) ---
import { colors } from "./shared/layouts/theme/theme.js";
import { ColorModeContext } from "./shared/layouts/theme/ThemeContext.jsx";
import ThemeToggleButton from "./shared/layouts/ThemeToggleButton.jsx";
import OmecaAppFooter from "./shared/ui/AppFooter.jsx";
import OmecaLogo from "./shared/ui/OmecaLogo.jsx";

// --- SECTIONS (Corrected Path Resolution) ---
import OmecaProblemSolutionComparison from "./omeca-governance/components/sections/ProblemSolutionComparison.jsx";
import OmecaTrustStack from "./omeca-governance/components/sections/TrustStack.jsx";
import OmecaDeveloperIntegration from "./omeca-governance/components/sections/DeveloperIntegration.jsx";
import OmecaSupportedIntegrations from "./omeca-governance/components/sections/SupportedIntegrations.jsx";

// --- FIREBASE AUTH (Corrected Path Resolution) ---
import { auth } from "./lib/firebase.js";


// --- VISUAL ASSETS (Omitted for brevity) ---
const NoiseOverlay = () => (
  <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10000, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
);
const GridBackground = ({ isDark }) => (
  <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", overflow: "hidden", zIndex: 0, maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}>
    <Box sx={{ width: "100%", height: "100%", backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
  </Box>
);
// --- ANIMATED COUNTER (Omitted for brevity) ---
const Counter = ({ value, suffix = "", color }) => {
  const nodeRef = useRef();
  const prevValue = useRef(value);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(prevValue.current, value, {
      duration: 1.5, ease: "easeOut",
      onUpdate: (v) => { node.textContent = (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + suffix; },
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value, suffix]);

  return <Typography ref={nodeRef} variant="h2" sx={{ color: color, mb: 1, fontSize: { xs: "2.5rem", md: "3.5rem" }, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{value}{suffix}</Typography>;
};
// --- HERO METRIC CARD (Omitted for brevity) ---
const HeroMetricCard = ({ label, sublabel, metric, color, icon: Icon }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  return (
    <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`, boxShadow: isDark ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle, ${alpha(color, 0.15)} 0%, transparent 70%)`, zIndex: 0 }} />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box><Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block' }}>{label}</Typography><Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>{sublabel}</Typography></Box>
            {Icon && <Icon sx={{ color: color, opacity: 0.8 }} />}
        </Box>
        <Counter value={metric} suffix="%" color={color} />
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, boxShadow: `0 0 8px ${color}` }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>Live Verification Active</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
// --- LIVE PREVIEW PANEL (Omitted for brevity) ---
const LivePreviewPanel = ({ onExplore }) => {
  const [data, setData] = useState({ control: 98.4, recon: 88.2, evidence: 100, isConnected: false, isSimulated: false });
  useEffect(() => {
    let isMounted = true;
    const fetchOrSimulate = async () => {
      if (isMounted) {
        setData(prev => ({
          ...prev,
          control: Math.min(100, Math.max(98, prev.control + (Math.random() - 0.5) * 0.2)),
          recon: Math.min(100, Math.max(88, prev.recon + (Math.random() - 0.5) * 0.4)),
          isConnected: false, isSimulated: true
        }));
      }
    };
    const interval = setInterval(fetchOrSimulate, 3000); 
    return () => clearInterval(interval);
  }, []);
  const indicatorColor = colors.lucraGold;
  const indicatorText = "CONTINUOUS CONTROL LIVE";
  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1.5 }}>
        <Box sx={{ position: 'relative', display: 'flex' }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: indicatorColor }} />
            <Box sx={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', bgcolor: indicatorColor, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.7 }} />
            <style>{`@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
        </Box>
        <Typography variant="overline" sx={{ fontWeight: 800, color: indicatorColor, letterSpacing: "1.5px" }}>{indicatorText}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><HeroMetricCard label="L1: Operational Control" sublabel="Forecast Accuracy" metric={data.control} color={colors.accent} /></Grid>
        <Grid item xs={12} sm={6}><HeroMetricCard label="L2: Continuous Close" sublabel="Auto-Reconciliation" metric={data.recon} color={colors.successGreen} /></Grid>
        <Grid item xs={12}><HeroMetricCard label="L3: Verifiable Trust" sublabel="Evidence Attached" metric={data.evidence} color={colors.lucraGold} icon={VerifiedUser} /></Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button onClick={onExplore} fullWidth sx={{ py: 2.5, borderRadius: 4, bgcolor: 'rgba(0,0,0,0.03)', color: 'text.primary', textTransform: 'none', fontSize: '1.1rem', fontWeight: 700, border: '1px solid rgba(0,0,0,0.08)', justifyContent: 'space-between', px: 4, "&:hover": { bgcolor: 'rgba(0,0,0,0.06)', borderColor: colors.accent } }} endIcon={<ArrowForward sx={{ color: colors.accent }} />}>Explore The Trust Stack</Button>
            </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};


// --- MAIN PAGE ---
const OmecaLanding = () => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];
  const isDark = mode === "dark";
  const [email, setEmail] = useState("");

  // --- NEW AUTH STATE ---
  const [user, setUser] = useState(null); // Tracks logged-in user
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoadingAuth(false);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  
  // Mobile Menu State
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
    setMobileOpen(false);
  };
  
  // Navigation Items
  const publicNavItems = [
      { label: 'Product', path: '/trust-stack' }, 
      { label: 'Pricing', path: '/pricing' }, 
      { label: 'Company', path: '/company' }
  ];
  const authenticatedNavItems = [
      { label: 'Dashboard', path: '/dashboard', icon: Dashboard }, 
      ...publicNavItems
  ];
  
  const navItems = user ? authenticatedNavItems : publicNavItems;

  const handleNavClick = (path) => { navigate(path); setMobileOpen(false); };

  // REUSE: Redirect to Partner Login for the actual flow
  const handleStartFlow = (e) => {
    e.preventDefault();
    navigate('/partner-login', { state: { email: email, isSignup: true } });
  };
  
  // Button logic changes based on auth status
  const AuthButton = user ? (
      <Button 
          variant="contained" 
          size="small" 
          onClick={handleLogout} 
          startIcon={<Logout />}
          sx={{ bgcolor: colors.accent, color: '#000', fontWeight: 700, borderRadius: 50, textTransform: 'none', px: 2.5, "&:hover": { bgcolor: '#fff' } }} 
      >
          Log Out
      </Button>
  ) : (
      <Button 
          variant="outlined" 
          size="small" 
          onClick={() => navigate("/partner-login")}
          sx={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', color: currentColors.textPrimary, borderRadius: 50, textTransform: 'none', px: 2.5, "&:hover": { borderColor: colors.accent, bgcolor: 'transparent' } }} 
      >
          Partner Login
      </Button>
  );


  // Drawer Content
  const drawer = (
    <Box sx={{ height: '100%', bgcolor: isDark ? '#0B0F17' : '#fff', color: currentColors.textPrimary }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
            <OmecaLogo size={40} />
            <IconButton onClick={handleDrawerToggle} sx={{ color: currentColors.textPrimary }}><CloseIcon /></IconButton>
        </Box>
        <List sx={{ p: 2 }}>
            {navItems.map((item) => (
                <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                    <Button 
                        fullWidth 
                        onClick={() => handleNavClick(item.path)} 
                        startIcon={item.icon ? <item.icon /> : null}
                        sx={{ justifyContent: 'flex-start', py: 2, color: currentColors.textPrimary, fontSize: '1.1rem', fontWeight: 600 }}
                    >
                        {item.label}
                    </Button>
                </ListItem>
            ))}
            <Box sx={{ mt: 3, px: 1 }}>
                {user ? (
                    <Button fullWidth variant="outlined" onClick={handleLogout} startIcon={<Logout />} sx={{ borderColor: colors.accent, color: colors.accent, py: 1.5, borderRadius: 2 }}>
                        Log Out ({user.displayName || user.email})
                    </Button>
                ) : (
                    <Button fullWidth variant="outlined" onClick={() => handleNavClick('/partner-login')} sx={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: currentColors.textPrimary, py: 1.5, borderRadius: 2 }}>
                        Partner Login
                    </Button>
                )}
            </Box>
        </List>
    </Box>
  );

  if (loadingAuth) return null; // Prevent UI flash while loading auth status

  return (
    <Box sx={{ bgcolor: currentColors.bgTop, color: currentColors.textPrimary, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <NoiseOverlay /><GridBackground isDark={isDark} />
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: isDark ? "rgba(11,15,23,0.7)" : "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, zIndex: 1200 }}>
        <Toolbar sx={{ justifyContent: "space-between", height: 72 }}>
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", opacity: 0.9, "&:hover": { opacity: 1 } }} onClick={() => navigate("/")}><OmecaLogo size={98} /></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navItems.map((item) => (
                  <Button 
                      key={item.label} 
                      onClick={() => navigate(item.path)} 
                      sx={{ color: currentColors.textDim, fontWeight: 500, "&:hover": { color: currentColors.textPrimary, bgcolor: 'transparent' } }}
                  >
                      {item.label}
                  </Button>
              ))}
            </Box>
            <ThemeToggleButton />
            {/* Desktop Auth Button */}
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                {AuthButton}
            </Box>
            <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: "flex", md: "none" }, color: currentColors.textPrimary }}><MenuIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" anchor="top" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', maxHeight: '60vh', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 } }}>{drawer}</Drawer>
      
      {/* --- HERO SECTION --- */}
      <Box sx={{ pt: { xs: 14, md: 18 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ position: 'relative', pb: { xs: 10, md: 16 } }}>
          <Container maxWidth="xl" sx={{ maxWidth: "1400px", px: { xs: 3, md: 6 }, position: 'relative' }}>
            <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                  <Chip label="Backed by NVIDIA Inception & Google Cloud" icon={<Bolt style={{ color: colors.accent, fontSize: 16 }} />} sx={{ mb: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: currentColors.textDim, fontWeight: 600 }} />
                  <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: "3rem", md: "4.8rem" }, letterSpacing: "-0.03em", lineHeight: 1.1, mb: 3, background: isDark ? `linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)` : `linear-gradient(180deg, #000 0%, rgba(0,0,0,0.7) 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>The Autonomous <br /><Box component="span" sx={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Financial Core.</Box></Typography>
                  <Typography variant="h6" sx={{ color: currentColors.textDim, mb: 5, maxWidth: 580, lineHeight: 1.6, fontWeight: 400 }}>Transforming ERPs from passive record-keeping to continuous, autonomous control. Unify operational truth, real-time close, and verifiable intelligence.</Typography>
                  
                  {user ? (
                     <Button 
                          variant="contained" 
                          size="large" 
                          onClick={() => navigate("/dashboard")} 
                          startIcon={<Dashboard />}
                          sx={{ bgcolor: colors.accent, color: '#000', fontWeight: 800, borderRadius: 50, textTransform: 'none', px: 4, py: 1.5, "&:hover": { bgcolor: '#fff' } }} 
                      >
                          Go to Dashboard
                      </Button>
                  ) : (
                    <Box component="form" onSubmit={handleStartFlow} sx={{ display: 'flex', alignItems: 'center', maxWidth: 440, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#fff', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: 50, p: 0.5, pl: 2.5, boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.2s', "&:focus-within": { borderColor: colors.accent, boxShadow: `0 0 0 4px ${colors.accent}20` } }}>
                      <InputBase 
                          placeholder="work@company.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          type="email"
                          sx={{ ml: 1, flex: 1, color: currentColors.textPrimary }}
                      />
                      <Button type="submit" sx={{ borderRadius: 50, px: 3, py: 1.2, bgcolor: colors.accent, color: '#000', fontWeight: 700, textTransform: 'none', minWidth: 'fit-content', whiteSpace: 'nowrap', "&:hover": { bgcolor: '#fff' } }}>Request Pilot</Button>
                    </Box>
                  )}
                  {/* <Typography variant="caption" sx={{ display: 'block', mt: 1.5, ml: 2, color: currentColors.textDim }}>Start your free pilot. No credit card required.</Typography> */}

                  <Box sx={{ mt: 8, opacity: 0.7, maxWidth: 500, overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
                    <Typography variant="caption" sx={{ color: currentColors.textDim, fontWeight: 700, mb: 1.5, display: 'block', fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase' }}>INTEGRATES WITH</Typography>
                    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} style={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap' }}>{['Brex', 'Netsuite', 'Slack', 'Snowflake', 'Brex', 'Netsuite', 'Slack', 'Snowflake'].map((brand, i) => <Typography key={i} variant="body2" sx={{ fontWeight: 700, color: currentColors.textDim, fontFamily: 'monospace', fontSize: '0.9rem' }}>{brand}</Typography>)}</motion.div>
                  </Box>
                </motion.div>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}><motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}><LivePreviewPanel onExplore={() => navigate("/trust-stack")} /></motion.div></Grid>
            </Grid>
          </Container>
        </Box>
        {/* --- BOTTOM SECTIONS --- */}
        <Container maxWidth="xl" sx={{ maxWidth: "1400px" }}><Box sx={{ borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} /></Container>
        <Box sx={{ position: 'relative' }}><Container maxWidth="xl" sx={{ maxWidth: "1600px", py: { xs: 8, md: 12 } }}><OmecaProblemSolutionComparison /></Container></Box>
        <Box sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderY: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}><Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaTrustStack /></Container></Box>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaDeveloperIntegration navigate={navigate} /></Container>
        <Box sx={{ bgcolor: isDark ? currentColors.bgTop : "#fff" }}><Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaSupportedIntegrations /></Container></Box>
      </Box>
      <OmecaAppFooter />
    </Box>
  );
};

export default OmecaLanding;