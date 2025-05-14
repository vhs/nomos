import type { FC } from 'react'

import { Link } from '@tanstack/react-router'
import { clsx } from 'clsx'

import type { LinkButtonProps } from './LinkButton.types'

import styles from '@/components/02-molecules/Button/Button.styles'

const LinkButton: FC<LinkButtonProps> = ({ children, circle, className, small, variant, to }) => {
    circle ??= false
    small ??= false
    variant ??= 'primary'

    return (
        <div data-testid='LinkButton'>
            <Link
                className={clsx([
                    className,
                    styles.variants[variant],
                    circle ? 'btn-circle' : null,
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
