import type { FC } from 'react'

import clsx from 'clsx'

import type { CardContainerProps } from './CardContainer.types'

const CardContainer: FC<CardContainerProps> = ({ children, className, error, ...restProps }) => {
    error ??= false

    return (
        <div
            className={clsx([className, 'card', error ? 'shadow-form-error' : null])}
            data-testid='CardContainer'
            {...restProps}
        >
            {children}
        </div>
    )
}

export default CardContainer
