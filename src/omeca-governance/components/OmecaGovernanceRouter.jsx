
// src/components/MelucraAppRouter.jsx
import React, { useEffect } from 'react';

// Import Page Components
import CareersPage from './pages/CareersPage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import ContactPage from './pages/ContactPage';
import LedgerAPIPage from './pages/LedgerAPIPage';
import LegalPage from './pages/LegalPage';
import MarginAlertsPage from './pages/MarginAlertsPage';
// import MelucraDashboardConnectedPage from './pages/MelucraDashboardConnectedPage'; // If needed
import PricingPage from './pages/PricingPage';
import ReconciliationPage from './pages/ReconciliationPage';

// Import Home Page Section Components
import DeveloperIntegration from './sections/DeveloperIntegration';
import ProblemSolutionComparison from './sections/ProblemSolutionComparison';
import ProfitFlow from './sections/ProfitFlow';
import SupportedIntegrations from './sections/SupportedIntegrations';
import DashboardPreview from './ui/DashboardPreview'; // Assuming this is part of the home page view

// Import Hero section components or define Hero here if it wasn't decoupled
// For simplicity, assuming Hero related JSX is directly in MelucraLanding for now

/**
 * Handles routing between different page views and the home page sections.
 * @param {object} props - Component props.
 * @param {string} props.currentPage - The identifier for the current page/view to display.
 * @param {function} props.setPage - Callback function to update the current page state.
 */
const MelucraAppRouter = ({ currentPage, setPage }) => {
    // Effect to scroll to the top when the page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Render component based on the currentPage prop
    switch (currentPage) {
        // Product Pages
        case 'ledger':
            return <LedgerAPIPage setPage={setPage} />;
        case 'reconciliation':
            return <ReconciliationPage setPage={setPage} />;
        case 'alerts':
            return <MarginAlertsPage setPage={setPage} />;
        case 'pricing':
            return <PricingPage setPage={setPage} />;

        // Company Pages
        case 'about': // Assuming 'about' and 'blog' might share a component or layout
        case 'blog':
            return <CompanyInfoPage setPage={setPage} />;
        case 'careers':
            return <CareersPage setPage={setPage} />;
        case 'contact':
            return <ContactPage setPage={setPage} />;

        // Legal & Docs Pages
        case 'privacy':
        case 'cookies':
        case 'terms':
        case 'security':
        case 'documentation':
            // Pass the specific target page to LegalPage for content differentiation
            return <LegalPage setPage={setPage} currentTarget={currentPage} />;

        // Home Page View
        case 'home':
        default:
            // Render the sequence of sections that make up the home page
            return (
                <>
                    {/* Note: Hero Section JSX likely remains in MelucraLanding.jsx */}
                    {/* The router only handles content *below* the hero/nav */}
                    <DashboardPreview /> {/* Included as part of home page content */}
                    <SupportedIntegrations />
                    <ProfitFlow />
                    <ProblemSolutionComparison />
                    <DeveloperIntegration setPage={setPage} /> {/* Pass setPage if needed */}
                </>
            );
    }
};

export default MelucraAppRouter;