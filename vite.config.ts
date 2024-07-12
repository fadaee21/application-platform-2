import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@hooks": "src/hooks",
      "@styles": "/src/styles",
      "@types": "/src/type.d.ts",
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         // Split vendor code into separate chunks
  //         "react-vendor": ["react", "react-dom"],
  //         "leaflet-vendor": ["leaflet"],
  //         // Add more entries if needed
  //       },
  //     },
  //   },
  //   // chunkSizeWarningLimit: 600, // Adjust this as needed
  // },
});
