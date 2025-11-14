import React, { useContext } from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import TrendingUp from '@mui/icons-material/TrendingUp';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
// import { ColorModeContext } from '../theme/ThemeContext';
// import { colors } from '../theme/theme';
// Corrects the path to the theme files by going up one level, then down into /components/

import { ColorModeContext } from '../components/theme/ThemeContext.js'; 
import { colors } from '../components/theme/theme.js'; 

const BackButton = ({ setPage, currentColors }) => (
    <Button
        startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
        onClick={() => setPage('home')}
        sx={{ mt: 4, mb: 2, color: currentColors.textDim, textTransform: 'none', '&:hover': { color: colors.accent } }}
    >
        Back to Home
    </Button>
);

const CareersPage = ({ setPage }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];

    const positions = [
        { title: "Senior Backend Engineer (Go/Rust)", dept: "Engineering", focus: "Building the immutable ledger and reconciliation core." },
        { title: "Financial Data Scientist", dept: "Data & AI", focus: "Developing predictive margin alert models and risk scoring." },
        { title: "VP of Product Marketing", dept: "Marketing", focus: "Driving GTM strategy for our core ERP and API products." },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <BackButton setPage={setPage} currentColors={currentColors} />
                <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
                    Careers: Build the Future of Finance
                </Typography>
                <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
                    We are looking for builders who thrive at the intersection of AI, finance, and engineering excellence.
                </Typography>
            </motion.div>
            
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                {positions.map((job, index) => (
                    <Paper key={index} sx={{ p: 3, mb: 3, bgcolor: currentColors.card, border: `1px solid ${currentColors.textDim}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>{job.title}</Typography>
                            <Typography variant="body2" color={colors.accent} sx={{ mt: 0.5 }}>{job.dept} &middot; {job.focus}</Typography>
                        </Box>
                        <Button variant="outlined" size="small" sx={{ color: colors.lucraGold, borderColor: colors.lucraGold }} onClick={() => setPage('contact')}>Apply</Button>
                    </Paper>
                ))}
            </Box>

        </Container>
    );
};

export default CareersPage;