import type { FC } from 'react'

import { clsx } from 'clsx'

import type { RowProps } from './Row.types'

const Row: FC<RowProps> = ({ children, className, noWrap, ...restProps }) => {
    noWrap ??= false

    return (
        <div
            className={clsx(['row', className, noWrap ? 'flex-nowrap' : 'flex-wrap'])}
            data-testid='Row'
            {...restProps}
        >
            {children}
        </div>
    )
}

export default Row
