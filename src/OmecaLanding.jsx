// import React, { useState, useContext, useEffect, useRef } from "react";
// import {
//   AppBar, Toolbar, Box, Container, Typography, Button, IconButton, Grid, Chip, Paper, alpha,
//   Drawer, List, ListItem, useMediaQuery, InputBase
// } from "@mui/material";
// import {
//   Menu as MenuIcon, Bolt, ArrowForward, VerifiedUser, Close as CloseIcon, Logout, Dashboard
// } from "@mui/icons-material";
// import { motion, animate } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// 
// // --- THEME & UI (Corrected Path Resolution) ---
// import { colors } from "./shared/layouts/theme/theme.js";
// import { ColorModeContext } from "./shared/layouts/theme/ThemeContext.jsx";
// import ThemeToggleButton from "./shared/layouts/ThemeToggleButton.jsx";
// import OmecaAppFooter from "./shared/ui/AppFooter.jsx";
// import OmecaLogo from "./shared/ui/OmecaLogo.jsx";
// 
// // --- SECTIONS (Corrected Path Resolution) ---
// import OmecaProblemSolutionComparison from "./omeca-governance/components/sections/ProblemSolutionComparison.jsx";
// import OmecaTrustStack from "./omeca-governance/components/sections/TrustStack.jsx";
// import OmecaDeveloperIntegration from "./omeca-governance/components/sections/DeveloperIntegration.jsx";
// import OmecaSupportedIntegrations from "./omeca-governance/components/sections/SupportedIntegrations.jsx";
// 
// // --- FIREBASE AUTH (Corrected Path Resolution) ---
// import { auth } from "./lib/firebase.js";
// 
// 
// // --- VISUAL ASSETS (Omitted for brevity) ---
// const NoiseOverlay = () => (
//   <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10000, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
// );
// const GridBackground = ({ isDark }) => (
//   <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", overflow: "hidden", zIndex: 0, maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}>
//     <Box sx={{ width: "100%", height: "100%", backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
//   </Box>
// );
// // --- ANIMATED COUNTER (Omitted for brevity) ---
// const Counter = ({ value, suffix = "", color }) => {
//   const nodeRef = useRef();
//   const prevValue = useRef(value);
// 
//   useEffect(() => {
//     const node = nodeRef.current;
//     if (!node) return;
//     const controls = animate(prevValue.current, value, {
//       duration: 1.5, ease: "easeOut",
//       onUpdate: (v) => { node.textContent = (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + suffix; },
//     });
//     prevValue.current = value;
//     return () => controls.stop();
//   }, [value, suffix]);
// 
//   return <Typography ref={nodeRef} variant="h2" sx={{ color: color, mb: 1, fontSize: { xs: "2.5rem", md: "3.5rem" }, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{value}{suffix}</Typography>;
// };
// // --- HERO METRIC CARD (Omitted for brevity) ---
// const HeroMetricCard = ({ label, sublabel, metric, color, icon: Icon }) => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === "dark";
//   return (
//     <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`, boxShadow: isDark ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
//       <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle, ${alpha(color, 0.15)} 0%, transparent 70%)`, zIndex: 0 }} />
//       <Box sx={{ position: 'relative', zIndex: 1 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Box><Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block' }}>{label}</Typography><Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>{sublabel}</Typography></Box>
//           {Icon && <Icon sx={{ color: color, opacity: 0.8 }} />}
//         </Box>
//         <Counter value={metric} suffix="%" color={color} />
//         <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, boxShadow: `0 0 8px ${color}` }} />
//           <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>Live Verification Active</Typography>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };
// // --- LIVE PREVIEW PANEL (Omitted for brevity) ---
// const LivePreviewPanel = ({ onExplore }) => {
//   const [data, setData] = useState({ control: 98.4, recon: 88.2, evidence: 100, isConnected: false, isSimulated: false });
//   useEffect(() => {
//     let isMounted = true;
//     const fetchOrSimulate = async () => {
//       if (isMounted) {
//         setData(prev => ({
//           ...prev,
//           control: Math.min(100, Math.max(98, prev.control + (Math.random() - 0.5) * 0.2)),
//           recon: Math.min(100, Math.max(88, prev.recon + (Math.random() - 0.5) * 0.4)),
//           isConnected: false, isSimulated: true
//         }));
//       }
//     };
//     const interval = setInterval(fetchOrSimulate, 3000);
//     return () => clearInterval(interval);
//   }, []);
//   const indicatorColor = colors.lucraGold;
//   const indicatorText = "Financial Truth Live Preview";
//   return (
//     <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
//       <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1.5 }}>
//         <Box sx={{ position: 'relative', display: 'flex' }}>
//           <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: indicatorColor }} />
//           <Box sx={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', bgcolor: indicatorColor, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.7 }} />
//           <style>{`@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
//         </Box>
//         <Typography variant="overline" sx={{ fontWeight: 800, color: indicatorColor, letterSpacing: "1.5px" }}>{indicatorText}</Typography>
//       </Box>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}><HeroMetricCard label="L1: Operational Integrity" sublabel="Trustworthy Inputs" metric={data.control} color={colors.accent} /></Grid>
//         <Grid item xs={12} sm={6}><HeroMetricCard label="L2: Continuous Accounting" sublabel="Accurate Live Ledger" metric={data.recon} color={colors.successGreen} /></Grid>
//         <Grid item xs={12}><HeroMetricCard label="L3: Verifiable Trust" sublabel="Verified Proof" metric={data.evidence} color={colors.lucraGold} icon={VerifiedUser} /></Grid>
//         <Grid item xs={12} sx={{ mt: 2 }}>
//           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//             <Button onClick={onExplore} fullWidth sx={{ py: 2.5, borderRadius: 4, bgcolor: 'rgba(0,0,0,0.03)', color: 'text.primary', textTransform: 'none', fontSize: '1.1rem', fontWeight: 700, border: '1px solid rgba(0,0,0,0.08)', justifyContent: 'space-between', px: 4, "&:hover": { bgcolor: 'rgba(0,0,0,0.06)', borderColor: colors.accent } }} endIcon={<ArrowForward sx={{ color: colors.accent }} />}>Explore The Trust Stack</Button>
//           </motion.div>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
// 
// 
// // --- MAIN PAGE ---
// const OmecaLanding = () => {
//   const navigate = useNavigate();
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
//   const isDark = mode === "dark";
//   const [email, setEmail] = useState("");
// 
//   // --- NEW AUTH STATE ---
//   const [user, setUser] = useState(null); // Tracks logged-in user
//   const [loadingAuth, setLoadingAuth] = useState(true);
// 
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoadingAuth(false);
//     });
//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, []);
// 
// 
//   // Mobile Menu State
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//     navigate('/');
//     setMobileOpen(false);
//   };
// 
//   // Navigation Items
//   const publicNavItems = [
//     { label: 'Product', path: '/trust-stack' },
//     { label: 'Pricing', path: '/pricing' },
//     { label: 'Company', path: '/company' }
//   ];
//   const authenticatedNavItems = [
//     { label: 'Dashboard', path: '/dashboard', icon: Dashboard },
//     ...publicNavItems
//   ];
// 
//   const navItems = user ? authenticatedNavItems : publicNavItems;
// 
//   const handleNavClick = (path) => { navigate(path); setMobileOpen(false); };
// 
//   // REUSE: Redirect to Partner Login for the actual flow
//   const handleStartFlow = (e) => {
//     e.preventDefault();
//     navigate('/partner-login', { state: { email: email, isSignup: true } });
//   };
// 
//   // Button logic changes based on auth status
//   const AuthButton = user ? (
//     <Button
//       variant="contained"
//       size="small"
//       onClick={handleLogout}
//       startIcon={<Logout />}
//       sx={{ bgcolor: colors.accent, color: '#000', fontWeight: 700, borderRadius: 50, textTransform: 'none', px: 2.5, "&:hover": { bgcolor: '#fff' } }}
//     >
//       Log Out
//     </Button>
//   ) : (
//     <Button
//       variant="outlined"
//       size="small"
//       onClick={() => navigate("/partner-login")}
//       sx={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', color: currentColors.textPrimary, borderRadius: 50, textTransform: 'none', px: 2.5, "&:hover": { borderColor: colors.accent, bgcolor: 'transparent' } }}
//     >
//       Partner Login
//     </Button>
//   );
// 
// 
//   // Drawer Content
//   const drawer = (
//     <Box sx={{ height: '100%', bgcolor: isDark ? '#0B0F17' : '#fff', color: currentColors.textPrimary }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
//         <OmecaLogo size={40} />
//         <IconButton onClick={handleDrawerToggle} sx={{ color: currentColors.textPrimary }}><CloseIcon /></IconButton>
//       </Box>
//       <List sx={{ p: 2 }}>
//         {navItems.map((item) => (
//           <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
//             <Button
//               fullWidth
//               onClick={() => handleNavClick(item.path)}
//               startIcon={item.icon ? <item.icon /> : null}
//               sx={{ justifyContent: 'flex-start', py: 2, color: currentColors.textPrimary, fontSize: '1.1rem', fontWeight: 600 }}
//             >
//               {item.label}
//             </Button>
//           </ListItem>
//         ))}
//         <Box sx={{ mt: 3, px: 1 }}>
//           {user ? (
//             <Button fullWidth variant="outlined" onClick={handleLogout} startIcon={<Logout />} sx={{ borderColor: colors.accent, color: colors.accent, py: 1.5, borderRadius: 2 }}>
//               Log Out ({user.displayName || user.email})
//             </Button>
//           ) : (
//             <Button fullWidth variant="outlined" onClick={() => handleNavClick('/partner-login')} sx={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: currentColors.textPrimary, py: 1.5, borderRadius: 2 }}>
//               Partner Login
//             </Button>
//           )}
//         </Box>
//       </List>
//     </Box>
//   );
// 
//   if (loadingAuth) return null; // Prevent UI flash while loading auth status
// 
//   return (
//     <Box sx={{ bgcolor: currentColors.bgTop, color: currentColors.textPrimary, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
//       <NoiseOverlay /><GridBackground isDark={isDark} />
//       <AppBar position="fixed" elevation={0} sx={{ bgcolor: isDark ? "rgba(11,15,23,0.7)" : "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, zIndex: 1200 }}>
//         <Toolbar sx={{ justifyContent: "space-between", height: 72 }}>
//           <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", opacity: 0.9, "&:hover": { opacity: 1 } }} onClick={() => navigate("/")}><OmecaLogo size={98} /></Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//             <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
//               {navItems.map((item) => (
//                 <Button
//                   key={item.label}
//                   onClick={() => navigate(item.path)}
//                   sx={{ color: currentColors.textDim, fontWeight: 500, "&:hover": { color: currentColors.textPrimary, bgcolor: 'transparent' } }}
//                 >
//                   {item.label}
//                 </Button>
//               ))}
//             </Box>
//             <ThemeToggleButton />
//             {/* Desktop Auth Button */}
//             <Box sx={{ display: { xs: "none", sm: "flex" } }}>
//               {AuthButton}
//             </Box>
//             <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: "flex", md: "none" }, color: currentColors.textPrimary }}><MenuIcon /></IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="temporary" anchor="top" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', maxHeight: '60vh', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 } }}>{drawer}</Drawer>
// 
// {/* --- HERO SECTION --- */}
// <Box sx={{ pt: { xs: 14, md: 18 }, position: 'relative', zIndex: 1 }}>
//   <Box sx={{ position: 'relative', pb: { xs: 10, md: 16 } }}>
//     <Container maxWidth="xl" sx={{ maxWidth: "1400px", px: { xs: 3, md: 6 }, position: 'relative' }}>
//       <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">
// 
//         {/* LEFT COLUMN */}
//         <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 0, md: -1.5 }, display: "flex", justifyContent: "center" }}>
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: -8 }} transition={{ duration: 0.6, ease: "easeOut" }}>
// 
//             <Chip 
//               label="Backed by NVIDIA Inception & Google Cloud" 
//               icon={<Bolt style={{ color: colors.accent, fontSize: 16 }} />} 
//               sx={{ 
//                 mb: 3, 
//                 bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
//                 border: '1px solid', 
//                 borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', 
//                 color: currentColors.textDim, 
//                 fontWeight: 600 
//               }} 
//             />
// 
//             <Typography 
//               variant="h1" 
//               sx={{ 
//                 fontWeight: 800, 
//                 fontSize: { xs: "3rem", md: "4.8rem" }, 
//                 letterSpacing: "-0.03em", 
//                 lineHeight: 1.1, 
//                 mb: 3, 
//                 background: isDark 
//                   ? `linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)` 
//                   : `linear-gradient(180deg, #000 0%, rgba(0,0,0,0.7) 100%)`, 
//                 WebkitBackgroundClip: "text", 
//                 WebkitTextFillColor: "transparent" 
//               }}
//             >
//               The Control Plane <br />
//               <Box component="span" sx={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                 for Modern Finance
//               </Box>
//             </Typography>
// 
//             <Typography variant="h6" sx={{ color: currentColors.textDim, mb: 5, maxWidth: 580, lineHeight: 1.6, fontWeight: 400 }}>
//               Omeca is the accounting engine that establishes financial truth for every transaction and enforces correct behavior across high-velocity workflows.
//             </Typography>
// 
//             {/* USER CTA */}
//             {user ? (
//               <Button
//                 variant="contained"
//                 size="large"
//                 onClick={() => navigate("/dashboard")}
//                 startIcon={<Dashboard />}
//                 sx={{ bgcolor: colors.accent, color: '#000', fontWeight: 800, borderRadius: 50, textTransform: 'none', px: 4, py: 1.5, "&:hover": { bgcolor: '#fff' } }}
//               >
//                 Go to Dashboard
//               </Button>
//             ) : (
//               <Box 
//                 component="form" 
//                 onSubmit={handleStartFlow} 
//                 sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   maxWidth: 440, 
//                   bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#fff', 
//                   border: '1px solid', 
//                   borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', 
//                   borderRadius: 50, 
//                   p: 0.5, 
//                   pl: 2.5, 
//                   boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)', 
//                   transition: 'all 0.2s', 
//                   "&:focus-within": { borderColor: colors.accent, boxShadow: `0 0 0 4px ${colors.accent}20` } 
//                 }}
//               >
//                 <InputBase
//                   placeholder="work@company.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   type="email"
//                   sx={{ ml: 1, flex: 1, color: currentColors.textPrimary }}
//                 />
//                 <Button type="submit" sx={{ borderRadius: 50, px: 3, py: 1.2, bgcolor: colors.accent, color: '#000', fontWeight: 700, textTransform: 'none', minWidth: 'fit-content', whiteSpace: 'nowrap', "&:hover": { bgcolor: '#fff' } }}>
//                   Start Your Pilot
//                 </Button>
//               </Box>
//             )}
// 
//             {/* --- REPLACED MARQUEE (PREMIUM VERSION) --- */}
//             <Box sx={{ width: "100%", maxWidth: 500, mx: "auto", mt: 8 }}>
//               <Box
//                 sx={{
//                   position: "relative",
//                   overflow: "hidden",
//                   py: 4,
//                   borderRadius: 3,
//                   background: isDark
//                     ? "linear-gradient(90deg, rgba(255,255,255,0.01), rgba(255,255,255,0.03), rgba(255,255,255,0.01))"
//                     : "linear-gradient(90deg, rgba(0,0,0,0.01), rgba(0,0,0,0.03), rgba(0,0,0,0.01))",
//                   border: `1px solid ${currentColors.textDim}15`,
//                   backdropFilter: "blur(12px)",
//                   // WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
//                   // maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
//                   WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 80%, transparent 80%)",
// maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 80%)",
// 
//                   boxShadow: isDark
//                     ? "0 20px 50px -15px rgba(0,0,0,0.35)"
//                     : "0 20px 50px -15px rgba(0,0,0,0.08)"
//                 }}
//               >
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     display: "block",
//                     textAlign: "center",
//                     mb: 3,
//                     fontWeight: 700,
//                     color: currentColors.textDim,
//                     letterSpacing: "0.08em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Every Workflow Connects Into the Omeca Accounting Engine
//                 </Typography>
// 
//                 {/* Fade Left */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     left: 0,
//                     top: 0,
//                     bottom: 0,
//                     width: { xs: "60px", md: "140px" },
//                     background: `linear-gradient(90deg, ${isDark ? '#161C29' : '#F8FAFC'}, transparent)`,
//                     pointerEvents: "none",
//                     zIndex: 2
//                   }}
//                 />
// 
//                 {/* Fade Right */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     right: 0,
//                     top: 0,
//                     bottom: 0,
//                     width: { xs: "60px", md: "140px" },
//                     background: `linear-gradient(270deg, ${isDark ? '#161C29' : '#F8FAFC'}, transparent)`,
//                     pointerEvents: "none",
//                     zIndex: 2
//                   }}
//                 />
// 
//                 {/* Scrolling Track */}
//                 <motion.div
//                   animate={{ x: ["0%", "-50%"] }}
//                   transition={{ duration: 22, ease: "linear", repeat: Infinity }}
//                   style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap", alignItems: "center", paddingLeft: "3rem" }}
//                 >
//                   {[
//                     "OpenAI",
//                     "Anthropic",
//                     "LangChain",
//                     "Stripe",
//                     "Brex",
//                     "NetSuite",
//                     "Snowflake",
//                     "Salesforce",
//                     "Slack",
//                     "Ramp",
//                     "OpenAI",
//                     "Anthropic",
//                     "LangChain",
//                     "Stripe",
//                     "Brex",
//                     "NetSuite",
//                     "Snowflake",
//                     "Salesforce",
//                     "Slack",
//                     "Ramp"
//                   ].map((brand, idx) => (
//                     <Typography
//                       key={idx}
//                       variant="body1"
//                       sx={{
//                         fontWeight: 700,
//                         color: currentColors.textDim,
//                         opacity: 0.6,
//                         letterSpacing: "0.03em",
//                         userSelect: "none",
//                         fontFamily: "monospace",
//                         fontSize: "1rem",
//                         transition: "all 0.3s ease",
//                         cursor: "default",
//                         "&:hover": {
//                           color: colors.accent,
//                           opacity: 1,
//                           transform: "scale(1.06)",
//                           textShadow: `0 0 18px ${colors.accent}50`
//                         }
//                       }}
//                     >
//                       {brand}
//                     </Typography>
//                   ))}
//                 </motion.div>
//               </Box>
//             </Box>
// 
//           </motion.div>
//         </Grid>
// 
//         {/* RIGHT COLUMN */}
//         {/* <Grid size={{ xs: 12, md: 6 }}> */}
//         <Grid item xs={12} md={6}>
// 
//           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
//             <LivePreviewPanel onExplore={() => navigate("/trust-stack")} />
//           </motion.div>
//         </Grid>
// 
//       </Grid>
//     </Container>
//   </Box>
// 
//   {/* --- BOTTOM SECTIONS --- */}
//   <Container maxWidth="xl" sx={{ maxWidth: "1400px" }}>
//     <Box sx={{ borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
//   </Container>
// 
//   <Box sx={{ position: 'relative' }}>
//     <Container maxWidth="xl" sx={{ maxWidth: "1600px", py: { xs: 8, md: 12 } }}>
//       <OmecaProblemSolutionComparison />
//     </Container>
//   </Box>
// 
//   <Box sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderY: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
//     <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
//       <OmecaTrustStack />
//     </Container>
//   </Box>
// 
//   <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
//     <OmecaDeveloperIntegration navigate={navigate} />
//   </Container>
// 
//   <Box sx={{ bgcolor: isDark ? currentColors.bgTop : "#fff" }}>
//     <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
//       <OmecaSupportedIntegrations />
//     </Container>
//   </Box>
// 
// </Box>
// <OmecaAppFooter />
// 
//     </Box>
//   );
// };
// 
// export default OmecaLanding;

