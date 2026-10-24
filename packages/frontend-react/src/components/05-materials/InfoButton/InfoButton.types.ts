import type { ReactNode } from 'react'

import type { CastReactElement } from '@/types/utils'

export interface InfoButtonProps extends CastReactElement<'button'> {
    title?: string
    children?: ReactNode
}
