import type { ReactNode } from 'react'

import type { ConditionalProps } from '@/components/01-atoms/Conditional/Conditional.types'

export interface ConditionalTableCellProps extends ConditionalProps {
    children?: ReactNode
    className?: string
}