import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  AppBar, Toolbar, Box, Container, Typography, Button, IconButton, Grid, Paper, alpha,
  Drawer, List, ListItem, Stack, Link, useMediaQuery
} from "@mui/material";
import {
  Menu as MenuIcon, Bolt, Close as CloseIcon, Dashboard, ArrowForward, // <--- Fixed Missing Import
  CheckCircleOutlineRounded, CancelRounded, Flare, AutorenewRounded, VerifiedRounded, VerifiedUser
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { keyframes } from '@mui/system';

// --- THEME & UI ---
import { colors } from "./shared/layouts/theme/theme.js";
import { ColorModeContext } from "./shared/layouts/theme/ThemeContext.jsx";
import ThemeToggleButton from "./shared/layouts/ThemeToggleButton.jsx";
import OmecaAppFooter from "./shared/ui/AppFooter.jsx";
import OmecaLogo from "./shared/ui/OmecaLogo.jsx";

// --- EXISTING SECTIONS ---
import OmecaProblemSolutionComparison from "./omeca-governance/components/sections/ProblemSolutionComparison.jsx";
import OmecaDeveloperIntegration from "./omeca-governance/components/sections/DeveloperIntegration.jsx";
import OmecaSupportedIntegrations from "./omeca-governance/components/sections/SupportedIntegrations.jsx";

// --- FIREBASE AUTH ---
import { auth } from "./lib/firebase.js";

/* =========================================
   1. GLOBAL ASSETS & ANIMATIONS
========================================= */
const tickerScroll = keyframes`from { transform: translateX(0); } to { transform: translateX(-50%); }`;
const floatUp = keyframes`0% { transform: translateY(0px) } 50% { transform: translateY(-10px) } 100% { transform: translateY(0px) }`;

// --- EXECUTIVE BACKGROUND ---
const NoiseOverlay = () => (
  <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.015, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
);

const GridBackground = ({ isDark }) => (
  <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: "none" }}>
    <Box sx={{ 
      width: "100%", height: "100%", 
      backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)`, 
      backgroundSize: "80px 80px", 
      maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)" 
    }} />
  </Box>
);

// --- SECTION WRAPPER ---
const SectionWrapper = ({ children, isDark, transparent = true, borderTop = false }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    sx={{
      width: '100%',
      py: { xs: 8, md: 12 }, 
      position: 'relative',
      bgcolor: transparent ? 'transparent' : (isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)'),
      borderTop: borderTop ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` : 'none'
    }}
  >
    <Container maxWidth={false} sx={{ maxWidth: '1800px', px: { xs: 3, md: 6, lg: 8 } }}>
        {children}
    </Container>
  </Box>
);

