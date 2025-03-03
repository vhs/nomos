import type { CardContainerProps } from '@/components/04-composites/Card/CardContainer/CardContainer.types'

import type { BooleanRecord } from '@/types/common'
import type { BasePrivileges } from '@/types/records'
import type { CastReactElement } from '@/types/utils'

export interface PrivilegesSelectorCardProps extends CastReactElement<'div'> {
    className?: string
    title?: string
    onUpdate: (mutation: { privilege: string; state: boolean }) => void
    customPrivileges?: BasePrivileges
    selected?: BooleanRecord
    error?: CardContainerProps['error']
}
