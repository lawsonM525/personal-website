interface StatProps {
  label: string
  value: number | string
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-semibold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

export function ProfileStats() {
  return (
    <div className="flex gap-8 py-4">
      <Stat value={42} label="posts" />
      <Stat value="1.2k" label="followers" />
      <Stat value={521} label="following" />
    </div>
  )
}

