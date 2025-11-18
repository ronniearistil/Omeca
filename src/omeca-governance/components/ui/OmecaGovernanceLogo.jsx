// src/Melucra/components/ui/MelucraLogo.jsx

import React from 'react';

const OmecaLogo = ({ size = 36 }) => (
    <img
        src="/assets/Omeca/omeca-logo.png"
        alt="Omeca Logo"
        width={size}
        height={size}
        style={{ display: 'block' }}
    />
);

export default OmecaLogo;