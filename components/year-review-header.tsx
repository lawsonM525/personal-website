export function YearReviewHeader({ year }: { year: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 relative">
      <h1 className="text-8xl md:text-9xl font-serif tracking-wider text-white">
        A Year
      </h1>
      <div className="w-24 h-0.5 bg-white/20" />
      <h2 className="text-7xl md:text-8xl font-serif tracking-wider text-white/90">
        In Review
      </h2>
      <p className="absolute bottom-12 text-xl text-white/60">
        {year}
      </p>
    </div>
  )
}

