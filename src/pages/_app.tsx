// src/pages/_app.tsx
import type { AppProps } from "next/app";
import Layout from "@layouts/Layout";
import "@styles/index.css";
import { ToastProvider } from "@context/ToastProvider";
import { CartProvider } from "@/context/CartProvider";
import Script from "next/script";
import { AuthProvider } from "@context/AuthContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Layout>
            <Script
              src="https://cdn.botpress.cloud/webchat/v3.0/inject.js"
              strategy="lazyOnload"
              onLoad={() => {
                console.log('Botpress inject.js loaded');
              }}
              onError={(e) => {
                console.error('Error loading Botpress inject.js:', e);
              }}
            />
            <Script
              src="https://files.bpcontent.cloud/2025/07/01/08/20250701084612-55WFDZQ5.js"
              strategy="lazyOnload"
              onLoad={() => {
                console.log('Botpress config loaded');
              }}
              onError={(e) => {
                console.error('Error loading Botpress config:', e);
              }}
            />
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}