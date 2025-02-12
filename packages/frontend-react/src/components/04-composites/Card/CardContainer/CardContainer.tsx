import type { FC } from 'react'

import clsx from 'clsx'

import type { CardContainerProps } from './CardContainer.types'

const CardContainer: FC<CardContainerProps> = ({ children, className, ...restProps }) => (
    <div className={clsx(['card', className])} data-testid='CardContainer' {...restProps}>
        {children}
    </div>
)

export default CardContainer
