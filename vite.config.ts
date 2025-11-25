import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Parse allowed hosts from environment variable
  const allowedHosts = process.env.ALLOWED_HOSTS
    ? process.env.ALLOWED_HOSTS.split(',').map(host => host.trim())
    : ['localhost'];

  return {
    server: {
      host: process.env.HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8080"),
      hmr: {
        clientPort: parseInt(process.env.PORT || "8080"),
      },
    },
    preview: {
      host: process.env.HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8080"),
      strictPort: false,
      allowedHosts,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
