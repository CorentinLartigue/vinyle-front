// src/pages/_app.tsx
import type { AppProps } from "next/app";
import Layout from "@layouts/Layout";
import "@styles/index.css";
import { ToastProvider } from "@context/ToastProvider";
import { AuthProvider } from "@context/AuthContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </AuthProvider>
  );
}