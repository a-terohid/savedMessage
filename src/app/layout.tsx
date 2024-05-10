import type { Metadata } from "next";
import "./globals.css";
import { FONTS } from "@/utils/fonts";
import NextAuthProvider from "@/providers/NextAuthProvider";
import Layout from "@/layout/Layout";

export const metadata: Metadata = {
  title: "Saved messages",
  description: "this is a seved message website that you can put your message and copy them any time ",
};

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={ FONTS } >
      <NextAuthProvider>
          <Layout>
            {children}
          </Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
