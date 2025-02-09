import type { FC } from 'react'

import clsx from 'clsx'

import type { CardFooterProps } from './CardFooter.types'

const CardFooter: FC<CardFooterProps> = ({ children, className }) => (
    <div
        className={clsx(['footer', className?.includes('justify-') === false ? 'justify-end' : null, className])}
        data-testid='CardFooter'
    >
        {children}
    </div>
)

export default CardFooter
