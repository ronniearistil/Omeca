// src/Melucra/components/sections/ProblemSolutionComparison.jsx

import React, { useContext } from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { ColorModeContext } from "../../layouts/theme/ThemeContext.jsx";
import { colors } from "../../layouts/theme/theme.js";

const ProblemSolutionComparison = () => {
  const { mode } = useContext(ColorModeContext);
  const currentColors = colors[mode];

  // ✅ Bullet points copied directly from the original homepage
  const problems = [
    "Legacy ERPs see invoices, not inference — blind to agent activity and compute cost.",
    "CFOs can’t trace AI spend back to validated outcomes or unit economics.",
    "Finance teams patch systems together with spreadsheets that break under scale.",
    "AI adoption is accelerating faster than internal control can catch up.",
  ];

  const solutions = [
    "AI-native audit core that translates every agent action into immutable financial proof.",
    "Purpose-built for the machine economy, not adapted from human workflows.",
    "Automated reconciliation and ERP sync that turns AI spend into verified financial data.",
    "Continuous compliance and visibility across all autonomous operations.",
  ];

  const ComparisonCard = ({ items, isSolution }) => (
    <Paper
      sx={{
        p: 4,
        height: "100%",
        borderRadius: 3,
        bgcolor: isSolution ? `${colors.successGreen}10` : `${colors.errorRed}10`,
        border: `1px solid ${isSolution ? colors.successGreen : colors.errorRed}44`,
        color: currentColors.textPrimary,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={800}
        sx={{
          color: isSolution ? colors.successGreen : colors.errorRed,
          mb: 2,
        }}
      >
        {isSolution
          ? "With Melucra: Auditable Control"
          : "Without Melucra: The Compliance Gap"}
      </Typography>
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {items.map((item, index) => (
          <Box
            key={index}
            component="li"
            sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
          >
            {isSolution ? (
              <CheckCircleOutlineRounded
                sx={{
                  color: colors.successGreen,
                  mr: 1,
                  mt: 0.5,
                  flexShrink: 0,
                }}
              />
            ) : (
              <CancelRounded
                sx={{
                  color: colors.errorRed,
                  mr: 1,
                  mt: 0.5,
                  flexShrink: 0,
                }}
              />
            )}
            <Typography variant="body2" color={currentColors.textDim}>
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 8, md: 10 },
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          color={currentColors.textPrimary}
          sx={{ mb: 1 }}
        >
          From Operational <span style={{ color: colors.errorRed }}>Noise</span>{" "}
          to Explainable Control
        </Typography>
        <Typography
          sx={{
            color: currentColors.textDim,
            mb: 6,
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Traditional ERPs cannot interpret autonomous activity or trace AI
          decisions. <strong>Melucra</strong> captures machine-level data and
          transforms it into transparent, verifiable financial records.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ComparisonCard items={problems} isSolution={false} />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ComparisonCard items={solutions} isSolution={true} />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProblemSolutionComparison;


