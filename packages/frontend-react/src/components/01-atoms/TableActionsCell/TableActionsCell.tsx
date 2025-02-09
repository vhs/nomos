import type { FC } from 'react'

import type { TableActionsCellProps } from './TableActionsCell.types'

const TableActionsCell: FC<TableActionsCellProps> = ({ children }) => (
    <td>
        <div className='grid grid-flow-col justify-evenly'>{children}</div>
    </td>
)

export default TableActionsCell
