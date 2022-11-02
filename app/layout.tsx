import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThirdWebContext from "../components/ThirdWebContext";
import { Expletus_Sans } from "@next/font/google";

// Use the below google font
const expletusSans = Expletus_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdWebContext>
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
          <main className="grow max-w-7xl mx-auto py-12">{children}</main>
          <Footer />
        </body>
      </html>
    </ThirdWebContext>
  );
}
