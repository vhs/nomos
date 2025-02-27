import type { FC } from 'react'

import { Link } from '@tanstack/react-router'
import { clsx } from 'clsx'

import type { LinkButtonProps } from './LinkButton.types'

import styles from '@/components/01-atoms/Button/Button.styles'

const LinkButton: FC<LinkButtonProps> = ({ children, className, small, variant, to }) => {
    variant ??= 'primary'
    small ??= false

    return (
        <div data-testid='LinkButton'>
            <Link
                className={clsx([
                    className,
                    styles.variants[variant],
                    small ? 'btn-sm' : null,
                    'btn pt-1.5 align-middle'
                ])}
                to={to}
            >
                {children}
            </Link>
        </div>
    )
}

export default LinkButton
