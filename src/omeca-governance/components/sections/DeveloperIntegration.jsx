// import React, { useContext } from 'react';
// import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
// import { motion } from 'framer-motion';
// import { ColorModeContext } from "../../layouts/theme/ThemeContext.jsx";
// import { colors } from "../../layouts/theme/theme.js";
// 
// 
// const OmecaDeveloperIntegration = () => { // RENAMED COMPONENT
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const steps = [
//         { n: 1, title: 'Install the SDK', body: 'Add our lightweight SDK to your project with a single command.' },
//         { n: 2, title: 'Replace Core Hooks', body: 'Update your existing finance logic hooks with our simple wrappers.' },
//         { n: 3, title: 'Start Tracking', body: 'Immediately see usage analytics, costs, and performance metrics in your dashboard.' },
//     ];
// 
//     // UPDATED: Replaced 'melucra' variables and comments with 'omeca'
//     const codeSnippet = `
// const omeca = new OmecaSDK({
//   apiKey: "OMECA_PK_...", // Updated API Key Prefix
// });
// 
// // BEFORE Omeca:
// // const cost = calculate_usage(data);
// // update_spreadsheet(cost);
// 
// // WITH Omeca:
// const ledgerEntry = omeca.track({
//   accountId: "user-123",
//   event: "model.inference",
//   units: 4200, // tokens or compute
//   value: 0.05, // USD per unit
// });
// 
// if (ledgerEntry.marginAlert) {
//   send_critical_alert(ledgerEntry.marginAlert);
// }
//     `.trim();
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
//             <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }}>
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 1, textAlign: 'center' }}>
//                     Drop in the Ledger. <span style={{ color: colors.accent }}>Start Reconciling Profit.</span>
//                 </Typography>
// 
//                 <Typography sx={{ color: currentColors.textDim, mb: 6, textAlign: 'center' }}>
//                     Get started in minutes with our straightforward API. Replace your existing calls with minimal code changes.
//                 </Typography>
//             </motion.div>
// 
//             <Grid container spacing={4}>
//                 <Grid item xs={12} md={6}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//                         {steps.map((step, index) => (
//                             <motion.div
//                                 key={step.n}
//                                 initial={{ opacity: 0, x: -50 }}
//                                 whileInView={{ opacity: 1, x: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 viewport={{ once: true, amount: 0.8 }}
//                             >
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                     <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: colors.lucraGold, color: currentColors.card, display: 'grid', placeItems: 'center', fontWeight: 800, mr: 2 }}>
//                                         {step.n}
//                                     </Box>
//                                     <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>
//                                         {step.title}
//                                     </Typography>
//                                 </Box>
//                                 <Typography variant="body2" sx={{ ml: 6, color: currentColors.textDim }}>
//                                     {step.body}
//                                 </Typography>
//                             </motion.div>
//                         ))}
//                         <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//                             <Button
//                                 variant="contained"
//                                 size="large"
//                                 sx={{ bgcolor: colors.accent, color: currentColors.bgTop, fontWeight: 800, '&:hover': { bgcolor: colors.accentHover } }
//                                 }
//                             >
//                                 Get the SDK →
//                             </Button>
//                             <Button
//                                 variant="outlined"
//                                 size="large"
//                                 sx={{ borderColor: colors.accent, color: colors.accent, fontWeight: 700, '&:hover': { bgcolor: `${colors.accent}14` } }
//                                 }
//                             >
//                                 View Docs →
//                             </Button>
//                         </Box>
// 
//                     </Box>
//                 </Grid>
// 
//                 {/* Code Block */}
//                 <Grid item xs={12} md={6}>
//                     <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
//                         <Paper sx={{ bgcolor: colors.dark.bgTop, color: 'white', p: 2, borderRadius: 2, border: `1px solid ${colors.accent}44`, height: '100%' }}>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, borderBottom: '1px solid #333' }}>
//                                 <Typography variant="caption" sx={{ color: colors.accent }}>Code Comparison</Typography>
//                                 <Button size="small" sx={{ color: colors.accent }}>Copy</Button>
//                             </Box>
//                             <Box component="pre" sx={{ overflowX: 'auto', bgcolor: colors.dark.bgTop, borderRadius: 1, p: 1, color: '#C8C8C8' }}>
//                                 <Typography component="code" sx={{ fontSize: '0.85rem', lineHeight: 1.5, fontFamily: 'monospace' }}>
//                                     {codeSnippet}
//                                 </Typography>
//                             </Box>
//                         </Paper>
//                     </motion.div>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };
// 
// export default OmecaDeveloperIntegration; // RENAMED EXPORT

