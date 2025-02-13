import type { ReactNode } from 'react'

export interface OverlayCardProps {
    actions?: ReactNode
    children: ReactNode
    className?: string
    show?: boolean
    title: string
    closeLabel?: string
    onClose?: () => boolean
}
