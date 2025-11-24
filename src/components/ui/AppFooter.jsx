// 
// // src/components/ui/AppFooter.jsx
// import React, { useContext } from 'react';
// import {
//     Box, Container, Grid,
//     Typography, Button, Link
// } from '@mui/material';
// 
// // --- FIXED IMPORTS ---
// import { ColorModeContext } from '../../layouts/theme/ThemeContext.jsx';
// import { colors } from '../../layouts/theme/theme.js';
// import OmecaLogo from "../ui/OmecaLogo.jsx";
// 
// 
// // --- RESTORED LOGO COMPONENT (works exactly like original) ---
// // const OmecaLogoComponent = ({ size = 36 }) => (
// //     <img
// //         src="/assets/omeca-logo.png"
// //         alt="OMECA Logo"
// //         width={size}
// //         height={size}
// //         style={{ display: 'block' }}
// //     />
// // );
// 
// /**
//  * Footer component for Omeca Landing
//  */
// const AppFooter = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
// 
//     const footerLinks = [
//         {
//             title: 'Products',
//             links: [
//                 { name: 'Ledger API', target: 'ledger' },
//                 { name: 'Reconciliation', target: 'reconciliation' },
//                 { name: 'Margin Alerts', target: 'alerts' },
//                 { name: 'Pricing', target: 'pricing' }
//             ]
//         },
//         {
//             title: 'Company',
//             links: [
//                 { name: 'About', target: 'about' },
//                 { name: 'Careers', target: 'careers' },
//                 { name: 'Blog', target: 'about' },
//                 { name: 'Contact', target: 'contact' },
//             ]
//         },
//         {
//             title: 'Legal',
//             links: [
//                 { name: 'Privacy Policy', target: 'privacy' },
//                 { name: 'Cookies', target: 'cookies' },
//                 { name: 'Terms of Service', target: 'terms' },
//                 { name: 'Security', target: 'security' }
//             ]
//         },
//                 {
//             title: 'Investor Relations',
//             links: [
//                 { name: 'Investor Brief', target: 'brief' }
//             ]
//         },
//         
//     ];
// 
// 
//     return (
//         <Box sx={{ bgcolor: currentColors.bgTop, borderTop: `1px solid ${currentColors.textDim}22` }}>
//             
//             {/* TOP CTA SECTION */}
//             <Box sx={{ py: 8, textAlign: 'center', background: `linear-gradient(180deg, ${currentColors.bgGradB}44, ${currentColors.bgTop})` }}>
//                 <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>
//                     Ready to make autonomous systems explainable and trusted?
//                 </Typography>
//                 <Typography sx={{ color: currentColors.textDim, mt: 1, mb: 4, maxWidth: '600px', mx: 'auto' }}>
//                     Adopt the Explainability Core that turns machine activity into transparent, verifiable financial records.
//                 </Typography>
// 
//                 <Button
//                     variant="contained"
//                     size="large"
//                     sx={{
//                         mt: 1, mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 },
//                         px: 4, py: 1.2,
//                         fontWeight: 800, textTransform: 'none',
//                         bgcolor: colors.accent, color: currentColors.bgTop,
//                         '&:hover': { bgcolor: colors.accentHover },
//                     }}
//                     onClick={() => setPage('contact')}
//                 >
//                     Book Audit Strategy Session →
//                 </Button>
// 
//                 <Button
//                     variant="outlined"
//                     size="large"
//                     sx={{
//                         mt: 1, px: 4, py: 1.2,
//                         fontWeight: 700, textTransform: 'none',
//                         borderColor: currentColors.textDim,
//                         color: currentColors.textDim,
//                         '&:hover': { bgcolor: `${currentColors.textDim}1A` },
//                     }}
//                     onClick={() => setPage('documentation')}
//                 >
//                     View Documentation →
//                 </Button>
//             </Box>
// 
//             {/* MAIN FOOTER CONTENT */}
//             <Container maxWidth="lg" sx={{ pt: 6, pb: 4 }}>
//                 <Grid container spacing={4}>
//                     
//                     {/* LOGO + DESCRIPTION */}
//                     <Grid item xs={12} md={4}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
//                             {/* <OmecaLogoComponent size={32} /> */}
//                             <OmecaLogo size={90} />
// 
//                             <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>
//                                 {/* MELUCRA */}
//                             </Typography>
//                         </Box>
// 
//                         <Typography variant="body1" sx={{ mt: 2, color: currentColors.textDim }}>
//                             The Explainable System of Record for the Machine Economy.
//                         </Typography>
//                     </Grid>
// 
//                     {/* NAV LINK COLUMNS */}
//                     <Grid item xs={12} md={8}>
//                         <Grid container spacing={4}>
//                             {footerLinks.map((section) => (
//                                 <Grid item xs={6} sm={4} key={section.title}>
//                                     <Typography variant="subtitle1" fontWeight={700} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                                         {section.title}
//                                     </Typography>
//                                     <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
//                                         {section.links.map((link) => (
//                                             <Link
//                                                 key={link.name}
//                                                 component="button"
//                                                 underline="none"
//                                                 onClick={() => setPage(link.target)}
//                                                 sx={{
//                                                     display: 'block',
//                                                     mb: 1,
//                                                     color: currentColors.textDim,
//                                                     textAlign: 'left',
//                                                     '&:hover': { color: colors.accent },
//                                                 }}
//                                             >
//                                                 <Typography variant="body2">{link.name}</Typography>
//                                             </Link>
//                                         ))}
//                                     </Box>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </Grid>
//                 </Grid>
// 
//                 {/* BOTTOM STRIP */}
//                 <Box sx={{ borderTop: `1px solid ${currentColors.textDim}22`, mt: 6, pt: 3, textAlign: 'center' }}>
//                     <Box sx={{ mb: 2, color: currentColors.textDim, fontSize: '0.8rem', opacity: 0.8 }}>
//                         SOC 2 • GDPR • CCPA • Immutable Ledger Verified • Zero Trust Architecture
//                     </Box>
//                     <Typography variant="caption" sx={{ color: currentColors.textDim }}>
//                         © {new Date().getFullYear()} Melucra. All rights reserved.
//                     </Typography>
//                 </Box>
// 
//             </Container>
//         </Box>
//     );
// };
// 
// export default AppFooter;

