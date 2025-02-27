import type { FC } from 'react'

import { useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

import type { PathTabProps } from './PathTab.types'

import styles from './PathTab.module.css'

const PathTab: FC<PathTabProps> = ({ children, path, className, ...restProps }) => {
    const { pathname } = useLocation()

    return (
        <div
            className={clsx([className, path === pathname ? '' : styles.Hidden, styles.PathTab])}
            data-testid='Tab'
            {...restProps}
        >
            {children}
        </div>
    )
}

export default PathTab
