import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production' || process.env.ENVIRONMENT === 'production';
  
  // Parse allowed hosts from environment variable
  // Extract hostname from URLs if protocol is included
  const allowedHosts = process.env.ALLOWED_HOSTS
    ? process.env.ALLOWED_HOSTS.split(',').map(host => {
        const trimmedHost = host.trim();
        try {
          // If it's a full URL, extract the hostname
          if (trimmedHost.startsWith('http://') || trimmedHost.startsWith('https://')) {
            return new URL(trimmedHost).hostname;
          }
          // Remove trailing slashes
          return trimmedHost.replace(/\/+$/, '');
        } catch {
          return trimmedHost.replace(/\/+$/, '');
        }
      })
    : ['localhost'];

  return {
    server: {
      host: process.env.HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8080"),
      hmr: isProduction ? false : {
        clientPort: parseInt(process.env.PORT || "8080"),
      },
      allowedHosts,
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
