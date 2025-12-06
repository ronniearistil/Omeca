import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Container, Typography, Box, Grid, Chip, Paper, Avatar, Divider, IconButton, Button } from '@mui/material';
import { motion, AnimatePresence, animate, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Architecture, Security, TrendingUp, GroupWork, LinkedIn, Twitter, ArrowBackRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// --- Theme Imports (FIXED PATHS) ---
import { ColorModeContext } from "../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../shared/layouts/theme/theme.js";

// --- Data Simulation Imports ---
import { simulateFetch } from "../shared/utils/mockFactory.js"; 
import { faker } from '@faker-js/faker';


// --- Counter Component for Live Numbers (Jitter Effect) ---
const Counter = ({ value, suffix = "", color }) => {
    const nodeRef = useRef();
    const prevValue = useRef(value);
    
    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;
        
        const controls = animate(prevValue.current, value, {
            duration: 1.5, ease: "easeOut",
            onUpdate: (v) => { 
                node.textContent = (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)); 
            },
        });
        prevValue.current = value;
        return () => controls.stop();
    }, [value, suffix]);

    return (
        <Typography component="div" variant="h4" fontWeight={900} color={color} sx={{ lineHeight: 1.2 }}>
            <span ref={nodeRef}>{value}{suffix}</span>
        </Typography>
    );
};


