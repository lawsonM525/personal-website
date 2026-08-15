import { LearnThemeProvider } from "@/components/learn/learn-theme"

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <LearnThemeProvider>{children}</LearnThemeProvider>
}