import React, { useContext } from 'react';
import {
    Box, Container, Grid,
    Typography, Button, Link, Stack, Chip, Divider
} from '@mui/material';
import { ArrowForward, Security, GppGood } from '@mui/icons-material';

// --- RELATIVE IMPORTS ---
import { ColorModeContext } from '../../layouts/theme/ThemeContext.jsx';
import { colors } from '../../layouts/theme/theme.js';
import OmecaLogo from "../ui/OmecaLogo.jsx";

const AppFooter = ({ setPage }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];
    const isDark = mode === 'dark';

    // --- NAVIGATION STRUCTURE ---
    // Preserves all original links while adopting the "Trust Stack" nomenclature
    const footerLinks = [
        {
            title: 'The Trust Stack', // 
            links: [
                // These direct to the Interactive Pitch (Trust Stack Preview)
                { name: 'Omeca Core (L1)', target: 'trust-stack' },      // [cite: 35]
                { name: 'Omeca Ledger (L2)', target: 'trust-stack' },    // [cite: 38]
                { name: 'Omeca Governance (L3)', target: 'trust-stack' },// [cite: 41]
                { name: 'Platform Pricing', target: 'pricing' },         // RESTORED
            ]
        },
        {
            title: 'Company',
            links: [
                { name: 'About Us', target: 'about' },
                { name: 'Careers', target: 'careers' }, // [cite: 149]
                { name: 'Blog', target: 'blog' },       // RESTORED
                { name: 'Contact Sales', target: 'contact' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Investor Brief', target: 'brief' }, // [cite: 163]
                { name: 'Documentation', target: 'documentation' },
                { name: 'Security', target: 'security' },
            ]
        },
        {
            title: 'Legal', // RESTORED SECTION
            links: [
                { name: 'Privacy Policy', target: 'privacy' },
                { name: 'Terms of Service', target: 'terms' },
                { name: 'Cookie Policy', target: 'cookies' },
            ]
        }
    ];

    return (
        <Box sx={{ 
            bgcolor: currentColors.bgTop, 
            borderTop: `1px solid ${currentColors.textDim}15`,
            position: 'relative',
            zIndex: 10
        }}>
            
            {/* --- 1. HIGH-VALUE CTA SECTION (Slide 14) --- */}
            <Box sx={{ 
                py: { xs: 8, md: 10 }, 
                textAlign: 'center', 
                background: isDark 
                    ? `linear-gradient(180deg, ${colors.accent}08 0%, ${currentColors.bgTop} 100%)`
                    : `linear-gradient(180deg, ${colors.accent}05 0%, ${currentColors.bgTop} 100%)`,
                borderBottom: `1px solid ${currentColors.textDim}10`
            }}>
                <Container maxWidth="md">
                    <Chip 
                        label="THE CONTINUOUS CLOSE" 
                        sx={{ 
                            mb: 3, 
                            fontWeight: 800, 
                            fontSize: "0.7rem", 
                            letterSpacing: 1.5,
                            bgcolor: `${colors.lucraGold}15`, 
                            color: colors.lucraGold,
                            border: `1px solid ${colors.lucraGold}30`
                        }} 
                    />

                    <Typography variant="h3" fontWeight={900} sx={{ 
                        color: currentColors.textPrimary,
                        mb: 2,
                        letterSpacing: "-0.02em"
                    }}>
                        Make Finance Continuous.
                    </Typography>
                    
                    <Typography sx={{ 
                        color: currentColors.textDim, 
                        mt: 1, 
                        mb: 5, 
                        maxWidth: '600px', 
                        mx: 'auto',
                        fontSize: "1.1rem",
                        lineHeight: 1.6
                    }}>
                        Transform the close from a reactive month-end scramble into a verifiable, autonomous process.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => setPage('contact')}
                            endIcon={<ArrowForward />}
                            sx={{
                                px: 4, py: 1.5,
                                fontWeight: 800, 
                                textTransform: 'none',
                                bgcolor: colors.accent, 
                                color: '#000',
                                '&:hover': { bgcolor: colors.accentHover },
                            }}
                        >
                            Book Audit Strategy Session
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => setPage('brief')}
                            sx={{
                                px: 4, py: 1.5,
                                fontWeight: 700, 
                                textTransform: 'none',
                                borderColor: currentColors.textDim,
                                color: currentColors.textPrimary,
                                '&:hover': { borderColor: currentColors.textPrimary, bgcolor: `${currentColors.textDim}10` },
                            }}
                        >
                            View Investor Brief
                        </Button>
                    </Stack>
                </Container>
            </Box>

            {/* --- 2. MAIN FOOTER CONTENT --- */}
            <Container maxWidth="lg" sx={{ pt: 8, pb: 4 }}>
                <Grid container spacing={6}>
                    
                    {/* LOGO + PITCH */}
                    <Grid item xs={12} md={3}>
                        <Box 
                            onClick={() => setPage('home')}
                            sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5, cursor: 'pointer' }}
                        >
                            <OmecaLogo size={200} />
                            {/* <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary} sx={{ letterSpacing: '-0.5px' }}>
                                OMECA
                            </Typography> */}
                        </Box>
                        <Typography variant="body2" sx={{ mt: 2, color: currentColors.textDim, lineHeight: .5 }}>
                            The Explainable System of Record for the Machine Economy. We unify operational truth, real-time closing, and verifiable intelligence.
                        </Typography>
                    </Grid>

                    {/* NAV COLUMNS */}
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={4}>
                            {footerLinks.map((section) => (
                                <Grid item xs={6} sm={3} key={section.title}>
                                    <Typography variant="overline" fontWeight={800} color={currentColors.textDim} sx={{ mb: 3, display: 'block', letterSpacing: 1.2 }}>
                                        {section.title}
                                    </Typography>
                                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                        {section.links.map((link) => (
                                            <Box component="li" key={link.name} sx={{ mb: 1.5 }}>
                                                <Link
                                                    component="button"
                                                    underline="none"
                                                    onClick={() => setPage(link.target)}
                                                    sx={{
                                                        color: currentColors.textPrimary,
                                                        fontWeight: 500,
                                                        textAlign: 'left',
                                                        fontSize: '0.9rem',
                                                        transition: 'color 0.2s',
                                                        '&:hover': { color: colors.accent },
                                                    }}
                                                >
                                                    {link.name}
                                                </Link>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 6, borderColor: `${currentColors.textDim}15` }} />

                {/* --- 3. BOTTOM STRIP (Compliance Badges) --- */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    gap: 3
                }}>
                    <Typography variant="body2" sx={{ color: currentColors.textDim }}>
                        © {new Date().getFullYear()} Melucra Inc. All rights reserved.
                    </Typography>
                    
                    {/* Trust Badges */}
                    <Stack direction="row" spacing={3} alignItems="center" sx={{ opacity: 0.8 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GppGood sx={{ fontSize: 16, color: currentColors.textDim }} />
                            <Typography variant="caption" fontWeight={700} color={currentColors.textDim}>
                                SOC 2 TYPE II READY
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Security sx={{ fontSize: 16, color: currentColors.textDim }} />
                            <Typography variant="caption" fontWeight={700} color={currentColors.textDim}>
                                ZERO TRUST ARCHITECTURE
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

            </Container>
        </Box>
    );
};

export default AppFooter;

