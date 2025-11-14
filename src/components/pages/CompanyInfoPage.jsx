import React, { useContext } from 'react';
import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
// import { ColorModeContext } from '../theme/ThemeContext';
// import { colors } from '../theme/theme';
// Corrects the path to the theme files by going up one level, then down into /components/
import { ColorModeContext } from '../components/theme/ThemeContext.js'; 
import { colors } from '../components/theme/theme.js'; 

const BackButton = ({ setPage, currentColors }) => (
  <Button
    startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
    onClick={() => setPage('home')}
    sx={{
      mt: 4,
      mb: 2,
      color: currentColors.textDim,
      textTransform: 'none',
      '&:hover': { color: colors.accent }
    }}
  >
    Back to Home
  </Button>
);

const CompanyInfoPage = ({ setPage }) => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  const sections = [
    {
      title: "Our Mission",
      content:
        "Melucra is the AI-native ERP for Agent Capital. Our mission is to give enterprises real-time foresight into costs, utilization, and growth — helping them turn machine work into strategic advantage.",
      icon: <PolicyRoundedIcon />
    },
    {
      title: "Our Story",
      content:
        "Founded in 2023, Melucra was born from the recognition that traditional ERPs were designed for people and static processes, not for AI agents and machine-driven operations. We set out to build the financial core for the machine economy.",
      icon: <PolicyRoundedIcon />
    },
    {
      title: "Why AI-Native ERP?",
      content:
        "Legacy platforms cannot keep pace with the scale, speed, and complexity of agent-driven work. Melucra unifies every machine event into an intelligent financial system — enabling enterprises to control costs, optimize utilization, and unlock growth at scale.",
      icon: <PolicyRoundedIcon />
    }
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton setPage={setPage} currentColors={currentColors} />
        <Typography
          variant="h3"
          fontWeight={900}
          color={currentColors.textPrimary}
          sx={{ mb: 2 }}
        >
          The Melucra Story
        </Typography>
        <Typography
          variant="h6"
          color={currentColors.textDim}
          sx={{ mb: 6 }}
        >
          We are defining the financial operating system for the machine economy.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {sections.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                bgcolor: currentColors.card,
                height: '100%',
                borderTop: `4px solid ${colors.lucraGold}`
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color={currentColors.textPrimary}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                color={currentColors.textDim}
                sx={{ mt: 1 }}
              >
                {item.content}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyInfoPage;

