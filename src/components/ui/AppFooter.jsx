// // src/components/ui/AppFooter.jsx
// import React, { useContext } from 'react';
// import {
//     Box, Container, Grid,
//     Typography, Button, Link
// } from '@mui/material';
// 
// // Import dependencies from their locations based on your tree structure
// import { ColorModeContext } from '../../layouts/theme/ThemeContext'; // Path to your context
// import { colors } from '../../layouts/theme/theme'; // Path to your theme colors/tokens
// import OmecaLogoComponent from './OmecaLogo'; // Path to your logo component
// 
// /**
//  * The application's footer component. Displays navigation links, company info, and legal details.
//  * @param {object} props - Component props.
//  * @param {function} props.setPage - Callback function provided by the parent to handle page navigation.
//  */
// const AppFooter = ({ setPage }) => {
//     // Access the current theme mode ('light' or 'dark') from the context
//     const { mode } = useContext(ColorModeContext);
//     // Get the specific color palette for the current mode
//     const currentColors = colors[mode];
// 
//     // Define the structure and content for the footer links
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
//                 { name: 'Blog', target: 'about' }, // Blog currently points to About
//                 { name: 'Contact', target: 'contact' }
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
//     ];
// 
//     return (
//         <Box sx={{ bgcolor: currentColors.bgTop, borderTop: `1px solid ${currentColors.textDim}22` }}>
//             {/* Upper Call-to-Action (CTA) Section */}
//             <Box sx={{ py: 8, textAlign: 'center', background: `linear-gradient(180deg, ${currentColors.bgGradB}44, ${currentColors.bgTop})` }}>
//                 <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>
//                     Ready to make autonomous systems explainable and trusted?
//                 </Typography>
//                 <Typography sx={{ color: currentColors.textDim, mt: 1, mb: 4, maxWidth: '600px', mx: 'auto' }}>
//                     Adopt the Explainability Core that turns machine activity into transparent, verifiable financial records.
//                 </Typography>
// 
//                 {/* CTA Buttons */}
//                 <Button
//                     variant="contained"
//                     size="large"
//                     sx={{
//                         mt: 1, mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, px: 4, py: 1.2,
//                         fontWeight: 800, textTransform: 'none',
//                         bgcolor: colors.accent, color: currentColors.bgTop, // Use specific colors for branding consistency
//                         '&:hover': { bgcolor: colors.accentHover }
//                     }}
//                     onClick={() => setPage('contact')} // Navigate using the passed function
//                 >
//                     Book Audit Strategy Session &rarr;
//                 </Button>
//                 <Button
//                     variant="outlined"
//                     size="large"
//                     sx={{
//                         mt: 1, px: 4, py: 1.2, fontWeight: 700, textTransform: 'none',
//                         borderColor: currentColors.textDim, color: currentColors.textDim, // Use theme-dependent colors
//                         '&:hover': { bgcolor: `${currentColors.textDim}1A` }
//                     }}
//                     onClick={() => setPage('documentation')} // Navigate using the passed function
//                 >
//                     View Documentation &rarr;
//                 </Button>
//             </Box>
// 
//             {/* Main Footer Links Area */}
//             <Container maxWidth="lg" sx={{ pt: 6, pb: 4 }}>
//                 <Grid container spacing={4}>
//                     {/* Company Info Column */}
//                     <Grid item xs={12} md={4}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
//                             <OmecaLogoComponent size={32} />
//                             <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>MELUCRA</Typography>
//                         </Box>
//                         <Typography
//                             variant="body1" // Adjusted for better visual hierarchy
//                             sx={{ mt: 2, color: currentColors.textDim }}
//                         >
//                             The Explainable System of Record for the Machine Economy.
//                         </Typography>
//                     </Grid>
// 
//                     {/* Footer Link Columns */}
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
//                                                 component="button" // Render as button for interaction
//                                                 key={link.name}
//                                                 onClick={() => setPage(link.target)}
//                                                 underline="none"
//                                                 sx={{
//                                                     display: 'block', mb: 1, p: 0, // Reset button styles
//                                                     color: currentColors.textDim, textAlign: 'left', // Ensure alignment
//                                                     '&:hover': { color: colors.accent, cursor: 'pointer' }
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
//                 {/* Compliance Bar & Copyright Notice */}
//                 <Box sx={{ borderTop: `1px solid ${currentColors.textDim}22`, mt: 6, pt: 3, textAlign: 'center' }}>
//                     {/* Compliance text */}
//                     <Box
//                         sx={{
//                             mb: 2, // Space between compliance and copyright
//                             color: currentColors.textDim,
//                             fontSize: '0.8rem',
//                             letterSpacing: 0.5,
//                             opacity: 0.8,
//                         }}
//                     >
//                         SOC 2 • GDPR • CCPA • Immutable Ledger Verified • Zero Trust Architecture
//                     </Box>
//                     {/* Copyright */}
//                     <Typography variant="caption" sx={{ color: currentColors.textDim }}>
//                         &copy; {new Date().getFullYear()} Melucra. All rights reserved.
//                     </Typography>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };
// 
// export default AppFooter;

