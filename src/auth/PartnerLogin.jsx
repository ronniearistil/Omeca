import React, { useState, useContext, useEffect } from "react";
import { 
  Box, Container, Paper, Typography, TextField, Button, InputAdornment, 
  CircularProgress, IconButton, Collapse, Link, alpha, Alert, MenuItem 
} from "@mui/material";
import { 
  ArrowBack, Email, Lock, Visibility, VisibilityOff, Person, Business, 
  Factory, Groups 
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

// --- FIREBASE IMPORTS ---
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    updateProfile,
    signOut,
    signInWithCustomToken
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// --- SHARED CONFIG ---
import { auth, db, APP_ID } from "../lib/firebase";

// --- THEME ---
import { colors } from "../shared/layouts/theme/theme.js";
import { ColorModeContext } from "../shared/layouts/theme/ThemeContext.jsx";
import OmecaLogo from "../shared/ui/OmecaLogo.jsx";

const PartnerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];
  const isDark = mode === 'dark';
  
  // STATE
  const [isLogin, setIsLogin] = useState(true);
  const [signupStep, setSignupStep] = useState(1); 
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({ 
    email: "", 
    password: "", 
    fullName: "", 
    company: "",
    industry: "",
    companySize: ""
  });

  // --- INITIALIZE FROM LANDING PAGE ---
  useEffect(() => {
    if (location.state) {
        if (location.state.email) setFormData(prev => ({ ...prev, email: location.state.email }));
        if (location.state.isSignup) setIsLogin(false);
    }
  }, [location.state]);

  const handleChange = (prop) => (event) => setFormData({ ...formData, [prop]: event.target.value });

  // --- UNIFIED SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    
    // SCENARIO 1: SIGN UP - STEP 1 -> 2
    if (!isLogin && signupStep === 1) {
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setSignupStep(2); 
        return;
    }

    // SCENARIO 2: EXECUTE AUTH
    // Validate Step 2 fields if signing up (only if on step 2)
    if (!isLogin && signupStep === 2) {
       if (!formData.fullName || !formData.company || !formData.industry || !formData.companySize) {
           setError("Please complete your profile details.");
           return;
       }
    }

    setLoading(true);

    // // Auth Guard (for development/preview environments)
    // if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
    //     try { await signInWithCustomToken(auth, __initial_auth_token); } catch(e) {}
    // }

    try {
      if (isLogin) {
        // === LOGIN ===
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            await signOut(auth);
            setError("Please verify your email before logging in.");
            setLoading(false);
            return;
        }

        setSuccessMsg("Login successful! Entering Dashboard...");
        setTimeout(() => navigate('/dashboard'), 1500); // Redirect to Dashboard

      } else {
        // === SIGN UP ===
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.fullName });

        try {
            await setDoc(doc(db, 'artifacts', APP_ID, 'users', user.uid, 'profile'), {
                fullName: formData.fullName,
                company: formData.company,
                industry: formData.industry,
                companySize: formData.companySize,
                email: formData.email,
                role: 'user_applicant',
                createdAt: new Date().toISOString()
            });
        } catch (dbError) {
            console.error("DB Error:", dbError);
        }

        await sendEmailVerification(user);
        await signOut(auth);

        // --- FIX A: Re-login user immediately after sending verification email ---
        // This prevents the "logout on refresh" bug and keeps the session active.
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        // Note: The user is now logged in but still needs to verify their email to access protected routes.


        setSuccessMsg(`Congratulations! We've received your application. Please check your email to verify your account.`);
        
        // Clear sensitive info, but keep essential email for display
        setFormData({ email: user.email, password: "", fullName: "", company: "", industry: "", companySize: "" });
        
        // Redirect to Dashboard (they are now logged in)
        setTimeout(() => {
            navigate('/dashboard');
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      let msg = err.message;
      if (msg.includes("auth/invalid-email")) msg = "Invalid email address.";
      if (msg.includes("auth/user-not-found") || msg.includes("auth/invalid-credential")) msg = "Invalid email or password.";
      if (msg.includes("auth/email-already-in-use")) msg = "This email is already in use.";
      if (msg.includes("auth/weak-password")) msg = "Password should be at least 6 characters.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': { 
      bgcolor: isDark ? alpha('#fff', 0.03) : alpha('#000', 0.02),
      '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' },
      '&:hover fieldset': { borderColor: colors.accent },
      '&.Mui-focused fieldset': { borderColor: colors.accent },
      color: currentColors.textPrimary
    },
    '& .MuiInputLabel-root': { color: currentColors.textDim },
    '& .MuiInputLabel-root.Mui-focused': { color: colors.accent },
    '& input': { color: currentColors.textPrimary },
    '& .MuiSelect-icon': { color: currentColors.textDim }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: currentColors.bgTop, 
      color: currentColors.textPrimary, 
      display: 'flex', flexDirection: 'column',
      backgroundImage: isDark 
        ? `radial-gradient(circle at 50% 0%, ${alpha(colors.accent, 0.15)}, transparent 40%)` 
        : `radial-gradient(circle at 50% 0%, ${alpha(colors.accent, 0.05)}, transparent 40%)`
    }}>
      <Box sx={{ p: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ color: currentColors.textDim, '&:hover': { color: currentColors.textPrimary } }}>
          Back to Home
        </Button>
      </Box>
      <Container maxWidth="xs" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 8 }}>
        
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError("")}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setSuccessMsg("")}>{successMsg}</Alert>}

        <Paper elevation={0} sx={{ 
            p: 5, borderRadius: 5, 
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, 
            bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#fff', 
            backdropFilter: 'blur(10px)',
            boxShadow: isDark ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 10px 40px -10px rgba(0,0,0,0.1)'
        }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}><OmecaLogo size={48} /></Box>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                {isLogin ? "Welcome" : "Create Account"}
              </Typography>
              <Typography variant="body2" sx={{ color: currentColors.textDim }}>
                {isLogin 
                    ? "Sign in to access your dashboard." 
                    : (signupStep === 1 ? "Step 1: Set up your login." : "Step 2: Tell us about your organization.")
                }
              </Typography>
            </Box>
            
            <form onSubmit={handleSubmit} noValidate>
              
              <Collapse in={isLogin || signupStep === 1}>
                  <TextField fullWidth required label="Work Email" type="email" margin="normal" value={formData.email} onChange={handleChange('email')} sx={inputSx} InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: colors.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment> }} />
                  <TextField fullWidth required label="Password" type={showPassword ? "text" : "password"} margin="normal" value={formData.password} onChange={handleChange('password')} sx={inputSx} InputProps={{ 
                      startAdornment: <InputAdornment position="start"><Lock sx={{ color: colors.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment>,
                      endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: currentColors.textDim }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) 
                  }} />
                  {isLogin && (<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}><Link component="button" variant="caption" sx={{ color: currentColors.textDim, textDecoration: 'none', '&:hover': { color: colors.accent } }}>Forgot password?</Link></Box>)}
              </Collapse>

              <Collapse in={!isLogin && signupStep === 2}>
                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                   <TextField fullWidth required label="Full Name" value={formData.fullName} onChange={handleChange('fullName')} sx={inputSx} InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: colors.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment> }} />
                   <TextField fullWidth required label="Company Name" value={formData.company} onChange={handleChange('company')} sx={inputSx} InputProps={{ startAdornment: <InputAdornment position="start"><Business sx={{ color: colors.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment> }} />
                   
                   <Box sx={{ display: 'flex', gap: 2 }}>
                       <TextField select fullWidth required label="Size" value={formData.companySize} onChange={handleChange('companySize')} sx={inputSx} InputProps={{ startAdornment: <InputAdornment position="start"><Groups sx={{ color: colors.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment> }}>
                           {['1-10', '11-50', '51-200', '201-1000', '1000+'].map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                       </TextField>
                       <TextField select fullWidth required label="Industry" value={formData.industry} onChange={handleChange('industry')} sx={inputSx} InputProps={{ startAdornment: <InputAdornment position="start"><Factory sx={{ color: colors.accent, opacity: 0.8 }} fontSize="small" /></InputAdornment> }}>
                           {['Fintech', 'SaaS', 'Manufacturing', 'Healthcare', 'Other'].map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                       </TextField>
                   </Box>
                 </Box>
              </Collapse>
              
              <Box sx={{ mt: 4, mb: 3, display: 'flex', gap: 2 }}>
                  {!isLogin && signupStep === 2 && (
                      <Button fullWidth variant="outlined" onClick={() => setSignupStep(1)} sx={{ borderColor: colors.accent, color: colors.accent, fontWeight: 700, py: 1.5, flex: 1 }}>
                          Back
                      </Button>
                  )}
                  <Button fullWidth size="large" variant="contained" type="submit" disabled={loading} sx={{ bgcolor: colors.accent, color: '#000', fontWeight: 800, py: 1.5, borderRadius: 2, flex: 1, '&:hover': { bgcolor: '#fff' } }}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : (isLogin ? "Sign In" : (!isLogin && signupStep === 1 ? "Continue" : "Submit Application"))}
                  </Button>
              </Box>
            </form>
            
            <Box sx={{ textAlign: 'center', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, pt: 3 }}>
              <Typography variant="body2" sx={{ color: currentColors.textDim }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"} <Link component="button" onClick={() => { setIsLogin(!isLogin); setSignupStep(1); setError(""); }} sx={{ color: colors.accent, fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}>{isLogin ? "Apply for access" : "Log in here"}</Link>
              </Typography>
            </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PartnerLogin;