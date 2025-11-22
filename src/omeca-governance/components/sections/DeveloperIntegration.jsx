// import React, { useContext } from 'react';
// import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
// import { motion } from 'framer-motion';
// 
// // --- FIXED THEME PATHS ---
// import { ColorModeContext } from '../../../layouts/theme/ThemeContext.jsx';
// import { colors } from '../../../layouts/theme/theme.js';
// 
// const OmecaDeveloperIntegration = () => { 
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const steps = [
//         { n: 1, title: 'Install the SDK', body: 'Add our lightweight SDK to your project with a single command.' },
//         { n: 2, title: 'Replace Core Hooks', body: 'Update your existing finance logic hooks with our simple wrappers.' },
//         { n: 3, title: 'Start Tracking', body: 'Immediately see usage analytics, costs, and performance metrics in your dashboard.' },
//     ];
// 
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
//             <motion.div
//                 initial={{ opacity: 0, y: 15 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true, amount: 0.5 }}
//             >
//                 <Typography
//                     variant="h4"
//                     fontWeight={900}
//                     color={currentColors.textPrimary}
//                     sx={{ mb: 1, textAlign: 'center' }}
//                 >
//                     Drop in the Ledger. <span style={{ color: colors.accent }}>Start Reconciling Profit.</span>
//                 </Typography>
// 
//                 <Typography
//                     sx={{ color: currentColors.textDim, mb: 6, textAlign: 'center' }}
//                 >
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
//                                     <Box
//                                         sx={{
//                                             width: 28,
//                                             height: 28,
//                                             borderRadius: '50%',
//                                             bgcolor: colors.lucraGold,
//                                             color: currentColors.card,
//                                             display: 'grid',
//                                             placeItems: 'center',
//                                             fontWeight: 800,
//                                             mr: 2
//                                         }}
//                                     >
//                                         {step.n}
//                                     </Box>
//                                     <Typography
//                                         variant="h6"
//                                         fontWeight={800}
//                                         color={currentColors.textPrimary}
//                                     >
//                                         {step.title}
//                                     </Typography>
//                                 </Box>
//                                 <Typography
//                                     variant="body2"
//                                     sx={{ ml: 6, color: currentColors.textDim }}
//                                 >
//                                     {step.body}
//                                 </Typography>
//                             </motion.div>
//                         ))}
// 
//                         <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//                             <Button
//                                 variant="contained"
//                                 size="large"
//                                 sx={{
//                                     bgcolor: colors.accent,
//                                     color: currentColors.bgTop,
//                                     fontWeight: 800,
//                                     '&:hover': { bgcolor: colors.accentHover }
//                                 }}
//                             >
//                                 Get the SDK →
//                             </Button>
//                             <Button
//                                 variant="outlined"
//                                 size="large"
//                                 sx={{
//                                     borderColor: colors.accent,
//                                     color: colors.accent,
//                                     fontWeight: 700,
//                                     '&:hover': { bgcolor: `${colors.accent}14` }
//                                 }}
//                             >
//                                 View Docs →
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Grid>
// 
//                 {/* Code Block */}
//                 <Grid item xs={12} md={6}>
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true, amount: 0.3 }}
//                     >
//                         <Paper
//                             sx={{
//                                 bgcolor: colors.dark.bgTop,
//                                 color: 'white',
//                                 p: 2,
//                                 borderRadius: 2,
//                                 border: `1px solid ${colors.accent}44`,
//                                 height: '100%'
//                             }}
//                         >
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     justifyContent: 'space-between',
//                                     alignItems: 'center',
//                                     mb: 1,
//                                     borderBottom: '1px solid #333'
//                                 }}
//                             >
//                                 <Typography variant="caption" sx={{ color: colors.accent }}>
//                                     Code Comparison
//                                 </Typography>
//                                 <Button size="small" sx={{ color: colors.accent }}>
//                                     Copy
//                                 </Button>
//                             </Box>
// 
//                             <Box
//                                 component="pre"
//                                 sx={{
//                                     overflowX: 'auto',
//                                     bgcolor: colors.dark.bgTop,
//                                     borderRadius: 1,
//                                     p: 1,
//                                     color: '#C8C8C8'
//                                 }}
//                             >
//                                 <Typography
//                                     component="code"
//                                     sx={{
//                                         fontSize: '0.85rem',
//                                         lineHeight: 1.5,
//                                         fontFamily: 'monospace'
//                                     }}
//                                 >
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
// export default OmecaDeveloperIntegration;

