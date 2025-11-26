// import React, { useContext } from 'react';
// import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
// import TrendingUp from '@mui/icons-material/TrendingUp';
// import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
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
// const MarginAlertsPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <AttachMoneyRoundedIcon fontSize="large" />, title: "Real-Time Profit Protection", desc: "Set explicit margin thresholds (e.g., 30%) and receive immediate alerts when usage patterns put your projected profit at risk." },
//         { icon: <TrendingUp fontSize="large" />, title: "Predictive Forecasting", desc: "AI models analyze historical and current usage to forecast cost spikes and revenue drops, giving you hours, not days, to adjust pricing or infrastructure." },
//         { icon: <CodeRoundedIcon fontSize="large" />, title: "Automated Control Hooks", desc: "Integrate margin alerts directly into your operations pipeline to throttle high-cost users or automatically switch compute vendors when margins fall." },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     Predictive Margin Alerts
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     Turn finance from a reporting function into a protective, profit-maximizing shield for your business.
//                 </Typography>
//             </motion.div>
//             
//             <Grid container spacing={4}>
//                 {features.map((item, index) => (
//                     <Grid item xs={12} sm={4} key={index}>
//                         <Paper sx={{ p: 3, bgcolor: currentColors.card, height: '100%', borderLeft: `4px solid ${colors.accent}` }}>
//                             <Box sx={{ color: colors.accent, mb: 1 }}>{item.icon}</Box>
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
// export default MarginAlertsPage;

import React, { useContext } from 'react';
import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import TrendingUp from '@mui/icons-material/TrendingUp';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';

import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
import { colors } from '../../../shared/layouts/theme/theme.js';

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

const MarginAlertsPage = ({ setPage }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];

    const features = [
        {
            icon: <AttachMoneyRoundedIcon fontSize="large" />,
            title: "Live Margin Health",
            desc: "Omeca monitors every unit of usage and spend as it happens so finance leaders see margin erosion the moment it begins rather than after the fact."
        },
        {
            icon: <TrendingUp fontSize="large" />,
            title: "Predictive Drift Detection",
            desc: "Forecast models analyze operational and financial patterns to identify drift in cost revenue and contribution margin before it becomes visible in traditional reports."
        },
        {
            icon: <CodeRoundedIcon fontSize="large" />,
            title: "Autonomous Guardrails",
            desc: "Link alerts directly to your workflows so the system can slow high burn processes shift workloads or adjust pricing logic the instant margin drops below your targets."
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

                <Typography 
                    variant="h3" 
                    fontWeight={900} 
                    color={currentColors.textPrimary} 
                    sx={{ mb: 2 }}
                >
                    Predictive Margin Alerts
                </Typography>

                <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
                    Omeca transforms margin control into a continuous real-time function powered by operational truth predictive insight and verifiable financial intelligence.
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
                                borderLeft: `4px solid ${colors.accent}`
                            }}
                        >
                            <Box sx={{ color: colors.accent, mb: 1 }}>{item.icon}</Box>

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

export default MarginAlertsPage;
