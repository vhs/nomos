import type { ReactNode } from 'react'

import type { CastReactElement } from '@/types/utils'

export interface FormControlContainerProps extends CastReactElement<'div'> {
    children?: ReactNode
    error?: unknown
    hasFocus?: boolean
    hasPreContent?: boolean
    hasPostContent?: boolean
}
