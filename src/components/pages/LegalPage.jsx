// import React, { useContext } from 'react';
// import { Container, Box, Paper, Typography, Button, Link } from '@mui/material';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// // import { ColorModeContext } from '../theme/ThemeContext';
// // import { colors } from '../theme/theme';
// import { ColorModeContext } from '../components/theme/ThemeContext.js'; 
// import { colors } from '../components/theme/theme.js'; 
// 
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
// // --- Legal & Security Page (Dynamically serves all content) ---
// const LegalPage = ({ setPage, currentTarget }) => {
//     const { mode } = useContext(ColorModeContext);
//     const currentColors = colors[mode];
//     
//     // Function to generate the title based on the link clicked
//     const getPageTitle = (target) => {
//         switch (target) {
//             case 'privacy': return "Privacy Policy: Data Integrity";
//             case 'cookies': return "Cookie Policy";
//             case 'terms': return "Terms of Service";
//             case 'security': return "Security & Compliance Center";
//             default: return "Documentation & Compliance";
//         }
//     };
// 
//     const getPageContent = (target) => {
//         switch (target) {
//             case 'privacy': return "Our policy details how Melucra processes, stores, and protects customer data, adhering strictly to global financial and data privacy regulations (e.g., GDPR, CCPA). Data is tokenized and never sold.";
//             case 'cookies': return "We use essential cookies for platform performance and security, and optional analytics cookies to improve our services. You have full control over non-essential tracking.";
//             case 'terms': return "The definitive agreement governing your use of the Melucra API, Reconciliation Engine, and Ledger services.";
//             case 'security': return "Melucra maintains SOC 2 Type II compliance, employs Zero-Trust architecture, and utilizes immutable ledger technology to ensure unparalleled data authenticity and integrity.";
//             default: return "Access our comprehensive developer documentation, API references, and detailed compliance reports here.";
//         }
//     };
// 
// 
//     return (
//         <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     {getPageTitle(currentTarget)}
//                 </Typography>
//                 <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
//                     As an ERP provider, Melucra is committed to rigorous security, data integrity, and regulatory compliance.
//                 </Typography>
//             </motion.div>
// 
//             <Paper sx={{ p: 4, bgcolor: currentColors.card, border: `1px solid ${currentColors.textDim}22` }}>
//                 <Typography variant="h5" fontWeight={700} color={currentColors.textPrimary} sx={{ mb: 2 }}>
//                     {getPageTitle(currentTarget).toUpperCase()}
//                 </Typography>
//                 <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 3 }}>
//                     {getPageContent(currentTarget)}
//                 </Typography>
//                 <Link onClick={() => setPage('home')} sx={{ color: colors.accent, cursor: 'pointer', fontWeight: 700 }}>
//                     Return to Omeca Home
//                 </Link>
//             </Paper>
//         </Container>
//     );
// };
// 
// export default LegalPage;

// src/Omeca/pages/LegalPage.jsx (Conceptual File Path & Name Change)

import React, { useContext } from 'react';
import { Container, Box, Grid, Typography, Button, Paper, Link } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// Corrected path assumption
import { ColorModeContext } from '../../layouts/theme/ThemeContext.jsx'; 
import { colors } from '../../layouts/theme/theme.js'; 


const BackButton = ({ setPage, currentColors }) => (
    <Button
        startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
        onClick={() => setPage('home')}
        sx={{ mt: 4, mb: 2, color: currentColors.textDim, textTransform: 'none', '&:hover': { color: colors.accent } }}
    >
        Back to Home
    </Button>
);

// --- Legal & Security Page (Dynamically serves all content) ---
const OmecaLegalPage = ({ setPage, currentTarget }) => { // RENAMED COMPONENT
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];
    
    // Function to generate the title based on the link clicked
    const getPageTitle = (target) => {
        switch (target) {
            case 'privacy': return "Privacy Policy: Data Integrity";
            case 'cookies': return "Cookie Policy";
            case 'terms': return "Terms of Service";
            case 'security': return "Security & Compliance Center";
            default: return "Documentation & Compliance";
        }
    };

    const getPageContent = (target) => {
        switch (target) {
            case 'privacy': return "Our policy details how Omeca processes, stores, and protects customer data, adhering strictly to global financial and data privacy regulations (e.g., GDPR, CCPA). Data is tokenized and never sold."; // UNIFIED BRAND
            case 'cookies': return "We use essential cookies for platform performance and security, and optional analytics cookies to improve our services. You have full control over non-essential tracking.";
            case 'terms': return "The definitive agreement governing your use of the Omeca API, Reconciliation Engine, and Ledger services."; // UNIFIED BRAND
            case 'security': return "Omeca maintains SOC 2 Type II compliance, employs Zero-Trust architecture, and utilizes immutable ledger technology to ensure unparalleled data authenticity and integrity."; // UNIFIED BRAND
            default: return "Access our comprehensive developer documentation, API references, and detailed compliance reports here.";
        }
    };


    return (
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <BackButton setPage={setPage} currentColors={currentColors} />
                <Typography variant="h3" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 2 }}>
                    {getPageTitle(currentTarget)}
                </Typography>
                <Typography variant="h6" color={currentColors.textDim} sx={{ mb: 6 }}>
                    As an ERP provider, Omeca is committed to rigorous security, data integrity, and regulatory compliance. {/* UNIFIED BRAND */}
                </Typography>
            </motion.div>

            <Paper sx={{ p: 4, bgcolor: currentColors.card, border: `1px solid ${currentColors.textDim}22` }}>
                <Typography variant="h5" fontWeight={700} color={currentColors.textPrimary} sx={{ mb: 2 }}>
                    {getPageTitle(currentTarget).toUpperCase()}
                </Typography>
                <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 3 }}>
                    {getPageContent(currentTarget)}
                </Typography>
                <Link onClick={() => setPage('home')} sx={{ color: colors.accent, cursor: 'pointer', fontWeight: 700 }}>
                    Return to Omeca Home
                </Link>
            </Paper>
        </Container>
    );
};

export default OmecaLegalPage; // RENAMED EXPORT