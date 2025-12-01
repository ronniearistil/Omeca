import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// --- CORE FIX: Removing '.jsx' / '.js' extensions to simplify path resolution ---
import ThemeWrapper from "./shared/layouts/theme/ThemeContext";

// --- AUTH IMPORTS ---
import PartnerLogin from "./auth/PartnerLogin";
import ProtectedRoute from "./auth/ProtectedRoute"; 

// --- SHARED PAGES ---
import OmecaLanding from "./OmecaLanding";
import DashboardPage from "./shared/pages/DashboardPage"; 

// Ledger Pages
import PricingPage from "./omeca-ledger/components/pages/PricingPage";
import LedgerAPIPage from "./omeca-ledger/components/pages/LedgerAPIPage";
import LegalPage from "./omeca-ledger/components/pages/LegalPage";

// Core Pages
import MarginAlertsPage from "./omeca-core/components/pages/MarginAlertsPage";
import ReconciliationPage from "./omeca-core/components/pages/ReconciliationPage";

// Marketing / Governance Pages
import CareersPage from "./marketing/CareersPage";
import CompanyInfoPage from "./marketing/CompanyInfoPage";
import ContactPage from "./marketing/ContactPage";
import OmecaBrief from "./marketing/OmecaBrief";
import OmecaTrustStackPreview from "./omeca-governance/components/pages/OmecaTrustStackPreview";

// --- REPORTING IMPORTS (Required for Gating) ---
import AgentActivityReport from "./reporting/ai/AgentActivityReport";
import ExplainabilityReport from "./reporting/ai/ExplainabilityReport";
import RiskDashboardPage from "./reporting/ai/RiskDashboardPage";
import FinancialOverviewPage from "./reporting/financial/FinancialOverviewPage";
import InvestorMetricsPage from "./reporting/financial/InvestorMetricsPage";
import ProfitAndLossPage from "./reporting/financial/ProfitAndLossPage";
import AuditSummaryPage from "./reporting/governance/AuditSummaryPage";
import ComplianceDashboardPage from "./reporting/governance/ComplianceDashboardPage";
import EvidenceReportPage from "./reporting/governance/EvidenceReportPage";
import ForecastVsActualPage from "./reporting/operational/ForecastVsActualPage";
import MarginAnalysisPage from "./reporting/operational/MarginAnalysisPage";
import VarianceReportPage from "./reporting/operational/VarianceReportPage";


const Placeholder = ({ title }) => (
    <div style={{ padding: "120px 40px", textAlign: "center" }}>
        <h1>{title}</h1>
        <p>Content coming soon.</p>
    </div>
);

// Helper component to wrap protected routes
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
