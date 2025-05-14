import type { ReactNode } from 'react'

export interface MembershipSelectorCardProps {
    children?: ReactNode
    className?: string
    onUpdate: (id: number) => void
    value?: number | string
}
