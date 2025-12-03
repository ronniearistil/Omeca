// src/shared/utils/mockFactory.js
import { faker } from '@faker-js/faker';

// Helper function for randomized latency
export const simulateFetch = (data, delay = 800) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * Simulator for Pricing Tier Data
 */
export const generatePricingTiers = (count = 3) => {
  const tiers = ['Core', 'Professional', 'Enterprise'];
  const basePrice = 5000;

  return Array.from({ length: count }).map((_, index) => {
    const isRecommended = index === 1;
    const tierName = tiers[index];
    const price = basePrice * (index + 1);

    return {
      id: faker.string.uuid(),
      title: tierName,
      description: `The foundational architecture for reliable financial data at scale.`,
      price: price,
      priceUnit: 'per month, billed annually',
      isRecommended: isRecommended,
      buttonText: isRecommended ? 'Start Proof of Concept' : 'Request Pricing',
      features: [
        { name: 'Core Data Ingestion (L1)', available: true },
        { name: 'Schema Integrity Validation', available: true },
        { name: 'Immutable Audit Trail (L3)', available: true },
        { name: 'Autonomous Reconciliation Engine (L2)', available: index >= 1 },
        { name: 'Custom GL Rule Builder', available: index >= 1 },
        { name: 'High Volume Data Streams', available: index >= 2 },
        { name: 'Dedicated Support Channel', available: index >= 2 },
        { name: 'Multi-Tenant Architecture', available: index >= 2 },
      ],
      footnote: index === 2 ? 'Contact sales for custom SLA and implementation.' : null,
    };
  });
};


/**
 * Simulator for Live Engine Dashboard Metrics
 */
export const generateLiveMetricData = (base = {}) => {
  const L1Rate = base.L1Rate || faker.number.float({ min: 95.0, max: 99.9, precision: 0.1 });
  const L2Rate = base.L2Rate || faker.number.float({ min: 85.0, max: L1Rate - 5, precision: 0.1 });
  const proofs = base.proofs || faker.number.int({ min: 1000, max: 50000 });
  
  const jitter = faker.number.float({ min: -0.1, max: 0.1, precision: 0.1 });

  return {
    l1: {
      title: 'Data Health Rate',
      value: (L1Rate + jitter).toFixed(1),
      unit: '%',
      description: 'Schema and integrity validation success rate.',
    },
    l2: {
      title: 'Auto Recon Rate',
      value: (L2Rate + jitter * 0.5).toFixed(1),
      unit: '%',
      description: 'Transaction-to-GL auto-classification efficiency.',
    },
    l3: {
      title: 'Immutable Proofs',
      value: proofs + faker.number.int({ min: 1, max: 5 }), 
      unit: '',
      description: 'Total transactions secured with cryptographic hash.',
    },
    _baseValues: { L1Rate, L2Rate, proofs } 
  };
};

/**
 * Simulator for Company Data (used by CompanyInfoPage)
 */
export const generateCompanyData = () => ({
    mission: "To shift the financial core of every enterprise from passive record-keeping to continuous, autonomous, and verifiable control.",
    vision: "To power the next generation of financial operations driven by AI agents and verifiable trust.",
    stats: [
        { label: 'Validated Transactions', value: '4.2 Billion', suffix: '+' },
        { label: 'Data Sources Integrated', value: '18+', suffix: '' },
        { label: 'Autonomy Rate Target', value: '98.5%', suffix: '' },
        { label: 'Total Funding', value: '$5M', suffix: ' (Seed)' },
    ],
    team: [
        { name: 'Dr. Evelyn Reed', title: 'Founder & CEO (AI/Architecture)', bio: faker.lorem.sentences(2), image: faker.image.avatar(), twitter: 'evelyn_ai', linkedin: 'evelynreed' },
        { name: 'Marcus Chen', title: 'Head of Engineering (System Trust)', bio: faker.lorem.sentences(2), image: faker.image.avatar(), twitter: 'marcus_sys', linkedin: 'marcuschen' },
        { name: 'Sofia Rodriguez', title: 'Head of Product (Enterprise Finance)', bio: faker.lorem.sentences(2), image: faker.image.avatar(), twitter: 'sofia_prod', linkedin: 'sofiarod' },
    ]
});