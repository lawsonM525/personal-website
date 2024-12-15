import type { Metadata } from "next"
import "./globals.css"
import { LayoutClient } from "./layout-client"

export const metadata: Metadata = {
  title: "Michelle Lawson",
  description: "Michelle Lawson is a top voice in technology education. With over 150,000 followers across various social media platforms, she has established herself as a leading figure in the field. An accomplished author, Michelle has written multiple books that use fashion and makeup-themed metaphors to make complex computer science concepts more engaging. As an undergraduate researcher, she has published papers with the American Society of Engineering Education, focusing on Computer Science education. Michelle also curates a strong collection of educational resources designed to help students succeed in their STEM degrees.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutClient>{children}</LayoutClient>
}