import React, { useContext } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

// --- THEME IMPORTS ---
import { ColorModeContext } from '../../../layouts/theme/ThemeContext.jsx';
import { colors } from '../../../layouts/theme/theme.js';

// --- STABLE MOTION VARIANTS (Issue 2 Fix) ---
const fadeInUp = { 
    hidden: { y: 30, opacity: 0 }, 
    show: { 
        y: 0, 
        opacity: 1, 
        transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 } 
    } 
};

// Keyframe animation definition for the marquee
// This uses CSS injection for stable, smooth motion (Issue 3 Fix)
const marqueeAnimation = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

// Helper component for the logo strip
const IntegrationLogoStrip = ({ currentColors, integrations, speed = 40 }) => (
    <Box
        sx={{
            display: 'flex',
            width: '200%', // Doubled width to allow seamless loop
            animation: `marquee ${speed}s linear infinite`,
            '@media (max-width: 600px)': {
                animationDuration: `${speed * 1.5}s`, // Slower on mobile
            }
        }}
    >
        {/* Render the logos twice to create a seamless loop (Issue 3 Fix) */}
        {[...integrations, ...integrations].map((name, index) => (
            <Box
                key={name + index}
                sx={{
                    px: { xs: 4, md: 6 },
                    py: 2,
                    flexShrink: 0, // Prevent shrinking
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '200px', 
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: currentColors.textDim + 'AA', 
                        opacity: 0.8,
                        transition: 'opacity 0.3s',
                        '&:hover': {
                            opacity: 1,
                            color: currentColors.textPrimary,
                        }
                    }}
                >
                    {name}
                </Typography>
            </Box>
        ))}
    </Box>
);

const OmecaSupportedIntegrations = () => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];
  
  // Grouped by function for better narrative (Issue 4 Fix)
  const integrations = [
    'NetSuite', 'SAP', 'Workday', 
    'Snowflake', 'Databricks', 'BigQuery', 
    'Stripe', 'Zuora', 'Salesforce Billing', 
    'AWS', 'GCP', 'Azure'
  ];

  return (
    <Container
      maxWidth={false} // Use full width for the integration strip (Issue 5 Fix)
      // Apply consistent padding (Issue 5 Fix)
      sx={{
        py: { xs: 10, md: 14 },
        textAlign: 'center',
        // Inject the keyframes safely
        '& style': { display: 'none' }, 
        '&::before': {
            content: `"${marqueeAnimation}"`,
            whiteSpace: 'pre',
            display: 'block',
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
        }
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          color={currentColors.textPrimary}
          sx={{ lineHeight: 1.2, mb: 1, px: 2 }}
        >
          Where Omeca Connects
        </Typography>

        <Typography
          sx={{
            color: currentColors.textDim,
            mt: 1,
            mb: 6,
            maxWidth: 720,
            mx: 'auto',
            lineHeight: 1.6,
            px: 2,
          }}
        >
          Omeca unifies **ERP, Data, and Billing** systems. You keep your stack. We provide continuous financial truth across it.
        </Typography>
      </motion.div>

      {/* Premium Integration Strip (Issue 3 Fix) */}
      <Box
        sx={{
            mt: 2,
            overflow: 'hidden', // Crucial for marquee effect
            whiteSpace: 'nowrap',
            borderTop: `1px solid ${currentColors.textDim}1A`,
            borderBottom: `1px solid ${currentColors.textDim}1A`,
            py: 1,
        }}
      >
        <IntegrationLogoStrip currentColors={currentColors} integrations={integrations} />
      </Box>
    </Container>
  );
};

export default OmecaSupportedIntegrations;