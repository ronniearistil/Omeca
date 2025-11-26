// import React, { useState, useContext, useMemo } from 'react';
// import { 
//     Container, Box, Typography, Button, Paper, TextField, Grid, Link, 
//     FormControl, InputLabel, Select, MenuItem, FormHelperText 
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
// 
// // import { ColorModeContext } from '../components/theme/ThemeContext.js'; 
// import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
// 
// import { colors } from '../components/theme/theme.js'; 
// 
// 
// // =================================================================
// // UTILITY & HELPER LOGIC (DRY, outside the main component)
// // =================================================================
// 
// // --- BackButton (DRY) ---
// const BackButton = ({ setPage, currentColors }) => (
//     <Button
//         startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
//         onClick={() => setPage('home')}
//         sx={{
//             mt: 4, mb: 2, color: currentColors.textDim, textTransform: 'none',
//             fontWeight: 500, '&:hover': { color: colors.accent }
//         }}
//     >
//         Back to Home
//     </Button>
// );
// 
// // --- Form Definitions (DRY) ---
// const INDUSTRY_OPTIONS = [
//     'Financial Services', 'Technology & SaaS', 'E-commerce & Retail', 
//     'Manufacturing & IoT', 'Logistics & Supply Chain', 'Other'
// ];
// 
// const INITIAL_FORM_DATA = { 
//     firstName: '', lastName: '', company: '', 
//     industry: '', email: '', query: '' 
// };
// 
// // --- Custom Form Hook (DRY) ---
// const useContactForm = (setFormSubmitted) => {
//     const [formData, setFormData] = useState(INITIAL_FORM_DATA);
//     const [errors, setErrors] = useState({});
// 
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 
//     const validateForm = () => {
//         let newErrors = {};
//         if (!formData.firstName) newErrors.firstName = 'Required.';
//         if (!formData.lastName) newErrors.lastName = 'Required.';
//         if (!formData.company) newErrors.company = 'Required.';
//         if (!formData.email) newErrors.email = 'Required.';
//         else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email.';
//         if (!formData.query) newErrors.query = 'Required.';
//         if (!formData.industry) newErrors.industry = 'Required.';
// 
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
// 
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name]) {
//             setErrors(prev => ({ ...prev, [name]: '' }));
//         }
//     };
// 
//     const handleContactSubmit = (e) => {
//         e.preventDefault(); 
//         if (!validateForm()) return;
// 
//         console.log('Contact Form Submitted:', formData);
//         setFormData(INITIAL_FORM_DATA);
//         setErrors({}); 
//         setFormSubmitted(true);
//         setTimeout(() => setFormSubmitted(false), 5000);
//     };
// 
//     return { formData, errors, handleInputChange, handleContactSubmit };
// };
// 
// 
// // =================================================================
// // REFACTORED CONTACT PAGE COMPONENT
// // =================================================================
// 
// const ContactPage = ({ setPage }) => {
//     const { mode } = useContext(ColorModeContext);
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     
//     const { formData, errors, handleInputChange, handleContactSubmit } = useContactForm(setFormSubmitted);
//     const currentColors = colors[mode];
// 
//     // Consolidated and fixed input styles for better contrast and appearance
//     const inputStyles = useMemo(() => ({
//         '& .MuiOutlinedInput-root': { 
//             // Fixes typing issue: ensures the input area itself is readable
//             bgcolor: mode === 'dark' ? currentColors.bgTop : currentColors.bgGradA, 
//             color: currentColors.textPrimary,
//             borderRadius: 1.5,
//             transition: 'border-color 0.3s',
//             // Fix: Ensures dark mode text contrast is good
//             '& fieldset': { borderColor: `${currentColors.textDim}44` }, 
//             '&.Mui-focused fieldset': { borderColor: colors.accent, borderWidth: '2px' },
//         },
//         '& .MuiInputLabel-root': { color: currentColors.textDim }
//     }), [mode, currentColors]);
// 
//     // Define all non-submit fields in a single array for mapping
//     const formFields = [
//         { name: 'firstName', label: 'First Name', grid: 6 },
//         { name: 'lastName', label: 'Last Name', grid: 6 },
//         { name: 'email', label: 'Work Email', type: 'email', grid: 6 },
//         { name: 'company', label: 'Company Name', grid: 6 },
//         { name: 'industry', label: 'Industry', grid: 12, select: true },
//         { name: 'query', label: 'Use Case/Query', multiline: true, rows: 3, grid: 12 },
//     ];
// 
// 
//     return (
//         <Container
//             maxWidth="sm" // Reduced max width for a less "too big" feel
//             sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop, minHeight: '80vh' }}
//         >
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <BackButton setPage={setPage} currentColors={currentColors} />
//                 <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 1, lineHeight: 1.1 }}>
//                     Book a Demo to See <span style={{ color: colors.lucraGold }}>Melucra</span>
//                 </Typography>
//                 <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 4 }}>
//                     See how we unify machine work, compute costs, and financial intelligence for your AI platform.
//                 </Typography>
//             </motion.div>
// 
//             <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }} 
//                 animate={{ opacity: 1, scale: 1 }} 
//                 transition={{ duration: 0.5, delay: 0.2 }}
//             >
//                 <Paper 
//                     elevation={8}
//                     sx={{ 
//                         p: { xs: 3, sm: 4 }, 
//                         bgcolor: currentColors.card, 
//                         borderRadius: 3, 
//                         border: `2px solid ${colors.accent}44`,
//                         boxShadow: mode === 'dark' ? `0 10px 30px rgba(0, 0, 0, 0.5)` : `0 5px 20px rgba(0,0,0,0.1)`,
//                     }}
//                 >
//                     {formSubmitted ? (
//                         <Box sx={{ textAlign: 'center', py: 6 }}>
//                             <CheckCircleOutlineRounded sx={{ fontSize: 72, color: colors.successGreen }} />
//                             <Typography variant="h5" fontWeight={800} color={colors.successGreen} sx={{ mt: 3, mb: 1 }}>
//                                 Request Confirmed.
//                             </Typography>
//                             <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 3 }}>
//                                 We'll be in touch shortly to schedule your live demonstration.
//                             </Typography>
//                             <Button variant="text" onClick={() => setPage('home')} sx={{ color: colors.accent, fontWeight: 700 }}>
//                                 Return Home &rarr;
//                             </Button>
//                         </Box>
//                     ) : (
//                         <Grid container spacing={2.5} component="form" onSubmit={handleContactSubmit}>
//                             {/* Renders all TextFields and Selects using a single loop */}
//                             {formFields.map(field => (
//                                 <Grid item xs={12} sm={field.grid} key={field.name}>
//                                     {field.select ? (
//                                         <FormControl fullWidth required error={!!errors[field.name]} sx={inputStyles}>
//                                             <InputLabel>{field.label}</InputLabel>
//                                             <Select
//                                                 label={field.label}
//                                                 name={field.name}
//                                                 value={formData[field.name]}
//                                                 onChange={handleInputChange}
//                                                 // Ensures Select uses the stylized input background
//                                                 inputProps={{ sx: { bgcolor: mode === 'dark' ? currentColors.bgTop : currentColors.bgGradA } }} 
//                                             >
//                                                 {INDUSTRY_OPTIONS.map((industry) => (
//                                                     <MenuItem key={industry} value={industry}>
//                                                         {industry}
//                                                     </MenuItem>
//                                                 ))}
//                                             </Select>
//                                             {!!errors[field.name] && <FormHelperText>{errors[field.name]}</FormHelperText>}
//                                         </FormControl>
//                                     ) : (
//                                         <TextField
//                                             fullWidth
//                                             label={field.label}
//                                             name={field.name}
//                                             type={field.type || 'text'}
//                                             value={formData[field.name]}
//                                             onChange={handleInputChange}
//                                             variant="outlined"
//                                             required
//                                             multiline={field.multiline}
//                                             rows={field.rows}
//                                             error={!!errors[field.name]}
//                                             helperText={errors[field.name]}
//                                             sx={inputStyles}
//                                         />
//                                     )}
//                                 </Grid>
//                             ))}
//                             
//                             {/* Submission/Alternative Contact Buttons */}
//                             <Grid item xs={12} sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
//                                 <Button
//                                     variant="contained"
//                                     size="large"
//                                     type="submit"
//                                     sx={{ 
//                                         bgcolor: colors.accent, 
//                                         color: currentColors.bgTop,
//                                         fontWeight: 700,
//                                         minWidth: 160,
//                                         '&:hover': { bgcolor: colors.accentHover } 
//                                     }}
//                                 >
//                                     Submit Request
//                                 </Button>
//                                 
//                                 <Typography variant="body2" color={currentColors.textDim}>
//                                     or
//                                 </Typography>
// 
//                                 <Button
//                                     variant="outlined"
//                                     size="large"
//                                     component={Link}
//                                     href="mailto:luca@meluca.com"
//                                     sx={{ 
//                                         color: colors.lucraGold, 
//                                         borderColor: colors.lucraGold,
//                                         textTransform: 'none', 
//                                         fontWeight: 600,
//                                         '&:hover': { borderColor: colors.lucraGold + 'AA', bgcolor: colors.lucraGold + '11' }
//                                     }}
//                                 >
//                                     Email us
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     )}
//                 </Paper>
//                 
//                 {/* Secondary Callout */}
//                 <Box sx={{ textAlign: 'center', mt: 5 }}>
//                     <Typography variant="body2" color={currentColors.textDim}>
//                         Need technical details? 
//                         <Link onClick={() => setPage('documentation')} underline="hover" sx={{ ml: 1, color: colors.accent, cursor: 'pointer', fontWeight: 600 }}>
//                             View Developer Docs
//                         </Link>
//                     </Typography>
//                 </Box>
//             </motion.div>
//         </Container>
//     );
// };
// 
// export default ContactPage;

