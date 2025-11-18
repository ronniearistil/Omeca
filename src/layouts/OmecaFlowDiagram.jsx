// src/OmecaConnect/components/layout/OmecaFlowDiagram.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { colors } from "../layouts/theme/theme.js";
import { ColorModeContext } from "../layouts/theme/ThemeContext.jsx";


const OmecaFlowDiagram = () => {
  const { mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isDark = mode === "dark";

  return (
    <svg
      viewBox="0 0 720 520"
      width="100%"
      height="auto"
      style={{ maxWidth: "950px", margin: "0 auto", display: "block" }}
    >
      {/* === DEFINITIONS === */}
      <defs>
        {/* Inbound flow gradient (cyan-teal) */}
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E5BE" />
          <stop offset="50%" stopColor="#18FFF0" />
          <stop offset="100%" stopColor="#00E5BE" />
        </linearGradient>

        {/* Outbound gradient (cyan → gold) */}
        <linearGradient id="outputGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00E5BE" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>

        {/* Glow filter (adaptive to theme) */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur
            stdDeviation={isDark ? "3" : "1.8"}
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* === INBOUND NODES === */}
      {[
        { label: "Billing", x: 100, y: 150 },
        { label: "FP&A", x: 240, y: 50 },
        { label: "Control", x: 520, y: 75 },
        { label: "RevOps", x: 640, y: 160 },
      ].map((node, i) => (
        <motion.g
          key={node.label}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Circle */}
          <circle
            cx={node.x}
            cy={node.y}
            r="28"
            fill={isDark ? "#0B1528" : "#FFFFFF"}
            stroke="url(#flowGradient)"
            strokeWidth="2.5"
            filter="url(#glow)"
          />

          {/* Label */}
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill={isDark ? "#FFFFFF" : "#111111"}
            paintOrder="stroke"
            strokeWidth="2"
            stroke={isDark ? "#0A192F" : "#FFFFFF"}
          >
            {node.label}
          </text>

          {/* Animated inbound arrow */}
          <motion.path
            d={`M${node.x} ${node.y + 30} Q360 220 360 270`}
            stroke="url(#flowGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
            strokeDasharray="12 20"
            animate={{ strokeDashoffset: [60, 0] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.g>
      ))}

      {/* === OMECA CENTRAL NODE === */}
      <motion.circle
        cx="360"
        cy="290"
        r="55"
        fill="#00E5BE"
        stroke="#D4AF37"
        strokeWidth="1.5"
        filter="url(#glow)"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Halo Pulse */}
      <motion.circle
        cx="360"
        cy="290"
        r="70"
        stroke="#D4AF37"
        strokeWidth="1.4"
        fill="none"
        animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.07, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <text
        x="360"
        y="295"
        textAnchor="middle"
        fontSize="16"
        fontWeight="900"
        fill={isDark ? "#041632a6" : "#ffffffff"}
      >
        OMECA
      </text>

      {/* === OUTBOUND FLOW (OMECA → ERP) === */}
      <motion.path
        d="M360 345 Q360 410 360 455"
        stroke="url(#outputGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
        strokeDasharray="15 25"
        animate={{ strokeDashoffset: [70, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Continuous faint pulse behind arrow */}
      <motion.path
        d="M360 345 Q360 410 360 455"
        stroke="#00E5BE"
        strokeWidth="5"
        strokeLinecap="round"
        strokeOpacity="0.15"
        fill="none"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      />

      {/* === ERP NODE === */}
      <motion.circle
        cx="360"
        cy="475"
        r="38"
        fill={isDark ? "#919ba9ff" : "#193562ff"}
        stroke="#00E5BE"
        strokeWidth="1.8"
        filter="url(#glow)"
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <text
        x="360"
        y="480"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill={theme.palette.text.primary}
      >
        Truth
      </text>
    </svg>
  );
};

export default OmecaFlowDiagram;

