// src/shared/layouts/AppFooter.jsx

// import React, { useContext } from 'react';
// import {
//     Box, Container, Grid,
//     Typography, Link, Stack, Divider, Chip
// } from '@mui/material';
// import { Security, GppGood, Circle } from '@mui/icons-material';
// import { useNavigate } from "react-router-dom";
// 
// import { ColorModeContext } from '../layouts/theme/ThemeContext.jsx'; // Adjust path as needed based on your folder structure
// import { colors } from '../layouts/theme/theme.js'; // Adjust path as needed
// 
// import OmecaLogo from "../ui/OmecaLogo.jsx"; // Adjust path as needed
// 
// const AppFooter = () => {
//     const { mode } = useContext(ColorModeContext);
//     const isDark = mode === 'dark';
//     const currentColors = colors[mode];
//     const navigate = useNavigate();
// 
//     const footerLinks = [
//         {
//             title: 'The Trust Stack',
//             links: [
//                 { name: 'Omeca Core (L1)', route: '/trust-stack' },
//                 { name: 'Omeca Ledger (L2)', route: '/trust-stack' },
//                 { name: 'Omeca Governance (L3)', route: '/trust-stack' },
//                 { name: 'Platform Pricing', route: '/pricing' },
//             ]
//         },
//         {
//             title: 'Company',
//             links: [
//                 // ✅ FIXED ROUTE: Points to /company now
//                 { name: 'About Us', route: '/company' }, 
//                 { name: 'Careers', route: '/careers' },
//                 { name: 'Blog', route: '/blog' },
//                 { name: 'Contact Sales', route: '/contact' },
//             ]
//         },
//         {
//             title: 'Resources',
//             links: [
//                 { name: 'Investor Brief', route: '/brief' },
//                 { name: 'Documentation', route: '/documentation' },
//                 { name: 'Security', route: '/security' },
//             ]
//         },
//         {
//             title: 'Legal',
//             links: [
//                 { name: 'Privacy Policy', route: '/privacy' },
//                 { name: 'Terms of Service', route: '/terms' },
//                 { name: 'Cookie Policy', route: '/cookies' },
//             ]
//         }
//     ];
// 
//     return (
//         <Box
//             component="footer"
//             sx={{
//                 bgcolor: currentColors.bgTop,
//                 borderTop: '1px solid',
//                 borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
//                 pt: { xs: 8, md: 10 },
//                 pb: { xs: 4, md: 6 },
//                 position: 'relative',
//                 zIndex: 10
//             }}
//         >
//             <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6, lg: 10 } }}>
//                 <Grid container spacing={{ xs: 6, md: 4 }}>
// 
//                     {/* LOGO + MISSION */}
//                     <Grid item xs={12} md={4} lg={3}>
//                         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
//                             <Box
//                                 sx={{ 
//                                     mb: 3, 
//                                     display: "flex", 
//                                     alignItems: "center", 
//                                     cursor: "pointer",
//                                     opacity: 0.9,
//                                     transition: 'opacity 0.2s',
//                                     '&:hover': { opacity: 1 }
//                                 }}
//                                 onClick={() => navigate('/')}
//                             >
//                                 <OmecaLogo size={140} />
//                             </Box>
// 
//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     color: currentColors.textDim,
//                                     maxWidth: "280px",
//                                     lineHeight: 1.6,
//                                     fontSize: '0.95rem',
//                                     mb: 3
//                                 }}
//                             >
//                                 Transforming ERPs from passive record-keeping to continuous, autonomous control.
//                             </Typography>
// 
//                             <Stack direction="row" spacing={1}>
//                                 <Chip 
//                                     icon={<Circle sx={{ fontSize: '8px !important', color: colors.successGreen }} />} 
//                                     label="Systems Operational" 
//                                     size="small"
//                                     sx={{ 
//                                         bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
//                                         color: currentColors.textDim,
//                                         fontSize: '0.7rem',
//                                         fontWeight: 600,
//                                         border: '1px solid',
//                                         borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
//                                     }} 
//                                 />
//                             </Stack>
//                         </Box>
//                     </Grid>
// 
//                     {/* NAVIGATION LINKS */}
//                     <Grid item xs={12} md={8} lg={9}>
//                         <Grid container spacing={4} justifyContent={{ md: "flex-end" }}>
//                             {footerLinks.map((section) => (
//                                 <Grid item xs={6} sm={3} key={section.title}>
//                                     <Typography
//                                         variant="overline"
//                                         fontWeight={800}
//                                         sx={{
//                                             color: currentColors.textPrimary,
//                                             display: 'block',
//                                             mb: 3,
//                                             letterSpacing: 1,
//                                             fontSize: '0.75rem',
//                                             opacity: 0.9
//                                         }}
//                                     >
//                                         {section.title}
//                                     </Typography>
// 
//                                     <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
//                                         {section.links.map((link) => (
//                                             <Box key={link.name} component="li" sx={{ mb: 1.5 }}>
//                                                 <Link
//                                                     component="button"
//                                                     onClick={() => navigate(link.route)}
//                                                     underline="none"
//                                                     sx={{
//                                                         fontSize: '0.95rem',
//                                                         color: currentColors.textDim,
//                                                         textAlign: 'left',
//                                                         fontWeight: 500,
//                                                         transition: 'all 0.2s ease',
//                                                         '&:hover': {
//                                                             color: colors.accent,
//                                                             transform: 'translateX(4px)',
//                                                         }
//                                                     }}
//                                                 >
//                                                     {link.name}
//                                                 </Link>
//                                             </Box>
//                                         ))}
//                                     </Box>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </Grid>
//                 </Grid>
// 
//                 <Divider sx={{ my: 6, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
// 
//                 {/* BOTTOM ROW: Copyright + Compliance */}
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column-reverse', md: 'row' },
//                         justifyContent: 'space-between',
//                         alignItems: { xs: 'flex-start', md: 'center' },
//                         gap: 3,
//                     }}
//                 >
//                     <Typography variant="body2" sx={{ color: currentColors.textDim, fontSize: '0.85rem' }}>
//                         © {new Date().getFullYear()} Melucra Inc. All rights reserved.
//                     </Typography>
// 
//                     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                             <GppGood sx={{ fontSize: 18, color: currentColors.textDim }} />
//                             <Typography variant="caption" fontWeight={600} sx={{ color: currentColors.textDim, letterSpacing: 0.5 }}>
//                                 SOC 2 TYPE II READY
//                             </Typography>
//                         </Box>
// 
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                             <Security sx={{ fontSize: 18, color: currentColors.textDim }} />
//                             <Typography variant="caption" fontWeight={600} sx={{ color: currentColors.textDim, letterSpacing: 0.5 }}>
//                                 ZERO TRUST ARCHITECTURE
//                             </Typography>
//                         </Box>
//                     </Stack>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };
// 
// export default AppFooter;

