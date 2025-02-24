import type { FC } from 'react'

import clsx from 'clsx'

import type { CardBodyProps } from './CardBody.types'

const CardBody: FC<CardBodyProps> = ({ children, className }) => (
    <div className={clsx([className, 'element body'])} data-testid='CardBody'>
        {children}
    </div>
)

export default CardBody
