// import React, { useState, useContext, useMemo } from 'react';
// import {
//     Container, Box, Typography, Button, Paper, TextField, Grid, Link,
//     FormControl, InputLabel, Select, MenuItem, FormHelperText
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded';
// import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
// 
// // Corrected import paths
// import { ColorModeContext } from "../shared/layouts/theme/ThemeContext.jsx";
// import { colors } from "../shared/layouts/theme/theme.js";
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
// // REFACTORED CONTACT PAGE COMPONENT (UNIFIED BRANDING)
// // =================================================================
// 
// const OmecaContactPage = ({ setPage }) => { // RENAMED COMPONENT
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
//                     See the Self-Driving Cognitive ERP in action
//                 </Typography>
// 
//                 <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 4 }}>
//                     Omeca unifies operational truth, real-time close, and verifiable intelligence into one continuous financial system.
//                     Book a demo to see how it transforms the way your business operates.
//                 </Typography>
// 
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
//                                     href="mailto:cerp@omeca.com" // UNIFIED EMAIL ADDRESS (cerp@omeca.com)
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
// export default OmecaContactPage; // RENAMED EXPORT

// src/marketing/ContactPage.jsx

import React, { useState, useContext, useMemo } from 'react';
import {
    Container, Box, Typography, Button, TextField, Grid, Link,
    FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip, Stack
} from '@mui/material';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useNavigate } from "react-router-dom";

// Icons
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import EmailOutlined from '@mui/icons-material/EmailOutlined';

// Theme + Colors
import { ColorModeContext } from "../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../shared/layouts/theme/theme.js";

