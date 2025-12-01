// --- IMPORTS ---
// src/marketing/components/PilotRequestForm.jsx
import React, { useState } from "react";
import { 
  Box, Container, Paper, Typography, TextField, Button, InputAdornment, 
  CircularProgress, useTheme, IconButton, Collapse, Link, createTheme, ThemeProvider
} from "@mui/material";
import { 
  ArrowBack, Email as EmailIcon, Lock as LockIcon, Visibility, 
  VisibilityOff, Person as PersonIcon, Business as BusinessIcon 
} from "@mui/icons-material";
import { useNavigate, MemoryRouter } from "react-router-dom";

const BRAND = {
  accent: "#00E5BE", 
  darkBg: "#0B0F17", 
  paperBg: "#111827", 
  textPrimary: "#FFFFFF", 
  textSecondary: "rgba(255, 255, 255, 0.7)"
};

const OmecaLogo = ({ size = 40 }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0L37.3205 10V30L20 40L2.67949 30V10L20 0Z" fill={BRAND.accent} fillOpacity="0.2"/>
      <path d="M20 5L32.9904 12.5V27.5L20 35L7.00962 27.5V12.5L20 5Z" stroke={BRAND.accent} strokeWidth="2"/>
      <circle cx="20" cy="20" r="6" fill={BRAND.accent}/>
    </svg>
    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary', fontSize: size * 0.8 }}>Omeca</Typography>
  </Box>
);

// --- PURE CONTENT COMPONENT (Named Export) ---
export const PartnerLoginContent = () => {
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", fullName: "", company: "" });

  const handleChange = (prop) => (event) => setFormData({ ...formData, [prop]: event.target.value });

  const handleAuthAction = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); alert(`${isLogin ? "Login" : "Registration"} successful (Mock).`); }, 1500);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND.darkBg, color: BRAND.textPrimary, display: 'flex', flexDirection: 'column', backgroundImage: `radial-gradient(circle at 50% 0%, ${BRAND.accent}15, transparent 40%)` }}>
      <Box sx={{ p: 4 }}><Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ color: BRAND.textSecondary, '&:hover': { color: BRAND.textPrimary } }}>Back to Home</Button></Box>
      <Container maxWidth="xs" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 8 }}>
        <div key={isLogin ? "login" : "signup"}>
          <Paper elevation={0} sx={{ p: 5, borderRadius: 5, border: `1px solid rgba(255,255,255,0.08)`, bgcolor: BRAND.paperBg, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <Box sx={{ mb: 5, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}><OmecaLogo size={48} /></Box>
              <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: BRAND.textPrimary }}>{isLogin ? "Partner Portal" : "Join the Network"}</Typography>
              <Typography variant="body2" sx={{ color: BRAND.textSecondary }}>{isLogin ? "Secure access for verified audit partners." : "Apply for audit node operator status."}</Typography>
            </Box>
            <form onSubmit={handleAuthAction}>
              <Collapse in={!isLogin}>
                <Box sx={{ mb: 0 }}>
                   <TextField fullWidth label="Full Name" variant="outlined" margin="dense" value={formData.fullName} onChange={handleChange('fullName')} sx={{ '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: BRAND.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment> }} />
                   <TextField fullWidth label="Company Name" variant="outlined" margin="dense" value={formData.company} onChange={handleChange('company')} sx={{ '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon sx={{ color: BRAND.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment> }} />
                </Box>
              </Collapse>
              <TextField fullWidth required label="Work Email" type="email" variant="outlined" margin="normal" value={formData.email} onChange={handleChange('email')} sx={{ '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: BRAND.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment> }} />
              <TextField fullWidth required label="Password" type={showPassword ? "text" : "password"} variant="outlined" margin="normal" value={formData.password} onChange={handleChange('password')} sx={{ '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: BRAND.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment>, endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'rgba(255,255,255,0.5)' }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />
              {isLogin && (<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}><Link component="button" variant="caption" onClick={() => {}} sx={{ color: BRAND.textSecondary, textDecoration: 'none', '&:hover': { color: BRAND.accent } }}>Forgot password?</Link></Box>)}
              <Button fullWidth size="large" variant="contained" type="submit" disabled={loading} sx={{ mt: 4, mb: 3, bgcolor: BRAND.accent, color: '#000', fontWeight: 800, py: 1.5, fontSize: '1rem', textTransform: 'none', borderRadius: 2, boxShadow: `0 0 20px ${BRAND.accent}40`, '&:hover': { bgcolor: '#fff', boxShadow: `0 0 30px ${BRAND.accent}60` } }}>{loading ? <CircularProgress size={24} color="inherit" /> : (isLogin ? "Sign In" : "Create Account")}</Button>
            </form>
            <Box sx={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3 }}><Typography variant="body2" sx={{ color: BRAND.textSecondary }}>{isLogin ? "Don't have an account?" : "Already have an account?"} <Link component="button" onClick={() => setIsLogin(!isLogin)} sx={{ color: BRAND.accent, fontWeight: 700, textDecoration: 'none', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>{isLogin ? "Apply for access" : "Log in here"}</Link></Typography></Box>
          </Paper>
        </div>
      </Container>
    </Box>
  );
};

// --- DEFAULT EXPORT FOR PREVIEW ---
const PartnerLogin = () => {
  const theme = createTheme({ palette: { mode: 'dark' } });
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <PartnerLoginContent />
      </MemoryRouter>
    </ThemeProvider>
  );
};

export default PartnerLogin;