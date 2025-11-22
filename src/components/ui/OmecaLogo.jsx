import React from "react";
import { Box, useTheme } from "@mui/material";

const OmecaLogo = ({ size = 72 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="img"
      src="/assets/omeca-logo.png"
      alt="Omeca Logo"
      sx={{
        height: size,
        width: "auto",
        objectFit: "contain",
        cursor: "pointer",

        // smoother animation
        transition: "all 0.25s ease",

        // improved visibility in dark mode
        filter: isDark
          ? "brightness(2.1) saturate(1.4) contrast(1.25)"
          : "brightness(1) saturate(1.05) contrast(1.05)",

        // stronger hover state
        "&:hover": {
          transform: "scale(1.08)",
          filter: isDark
            ? "brightness(2.3) saturate(1.5) contrast(1.3)"
            : "brightness(1.15) saturate(1.1) contrast(1.1)",
        },
      }}
    />
  );
};

export default OmecaLogo;


