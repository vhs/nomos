import type { FC } from 'react'

import { Link, useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

import type { PathTabsProps } from './PathTabs.types'

import styles from './PathTabs.module.css'

const PathTabs: FC<PathTabsProps> = ({ children, id, ...restProps }) => {
    const { pathname } = useLocation()

    if (!Array.isArray(children)) throw new Error('Children PathTabs are not iterable')

    const childTabs = children.map((e) => e.props)

    return (
        <div data-testid='PathTabs' id={id} {...restProps}>
            <div className={styles.Grid}>
                {childTabs.map((e) => {
                    return (
                        <div key={e.path} className={clsx([styles.Title, pathname === e.path ? styles.Active : null])}>
                            <Link to={e.path}>{e.title}</Link>
                        </div>
                    )
                })}
            </div>
            <div className={styles.Container}>{children}</div>
        </div>
    )
}

export default PathTabs
