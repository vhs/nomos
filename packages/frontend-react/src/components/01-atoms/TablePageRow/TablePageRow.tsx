import type { FC } from 'react'

import type { TablePageRowProps } from './TablePageRow.types'

const TablePageRow: FC<TablePageRowProps> = ({ children }) => (
    <tr className='tablepage-row' data-testid='TablePageRow'>
        {children}
    </tr>
)

export default TablePageRow