import React, { useState, useContext, useMemo } from 'react';
import {
    Container, Box, Typography, Button, Paper, TextField, Grid, Link,
    FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';

// Corrected import paths
import { ColorModeContext } from "../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../shared/layouts/theme/theme.js";


// =================================================================
// UTILITY & HELPER LOGIC (DRY, outside the main component)
// =================================================================

// --- BackButton (DRY) ---
const BackButton = ({ setPage, currentColors }) => (
    <Button
        startIcon={<ArrowForwardIosRounded sx={{ transform: 'rotate(180deg)' }} />}
        onClick={() => setPage('home')}
        sx={{
            mt: 4, mb: 2, color: currentColors.textDim, textTransform: 'none',
            fontWeight: 500, '&:hover': { color: colors.accent }
        }}
    >
        Back to Home
    </Button>
);

// --- Form Definitions (DRY) ---
const INDUSTRY_OPTIONS = [
    'Financial Services', 'Technology & SaaS', 'E-commerce & Retail',
    'Manufacturing & IoT', 'Logistics & Supply Chain', 'Other'
];

const INITIAL_FORM_DATA = {
    firstName: '', lastName: '', company: '',
    industry: '', email: '', query: ''
};

// --- Custom Form Hook (DRY) ---
const useContactForm = (setFormSubmitted) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'Required.';
        if (!formData.lastName) newErrors.lastName = 'Required.';
        if (!formData.company) newErrors.company = 'Required.';
        if (!formData.email) newErrors.email = 'Required.';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email.';
        if (!formData.query) newErrors.query = 'Required.';
        if (!formData.industry) newErrors.industry = 'Required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log('Contact Form Submitted:', formData);
        setFormData(INITIAL_FORM_DATA);
        setErrors({});
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
    };

    return { formData, errors, handleInputChange, handleContactSubmit };
};


