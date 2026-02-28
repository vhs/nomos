import type { ReactNode } from 'react'

export interface ModalHeaderProps {
    children?: ReactNode
    className?: string
    closeButton?: () => void
}