// // src/components/ui/AppFooter.jsx
// import React, { useContext } from 'react';
// import {
//     Box, Container, Grid,
//     Typography, Button, Link
// } from '@mui/material';
// 
// // --- FIXED IMPORTS ---
// // Must include .jsx / .js extensions for Vite
// import { ColorModeContext } from '../../layouts/theme/ThemeContext.jsx';
// import { colors } from '../../layouts/theme/theme.js';
// 
// // Correct location of the only logo component in your project
// import OmecaLogoComponent
//   from '../../omeca-governance/components/ui/OmecaGovernanceLogo.jsx';
// 
// /**
//  * The application's footer component. Displays navigation links, company info, and legal details.
//  * @param {object} props - Component props.
//  * @param {function} props.setPage - Callback function provided by the parent to handle page navigation.
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
//                 { name: 'Contact', target: 'contact' }
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
//     ];
// 
//     return (
//         <Box sx={{ bgcolor: currentColors.bgTop, borderTop: `1px solid ${currentColors.textDim}22` }}>
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
//                         mt: 1, mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 }, px: 4, py: 1.2,
//                         fontWeight: 800, textTransform: 'none',
//                         bgcolor: colors.accent, color: currentColors.bgTop,
//                         '&:hover': { bgcolor: colors.accentHover }
//                     }}
//                     onClick={() => setPage('contact')}
//                 >
//                     Book Audit Strategy Session &rarr;
//                 </Button>
// 
//                 <Button
//                     variant="outlined"
//                     size="large"
//                     sx={{
//                         mt: 1, px: 4, py: 1.2, fontWeight: 700, textTransform: 'none',
//                         borderColor: currentColors.textDim, color: currentColors.textDim,
//                         '&:hover': { bgcolor: `${currentColors.textDim}1A` }
//                     }}
//                     onClick={() => setPage('documentation')}
//                 >
//                     View Documentation &rarr;
//                 </Button>
//             </Box>
// 
//             <Container maxWidth="lg" sx={{ pt: 6, pb: 4 }}>
//                 <Grid container spacing={4}>
//                     <Grid item xs={12} md={4}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
//                             <OmecaLogoComponent size={32} />
//                             <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>
//                                 MELUCRA
//                             </Typography>
//                         </Box>
// 
//                         <Typography variant="body1" sx={{ mt: 2, color: currentColors.textDim }}>
//                             The Explainable System of Record for the Machine Economy.
//                         </Typography>
//                     </Grid>
// 
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
//                                                 component="button"
//                                                 key={link.name}
//                                                 onClick={() => setPage(link.target)}
//                                                 underline="none"
//                                                 sx={{
//                                                     display: 'block', mb: 1,
//                                                     color: currentColors.textDim, textAlign: 'left',
//                                                     '&:hover': { color: colors.accent, cursor: 'pointer' }
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
//                 <Box sx={{ borderTop: `1px solid ${currentColors.textDim}22`, mt: 6, pt: 3, textAlign: 'center' }}>
//                     <Box
//                         sx={{
//                             mb: 2,
//                             color: currentColors.textDim,
//                             fontSize: '0.8rem',
//                             letterSpacing: 0.5,
//                             opacity: 0.8,
//                         }}
//                     >
//                         SOC 2 • GDPR • CCPA • Immutable Ledger Verified • Zero Trust Architecture
//                     </Box>
// 
//                     <Typography variant="caption" sx={{ color: currentColors.textDim }}>
//                         &copy; {new Date().getFullYear()} Melucra. All rights reserved.
//                     </Typography>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };
// 
// export default AppFooter;
// src/components/ui/AppFooter.jsx
import React, { useContext } from 'react';
import {
    Box, Container, Grid,
    Typography, Button, Link
} from '@mui/material';

// --- FIXED IMPORTS ---
import { ColorModeContext } from '../../layouts/theme/ThemeContext.jsx';
import { colors } from '../../layouts/theme/theme.js';
import OmecaLogo from "../ui/OmecaLogo.jsx";


// --- RESTORED LOGO COMPONENT (works exactly like original) ---
// const OmecaLogoComponent = ({ size = 36 }) => (
//     <img
//         src="/assets/omeca-logo.png"
//         alt="OMECA Logo"
//         width={size}
//         height={size}
//         style={{ display: 'block' }}
//     />
// );

