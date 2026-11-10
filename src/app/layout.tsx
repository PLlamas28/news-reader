import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { Header } from "@/components/Header/Header";
import { UrqlProvider } from "@/lib/urqlProvider";
import "@/styles/globals.scss";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "News Reader",
  description: "A small, fast news reader built with Next.js and GraphQL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body>
        <UrqlProvider>
          <Header />
          <main id="main">{children}</main>
        </UrqlProvider>
      </body>
    </html>
  );
}
