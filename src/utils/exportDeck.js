// utils/exportDeck.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as ReactDOMClient from "react-dom/client";
import * as React from "react";

export const exportDeckAsPDF = async (slides, ThemeWrapper, themeMode) => {
  if (!slides?.length || !ThemeWrapper) {
    console.error("Missing slides or ThemeWrapper");
    return;
  }

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [1920, 1080],
  });

  // --- 1. Visible offscreen container (not hidden/transparent) ---
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "absolute",
    top: "-99999px",
    left: "0",
    width: "1920px",
    visibility: "visible",
    opacity: "1", // must stay visible
    background: themeMode === "dark" ? "#111827" : "#D8E8E6",
    transform: "scale(1)", // avoid zero scale
    zIndex: "-1",
  });
  document.body.appendChild(container);

  // --- 2. Render all slides ---
  const root = ReactDOMClient.createRoot(container);
  root.render(
    React.createElement(
      ThemeWrapper,
      null,
      slides.map((Slide, i) =>
        React.createElement(
          "div",
          {
            key: i,
            style: {
              width: "1920px",
              height: "1080px",
              background: themeMode === "dark" ? "#111827" : "#D8E8E6",
            },
          },
          React.createElement(Slide, { disableMotion: true })
        )
      )
    )
  );

  // --- 3. Wait for layout & fonts to stabilize ---
  await new Promise((r) => setTimeout(r, 2500));

  // --- 4. Capture the full container ---
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    backgroundColor: themeMode === "dark" ? "#111827" : "#D8E8E6",
    logging: false,
  });

  const totalHeight = canvas.height;
  const pageHeight = Math.floor(totalHeight / slides.length);

  root.unmount();
  document.body.removeChild(container);

  // --- 5. Slice into individual pages ---
  for (let i = 0; i < slides.length; i++) {
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = 1920;
    pageCanvas.height = 1080;
    const ctx = pageCanvas.getContext("2d");

    ctx.drawImage(
      canvas,
      0,
      i * pageHeight,
      canvas.width,
      pageHeight,
      0,
      0,
      1920,
      1080
    );

    const img = pageCanvas.toDataURL("image/png");
    if (i > 0) pdf.addPage([1920, 1080], "landscape");
    pdf.addImage(
      img,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );
  }

  pdf.save("Melucra_PitchDeck.pdf");
};
