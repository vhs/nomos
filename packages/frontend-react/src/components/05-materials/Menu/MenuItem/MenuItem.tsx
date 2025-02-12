import type { FC } from 'react'

import { Link, useLocation } from '@tanstack/react-router'
import clsx from 'clsx'

import type { MenuItemProps } from './MenuItem.types'

import Col from '@/components/01-atoms/Col/Col'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import type { FontAwesomeIconProps } from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon.types'
import Row from '@/components/01-atoms/Row/Row'

const MenuItem: FC<MenuItemProps> = ({ id, path, icon, name }) => {
    const location = useLocation()

    const iconProps: FontAwesomeIconProps = typeof icon === 'object' && !Array.isArray(icon) ? icon : { icon }

    const activeLink =
        location.pathname === path || (path !== '/' && location.pathname.startsWith(path)) ? 'active' : null

    return (
        <Row id={id} className={clsx('menu item my-2 w-full', activeLink, path === '/' ? 'mt-4' : null)}>
            <Col className='basis-full text-nowrap'>
                <Link to={path}>
                    <FontAwesomeIcon {...iconProps} />
                    &nbsp;{name}
                </Link>
            </Col>
        </Row>
    )
}

export default MenuItem
