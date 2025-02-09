import type { MouseEventHandler, ReactNode } from 'react'

export type ButtonVariantTypes =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'

export interface ButtonProps {
    children?: ReactNode
    className?: string
    variant?: ButtonVariantTypes
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}
