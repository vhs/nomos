import type { FC } from 'react'

import clsx from 'clsx'

import type { CardFooterProps } from './CardFooter.types'

const CardFooter: FC<CardFooterProps> = ({ children, className, noGrid }) => {
    noGrid ??= false

    return (
        <div
            className={clsx([
                'element footer',
                noGrid ? '' : 'gridded',
                className,
                className?.split(' ').some((c) => /^justify-/.test(c)) === false ? 'justify-around' : null
            ])}
            data-testid='CardFooter'
        >
            {children}
        </div>
    )
}

export default CardFooter
