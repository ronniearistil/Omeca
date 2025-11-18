
// src/Omeca/components/sections/OmecaSupportedIntegrations.jsx (Conceptual File Path & Name Change)

// import React, { useContext } from 'react';
// import { Container, Typography, Grid, Button } from '@mui/material';
// import { motion } from 'framer-motion';
// import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
// import { ColorModeContext } from "../../layouts/theme/ThemeContext.jsx";
// import { colors } from "../../layouts/theme/theme.js";
// 
// 
// const OmecaSupportedIntegrations = () => { // RENAMED COMPONENT
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
//     
//     const integrations = ['Stripe', 'AWS', 'Google Cloud', 'OpenAI', 'Azure', 'Snowflake']; 
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, textAlign: 'center' }}>
//             <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }}>
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ lineHeight: 1.2 }}>
//                     Built for every <span style={{ color: colors.lucraGold }}>Profit Signal.</span>
//                 </Typography>
//                 <Typography sx={{ color: currentColors.textDim, mt: 1, mb: 6 }}>
//                     Connect to all top platforms out-of-the-box. No custom metering or tracking required.
//                 </Typography>
//             </motion.div>
// 
//             <Grid container spacing={2} justifyContent="center">
//                 {integrations.map((name, index) => (
//                     <Grid item key={name}>
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             whileInView={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.4, delay: index * 0.1 }}
//                             viewport={{ once: true, amount: 0.8 }}
//                         >
//                             <Button
//                                 variant="contained"
//                                 sx={{
//                                     bgcolor: currentColors.card,
//                                     color: currentColors.textPrimary,
//                                     textTransform: 'none',
//                                     fontWeight: 700,
//                                     borderRadius: 1.5,
//                                     py: 1.5,
//                                     px: 4,
//                                     border: `1px solid ${currentColors.textDim}22`,
//                                     '&:hover': {
//                                         bgcolor: colors.accent,
//                                         color: colors.dark.bgTop,
//                                         boxShadow: `0 4px 15px ${colors.accent}66`,
//                                     }
//                                 }}
//                             >
//                                 <CodeRoundedIcon sx={{ mr: 1, color: colors.lucraGold }} /> 
//                                 {name}
//                             </Button>
//                         </motion.div>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// export default OmecaSupportedIntegrations; // RENAMED EXPORT

import React, { useContext } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';

// --- FIXED THEME IMPORTS ---
import { ColorModeContext } from '../../../layouts/theme/ThemeContext.jsx';
import { colors } from '../../../layouts/theme/theme.js';

const OmecaSupportedIntegrations = () => { 
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];
    
    const integrations = ['Stripe', 'AWS', 'Google Cloud', 'OpenAI', 'Azure', 'Snowflake'];

    return (
        <Container
            maxWidth="lg"
            sx={{ py: { xs: 8, md: 10 }, textAlign: 'center' }}
        >
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
                    sx={{ lineHeight: 1.2 }}
                >
                    Built for every <span style={{ color: colors.lucraGold }}>Profit Signal.</span>
                </Typography>

                <Typography
                    sx={{ color: currentColors.textDim, mt: 1, mb: 6 }}
                >
                    Connect to all top platforms out-of-the-box. No custom metering or tracking required.
                </Typography>
            </motion.div>

            <Grid container spacing={2} justifyContent="center">
                {integrations.map((name, index) => (
                    <Grid item key={name}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.8 }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: currentColors.card,
                                    color: currentColors.textPrimary,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    borderRadius: 1.5,
                                    py: 1.5,
                                    px: 4,
                                    border: `1px solid ${currentColors.textDim}22`,
                                    '&:hover': {
                                        bgcolor: colors.accent,
                                        color: colors.dark.bgTop,
                                        boxShadow: `0 4px 15px ${colors.accent}66`,
                                    }
                                }}
                            >
                                <CodeRoundedIcon
                                    sx={{ mr: 1, color: colors.lucraGold }}
                                />
                                {name}
                            </Button>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default OmecaSupportedIntegrations;