import React, { useContext } from 'react';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';

// --- FIXED THEME PATHS ---
import { ColorModeContext } from '../../../layouts/theme/ThemeContext.jsx';
import { colors } from '../../../layouts/theme/theme.js';

const OmecaDeveloperIntegration = () => { 
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];

    const steps = [
        { n: 1, title: 'Install the SDK', body: 'Add our lightweight SDK to your project with a single command.' },
        { n: 2, title: 'Replace Core Hooks', body: 'Update your existing finance logic hooks with our simple wrappers.' },
        { n: 3, title: 'Start Tracking', body: 'Immediately see usage analytics, costs, and performance metrics in your dashboard.' },
    ];

    const codeSnippet = `
const omeca = new OmecaSDK({
  apiKey: "OMECA_PK_...", // Updated API Key Prefix
});

// BEFORE Omeca:
// const cost = calculate_usage(data);
// update_spreadsheet(cost);

// WITH Omeca:
const ledgerEntry = omeca.track({
  accountId: "user-123",
  event: "model.inference",
  units: 4200, // tokens or compute
  value: 0.05, // USD per unit
});

if (ledgerEntry.marginAlert) {
  send_critical_alert(ledgerEntry.marginAlert);
}
    `.trim();

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <Typography
                    variant="h4"
                    fontWeight={900}
                    color={currentColors.textPrimary}
                    sx={{ mb: 1, textAlign: 'center' }}
                >
                    Drop in the Ledger. <span style={{ color: colors.accent }}>Start Reconciling Profit.</span>
                </Typography>

                <Typography
                    sx={{ color: currentColors.textDim, mb: 6, textAlign: 'center' }}
                >
                    Get started in minutes with our straightforward API. Replace your existing calls with minimal code changes.
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.n}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.8 }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Box
                                        sx={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: '50%',
                                            bgcolor: colors.lucraGold,
                                            color: currentColors.card,
                                            display: 'grid',
                                            placeItems: 'center',
                                            fontWeight: 800,
                                            mr: 2
                                        }}
                                    >
                                        {step.n}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight={800}
                                        color={currentColors.textPrimary}
                                    >
                                        {step.title}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{ ml: 6, color: currentColors.textDim }}
                                >
                                    {step.body}
                                </Typography>
                            </motion.div>
                        ))}

                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: colors.accent,
                                    color: currentColors.bgTop,
                                    fontWeight: 800,
                                    '&:hover': { bgcolor: colors.accentHover }
                                }}
                            >
                                Get the SDK →
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderColor: colors.accent,
                                    color: colors.accent,
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: `${colors.accent}14` }
                                }}
                            >
                                View Docs →
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Code Block */}
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Paper
                            sx={{
                                bgcolor: colors.dark.bgTop,
                                color: 'white',
                                p: 2,
                                borderRadius: 2,
                                border: `1px solid ${colors.accent}44`,
                                height: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1,
                                    borderBottom: '1px solid #333'
                                }}
                            >
                                <Typography variant="caption" sx={{ color: colors.accent }}>
                                    Code Comparison
                                </Typography>
                                <Button size="small" sx={{ color: colors.accent }}>
                                    Copy
                                </Button>
                            </Box>

                            <Box
                                component="pre"
                                sx={{
                                    overflowX: 'auto',
                                    bgcolor: colors.dark.bgTop,
                                    borderRadius: 1,
                                    p: 1,
                                    color: '#C8C8C8'
                                }}
                            >
                                <Typography
                                    component="code"
                                    sx={{
                                        fontSize: '0.85rem',
                                        lineHeight: 1.5,
                                        fontFamily: 'monospace'
                                    }}
                                >
                                    {codeSnippet}
                                </Typography>
                            </Box>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OmecaDeveloperIntegration;
