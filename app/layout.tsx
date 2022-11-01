// Needed for access to react context API
"use client";

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Expletus_Sans } from "@next/font/google";

// ThirdWeb SDK
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// Use the below google font
const expletusSans = Expletus_Sans();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <html lang="en" className={expletusSans.className}>
        <head>
          <title>NFTY Drops | Mint NFTs</title>
          <meta
            name="description"
            content="NFTY Drops - NFT minting platform."
          />
          <link rel="icon" href="/favicon.svg" />
        </head>
        <body className="bg-gray-900 min-h-screen text-white flex flex-col">
          <Header />
          <main className="max-w-7xl mx-auto py-8 grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ThirdwebProvider>
  );
}
