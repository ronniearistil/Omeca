// src/components/pages/CompanyInfoPage.jsx

import React, { useContext } from "react";
import { 
  Container, 
  Box, 
  Grid, 
  Typography, 
  Button, 
  Chip,
  Paper 
} from "@mui/material";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useNavigate } from 'react-router-dom';

// Icons
import PolicyRounded from "@mui/icons-material/PolicyRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

import { ColorModeContext } from "../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../shared/layouts/theme/theme.js";

// --- BACKGROUNDS (From Pricing Component) ---
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

// --- CARD COMPONENT (Adapted style from PricingCard) ---
const InfoCard = ({ children, delay = 0 }) => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      style={{ height: '100%', width: '100%', position: 'relative' }}
    >
      <Box
        sx={{
          height: '100%',
          position: 'relative',
          borderRadius: 4,
          border: '1px solid',
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          bgcolor: isDark ? "rgba(15,15,20,0.8)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          transition: 'transform 0.2s',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          '&:hover': {
             transform: 'translateY(-4px)',
             borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
          }
        }}
      >
        <motion.div
          style={{
            pointerEvents: "none",
            position: "absolute", inset: 0, zIndex: 1,
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}, transparent 80%)`,
          }}
        />
        <Box sx={{ p: { xs: 3, md: 4 }, position: "relative", zIndex: 2, height: "100%" }}>
          {children}
        </Box>
      </Box>
    </motion.div>
  );
};

const OmecaCompanyInfoPage = () => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  const palette = colors[mode];
  // Assuming you want the same navigation behavior
  const navigate = useNavigate(); 

  const sections = [
    {
      title: "Our Mission",
      content:
        "We are rebuilding the ERP from the ground up. Our mission is to create a self-driving financial system that unifies operational truth, automates the close, and delivers verifiable intelligence for every decision.",
      icon: <PolicyRounded />,
    },
    {
      title: "The Problem We Saw",
      content:
        "Legacy ERPs were designed for a world of manual inputs and monthly batches. They cannot interpret autonomous activity or keep pace with systems that operate continuously. This creates a widening trust gap between what the business is doing and what finance can verify.",
      icon: <PolicyRounded />,
    },
    {
      title: "Why We Built Omeca",
      content:
        "Omeca is the first Cognitive ERP. It captures live operational signals, maintains a continuously reconciled close, and generates verifiable proof for every action taken across the business. One system of truth, one continuous financial heartbeat.",
      icon: <PolicyRounded />,
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: palette.bgTop, 
      pt: { xs: 4, md: 5 }, 
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
            onClick={() => navigate('/')} // Or wherever your back button goes
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

        {/* HERO SECTION (Centered to match Pricing) */}
        <Box sx={{ 
            textAlign: 'center', 
            mb: 10, 
            mx: 'auto', 
            maxWidth: 800 
        }}>
          <Chip 
            label="COMPANY INFO" 
            size="small"
            sx={{ 
              mb: 2, fontWeight: 700, fontSize: "0.65rem", letterSpacing: 1,
              bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
              color: palette.textDim, 
            }} 
          />
          <Typography variant="h2" fontWeight={800} sx={{ 
            fontSize: { xs: "2.5rem", md: "3.5rem" }, 
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            mb: 2,
            color: palette.textPrimary
          }}>
            The Omeca Story
          </Typography>
          <Typography variant="body1" sx={{ color: palette.textDim, fontSize: '1.1rem', lineHeight: 1.6 }}>
            We are defining the next generation of enterprise finance with the
            self-driving Cognitive ERP.
          </Typography>
        </Box>

        {/* GRID SECTION */}
        <Container maxWidth="lg" disableGutters>
          <Grid container spacing={4} alignItems="stretch">
            {sections.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <InfoCard delay={index * 0.1}>
                  
                  <Box sx={{ 
                    mb: 2, 
                    color: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                      {/* Cloning the icon to increase size if needed, or just rendering it */}
                      {React.cloneElement(item.icon, { fontSize: "large" })}
                  </Box>

                  <Typography
                    variant="h5" // Increased from h6 to match pricing visual weight
                    fontWeight={700}
                    color={palette.textPrimary}
                    sx={{ mb: 2 }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color={palette.textDim}
                    sx={{ lineHeight: 1.6 }}
                  >
                    {item.content}
                  </Typography>

                </InfoCard>
              </Grid>
            ))}
          </Grid>
        </Container>

      </Container>
    </Box>
  );
};

export default OmecaCompanyInfoPage;
