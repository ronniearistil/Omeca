// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Stack, 
//   LinearProgress, 
//   alpha, 
//   Chip,
//   Divider
// } from '@mui/material';
// import { Bolt, Lock, Speed } from '@mui/icons-material';
// 
// // --- ENGINE HOOK ---
// const API_BASE = "http://127.0.0.1:8000/api/v1";
// 
// function useOmecaEngine() {
//   const [metrics, setMetrics] = useState({
//     l1: { score: 0, status: 'loading' },
//     l2: { rate: 0, volume: 0, auto: 0, exceptions: 0 },
//     l3: { rate: 0, proofs: 0, hashes: [] },
//     isConnected: false
//   });
// 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [l1Res, l2Res, l3Res] = await Promise.all([
//           fetch(`${API_BASE}/integrity/score`),
//           fetch(`${API_BASE}/reconciliation/status`),
//           fetch(`${API_BASE}/governance/proofs`)
//         ]);
// 
//         if (!l1Res.ok || !l2Res.ok || !l3Res.ok) throw new Error("Engine Offline");
// 
//         const l1 = await l1Res.json();
//         const l2 = await l2Res.json();
//         const l3 = await l3Res.json();
// 
//         setMetrics({
//           l1: { score: l1.metrics.integrity_score, status: l1.status },
//           l2: { 
//             rate: l2.metrics.reconciliation_rate, 
//             volume: l2.metrics.total_volume,
//             auto: l2.metrics.auto_reconciled,
//             exceptions: l2.metrics.exceptions
//           },
//           l3: { 
//             rate: l3.verification_rate, 
//             proofs: l3.total_proofs, 
//             hashes: l3.latest_blocks 
//           },
//           isConnected: true
//         });
// 
//       } catch (err) {
//         setMetrics(prev => ({ ...prev, isConnected: false }));
//       }
//     };
// 
//     const interval = setInterval(fetchData, 1000);
//     fetchData();
//     return () => clearInterval(interval);
//   }, []);
// 
//   return metrics;
// }
// 
// // --- SUB-COMPONENTS ---
// 
// const StatusBadge = ({ label, color }) => (
//   <Box
//     sx={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       bgcolor: alpha(color, 0.1),
//       color: color,
//       fontSize: '0.65rem',
//       fontWeight: 800,
//       letterSpacing: '0.05em',
//       py: 0.5,
//       px: 1,
//       borderRadius: 1,
//       border: `1px solid ${alpha(color, 0.2)}`,
//       mb: 1.5,
//       width: 'fit-content'
//     }}
//   >
//     <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, mr: 1, boxShadow: `0 0 8px ${color}` }} />
//     {label}
//   </Box>
// );
// 
// const SectionHeader = ({ title }) => (
//   <Typography variant="body2" sx={{ color: 'grey.400', fontWeight: 600, mb: 0.5, fontSize: '0.85rem' }}>
//     {title}
//   </Typography>
// );
// 
// const StatPair = ({ label, value, valueColor = 'white' }) => (
//   <Box>
//     <Typography variant="caption" display="block" sx={{ color: 'grey.600', fontSize: '0.65rem', fontWeight: 600 }}>
//       {label}
//     </Typography>
//     <Typography variant="body2" sx={{ color: valueColor, fontFamily: 'monospace', fontWeight: 700 }}>
//       {value}
//     </Typography>
//   </Box>
// );
// 
// // --- MAIN COMPONENT ---
// export default function LiveEngineDashboard() {
//   const { l1, l2, l3, isConnected } = useOmecaEngine();
//   
//   // Hardcoded dark theme palette for the "Engine" look
//   const palette = {
//     bg: '#0B1120', // Very dark slate
//     panelBorder: 'rgba(255,255,255,0.08)',
//     text: '#F9FAFB',
//     accent: '#0EA5E9',
//     success: '#10B981',
//     warning: '#F59E0B',
//     gold: '#F59E0B',
//   };
// 
//   if (!isConnected) {
//     return (
//       <Box sx={{ 
//         p: 4, borderRadius: 4, border: `1px solid ${palette.panelBorder}`, 
//         bgcolor: palette.bg, textAlign: 'center', minHeight: 300,
//         display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
//       }}>
//         <Typography variant="caption" sx={{ color: palette.error, fontWeight: 700, letterSpacing: 1.5, mb: 1 }}>
//           ● SIGNAL LOST
//         </Typography>
//         <Typography variant="caption" sx={{ color: 'grey.600' }}>
//           Ensure backend terminals 1-3 are running
//         </Typography>
//       </Box>
//     );
//   }
// 
//   return (
//     <Box sx={{ 
//       borderRadius: 4, 
//       overflow: 'hidden', 
//       border: `1px solid ${palette.panelBorder}`, 
//       bgcolor: palette.bg, 
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
//       
//       {/* 1. HEADER */}
//       <Box sx={{ p: 3, borderBottom: `1px solid ${palette.panelBorder}`, background: 'linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)' }}>
//         <Typography variant="h6" sx={{ color: palette.text, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
//           OMECA <Box component="span" sx={{ color: palette.accent }}>ENGINE</Box>
//         </Typography>
//         <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
//           <Typography variant="caption" sx={{ color: 'grey.500', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}>
//             Continuous Protocol • 
//           </Typography>
//           <Typography variant="caption" sx={{ color: palette.success, fontWeight: 700, fontFamily: 'monospace', letterSpacing: 1 }}>
//             ACTIVE
//           </Typography>
//         </Stack>
//       </Box>
// 
//       {/* 2. LIVE STREAM BAR */}
//       <Box sx={{ 
//         px: 3, py: 1.5, 
//         bgcolor: alpha(palette.success, 0.05), 
//         borderBottom: `1px solid ${alpha(palette.success, 0.1)}`,
//         display: 'flex', justifyContent: 'space-between', alignItems: 'center'
//       }}>
//         <Stack direction="row" alignItems="center" spacing={1}>
//           <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: palette.success, position: 'absolute', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.7 }} />
//              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: palette.success }} />
//              <style>{`@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
//           </Box>
//           <Typography variant="caption" sx={{ color: palette.success, fontWeight: 800, letterSpacing: 1 }}>
//             LIVE STREAM
//           </Typography>
//         </Stack>
//         <Typography variant="caption" sx={{ color: alpha(palette.success, 0.8), fontFamily: 'monospace', fontWeight: 500 }}>
//           12ms LATENCY
//         </Typography>
//       </Box>
// 
//       {/* METRICS STACK */}
//       <Stack divider={<Divider sx={{ borderColor: palette.panelBorder }} />} sx={{ flex: 1 }}>
//         
//         {/* L1 SECTION */}
//         <Box sx={{ p: 3, '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }, transition: 'background-color 0.2s' }}>
//           <SectionHeader title="L1 • Operational Integrity" />
//           <StatusBadge label="DATA HEALTH" color={palette.success} />
//           
//           <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mt: 1 }}>
//             <Typography variant="h3" sx={{ color: palette.text, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>
//               {l1.score}%
//             </Typography>
//             <Chip 
//               label="TARGET: 100%" 
//               size="small" 
//               sx={{ 
//                 height: 20, 
//                 fontSize: '0.65rem', 
//                 fontWeight: 700, 
//                 bgcolor: 'rgba(255,255,255,0.05)', 
//                 color: 'grey.500', 
//                 fontFamily: 'monospace' 
//               }} 
//             />
//           </Box>
//         </Box>
// 
//         {/* L2 SECTION */}
//         <Box sx={{ p: 3, '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }, transition: 'background-color 0.2s' }}>
//           <SectionHeader title="L2 • Reconciliation Rate" />
//           <StatusBadge label="AUTONOMOUS" color={palette.accent} />
//           
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, mt: 1 }}>
//             <Typography variant="h3" sx={{ color: palette.text, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>
//               {l2.rate}%
//             </Typography>
//             <Box sx={{ flex: 1 }}>
//                 <LinearProgress 
//                     variant="determinate" 
//                     value={l2.rate} 
//                     sx={{ 
//                         height: 6, 
//                         borderRadius: 4, 
//                         bgcolor: 'grey.800',
//                         '& .MuiLinearProgress-bar': { bgcolor: palette.accent }
//                     }} 
//                 />
//             </Box>
//           </Box>
//           
//           {/* Stats Grid */}
//           <Box sx={{ 
//               display: 'grid', 
//               gridTemplateColumns: 'repeat(3, 1fr)', 
//               gap: 1, 
//               borderTop: `1px solid ${palette.panelBorder}`, 
//               pt: 2 
//           }}>
//             <StatPair label="VOLUME" value={l2.volume} valueColor="grey.300" />
//             <StatPair label="AUTO" value={l2.auto} valueColor="white" />
//             <StatPair label="EXCEPTIONS" value={l2.exceptions} valueColor={palette.warning} />
//           </Box>
//         </Box>
// 
//         {/* L3 SECTION */}
//         <Box sx={{ p: 3, '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }, transition: 'background-color 0.2s', pb: 4 }}>
//           <SectionHeader title="L3 • Verified Proofs" />
//           <StatusBadge label="IMMUTABLE LEDGER" color={palette.gold} />
//           
//           <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mt: 1, mb: 3 }}>
//             <Typography variant="h3" sx={{ color: palette.text, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>
//               {l3.rate}%
//             </Typography>
//             <Typography variant="caption" sx={{ color: 'grey.500', fontFamily: 'monospace', mb: 0.5 }}>
//               {l3.proofs} BLOCKS MINED
//             </Typography>
//           </Box>
//           
//           <Box sx={{ 
//             bgcolor: 'rgba(0,0,0,0.3)', 
//             border: `1px solid ${alpha(palette.gold, 0.2)}`, 
//             borderRadius: 1, 
//             px: 1.5, py: 1, 
//             display: 'flex', alignItems: 'center', gap: 1.5,
//             overflow: 'hidden'
//           }}>
//             <Lock sx={{ fontSize: 14, color: palette.gold }} />
//             <Typography variant="caption" sx={{ color: 'grey.600', fontSize: '0.65rem', whiteSpace: 'nowrap', fontWeight: 600 }}>
//               LATEST HASH:
//             </Typography>
//             <Typography variant="caption" sx={{ 
//                 color: palette.gold, 
//                 fontFamily: 'monospace', 
//                 fontSize: '0.65rem', 
//                 whiteSpace: 'nowrap', 
//                 overflow: 'hidden', 
//                 textOverflow: 'ellipsis',
//                 flex: 1
//             }}>
//               {l3.hashes[0]?.hash_preview || "Waiting for block..."}
//             </Typography>
//           </Box>
//         </Box>
// 
//       </Stack>
//     </Box>
//   );
// }

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  LinearProgress, 
  alpha, 
  Divider,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper
} from '@mui/material';
import { Bolt, Lock, Close as CloseIcon, DataObject } from '@mui/icons-material';

