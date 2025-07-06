import type { Metadata } from "next"
import "./globals.css"
import { LayoutClient } from "./layout-client"
import favicon from "@/assets/mia-icon-big.png"
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Michelle Lawson",
  description: "Michelle Lawson is a top voice in technology education. With over 150,000 followers across various social media platforms, she has established herself as a leading figure in the field. An accomplished author, Michelle has written multiple books that use fashion and makeup-themed metaphors to make complex computer science concepts more engaging. As an undergraduate researcher, she has published papers with the American Society of Engineering Education, focusing on Computer Science education. Michelle also curates a strong collection of educational resources designed to help students succeed in their STEM degrees.",
  icons: {
    icon: favicon.src
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JDSM0Q7X0G"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JDSM0Q7X0G');
          `}
        </Script>
      </head>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
