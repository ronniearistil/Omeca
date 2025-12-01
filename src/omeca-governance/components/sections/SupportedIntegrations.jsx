// import React, { useContext, useMemo } from 'react';
// import { Container, Typography, Box, Chip } from '@mui/material';
// import { motion } from 'framer-motion';
// 
// import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
// import { colors } from '../../../shared/layouts/theme/theme.js';
// 
// // Slow, elegant scroll
// const marquee = {
//   animate: {
//     x: ["0%", "-50%"],
//     transition: {
//       duration: 45, 
//       ease: "linear",
//       repeat: Infinity,
//     },
//   },
// };
// 
// const OmecaSupportedIntegrations = () => {
//   const { mode } = useContext(ColorModeContext);
//   const isDark = mode === 'dark';
//   const palette = colors[mode];
// 
//   // List of "Data Sources" (We treat them as inputs, not competitors)
//   const integrations = useMemo(
//     () => [
//       "NetSuite", "SAP S/4HANA", "Workday", "Snowflake", "Databricks", 
//       "Google BigQuery", "AWS Redshift", "Stripe", "Salesforce", "Oracle Fusion", 
//       "Microsoft Dynamics 365", "Coupa", "Bill.com"
//     ],
//     []
//   );
// 
//   return (
//     <Box sx={{ 
//       py: { xs: 6, md: 10 }, 
//       position: 'relative',
//       overflow: 'hidden',
//     //   background: isDark 
//     //     ? `linear-gradient(180deg, ${palette.bgTop} 0%, ${palette.card} 100%)` 
//     //     : palette.bgTop
//     background: isDark
//   ? `linear-gradient(145deg, ${palette.bgTop}, ${palette.card})`
//   : `linear-gradient(145deg, #FFFFFF, #F7F9FC)`,
// 
//     }}>
//       
//       {/* --- AMBIENT GLOW --- */}
//       <Box sx={{ 
//         position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
//         width: '100%', maxWidth: '1200px', height: '600px', 
//         background: `radial-gradient(circle, ${colors.accent}05 0%, transparent 70%)`,
//         zIndex: 0, pointerEvents: 'none'
//       }} />
// 
//       <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: "center" }}>
//         
//         {/* --- HEADER --- */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <Chip 
//             label="UNIVERSAL DATA INGESTION" 
//             sx={{ 
//               mb: 3, fontWeight: 800, fontSize: "0.7rem", letterSpacing: 1.5,
//               bgcolor: `${colors.lucraGold}15`, color: colors.lucraGold, 
//               border: `1px solid ${colors.lucraGold}30`
//             }} 
//           />
//           
//           <Typography variant="h2" fontWeight={900} sx={{ 
//             color: palette.textPrimary, 
//             mb: 3,
//             fontSize: { xs: "2rem", md: "3rem" },
//             letterSpacing: "-0.02em"
//           }}>
//             Don't rip and replace. <br />
//             <span style={{ color: colors.accent }}>Just take control.</span>
//           </Typography>
// 
//           <Typography sx={{
//             color: palette.textDim,
//             maxWidth: 760,
//             mx: "auto",
//             mb: 10,
//             fontSize: { xs: "1.1rem", md: "1.25rem" },
//             lineHeight: 1.6,
//             fontWeight: 400
//           }}>
//             Omeca ingests data from your existing ERPs, banks, and billing tools to create a single, verified source of truth. 
//             We bring order to your fragmented stack.
//           </Typography>
//         </motion.div>
// 
//         {/* --- PREMIUM GLASS MARQUEE --- */}
//         <Box
//           sx={{
//             position: "relative",
//             overflow: "hidden",
//             py: 6,
//             // borderRadius: 6,
//             borderRadius: 4,
//             // Executive Glassmorphism
//             background: isDark 
//                 ? "linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.01) 100%)"
//                 : "linear-gradient(90deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.01) 100%)",
//             border: `1px solid ${palette.textDim}10`,
//             // backdropFilter: "blur(10px)",
//             backdropFilter: "blur(14px)",
//             WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
// maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
// 
//             boxShadow: isDark ? "0 20px 60px -20px rgba(0,0,0,0.3)" : "0 20px 60px -20px rgba(0,0,0,0.05)"
//           }}
//         >
//           {/* Fade Masks (Left & Right) */}
//           <Box sx={{
//             position: "absolute", left: 0, top: 0, bottom: 0, width: "200px", zIndex: 2,
//             background: `linear-gradient(90deg, ${isDark ? '#161C29' : '#F8FAFC'}, transparent)`, 
//             pointerEvents: "none"
//           }} />
//           <Box sx={{
//             position: "absolute", right: 0, top: 0, bottom: 0, width: "200px", zIndex: 2,
//             background: `linear-gradient(270deg, ${isDark ? '#161C29' : '#F8FAFC'}, transparent)`,
//             pointerEvents: "none"
//           }} />
// 
//           {/* The Scrolling Track */}
//           <motion.div
//             variants={marquee}
//             animate="animate"
//             style={{
//               display: "flex",
//             //   gap: "6rem", 
//             gap: "4rem",
//               whiteSpace: "nowrap",
//               alignItems: "center",
//               paddingLeft: "6rem" 
//             }}
//           >
//             {[...integrations, ...integrations, ...integrations].map((name, idx) => (
//               <Typography
//                 key={idx}
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   color: palette.textDim,
//                   opacity: 0.5,
//                   textTransform: "uppercase",
//                 //   letterSpacing: "0.05em",
//                 letterSpacing: "0.04em",
//                   userSelect: "none",
//                   fontSize: { xs: "1rem", md: "1.3rem" },
//                   fontFamily: "monospace", 
//                   transition: "all 0.3s ease",
//                   cursor: "default",
//                   "&:hover": {
//                       color: colors.accent,
//                       opacity: 1,
//                       transform: "scale(1.05)",
//                       textShadow: `0 0 20px ${colors.accent}60`
//                   }
//                 }}
//               >
//                 {name}
//               </Typography>
//             ))}
//           </motion.div>
//         </Box>
//       </Container>
//     </Box>
//   );
// };
// 
// export default OmecaSupportedIntegrations;

