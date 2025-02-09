import type { FC } from 'react'

import { useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

import type { PathTabProps } from './PathTab.types'

const PathTab: FC<PathTabProps> = ({ children, path }) => {
    const { pathname } = useLocation()

    return (
        <div className={clsx([path === pathname ? '' : 'hidden', 'w-full p-2'])} data-testid='Tab'>
            {children}
        </div>
    )
}

export default PathTab
