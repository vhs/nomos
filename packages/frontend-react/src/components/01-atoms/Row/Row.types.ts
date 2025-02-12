import type { ReactNode } from 'react'

import type { CastReactElement } from '@/types/utils'

export interface RowProps extends CastReactElement<'div'> {
    children?: ReactNode
}