import React, { useContext, useMemo } from 'react';
import { Container, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';

import { ColorModeContext } from '../../../shared/layouts/theme/ThemeContext.jsx';
import { colors } from '../../../shared/layouts/theme/theme.js';

// Slow, elegant scroll
const marquee = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      duration: 45, 
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const OmecaSupportedIntegrations = () => {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  const palette = colors[mode];

  // The Legacy Stack (Context: These are the systems we outperform/replace or migrate from)
  const integrations = useMemo(
    () => [
      "NetSuite", "SAP S/4HANA", "Workday", "Snowflake", "Databricks", 
      "Google BigQuery", "AWS Redshift", "Stripe", "Salesforce", "Oracle Fusion", 
      "Microsoft Dynamics 365", "Coupa", "Bill.com"
    ],
    []
  );

  return (
    <Box sx={{ 
      py: { xs: 8, md: 14 }, 
      position: 'relative',
      overflow: 'hidden',
      // Using the exact gradient you preferred
      background: isDark
        ? `linear-gradient(145deg, ${palette.bgTop}, ${palette.card})`
        : `linear-gradient(145deg, #FFFFFF, #F7F9FC)`,
    }}>
      
      {/* --- AMBIENT GLOW --- */}
      <Box sx={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
        width: '100%', maxWidth: '1200px', height: '600px', 
        background: `radial-gradient(circle, ${colors.accent}05 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: 'none'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: "center" }}>
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Chip 
            label="TIER 3: CONTROL" 
            sx={{ 
              mb: 3, fontWeight: 800, fontSize: "0.7rem", letterSpacing: 1.5,
              bgcolor: `${colors.lucraGold}15`, color: colors.lucraGold, 
              border: `1px solid ${colors.lucraGold}30`
            }} 
          />
          
          <Typography variant="h2" fontWeight={900} sx={{ 
            color: palette.textPrimary, 
            mb: 3,
            fontSize: { xs: "2rem", md: "3.5rem" },
            letterSpacing: "-0.02em",
            lineHeight: 1.1
          }}>
            Transforming ERPs from <br />
            <span style={{ color: colors.accent }}>Passive Record-Keeping.</span>
          </Typography>

          <Typography sx={{
            color: palette.textDim,
            maxWidth: 800,
            mx: "auto",
            mb: 10,
            fontSize: { xs: "1.1rem", md: "1.3rem" },
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            To continuous, autonomous control. Omeca unifies operational truth, 
            real-time close, and verifiable intelligence in one platform.
          </Typography>
        </motion.div>

        {/* --- PREMIUM GLASS MARQUEE --- */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            py: 6,
            borderRadius: 4,
            // Executive Glassmorphism
            background: isDark 
                ? "linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.01) 100%)"
                : "linear-gradient(90deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.01) 100%)",
            border: `1px solid ${palette.textDim}10`,
            backdropFilter: "blur(14px)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            boxShadow: isDark ? "0 20px 60px -20px rgba(0,0,0,0.3)" : "0 20px 60px -20px rgba(0,0,0,0.05)"
          }}
        >
          {/* Fade Masks (Left & Right) */}
          <Box sx={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "200px", zIndex: 2,
            background: `linear-gradient(90deg, ${isDark ? '#161C29' : '#F8FAFC'}, transparent)`, 
            pointerEvents: "none"
          }} />
          <Box sx={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "200px", zIndex: 2,
            background: `linear-gradient(270deg, ${isDark ? '#161C29' : '#F8FAFC'}, transparent)`,
            pointerEvents: "none"
          }} />

          {/* The Scrolling Track */}
          <motion.div
            variants={marquee}
            animate="animate"
            style={{
              display: "flex",
              gap: "4rem",
              whiteSpace: "nowrap",
              alignItems: "center",
              paddingLeft: "6rem" 
            }}
          >
            {[...integrations, ...integrations, ...integrations].map((name, idx) => (
              <Typography
                key={idx}
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: palette.textDim,
                  opacity: 0.5,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  userSelect: "none",
                  fontSize: { xs: "1rem", md: "1.3rem" },
                  fontFamily: "monospace", 
                  transition: "all 0.3s ease",
                  cursor: "default",
                  "&:hover": {
                      color: colors.accent,
                      opacity: 1,
                      transform: "scale(1.05)",
                      textShadow: `0 0 20px ${colors.accent}60`
                  }
                }}
              >
                {name}
              </Typography>
            ))}
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default OmecaSupportedIntegrations;