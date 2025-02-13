import type { ReactNode } from 'react'

import type { CastReactElement } from '@/types/utils'

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
    | 'none'

export interface ButtonProps extends CastReactElement<'button'> {
    children?: ReactNode
    variant?: ButtonVariantTypes
}