// =================================================================
// BACKGROUNDS (Standardized)
// =================================================================
const NoiseOverlay = () => (
  <Box
    sx={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0, opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const GridBackground = ({ isDark }) => (
  <Box
    sx={{
      position: "absolute", top: 0, left: 0, right: 0, height: "100%",
      overflow: "hidden", zIndex: 0,
      maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
    }}
  >
    <Box
      sx={{
        width: "100%", height: "100%",
        backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
        linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </Box>
);

// =================================================================
// FORM LOGIC
// =================================================================

const INDUSTRY_OPTIONS = [
    'Financial Services', 'Technology & SaaS', 'E-commerce & Retail',
    'Manufacturing & IoT', 'Logistics & Supply Chain', 'Other'
];

const INITIAL_FORM_DATA = {
    firstName: '', lastName: '', company: '',
    industry: '', email: '', query: ''
};

const useContactForm = (setFormSubmitted) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'Required';
        if (!formData.lastName) newErrors.lastName = 'Required';
        if (!formData.company) newErrors.company = 'Required';
        if (!formData.email) newErrors.email = 'Required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.query) newErrors.query = 'Required';
        if (!formData.industry) newErrors.industry = 'Required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log('Contact Form Submitted:', formData);
        setFormData(INITIAL_FORM_DATA);
        setErrors({});
        setFormSubmitted(true);
        // setTimeout(() => setFormSubmitted(false), 5000); // Optional: reset after delay
    };

    return { formData, errors, handleInputChange, handleContactSubmit };
};


// =================================================================
// MAIN COMPONENT
// =================================================================

const OmecaContactPage = () => {
    const { mode } = useContext(ColorModeContext);
    const isDark = mode === 'dark';
    const currentColors = colors[mode];
    const navigate = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { formData, errors, handleInputChange, handleContactSubmit } = useContactForm(setFormSubmitted);

    // Mouse Spotlight Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Input Styles (Glassy)
    const inputStyles = useMemo(() => ({
        '& .MuiOutlinedInput-root': {
            bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)",
            color: currentColors.textPrimary,
            borderRadius: 2,
            transition: 'all 0.3s',
            backdropFilter: 'blur(10px)',
            '& fieldset': { 
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" 
            },
            '&:hover fieldset': { 
                borderColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" 
            },
            '&.Mui-focused fieldset': { 
                borderColor: colors.accent, 
                borderWidth: '1px' 
            },
        },
        '& .MuiInputLabel-root': { 
            color: currentColors.textDim 
        },
        '& .MuiInputLabel-root.Mui-focused': { 
            color: colors.accent 
        },
        '& .MuiSelect-icon': {
            color: currentColors.textDim
        }
    }), [mode, currentColors, isDark]);

    const formFields = [
        { name: 'firstName', label: 'First Name', grid: 6 },
        { name: 'lastName', label: 'Last Name', grid: 6 },
        { name: 'email', label: 'Work Email', type: 'email', grid: 6 },
        { name: 'company', label: 'Company Name', grid: 6 },
        { name: 'industry', label: 'Industry', grid: 12, select: true },
        { name: 'query', label: 'How can we help?', multiline: true, rows: 4, grid: 12 },
    ];

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            bgcolor: currentColors.bgTop, 
            pt: { xs: 4, md: 5 }, 
            pb: 12,
            position: 'relative',
            overflowX: 'hidden'
        }}>
            <NoiseOverlay />
            <GridBackground isDark={isDark} />

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 3, md: 6, lg: 10 } }}>

                {/* BACK BUTTON */}
                <Box sx={{ mb: 6 }}>
                    <Button
                        startIcon={<ArrowBackRounded />}
                        onClick={() => navigate('/')}
                        sx={{
                            color: currentColors.textDim,
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 50,
                            px: 0,
                            '&:hover': { bgcolor: 'transparent', color: currentColors.textPrimary },
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>

                {/* HERO */}
                <Box sx={{ 
                    textAlign: 'center', 
                    mb: 8, 
                    mx: 'auto', 
                    maxWidth: 800 
                }}>
                    <Chip 
                        label="CONTACT SALES" 
                        size="small"
                        sx={{ 
                            mb: 2, fontWeight: 700, fontSize: "0.65rem", letterSpacing: 1,
                            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                            color: currentColors.textDim, 
                        }} 
                    />
                    <Typography variant="h2" fontWeight={800} sx={{ 
                        fontSize: { xs: "2.5rem", md: "3.5rem" }, 
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        mb: 2,
                        color: currentColors.textPrimary
                    }}>
                        Start the <span style={{ color: colors.accent }}>Revolution.</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: currentColors.textDim, fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Omeca unifies operational truth and real-time finance. <br/>
                        Book a demo to see the self-driving ERP in action.
                    </Typography>
                </Box>

                {/* FORM CARD with Spotlight */}
                <Container maxWidth="sm" disableGutters>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        onMouseMove={handleMouseMove}
                        style={{ position: 'relative' }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 4,
                                border: '1px solid',
                                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                                bgcolor: isDark ? "rgba(15,15,20,0.6)" : "rgba(255,255,255,0.6)",
                                backdropFilter: "blur(20px)",
                                overflow: 'hidden',
                                p: { xs: 3, sm: 5 },
                                boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.05)'
                            }}
                        >
                            {/* Spotlight Gradient */}
                            <motion.div
                                style={{
                                    pointerEvents: "none",
                                    position: "absolute", inset: 0, zIndex: 0,
                                    background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}, transparent 80%)`,
                                }}
                            />

                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                {formSubmitted ? (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                            <CheckCircleOutlineRounded sx={{ fontSize: 80, color: colors.accent, mb: 3 }} />
                                        </motion.div>

                                        <Typography variant="h4" fontWeight={800} color={currentColors.textPrimary} sx={{ mb: 2 }}>
                                            Request Confirmed.
                                        </Typography>

                                        <Typography variant="body1" color={currentColors.textDim} sx={{ mb: 4 }}>
                                            We'll be in touch shortly to schedule your live demonstration.
                                        </Typography>

                                        <Button
                                            onClick={() => navigate("/")}
                                            variant="outlined"
                                            sx={{ 
                                                borderRadius: 50, 
                                                textTransform: 'none',
                                                borderColor: colors.accent,
                                                color: colors.accent,
                                                '&:hover': { borderColor: colors.accent, bgcolor: colors.accent + '11'}
                                            }}
                                        >
                                            Return Home
                                        </Button>
                                    </Box>
                                ) : (
                                    <Grid container spacing={3} component="form" onSubmit={handleContactSubmit}>
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
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    sx: {
                                                                        bgcolor: isDark ? '#1a1a20' : '#fff',
                                                                        backgroundImage: 'none',
                                                                        border: '1px solid',
                                                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                                                        '& .MuiMenuItem-root': {
                                                                            color: currentColors.textPrimary
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            {INDUSTRY_OPTIONS.map(industry => (
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

                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                type="submit"
                                                fullWidth
                                                endIcon={<ArrowForwardRounded />}
                                                sx={{
                                                    py: 1.8,
                                                    bgcolor: colors.accent,
                                                    color: '#000',
                                                    fontWeight: 700,
                                                    borderRadius: 3,
                                                    textTransform: 'none',
                                                    fontSize: '1rem',
                                                    boxShadow: `0 10px 40px -10px ${colors.accent}66`,
                                                    '&:hover': { bgcolor: '#fff', boxShadow: `0 10px 40px -10px ${colors.accent}88` }
                                                }}
                                            >
                                                Submit Request
                                            </Button>

                                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" color={currentColors.textDim}>
                                                    Prefer email? 
                                                </Typography>
                                                <Link
                                                    href="mailto:cerp@omeca.com"
                                                    underline="hover"
                                                    sx={{
                                                        color: colors.accent,
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    <EmailOutlined sx={{ fontSize: 16 }} />
                                                    cerp@omeca.com
                                                </Link>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        </Box>
                    </motion.div>

                    {/* Footer Links */}
                    <Box sx={{ textAlign: 'center', mt: 5 }}>
                        <Typography variant="body2" color={currentColors.textDim}>
                            Are you a developer?
                            <Link
                                onClick={() => window.location.href = '/documentation'}
                                underline="hover"
                                sx={{
                                    ml: 1,
                                    color: currentColors.textPrimary,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                View Documentation
                            </Link>
                        </Typography>
                    </Box>

                </Container>
            </Container>
        </Box>
    );
};

export default OmecaContactPage;