// =================================================================
// REFACTORED CONTACT PAGE COMPONENT (UNIFIED BRANDING)
// =================================================================

const OmecaContactPage = ({ setPage }) => { // RENAMED COMPONENT
    const { mode } = useContext(ColorModeContext);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { formData, errors, handleInputChange, handleContactSubmit } = useContactForm(setFormSubmitted);
    const currentColors = colors[mode];

    // Consolidated and fixed input styles for better contrast and appearance
    const inputStyles = useMemo(() => ({
        '& .MuiOutlinedInput-root': {
            // Fixes typing issue: ensures the input area itself is readable
            bgcolor: mode === 'dark' ? currentColors.bgTop : currentColors.bgGradA,
            color: currentColors.textPrimary,
            borderRadius: 1.5,
            transition: 'border-color 0.3s',
            // Fix: Ensures dark mode text contrast is good
            '& fieldset': { borderColor: `${currentColors.textDim}44` },
            '&.Mui-focused fieldset': { borderColor: colors.accent, borderWidth: '2px' },
        },
        '& .MuiInputLabel-root': { color: currentColors.textDim }
    }), [mode, currentColors]);

    // Define all non-submit fields in a single array for mapping
    const formFields = [
        { name: 'firstName', label: 'First Name', grid: 6 },
        { name: 'lastName', label: 'Last Name', grid: 6 },
        { name: 'email', label: 'Work Email', type: 'email', grid: 6 },
        { name: 'company', label: 'Company Name', grid: 6 },
        { name: 'industry', label: 'Industry', grid: 12, select: true },
        { name: 'query', label: 'Use Case/Query', multiline: true, rows: 3, grid: 12 },
    ];


    return (
        <Container
            maxWidth="sm" // Reduced max width for a less "too big" feel
            sx={{ py: { xs: 8, md: 10 }, bgcolor: currentColors.bgTop, minHeight: '80vh' }}
        >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <BackButton setPage={setPage} currentColors={currentColors} />
                <Typography variant="h4" fontWeight={900} color={currentColors.textPrimary} sx={{ mb: 1, lineHeight: 1.1 }}>
                    See the Self-Driving Cognitive ERP in action
                </Typography>

                <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 4 }}>
                    Omeca unifies operational truth, real-time close, and verifiable intelligence into one continuous financial system.
                    Book a demo to see how it transforms the way your business operates.
                </Typography>

            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        bgcolor: currentColors.card,
                        borderRadius: 3,
                        border: `2px solid ${colors.accent}44`,
                        boxShadow: mode === 'dark' ? `0 10px 30px rgba(0, 0, 0, 0.5)` : `0 5px 20px rgba(0,0,0,0.1)`,
                    }}
                >
                    {formSubmitted ? (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <CheckCircleOutlineRounded sx={{ fontSize: 72, color: colors.successGreen }} />
                            <Typography variant="h5" fontWeight={800} color={colors.successGreen} sx={{ mt: 3, mb: 1 }}>
                                Request Confirmed.
                            </Typography>
                            <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 3 }}>
                                We'll be in touch shortly to schedule your live demonstration.
                            </Typography>
                            <Button variant="text" onClick={() => setPage('home')} sx={{ color: colors.accent, fontWeight: 700 }}>
                                Return Home &rarr;
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={2.5} component="form" onSubmit={handleContactSubmit}>
                            {/* Renders all TextFields and Selects using a single loop */}
                            {formFields.map(field => (
                                <Grid item xs={12} sm={field.grid} key={field.name}>
                                    {field.select ? (
                                        <FormControl fullWidth required error={!!errors[field.name]} sx={inputStyles}>
                                            <InputLabel>{field.label}</InputLabel>
                                            <Select
                                                label={field.label}
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleInputChange}
                                                // Ensures Select uses the stylized input background
                                                inputProps={{ sx: { bgcolor: mode === 'dark' ? currentColors.bgTop : currentColors.bgGradA } }}
                                            >
                                                {INDUSTRY_OPTIONS.map((industry) => (
                                                    <MenuItem key={industry} value={industry}>
                                                        {industry}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {!!errors[field.name] && <FormHelperText>{errors[field.name]}</FormHelperText>}
                                        </FormControl>
                                    ) : (
                                        <TextField
                                            fullWidth
                                            label={field.label}
                                            name={field.name}
                                            type={field.type || 'text'}
                                            value={formData[field.name]}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                            required
                                            multiline={field.multiline}
                                            rows={field.rows}
                                            error={!!errors[field.name]}
                                            helperText={errors[field.name]}
                                            sx={inputStyles}
                                        />
                                    )}
                                </Grid>
                            ))}

                            {/* Submission/Alternative Contact Buttons */}
                            <Grid item xs={12} sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    sx={{
                                        bgcolor: colors.accent,
                                        color: currentColors.bgTop,
                                        fontWeight: 700,
                                        minWidth: 160,
                                        '&:hover': { bgcolor: colors.accentHover }
                                    }}
                                >
                                    Submit Request
                                </Button>

                                <Typography variant="body2" color={currentColors.textDim}>
                                    or
                                </Typography>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    component={Link}
                                    href="mailto:cerp@omeca.com" // UNIFIED EMAIL ADDRESS (cerp@omeca.com)
                                    sx={{
                                        color: colors.lucraGold,
                                        borderColor: colors.lucraGold,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        '&:hover': { borderColor: colors.lucraGold + 'AA', bgcolor: colors.lucraGold + '11' }
                                    }}
                                >
                                    Email us
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Paper>

                {/* Secondary Callout */}
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography variant="body2" color={currentColors.textDim}>
                        Need technical details?
                        <Link onClick={() => setPage('documentation')} underline="hover" sx={{ ml: 1, color: colors.accent, cursor: 'pointer', fontWeight: 600 }}>
                            View Developer Docs
                        </Link>
                    </Typography>
                </Box>
            </motion.div>
        </Container>
    );
};

export default OmecaContactPage; // RENAMED EXPORT