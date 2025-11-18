import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MelucraWaitlistDialog = ({ open, onClose, source = 'melucra_homepage' }) => {
  const theme = useTheme(); // ✅ use existing MUI theme (light/dark mode + palette)
  const [form, setForm] = useState({ name: '', email: '', company: '', title: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      if (res.ok) setSuccess(true);
      else {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
      }
    } catch {
      setError('Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          fontSize: { xs: '1.6rem', md: '1.8rem' },
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        Join the Melucra Waitlist
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center', pt: 2 }}>
        {!success ? (
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.2}>
              <TextField
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
              />
              <TextField
                name="email"
                label="Work Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                onChange={handleChange}
              />
              <TextField
                name="company"
                label="Company"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
              />
              <TextField
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
              />
            </Stack>

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2, fontWeight: 500 }}>
                {error}
              </Typography>
            )}

            <DialogActions sx={{ justifyContent: 'center', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: '#fff',
                  textTransform: 'none',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                  '&:hover': {
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  },
                }}
              >
                {loading ? 'Submitting…' : 'Join Waitlist'}
              </Button>
            </DialogActions>
          </Box>
        ) : (
          <Box sx={{ py: 3 }}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
            >
              You’re on the list!
            </Typography>
            <Typography
              sx={{
                color: theme.palette.text.secondary,
                mt: 1,
                fontSize: '0.95rem',
              }}
            >
              We’ll reach out soon with next steps for early access.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MelucraWaitlistDialog;

