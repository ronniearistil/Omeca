
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  ButtonBase,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import TimerOffRounded from "@mui/icons-material/TimerOffRounded";
import BrokenImageRounded from "@mui/icons-material/BrokenImageRounded";
import GppGoodRounded from "@mui/icons-material/GppGoodRounded";
import AutoModeRounded from "@mui/icons-material/AutoModeRounded";
import SyncRounded from "@mui/icons-material/SyncRounded";

// Theme imports
import { ColorModeContext } from "../../../shared/layouts/theme/ThemeContext.jsx";
import { colors } from "../../../shared/layouts/theme/theme.js";

const carouselData = [
  {
    id: 0,
    label: "L1 · OPERATIONS",
    crisis: {
      title: "Stale Architecture",
      subtitle: "Data Arrives Late",
      body:
        "ERPs were built for batch processes, not real time operations. Finance sees events only after they become stale, creating blind spots across the business.",
      icon: <TimerOffRounded />,
      accent: colors.errorRed,
    },
    solution: {
      title: "Omeca Core",
      subtitle: "Real Time Operational Truth",
      body:
        "Omeca becomes the source of real time financial truth. Every operational event is verified at the moment it occurs, giving leaders a live and accurate foundation.",
      icon: <SyncRounded />,
      accent: colors.accent,
    },
  },
  {
    id: 1,
    label: "L2 · THE CLOSE",
    crisis: {
      title: "Reconciliation Bottlenecks",
      subtitle: "Architecture Slows You Down",
      body:
        "The close depends on aligning systems that were never designed to agree. Teams chase errors, tie-outs, and timing differences that should not exist in the first place.",
      icon: <WarningAmberRounded />,
      accent: colors.errorRed,
    },
    solution: {
      title: "Omeca Ledger",
      subtitle: "Continuous Close",
      body:
        "Omeca keeps the books aligned automatically. The ledger stays correct throughout the month, turning the close into a confirmation — not a scramble.",
      icon: <AutoModeRounded />,
      accent: colors.accent,
    },
  },
  {
    id: 2,
    label: "L3 · GOVERNANCE",
    crisis: {
      title: "Unverifiable Numbers",
      subtitle: "Control Without Proof",
      body:
        "Faster integrations did not create trust. ERPs cannot explain why numbers are correct, and they provide no real time evidence for AI, audit, or compliance.",
      icon: <BrokenImageRounded />,
      accent: colors.errorRed,
    },
    solution: {
      title: "Omeca Governance",
      subtitle: "Continuous Verified Control",
      body:
        "Omeca embeds evidence and explanation into every transaction. Controls become autonomous, and every stakeholder shares the same real time, verifiable truth.",
      icon: <GppGoodRounded />,
      accent: colors.accent,
    },
  },
];

// =========================================
// SHARED CARD (UPDATED)
// =========================================
const SharedCard = ({ data, currentColors, isDark }) => (
  <Paper
    component={motion.div}
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 90, damping: 18 }}
    elevation={0}
    sx={{
      // p: { xs: 2.5, md: 4 },
      p: { xs: 2, sm: 2.5, md: 4 },

      height: "100%",
      width: "100%",
      borderRadius: 4, // unified OS radius
      border: `1px solid ${currentColors.textDim}22`,

      // OS glass surface
      background: isDark
        ? "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))"
        : "linear-gradient(145deg, #FFFFFF, #F7F9FC)",
      backdropFilter: "blur(14px)",

      // OS shadow
      boxShadow: isDark
        ? "0 20px 50px -12px rgba(0,0,0,0.35)"
        : "0 20px 50px -12px rgba(0,0,0,0.1)",

      display: "flex",
      flexDirection: "column",
      gap: 2,
      borderLeft: `4px solid ${data.accent}`,
      transition: "all 0.28s cubic-bezier(0.24, 0.74, 0.32, 1)",
    }}
  >
    {/* Header Row */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          backgroundColor: `${data.accent}1A`,
          color: data.accent,
          height: "100%",
          display: "flex",
        }}
      >
        {React.cloneElement(data.icon, { fontSize: "medium" })}
      </Box>

      <Box>
        <Typography
          variant="h6"
          fontWeight={900}
          sx={{
            color: currentColors.textPrimary,
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
          }}
        >
          {data.title}
        </Typography>

        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: data.accent,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {data.subtitle}
        </Typography>
      </Box>
    </Box>

    <Typography
      variant="body1"
      sx={{
        color: currentColors.textDim,
        lineHeight: 1.6,
        fontSize: "0.95rem",
      }}
    >
      {data.body}
    </Typography>
  </Paper>
);

// =========================================
// MAIN COMPONENT (UPDATED)
// =========================================
const OmecaMarketingCarousel = () => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];
  const isDark = mode === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % carouselData.length),
      5500
    );
    return () => clearInterval(interval);
  }, []);

  const currentData = carouselData[currentIndex];

  return (
    // <Box sx={{ py: { xs: 6, md: 10 }, width: "100%" }}>
    <Box sx={{ py: { xs: 3, sm: 4, md: 6 }, width: "100%" }}>
      <Container maxWidth="xl">
        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {carouselData.map((item, idx) => {
            const active = idx === currentIndex;
            return (
              <ButtonBase
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 50,

                  // OS pill styling
                  border: `1px solid ${
                    active ? colors.accent : currentColors.textDim + "15"
                  }`,
                  backgroundColor: active
                    ? `${colors.accent}12`
                    : `${currentColors.card}08`,
                  backdropFilter: "blur(8px)",
                  boxShadow: active
                    ? `0 0 0 1px ${colors.accent}20`
                    : "none",

                  transition: "all 0.25s ease",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    letterSpacing: "0.08em",
                    fontWeight: active ? 800 : 600,
                    color: active ? colors.accent : currentColors.textDim,
                  }}
                >
                  {item.label}
                </Typography>
              </ButtonBase>
            );
          })}
        </Box>

        {/* Side-by-side cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            <Grid
              container
              // spacing={{ xs: 2, md: 3 }}
              spacing={{ xs: 1.5, sm: 2, md: 3 }}
              justifyContent="center"
              alignItems="stretch"
              sx={{
                maxWidth: "1400px",
                margin: "0 auto",
                pt: { xs: 1, md: 2 },
                pb: { xs: 1, md: 2 },
              }}
            >
              {/* Crisis Card */}
              <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                <SharedCard
                  data={currentData.crisis}
                  currentColors={currentColors}
                  isDark={isDark}
                />
              </Grid>

              {/* Solution Card */}
              <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                <SharedCard
                  data={currentData.solution}
                  currentColors={currentColors}
                  isDark={isDark}
                />
              </Grid>
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default OmecaMarketingCarousel;
