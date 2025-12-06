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

// --- REPORTING IMPORTS ---
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

export default function App() {
    return (
        <BrowserRouter>
            <ThemeWrapper>
                <CssBaseline />
                <Routes>
                    {/* ===================================================
                        PUBLIC MARKETING
                    =================================================== */}
                    <Route path="/" element={<OmecaLanding />} />
                    <Route path="/partner-login" element={<PartnerLogin />} />
                    {/* <Route path="/trust-stack" element={<OmecaTrustStackPreview />} /> */}
                    <Route
                        path="/trust-stack"
                        element={
                            <ProtectedRoute>
                                <OmecaTrustStackPreview />
                            </ProtectedRoute>
                        }
                    />


                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/company" element={<CompanyInfoPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/blog" element={<Placeholder title="Blog" />} />

                    <Route path="/documentation" element={<Placeholder title="Documentation" />} />
                    <Route path="/security" element={<Placeholder title="Security Overview" />} />
                    <Route path="/legal" element={<LegalPage />} />
                    <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
                    <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
                    <Route path="/cookies" element={<Placeholder title="Cookie Policy" />} />

                    {/* ===================================================
                        PROTECTED PRODUCT SECTION
                    =================================================== */}

                    {/* Mission Control */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Sensitive Strategy Info */}
                    <Route
                        path="/brief"
                        element={
                            <ProtectedRoute>
                                <OmecaBrief />
                            </ProtectedRoute>
                        }
                    />

                    {/* Core + Ledger */}
                    <Route
                        path="/margin-alerts"
                        element={
                            <ProtectedRoute>
                                <MarginAlertsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reconciliation"
                        element={
                            <ProtectedRoute>
                                <ReconciliationPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/ledger-api"
                        element={
                            <ProtectedRoute>
                                <LedgerAPIPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* AI Reporting */}
                    <Route
                        path="/reporting/ai/agent-activity"
                        element={
                            <ProtectedRoute>
                                <AgentActivityReport />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reporting/ai/explainability"
                        element={
                            <ProtectedRoute>
                                <ExplainabilityReport />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reporting/ai/risk-dashboard"
                        element={
                            <ProtectedRoute>
                                <RiskDashboardPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Financial Reporting */}
                    <Route
                        path="/reporting/financial/overview"
                        element={
                            <ProtectedRoute>
                                <FinancialOverviewPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reporting/financial/investor-metrics"
                        element={
                            <ProtectedRoute>
                                <InvestorMetricsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reporting/financial/pnl"
                        element={
                            <ProtectedRoute>
                                <ProfitAndLossPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Governance Reporting */}
                    <Route
                        path="/reporting/governance/audit-summary"
                        element={
                            <ProtectedRoute>
                                <AuditSummaryPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reporting/governance/compliance"
                        element={
                            <ProtectedRoute>
                                <ComplianceDashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reporting/governance/evidence-report"
                        element={
                            <ProtectedRoute>
                                <EvidenceReportPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Operational Reporting */}
                    <Route
                        path="/reporting/operational/forecast-vs-actual"
                        element={
                            <ProtectedRoute>
                                <ForecastVsActualPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reporting/operational/margin-analysis"
                        element={
                            <ProtectedRoute>
                                <MarginAnalysisPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reporting/operational/variance-report"
                        element={
                            <ProtectedRoute>
                                <VarianceReportPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ThemeWrapper>
        </BrowserRouter>
    );
}
// export async function certifyEvent(eventId, narrative, reason_code) 