import type { FC } from 'react'

import { useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

import type { PathTabProps } from './PathTab.types'

const PathTab: FC<PathTabProps> = ({ children, path, className, ...restProps }) => {
    const { pathname } = useLocation()

    return (
        <div
            className={clsx([className, path === pathname ? '' : 'hidden', 'max-w[50%] p-2'])}
            data-testid='Tab'
            {...restProps}
        >
            {children}
        </div>
    )
}

export default PathTab
