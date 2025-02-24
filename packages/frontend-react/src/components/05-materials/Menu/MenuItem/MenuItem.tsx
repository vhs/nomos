import type { FC } from 'react'

import { Link, useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

import type { MenuItemProps } from './MenuItem.types'

import Col from '@/components/01-atoms/Col/Col'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import type { FontAwesomeIconProps } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'
import Row from '@/components/01-atoms/Row/Row'

import './MenuItem.css'
import styles from './MenuItem.module.css'
import { marginLinks } from './MenuItem.utils'

const MenuItem: FC<MenuItemProps> = ({ id, path, icon, name }) => {
    const location = useLocation()

    const iconProps: FontAwesomeIconProps = typeof icon === 'object' && !Array.isArray(icon) ? icon : { icon }

    const activeLink =
        location.pathname === path || (path !== '/' && location.pathname.startsWith(path)) ? 'active' : null

    return (
        <Row id={id} className={clsx('menu item', activeLink, marginLinks.includes(path) ? styles.MarginLink : null)}>
            <Col>
                <Link to={path}>
                    <FontAwesomeIcon {...iconProps} />
                    &nbsp;{name}
                </Link>
            </Col>
        </Row>
    )
}

export default MenuItem
