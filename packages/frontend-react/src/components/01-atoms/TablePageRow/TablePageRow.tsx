import type { FC } from 'react'

import { clsx } from 'clsx'

import type { TablePageRowProps } from './TablePageRow.types'

import { TablePageRowFieldsClasses } from './TablePageRow.utils'

const TablePageRow: FC<TablePageRowProps> = ({ fields, children }) => {
    fields ??= 0

    const cssClass = TablePageRowFieldsClasses[fields] ?? 'data-fields-default'

    return (
        <tr className={clsx(['data-row', cssClass])} data-testid='TablePageRow'>
            {children}
        </tr>
    )
}

export default TablePageRow
