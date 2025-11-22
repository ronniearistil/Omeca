
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
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

// --- THEME IMPORTS ---
import { ColorModeContext } from '../../../layouts/theme/ThemeContext.jsx';
import { colors } from '../../../layouts/theme/theme.js';

const OmecaSupportedIntegrations = () => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  const integrations = [
    'NetSuite',
    'SAP',
    'Workday',
    'Snowflake',
    'Databricks',
    'BigQuery',
    'GCP',
    'AWS',
    'Azure',
    'Stripe',
    'Salesforce',
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 10, md: 14 },
        textAlign: 'center',
      }}
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
          sx={{ lineHeight: 1.2, mb: 1 }}
        >
          Connect Omeca to the systems you already run
        </Typography>

        <Typography
          sx={{
            color: currentColors.textDim,
            mt: 1,
            mb: 4,
            maxWidth: 720,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Omeca sits beside your ERP, data platforms, and billing tools. You keep your stack. 
          We provide continuous financial truth across it.
        </Typography>
      </motion.div>

      {/* Integration strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <Box
          sx={{
            mt: 2,
            px: { xs: 2, md: 4 },
            py: 2.5,
            borderRadius: 4,
            background: `linear-gradient(90deg, ${currentColors.card} 0%, ${currentColors.bgGradA} 50%, ${currentColors.card} 100%)`,
            boxShadow: `0 10px 30px ${currentColors.shadowSoft}`,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              gap: 4,
              alignItems: 'center',
              minWidth: '100%',
              justifyContent: 'center',
            }}
          >
            {integrations.map((name) => (
              <Typography
                key={name}
                sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: currentColors.textDim,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {name}
              </Typography>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default OmecaSupportedIntegrations;
