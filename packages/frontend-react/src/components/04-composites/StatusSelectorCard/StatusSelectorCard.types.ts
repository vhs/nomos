import type { ReactNode } from 'react'

import type { UserActiveStateCodes } from '@/types/common'

export interface StatusSelectorCardProps {
    children?: ReactNode
    className?: string
    onUpdate: (code: UserActiveStateCodes) => void
    value?: UserActiveStateCodes
}
