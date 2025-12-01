// import React, { useState, useContext, useEffect, useRef } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Container,
//   Typography,
//   Button,
//   IconButton,
//   Grid,
//   Chip,
//   Paper,
//   alpha,
//   Stack
// } from "@mui/material";
// import { Menu as MenuIcon, Bolt, CheckCircle, ArrowForward, VerifiedUser, Security } from "@mui/icons-material";
// import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// 
// import { colors } from "./shared/layouts/theme/theme.js";
// import { ColorModeContext } from "./shared/layouts/theme/ThemeContext.jsx";
// import ThemeToggleButton from "./shared/layouts/ThemeToggleButton.jsx";
// 
// // UI Components
// import OmecaAppFooter from "./shared/ui/AppFooter.jsx";
// import OmecaLogo from "./shared/ui/OmecaLogo.jsx";
// 
// // Sections
// import OmecaProblemSolutionComparison from "./omeca-governance/components/sections/ProblemSolutionComparison.jsx";
// import OmecaTrustStack from "./omeca-governance/components/sections/TrustStack.jsx";
// import OmecaDeveloperIntegration from "./omeca-governance/components/sections/DeveloperIntegration.jsx";
// import OmecaSupportedIntegrations from "./omeca-governance/components/sections/SupportedIntegrations.jsx";
// 
// // --- VISUAL ASSETS ---
// const NoiseOverlay = () => (
//   <Box
//     sx={{
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       pointerEvents: "none", zIndex: 10000, opacity: 0.03,
//       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//     }}
//   />
// );
// 
// const GridBackground = ({ isDark }) => (
//   <Box
//     sx={{
//       position: "absolute", top: 0, left: 0, right: 0, height: "100%",
//       overflow: "hidden", zIndex: 0,
//       maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
//     }}
//   >
//     <Box
//       sx={{
//         width: "100%", height: "100%",
//         backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
//         linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
//         backgroundSize: "60px 60px",
//       }}
//     />
//   </Box>
// );
// 
// // --- ANIMATED COUNTER ---
// const Counter = ({ value, suffix = "", color }) => {
//   const nodeRef = useRef();
//   const prevValue = useRef(value);
// 
//   useEffect(() => {
//     const node = nodeRef.current;
//     if (!node) return;
//     
//     const controls = animate(prevValue.current, value, {
//       duration: 1.5,
//       ease: "easeOut",
//       onUpdate: (v) => { 
//         const formatted = v % 1 === 0 ? v.toFixed(0) : v.toFixed(1);
//         node.textContent = formatted + suffix; 
//       },
//     });
//     prevValue.current = value;
//     return () => controls.stop();
//   }, [value, suffix]);
// 
//   return (
//     <Typography
//       ref={nodeRef}
//       variant="h2"
//       sx={{
//         color: color,
//         mb: 1,
//         fontSize: { xs: "2.5rem", md: "3.5rem" },
//         fontWeight: 800,
//         letterSpacing: "-0.04em",
//         lineHeight: 1
//       }}
//     >
//       {value}{suffix}
//     </Typography>
//   );
// };
// 
// // --- HERO METRIC CARD (View Only) ---
// const HeroMetricCard = ({ label, sublabel, metric, color, icon: Icon }) => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === "dark";
// 
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 3,
//         height: '100%',
//         borderRadius: 4,
//         bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
//         border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
//         boxShadow: isDark ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.05)',
//         transition: 'transform 0.3s ease',
//         position: 'relative',
//         overflow: 'hidden',
//         // No cursor pointer, implies read-only
//       }}
//     >
//       {/* Background Glow */}
//       <Box sx={{
//         position: 'absolute', top: -20, right: -20, width: 100, height: 100,
//         background: `radial-gradient(circle, ${alpha(color, 0.15)} 0%, transparent 70%)`,
//         zIndex: 0
//       }} />
// 
//       <Box sx={{ position: 'relative', zIndex: 1 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box>
//                 <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block' }}>
//                     {label}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
//                     {sublabel}
//                 </Typography>
//             </Box>
//             {Icon && <Icon sx={{ color: color, opacity: 0.8 }} />}
//         </Box>
// 
//         <Counter value={metric} suffix="%" color={color} />
// 
//         <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, boxShadow: `0 0 8px ${color}` }} />
//             <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                 Live Verification Active
//             </Typography>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };
// 
// // --- LIVE PREVIEW PANEL (THE RIGHT SIDE HERO) ---
// const LivePreviewPanel = ({ onExplore }) => {
//   const [data, setData] = useState({ 
//     control: 98.4, 
//     recon: 88.2, 
//     evidence: 100,
//     isConnected: false 
//   });
// 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const API_BASE = "http://127.0.0.1:8000/api/v1";
//         const [l1Res, l2Res, l3Res] = await Promise.all([
//           fetch(`${API_BASE}/integrity/score`),
//           fetch(`${API_BASE}/reconciliation/status`),
//           fetch(`${API_BASE}/governance/proofs`)
//         ]);
// 
//         if (l1Res.ok && l2Res.ok && l3Res.ok) {
//           const l1 = await l1Res.json();
//           const l2 = await l2Res.json();
//           const l3 = await l3Res.json();
// 
//           setData({
//             control: l1.metrics.integrity_score,
//             recon: l2.metrics.reconciliation_rate,
//             evidence: l3.verification_rate,
//             isConnected: true
//           });
//         }
//       } catch (err) {
//         // Silent fail (keep default numbers if offline)
//       }
//     };
//     const interval = setInterval(fetchData, 2000); 
//     fetchData(); 
//     return () => clearInterval(interval);
//   }, []);
// 
//   return (
//     <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
//       
//       <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1.5 }}>
//         <Box sx={{ position: 'relative', display: 'flex' }}>
//             <Box sx={{ width: 8, height: 8, borderRadius: '50%', 
//                bgcolor: data.isConnected ? colors.successGreen : colors.accent }} 
//             />
//             <Box sx={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', 
//                  bgcolor: data.isConnected ? colors.successGreen : colors.accent, 
//                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.7 }} 
//             />
//             <style>{`@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
//         </Box>
//         <Typography variant="overline" sx={{ fontWeight: 800, color: colors.accent, letterSpacing: "1.5px" }}>
//           CONTINUOUS CONTROL LIVE
//         </Typography>
//       </Box>
// 
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <HeroMetricCard label="L1: Operational Control" sublabel="Forecast Accuracy" metric={data.control} color={colors.accent} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <HeroMetricCard label="L2: Continuous Close" sublabel="Auto-Reconciliation" metric={data.recon} color={colors.successGreen} />
//         </Grid>
//         <Grid item xs={12}>
//           <HeroMetricCard label="L3: Verifiable Trust" sublabel="Evidence Attached" metric={data.evidence} color={colors.lucraGold} icon={VerifiedUser} />
//         </Grid>
// 
//         <Grid item xs={12} sx={{ mt: 2 }}>
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                 <Button
//                     onClick={onExplore}
//                     fullWidth
//                     sx={{
//                         py: 2.5,
//                         borderRadius: 4,
//                         bgcolor: 'rgba(0,0,0,0.03)',
//                         color: 'text.primary',
//                         textTransform: 'none',
//                         fontSize: '1.1rem',
//                         fontWeight: 700,
//                         border: '1px solid rgba(0,0,0,0.08)',
//                         justifyContent: 'space-between',
//                         px: 4,
//                         "&:hover": { bgcolor: 'rgba(0,0,0,0.06)', borderColor: colors.accent }
//                     }}
//                     endIcon={<ArrowForward sx={{ color: colors.accent }} />}
//                 >
//                     Explore The Trust Stack
//                 </Button>
//             </motion.div>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
// 
// // --- MAIN PAGE ---
// 
// const OmecaLanding = () => {
//   const navigate = useNavigate();
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
//   const isDark = mode === "dark";
// 
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   
//   const handleRequest = () => {
//     if (email.includes("@")) setSubmitted(true);
//   };
// 
//   // The Enterprise List (Marquee)
//   const integrations = ["NetSuite", "SAP S/4HANA", "Workday", "Snowflake", "Stripe", "Salesforce", "AWS", "Databricks"];
// 
//   return (
//     <Box sx={{ bgcolor: currentColors.bgTop, color: currentColors.textPrimary, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
//       <NoiseOverlay />
//       <GridBackground isDark={isDark} />
//       
//       {/* NAV */}
//       <AppBar position="fixed" elevation={0} sx={{ bgcolor: isDark ? "rgba(11,15,23,0.7)" : "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, zIndex: 1200 }}>
//         <Toolbar sx={{ justifyContent: "space-between", height: 72 }}>
//           <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", opacity: 0.9, "&:hover": { opacity: 1 } }} onClick={() => navigate("/")}><OmecaLogo size={98} /></Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//             <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
//               {['Product', 'Pricing', 'Company'].map((item) => (
//                 <Button key={item} onClick={() => { if (item === 'Product') navigate('/trust-stack'); else if (item === 'Company') navigate('/company'); else navigate(`/${item.toLowerCase()}`); }} sx={{ color: currentColors.textDim, fontWeight: 500, "&:hover": { color: currentColors.textPrimary, bgcolor: 'transparent' } }}>{item}</Button>
//               ))}
//             </Box>
//             <ThemeToggleButton />
//             <Button variant="outlined" size="small" sx={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', color: currentColors.textPrimary, borderRadius: 50, textTransform: 'none', px: 2.5, display: { xs: "none", sm: "flex" }, "&:hover": { borderColor: colors.accent, bgcolor: 'transparent' } }} onClick={() => navigate("/contact")}>Partner Login</Button>
//             <IconButton sx={{ display: { xs: "flex", md: "none" } }}><MenuIcon /></IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       
//       {/* HERO */}
//       <Box sx={{ pt: { xs: 14, md: 18 }, position: 'relative', zIndex: 1 }}>
//         <Box sx={{ position: 'relative', pb: { xs: 10, md: 16 } }}>
//           <Container maxWidth="xl" sx={{ maxWidth: "1400px", px: { xs: 3, md: 6 }, position: 'relative' }}>
//             <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">
//               
//               {/* HERO TEXT */}
//               <Grid item xs={12} md={6}>
//                 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
//                   <Chip label="Backed by NVIDIA Inception & Google Cloud" icon={<Bolt style={{ color: colors.accent, fontSize: 16 }} />} sx={{ mb: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: currentColors.textDim, fontWeight: 600 }} />
//                   <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: "3rem", md: "4.8rem" }, letterSpacing: "-0.03em", lineHeight: 1.1, mb: 3, background: isDark ? `linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)` : `linear-gradient(180deg, #000 0%, rgba(0,0,0,0.7) 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                     The Autonomous <br />
//                     <Box component="span" sx={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Financial Core.</Box>
//                   </Typography>
//                   <Typography variant="h6" sx={{ color: currentColors.textDim, mb: 5, maxWidth: 580, lineHeight: 1.6, fontWeight: 400 }}>
//                     Transforming ERPs from passive record-keeping to continuous, autonomous control. Unify operational truth, real-time close, and verifiable intelligence.
//                   </Typography>
// 
//                   {/* EMAIL INPUT */}
//                   {!submitted ? (
//                     <Box component="form" sx={{ display: 'flex', alignItems: 'center', maxWidth: 440, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#fff', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: 50, p: 0.5, pl: 2.5, boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.2s', "&:focus-within": { borderColor: colors.accent, boxShadow: `0 0 0 4px ${colors.accent}20` } }}>
//                         <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="work@company.com" style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: currentColors.textPrimary, fontSize: '1rem' }} />
//                         <Button onClick={handleRequest} sx={{ borderRadius: 50, px: 3, py: 1.2, bgcolor: colors.accent, color: '#000', fontWeight: 700, textTransform: 'none', minWidth: 'fit-content', whiteSpace: 'nowrap', "&:hover": { bgcolor: '#fff' } }}>Request Pilot</Button>
//                     </Box>
//                   ) : (
//                     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: colors.successGreen }}><CheckCircle /><Typography fontWeight={600}>Pilot request sent. We will be in touch.</Typography></Box>
//                     </motion.div>
//                   )}
//                   
//                   {/* PREMIUM MARQUEE STRIP - UPDATED */}
//                   <Box sx={{ mt: 6, opacity: 0.7, maxWidth: 500, overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
//                     <Typography variant="caption" sx={{ color: currentColors.textDim, fontWeight: 700, mb: 1.5, display: 'block', fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase' }}>
//                         INTEGRATES WITH
//                     </Typography>
//                     <motion.div
//                         animate={{ x: ["0%", "-50%"] }}
//                         transition={{ duration: 20, ease: "linear", repeat: Infinity }}
//                         style={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap' }}
//                     >
//                         {/* Replaced static text list with Premium Typography Marquee */}
//                         {['Brex', 'Netsuite', 'Slack', 'Snowflake', 'Brex', 'Netsuite', 'Slack', 'Snowflake'].map((brand, i) => (
//                             <Typography key={i} variant="body2" sx={{ fontWeight: 700, color: currentColors.textDim, fontFamily: 'monospace', fontSize: '0.9rem' }}>{brand}</Typography>
//                         ))}
//                     </motion.div>
//                   </Box>
// 
//                 </motion.div>
//               </Grid>
// 
//               {/* RIGHT SIDE: LIVE DATA CARDS */}
//               <Grid item xs={12} md={6}>
//                 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
//                     <LivePreviewPanel onExplore={() => navigate("/trust-stack")} />
//                 </motion.div>
//               </Grid>
// 
//             </Grid>
//           </Container>
//         </Box>
// 
//         <Container maxWidth="xl" sx={{ maxWidth: "1400px" }}><Box sx={{ borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} /></Container>
//         <Box sx={{ position: 'relative' }}><Container maxWidth="xl" sx={{ maxWidth: "1600px", py: { xs: 8, md: 12 } }}><OmecaProblemSolutionComparison /></Container></Box>
//         <Box sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderY: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}><Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaTrustStack /></Container></Box>
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaDeveloperIntegration navigate={navigate} /></Container>
//         <Box sx={{ bgcolor: isDark ? currentColors.bgTop : "#fff" }}><Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaSupportedIntegrations /></Container></Box>
//       </Box>
//       <OmecaAppFooter />
//     </Box>
//   );
// };
// 
// export default OmecaLanding;

