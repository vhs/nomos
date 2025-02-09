import type { ReactNode } from 'react'

export interface OverlayCardProps {
    actions?: ReactNode
    children: ReactNode
    className?: string
    title: string
    closeLabel?: string
    onClose?: () => boolean
}
