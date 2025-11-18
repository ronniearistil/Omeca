// src/Melucra/components/AuditCertModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function AuditCertModal({ open, onClose, eventId, onCertified }) {
  const [narrative, setNarrative] = useState("");
  const [reasonCode, setReasonCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!narrative.trim()) return;
    setLoading(true);
    try {
      await onCertified({ eventId, narrative: narrative.trim(), reason_code: reasonCode.trim() });
      setNarrative("");
      setReasonCode("");
      onClose();
    } catch (err) {
      console.error("Certification failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Certify Machine Event</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Narrative"
            multiline
            minRows={3}
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
            placeholder="Provide a short audit justification"
            fullWidth
          />
          <TextField
            label="Reason Code (optional)"
            value={reasonCode}
            onChange={(e) => setReasonCode(e.target.value)}
            placeholder="E.g., R-001"
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !narrative.trim()}
        >
          {loading ? <CircularProgress size={20} /> : "Certify"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
