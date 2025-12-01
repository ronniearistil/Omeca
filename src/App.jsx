// // src/App.jsx
// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { CssBaseline } from "@mui/material";
// 
// import ThemeWrapper from "./shared/layouts/theme/ThemeContext.jsx";
// import OmecaLanding from "./OmecaLanding.jsx";
// 
// // --- LEDGER PAGES ---
// import PricingPage from "./omeca-ledger/components/pages/PricingPage.jsx";
// import LedgerAPIPage from "./omeca-ledger/components/pages/LedgerAPIPage.jsx";
// import LegalPage from "./omeca-ledger/components/pages/LegalPage.jsx";
// 
// // --- CORE PAGES ---
// import CareersPage from "./marketing/CareersPage.jsx";
// import CompanyInfoPage from "./marketing/CompanyInfoPage.jsx";
// import ContactPage from "./marketing/ContactPage.jsx";
// import MarginAlertsPage from "./omeca-core/components/pages/MarginAlertsPage.jsx";
// import ReconciliationPage from "./omeca-core/components/pages/ReconciliationPage.jsx";
// import OmecaBrief from "./marketing/OmecaBrief.jsx";
// 
// import OmecaTrustStackPreview from "./omeca-governance/components/pages/OmecaTrustStackPreview.jsx";
// 
// // Minimal placeholder
// const Placeholder = ({ title }) => (
//     <div style={{ padding: "120px 40px", textAlign: "center" }}>
//         <h1>{title}</h1>
//         <p>Content coming soon.</p>
//     </div>
// );
// 
// export default function App() {
//     return (
//         <BrowserRouter>
//             <ThemeWrapper>
//                 <CssBaseline />
//                 <Routes>
//                     {/* Landing */}
//                     <Route path="/" element={<OmecaLanding />} />
// 
//                     {/* Trust Stack */}
//                     <Route path="/trust-stack" element={<OmecaTrustStackPreview />} />
// 
//                     {/* Product & Feature Pages */}
//                     <Route path="/pricing" element={<PricingPage />} />
//                     <Route path="/ledger-api" element={<LedgerAPIPage />} />
//                     <Route path="/reconciliation" element={<ReconciliationPage />} />
//                     <Route path="/margin-alerts" element={<MarginAlertsPage />} />
// 
//                     {/* Company - FIXED THIS ROUTE */}
//                     <Route path="/company" element={<CompanyInfoPage />} /> 
//                     <Route path="/careers" element={<CareersPage />} />
//                     <Route path="/contact" element={<ContactPage />} />
//                     <Route path="/blog" element={<Placeholder title="Blog" />} />
// 
//                     {/* Resources */}
//                     <Route path="/brief" element={<OmecaBrief />} />
//                     <Route path="/documentation" element={<Placeholder title="Documentation" />} />
//                     <Route path="/security" element={<Placeholder title="Security" />} />
// 
//                     {/* Legal */}
//                     <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
//                     <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
//                     <Route path="/cookies" element={<Placeholder title="Cookie Policy" />} />
//                     <Route path="/legal" element={<LegalPage />} />
// 
//                     {/* Fallback */}
//                     <Route path="*" element={<Navigate to="/" replace />} />
//                 </Routes>
//             </ThemeWrapper>
//         </BrowserRouter>
//     );
// }


import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import ThemeWrapper from "./shared/layouts/theme/ThemeContext.jsx";

// --- AUTH IMPORTS ---
import PartnerLogin from "./auth/PartnerLogin.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx"; 

// --- SHARED PAGES ---
import OmecaLanding from "./OmecaLanding.jsx";
import DashboardPage from "./shared/pages/DashboardPage.jsx"; 

// Ledger Pages
import PricingPage from "./omeca-ledger/components/pages/PricingPage.jsx";
import LedgerAPIPage from "./omeca-ledger/components/pages/LedgerAPIPage.jsx";
import LegalPage from "./omeca-ledger/components/pages/LegalPage.jsx";

// Core Pages
import MarginAlertsPage from "./omeca-core/components/pages/MarginAlertsPage.jsx";
import ReconciliationPage from "./omeca-core/components/pages/ReconciliationPage.jsx";

// Marketing / Governance Pages
import CareersPage from "./marketing/CareersPage.jsx";
import CompanyInfoPage from "./marketing/CompanyInfoPage.jsx";
import ContactPage from "./marketing/ContactPage.jsx";
import OmecaBrief from "./marketing/OmecaBrief.jsx";
import OmecaTrustStackPreview from "./omeca-governance/components/pages/OmecaTrustStackPreview.jsx";

