import type { ReactNode } from 'react'

export interface ItemDeleteModalProps {
    show: boolean
    actionHandler: () => void
    closeHandler: () => void
    title?: string
    children: ReactNode
}
