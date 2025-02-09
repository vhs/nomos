import type { FC } from 'react'

import clsx from 'clsx'

import type { PillProps } from './Pill.types'

const Pill: FC<PillProps> = ({ children, className }) => (
    <div
        className={clsx([
            'm-1 rounded-xl bg-blue-500 px-4 py-0.5 text-center align-middle italic text-white',
            className
        ])}
        data-testid='Pill'
    >
        {children}
    </div>
)

export default Pill