// Reporting Imports (New/Required for gating)
import AgentActivityReport from "./reporting/ai/AgentActivityReport.jsx";
import ExplainabilityReport from "./reporting/ai/ExplainabilityReport.jsx";
import RiskDashboardPage from "./reporting/ai/RiskDashboardPage.jsx";
import FinancialOverviewPage from "./reporting/financial/FinancialOverviewPage.jsx";
import InvestorMetricsPage from "./reporting/financial/InvestorMetricsPage.jsx";
import ProfitAndLossPage from "./reporting/financial/ProfitAndLossPage.jsx";
import AuditSummaryPage from "./reporting/governance/AuditSummaryPage.jsx";
import ComplianceDashboardPage from "./reporting/governance/ComplianceDashboardPage.jsx";
import EvidenceReportPage from "./reporting/governance/EvidenceReportPage.jsx";
import ForecastVsActualPage from "./reporting/operational/ForecastVsActualPage.jsx";
import MarginAnalysisPage from "./reporting/operational/MarginAnalysisPage.jsx";
import VarianceReportPage from "./reporting/operational/VarianceReportPage.jsx";


const Placeholder = ({ title }) => (
    <div style={{ padding: "120px 40px", textAlign: "center" }}>
        <h1>{title}</h1>
        <p>Content coming soon.</p>
    </div>
);

// Helper function to wrap protected routes
const SecuredRoute = ({ element: Component }) => (
    <ProtectedRoute>
        <Component />
    </ProtectedRoute>
);

export default function App() {
    return (
        <BrowserRouter>
            <ThemeWrapper>
                <CssBaseline />
                <Routes>
                    {/* ===================================================
                        ZONE 1: PUBLIC MARKETING (High-Level Visuals)
                       =================================================== */}
                    <Route path="/" element={<OmecaLanding />} />
                    <Route path="/partner-login" element={<PartnerLogin />} />
                    
                    {/* Public: Trust Stack "Preview" (Visual only, no deep data) */}
                    <Route path="/trust-stack" element={<OmecaTrustStackPreview />} />
                    
                    {/* Public: Standard SaaS Info */}
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/company" element={<CompanyInfoPage />} /> 
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/blog" element={<Placeholder title="Blog" />} />
                    
                    {/* Public: Resources & Legal */}
                    <Route path="/documentation" element={<Placeholder title="Documentation" />} />
                    <Route path="/security" element={<Placeholder title="Security Overview" />} />
                    <Route path="/legal" element={<LegalPage />} />
                    <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
                    <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
                    <Route path="/cookies" element={<Placeholder title="Cookie Policy" />} />


                    {/* ===================================================
                        ZONE 2: PROTECTED PRODUCT (The "Secret Sauce")
                       =================================================== */}
                    
                    {/* Mission Control */}
                    <Route path="/dashboard" element={<SecuredRoute element={DashboardPage} />} />

                    {/* Sensitive Strategy Info */}
                    <Route path="/brief" element={<SecuredRoute element={OmecaBrief} />} />

                    {/* CORE & LEDGER TOOLS */}
                    <Route path="/margin-alerts" element={<SecuredRoute element={MarginAlertsPage} />} />
                    <Route path="/reconciliation" element={<SecuredRoute element={ReconciliationPage} />} />
                    <Route path="/ledger-api" element={<SecuredRoute element={LedgerAPIPage} />} />

                    {/* REPORTING PAGES (ALL GATED) */}
                    
                    {/* AI Reporting */}
                    <Route path="/reporting/ai/agent-activity" element={<SecuredRoute element={AgentActivityReport} />} />
                    <Route path="/reporting/ai/explainability" element={<SecuredRoute element={ExplainabilityReport} />} />
                    <Route path="/reporting/ai/risk-dashboard" element={<SecuredRoute element={RiskDashboardPage} />} />

                    {/* Financial Reporting */}
                    <Route path="/reporting/financial/overview" element={<SecuredRoute element={FinancialOverviewPage} />} />
                    <Route path="/reporting/financial/investor-metrics" element={<SecuredRoute element={InvestorMetricsPage} />} />
                    <Route path="/reporting/financial/pnl" element={<SecuredRoute element={ProfitAndLossPage} />} />
                    
                    {/* Governance Reporting */}
                    <Route path="/reporting/governance/audit-summary" element={<SecuredRoute element={AuditSummaryPage} />} />
                    <Route path="/reporting/governance/compliance" element={<SecuredRoute element={ComplianceDashboardPage} />} />
                    <Route path="/reporting/governance/evidence-report" element={<SecuredRoute element={EvidenceReportPage} />} />

                    {/* Operational Reporting */}
                    <Route path="/reporting/operational/forecast-vs-actual" element={<SecuredRoute element={ForecastVsActualPage} />} />
                    <Route path="/reporting/operational/margin-analysis" element={<SecuredRoute element={MarginAnalysisPage} />} />
                    <Route path="/reporting/operational/variance-report" element={<SecuredRoute element={VarianceReportPage} />} />


                    {/* FALLBACK */}
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
