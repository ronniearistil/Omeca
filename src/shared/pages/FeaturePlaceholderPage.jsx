import React, { useContext } from "react";
import { Box, Container, Typography, Button, Paper, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack, Construction } from "@mui/icons-material";

// --- IMPORTS (Restored file extensions for compiler safety) ---
import { ColorModeContext } from "../layouts/theme/ThemeContext.jsx";
import { colors } from "../layouts/theme/theme.js";

const FeaturePlaceholderPage = ({ title = "Module", path = "/dashboard" }) => {
    const navigate = useNavigate();
    const { mode } = useContext(ColorModeContext);
    const currentColors = colors[mode];
    const isDark = mode === 'dark';

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: currentColors.bgTop, color: currentColors.textPrimary, pt: 10 }}>
            <Container maxWidth="md">
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Construction sx={{ fontSize: 80, color: colors.lucraGold, mb: 2 }} />
                    <Typography variant="h3" fontWeight={800} gutterBottom>
                        {title} Under Construction
                    </Typography>
                    <Typography variant="h6" sx={{ color: currentColors.textDim, mb: 4 }}>
                        Thank you for your interest! The full implementation of the **{title}** module is being provisioned for your pilot group.
                    </Typography>
                    
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 3, 
                            borderRadius: 3, 
                            bgcolor: isDark ? colors.accent + '10' : colors.accent + '05', 
                            border: `1px solid ${colors.accent}` 
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight={600} sx={{ color: colors.accent }}>
                            Status: Authenticated Access Confirmed.
                        </Typography>
                        <Typography variant="body2" sx={{ color: currentColors.textPrimary }}>
                            Your security credentials allow you access to this route. Please check back soon!
                        </Typography>
                    </Paper>
                </Box>
                
                <Divider sx={{ my: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        variant="outlined" 
                        size="large" 
                        startIcon={<ArrowBack />} 
                        onClick={() => navigate(path)}
                        sx={{ borderColor: colors.accent, color: colors.accent, fontWeight: 700 }}
                    >
                        Return to Dashboard
                    </Button>
                </Box>

            </Container>
        </Box>
    );
};

export default FeaturePlaceholderPage;