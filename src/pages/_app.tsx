import type { AppProps } from "next/app";
import Layout from "@layouts/Layout";
import "@styles/index.css";
import {ToastProvider} from "@context/ToastProvider";


export default function MyApp({ Component, pageProps }: AppProps) {

    return (
            <ToastProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ToastProvider>
    );
}