// --- Spotlight Card Template (Interactive Glassmorphism) ---
const SpotlightInfoCard = ({ children, color, delay = 0 }) => {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === "dark";
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            viewport={{ once: true }}
            style={{ height: "100%", cursor: 'default' }}
        >
            <Box
                sx={{
                    height: "100%",
                    position: "relative",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                    bgcolor: isDark ? "rgba(10,10,12,0.6)" : "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(12px)",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": { 
                        transform: "translateY(-4px)",
                        borderColor: `${color}40`,
                        boxShadow: `0 10px 40px -10px ${color}20`
                    }
                }}
            >
                <motion.div
                    style={{
                        pointerEvents: "none",
                        position: "absolute", inset: 0, zIndex: 1,
                        background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}10, transparent 80%)`,
                    }}
                />
                <Box sx={{ p: 4, position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                    {children}
                </Box>
            </Box>
        </motion.div>
    );
};


// --- TEAM CARD PLACEHOLDER (FINAL ALIGNMENT) ---
const TeamCard = ({ member, color }) => {
    const { mode } = useContext(ColorModeContext);
    const palette = colors[mode];

    // 🌟 FIX: Use the member's LinkedIn URL if provided, otherwise use placeholder
    const linkedinUrl = member.linkedin || "javascript:void(0)";
    const twitterUrl = member.twitter || "javascript:void(0)";


    return (
        <SpotlightInfoCard color={color}>
            <Box sx={{ 
                textAlign: 'left', 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start' 
            }}>
                <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: color, alignSelf: 'flex-start' }}> 
                    {member.initials}
                </Avatar>
                <Typography variant="h6" fontWeight={700} sx={{ color: palette.textPrimary, mb: 0.5 }}>
                    {member.name}
                </Typography>
                <Typography variant="body2" color={colors.lucraGold} mb={2} fontStyle="italic">
                    {member.title}
                </Typography>
                <Typography variant="body2" color={palette.textDim} sx={{ mb: 2, flexGrow: 1 }}>
                    {member.bio}
                </Typography>
                
                {/* Placeholder Links */}
                <Box>
                    <IconButton size="small" href={linkedinUrl} target="_blank" sx={{ color: color }}>
                        <LinkedIn fontSize="small" />
                    </IconButton>
                    <IconButton size="small" href={twitterUrl} target="_blank" sx={{ color: palette.textDim }}>
                        <Twitter fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </SpotlightInfoCard>
    );
};


// --- MAIN PAGE COMPONENT ---
const CompanyInfoPage = () => {
    const { mode } = useContext(ColorModeContext);
    const palette = colors[mode];
    const navigate = useNavigate();
    
// STATIC NARRATIVE CONTENT (Aligned with new messaging)
const staticNarrative = {
    mission: 
        "We are building the Financial Core for modern enterprises. Our mission is to capture live operational activity the moment it happens, maintain trusted financial truth for every transaction, and give teams continuous control without manual work or reconciliation cycles.",

    problem: 
        "Finance relies on systems that record activity only after the fact. They do not validate events at the moment they occur and cannot keep the ledger aligned with live operations. This creates a persistent gap between what happens in the business and what finance can confirm.",

    vision: 
        "Omeca provides one Financial Core that captures every trusted operational signal, keeps the ledger continuously reconciled, and produces verifiable truth for decisions, financial processes, and automated activity across the enterprise."
};
    
    // LIVE METRICS (Locked In)
    const [metricsData, setMetricsData] = useState({
        integrityRate: 98.4,    
        autonomyRate: 88.5,     
        dataSources: 18,
        funding: 5.0
    });
    const [loading, setLoading] = useState(true);

    const simulateLiveMetrics = useCallback(() => {
        setMetricsData(prev => ({
            ...prev,
            integrityRate: Math.min(99.9, Math.max(98.0, prev.integrityRate + (faker.number.float({ min: -0.1, max: 0.1, precision: 0.1 })))),
            autonomyRate: Math.min(92.0, Math.max(85.0, prev.autonomyRate + (faker.number.float({ min: -0.5, max: 0.5, precision: 0.1 })))),
        }));
    }, []);

    useEffect(() => {
        const initialLoad = async () => {
            await simulateFetch(null, 500); 
            setLoading(false);
        };
        initialLoad();

        const interval = setInterval(simulateLiveMetrics, 2000); 
        return () => clearInterval(interval);
    }, [simulateLiveMetrics]);
    
    // 🌟 FIX: INTEGRATING REAL LINKEDIN URL & PLACEHOLDERS 🌟
    const teamPlaceholder = [
        { 
            name: 'Pony Aristil, MBA, PMP', 
            initials: 'PA', 
            title: 'Founder & CEO (Enterprise Control & Automation Systems)', 
            bio: 'Enterprise Systems Program Manager | Bridging Finance Operations and Engineering | ERP Integration', 
            color: colors.accent,
            linkedin: 'https://www.linkedin.com/in/aristil-mba-pmp/', // 👈 REAL LINK
            twitter: 'javascript:void(0)'
        },
        // { name: 'M. Chen', initials: 'MC', title: 'Head of Engineering (System Trust)', bio: 'Expert in high-volume ingestion engines and cryptographic ledger integrity.', color: colors.lucraGold },
        // { name: 'S. Rodriguez', initials: 'SR', title: 'Head of Product (Enterprise Finance)', bio: 'Former CFO/Controller with deep experience in GAAP compliance and autonomous close.', color: colors.successGreen },
    ];


    if (loading) {
        return <Container maxWidth="lg" sx={{ py: 12 }}><Typography variant="h4" color="text.secondary">Connecting to Omeca Core...</Typography></Container>;
    }

    return (
        <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: palette.bgTop, minHeight: '100vh', textAlign: 'center' }}>
            <Container maxWidth="lg">
                
                {/* FIX: BACK BUTTON */}
                <Box sx={{ mb: 6, textAlign: 'left' }}>
                    <Button
                        startIcon={<ArrowBackRounded />}
                        onClick={() => navigate('/')} 
                        sx={{
                            color: palette.textDim,
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 50,
                            px: 0,
                            '&:hover': { bgcolor: 'transparent', color: palette.textPrimary },
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>

                {/* --- HEADER --- */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Chip 
                        label="OUR THESIS" 
                        sx={{ 
                            mb: 2, fontWeight: 800, fontSize: "0.7rem", letterSpacing: 1.5,
                            bgcolor: `${colors.accent}15`, color: colors.accent, 
                            border: `1px solid ${colors.accent}30`
                        }} 
                    />
                    <Typography variant="h2" fontWeight={900} sx={{ 
                        fontSize: { xs: "2.5rem", md: "3.5rem" }, 
                        letterSpacing: "-0.02em",
                        color: palette.textPrimary,
                        mb: 4
                    }}>
                        The Next Era of Finance is <span style={{ color: colors.lucraGold }}>Autonomous.</span>
                    </Typography>
                </motion.div>
                
                {/* --- MISSION, VISION, PROBLEM (Interactive Blocks) --- */}
                <Grid container spacing={4} sx={{ mb: 10 }}>
                    {/* MISSION */}
                    <Grid item xs={12} md={4}>
                        <SpotlightInfoCard color={colors.accent}>
                            <Typography variant="h5" fontWeight={700} mb={1} color={colors.accent} sx={{ textAlign: 'left' }}>
                                Our Mission
                            </Typography>
                            <Typography variant="body1" color={palette.textPrimary} sx={{ textAlign: 'left' }}>
                                {staticNarrative.mission}
                            </Typography>
                        </SpotlightInfoCard>
                    </Grid>
                    {/* PROBLEM */}
                    <Grid item xs={12} md={4}>
                        <SpotlightInfoCard color={colors.errorRed}>
                            <Typography variant="h5" fontWeight={700} mb={1} color={colors.errorRed} sx={{ textAlign: 'left' }}>
                                The Core Problem
                            </Typography>
                            <Typography variant="body1" color={palette.textPrimary} sx={{ textAlign: 'left' }}>
                                {staticNarrative.problem}
                            </Typography>
                        </SpotlightInfoCard>
                    </Grid>
                    {/* VISION */}
                    <Grid item xs={12} md={4}>
                        <SpotlightInfoCard color={colors.successGreen}>
                            <Typography variant="h5" fontWeight={700} mb={1} color={colors.successGreen} sx={{ textAlign: 'left' }}>
                                The Omeca Vision
                            </Typography>
                            <Typography variant="body1" color={palette.textPrimary} sx={{ textAlign: 'left' }}>
                                {staticNarrative.vision}
                            </Typography>
                        </SpotlightInfoCard>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 8, borderColor: palette.divider }} />

                {/* --- KEY ENGINEERING METRICS (Left-Aligned Header) --- */}
                <Box sx={{ mb: 10 }}>
                    <Box sx={{ textAlign: 'left', mb: 6 }}>
                        <Typography variant="h4" fontWeight={800} sx={{ color: palette.textPrimary, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
                            Key Engineering Metrics
                        </Typography>
                        <Typography variant="body1" color={palette.textDim}>
                            Key Engineering Metrics  
Live telemetry that reflects verification throughput and continuous reconciliation performance.

                        </Typography>
                    </Box>
                    {/* Metric Cards (Kept Dynamic) */}
                    <Grid container spacing={4} sx={{ textAlign: 'left' }}>
                        {/* Metric 1: L1 Integrity Rate */}
                        <Grid item xs={12} sm={6} md={3}>
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                                <Box sx={{ p: 2, bgcolor: palette.card, borderRadius: 4, border: `1px solid ${colors.accent}40`}}>
                                    <Architecture sx={{ fontSize: 36, color: colors.accent, mb: 1.5 }} />
                                    <Counter value={metricsData.integrityRate} suffix={'%'} color={colors.accent} />
                                    <Typography variant="body2" color={palette.textSecondary}>L1 Data Integrity Score</Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                        {/* Metric 2: L2 Autonomy Rate */}
                        <Grid item xs={12} sm={6} md={3}>
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                                <Box sx={{ p: 2, bgcolor: palette.card, borderRadius: 4, border: `1px solid ${colors.successGreen}40`}}>
                                    <TrendingUp sx={{ fontSize: 36, color: colors.successGreen, mb: 1.5 }} />
                                    <Counter value={metricsData.autonomyRate} suffix={'%'} color={colors.successGreen} />
                                    <Typography variant="body2" color={palette.textSecondary}>L2 Autonomous Close Rate</Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                        {/* Metric 3: Data Sources Integrated */}
                        <Grid item xs={12} sm={6} md={3}>
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
                                <Box sx={{ p: 2, bgcolor: palette.card, borderRadius: 4, border: `1px solid ${colors.lucraGold}40`}}>
                                    <GroupWork sx={{ fontSize: 36, color: colors.lucraGold, mb: 1.5 }} />
                                    <Typography variant="h4" fontWeight={900} color={colors.lucraGold} sx={{ lineHeight: 1.2 }}>{metricsData.dataSources}+</Typography>
                                    <Typography variant="body2" color={palette.textSecondary}>Enterprise Data Sources</Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                        {/* Metric 4: Funding */}
                        <Grid item xs={12} sm={6} md={3}>
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}>
                                <Box sx={{ p: 2, bgcolor: palette.card, borderRadius: 4, border: `1px solid ${colors.logoDark}40`}}>
                                    <Security sx={{ fontSize: 36, color: colors.logoDark, mb: 1.5 }} />
                                    <Typography variant="h4" fontWeight={900} color={palette.textPrimary} sx={{ lineHeight: 1.2 }}>${metricsData.funding}M</Typography>
                                    <Typography variant="body2" color={palette.textSecondary}>Committed Capital (Seed)</Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 8, borderColor: palette.divider }} />


                {/* --- FOUNDING TEAM SECTION (Side-by-Side Cards) --- */}
                <Box>
                    <Typography variant="h4" fontWeight={800} mb={6} sx={{ color: palette.textPrimary, textAlign: 'left' }}>
                        Founding Team (Architecture & Finance)
                    </Typography>
                    <Grid container spacing={4}>
                        {teamPlaceholder.map((member, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                                    <TeamCard member={member} color={member.color} />
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Container>
        </Box>
    );
};

export default CompanyInfoPage;