// import React, { useState, useContext, useEffect, useRef } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Container,
//   Typography,
//   Button,
//   IconButton,
//   Grid,
//   Chip,
//   Paper,
//   alpha,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   MenuItem,
//   useMediaQuery
// } from "@mui/material";
// import { 
//     Menu as MenuIcon, 
//     Bolt, 
//     CheckCircle, 
//     ArrowForward, 
//     VerifiedUser, 
//     Close as CloseIcon, 
//     Business, 
//     Person
// } from "@mui/icons-material";
// import { motion, useMotionTemplate, useMotionValue, animate, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// 
// import { colors } from "./shared/layouts/theme/theme.js";
// import { ColorModeContext } from "./shared/layouts/theme/ThemeContext.jsx";
// import ThemeToggleButton from "./shared/layouts/ThemeToggleButton.jsx";
// 
// // UI Components
// import OmecaAppFooter from "./shared/ui/AppFooter.jsx";
// import OmecaLogo from "./shared/ui/OmecaLogo.jsx";
// 
// // Sections
// import OmecaProblemSolutionComparison from "./omeca-governance/components/sections/ProblemSolutionComparison.jsx";
// import OmecaTrustStack from "./omeca-governance/components/sections/TrustStack.jsx";
// import OmecaDeveloperIntegration from "./omeca-governance/components/sections/DeveloperIntegration.jsx";
// import OmecaSupportedIntegrations from "./omeca-governance/components/sections/SupportedIntegrations.jsx";
// 
// // --- VISUAL ASSETS ---
// const NoiseOverlay = () => (
//   <Box
//     sx={{
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       pointerEvents: "none", zIndex: 10000, opacity: 0.03,
//       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//     }}
//   />
// );
// 
// const GridBackground = ({ isDark }) => (
//   <Box
//     sx={{
//       position: "absolute", top: 0, left: 0, right: 0, height: "100%",
//       overflow: "hidden", zIndex: 0,
//       maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
//     }}
//   >
//     <Box
//       sx={{
//         width: "100%", height: "100%",
//         backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
//         linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
//         backgroundSize: "60px 60px",
//       }}
//     />
//   </Box>
// );
// 
// // --- ANIMATED COUNTER ---
// const Counter = ({ value, suffix = "", color }) => {
//   const nodeRef = useRef();
//   const prevValue = useRef(value);
// 
//   useEffect(() => {
//     const node = nodeRef.current;
//     if (!node) return;
//     
//     const controls = animate(prevValue.current, value, {
//       duration: 1.5,
//       ease: "easeOut",
//       onUpdate: (v) => { 
//         const formatted = v % 1 === 0 ? v.toFixed(0) : v.toFixed(1);
//         node.textContent = formatted + suffix; 
//       },
//     });
//     prevValue.current = value;
//     return () => controls.stop();
//   }, [value, suffix]);
// 
//   return (
//     <Typography
//       ref={nodeRef}
//       variant="h2"
//       sx={{
//         color: color,
//         mb: 1,
//         fontSize: { xs: "2.5rem", md: "3.5rem" },
//         fontWeight: 800,
//         letterSpacing: "-0.04em",
//         lineHeight: 1
//       }}
//     >
//       {value}{suffix}
//     </Typography>
//   );
// };
// 
// // --- HERO METRIC CARD (View Only) ---
// const HeroMetricCard = ({ label, sublabel, metric, color, icon: Icon }) => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === "dark";
// 
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 3,
//         height: '100%',
//         borderRadius: 4,
//         bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
//         border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
//         boxShadow: isDark ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.05)',
//         transition: 'transform 0.3s ease',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Background Glow */}
//       <Box sx={{
//         position: 'absolute', top: -20, right: -20, width: 100, height: 100,
//         background: `radial-gradient(circle, ${alpha(color, 0.15)} 0%, transparent 70%)`,
//         zIndex: 0
//       }} />
// 
//       <Box sx={{ position: 'relative', zIndex: 1 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box>
//                 <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block' }}>
//                     {label}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
//                     {sublabel}
//                 </Typography>
//             </Box>
//             {Icon && <Icon sx={{ color: color, opacity: 0.8 }} />}
//         </Box>
// 
//         <Counter value={metric} suffix="%" color={color} />
// 
//         <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, boxShadow: `0 0 8px ${color}` }} />
//             <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
//                 Live Verification Active
//             </Typography>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };
// 
// // --- LIVE PREVIEW PANEL ---
// const LivePreviewPanel = ({ onExplore }) => {
//   const [data, setData] = useState({ 
//     control: 98.4, 
//     recon: 88.2, 
//     evidence: 100,
//     isConnected: false,
//     isSimulated: false
//   });
// 
//   useEffect(() => {
//     let isMounted = true;
//     const API_BASE = "http://127.0.0.1:8000/api/v1";
// 
//     const fetchOrSimulate = async () => {
//       try {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 1000); 
// 
//         const [l1Res, l2Res, l3Res] = await Promise.all([
//           fetch(`${API_BASE}/integrity/score`, { signal: controller.signal }),
//           fetch(`${API_BASE}/reconciliation/status`, { signal: controller.signal }),
//           fetch(`${API_BASE}/governance/proofs`, { signal: controller.signal })
//         ]);
// 
//         clearTimeout(timeoutId);
// 
//         if (l1Res.ok && l2Res.ok && l3Res.ok) {
//           const l1 = await l1Res.json();
//           const l2 = await l2Res.json();
//           const l3 = await l3Res.json();
// 
//           if (isMounted) {
//             setData({
//               control: l1.metrics.integrity_score,
//               recon: l2.metrics.reconciliation_rate,
//               evidence: l3.verification_rate,
//               isConnected: true,
//               isSimulated: false
//             });
//           }
//         } else {
//           throw new Error("API Error");
//         }
//       } catch (err) {
//         if (isMounted) {
//           setData(prev => ({
//             ...prev,
//             control: Math.min(100, Math.max(98, prev.control + (Math.random() - 0.5) * 0.2)),
//             recon: Math.min(100, Math.max(88, prev.recon + (Math.random() - 0.5) * 0.4)),
//             isConnected: false,
//             isSimulated: true
//           }));
//         }
//       }
//     };
// 
//     fetchOrSimulate();
//     const interval = setInterval(fetchOrSimulate, 3000); 
//     return () => {
//       isMounted = false;
//       clearInterval(interval);
//     };
//   }, []);
// 
//   const indicatorColor = data.isConnected ? colors.successGreen : (data.isSimulated ? colors.lucraGold : colors.accent);
//   const indicatorText = data.isConnected ? "LIVE SYSTEM CONNECTED" : "CONTINUOUS CONTROL LIVE";
// 
//   return (
//     <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
//       <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1.5 }}>
//         <Box sx={{ position: 'relative', display: 'flex' }}>
//             <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: indicatorColor }} />
//             <Box sx={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', bgcolor: indicatorColor, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.7 }} />
//             <style>{`@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
//         </Box>
//         <Typography variant="overline" sx={{ fontWeight: 800, color: indicatorColor, letterSpacing: "1.5px" }}>
//           {indicatorText}
//         </Typography>
//       </Box>
// 
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <HeroMetricCard label="L1: Operational Control" sublabel="Forecast Accuracy" metric={data.control} color={colors.accent} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <HeroMetricCard label="L2: Continuous Close" sublabel="Auto-Reconciliation" metric={data.recon} color={colors.successGreen} />
//         </Grid>
//         <Grid item xs={12}>
//           <HeroMetricCard label="L3: Verifiable Trust" sublabel="Evidence Attached" metric={data.evidence} color={colors.lucraGold} icon={VerifiedUser} />
//         </Grid>
// 
//         <Grid item xs={12} sx={{ mt: 2 }}>
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                 <Button
//                     onClick={onExplore}
//                     fullWidth
//                     sx={{
//                         py: 2.5, borderRadius: 4, bgcolor: 'rgba(0,0,0,0.03)', color: 'text.primary',
//                         textTransform: 'none', fontSize: '1.1rem', fontWeight: 700,
//                         border: '1px solid rgba(0,0,0,0.08)', justifyContent: 'space-between', px: 4,
//                         "&:hover": { bgcolor: 'rgba(0,0,0,0.06)', borderColor: colors.accent }
//                     }}
//                     endIcon={<ArrowForward sx={{ color: colors.accent }} />}
//                 >
//                     Explore The Trust Stack
//                 </Button>
//             </motion.div>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
// 
// // --- MULTI-STEP PILOT FLOW COMPONENT ---
// const PilotRequestFlow = () => {
//     const { mode } = useContext(ColorModeContext);
//     const isDark = mode === "dark";
//     const currentColors = colors[mode];
//     
//     // Steps: 'email' -> 'details' -> 'success'
//     const [step, setStep] = useState('email');
//     const [formData, setFormData] = useState({
//         email: '',
//         fullName: '',
//         companyName: '',
//         companySize: '',
//         industry: ''
//     });
// 
//     const handleEmailSubmit = (e) => {
//         e.preventDefault();
//         if (formData.email.includes('@')) {
//             setStep('details');
//         }
//     };
// 
//     const handleDetailsSubmit = (e) => {
//         e.preventDefault();
//         // Here you would send formData to backend
//         setStep('success');
//     };
// 
//     return (
//         <Box sx={{ minHeight: 80, position: 'relative' }}>
//             <AnimatePresence mode="wait">
//                 
//                 {/* STEP 1: EMAIL ONLY */}
//                 {step === 'email' && (
//                     <motion.div
//                         key="step-email"
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <Box component="form" onSubmit={handleEmailSubmit} sx={{ display: 'flex', alignItems: 'center', maxWidth: 440, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#fff', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: 50, p: 0.5, pl: 2.5, boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.2s', "&:focus-within": { borderColor: colors.accent, boxShadow: `0 0 0 4px ${colors.accent}20` } }}>
//                             <input 
//                                 value={formData.email} 
//                                 onChange={(e) => setFormData({...formData, email: e.target.value})} 
//                                 placeholder="work@company.com" 
//                                 required
//                                 style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: currentColors.textPrimary, fontSize: '1rem' }} 
//                             />
//                             <Button type="submit" sx={{ borderRadius: 50, px: 3, py: 1.2, bgcolor: colors.accent, color: '#000', fontWeight: 700, textTransform: 'none', minWidth: 'fit-content', whiteSpace: 'nowrap', "&:hover": { bgcolor: '#fff' } }}>
//                                 Request Pilot
//                             </Button>
//                         </Box>
//                         <Typography variant="caption" sx={{ display: 'block', mt: 1.5, ml: 2, color: currentColors.textDim }}>
//                              Start your free pilot. No credit card required.
//                         </Typography>
//                     </motion.div>
//                 )}
// 
//                 {/* STEP 2: COMPANY DETAILS (Progressive Profiling) */}
//                 {step === 'details' && (
//                     <motion.div
//                         key="step-details"
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.95 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <Paper elevation={0} sx={{ 
//                             p: 3, 
//                             borderRadius: 4, 
//                             bgcolor: isDark ? 'rgba(20,25,35,0.95)' : '#fff', 
//                             border: `1px solid ${colors.accent}`,
//                             maxWidth: 480,
//                             backdropFilter: 'blur(10px)'
//                         }}>
//                             <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ color: colors.accent }}>
//                                 Almost there! Tell us about your setup.
//                             </Typography>
//                             <Box component="form" onSubmit={handleDetailsSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                                 <TextField 
//                                     size="small" label="Full Name" required fullWidth 
//                                     value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                                 />
//                                 <TextField 
//                                     size="small" label="Company Name" required fullWidth 
//                                     value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})}
//                                 />
//                                 <Box sx={{ display: 'flex', gap: 2 }}>
//                                     <TextField 
//                                         select size="small" label="Size" fullWidth required
//                                         value={formData.companySize} onChange={(e) => setFormData({...formData, companySize: e.target.value})}
//                                     >
//                                         <MenuItem value="1-50">1-50</MenuItem>
//                                         <MenuItem value="51-200">51-200</MenuItem>
//                                         <MenuItem value="201-1000">201-1k</MenuItem>
//                                         <MenuItem value="1000+">1k+</MenuItem>
//                                     </TextField>
//                                     <TextField 
//                                         select size="small" label="Industry" fullWidth required
//                                         value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})}
//                                     >
//                                         <MenuItem value="Fintech">Fintech</MenuItem>
//                                         <MenuItem value="SaaS">SaaS</MenuItem>
//                                         <MenuItem value="Manufacturing">Manufacturing</MenuItem>
//                                         <MenuItem value="Other">Other</MenuItem>
//                                     </TextField>
//                                 </Box>
//                                 <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: colors.accent, color: '#000', fontWeight: 700, "&:hover": { bgcolor: '#fff' } }}>
//                                     Complete Setup
//                                 </Button>
//                             </Box>
//                         </Paper>
//                     </motion.div>
//                 )}
// 
//                 {/* STEP 3: SUCCESS */}
//                 {step === 'success' && (
//                     <motion.div 
//                         key="step-success"
//                         initial={{ opacity: 0, scale: 0.95 }} 
//                         animate={{ opacity: 1, scale: 1 }}
//                     >
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: colors.successGreen, p: 2, bgcolor: alpha(colors.successGreen, 0.1), borderRadius: 3, width: 'fit-content' }}>
//                             <CheckCircle />
//                             <Box>
//                                 <Typography fontWeight={700}>Request Received</Typography>
//                                 <Typography variant="caption" sx={{ color: currentColors.textPrimary }}>
//                                     Check {formData.email} for next steps.
//                                 </Typography>
//                             </Box>
//                         </Box>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </Box>
//     );
// };
// 
// // --- MAIN PAGE ---
// 
// const OmecaLanding = () => {
//   const navigate = useNavigate();
//   const { mode } = useContext(ColorModeContext);
//   const currentColors = colors[mode];
//   const isDark = mode === "dark";
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
// 
//   // Mobile Menu State
//   const [mobileOpen, setMobileOpen] = useState(false);
// 
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
// 
//   const navItems = [
//       { label: 'Product', path: '/trust-stack' },
//       { label: 'Pricing', path: '/pricing' },
//       { label: 'Company', path: '/company' }
//   ];
// 
//   const handleNavClick = (path) => {
//       navigate(path);
//       setMobileOpen(false);
//   };
// 
//   // Drawer Content
//   const drawer = (
//     <Box sx={{ height: '100%', bgcolor: isDark ? '#0B0F17' : '#fff', color: currentColors.textPrimary }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
//             <OmecaLogo size={40} />
//             <IconButton onClick={handleDrawerToggle} sx={{ color: currentColors.textPrimary }}>
//                 <CloseIcon />
//             </IconButton>
//         </Box>
//         <List sx={{ p: 2 }}>
//             {navItems.map((item) => (
//                 <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
//                     <Button 
//                         fullWidth 
//                         onClick={() => handleNavClick(item.path)}
//                         sx={{ 
//                             justifyContent: 'flex-start', 
//                             py: 2, 
//                             color: currentColors.textPrimary,
//                             fontSize: '1.1rem',
//                             fontWeight: 600
//                         }}
//                     >
//                         {item.label}
//                     </Button>
//                 </ListItem>
//             ))}
//             <Box sx={{ mt: 3, px: 1 }}>
//                 <Button 
//                     fullWidth 
//                     variant="outlined" 
//                     onClick={() => handleNavClick('/partner-login')}
//                     sx={{ 
//                         borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', 
//                         color: currentColors.textPrimary, 
//                         py: 1.5,
//                         borderRadius: 2
//                     }}
//                 >
//                     Partner Login
//                 </Button>
//             </Box>
//         </List>
//     </Box>
//   );
// 
//   return (
//     <Box sx={{ bgcolor: currentColors.bgTop, color: currentColors.textPrimary, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
//       <NoiseOverlay />
//       <GridBackground isDark={isDark} />
//       
//       {/* NAV */}
//       <AppBar position="fixed" elevation={0} sx={{ bgcolor: isDark ? "rgba(11,15,23,0.7)" : "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, zIndex: 1200 }}>
//         <Toolbar sx={{ justifyContent: "space-between", height: 72 }}>
//           <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", opacity: 0.9, "&:hover": { opacity: 1 } }} onClick={() => navigate("/")}><OmecaLogo size={98} /></Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//             
//             {/* Desktop Menu */}
//             <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
//               {navItems.map((item) => (
//                 <Button 
//                     key={item.label} 
//                     onClick={() => navigate(item.path)} 
//                     sx={{ color: currentColors.textDim, fontWeight: 500, "&:hover": { color: currentColors.textPrimary, bgcolor: 'transparent' } }}
//                 >
//                     {item.label}
//                 </Button>
//               ))}
//             </Box>
//             
//             <ThemeToggleButton />
//             
//             {/* Desktop Partner Login */}
//             <Button 
//                 variant="outlined" 
//                 size="small" 
//                 sx={{ 
//                     borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', 
//                     color: currentColors.textPrimary, 
//                     borderRadius: 50, 
//                     textTransform: 'none', 
//                     px: 2.5, 
//                     display: { xs: "none", sm: "flex" }, 
//                     "&:hover": { borderColor: colors.accent, bgcolor: 'transparent' } 
//                 }} 
//                 onClick={() => navigate("/partner-login")} // WIRED UP
//             >
//                 Partner Login
//             </Button>
// 
//             {/* Mobile Menu Icon (Now Wired) */}
//             <IconButton 
//                 onClick={handleDrawerToggle}
//                 sx={{ display: { xs: "flex", md: "none" }, color: currentColors.textPrimary }}
//             >
//                 <MenuIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
// 
//       {/* MOBILE DRAWER */}
//       <Drawer
//         variant="temporary"
//         anchor="top"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }} 
//         sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', maxHeight: '60vh', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
//         }}
//       >
//         {drawer}
//       </Drawer>
//       
//       {/* HERO */}
//       <Box sx={{ pt: { xs: 14, md: 18 }, position: 'relative', zIndex: 1 }}>
//         <Box sx={{ position: 'relative', pb: { xs: 10, md: 16 } }}>
//           <Container maxWidth="xl" sx={{ maxWidth: "1400px", px: { xs: 3, md: 6 }, position: 'relative' }}>
//             <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">
//               
//               {/* HERO TEXT */}
//               <Grid item xs={12} md={6}>
//                 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
//                   <Chip label="Backed by NVIDIA Inception & Google Cloud" icon={<Bolt style={{ color: colors.accent, fontSize: 16 }} />} sx={{ mb: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: currentColors.textDim, fontWeight: 600 }} />
//                   <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: "3rem", md: "4.8rem" }, letterSpacing: "-0.03em", lineHeight: 1.1, mb: 3, background: isDark ? `linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)` : `linear-gradient(180deg, #000 0%, rgba(0,0,0,0.7) 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                     The Autonomous <br />
//                     <Box component="span" sx={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Financial Core.</Box>
//                   </Typography>
//                   <Typography variant="h6" sx={{ color: currentColors.textDim, mb: 5, maxWidth: 580, lineHeight: 1.6, fontWeight: 400 }}>
//                     Transforming ERPs from passive record-keeping to continuous, autonomous control. Unify operational truth, real-time close, and verifiable intelligence.
//                   </Typography>
// 
//                   {/* REPLACED WITH NEW FLOW */}
//                   <PilotRequestFlow />
//                   
//                   {/* MARQUEE */}
//                   <Box sx={{ mt: 8, opacity: 0.7, maxWidth: 500, overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
//                     <Typography variant="caption" sx={{ color: currentColors.textDim, fontWeight: 700, mb: 1.5, display: 'block', fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase' }}>
//                         INTEGRATES WITH
//                     </Typography>
//                     <motion.div
//                         animate={{ x: ["0%", "-50%"] }}
//                         transition={{ duration: 20, ease: "linear", repeat: Infinity }}
//                         style={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap' }}
//                     >
//                         {['Brex', 'Netsuite', 'Slack', 'Snowflake', 'Brex', 'Netsuite', 'Slack', 'Snowflake'].map((brand, i) => (
//                             <Typography key={i} variant="body2" sx={{ fontWeight: 700, color: currentColors.textDim, fontFamily: 'monospace', fontSize: '0.9rem' }}>{brand}</Typography>
//                         ))}
//                     </motion.div>
//                   </Box>
// 
//                 </motion.div>
//               </Grid>
// 
//               {/* RIGHT SIDE: LIVE DATA CARDS */}
//               <Grid item xs={12} md={6}>
//                 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
//                     <LivePreviewPanel onExplore={() => navigate("/trust-stack")} />
//                 </motion.div>
//               </Grid>
// 
//             </Grid>
//           </Container>
//         </Box>
// 
//         <Container maxWidth="xl" sx={{ maxWidth: "1400px" }}><Box sx={{ borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} /></Container>
//         <Box sx={{ position: 'relative' }}><Container maxWidth="xl" sx={{ maxWidth: "1600px", py: { xs: 8, md: 12 } }}><OmecaProblemSolutionComparison /></Container></Box>
//         <Box sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderY: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}><Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaTrustStack /></Container></Box>
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaDeveloperIntegration navigate={navigate} /></Container>
//         <Box sx={{ bgcolor: isDark ? currentColors.bgTop : "#fff" }}><Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><OmecaSupportedIntegrations /></Container></Box>
//       </Box>
//       <OmecaAppFooter />
//     </Box>
//   );
// };
// 
// export default OmecaLanding;

import React, { useState, useContext, useEffect, useRef } from "react";
import {
  AppBar, Toolbar, Box, Container, Typography, Button, IconButton, Grid, Chip, Paper, alpha,
  Drawer, List, ListItem, useMediaQuery, InputBase
} from "@mui/material";
import { 
    Menu as MenuIcon, Bolt, ArrowForward, VerifiedUser, Close as CloseIcon 
} from "@mui/icons-material";
import { motion, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";

// --- THEME & UI ---
import { colors } from "./shared/layouts/theme/theme.js";
import { ColorModeContext } from "./shared/layouts/theme/ThemeContext.jsx";
import ThemeToggleButton from "./shared/layouts/ThemeToggleButton.jsx";
import OmecaAppFooter from "./shared/ui/AppFooter.jsx";
import OmecaLogo from "./shared/ui/OmecaLogo.jsx";

// --- SECTIONS ---
// Removed unnecessary PilotRequestFlow component import
import OmecaProblemSolutionComparison from "./omeca-governance/components/sections/ProblemSolutionComparison.jsx";
import OmecaTrustStack from "./omeca-governance/components/sections/TrustStack.jsx";
import OmecaDeveloperIntegration from "./omeca-governance/components/sections/DeveloperIntegration.jsx";
import OmecaSupportedIntegrations from "./omeca-governance/components/sections/SupportedIntegrations.jsx";

// --- VISUAL ASSETS ---
const NoiseOverlay = () => (
  <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10000, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
);

const GridBackground = ({ isDark }) => (
  <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", overflow: "hidden", zIndex: 0, maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}>
    <Box sx={{ width: "100%", height: "100%", backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
  </Box>
);

// --- ANIMATED COUNTER ---
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

// --- HERO METRIC CARD ---
const HeroMetricCard = ({ label, sublabel, metric, color, icon: Icon }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";

  return (
    <Paper elevation={0} sx={{ p: 3, height: '100%', borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`, boxShadow: isDark ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle, ${alpha(color, 0.15)} 0%, transparent 70%)`, zIndex: 0 }} />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block' }}>{label}</Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>{sublabel}</Typography>
            </Box>
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

// --- LIVE PREVIEW PANEL ---
const LivePreviewPanel = ({ onExplore }) => {
  const [data, setData] = useState({ control: 98.4, recon: 88.2, evidence: 100, isConnected: false, isSimulated: false });

  useEffect(() => {
    let isMounted = true;
    const fetchOrSimulate = async () => {
      // Mock simulation logic for MVP
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
  
  // Mobile Menu State
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const navItems = [{ label: 'Product', path: '/trust-stack' }, { label: 'Pricing', path: '/pricing' }, { label: 'Company', path: '/company' }];
  const handleNavClick = (path) => { navigate(path); setMobileOpen(false); };

  // REUSE: Redirect to Partner Login for the actual flow
  const handleStartFlow = (e) => {
    e.preventDefault();
    // Navigate to the main Auth component, passing the email and intent
    navigate('/partner-login', { state: { email: email, isSignup: true } });
  };

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
                    <Button fullWidth onClick={() => handleNavClick(item.path)} sx={{ justifyContent: 'flex-start', py: 2, color: currentColors.textPrimary, fontSize: '1.1rem', fontWeight: 600 }}>{item.label}</Button>
                </ListItem>
            ))}
            <Box sx={{ mt: 3, px: 1 }}>
                <Button fullWidth variant="outlined" onClick={() => handleNavClick('/partner-login')} sx={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: currentColors.textPrimary, py: 1.5, borderRadius: 2 }}>Partner Login</Button>
            </Box>
        </List>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: currentColors.bgTop, color: currentColors.textPrimary, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <NoiseOverlay /><GridBackground isDark={isDark} />
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: isDark ? "rgba(11,15,23,0.7)" : "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, zIndex: 1200 }}>
        <Toolbar sx={{ justifyContent: "space-between", height: 72 }}>
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", opacity: 0.9, "&:hover": { opacity: 1 } }} onClick={() => navigate("/")}><OmecaLogo size={98} /></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navItems.map((item) => <Button key={item.label} onClick={() => navigate(item.path)} sx={{ color: currentColors.textDim, fontWeight: 500, "&:hover": { color: currentColors.textPrimary, bgcolor: 'transparent' } }}>{item.label}</Button>)}
            </Box>
            <ThemeToggleButton />
            <Button variant="outlined" size="small" sx={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', color: currentColors.textPrimary, borderRadius: 50, textTransform: 'none', px: 2.5, display: { xs: "none", sm: "flex" }, "&:hover": { borderColor: colors.accent, bgcolor: 'transparent' } }} onClick={() => navigate("/partner-login")}>Partner Login</Button>
            <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: "flex", md: "none" }, color: currentColors.textPrimary }}><MenuIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" anchor="top" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', maxHeight: '60vh', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 } }}>{drawer}</Drawer>
      
      <Box sx={{ pt: { xs: 14, md: 18 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ position: 'relative', pb: { xs: 10, md: 16 } }}>
          <Container maxWidth="xl" sx={{ maxWidth: "1400px", px: { xs: 3, md: 6 }, position: 'relative' }}>
            <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                  <Chip label="Backed by NVIDIA Inception & Google Cloud" icon={<Bolt style={{ color: colors.accent, fontSize: 16 }} />} sx={{ mb: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: currentColors.textDim, fontWeight: 600 }} />
                  <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: "3rem", md: "4.8rem" }, letterSpacing: "-0.03em", lineHeight: 1.1, mb: 3, background: isDark ? `linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)` : `linear-gradient(180deg, #000 0%, rgba(0,0,0,0.7) 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>The Autonomous <br /><Box component="span" sx={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.lucraGold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Financial Core.</Box></Typography>
                  <Typography variant="h6" sx={{ color: currentColors.textDim, mb: 5, maxWidth: 580, lineHeight: 1.6, fontWeight: 400 }}>Transforming ERPs from passive record-keeping to continuous, autonomous control. Unify operational truth, real-time close, and verifiable intelligence.</Typography>
                  
                  {/* INLINE EMAIL CAPTURE (Decoupled & Reusable) */}
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
                  <Typography variant="caption" sx={{ display: 'block', mt: 1.5, ml: 2, color: currentColors.textDim }}>Start your free pilot. No credit card required.</Typography>

                  <Box sx={{ mt: 8, opacity: 0.7, maxWidth: 500, overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
                    <Typography variant="caption" sx={{ color: currentColors.textDim, fontWeight: 700, mb: 1.5, display: 'block', fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase' }}>INTEGRATES WITH</Typography>
                    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} style={{ display: 'flex', gap: '2rem', whiteSpace: 'nowrap' }}>{['Brex', 'Netsuite', 'Slack', 'Snowflake', 'Brex', 'Netsuite', 'Slack', 'Snowflake'].map((brand, i) => <Typography key={i} variant="body2" sx={{ fontWeight: 700, color: currentColors.textDim, fontFamily: 'monospace', fontSize: '0.9rem' }}>{brand}</Typography>)}</motion.div>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}><motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}><LivePreviewPanel onExplore={() => navigate("/trust-stack")} /></motion.div></Grid>
            </Grid>
          </Container>
        </Box>
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