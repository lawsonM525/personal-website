'use client'

import { CommandMenu } from './command-menu'

interface CommandButtonProps {
  onCommandOpen: () => void
}

export function CommandButton({ onCommandOpen }: CommandButtonProps) {
  return (
    <button onClick={onCommandOpen}>
      <CommandMenu open={false} onOpenChange={onCommandOpen} />
    </button>
  )
} 