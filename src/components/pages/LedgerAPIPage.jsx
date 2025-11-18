// // src/Omeca/pages/LedgerAPIPage.jsx (Conceptual File Path & Name Change)
// 
// import React, { useContext } from 'react';
// import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
// import PolicyRoundedIcon from '@mui/icons-material/PolicyRoundedIcon';
// import { ColorModeContext } from '../../layouts/theme/ThemeContext.jsx'; // Corrected path assumption
// import { colors } from '../../layouts/theme/theme.js'; // Corrected path assumption
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
// const OmecaLedgerAPIPage = ({ setPage }) => { // RENAMED COMPONENT
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const features = [
//         { icon: <StorageRoundedIcon fontSize="large" />, title: "Immutable Ledger Core", desc: "Every machine event is cryptographically signed and stored in an immutable ledger, providing a complete, non-repudiable audit trail for financial compliance." },
//         { icon: <PolicyRoundedIcon fontSize="large" />, title: "Real-Time Event Ingestion", desc: "Low-latency API ingestion built for high-throughput machine data streams, ensuring your reconciliation and margin calculations are always current." },
//         { icon: <StorageRoundedIcon fontSize="large" />, title: "Schema Flexibility", desc: "Handle diverse data structures from multiple cloud providers and proprietary systems. Normalize compute, usage, and revenue signals automatically." },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     Ledger API: The Core of Machine Finance
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     Transform chaotic usage data into the single source of truth for your AI-native ERP.
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
// export default OmecaLedgerAPIPage; // RENAMED EXPORT

// src/components/pages/LedgerAPIPage.jsx

import React, { useContext } from 'react';
import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PolicyRounded from '@mui/icons-material/PolicyRounded';

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

const OmecaLedgerAPIPage = ({ setPage }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];

    const features = [
        {
            icon: <StorageRoundedIcon fontSize="large" />,
            title: "Immutable Financial Record",
            desc: "Every machine action is converted into a signed tamper proof ledger entry that forms the foundation for continuous accounting and end to end financial trust."
        },
        {
            icon: <PolicyRounded fontSize="large" />,
            title: "Continuous Event Streaming",
            desc: "Ingest operational and financial signals as they happen so margin cost and revenue stay in a live state rather than waiting for batch cycles or manual reconciliation."
        },
        {
            icon: <StorageRoundedIcon fontSize="large" />,
            title: "Unified Machine Schema",
            desc: "Normalize usage compute and spend signals into one structure that feeds the Cognitive ERP and removes fragmentation across clouds agents and AI workflows."
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
                    Ledger API The Engine of Continuous Accounting
                </Typography>

                <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
                    Omeca captures every machine action as structured verifiable financial truth and the Ledger API turns high velocity signals into continuous accounting.
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

export default OmecaLedgerAPIPage;
