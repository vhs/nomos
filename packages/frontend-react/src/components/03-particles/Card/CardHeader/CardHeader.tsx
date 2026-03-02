import type { FC } from 'react'

import clsx from 'clsx'

import type { CardHeaderProps } from './CardHeader.types'

const CardHeader: FC<CardHeaderProps> = ({ children, className }) => (
    <div className={clsx([className, 'element header font-bold'])} data-testid='CardHeader'>
        {children}
    </div>
)

export default CardHeader
