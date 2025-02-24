import type { FC } from 'react'

import { clsx } from 'clsx'

import type { ConditionalTableCellProps } from './ConditionalTableCell.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'

const ConditionalTableCell: FC<ConditionalTableCellProps> = ({ className, condition, children }) => (
    <Conditional condition={condition}>
        <td className={clsx([className, 'px-1 text-center'])}>{children}</td>
    </Conditional>
)

export default ConditionalTableCell
