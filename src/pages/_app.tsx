import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";

import "@/styles/globals.css";

const poppins = Poppins({
  weight: ["400"],
  style: ["normal"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <main className={`${poppins.variable} font-sans`}>
        <Component {...pageProps} />
        <Analytics />
      </main>
    </ThemeProvider>
  );
}
