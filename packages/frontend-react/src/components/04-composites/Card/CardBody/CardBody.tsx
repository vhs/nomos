import type { FC } from 'react'

import clsx from 'clsx'

import type { CardBodyProps } from './CardBody.types'

const CardBody: FC<CardBodyProps> = ({ children, className }) => (
    <div className={clsx(['body', className])} data-testid='CardBody'>
        {children}
    </div>
)

export default CardBody
