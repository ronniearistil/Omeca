// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import ThemeWrapper from "./shared/layouts/theme/ThemeContext.jsx";
import OmecaLanding from "./OmecaLanding.jsx";

// --- LEDGER PAGES (final correct paths) ---
import PricingPage from "./omeca-ledger/components/pages/PricingPage.jsx";
import LedgerAPIPage from "./omeca-ledger/components/pages/LedgerAPIPage.jsx";
import LegalPage from "./omeca-ledger/components/pages/LegalPage.jsx";

// --- CORE PAGES (final correct paths) ---
import CareersPage from "./marketing/CareersPage.jsx";
import CompanyInfoPage from "./marketing/CompanyInfoPage.jsx";
import ContactPage from "./marketing/ContactPage.jsx";
import MarginAlertsPage from "./omeca-core/components/pages/MarginAlertsPage.jsx";
import ReconciliationPage from "./omeca-core/components/pages/ReconciliationPage.jsx";
import OmecaBrief from "./marketing/OmecaBrief.jsx";

// Minimal placeholder
const Placeholder = ({ title }) => (
    <div style={{ padding: "120px 40px", textAlign: "center" }}>
        <h1>{title}</h1>
        <p>Content coming soon.</p>
    </div>
);

export default function App() {
    return (
        <BrowserRouter>
            <ThemeWrapper>
                <CssBaseline />
                <Routes>
                    {/* Landing */}
                    <Route path="/" element={<OmecaLanding />} />

                    {/* Trust Stack */}
                    <Route path="/trust-stack" element={<Placeholder title="Trust Stack" />} />

                    {/* Product & Feature Pages */}
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/ledger-api" element={<LedgerAPIPage />} />
                    <Route path="/reconciliation" element={<ReconciliationPage />} />
                    <Route path="/margin-alerts" element={<MarginAlertsPage />} />

                    {/* Company */}
                    <Route path="/about" element={<CompanyInfoPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/blog" element={<Placeholder title="Blog" />} />

                    {/* Resources */}
                    <Route path="/brief" element={<OmecaBrief />} />
                    <Route path="/documentation" element={<Placeholder title="Documentation" />} />
                    <Route path="/security" element={<Placeholder title="Security" />} />

                    {/* Legal */}
                    <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
                    <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
                    <Route path="/cookies" element={<Placeholder title="Cookie Policy" />} />
                    <Route path="/legal" element={<LegalPage />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ThemeWrapper>
        </BrowserRouter>
    );
}






// // src/App.jsx
// import React from 'react';
// import AppThemeWrapper from './OmecaLanding'; // Or wherever you saved my previous component
// 
// function App() {
//   // DIRECTLY render the component. 
//   // Do NOT wrap this in <AppLayout> or <Container>.
//   return <AppThemeWrapper />;
// }
// 
// export default App;
// 
