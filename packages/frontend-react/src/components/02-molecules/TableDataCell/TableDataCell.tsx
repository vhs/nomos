import type { FC } from 'react'

import clsx from 'clsx'

import type { TableDataCellProps } from './TableDataCell.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Popover from '@/components/01-atoms/Popover/Popover'

const TableDataCell: FC<TableDataCellProps> = ({ className, children, condition }) => {
    condition ??= true

    return (
        <Conditional condition={condition}>
            <td className={clsx([className, 'px-1 text-center'])} data-testid='TableDataCell'>
                {(typeof children === 'string' && children.length < 16) || typeof children !== 'string' ? (
                    children
                ) : (
                    <Popover content={children} popover={children} />
                )}
            </td>
        </Conditional>
    )
}

export default TableDataCell
