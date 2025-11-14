// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// 
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // 👇 Fix for ThemeContext/theme.js imports
      "../components/theme": path.resolve(__dirname, "./src/layouts/theme"),
    },
  },
});
