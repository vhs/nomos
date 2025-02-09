import type { FC } from 'react'

import { clsx } from 'clsx'

import type { RowProps } from './Row.types'

const Row: FC<RowProps> = ({ children, className, ...restProps }) => (
    <div className={clsx(['row', className])} data-testid='Row' {...restProps}>
        {children}
    </div>
)

export default Row
