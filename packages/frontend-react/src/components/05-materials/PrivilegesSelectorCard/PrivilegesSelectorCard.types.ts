import type { CardContainerProps } from '@/components/04-composites/Card/CardContainer/CardContainer.types'

import type { CastReactElement } from '@/types/utils'
import type { BooleanRecord } from '@/types/validators/common'
import type { BasePrivileges } from '@/types/validators/records'

export interface PrivilegesSelectorCardProps extends CastReactElement<'div'> {
    className?: string
    title?: string
    onUpdate: (mutation: { privilege: string; state: boolean }) => void
    customPrivileges?: BasePrivileges
    selected?: BooleanRecord
    error?: CardContainerProps['error']
}
