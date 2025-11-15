import type { ReactNode } from 'react'

import type { IconProp } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'

export interface AdminStatusWidgetProps {
    variant?: 'green' | 'red'
    icon: IconProp
    count: number
    description: string
    details: ReactNode
}
