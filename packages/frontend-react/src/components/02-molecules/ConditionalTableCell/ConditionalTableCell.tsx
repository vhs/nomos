import type { FC } from 'react'

import { clsx } from 'clsx'

import type { ConditionalTableCellProps } from './ConditionalTableCell.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Popover from '@/components/01-atoms/Popover/Popover'

const ConditionalTableCell: FC<ConditionalTableCellProps> = ({ className, condition, children }) => (
    <Conditional condition={condition}>
        <td className={clsx([className, 'px-1 text-center'])}>
            {(typeof children === 'string' && children.length < 16) || typeof children !== 'string' ? (
                children
            ) : (
                <Popover content={children} popover={children} />
            )}
        </td>
    </Conditional>
)

export default ConditionalTableCell
