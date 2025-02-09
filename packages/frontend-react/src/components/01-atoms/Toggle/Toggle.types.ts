import type { ReactNode } from 'react'

export interface ToggleProps {
    children?: ReactNode
    checked?: boolean
    disabled?: boolean
    onChange?: (val: boolean) => void
    id?: string
}
