import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemeWrapper from "./layouts/theme/ThemeContext.jsx";

import OmecaLanding from "./OmecaLanding.jsx";
import OmecaGovernanceInvestorBrief from "./omeca-governance/components/pages/OmecaGovernanceInvestorBrief.jsx";
import OmecaGovernanceDashboardPreview from "./omeca-governance/components/pages/OmecaGovernanceDashboardPreview.jsx";
import OmecaGovernanceDashboardPage from "./omeca-governance/components/pages/OmecaGovernanceDashboardPage.jsx";
import OmecaBrief from "./components/pages/OmecaBrief.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <ThemeWrapper>
        <CssBaseline />
        <div className="omeca-wrapper">
          <Routes>

            {/* ✅ Primary Landing Page */}
            <Route path="/" element={<OmecaLanding />} />
            {/* ✅ Investor Pitch */}
            <Route path="/brief" element={<OmecaBrief />} />

            {/* Governance pages (still WIP) */}
            <Route path="/brief" element={<OmecaGovernanceInvestorBrief />} />
            <Route path="/coredashboard" element={<OmecaGovernanceDashboardPage />} />
            <Route path="/preview" element={<OmecaGovernanceDashboardPreview />} />

            {/* Catch-all → redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </div>
      </ThemeWrapper>
    </BrowserRouter>
  );
}


