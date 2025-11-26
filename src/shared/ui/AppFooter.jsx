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

import React, { useContext } from 'react';
import {
    Box, Container, Grid,
    Typography, Button, Link, Stack, Divider
} from '@mui/material';
import { ArrowForward, Security, GppGood } from '@mui/icons-material';

// import { ColorModeContext } from '../layouts/theme/ThemeContext.jsx';
// import { colors } from '../layouts/theme/theme.js';
import { ColorModeContext } from '../layouts/theme/ThemeContext.jsx';
import { colors } from '../layouts/theme/theme.js';

import OmecaLogo from "../ui/OmecaLogo.jsx";

const AppFooter = ({ setPage }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];
    const isDark = mode === 'dark';

    // 🔗 FULL NAVIGATION MAP (ALL LINKS RESTORED)
    const footerLinks = [
        {
            title: 'The Trust Stack',
            links: [
                { name: 'Omeca Core (L1)', target: 'trust-stack' },
                { name: 'Omeca Ledger (L2)', target: 'trust-stack' },
                { name: 'Omeca Governance (L3)', target: 'trust-stack' },
                { name: 'Platform Pricing', target: 'pricing' },
            ]
        },
        {
            title: 'Company',
            links: [
                { name: 'About Us', target: 'about' },
                { name: 'Careers', target: 'careers' },
                { name: 'Blog', target: 'blog' },
                { name: 'Contact Sales', target: 'contact' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Investor Brief', target: 'brief' },
                { name: 'Documentation', target: 'documentation' },
                { name: 'Security', target: 'security' },
            ]
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', target: 'privacy' },
                { name: 'Terms of Service', target: 'terms' },
                { name: 'Cookie Policy', target: 'cookies' },
            ]
        }
    ];

    return (
        <Box
            sx={{
                bgcolor: currentColors.bgTop,
                borderTop: `1px solid ${currentColors.textDim}15`,
                // pt: { xs: 6, md: 8 },
                // pb: { xs: 4, md: 6 },
                pt: { xs: 5, md: 7 },
                pb: { xs: 3, md: 5 },

            }}
        >
<Container maxWidth={false} sx={{ px: { xs: 3, md: 6 }, maxWidth: "1600px", mx: "auto" }}>
                {/* <Grid container spacing={4}> */}
<Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
                    <Grid item xs={12} md={3}>
    <Box
        sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",         // ← vertically center to The Trust Stack
        }}
    >
        <Box
            sx={{
                mb: 2,
                display: "flex",
                alignItems: "flex-start",       // ← aligns logo left with first column
                cursor: "pointer",
            }}
            onClick={() => setPage('home')}
        >
            <OmecaLogo size={160} />
        </Box>

        <Typography
            variant="body2"
            sx={{
                color: currentColors.textDim,
                maxWidth: "260px",
                lineHeight: 1.5,
                mt: 0,                           // tighter
            }}
        >
            Transforming ERPs from passive  
            record-keeping to continuous,  
            autonomous control.
        </Typography>
    </Box>
</Grid>


                    {/* RIGHT SIDE — NAV COLUMNS */}
                    <Grid item xs={12} md={9}>
<Grid container spacing={4} alignItems="center">
                            {footerLinks.map((section) => (
                                <Grid item xs={6} sm={3} key={section.title}>
                                    <Typography
                                        variant="overline"
                                        fontWeight={700}
                                        sx={{
                                            color: currentColors.textDim,
                                            display: 'block',
                                            mb: 2,
                                            letterSpacing: 1.2,
                                        }}
                                    >
                                        {section.title}
                                    </Typography>

                                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                        {section.links.map((link) => (
                                            <Box key={link.name} component="li" sx={{ mb: 1.4 }}>
                                                <Link
                                                    underline="none"
                                                    component="button"
                                                    onClick={() => setPage(link.target)}
                                                    sx={{
                                                        fontSize: '0.9rem',
                                                        color: currentColors.textPrimary,
                                                        textAlign: 'left',
                                                        // '&:hover': { color: colors.accent },
                                                        '&:hover': { 
  color: colors.accent, 
  transform: 'translateX(2px)', 
  transition: 'all 0.2s ease' 
},

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

                {/* DIVIDER */}
                <Divider
                    sx={{
                        my: 4,
                        borderColor: `${currentColors.textDim}15`
                    }}
                />

                {/* BOTTOM — LEGAL & SECURITY BADGES */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // gap: 3,
                        gap: { xs: 2, md: 3 },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ color: currentColors.textDim }}
                    >
                        © {new Date().getFullYear()} Melucra Inc. All rights reserved.
                    </Typography>

                    <Stack direction="row" spacing={3} alignItems="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GppGood sx={{ fontSize: 17, color: currentColors.textDim }} />
                            <Typography variant="caption" sx={{ color: currentColors.textDim }}>
                                SOC 2 TYPE II READY
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Security sx={{ fontSize: 17, color: currentColors.textDim }} />
                            <Typography variant="caption" sx={{ color: currentColors.textDim }}>
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
