import type { ReactNode } from 'react'

import type { RowProps } from '@/components/01-atoms/Row/Row.types'

export interface SpaciousRowProps extends RowProps {
    children?: ReactNode
}