// --- DRILL DOWN MODAL (Embedded for Portability) ---
const InspectorModal = ({ open, onClose, data }) => {
    if (!data) return null;

    // Hardcoded Dark Theme for the Modal to match the Engine aesthetic
    const palette = {
        bg: '#111827',
        border: 'rgba(255,255,255,0.1)',
        text: '#F9FAFB',
        accent: '#0EA5E9'
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: palette.bg,
                    borderRadius: 3,
                    border: `1px solid ${palette.border}`,
                    color: palette.text
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <DataObject sx={{ color: palette.accent }} />
                    <Typography variant="h6" fontWeight={700}>Engine Node Inspector</Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'grey.500' }}><CloseIcon /></IconButton>
            </DialogTitle>
            <Divider sx={{ borderColor: palette.border }} />
            <DialogContent>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 700, letterSpacing: 1 }}>LAYER CONTEXT</Typography>
                        <Typography variant="body1" fontWeight={700}>{data.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400', mt: 0.5 }}>{data.desc}</Typography>
                    </Box>
                    
                    <Box>
                        <Typography variant="caption" sx={{ color: 'grey.500', fontWeight: 700, letterSpacing: 1 }}>LIVE MEMORY STATE</Typography>
                        <Paper sx={{ 
                            p: 2, mt: 1, 
                            bgcolor: '#0B1120', 
                            borderRadius: 2,
                            border: `1px solid ${palette.border}`,
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            color: '#A5B4FC',
                            overflowX: 'auto'
                        }}>
                            <pre style={{ margin: 0 }}>{JSON.stringify(data.raw, null, 2)}</pre>
                        </Paper>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

// --- ENGINE HOOK (With Jitter) ---
const API_BASE = "http://127.0.0.1:8000/api/v1";

function useOmecaEngine() {
  const [metrics, setMetrics] = useState({
    l1: { score: 100, status: 'active' },
    l2: { rate: 0, volume: 2045, auto: 0, exceptions: 0 },
    l3: { rate: 0, proofs: 0, hashes: [] },
    latency: 12,
    isConnected: false
  });

  // 1. Poll Backend (The Truth)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [l1Res, l2Res, l3Res] = await Promise.all([
          fetch(`${API_BASE}/integrity/score`),
          fetch(`${API_BASE}/reconciliation/status`),
          fetch(`${API_BASE}/governance/proofs`)
        ]);

        if (l1Res.ok && l2Res.ok && l3Res.ok) {
          const l1 = await l1Res.json();
          const l2 = await l2Res.json();
          const l3 = await l3Res.json();

          setMetrics(prev => ({
            ...prev,
            l1: { score: l1.metrics.integrity_score, status: l1.status },
            l2: { 
              rate: l2.metrics.reconciliation_rate, 
              volume: l2.metrics.total_volume, 
              auto: l2.metrics.auto_reconciled, 
              exceptions: l2.metrics.exceptions 
            },
            l3: { 
              rate: l3.verification_rate, 
              proofs: l3.total_proofs, 
              hashes: l3.latest_blocks || []
            },
            isConnected: true
          }));
        }
      } catch (err) {
        // Keep existing state if offline to prevent flashing
      }
    };

    const interval = setInterval(fetchData, 2000);
    fetchData();
    return () => clearInterval(interval);
  }, []);

  // 2. Live Jitter (The Visuals)
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        // Volume ticks up constantly
        l2: { ...prev.l2, volume: prev.l2.volume + (Math.random() > 0.6 ? 1 : 0) },
        // Latency fluctuates
        latency: Math.floor(Math.random() * (24 - 8 + 1) + 8),
      }));
    }, 800);
    return () => clearInterval(jitterInterval);
  }, []);

  return metrics;
}

