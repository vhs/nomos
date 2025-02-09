import type { FC } from 'react'

import { Link, useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

import type { PathTabsProps } from './PathTabs.types'

const PathTabs: FC<PathTabsProps> = ({ children, id }) => {
    const { pathname } = useLocation()

    if (!Array.isArray(children)) throw new Error('Children PathTabs are not iterable')

    const childTabs = children.map((e) => e.props)

    return (
        <div className='w-full' data-testid='PathTabs' id={id}>
            <div className='grid-flow-row px-2'>
                {childTabs.map((e) => {
                    return (
                        <Link
                            key={e.path}
                            className={clsx(['path-tab-title', pathname === e.path ? 'path-tab-active' : null])}
                            to={e.path}
                        >
                            {e.title}
                        </Link>
                    )
                })}
            </div>
            <div className='path-tab-container min-w-fit'>{children}</div>
        </div>
    )
}

export default PathTabs
