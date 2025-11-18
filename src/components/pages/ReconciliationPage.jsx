// import React, { useContext } from 'react';
// import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
// import SyncAltRounded from '@mui/icons-material/SyncAltRounded';
// import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
// // import { ColorModeContext } from '../theme/ThemeContext';
// // import { colors } from '../theme/theme';
// import { ColorModeContext } from '../components/theme/ThemeContext.js'; 
// import { colors } from '../components/theme/theme.js'; 
// 
// 
// const BackButton = ({ setPage, currentColors }) => (
//     <Button
//         startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
//         onClick={() => setPage('home')}
//         sx={{ mt: 4, mb: 2, color: currentColors.textDim, textTransform: 'none', '&:hover': { color: colors.accent } }}
//     >
//         Back to Home
//     </Button>
// );
// 
// const ReconciliationPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <AccountBalanceWalletRoundedIcon fontSize="large" />, title: "Automated Financial Matching", desc: "Match platform consumption against payment gateways (Stripe, etc.) and vendor invoices to eliminate end-of-month reconciliation debt instantly." },
//         { icon: <SyncAltRounded fontSize="large" />, title: "Latency-Free Auditing", desc: "Validate transaction flow in real-time. Melucra ensures every penny of revenue corresponds to a machine event without manual intervention." },
//         { icon: <CheckCircleOutlineRounded fontSize="large" />, title: "Discrepancy Flagging", desc: "Automatically flag and report any mismatch between expected revenue and reported usage, protecting against margin leakage and billing errors." },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     The Reconciliation Engine
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     Achieve instant, auditable clarity between your machine costs and your financial revenue.
//                 </Typography>
//             </motion.div>
//             
//             <Grid container spacing={4}>
//                 {features.map((item, index) => (
//                     <Grid item xs={12} sm={4} key={index}>
//                         <Paper sx={{ p: 3, bgcolor: currentColors.card, height: '100%', borderLeft: `4px solid ${colors.lucraGold}` }}>
//                             <Box sx={{ color: colors.lucraGold, mb: 1 }}>{item.icon}</Box>
//                             <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>{item.title}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mt: 1 }}>{item.desc}</Typography>
//                         </Paper>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// export default ReconciliationPage;

// src/components/pages/ReconciliationPage.jsx

import React, { useContext } from 'react';
import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import SyncAltRounded from '@mui/icons-material/SyncAltRounded';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';

// --- FIXED THEME IMPORTS ---
import { ColorModeContext } from '../../layouts/theme/ThemeContext.jsx';
import { colors } from '../../layouts/theme/theme.js';

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

const ReconciliationPage = ({ setPage }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];

    const features = [
        {
            icon: <AccountBalanceWalletRoundedIcon fontSize="large" />,
            title: "Automated Financial Matching",
            desc: "Match platform consumption against payment gateways (Stripe, etc.) and vendor invoices to eliminate end-of-month reconciliation debt instantly."
        },
        {
            icon: <SyncAltRounded fontSize="large" />,
            title: "Latency-Free Auditing",
            desc: "Validate transaction flow in real-time. Melucra ensures every penny of revenue corresponds to a machine event without manual intervention."
        },
        {
            icon: <CheckCircleOutlineRounded fontSize="large" />,
            title: "Discrepancy Flagging",
            desc: "Automatically flag and report any mismatch between expected revenue and reported usage, protecting against margin leakage and billing errors."
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <BackButton setPage={setPage} currentColors={currentColors} />

                <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
                    The Reconciliation Engine
                </Typography>

                <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
                    Achieve instant, auditable clarity between your machine costs and your financial revenue.
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                {features.map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Paper
                            sx={{
                                p: 3,
                                bgcolor: currentColors.card,
                                height: '100%',
                                borderLeft: `4px solid ${colors.lucraGold}`
                            }}
                        >
                            <Box sx={{ color: colors.lucraGold, mb: 1 }}>
                                {item.icon}
                            </Box>

                            <Typography variant="h6" fontWeight={700} color={currentColors.textPrimary}>
                                {item.title}
                            </Typography>

                            <Typography variant="body1" color={currentColors.textDim} sx={{ mt: 1 }}>
                                {item.desc}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ReconciliationPage;