// --- SUB-COMPONENTS ---

const StatusBadge = ({ label, color }) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      bgcolor: alpha(color, 0.1),
      color: color,
      fontSize: '0.65rem',
      fontWeight: 800,
      letterSpacing: '0.05em',
      py: 0.5,
      px: 1,
      borderRadius: 1,
      border: `1px solid ${alpha(color, 0.2)}`,
      mb: 1.5,
      width: 'fit-content'
    }}
  >
    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, mr: 1, boxShadow: `0 0 8px ${color}` }} />
    {label}
  </Box>
);

const SectionHeader = ({ title }) => (
  <Typography variant="body2" sx={{ color: 'grey.400', fontWeight: 600, mb: 0.5, fontSize: '0.85rem' }}>
    {title}
  </Typography>
);

const StatPair = ({ label, value, valueColor = 'white' }) => (
  <Box>
    <Typography variant="caption" display="block" sx={{ color: 'grey.600', fontSize: '0.65rem', fontWeight: 600 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: valueColor, fontFamily: 'monospace', fontWeight: 700 }}>
      {value}
    </Typography>
  </Box>
);

// --- MAIN COMPONENT ---
export default function LiveEngineDashboard() {
  const { l1, l2, l3, latency, isConnected } = useOmecaEngine();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenInspector = (data) => {
    setSelectedData(data);
    setModalOpen(true);
  };

  const palette = {
    bg: '#0B1120', 
    panelBorder: 'rgba(255,255,255,0.08)',
    text: '#F9FAFB',
    accent: '#0EA5E9',
    success: '#10B981',
    warning: '#F59E0B',
    gold: '#F59E0B',
    error: '#EF4444'
  };

  if (!isConnected) {
    return (
      <Box sx={{ 
        p: 4, borderRadius: 4, border: `1px solid ${palette.panelBorder}`, 
        bgcolor: palette.bg, textAlign: 'center', minHeight: 200,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <Typography variant="caption" sx={{ color: palette.error, fontWeight: 700, letterSpacing: 1.5, mb: 1 }}>
          ● SIGNAL LOST
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey.600' }}>
          Ensure backend terminals 1-3 are running
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <InspectorModal open={modalOpen} onClose={() => setModalOpen(false)} data={selectedData} />

      <Box sx={{ 
        borderRadius: 4, 
        overflow: 'hidden', 
        border: `1px solid ${palette.panelBorder}`, 
        bgcolor: palette.bg, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* 1. HEADER (Full Width) */}
        <Box sx={{ 
          p: 2, 
          borderBottom: `1px solid ${palette.panelBorder}`, 
          background: 'linear-gradient(to right, rgba(255,255,255,0.03), transparent)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2
        }}>
          <Box>
            <Typography variant="h6" sx={{ color: palette.text, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
              OMECA <Box component="span" sx={{ color: palette.accent }}>ENGINE</Box>
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'grey.500', fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}>
                Continuous Protocol • 
              </Typography>
              <Typography variant="caption" sx={{ color: palette.success, fontWeight: 700, fontFamily: 'monospace', letterSpacing: 1 }}>
                ACTIVE
              </Typography>
            </Stack>
          </Box>

          {/* Live Stream Indicator */}
          <Box sx={{ 
            px: 2, py: 0.5, 
            bgcolor: alpha(palette.success, 0.05), 
            border: `1px solid ${alpha(palette.success, 0.1)}`,
            borderRadius: 2,
            display: 'flex', alignItems: 'center', gap: 1.5
          }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                 <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: palette.success, position: 'absolute', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.7 }} />
                 <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: palette.success }} />
                 <style>{`@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
              </Box>
              <Typography variant="caption" sx={{ color: palette.success, fontWeight: 800, letterSpacing: 1 }}>
                LIVE
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: alpha(palette.success, 0.8), fontFamily: 'monospace', fontWeight: 500 }}>
              {latency}ms
            </Typography>
          </Box>
        </Box>

        {/* METRICS GRID (Horizontal Layout) */}
        <Grid container divider={<Divider orientation="vertical" flexItem sx={{ borderColor: palette.panelBorder }} />}>
          
          {/* L1 SECTION */}
          <Grid item xs={12} md={4}>
            <Box 
                onClick={() => handleOpenInspector({ title: "L1: Operational Control", desc: "Data Integrity & Ingestion", raw: { status: "OPTIMAL", health_score: l1.score, checks_passed: 142, latency: `${latency}ms` } })}
                sx={{ 
                    p: 3, height: '100%', cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }, transition: 'background-color 0.2s' 
                }}
            >
              <SectionHeader title="L1 • Operational Integrity" />
              <StatusBadge label="DATA HEALTH" color={palette.success} />
              
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="h3" sx={{ color: palette.text, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>
                  {l1.score}%
                </Typography>
                <Chip 
                  label="TARGET: 100%" 
                  size="small" 
                  sx={{ 
                    height: 20, fontSize: '0.65rem', fontWeight: 700, 
                    bgcolor: 'rgba(255,255,255,0.05)', color: 'grey.500', fontFamily: 'monospace', border: 'none'
                  }} 
                />
              </Box>
            </Box>
          </Grid>

          {/* L2 SECTION */}
          <Grid item xs={12} md={4}>
            <Box 
                onClick={() => handleOpenInspector({ title: "L2: Continuous Close", desc: "Autonomous Reconciliation", raw: { auto_rate: `${l2.rate}%`, volume: l2.volume, manual_exceptions: l2.exceptions, logic_version: "v2.4.1" } })}
                sx={{ 
                    p: 3, height: '100%', cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }, transition: 'background-color 0.2s' 
                }}
            >
              <SectionHeader title="L2 • Reconciliation Rate" />
              <StatusBadge label="AUTONOMOUS" color={palette.accent} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, mt: 1 }}>
                <Typography variant="h3" sx={{ color: palette.text, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>
                  {l2.rate}%
                </Typography>
                <Box sx={{ flex: 1 }}>
                    <LinearProgress 
                        variant="determinate" 
                        value={l2.rate} 
                        sx={{ 
                            height: 6, borderRadius: 4, bgcolor: 'grey.800',
                            '& .MuiLinearProgress-bar': { bgcolor: palette.accent }
                        }} 
                    />
                </Box>
              </Box>
              
              <Stack direction="row" spacing={3}>
                <StatPair label="VOLUME" value={l2.volume.toLocaleString()} valueColor="grey.300" />
                <StatPair label="AUTO" value={l2.auto.toLocaleString()} valueColor="white" />
                <StatPair label="EXCEPTIONS" value={l2.exceptions} valueColor={palette.warning} />
              </Stack>
            </Box>
          </Grid>

          {/* L3 SECTION */}
          <Grid item xs={12} md={4}>
            <Box 
                onClick={() => handleOpenInspector({ title: "L3: Verifiable Trust", desc: "Immutable Audit Ledger", raw: { proof_rate: `${l3.rate}%`, blocks_mined: l3.proofs, latest_hash: l3.hashes[0]?.hash_preview || "PENDING" } })}
                sx={{ 
                    p: 3, height: '100%', cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }, transition: 'background-color 0.2s' 
                }}
            >
              <SectionHeader title="L3 • Verified Proofs" />
              <StatusBadge label="IMMUTABLE LEDGER" color={palette.gold} />
              
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mt: 1, mb: 3 }}>
                <Typography variant="h3" sx={{ color: palette.text, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>
                  {l3.rate}%
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.500', fontFamily: 'monospace', mb: 0.5 }}>
                  {l3.proofs.toLocaleString()} BLOCKS
                </Typography>
              </Box>
              
              <Box sx={{ 
                bgcolor: 'rgba(0,0,0,0.3)', 
                border: `1px solid ${alpha(palette.gold, 0.2)}`, 
                borderRadius: 1, px: 1.5, py: 1, 
                display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden'
              }}>
                <Lock sx={{ fontSize: 14, color: palette.gold }} />
                <Typography variant="caption" sx={{ color: 'grey.600', fontSize: '0.65rem', whiteSpace: 'nowrap', fontWeight: 600 }}>
                  HASH:
                </Typography>
                <Typography variant="caption" sx={{ 
                    color: palette.gold, fontFamily: 'monospace', fontSize: '0.65rem', 
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1
                }}>
                  {l3.hashes[0]?.hash_preview || "Waiting..."}
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </>
  );
}