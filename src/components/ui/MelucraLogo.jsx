// src/Melucra/components/ui/MelucraLogo.jsx

import React from 'react';

const MelucraLogo = ({ size = 36 }) => (
    <img
        src="/assets/Melucra/melucra-logo.png"
        alt="Melucra Logo"
        width={size}
        height={size}
        style={{ display: 'block' }}
    />
);

export default MelucraLogo;