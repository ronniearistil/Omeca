import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemeWrapper from "./layouts/theme/ThemeContext.jsx";

import MelucraLanding from "./components/MelucraLanding";
import MelucraInvestorBrief from "./components/pages/MelucraInvestorBrief";
import MelucraDashboardPage from "./components/pages/MelucraDashboardPage";
import MelucraDashboardPreview from "./components/pages/MelucraDashboardPreview";
import MelucraDashboardConnectedPage from "./components/pages/MelucraDashboardConnectedPage";
export default function App() {
  return (
    <BrowserRouter>
      <ThemeWrapper>
        <CssBaseline />
        <div className="melucra-wrapper">
          <Routes>
            <Route path="/mellanding" element={<MelucraLanding />} />
            <Route path="/melbrief" element={<MelucraInvestorBrief />} />
            <Route path="/melcoredashboard" element={<MelucraDashboardConnectedPage />} />
            <Route path="/melpreview" element={<MelucraDashboardPreview />} />
            <Route path="/" element={<Navigate to="/mellanding" replace />} />
            <Route path="*" element={<Navigate to="/mellanding" replace />} />
          </Routes>
        </div>
      </ThemeWrapper>
    </BrowserRouter>
  );
}

