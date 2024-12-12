interface HandwrittenTextProps {
  children: React.ReactNode
  className?: string
}

export function HandwrittenText({ children, className = "" }: HandwrittenTextProps) {
  return (
    <div className={`font-handwriting text-lg ${className}`} style={{ fontFamily: "'Caveat', cursive" }}>
      {children}
    </div>
  )
}

