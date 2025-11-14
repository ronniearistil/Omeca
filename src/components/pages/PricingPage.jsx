// import React, { useContext } from 'react';
// import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
// import { ColorModeContext } from '../theme/ThemeContext';
// import { colors } from '../theme/theme';
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
// const PricingPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const tiers = [
//         { name: "Starter", price: "Free", desc: "For prototyping and early-stage projects. Includes core Ledger API and documentation access.", features: ["Up to 1M events/month", "Standard reconciliation", "Community support"] },
//         { name: "Growth", price: "$499/mo", desc: "For scaling teams that need robust tracking and basic alerts.", features: ["Up to 50M events/month", "Predictive Margin Alerts", "Priority support"] },
//         { name: "Enterprise", price: "Custom", desc: "Full suite for large organizations with complex compliance needs.", features: ["Unlimited volume", "Full SOC 2 compliance", "Dedicated Account Manager", "Custom pricing models"] },
//     ];
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     Transparent Pricing, Maximum Lucra
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     Pay only for the scale you need, and nothing for the headache.
//                 </Typography>
//             </motion.div>
//             
//             <Grid container spacing={4} alignItems="stretch">
//                 {tiers.map((tier, index) => (
//                     <Grid item xs={12} md={4} key={index}>
//                         <Paper sx={{ p: 4, bgcolor: currentColors.card, height: '100%', border: index === 1 ? `3px solid ${colors.accent}` : `1px solid ${currentColors.textDim}33` }}>
//                             <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>{tier.name}</Typography>
//                             <Typography variant="h4" fontWeight={900} color={colors.lucraGold} sx={{ my: 2 }}>{tier.price}</Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ minHeight: 60 }}>{tier.desc}</Typography>
//                             
//                             <Box component="ul" sx={{ mt: 3, p: 0, listStyle: 'none' }}>
//                                 {tier.features.map((feature, fIndex) => (
//                                     <Typography key={fIndex} variant="body2" color={currentColors.textPrimary} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                         <CheckCircleOutlineRounded sx={{ color: colors.successGreen, fontSize: 16, mr: 1 }} /> {feature}
//                                     </Typography>
//                                 ))}
//                             </Box>
//                             <Button variant="contained" fullWidth sx={{ mt: 4, bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentHover } }}>
//                                 {tier.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
//                             </Button>
//                         </Paper>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
// 
// export default PricingPage;

import React, { useContext } from 'react';
import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
// import { ColorModeContext } from '../theme/ThemeContext';
// import { colors } from '../theme/theme';
import { ColorModeContext } from '../components/theme/ThemeContext.js'; 
// import { colors } from '../components/theme/theme.js'; 
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
      '&:hover': { color: colors.accent },
    }}
  >
    Back to Home
  </Button>
);

const PricingPage = ({ setPage }) => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  const tiers = [
    {
      name: 'Starter',
      price: 'Free',
      desc: 'For prototyping and early-stage projects. Includes core Ledger API and documentation access.',
      features: ['Up to 1M events/month', 'Standard reconciliation', 'Community support'],
    },
    // {
    //   name: 'Growth',
    //   price: '$499/mo',
    //   desc: 'For scaling teams that need robust tracking and basic alerts.',
    //   features: ['Up to 50M events/month', 'Predictive Margin Alerts', 'Priority support'],
    // },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Full suite for large organizations with complex compliance needs.',
      features: ['Unlimited volume', 'Full SOC 2 compliance', 'Dedicated Account Manager', 'Custom pricing models'],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <BackButton setPage={setPage} currentColors={currentColors} />
        <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
          Transparent Pricing, Maximum Lucra
        </Typography>
        <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
          Pay only for the scale you need, and nothing for the headache.
        </Typography>
      </motion.div>

      <Grid container spacing={4} alignItems="stretch">
        {tiers.map((tier, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              sx={{
                p: 4,
                bgcolor: currentColors.card,
                height: '100%',
                border:
                  tier.name === 'Enterprise'
                    ? `3px solid ${colors.accent}`
                    : `1px solid ${currentColors.textDim}33`,
              }}
            >
              <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>
                {tier.name}
              </Typography>
              <Typography variant="h4" fontWeight={900} color={colors.lucraGold} sx={{ my: 2 }}>
                {tier.price}
              </Typography>
              <Typography variant="body1" color={currentColors.textDim} sx={{ minHeight: 60 }}>
                {tier.desc}
              </Typography>

              <Box component="ul" sx={{ mt: 3, p: 0, listStyle: 'none' }}>
                {tier.features.map((feature, fIndex) => (
                  <Typography
                    key={fIndex}
                    variant="body2"
                    color={currentColors.textPrimary}
                    sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                  >
                    <CheckCircleOutlineRounded sx={{ color: colors.successGreen, fontSize: 16, mr: 1 }} /> {feature}
                  </Typography>
                ))}
              </Box>

              {tier.name === 'Starter' && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 4, bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentHover } }}
                  onClick={() => setPage('signup')}
                >
                  Get Started
                </Button>
              )}

              {tier.name === 'Enterprise' && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 4, bgcolor: colors.accent, '&:hover': { bgcolor: colors.accentHover } }}
                  component="a"
                  href="mailto:luca@melucra.com"
                >
                  Contact Us
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PricingPage;
