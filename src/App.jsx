// import React from "react";
// import { CssBaseline } from "@mui/material";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import ThemeWrapper from "./layouts/theme/ThemeContext.jsx";
// 
// import OmecaLanding from "./OmecaLanding.jsx";
// import OmecaGovernanceInvestorBrief from "./omeca-governance/components/pages/OmecaGovernanceInvestorBrief.jsx";
// import OmecaGovernanceDashboardPreview from "./omeca-governance/components/pages/OmecaTrustStackPreview.jsx";
// import OmecaGovernanceDashboardPage from "./omeca-governance/components/pages/OmecaGovernancePage.jsx";
// import OmecaBrief from "./components/pages/OmecaBrief.jsx";
// 
// 
// export default function App() {
//   return (
//     <BrowserRouter>
//       <ThemeWrapper>
//         <CssBaseline />
//         <div className="omeca-wrapper">
//           <Routes>
// 
//             {/* ✅ Primary Landing Page */}
//             <Route path="/" element={<OmecaLanding />} />
//             {/* ✅ Investor Pitch */}
//             <Route path="/brief" element={<OmecaBrief />} />
// 
//             {/* Governance pages (still WIP) */}
//             <Route path="/brief" element={<OmecaGovernanceInvestorBrief />} />
//             <Route path="/coredashboard" element={<OmecaGovernanceDashboardPage />} />
//             <Route path="/preview" element={<OmecaGovernanceDashboardPreview />} />
// 
//             {/* Catch-all → redirect to landing */}
//             <Route path="*" element={<Navigate to="/" replace />} />
// 
//           </Routes>
//         </div>
//       </ThemeWrapper>
//     </BrowserRouter>
//   );
// }


// src/App.jsx
import React from 'react';
// This imports the "AppThemeWrapper" default export from the file I gave you
import OmecaLandingApp from './OmecaLanding.jsx'; 

export default function App() {
  // The Landing App already handles Themes, CSSBaseline, and Routing internally.
  return (
    <OmecaLandingApp />
  );
}

