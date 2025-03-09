import type { FC } from 'react'

import clsx from 'clsx'

import type { ContainerProps } from './Container.types'

const Container: FC<ContainerProps> = ({ fluid, className, children }) => {
    fluid ??= false

    return (
        <div className={clsx([className, fluid ? 'w-full' : 'container', 'mx-auto'])} data-testid='Container'>
            {children}
        </div>
    )
}

export default Container
