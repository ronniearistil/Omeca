// src/components/pages/CareersPage.jsx

import React, { useContext } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Stack 
} from '@mui/material';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useNavigate } from "react-router-dom";

// Icons
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import WorkOutlineRounded from "@mui/icons-material/WorkOutlineRounded";

import { ColorModeContext } from "../shared/layouts/theme/ThemeContext.jsx"; 
import { colors } from "../shared/layouts/theme/theme.js"; 

// --- BACKGROUNDS ---
const NoiseOverlay = () => (
  <Box
    sx={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0, opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const GridBackground = ({ isDark }) => (
  <Box
    sx={{
      position: "absolute", top: 0, left: 0, right: 0, height: "100%",
      overflow: "hidden", zIndex: 0,
      maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
    }}
  >
    <Box
      sx={{
        width: "100%", height: "100%",
        backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
        linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </Box>
);

// --- JOB CARD COMPONENT ---
const JobCard = ({ job, delay = 0, onClick }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  const palette = colors[mode];
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      style={{ width: '100%', position: 'relative' }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          border: '1px solid',
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          bgcolor: isDark ? "rgba(15,15,20,0.6)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(20px)",
          transition: 'transform 0.2s, border-color 0.2s',
          overflow: 'hidden',
          '&:hover': {
             transform: 'translateY(-2px)',
             borderColor: colors.accent,
             '& .apply-btn': {
                bgcolor: colors.accent,
                color: '#000',
                borderColor: colors.accent
             }
          }
        }}
      >
        {/* Spotlight Effect */}
        <motion.div
          style={{
            pointerEvents: "none",
            position: "absolute", inset: 0, zIndex: 1,
            background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}, transparent 80%)`,
          }}
        />

        {/* Content */}
        <Box sx={{ p: { xs: 3, md: 4 }, position: "relative", zIndex: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
            
            {/* Left Info */}
            <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                    <Box sx={{ color: colors.accent, display: 'flex' }}>
                        <WorkOutlineRounded fontSize="small" />
                    </Box>
                    <Typography variant="h6" fontWeight={700} color={palette.textPrimary}>
                        {job.title}
                    </Typography>
                </Stack>
                
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <Chip 
                        label={job.dept} 
                        size="small" 
                        sx={{ 
                            height: 20, 
                            fontSize: '0.65rem', 
                            fontWeight: 700,
                            bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            color: palette.textPrimary
                        }} 
                    />
                    <Typography variant="body2" color={palette.textDim} sx={{ fontSize: '0.85rem' }}>
                         • {job.focus}
                    </Typography>
                </Stack>
            </Box>

            {/* Right Action */}
            <Button
                className="apply-btn"
                variant="outlined"
                endIcon={<ArrowForwardRounded />}
                onClick={onClick}
                sx={{
                    borderRadius: 50,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                    color: palette.textPrimary,
                    transition: 'all 0.3s ease',
                    minWidth: { xs: '100%', md: 'auto' }
                }}
            >
                Apply Now
            </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

const OmecaCareersPage = () => {
    const navigate = useNavigate();
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === 'dark';
    const currentColors = colors[mode];

    const positions = [
        { title: "Senior Backend Engineer (Go/Rust)", dept: "Engineering", focus: "Immutable Ledger" },
        { title: "Financial Data Scientist", dept: "Data & AI", focus: "Risk Models" },
        { title: "VP of Product Marketing", dept: "Marketing", focus: "GTM Strategy" },
        { title: "Enterprise Account Executive", dept: "Sales", focus: "Strategic Accounts" }
    ];

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            bgcolor: currentColors.bgTop, 
            pt: { xs: 10, md: 10 }, 
            pb: 12,
            position: 'relative',
            overflowX: 'hidden'
        }}>
            <NoiseOverlay />
            <GridBackground isDark={isDark} />

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 6, lg: 10 } }}>
                
                {/* BACK BUTTON */}
                <Box sx={{ mb: 6 }}>
                    <Button
                        startIcon={<ArrowBackRounded />}
                        onClick={() => navigate('/')}
                        sx={{
                            color: currentColors.textDim,
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 50,
                            px: 0,
                            '&:hover': { bgcolor: 'transparent', color: currentColors.textPrimary },
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>

                {/* HERO SECTION */}
                <Box sx={{ 
                    textAlign: 'center', 
                    mb: 10, 
                    mx: 'auto', 
                    maxWidth: 800 
                }}>
                    <Chip 
                        label="OPEN ROLES" 
                        size="small"
                        sx={{ 
                            mb: 2, fontWeight: 700, fontSize: "0.65rem", letterSpacing: 1,
                            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                            color: currentColors.textDim, 
                        }} 
                    />
                    <Typography variant="h2" fontWeight={800} sx={{ 
                        fontSize: { xs: "2.5rem", md: "3.5rem" }, 
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        mb: 2,
                        color: currentColors.textPrimary
                    }}>
                        Build the <span style={{ color: colors.accent }}>Future.</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: currentColors.textDim, fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Join us as we rebuild the foundation of enterprise systems with a self-driving ERP that unifies operational truth.
                    </Typography>
                </Box>

                {/* JOBS LIST */}
                <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                    <Stack spacing={3}>
                        {positions.map((job, index) => (
                            <JobCard 
                                key={index} 
                                job={job} 
                                delay={index * 0.1}
                                onClick={() => navigate("/contact")}
                            />
                        ))}
                    </Stack>
                </Box>

            </Container>
        </Box>
    );
};

export default OmecaCareersPage;