// --- ANNOUNCEMENT BAR ---
const AnnouncementBar = () => (
  <Box
    sx={{
      position: 'relative',
      zIndex: 1201,
      bgcolor: colors.accent,
      color: 'black',
      py: { xs: 0.3, md: 0.4 },   // thinner on mobile
      textAlign: 'center'
    }}
  >
    <Container
      maxWidth={false}
      sx={{ 
        display: 'flex',
        gap: { xs: 1, md: 1.5 },
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          letterSpacing: 0.5,
          fontSize: { xs: '0.62rem', md: '0.7rem' }   // controlled for mobile
        }}
      >
        📣 BACKED BY NVIDIA INCEPTION & GOOGLE CLOUD FOR STARTUPS
      </Typography>
    </Container>
  </Box>
);

/* =========================================
   2. INLINED COMPONENTS
========================================= */

// --- TRUST STACK (Updated Grid Syntax) ---
const StackCard = ({ layer, title, subtitle, body, icon, color }) => {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === "dark";
    const palette = colors[mode];
  
    return (
      <Paper
        elevation={0}
        sx={{
          height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          p: { xs: 3, lg: 4 }, borderRadius: 4,
          background: isDark
            ? "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))"
            : "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(247,249,252,0.9))",
          border: `1px solid ${palette.textDim}15`,
          backdropFilter: "blur(14px)",
          transition: "all 0.28s cubic-bezier(0.24, 0.74, 0.32, 1)",
          "&:hover": { transform: "translateY(-4px)", borderColor: `${color}35`, boxShadow: isDark ? `0 24px 48px -12px ${color}15` : `0 24px 48px -12px ${color}25` }
        }}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${color}12`, color: color, boxShadow: isDark ? `inset 0 0 0 1px ${color}30` : `inset 0 0 0 1px ${color}25`, display: "flex", alignItems: "center" }}>
              {React.cloneElement(icon, { sx: { fontSize: 32 } })}
            </Box>
            <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: 700, color: palette.textDim, opacity: 0.5, letterSpacing: 2, fontSize: "0.7rem", pt: 1 }}>{layer}</Typography>
          </Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: palette.textPrimary, mb: 1, letterSpacing: "-0.02em", fontSize: { xs: "1.55rem", lg: "1.85rem" } }}>{title}</Typography>
          <Typography variant="subtitle2" fontWeight={700} sx={{ color: color, mb: 3, textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.06em", opacity: 0.95 }}>{subtitle}</Typography>
        </Box>
        <Box sx={{ mt: "auto" }}>
          <Typography variant="body1" sx={{ color: palette.textDim, fontSize: { xs: "0.96rem", lg: "1.06rem" }, lineHeight: 1.65, letterSpacing: "-0.01em" }}>{body}</Typography>
        </Box>
      </Paper>
    );
};

const OmecaTrustStack = () => {
    const { mode } = useContext(ColorModeContext);
    const palette = colors[mode];
    const stackData = [
      { layer: "L1 CORE", title: "Operational Integrity", subtitle: "Verified Real Time Inputs", body: "Omeca verifies every financial and operational event the moment it happens. This creates a single, trusted stream of truth.", icon: <Flare />, color: colors.successGreen },
      { layer: "L2 LEDGER", title: "Continuous Close", subtitle: "Always Aligned Books", body: "Omeca keeps the ledger correct throughout the month through deterministic accounting logic. Reconciliation becomes automatic.", icon: <AutorenewRounded />, color: colors.accent },
      { layer: "L3 GOVERNANCE", title: "Autonomous Governance", subtitle: "Enforced Financial Control", body: "Every transaction carries its own explanation and evidence, enabling real time governance that prevents errors before they happen.", icon: <VerifiedRounded />, color: colors.lucraGold }
    ];
  
    return (
      <Box sx={{ width: '100%', bgcolor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ textAlign: "center", mb: 6, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h2" fontWeight={900} sx={{ color: palette.textPrimary, mb: 3, fontSize: { xs: "2.5rem", md: "3.5rem" }, letterSpacing: "-0.03em" }}>
              The <span style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trust Stack</span>
            </Typography>
            <Typography variant="h5" sx={{ color: palette.textDim, fontWeight: 400, lineHeight: 1.6, maxWidth: 700, mx: "auto", fontSize: { xs: "1.1rem", md: "1.3rem" } }}>
              Three continuous layers that keep every financial event correct by design.
            </Typography>
          </Box>
          <Box sx={{ maxWidth: '1400px', width: '100%' }}>
            {/* UPDATED GRID SYNTAX: size={{ xs: 12, md: 4 }} */}
            <Grid container spacing={4} alignItems="stretch" justifyContent="center">
                {stackData.map((item, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index} sx={{ display: "flex" }}>
                    <StackCard {...item} />
                </Grid>
                ))}
            </Grid>
          </Box>
      </Box>
    );
};

// --- SYSTEM MAP ---
const SwitchingLogo = ({ logos, mode }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % logos.length), 3000 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, [logos.length]);
  const currentLogo = logos[index];
  return (
    <Paper
      elevation={mode === 'dark' ? 4 : 2}
      sx={{
        width: 140, height: 50, position: "relative", overflow: "hidden",
        bgcolor: colors[mode].card, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)', zIndex: 2, 
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLogo.name} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box sx={{ px: 1.5, py: 0.5, borderRadius: 1.5, backgroundColor: currentLogo.bg, color: currentLogo.color, fontWeight: 700, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 1 }}>
            <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: currentLogo.color }} />
            {currentLogo.name}
          </Box>
        </motion.div>
      </AnimatePresence>
    </Paper>
  );
};

const OmecaSystemMap = () => {
  const { mode } = useContext(ColorModeContext);
  const isMobile = useMediaQuery('(max-width:800px)');
  const hubGradient = `linear-gradient(135deg, ${colors.accent}, ${colors.lucraGold})`;
  const lineStroke = mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const rawNodes = [
    { id: "crm", label: "CRM", logos: [{ name: "Salesforce", color: "#0ea5e9", bg: "#e0f2fe" }, { name: "HubSpot", color: "#f97316", bg: "#ffedd5" }] },
    { id: "billing", label: "Billing", logos: [{ name: "Stripe", color: "#6366f1", bg: "#eef2ff" }, { name: "Zuora", color: "#0ea5e9", bg: "#f0f9ff" }] },
    { id: "revenue", label: "Revenue", logos: [{ name: "Paddle", color: "#8b5cf6", bg: "#f5f3ff" }, { name: "ProfitWell", color: "#10b981", bg: "#ecfdf5" }] },
    { id: "banking", label: "Banking", logos: [{ name: "JPMorgan", color: "#334155", bg: "#f1f5f9" }, { name: "Mercury", color: "#3b82f6", bg: "#eff6ff" }, { name: "Wells Fargo", color: "#f63b6aff", bg: "#eff6ff" }] },
    { id: "p2p", label: "P2P", logos: [{ name: "Bill.com", color: "#ff6b35", bg: "#fff0eb" }, { name: "Ramp", color: "#eab308", bg: "#fefce8" }] },
    { id: "payroll", label: "Payroll", logos: [{ name: "Gusto", color: "#ef4444", bg: "#fee2e2" }, { name: "ADP", color: "#dc2626", bg: "#fecaca" }] },
    { id: "planning", label: "Planning", logos: [{ name: "Anaplan", color: "#2563eb", bg: "#dbeafe" }, { name: "Cube", color: "#10b981", bg: "#d1fae5" }] },
    { id: "compliance", label: "Compliance", logos: [{ name: "Avalara", color: "#f97316", bg: "#fff7ed" }, { name: "Vertex", color: "#6366f1", bg: "#eef2ff" }] },
    { id: "data", label: "Data", logos: [{ name: "Snowflake", color: "#0ea5e9", bg: "#e0f2fe" }, { name: "BigQuery", color: "#ea4335", bg: "#fee2e2" }] },
  ];
  const nodes = useMemo(() => {
    const totalNodes = rawNodes.length; const radius = 42; const labelInset = 0.65;
    return rawNodes.map((node, i) => {
      const angle = (360 / totalNodes) * i - 90; const rad = (angle * Math.PI) / 180;
      return {
        ...node,
        logoPos: { left: `${50 + radius * Math.cos(rad)}%`, top: `${50 + radius * Math.sin(rad)}%` },
        labelPos: { left: `${50 + (radius * labelInset) * Math.cos(rad)}%`, top: `${50 + (radius * labelInset) * Math.sin(rad)}%` },
      };
    });
  }, [isMobile]);

  return (
    <Box sx={{ bgcolor: 'transparent', width: '100%', py: { xs: 8, md: 10 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: "relative", mx: "auto", width: "100%", maxWidth: 1000, aspectRatio: "1/1", maxHeight: 800 }}>
          {/* CENTER HUB */}
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20, width: { xs: 110, sm: 150, md: 200 }, height: { xs: 110, sm: 150, md: 200 } }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
              animate={{ boxShadow: ["0 0 0 rgba(0,0,0,0.4)", "0 0 60px rgba(0,0,0,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            >
              <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: hubGradient, backdropFilter: "blur(14px)", boxShadow: `0 24px 48px -12px ${mode === "dark" ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)"}`, border: "1px solid rgba(255,255,255,0.2)", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 60%)", transform: "rotate(25deg)", pointerEvents: "none" }} />
                <Typography variant="h5" fontWeight={900} sx={{ color: colors.logoDark, letterSpacing: "0.12em", textTransform: "uppercase", mb: 0.3, fontSize: { xs: "1rem", sm: "1.35rem", md: "1.75rem" } }}>OMECA</Typography>
                <Typography sx={{ color: colors.logoDark, fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.65rem" }, opacity: 0.85, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>Continuous Truth</Typography>
              </Box>
            </motion.div>
          </Box>
          <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
              {nodes.map((node, i) => (
                <motion.line key={node.id} x1="50%" y1="50%" x2={node.logoPos.left} y2={node.logoPos.top} stroke={lineStroke} strokeWidth="1.25" strokeDasharray="4 6" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} />
              ))}
            </svg>
          </Box>
          {nodes.map((node) => (
            <React.Fragment key={node.id}>
              <Box sx={{ position: "absolute", top: node.labelPos.top, left: node.labelPos.left, transform: "translate(-50%, -50%)", zIndex: 15 }}>
                <Paper elevation={0} sx={{ px: 1.5, py: 0.4, borderRadius: 10, fontWeight: 800, fontSize: "0.65rem", color: mode === 'dark' ? '#94a3b8' : '#64748b', bgcolor: colors[mode].card, border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: '0 2px 4px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>{node.label}</Paper>
              </Box>
              <Box sx={{ position: "absolute", top: node.logoPos.top, left: node.logoPos.left, transform: "translate(-50%, -50%)", zIndex: 20 }}>
                <SwitchingLogo logos={node.logos} mode={mode} />
              </Box>
            </React.Fragment>
          ))}
        </Box>
    </Box>
  );
};

/* =========================================
   3. LANDING PAGE HELPERS
========================================= */

// --- SMART CTA ---
const SmartCTA = ({ label, subtext, onClick, variant = "contained" }) => (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Button
            variant={variant}
            onClick={onClick}
            size="large"
            sx={{
                px: 5, py: 1.6, borderRadius: '9999px', fontSize: '1.1rem', fontWeight: 700, textTransform: 'none',
                bgcolor: variant === 'contained' ? colors.accent : 'transparent',
                color: variant === 'contained' ? 'black' : 'text.primary',
                borderColor: variant === 'outlined' ? colors.accent : 'transparent',
                transition: 'all 0.25s ease-in-out',
                '&:hover': { transform: 'scale(1.02)', bgcolor: variant === 'contained' ? 'white' : 'rgba(255,255,255,0.05)', '& + .hover-text': { opacity: 1 } }
            }}
        >
            {label}
        </Button>
        <Typography
            className="hover-text"
            variant="caption"
            sx={{
                position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)',
                opacity: 0, transition: 'opacity 0.2s ease', color: 'text.secondary', whiteSpace: 'nowrap', pointerEvents: 'none'
            }}
        >
            {subtext}
        </Typography>
    </Box>
);

