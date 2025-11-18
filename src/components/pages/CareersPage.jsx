// src/components/pages/CareersPage.jsx

import React, { useContext } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import TrendingUp from '@mui/icons-material/TrendingUp';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';

import { ColorModeContext } from "../../layouts/theme/ThemeContext.jsx"; 
import { colors } from "../../layouts/theme/theme.js"; 

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

const OmecaCareersPage = ({ setPage }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];

    const positions = [
        { title: "Senior Backend Engineer Go or Rust", dept: "Engineering", focus: "Building the immutable ledger and continuous close engine" },
        { title: "Financial Data Scientist", dept: "Data and AI", focus: "Designing real time margin intelligence and cognitive risk models" },
        { title: "VP of Product Marketing", dept: "Marketing", focus: "Positioning the first self driving cognitive ERP in the market" }
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
                    Careers
                </Typography>

                <Typography
                    variant="h6"
                    color={currentColors.textDim}
                    sx={{ mb: 6 }}
                >
                    Join us as we rebuild the foundation of enterprise systems with a self driving ERP that unifies operational truth, real time finance, and verifiable trust.
                </Typography>
            </motion.div>

            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                {positions.map((job, index) => (
                    <Paper
                        key={index}
                        sx={{
                            p: 3,
                            mb: 3,
                            bgcolor: currentColors.card,
                            border: `1px solid ${currentColors.textDim}22`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={700}
                                color={currentColors.textPrimary}
                            >
                                {job.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color={colors.accent}
                                sx={{ mt: 0.5 }}
                            >
                                {job.dept} · {job.focus}
                            </Typography>
                        </Box>

                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                color: colors.lucraGold,
                                borderColor: colors.lucraGold
                            }}
                            onClick={() => setPage('contact')}
                        >
                            Apply
                        </Button>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
};

export default OmecaCareersPage;