/**
 * Footer component for Omeca Landing
 */
const AppFooter = ({ setPage }) => {
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];

    const footerLinks = [
        {
            title: 'Products',
            links: [
                { name: 'Ledger API', target: 'ledger' },
                { name: 'Reconciliation', target: 'reconciliation' },
                { name: 'Margin Alerts', target: 'alerts' },
                { name: 'Pricing', target: 'pricing' }
            ]
        },
        {
            title: 'Company',
            links: [
                { name: 'About', target: 'about' },
                { name: 'Careers', target: 'careers' },
                { name: 'Blog', target: 'about' },
                { name: 'Contact', target: 'contact' },
                { name: 'Investor Brief', target: 'brief' }
            ]
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', target: 'privacy' },
                { name: 'Cookies', target: 'cookies' },
                { name: 'Terms of Service', target: 'terms' },
                { name: 'Security', target: 'security' }
            ]
        },
                {
            title: 'Investor Relations',
            links: [
                { name: 'Investor Brief', target: 'brief' }
            ]
        },
        
    ];


    return (
        <Box sx={{ bgcolor: currentColors.bgTop, borderTop: `1px solid ${currentColors.textDim}22` }}>
            
            {/* TOP CTA SECTION */}
            <Box sx={{ py: 8, textAlign: 'center', background: `linear-gradient(180deg, ${currentColors.bgGradB}44, ${currentColors.bgTop})` }}>
                <Typography variant="h5" fontWeight={900} color={currentColors.textPrimary}>
                    Ready to make autonomous systems explainable and trusted?
                </Typography>
                <Typography sx={{ color: currentColors.textDim, mt: 1, mb: 4, maxWidth: '600px', mx: 'auto' }}>
                    Adopt the Explainability Core that turns machine activity into transparent, verifiable financial records.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        mt: 1, mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 },
                        px: 4, py: 1.2,
                        fontWeight: 800, textTransform: 'none',
                        bgcolor: colors.accent, color: currentColors.bgTop,
                        '&:hover': { bgcolor: colors.accentHover },
                    }}
                    onClick={() => setPage('contact')}
                >
                    Book Audit Strategy Session →
                </Button>

                <Button
                    variant="outlined"
                    size="large"
                    sx={{
                        mt: 1, px: 4, py: 1.2,
                        fontWeight: 700, textTransform: 'none',
                        borderColor: currentColors.textDim,
                        color: currentColors.textDim,
                        '&:hover': { bgcolor: `${currentColors.textDim}1A` },
                    }}
                    onClick={() => setPage('documentation')}
                >
                    View Documentation →
                </Button>
            </Box>

            {/* MAIN FOOTER CONTENT */}
            <Container maxWidth="lg" sx={{ pt: 6, pb: 4 }}>
                <Grid container spacing={4}>
                    
                    {/* LOGO + DESCRIPTION */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                            {/* <OmecaLogoComponent size={32} /> */}
                            <OmecaLogo size={90} />

                            <Typography variant="h6" fontWeight={800} color={currentColors.textPrimary}>
                                {/* MELUCRA */}
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ mt: 2, color: currentColors.textDim }}>
                            The Explainable System of Record for the Machine Economy.
                        </Typography>
                    </Grid>

                    {/* NAV LINK COLUMNS */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={4}>
                            {footerLinks.map((section) => (
                                <Grid item xs={6} sm={4} key={section.title}>
                                    <Typography variant="subtitle1" fontWeight={700} color={currentColors.textPrimary} sx={{ mb: 2 }}>
                                        {section.title}
                                    </Typography>
                                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                        {section.links.map((link) => (
                                            <Link
                                                key={link.name}
                                                component="button"
                                                underline="none"
                                                onClick={() => setPage(link.target)}
                                                sx={{
                                                    display: 'block',
                                                    mb: 1,
                                                    color: currentColors.textDim,
                                                    textAlign: 'left',
                                                    '&:hover': { color: colors.accent },
                                                }}
                                            >
                                                <Typography variant="body2">{link.name}</Typography>
                                            </Link>
                                        ))}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                {/* BOTTOM STRIP */}
                <Box sx={{ borderTop: `1px solid ${currentColors.textDim}22`, mt: 6, pt: 3, textAlign: 'center' }}>
                    <Box sx={{ mb: 2, color: currentColors.textDim, fontSize: '0.8rem', opacity: 0.8 }}>
                        SOC 2 • GDPR • CCPA • Immutable Ledger Verified • Zero Trust Architecture
                    </Box>
                    <Typography variant="caption" sx={{ color: currentColors.textDim }}>
                        © {new Date().getFullYear()} Melucra. All rights reserved.
                    </Typography>
                </Box>

            </Container>
        </Box>
    );
};

export default AppFooter;