// --- LIVE PREVIEW (3 Cards) ---
const MetricCard = ({ label, sublabel, metric, color, isDark, icon: Icon }) => (
    <Paper
        elevation={0}
        sx={{
            p: 3, height: '100%', borderRadius: 4, position: 'relative', overflow: 'hidden',
            bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-4px)' }
        }}
    >
        <Box sx={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, background: `radial-gradient(circle, ${alpha(color, 0.15)} 0%, transparent 70%)`, zIndex: 0 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'text.secondary', mb: 1, display: 'block' }}>{label}</Typography>
                {Icon && <Icon sx={{ color: color, opacity: 0.8 }} />}
            </Box>
            <Typography variant="h3" sx={{ color: color, mb: 0.5, fontWeight: 800 }}>{metric}%</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>{sublabel}</Typography>
        </Box>
    </Paper>
);

const LivePreviewPanel = ({ onExplore, isDark }) => {
    const [data, setData] = useState({ control: 98.4, recon: 88.2, evidence: 100 });
    useEffect(() => {
        const i = setInterval(() => setData(p => ({
            control: Math.min(100, Math.max(98, p.control + (Math.random() - 0.5) * 0.2)),
            recon: Math.min(100, Math.max(88, p.recon + (Math.random() - 0.5) * 0.4)),
            evidence: 100
        })), 2500);
        return () => clearInterval(i);
    }, []);

    return (
        <Box sx={{ width: "100%", maxWidth: 650, mx: "auto", position: 'relative', animation: `${floatUp} 6s ease-in-out infinite` }}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', height: '90%', borderRadius: '50%', background: `radial-gradient(circle, ${colors.lucraGold}20 0%, transparent 60%)`, filter: 'blur(60px)', zIndex: -1 }} />
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.lucraGold, boxShadow: `0 0 8px ${colors.lucraGold}` }} />
                <Typography variant="overline" sx={{ fontWeight: 800, color: colors.lucraGold, letterSpacing: "1.5px" }}>LIVE ENGINE PREVIEW</Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}><MetricCard label="Integrity" sublabel="Inputs Verified" metric={data.control.toFixed(1)} color={colors.accent} isDark={isDark} /></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><MetricCard label="Ledger" sublabel="Reconciled" metric={data.recon.toFixed(1)} color={colors.successGreen} isDark={isDark} /></Grid>
                <Grid size={{ xs: 12 }}><MetricCard label="Verifiable Trust" sublabel="Audit Proof" metric={data.evidence} color={colors.lucraGold} isDark={isDark} icon={VerifiedUser} /></Grid>
                
                <Grid size={{ xs: 12 }}>
                    <Paper onClick={onExplore} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, transition: 'all 0.2s', '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : '#f8f8f8', borderColor: colors.accent } }}>
                        <Typography variant="subtitle2" fontWeight={700}>Explore the Trust Stack</Typography>
                        <ArrowForward fontSize="small" sx={{ color: colors.accent }} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

