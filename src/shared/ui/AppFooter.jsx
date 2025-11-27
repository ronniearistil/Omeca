// 
// // src/components/ui/AppFooter.jsx
// import React, { useContext } from 'react';
// import {
//     Box, Container, Grid,
//     Typography, Button, Link
// } from '@mui/material';
// 
// // --- FIXED IMPORTS ---
// import { ColorModeContext } from '../layouts/theme/ThemeContext.jsx';
// import { colors } from '../layouts/theme/theme.js';
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

// src/shared/layouts/AppFooter.jsx

import React, { useContext } from 'react';
import {
    Box, Container, Grid,
    Typography, Link, Stack, Divider, Chip
} from '@mui/material';
import { Security, GppGood, Circle } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

import { ColorModeContext } from '../layouts/theme/ThemeContext.jsx'; // Adjust path as needed based on your folder structure
import { colors } from '../layouts/theme/theme.js'; // Adjust path as needed

import OmecaLogo from "../ui/OmecaLogo.jsx"; // Adjust path as needed

const AppFooter = () => {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === 'dark';
    const currentColors = colors[mode];
    const navigate = useNavigate();

    const footerLinks = [
        {
            title: 'The Trust Stack',
            links: [
                { name: 'Omeca Core (L1)', route: '/trust-stack' },
                { name: 'Omeca Ledger (L2)', route: '/trust-stack' },
                { name: 'Omeca Governance (L3)', route: '/trust-stack' },
                { name: 'Platform Pricing', route: '/pricing' },
            ]
        },
        {
            title: 'Company',
            links: [
                // ✅ FIXED ROUTE: Points to /company now
                { name: 'About Us', route: '/company' }, 
                { name: 'Careers', route: '/careers' },
                { name: 'Blog', route: '/blog' },
                { name: 'Contact Sales', route: '/contact' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Investor Brief', route: '/brief' },
                { name: 'Documentation', route: '/documentation' },
                { name: 'Security', route: '/security' },
            ]
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', route: '/privacy' },
                { name: 'Terms of Service', route: '/terms' },
                { name: 'Cookie Policy', route: '/cookies' },
            ]
        }
    ];

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: currentColors.bgTop,
                borderTop: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                pt: { xs: 8, md: 10 },
                pb: { xs: 4, md: 6 },
                position: 'relative',
                zIndex: 10
            }}
        >
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6, lg: 10 } }}>
                <Grid container spacing={{ xs: 6, md: 4 }}>

                    {/* LOGO + MISSION */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <Box
                                sx={{ 
                                    mb: 3, 
                                    display: "flex", 
                                    alignItems: "center", 
                                    cursor: "pointer",
                                    opacity: 0.9,
                                    transition: 'opacity 0.2s',
                                    '&:hover': { opacity: 1 }
                                }}
                                onClick={() => navigate('/')}
                            >
                                <OmecaLogo size={140} />
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: currentColors.textDim,
                                    maxWidth: "280px",
                                    lineHeight: 1.6,
                                    fontSize: '0.95rem',
                                    mb: 3
                                }}
                            >
                                Transforming ERPs from passive record-keeping to continuous, autonomous control.
                            </Typography>

                            <Stack direction="row" spacing={1}>
                                <Chip 
                                    icon={<Circle sx={{ fontSize: '8px !important', color: colors.successGreen }} />} 
                                    label="Systems Operational" 
                                    size="small"
                                    sx={{ 
                                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                        color: currentColors.textDim,
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        border: '1px solid',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                                    }} 
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    {/* NAVIGATION LINKS */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Grid container spacing={4} justifyContent={{ md: "flex-end" }}>
                            {footerLinks.map((section) => (
                                <Grid item xs={6} sm={3} key={section.title}>
                                    <Typography
                                        variant="overline"
                                        fontWeight={800}
                                        sx={{
                                            color: currentColors.textPrimary,
                                            display: 'block',
                                            mb: 3,
                                            letterSpacing: 1,
                                            fontSize: '0.75rem',
                                            opacity: 0.9
                                        }}
                                    >
                                        {section.title}
                                    </Typography>

                                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                        {section.links.map((link) => (
                                            <Box key={link.name} component="li" sx={{ mb: 1.5 }}>
                                                <Link
                                                    component="button"
                                                    onClick={() => navigate(link.route)}
                                                    underline="none"
                                                    sx={{
                                                        fontSize: '0.95rem',
                                                        color: currentColors.textDim,
                                                        textAlign: 'left',
                                                        fontWeight: 500,
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            color: colors.accent,
                                                            transform: 'translateX(4px)',
                                                        }
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

                <Divider sx={{ my: 6, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

                {/* BOTTOM ROW: Copyright + Compliance */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        gap: 3,
                    }}
                >
                    <Typography variant="body2" sx={{ color: currentColors.textDim, fontSize: '0.85rem' }}>
                        © {new Date().getFullYear()} Melucra Inc. All rights reserved.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <GppGood sx={{ fontSize: 18, color: currentColors.textDim }} />
                            <Typography variant="caption" fontWeight={600} sx={{ color: currentColors.textDim, letterSpacing: 0.5 }}>
                                SOC 2 TYPE II READY
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Security sx={{ fontSize: 18, color: currentColors.textDim }} />
                            <Typography variant="caption" fontWeight={600} sx={{ color: currentColors.textDim, letterSpacing: 0.5 }}>
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