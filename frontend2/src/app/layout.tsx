import { Inter } from "next/font/google";
import { cn } from "../../lib/utils";
import { TRPCReactProvider } from "~/trpc/react";
import Web3Provider from "./_components/Web3Provider";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
       <Web3Provider> <TRPCReactProvider>{children}</TRPCReactProvider> </Web3Provider>
      </body>
    </html>
  );
}