/* =========================================
   4. MAIN PAGE LAYOUT
========================================= */
const OmecaLanding = () => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return () => unsub();
  }, []);

  // --- NAVIGATION LOGIC ---
  const navItems = user 
    ? [{ label: 'Dashboard', path: '/dashboard', icon: Dashboard }, { label: 'Product', path: '/trust-stack' }, { label: 'Pricing', path: '/pricing' }]
    : [{ label: 'Product', path: '/trust-stack' }, { label: 'Pricing', path: '/pricing' }, { label: 'Company', path: '/company' }];

  const handleNavClick = (path) => { navigate(path); setMobileOpen(false); };

  // --- MOBILE DRAWER CONTENT ---
  const drawer = (
    <Box sx={{ height: '100%', bgcolor: isDark ? '#0B0F17' : '#fff', color: 'text.primary' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
        <OmecaLogo size={40} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggleButton />
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'text.primary' }}><CloseIcon /></IconButton>
        </Box>
      </Box>
      <List sx={{ p: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
            <Button
              fullWidth
              onClick={() => handleNavClick(item.path)}
              startIcon={item.icon ? <item.icon /> : null}
              sx={{ justifyContent: 'flex-start', py: 2, color: 'text.primary', fontSize: '1.1rem', fontWeight: 600 }}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
        <Box sx={{ mt: 3, px: 1 }}>
            <Button 
                fullWidth 
                variant={user ? "outlined" : "contained"} 
                onClick={() => {
                    if (user) { signOut(auth); } else { handleNavClick("/partner-login"); }
                }} 
                sx={{ 
                    py: 1.5, borderRadius: 2, fontWeight: 700, 
                    bgcolor: user ? 'transparent' : colors.accent, 
                    color: user ? 'text.primary' : 'black',
                    borderColor: colors.accent 
                }}
            >
                {user ? "Log Out" : "Partner Login"}
            </Button>
        </Box>
      </List>
    </Box>
  );

  if (loading) return null;

  return (
    <Box sx={{ minHeight: "100vh", overflowX: 'hidden', color: 'text.primary', position: 'relative' }}>
      
{/* 1. BACKGROUND */}
      <NoiseOverlay />
      <GridBackground isDark={isDark} />

      {/* 2. FIXED NAV ASSEMBLY (Announcement + AppBar) */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <AnnouncementBar />
        <AppBar 
            position="static" // Changed to static because the parent Box is fixed
            elevation={0} 
            sx={{ 
                bgcolor: isDark ? "rgba(11,15,23,0.85)" : "rgba(255,255,255,0.85)", 
                backdropFilter: "blur(16px)", 
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` 
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '1800px', px: { xs: 3, md: 6 } }}>
                <Toolbar disableGutters sx={{ justifyContent: "space-between", height: 72 }}>
                    <Box onClick={() => navigate("/")} sx={{ cursor: "pointer", opacity: 0.9, "&:hover": { opacity: 1 } }}>
                        <OmecaLogo size={98} />
                    </Box>
                    
                    {/* Desktop Nav */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, alignItems: 'center' }}>
                        <Link underline="none" onClick={() => navigate('/trust-stack')} sx={{ cursor: 'pointer', fontWeight: 600, color: 'text.primary', '&:hover': { color: colors.accent } }}>Product</Link>
                        <Link underline="none" onClick={() => navigate('/pricing')} sx={{ cursor: 'pointer', fontWeight: 600, color: 'text.primary', '&:hover': { color: colors.accent } }}>Pricing</Link>
                        <ThemeToggleButton />
                        <Button variant={user ? "outlined" : "contained"} onClick={() => user ? signOut(auth) : navigate("/partner-login")} sx={{ borderRadius: 50, px: 3, fontWeight: 700, bgcolor: user ? 'transparent' : colors.accent, color: user ? 'text.primary' : 'black' }}>{user ? "Log Out" : "Partner Login"}</Button>
                    </Box>
                    
                    {/* Mobile Menu Icon */}
                    <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: "flex", md: "none" } }}><MenuIcon /></IconButton>
                </Toolbar>
            </Container>
        </AppBar>
      </Box>

      {/* SPACER: Pushes content down so it doesn't hide behind the fixed header */}
      {/* Approx Height = Announcement (~40px) + Navbar (72px) */}
      <Box sx={{ height: 112 }} />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="top"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ 
            display: { xs: 'block', md: 'none' }, 
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', maxHeight: '80vh', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 } 
        }}
      >
        {drawer}
      </Drawer>

      {/* --- HERO --- */}
      <SectionWrapper isDark={isDark} transparent={true}>
            {/* FIX: UPDATED GRID SYNTAX */}
            <Grid container spacing={8} alignItems="center" sx={{ mt: { xs: -4, md: -8 } }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography 
                        component={motion.h1}
                        variant="h1" 
                        sx={{ 
                            fontWeight: 800, 
                            fontSize: { xs: "3rem", md: "4.5rem", lg: "5.5rem" }, 
                            lineHeight: 1.1, 
                            mb: 3, 
                            letterSpacing: '-0.02em', 
                            cursor: 'default', 
                            color: 'text.primary', 
                            transition: 'color 0.2s ease-in-out',
                            '&:hover': { color: colors.accent } 
                        }}
                    >
                        The Control Plane <br />
                        <Box component="span" sx={{ color: colors.accent }}>for Modern Finance</Box>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5, maxWidth: '50ch', lineHeight: 1.6, fontSize: '1.2rem' }}>
                      A financial control engine that establishes financial truth and enforces correct behavior across high-velocity workflows.
                    </Typography>
                    
                    <Stack direction="row" spacing={3}>
                        <SmartCTA label={user ? "Go to Dashboard" : "Start Your Pilot"} subtext="Set up in under 2 minutes" onClick={() => navigate(user ? '/dashboard' : '/partner-login')} variant="contained" />
                        <SmartCTA label="Book a Demo" subtext="Schedule instantly or email us" onClick={() => window.open('mailto:demo@omeca.co', '_blank')} variant="outlined" />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <LivePreviewPanel onExplore={() => navigate("/trust-stack")} isDark={isDark} />
                </Grid>
            </Grid>
      </SectionWrapper>

      {/* --- MARQUEE --- */}
      <Box sx={{ width: '100%', py: 5, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
         <Typography variant="h6" sx={{ textAlign: "center", mb: 4, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", opacity: 0.9 }}>Every Workflow Connects Into the Omeca Accounting Engine</Typography>
         <Box sx={{ overflow: "hidden", whiteSpace: "nowrap", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <Box sx={{ display: 'inline-block', animation: `${tickerScroll} 40s linear infinite` }}>
                {[...Array(2)].map((_, i) => (
                    <Box key={i} component="span" sx={{ display: 'inline-flex', gap: 8, pr: 8 }}>
                        {["OpenAI", "Stripe", "NetSuite", "Snowflake", "Brex", "Salesforce", "LangChain", "Ramp", "Slack"].map((brand) => (
                            <Typography key={brand} variant="h5" sx={{ 
                                fontWeight: 700, color: 'text.secondary', opacity: 0.5, fontFamily: 'monospace', 
                                transition: 'all 0.3s ease', cursor: 'default',
                                '&:hover': { color: colors.accent, opacity: 1, transform: 'scale(1.05)' } 
                            }}>{brand}</Typography>
                        ))}
                    </Box>
                ))}
            </Box>
         </Box>
      </Box>

      {/* --- PROBLEM / SOLUTION --- */}
      <SectionWrapper isDark={isDark} transparent={false}>
          <OmecaProblemSolutionComparison /> 
      </SectionWrapper>

      {/* --- TRUST STACK (Inline) --- */}
      <SectionWrapper isDark={isDark} transparent={true} borderTop={true}>
             <OmecaTrustStack />
      </SectionWrapper>

       {/* --- SYSTEM MAP (Inline, Header moved to Page) --- */}
      {/* <SectionWrapper isDark={isDark} transparent={true} borderTop={false}>
             <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" fontWeight={900} sx={{ mb: 2, color: 'text.primary', letterSpacing: '-0.02em', fontSize: { xs: '2rem', md: '3rem' } }}>
                    One system. <Box component="span" sx={{ color: colors.accent }}>Trusted by design.</Box>
                </Typography>
                <Typography sx={{ color: 'text.secondary', maxWidth: 720, mx: "auto", fontSize: "1.1rem", lineHeight: 1.7 }}>
                    Every agent and system records its activity into a single trusted real-time core.
                </Typography>
             </Box>
             <OmecaSystemMap />
      </SectionWrapper> */}

      {/* --- DEVELOPER --- */}
      <SectionWrapper isDark={isDark} transparent={false} borderTop={true}>
            <OmecaDeveloperIntegration navigate={navigate} />
      </SectionWrapper>

      {/* --- FOOTER CTA (UPDATED MESSAGE) --- */}
      <SectionWrapper isDark={isDark} transparent={true} borderTop={true}>
         <Container maxWidth="md" sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 3 }}>Establish financial truth in one Control Plane.</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                 <SmartCTA label="Get Started Now" subtext="No credit card required" onClick={() => navigate('/partner-login')} variant="contained" />
            </Stack>
         </Container>
         <Box sx={{ mt: 8 }}>
             <OmecaSupportedIntegrations />
         </Box>
      </SectionWrapper>

      <OmecaAppFooter />
    </Box>
  );
};

export default OmecaLanding;