import React, { useContext } from 'react';
import {
    Box, Container, Grid,
    Typography, Link, Stack, Divider, Chip, alpha
} from '@mui/material';
import { Security, GppGood, Circle } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

import { ColorModeContext } from '../layouts/theme/ThemeContext.jsx'; 
import { colors } from '../layouts/theme/theme.js'; 
import OmecaLogo from "../ui/OmecaLogo.jsx"; 

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
                { name: 'About Us', route: '/company' }, 
                { name: 'Careers', route: '/careers' },
                { name: 'Blog', route: '/blog' },
                { name: 'Contact Sales', route: '/contact' },
            ]
        },
        {
            title: 'Resources',
            links: [
                // { name: 'Investor Brief', route: '/brief' },
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
                bgcolor: isDark ? '#0B1120' : currentColors.bgTop, // Darker footer for contrast
                borderTop: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                pt: { xs: 8, md: 10 },
                pb: { xs: 4, md: 6 },
                position: 'relative',
                zIndex: 10
            }}
        >
            {/* Subtle Gradient Glow at top */}
            <Box sx={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '60%', height: '1px',
                background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                opacity: 0.3
            }} />

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
                                    fontSize: '0.9rem',
                                    mb: 3
                                }}
                            >
                                Transforming ERPs from passive record-keeping to continuous, autonomous control.
                            </Typography>

                            {/* Live Status Indicator */}
                            <Chip 
                                icon={
                                    <Box sx={{ position: 'relative', display: 'flex', width: 8, height: 8, ml: 0.5 }}>
                                        <Box sx={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', bgcolor: colors.successGreen, opacity: 0.7, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                                        <Box sx={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', bgcolor: colors.successGreen }} />
                                        <style>{`@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
                                    </Box>
                                } 
                                label="All Systems Operational" 
                                size="small"
                                sx={{ 
                                    bgcolor: isDark ? 'rgba(46, 204, 64, 0.05)' : 'rgba(0,0,0,0.03)',
                                    color: colors.successGreen,
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    border: '1px solid',
                                    borderColor: isDark ? 'rgba(46, 204, 64, 0.2)' : 'rgba(0,0,0,0.1)',
                                    pl: 0.5
                                }} 
                            />
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
                                            fontSize: '0.7rem',
                                            opacity: 0.8
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
                                                        fontSize: '0.9rem',
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

                <Divider sx={{ my: 6, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />

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
                    <Typography variant="body2" sx={{ color: currentColors.textDim, fontSize: '0.8rem', opacity: 0.7 }}>
                        © {new Date().getFullYear()} Melucra Inc. All rights reserved.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GppGood sx={{ fontSize: 16, color: colors.lucraGold }} />
                            <Typography variant="caption" fontWeight={700} sx={{ color: currentColors.textDim, letterSpacing: 0.5, fontSize: '0.7rem' }}>
                                SOC 2 TYPE II READY
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Security sx={{ fontSize: 16, color: colors.accent }} />
                            <Typography variant="caption" fontWeight={700} sx={{ color: currentColors.textDim, letterSpacing: 0.5, fontSize: '0.7rem' }}>
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