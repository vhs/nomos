import type { ConditionalProps } from '@/components/01-atoms/Conditional/Conditional.types'

import type { CastReactElement } from '@/types/utils'

export type TableDataCellProps = CastReactElement<'td'> & Partial<ConditionalProps>
