import type { ReactNode } from 'react'

import type { CastReactElement } from '@/types/utils'

export interface PathTabProps extends CastReactElement<'div'> {
    children?: ReactNode
    path: string
    title: string
}
